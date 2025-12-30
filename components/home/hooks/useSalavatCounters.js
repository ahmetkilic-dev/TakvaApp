import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { supabase } from '../../../lib/supabase';
import { useDayChange } from '../../../hooks/useDayChange';

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

  // Base values from Supabase
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

  // Keep current day key in a ref so we can flush pending to the correct day
  useEffect(() => {
    if (!dayKeyRef.current) {
      dayKeyRef.current = todayKey;
      return;
    }
    if (dayKeyRef.current !== todayKey) {
      void flushPending(dayKeyRef.current);
      dayKeyRef.current = todayKey;
      setLocalDelta(0);
    }
  }, [todayKey]);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => setUser(firebaseUser));
    return unsub;
  }, []);

  const readCounts = useCallback(
    async (uid) => {
      // Global total
      const { data: gTotal } = await supabase.from('global_stats').select('total').eq('type', 'salavat').single();
      // Global daily
      const { data: gDaily } = await supabase.from('daily_stats').select('total').eq('type', 'salavat').eq('date_key', todayKey).single();
      // User total
      let uTotal = 0;
      if (uid) {
        const { data: stats } = await supabase.from('user_stats').select('total_salavat').eq('user_id', uid).single();
        uTotal = stats?.total_salavat || 0;
      }

      setGlobalTotalBase(gTotal?.total || 0);
      setGlobalTodayBase(gDaily?.total || 0);
      setUserTotalBase(uTotal);
    },
    [todayKey]
  );

  const flushPending = useCallback(
    async (dayKeyOverride) => {
      if (flushingRef.current) return;
      if (!user?.uid) return;

      const pending = pendingRef.current;
      if (!pending || pending <= 0) return;

      flushingRef.current = true;
      const dayKeyToUse = dayKeyOverride || dayKeyRef.current || todayKey;

      try {
        // In an ideal world we'd use an RPC to increment safely.
        // For now we'll do upserts with relative values if possible or just concurrent-unsafe for simple cases.
        // Better: use supabase.rpc('increment_salavat', { user_id: uid, amount: pending, day_key: dayKeyToUse })

        // 1. Update Global Total
        await supabase.rpc('increment_global_stat', { stat_type: 'salavat', increment_by: pending });

        // 2. Update Global Daily
        await supabase.rpc('increment_daily_stat', { stat_type: 'salavat', day_key: dayKeyToUse, increment_by: pending });

        // 3. Update User Total
        await supabase.rpc('increment_user_stat', { target_user_id: user.uid, column_name: 'total_salavat', increment_by: pending });

        pendingRef.current = 0;
        setLocalDelta(0);

        setGlobalTotalBase((v) => v + pending);
        if (dayKeyToUse === todayKey) setGlobalTodayBase((v) => v + pending);
        setUserTotalBase((v) => v + pending);
      } catch (e) {
        console.warn('📿 Salavat flush failed:', e?.message || e);
      } finally {
        flushingRef.current = false;
      }
    },
    [todayKey, user?.uid]
  );

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
    if (!user?.uid) return;

    if (dayKeyRef.current && dayKeyRef.current !== todayKey) {
      void flushPending(dayKeyRef.current);
      dayKeyRef.current = todayKey;
    }

    pendingRef.current += 1;
    setLocalDelta((d) => d + 1);

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


