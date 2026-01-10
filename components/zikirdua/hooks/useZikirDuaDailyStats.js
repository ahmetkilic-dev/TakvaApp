import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { supabase } from '../../../lib/supabase';
import { useDayChangeContext } from '../../../contexts/DayChangeContext';
import * as Haptics from 'expo-haptics';

import { useUserStats } from '../../../contexts/UserStatsContext';

const pad2 = (n) => String(n).padStart(2, '0');
const toDayKeyLocal = (date) => {
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  return `${y}-${m}-${d}`;
};

export const useZikirDuaDailyStats = () => {
  const { getToday, isLoading: dayLoading } = useDayChangeContext();
  const { user } = useUserStats();

  const [loading, setLoading] = useState(true);
  const [dhikrBase, setDhikrBase] = useState(0);
  const [localDhikrDelta, setLocalDhikrDelta] = useState(0);

  const pendingDhikrRef = useRef(0);
  const flushingRef = useRef(false);
  const flushTimerRef = useRef(null);
  const appStateRef = useRef(AppState.currentState);
  const dayKeyRef = useRef(null);

  const today = useMemo(() => (getToday ? getToday() : new Date()), [getToday]);
  const todayKey = useMemo(() => toDayKeyLocal(today), [today]);

  const flushDhikr = useCallback(
    async (dayKeyOverride) => {
      if (flushingRef.current) return;
      if (!user?.uid) return;

      const pending = pendingDhikrRef.current;
      if (pending <= 0) return;

      flushingRef.current = true;

      const dayKeyToUse = dayKeyOverride || dayKeyRef.current || todayKey;

      try {
        try {
          await supabase.rpc('increment_daily_user_stat', {
            target_user_id: user.uid,
            day_key: dayKeyToUse,
            column_name: 'dhikr_count',
            increment_by: pending
          });
        } catch (dailyErr) {
          console.warn('🧿 Daily zikir update failed:', dailyErr.message);
        }

        pendingDhikrRef.current -= pending;
        setLocalDhikrDelta((prev) => Math.max(0, prev - pending));

        if (dayKeyToUse === todayKey) {
          setDhikrBase((v) => v + pending);
        }

      } catch (e) {
        console.error('🧿 Dhikr flush failed:', e?.message || e);
      } finally {
        flushingRef.current = false;
      }
    },
    [todayKey, user?.uid]
  );

  useEffect(() => {
    if (!dayKeyRef.current) {
      dayKeyRef.current = todayKey;
      return;
    }
    if (dayKeyRef.current !== todayKey) {
      void flushDhikr(dayKeyRef.current);
      dayKeyRef.current = todayKey;
      setLocalDhikrDelta(0);
      setDhikrBase(0);
    }
  }, [todayKey, flushDhikr]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        if (!alive) return;
        if (!user?.uid) {
          setDhikrBase(0);
          setLoading(false);
          return;
        }

        setLoading(true);
        const [dailyRes] = await Promise.all([
          supabase
            .from('daily_user_stats')
            .select('*')
            .eq('user_id', user.uid)
            .eq('date_key', todayKey)
            .maybeSingle()
        ]);

        if (!alive) return;

        if (dailyRes.data) {
          setDhikrBase(Number(dailyRes.data.dhikr_count || 0));
        } else {
          setDhikrBase(0);
        }
      } catch (e) {
        console.warn('🧿 Daily stats read failed:', e?.message || e);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [todayKey, user?.uid]);

  useEffect(() => {
    if (flushTimerRef.current) clearInterval(flushTimerRef.current);
    flushTimerRef.current = setInterval(() => {
      if (pendingDhikrRef.current > 0) void flushDhikr();
    }, 1000);
    return () => {
      if (flushTimerRef.current) clearInterval(flushTimerRef.current);
      flushTimerRef.current = null;
    };
  }, [flushDhikr]);

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

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (dayKeyRef.current && dayKeyRef.current !== todayKey) {
      void flushDhikr(dayKeyRef.current);
      dayKeyRef.current = todayKey;
    }

    pendingDhikrRef.current += 1;
    setLocalDhikrDelta((d) => d + 1);
  }, [flushDhikr, todayKey, user?.uid]);

  const dhikrCount = dhikrBase + localDhikrDelta;

  return {
    user,
    todayKey,
    loading: dayLoading || loading,
    dhikrCount,
    incrementDhikr,
    flushDhikr,
  };
};

export default useZikirDuaDailyStats;
