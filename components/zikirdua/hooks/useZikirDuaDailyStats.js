import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState } from 'react-native';
import { supabase } from '../../../lib/supabase';
import { useDayChangeContext } from '../../../contexts/DayChangeContext';

import { useUserStats } from '../../../contexts/UserStatsContext';

const DEFAULT_DUA_RIGHTS = 3;

const pad2 = (n) => String(n).padStart(2, '0');
const toDayKeyLocal = (date) => {
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  return `${y}-${m}-${d}`;
};

export const useZikirDuaDailyStats = () => {
  const { getToday, isLoading: dayLoading } = useDayChangeContext();
  const { user, updateStat } = useUserStats();

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

  const flushDhikr = useCallback(
    async (dayKeyOverride) => {
      if (flushingRef.current) return;
      if (!user?.uid) return;

      const pending = pendingDhikrRef.current;
      if (pending <= 0) return;

      flushingRef.current = true;

      const dayKeyToUse = dayKeyOverride || dayKeyRef.current || todayKey;

      try {
        // 1. Optimistik olarak global context'i güncelle (Zıplama olmasın!)
        // Bu fonksiyon arkada UserStatsService.incrementField çağırır, bu da DB'de total_dhikr günceller.
        updateStat('total_dhikr', pending);

        // 2. Günlük kullanıcı istatistiğini güncelle
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

        // 3. Günlük görev ilerlemesini CONTEXT üzerinden güncelle - ARTIK SUNUCU TARAFLI
        // await incrementTask(3, pending);

        // Atomik olarak sayaçlardan düş
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
      setDuaRemaining(DEFAULT_DUA_RIGHTS);
    }
  }, [todayKey, flushDhikr]);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        if (!alive) return;
        if (!user?.uid) {
          setDhikrBase(0);
          setDuaRemaining(DEFAULT_DUA_RIGHTS);
          setLoading(false);
          return;
        }

        setLoading(true);
        const { data, error } = await supabase
          .from('daily_user_stats')
          .select('*')
          .eq('user_id', user.uid)
          .eq('date_key', todayKey)
          .single();

        if (!alive) return;

        if (data) {
          setDhikrBase(Number(data.dhikr_count || 0));
          setDuaRemaining(
            typeof data.dua_remaining === 'number' ? data.dua_remaining : DEFAULT_DUA_RIGHTS
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

    if (dayKeyRef.current && dayKeyRef.current !== todayKey) {
      void flushDhikr(dayKeyRef.current);
      dayKeyRef.current = todayKey;
    }

    pendingDhikrRef.current += 1;
    setLocalDhikrDelta((d) => d + 1);

    // Constant context updates causing lag. Flushing is now handled by interval.
  }, [flushDhikr, todayKey, user?.uid]);

  const consumeDuaRight = useCallback(async () => {
    if (!user?.uid) return { ok: false, remaining: 0 };

    try {
      const { data, error } = await supabase.rpc('consume_dua_right', {
        target_user_id: user.uid,
        day_key: todayKey,
        default_rights: DEFAULT_DUA_RIGHTS
      });

      if (error) throw error;

      if (data && data.ok) {
        setDuaRemaining(data.remaining);
        return { ok: true, remaining: data.remaining };
      } else {
        return { ok: false, remaining: 0 };
      }
    } catch (e) {
      console.warn('🧿 consumeDuaRight failed:', e?.message || e);
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


