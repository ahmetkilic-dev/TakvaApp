import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig';
import { useDailyPrayerTimes } from '../../../hooks/useDailyPrayerTimes';
import { rolloverNamazIfNeeded } from '../../../utils/namazRollover';

const PRAYER_KEYS = ['sabah', 'ogle', 'ikindi', 'aksam', 'yatsi'];

const emptyCompleted = () => ({
  sabah: false,
  ogle: false,
  ikindi: false,
  aksam: false,
  yatsi: false,
});

const parseDayKey = (dayKey) => {
  if (!dayKey || typeof dayKey !== 'string') return null;
  const [y, m, d] = dayKey.split('-').map((x) => Number(x));
  if (!Number.isFinite(y) || !Number.isFinite(m) || !Number.isFinite(d)) return null;
  return new Date(y, m - 1, d, 0, 0, 0, 0);
};

const dayDiff = (fromKey, toKey) => {
  const from = parseDayKey(fromKey);
  const to = parseDayKey(toKey);
  if (!from || !to) return 0;
  const diff = Math.floor((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
};

/**
 * Namaz Durumu:
 * - Günlük check'ler (hesap bazlı)
 * - Gün atlayınca: işaretlenmeyen vakitleri kaza sayaçlarına ekler ve günlük check'i sıfırlar
 * - Vakit gelmeden check kapalı (disabled)
 */
export function useNamazDurumu() {
  const { todayKey, arrived, currentPrayerKey, loading: timesLoading } = useDailyPrayerTimes();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(() => ({
    dateKey: todayKey,
    completed: emptyCompleted(),
  }));

  const appStateRef = useRef(AppState.currentState);
  const midnightTimerRef = useRef(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => setUser(firebaseUser));
    return unsub;
  }, []);

  const ensureUserDoc = useCallback(async (uid) => {
    const userRef = doc(db, 'users', uid);
    await setDoc(
      userRef,
      {
        kazaNamazlari: {
          sabah: 0,
          ogle: 0,
          ikindi: 0,
          aksam: 0,
          yatsi: 0,
          vitir: 0,
        },
        kazaOruclari: { oruc: 0 },
        namazDurumu: {
          dateKey: todayKey,
          completed: emptyCompleted(),
          updatedAt: serverTimestamp(),
        },
      },
      { merge: true }
    );
  }, [todayKey]);

  const rolloverIfNeeded = useCallback(
    async (uid) => rolloverNamazIfNeeded({ db, uid, todayKey }),
    [todayKey]
  );

  const refreshFromFirestore = useCallback(
    async (uid) => {
      const userRef = doc(db, 'users', uid);
      const snap = await getDoc(userRef);
      const nd = snap.exists() ? snap.data()?.namazDurumu : null;
      const completed = { ...emptyCompleted(), ...(nd?.completed || {}) };
      setState({ dateKey: nd?.dateKey || todayKey, completed });
    },
    [todayKey]
  );

  // Initial load + rollover + state refresh
  useEffect(() => {
    let alive = true;
    (async () => {
      if (!user?.uid) {
        setLoading(false);
        setState({ dateKey: todayKey, completed: emptyCompleted() });
        return;
      }

      try {
        setLoading(true);
        await ensureUserDoc(user.uid);
        await rolloverIfNeeded(user.uid);

        if (!alive) return;
        await refreshFromFirestore(user.uid);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [ensureUserDoc, refreshFromFirestore, rolloverIfNeeded, todayKey, user?.uid]);

  // Gün içinde midnight rollover (app açık kalırsa)
  useEffect(() => {
    if (!user?.uid) return;

    const scheduleNext = () => {
      const now = new Date();
      const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5);
      const ms = Math.max(1000, nextMidnight.getTime() - now.getTime());
      midnightTimerRef.current = setTimeout(async () => {
        await rolloverIfNeeded(user.uid);
        await refreshFromFirestore(user.uid);
        scheduleNext();
      }, ms);
    };

    scheduleNext();
    return () => {
      if (midnightTimerRef.current) clearTimeout(midnightTimerRef.current);
      midnightTimerRef.current = null;
    };
  }, [refreshFromFirestore, rolloverIfNeeded, user?.uid]);

  // Flush rollover when app backgrounds (gün değişmişse yakalar)
  useEffect(() => {
    if (!user?.uid) return;
    const sub = AppState.addEventListener('change', (nextState) => {
      const prev = appStateRef.current;
      appStateRef.current = nextState;
      if (prev === 'active' && nextState !== 'active') {
        void rolloverIfNeeded(user.uid);
      }
    });
    return () => sub.remove();
  }, [rolloverIfNeeded, user?.uid]);

  const toggle = useCallback(
    async (key) => {
      if (!user?.uid) return;
      if (!PRAYER_KEYS.includes(key)) return;
      if (!arrived?.[key]) return; // vakit gelmeden checkleme kapalı

      const next = !state.completed[key];
      setState((s) => ({
        ...s,
        completed: { ...s.completed, [key]: next },
      }));

      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, {
        [`namazDurumu.completed.${key}`]: next,
        'namazDurumu.updatedAt': serverTimestamp(),
      });
    },
    [arrived, state.completed, user?.uid]
  );

  const items = useMemo(() => {
    return [
      { key: 'sabah', label: 'Sabah namazı' },
      { key: 'ogle', label: 'Öğle namazı' },
      { key: 'ikindi', label: 'İkindi namazı' },
      { key: 'aksam', label: 'Akşam namazı' },
      { key: 'yatsi', label: 'Yatsı namazı' },
    ].map((x) => ({
      ...x,
      completed: !!state.completed[x.key],
      enabled: !!arrived?.[x.key],
      isCurrent: currentPrayerKey === x.key,
    }));
  }, [arrived, currentPrayerKey, state.completed]);

  const completedCount = useMemo(
    () => PRAYER_KEYS.reduce((acc, k) => acc + (state.completed[k] ? 1 : 0), 0),
    [state.completed]
  );

  return {
    user,
    loading: timesLoading || loading,
    todayKey,
    items,
    completedCount,
    totalCount: PRAYER_KEYS.length,
    toggle,
  };
}

export default useNamazDurumu;


