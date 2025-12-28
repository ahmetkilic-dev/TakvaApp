import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../../../firebaseConfig';
import {
  doc,
  getDoc,
  increment,
  serverTimestamp,
  setDoc,
  writeBatch,
} from 'firebase/firestore';
import { useDayChange } from '../../../hooks/useDayChange';

const GLOBAL_DOC = { col: 'salavatStats', id: 'global' };
const DAILY_DOC_PREFIX = 'daily_'; // daily_YYYY-MM-DD

const pad2 = (n) => String(n).padStart(2, '0');
const toDayKeyLocal = (date) => {
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  return `${y}-${m}-${d}`;
};

export const useSalavatCounters = () => {
  const { getToday, isLoading: dayLoading } = useDayChange();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Base values from Firestore
  const [globalTotalBase, setGlobalTotalBase] = useState(0);
  const [globalTodayBase, setGlobalTodayBase] = useState(0);
  const [userTotalBase, setUserTotalBase] = useState(0);

  // Local delta for instant UI (not yet flushed)
  const [localDelta, setLocalDelta] = useState(0);

  const pendingRef = useRef(0);
  const flushingRef = useRef(false);
  const flushTimerRef = useRef(null);
  const appStateRef = useRef(AppState.currentState);
  const dayKeyRef = useRef(null);

  const today = useMemo(() => (getToday ? getToday() : new Date()), [getToday]);
  const todayKey = useMemo(() => toDayKeyLocal(today), [today]);

  const dailyDocId = useMemo(() => `${DAILY_DOC_PREFIX}${todayKey}`, [todayKey]);

  // Keep current day key in a ref so we can flush pending to the correct day
  useEffect(() => {
    if (!dayKeyRef.current) {
      dayKeyRef.current = todayKey;
      return;
    }
    if (dayKeyRef.current !== todayKey) {
      // If day changed, flush pending to previous day doc before switching
      void flushPending(dayKeyRef.current);
      dayKeyRef.current = todayKey;
      // reset local delta for “today” display (we still show global total + user total)
      setLocalDelta(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todayKey]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => setUser(firebaseUser));
    return unsub;
  }, []);

  const readCounts = useCallback(
    async (uid) => {
      const globalRef = doc(db, GLOBAL_DOC.col, GLOBAL_DOC.id);
      const dailyRef = doc(db, GLOBAL_DOC.col, dailyDocId);
      const userRef = uid ? doc(db, 'users', uid) : null;

      const [globalSnap, dailySnap, userSnap] = await Promise.all([
        getDoc(globalRef),
        getDoc(dailyRef),
        uid ? getDoc(userRef) : Promise.resolve(null),
      ]);

      setGlobalTotalBase(globalSnap.exists() ? Number(globalSnap.data()?.total || 0) : 0);
      setGlobalTodayBase(dailySnap.exists() ? Number(dailySnap.data()?.total || 0) : 0);
      setUserTotalBase(uid && userSnap?.exists() ? Number(userSnap.data()?.salavatTotal || 0) : 0);
    },
    [dailyDocId]
  );

  const flushPending = useCallback(
    async (dayKeyOverride) => {
      if (flushingRef.current) return;
      if (!user?.uid) return;

      const pending = pendingRef.current;
      if (!pending || pending <= 0) return;

      flushingRef.current = true;
      const dayKeyToUse = dayKeyOverride || dayKeyRef.current || todayKey;
      const dailyId = `${DAILY_DOC_PREFIX}${dayKeyToUse}`;

      try {
        const batch = writeBatch(db);

        const globalRef = doc(db, GLOBAL_DOC.col, GLOBAL_DOC.id);
        const dailyRef = doc(db, GLOBAL_DOC.col, dailyId);
        const userRef = doc(db, 'users', user.uid);

        batch.set(
          globalRef,
          { total: increment(pending), updatedAt: serverTimestamp() },
          { merge: true }
        );

        batch.set(
          dailyRef,
          { total: increment(pending), date: dayKeyToUse, updatedAt: serverTimestamp() },
          { merge: true }
        );

        batch.set(
          userRef,
          { salavatTotal: increment(pending), salavatTotalUpdatedAt: serverTimestamp() },
          { merge: true }
        );

        await batch.commit();

        pendingRef.current = 0;
        setLocalDelta(0);

        // Optimistic base bump (avoid immediate reread)
        setGlobalTotalBase((v) => v + pending);
        if (dayKeyToUse === todayKey) setGlobalTodayBase((v) => v + pending);
        setUserTotalBase((v) => v + pending);
      } catch (e) {
        // Keep pending; we'll retry later (timer/background)
        console.warn('📿 Salavat flush failed:', e?.message || e);
      } finally {
        flushingRef.current = false;
      }
    },
    [todayKey, user?.uid]
  );

  // Read initial counts + on day change/user change
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        if (!alive) return;
        setLoading(true);
        await readCounts(user?.uid);
      } catch (e) {
        console.warn('📿 Salavat read failed:', e?.message || e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [readCounts, todayKey, user?.uid]);

  // Minimalize writes: flush periodically if there is pending
  useEffect(() => {
    if (flushTimerRef.current) clearInterval(flushTimerRef.current);
    flushTimerRef.current = setInterval(() => {
      if (pendingRef.current > 0) {
        void flushPending();
      }
    }, 5000);
    return () => {
      if (flushTimerRef.current) clearInterval(flushTimerRef.current);
      flushTimerRef.current = null;
    };
  }, [flushPending]);

  // Flush on app background
  useEffect(() => {
    const sub = AppState.addEventListener('change', (nextState) => {
      const prev = appStateRef.current;
      appStateRef.current = nextState;
      if (prev === 'active' && nextState !== 'active') {
        void flushPending();
      }
    });
    return () => sub.remove();
  }, [flushPending]);

  const addOne = useCallback(() => {
    if (!user?.uid) return; // require login to contribute

    // If day key changed but ref didn't update yet, flush under previous key
    if (dayKeyRef.current && dayKeyRef.current !== todayKey) {
      void flushPending(dayKeyRef.current);
      dayKeyRef.current = todayKey;
    }

    pendingRef.current += 1;
    setLocalDelta((d) => d + 1);

    // Threshold flush to keep pending small
    if (pendingRef.current >= 10) {
      void flushPending();
    }
  }, [flushPending, todayKey, user?.uid]);

  const displayGlobalTotal = globalTotalBase + localDelta;
  const displayGlobalToday = globalTodayBase + localDelta;
  const displayUserTotal = userTotalBase + localDelta;

  return {
    user,
    todayKey,
    loading: dayLoading || loading,
    globalTotal: displayGlobalTotal,
    globalToday: displayGlobalToday,
    userTotal: displayUserTotal,
    addOne,
    flush: flushPending,
  };
};

export default useSalavatCounters;


