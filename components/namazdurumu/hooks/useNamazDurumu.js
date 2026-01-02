import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { supabase } from '../../../lib/supabase';
import { useDailyPrayerTimes } from '../../../hooks/useDailyPrayerTimes';
import { rolloverNamazIfNeeded } from '../../../utils/namazRollover';
import TaskService from '../../../services/TaskService';

import { useUserStats } from '../../../contexts/UserStatsContext';

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

import { UserInitService } from '../../../services/UserInitService';
import { UserStatsService } from '../../../services/UserStatsService';

// ... other imports ...

export function useNamazDurumu() {
  const { todayKey, arrived, currentPrayerKey, loading: timesLoading } = useDailyPrayerTimes();
  const { user, incrementTask, updateStat } = useUserStats();

  const [loading, setLoading] = useState(true);
  const [state, setState] = useState(() => ({
    dateKey: todayKey,
    completed: emptyCompleted(),
  }));

  const appStateRef = useRef(AppState.currentState);
  const midnightTimerRef = useRef(null);

  const ensureUserDoc = useCallback(async (uid) => {
    // Merkezi servis kullanarak user tablolarını garantiye al
    await UserInitService.initializeUser(uid);
  }, []);

  // ... (rolloverIfNeeded, refreshFromSupabase, useEffects - keep same) ...

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
        // optimistik state güncellemeleri - UI anında tepki vermeli
        // 1. Günlük görev ilerlemesini CONTEXT üzerinden güncelle
        if (next) {
          void incrementTask(5, 1);
        }

        // 2. Optimistik olarak global context'i de güncelle (Zıplama olmasın!)
        updateStat('total_prayers', next ? 1 : -1);

        // Arka plan işlemleri - UI'yı bloklamadan paralel çalıştır
        void Promise.all([
          supabase.from('namaz_durumu').upsert({
            user_id: user.uid,
            date_key: todayKey,
            completed: newState.completed,
            updated_at: new Date().toISOString()
          }),
          UserStatsService.rpcIncrement(user.uid, 'total_prayers', next ? 1 : -1)
        ]).catch(err => {
          // silent error or generic log if needed
        });
      } else {
        try {
          await AsyncStorage.setItem('@takva_namaz_durumu_local', JSON.stringify(newState));
        } catch (error) {
          // silent error
        }
      }
    },
    [arrived, state, user?.uid, todayKey, incrementTask]
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


