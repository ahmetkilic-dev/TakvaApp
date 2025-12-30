import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { supabase } from '../../../lib/supabase';
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
    // Profil ve kaza sayaçlarını kontrol et ve eksikse oluştur
    const { data: profile } = await supabase.from('profiles').select('id').eq('id', uid).single();
    if (!profile) {
      await supabase.from('profiles').insert({ id: uid });
    }

    const { data: kaza } = await supabase.from('kaza_counters').select('user_id').eq('user_id', uid).single();
    if (!kaza) {
      await supabase.from('kaza_counters').insert({
        user_id: uid,
        namaz_counts: { sabah: 0, ogle: 0, ikindi: 0, aksam: 0, yatsi: 0, vitir: 0 },
        oruc_counts: { oruc: 0 }
      });
    }

    const { data: stats } = await supabase.from('user_stats').select('user_id').eq('user_id', uid).single();
    if (!stats) {
      await supabase.from('user_stats').insert({ user_id: uid });
    }
  }, []);

  const rolloverIfNeeded = useCallback(
    async (uid) => rolloverNamazIfNeeded({ uid, todayKey }),
    [todayKey]
  );

  const refreshFromSupabase = useCallback(
    async (uid) => {
      console.log('🔄 refreshFromSupabase: Başladı');
      const { data: nd, error } = await supabase
        .from('namaz_durumu')
        .select('*')
        .eq('user_id', uid)
        .eq('date_key', todayKey)
        .single();

      console.log('📊 Supabase namazDurumu:', nd);

      const completed = { ...emptyCompleted(), ...(nd?.completed || {}) };
      const newState = { dateKey: nd?.dateKey || todayKey, completed };

      console.log('🔄 Yeni state set ediliyor:', newState);
      setState(newState);
      console.log('✅ refreshFromSupabase: Tamamlandı');
    },
    [todayKey]
  );

  // Initial load + rollover + state refresh
  useEffect(() => {
    let alive = true;
    (async () => {
      console.log('🔍 useNamazDurumu: useEffect çalıştı');
      console.log('👤 User:', user?.uid ? `Giriş yapılmış (${user.uid})` : 'Giriş yapılmamış');
      console.log('📅 Today Key:', todayKey);

      if (!user?.uid) {
        // Giriş yapmamış kullanıcılar için AsyncStorage'dan yükle
        try {
          const stored = await AsyncStorage.getItem('@takva_namaz_durumu_local');
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed.dateKey === todayKey) {
              setState(parsed);
            } else {
              setState({ dateKey: todayKey, completed: emptyCompleted() });
              await AsyncStorage.setItem('@takva_namaz_durumu_local', JSON.stringify({ dateKey: todayKey, completed: emptyCompleted() }));
            }
          } else {
            setState({ dateKey: todayKey, completed: emptyCompleted() });
          }
        } catch (error) {
          console.error('❌ AsyncStorage yükleme hatası:', error);
          setState({ dateKey: todayKey, completed: emptyCompleted() });
        }
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        await ensureUserDoc(user.uid);
        await rolloverIfNeeded(user.uid);

        if (!alive) return;
        await refreshFromSupabase(user.uid);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [user?.uid, todayKey, ensureUserDoc, rolloverIfNeeded, refreshFromSupabase]);

  // Gün içinde midnight rollover (app açık kalırsa)
  useEffect(() => {
    if (!user?.uid) return;

    const scheduleNext = () => {
      const now = new Date();
      const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5);
      const ms = Math.max(1000, nextMidnight.getTime() - now.getTime());
      midnightTimerRef.current = setTimeout(async () => {
        await rolloverIfNeeded(user.uid);
        await refreshFromSupabase(user.uid);
        scheduleNext();
      }, ms);
    };

    scheduleNext();
    return () => {
      if (midnightTimerRef.current) clearTimeout(midnightTimerRef.current);
      midnightTimerRef.current = null;
    };
  }, [refreshFromSupabase, rolloverIfNeeded, user?.uid]);

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
      if (!PRAYER_KEYS.includes(key)) return;
      if (!arrived?.[key]) return; // vakit gelmeden checkleme kapalı

      const next = !state.completed[key];
      const newState = {
        ...state,
        completed: { ...state.completed, [key]: next },
      };
      setState(newState);

      if (user?.uid) {
        console.log('☁️ Supabase\'e kaydediliyor...');
        await supabase.from('namaz_durumu').upsert({
          user_id: user.uid,
          date_key: todayKey,
          completed: newState.completed,
          updated_at: new Date().toISOString()
        });
      } else {
        try {
          await AsyncStorage.setItem('@takva_namaz_durumu_local', JSON.stringify(newState));
        } catch (error) {
          console.error('❌ AsyncStorage kaydetme hatası:', error);
        }
      }
    },
    [arrived, state, user?.uid, todayKey]
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


