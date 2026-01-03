import { useCallback, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { supabase } from '../../../lib/supabase';
import { getTodayKeyLocal } from '../../../utils/dateKey';

const DEFAULT_KAZA_NAMAZ = {
  sabah: 0,
  ogle: 0,
  ikindi: 0,
  aksam: 0,
  yatsi: 0,
  vitir: 0,
};

const DEFAULT_KAZA_ORUC = { oruc: 0 };

export function useKazaCounters() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [kazaNamazlari, setKazaNamazlari] = useState(DEFAULT_KAZA_NAMAZ);
  const [kazaOruclari, setKazaOruclari] = useState(DEFAULT_KAZA_ORUC);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => setUser(firebaseUser));
    return unsub;
  }, []);

  const ensureUserDoc = useCallback(async (uid) => {
    const { data: profile } = await supabase.from('profiles').select('id').eq('id', uid).single();
    if (!profile) {
      await supabase.from('profiles').insert({ id: uid });
    }

    const { data: kaza } = await supabase.from('kaza_counters').select('user_id').eq('user_id', uid).single();
    if (!kaza) {
      await supabase.from('kaza_counters').insert({
        user_id: uid,
        namaz_counts: DEFAULT_KAZA_NAMAZ,
        oruc_counts: DEFAULT_KAZA_ORUC,
        updated_at: new Date().toISOString()
      });
    }
  }, []);

  const refresh = useCallback(async () => {
    if (!user?.uid) {
      setKazaNamazlari(DEFAULT_KAZA_NAMAZ);
      setKazaOruclari(DEFAULT_KAZA_ORUC);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      await ensureUserDoc(user.uid);
      // Gün atladıysa kaza sayaçlarını otomatik artır (hesap bazlı) - ARTIK SUNUCU TARAFLI (SİLİNDİ)
      // await rolloverNamazIfNeeded({ uid: user.uid, todayKey: getTodayKeyLocal() });

      const { data: kazaData } = await supabase
        .from('kaza_counters')
        .select('*')
        .eq('user_id', user.uid)
        .single();

      if (kazaData) {
        setKazaNamazlari({ ...DEFAULT_KAZA_NAMAZ, ...(kazaData.namaz_counts || {}) });
        setKazaOruclari({ ...DEFAULT_KAZA_ORUC, ...(kazaData.oruc_counts || {}) });
      }
    } catch (error) {
      console.error('Error refreshing kaza counters from Supabase:', error);
    } finally {
      setLoading(false);
    }
  }, [ensureUserDoc, user?.uid]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const updateNamaz = useCallback(
    async (type, delta) => {
      if (!user?.uid) return;

      const nextNamaz = {
        ...kazaNamazlari,
        [type]: Math.max(0, Number(kazaNamazlari[type] || 0) + delta)
      };

      // UI sync first for responsiveness
      setKazaNamazlari(nextNamaz);

      try {
        await supabase.from('kaza_counters').upsert({
          user_id: user.uid,
          namaz_counts: nextNamaz,
          updated_at: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error updating kaza namaz in Supabase:', error);
      }
    },
    [user?.uid, kazaNamazlari]
  );

  const updateOruc = useCallback(
    async (type, delta) => {
      if (!user?.uid) return;

      const nextOruc = {
        ...kazaOruclari,
        [type]: Math.max(0, Number(kazaOruclari[type] || 0) + delta)
      };

      setKazaOruclari(nextOruc);

      try {
        await supabase.from('kaza_counters').upsert({
          user_id: user.uid,
          oruc_counts: nextOruc,
          updated_at: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error updating kaza oruc in Supabase:', error);
      }
    },
    [user?.uid, kazaOruclari]
  );

  const canEdit = useMemo(() => !!user?.uid, [user?.uid]);

  return {
    user,
    loading,
    canEdit,
    kazaNamazlari,
    kazaOruclari,
    updateNamaz,
    updateOruc,
    refresh,
  };
}

export default useKazaCounters;


