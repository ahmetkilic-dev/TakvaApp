import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

const LOCAL_DHIKR_COUNTS_KEY = '@takva_local_per_dhikr_counts';

export const useZikirDuaDailyStats = () => {
  const { getToday, isLoading: dayLoading } = useDayChangeContext();
  const { user } = useUserStats();

  const [loading, setLoading] = useState(true);
  const [dhikrBase, setDhikrBase] = useState(0);
  const [localDhikrDelta, setLocalDhikrDelta] = useState(0);

  // Her zikir için ayrı sayaç tutan state
  const [perDhikrCounts, setPerDhikrCounts] = useState({});

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
      setPerDhikrCounts({}); // Gün değişince yerel sayaçları sıfırla
    }
  }, [todayKey, flushDhikr]);

  // Yerel sayaçları yükle
  useEffect(() => {
    let alive = true;
    const loadLocalCounts = async () => {
      try {
        const stored = await AsyncStorage.getItem(LOCAL_DHIKR_COUNTS_KEY);
        if (stored && alive) {
          const parsed = JSON.parse(stored);
          // Sadece bugünün verisi ise yükle
          if (parsed.dateKey === todayKey) {
            setPerDhikrCounts(parsed.counts || {});
          } else {
            // Eski gün verisi, temizle
            setPerDhikrCounts({});
            await AsyncStorage.removeItem(LOCAL_DHIKR_COUNTS_KEY);
          }
        }
      } catch (e) {
        console.warn('🧿 Local dhikr counts load failed:', e);
      }
    };
    loadLocalCounts();
    return () => { alive = false; };
  }, [todayKey]);

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

  const incrementDhikr = useCallback(async (dhikrId) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (dayKeyRef.current && dayKeyRef.current !== todayKey) {
      void flushDhikr(dayKeyRef.current);
      dayKeyRef.current = todayKey;
    }

    // 1. Global sayaç güncellemesi (Supabase'e gidecek olan)
    if (user?.uid) {
      pendingDhikrRef.current += 1;
      setLocalDhikrDelta((d) => d + 1);
    }

    // 2. Yerel, zikir bazlı sayaç güncellemesi (Her zaman çalışır)
    if (dhikrId) {
      setPerDhikrCounts(prev => {
        const next = { ...prev, [dhikrId]: (prev[dhikrId] || 0) + 1 };
        // AsyncStorage'a kaydet (Debounce-suz basit kaydetme, zikir hızı için yeterli)
        void AsyncStorage.setItem(LOCAL_DHIKR_COUNTS_KEY, JSON.stringify({
          dateKey: todayKey,
          counts: next
        }));
        return next;
      });
    }
  }, [flushDhikr, todayKey, user?.uid]);

  const dhikrCount = dhikrBase + localDhikrDelta;

  return {
    user,
    todayKey,
    loading: dayLoading || loading,
    dhikrCount,
    perDhikrCounts, // Component'e aç
    incrementDhikr,
    flushDhikr,
  };
};

export default useZikirDuaDailyStats;
