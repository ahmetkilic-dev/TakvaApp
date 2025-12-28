import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { db } from '../../../firebaseConfig';
import {
  doc,
  getDoc,
  increment,
  runTransaction,
  serverTimestamp,
  setDoc,
  writeBatch,
} from 'firebase/firestore';
import { useDayChangeContext } from '../../../contexts/DayChangeContext';

const DAILY_STATS_SUBCOL = 'dailyStats'; // users/{uid}/dailyStats/{YYYY-MM-DD}
const DEFAULT_DUA_RIGHTS = 3;

const pad2 = (n) => String(n).padStart(2, '0');
const toDayKeyLocal = (date) => {
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  return `${y}-${m}-${d}`;
};

export const useZikirDuaDailyStats = () => {
  const { user, getToday, isLoading: dayLoading } = useDayChangeContext();

  const [loading, setLoading] = useState(true);
  const [dhikrBase, setDhikrBase] = useState(0);
  const [duaRemaining, setDuaRemaining] = useState(DEFAULT_DUA_RIGHTS);
  const [localDhikrDelta, setLocalDhikrDelta] = useState(0);

  const pendingDhikrRef = useRef(0);
  const flushingRef = useRef(false);
  const flushTimerRef = useRef(null);
  const appStateRef = useRef(AppState.currentState);
  const dayKeyRef = useRef(null);

  const today = useMemo(() => (getToday ? getToday() : new Date()), [getToday]);
  const todayKey = useMemo(() => toDayKeyLocal(today), [today]);

  const dailyDocRef = useMemo(() => {
    if (!user?.uid) return null;
    return doc(db, 'users', user.uid, DAILY_STATS_SUBCOL, todayKey);
  }, [todayKey, user?.uid]);

  const flushDhikr = useCallback(
    async (dayKeyOverride) => {
      if (flushingRef.current) return;
      if (!user?.uid) return;

      const pending = pendingDhikrRef.current;
      if (!pending || pending <= 0) return;

      const dayKeyToUse = dayKeyOverride || dayKeyRef.current || todayKey;
      const ref = doc(db, 'users', user.uid, DAILY_STATS_SUBCOL, dayKeyToUse);

      flushingRef.current = true;
      try {
        const batch = writeBatch(db);
        batch.set(
          ref,
          {
            date: dayKeyToUse,
            dhikrCount: increment(pending),
            updatedAt: serverTimestamp(),
            // duaRemaining is managed separately; do not override here
          },
          { merge: true }
        );
        await batch.commit();

        pendingDhikrRef.current = 0;
        setLocalDhikrDelta(0);

        // optimistic base bump for same day
        if (dayKeyToUse === todayKey) {
          setDhikrBase((v) => v + pending);
        }
      } catch (e) {
        console.warn('🧿 Dhikr flush failed:', e?.message || e);
      } finally {
        flushingRef.current = false;
      }
    },
    [todayKey, user?.uid]
  );

  // Day change: flush pending to previous day doc and reset local delta
  useEffect(() => {
    if (!dayKeyRef.current) {
      dayKeyRef.current = todayKey;
      return;
    }
    if (dayKeyRef.current !== todayKey) {
      void flushDhikr(dayKeyRef.current);
      dayKeyRef.current = todayKey;
      setLocalDhikrDelta(0);
      // refresh bases for the new day
      setDhikrBase(0);
      setDuaRemaining(DEFAULT_DUA_RIGHTS);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayKey]);

  // Initial read (per day & per user)
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        if (!alive) return;
        if (!user?.uid || !dailyDocRef) {
          setDhikrBase(0);
          setDuaRemaining(DEFAULT_DUA_RIGHTS);
          setLoading(false);
          return;
        }

        setLoading(true);
        const snap = await getDoc(dailyDocRef);
        if (!alive) return;

        if (snap.exists()) {
          const data = snap.data() || {};
          setDhikrBase(Number(data.dhikrCount || 0));
          // If not set yet, default 3 (we don't write until user consumes)
          setDuaRemaining(
            typeof data.duaRemaining === 'number' ? data.duaRemaining : DEFAULT_DUA_RIGHTS
          );
        } else {
          setDhikrBase(0);
          setDuaRemaining(DEFAULT_DUA_RIGHTS);
        }
      } catch (e) {
        console.warn('🧿 Daily stats read failed:', e?.message || e);
        setDhikrBase(0);
        setDuaRemaining(DEFAULT_DUA_RIGHTS);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [dailyDocRef, todayKey, user?.uid]);

  // Flush periodically to minimize writes but keep data durable
  useEffect(() => {
    if (flushTimerRef.current) clearInterval(flushTimerRef.current);
    flushTimerRef.current = setInterval(() => {
      if (pendingDhikrRef.current > 0) void flushDhikr();
    }, 5000);
    return () => {
      if (flushTimerRef.current) clearInterval(flushTimerRef.current);
      flushTimerRef.current = null;
    };
  }, [flushDhikr]);

  // Flush on background
  useEffect(() => {
    const sub = AppState.addEventListener('change', (nextState) => {
      const prev = appStateRef.current;
      appStateRef.current = nextState;
      if (prev === 'active' && nextState !== 'active') {
        void flushDhikr();
      }
    });
    return () => sub.remove();
  }, [flushDhikr]);

  const incrementDhikr = useCallback(() => {
    if (!user?.uid) return;

    // If day changed but ref not updated yet, flush to previous day
    if (dayKeyRef.current && dayKeyRef.current !== todayKey) {
      void flushDhikr(dayKeyRef.current);
      dayKeyRef.current = todayKey;
    }

    pendingDhikrRef.current += 1;
    setLocalDhikrDelta((d) => d + 1);

    // Threshold flush
    if (pendingDhikrRef.current >= 10) {
      void flushDhikr();
    }
  }, [flushDhikr, todayKey, user?.uid]);

  const consumeDuaRight = useCallback(async () => {
    if (!user?.uid) return { ok: false, remaining: 0 };

    const ref = doc(db, 'users', user.uid, DAILY_STATS_SUBCOL, todayKey);

    try {
      const result = await runTransaction(db, async (tx) => {
        const snap = await tx.get(ref);
        let remaining = DEFAULT_DUA_RIGHTS;
        let dhikrCount = 0;

        if (snap.exists()) {
          const data = snap.data() || {};
          remaining =
            typeof data.duaRemaining === 'number' ? data.duaRemaining : DEFAULT_DUA_RIGHTS;
          dhikrCount = Number(data.dhikrCount || 0);
        }

        if (remaining <= 0) {
          return { ok: false, remaining: 0 };
        }

        // Ensure doc exists and decrement remaining
        tx.set(
          ref,
          {
            date: todayKey,
            dhikrCount, // keep whatever was there (or 0). dhikr increments are separate.
            duaRemaining: remaining - 1,
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );

        return { ok: true, remaining: remaining - 1 };
      });

      setDuaRemaining(result.remaining);
      return result;
    } catch (e) {
      console.warn('🧿 consumeDuaRight failed:', e?.message || e);
      // No hard error: just keep current state
      return { ok: false, remaining: duaRemaining };
    }
  }, [duaRemaining, todayKey, user?.uid]);

  const dhikrCount = dhikrBase + localDhikrDelta;

  return {
    user,
    todayKey,
    loading: dayLoading || loading,
    dhikrCount,
    duaRemaining,
    incrementDhikr,
    consumeDuaRight,
    flushDhikr,
  };
};

export default useZikirDuaDailyStats;


