import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { supabase } from '../../../lib/supabase';
import { useDayChange } from '../../../hooks/useDayChange';
import { useUserStats } from '../../../contexts/UserStatsContext';

const pad2 = (n) => String(n).padStart(2, '0');
const toDayKeyLocal = (date) => {
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  return `${y}-${m}-${d}`;
};

export const useSalavatCounters = () => {
  const { getToday, isLoading: dayLoading } = useDayChange();
  const { user, stats, updateStat } = useUserStats();

  const [loading, setLoading] = useState(true);

  // Base values (merged from context stats)
  const [globalTotalBase, setGlobalTotalBase] = useState(0);
  const [globalTodayBase, setGlobalTodayBase] = useState(0);

  // User total from context is more reliable
  const userTotalBase = stats.total_salavat || 0;

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

  const readCounts = useCallback(
    async () => {
      try {
        // Global total (still need to fetch these as they aren't in user_stats)
        const { data: gTotal } = await supabase.from('global_stats').select('total').eq('type', 'salavat').maybeSingle();

        const { data: gDaily } = await supabase
          .from('daily_stats')
          .select('total')
          .eq('type', 'salavat')
          .eq('date_key', todayKey)
          .maybeSingle();

        if (gTotal) setGlobalTotalBase(gTotal.total || 0);
        if (gDaily) setGlobalTodayBase(gDaily.total || 0);
        else setGlobalTodayBase(0);
      } catch (err) {
        console.warn('📿 Salavat readCounts error:', err);
      }
    },
    [todayKey]
  );

  const flushPending = useCallback(
    async (dayKeyOverride) => {
      if (flushingRef.current) return;
      if (!user?.uid) return;

      const pending = pendingRef.current;
      if (pending <= 0) return;

      flushingRef.current = true;
      const dayKeyToUse = dayKeyOverride || dayKeyRef.current || todayKey;

      try {
        // 1. Update Global Total
        await supabase.rpc('increment_global_stat', { stat_type: 'salavat', increment_by: pending });

        // 2. Update Global Daily
        await supabase.rpc('increment_daily_stat', { stat_type: 'salavat', day_key: dayKeyToUse, increment_by: pending });

        // 3. Update User Total (This will trigger real-time update in Context)
        // DUPLICATION FIX: We use updateStat below which handles DB sync via Service.
        // await supabase.rpc('increment_user_stat', { target_user_id: user.uid, column_name: 'total_salavat', increment_by: pending });

        // Optimistik olarak global context'i de güncelle (Zıplama olmasın!)
        // This also handles the DB sync securely via UserStatsService
        updateStat('total_salavat', pending);

        // Atomik olarak sayaçlardan düş
        pendingRef.current -= pending;
        setLocalDelta((prev) => Math.max(0, prev - pending));

        setGlobalTotalBase((v) => v + pending);
        if (dayKeyToUse === todayKey) setGlobalTodayBase((v) => v + pending);

        // 4. Günlük görev ilerlemesini SUPABASE üzerinden güncelle
        await supabase.rpc('record_daily_activity', {
          p_user_id: user.uid,
          p_activity_type: 'salavat'
        });
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
        await readCounts();
      } catch (e) {
        console.warn('📿 Salavat read failed:', e?.message || e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [readCounts, todayKey]);

  useEffect(() => {
    if (flushTimerRef.current) clearInterval(flushTimerRef.current);
    flushTimerRef.current = setInterval(() => {
      if (pendingRef.current > 0) {
        void flushPending();
      }
    }, 1000);
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

    // Immediate flush removed to prevent global context re-renders on every tap.
    // The interval will handle the sync.
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


