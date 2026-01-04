import { useCallback, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { supabase } from '../../../lib/supabase';


const DEFAULT_KAZA_NAMAZ = {
  sabah: 0,
  ogle: 0,
  ikindi: 0,
  aksam: 0,
  yatsi: 0,
  vitir: 0,
};

const DEFAULT_KAZA_ORUC = { oruc: 0 };

// In-memory cache
let globalCache = {
  namaz: { ...DEFAULT_KAZA_NAMAZ },
  oruc: { ...DEFAULT_KAZA_ORUC },
  isLoaded: false,
  timestamp: 0
};

export function useKazaCounters() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(!globalCache.isLoaded);
  const [kazaNamazlari, setKazaNamazlari] = useState(globalCache.namaz);
  const [kazaOruclari, setKazaOruclari] = useState(globalCache.oruc);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsub;
  }, []);

  const ensureUserDoc = useCallback(async (uid) => {
    const { data: profile } = await supabase.from('profiles').select('id').eq('id', uid).maybeSingle();
    if (!profile) {
      await supabase.from('profiles').insert({ id: uid });
    }

    const { data: kaza } = await supabase.from('kaza_counters').select('user_id').eq('user_id', uid).maybeSingle();
    if (!kaza) {
      await supabase.from('kaza_counters').insert({
        user_id: uid,
        namaz_counts: DEFAULT_KAZA_NAMAZ,
        oruc_counts: DEFAULT_KAZA_ORUC,
        updated_at: new Date().toISOString()
      });
    }
  }, []);

  const refresh = useCallback(async (force = false) => {
    if (!user?.uid) {
      setKazaNamazlari(DEFAULT_KAZA_NAMAZ);
      setKazaOruclari(DEFAULT_KAZA_ORUC);
      setLoading(false);
      return;
    }

    // Eğer cache yüklüyse ve force değilse, cache'i kullan
    if (globalCache.isLoaded && !force) {
      setKazaNamazlari(globalCache.namaz);
      setKazaOruclari(globalCache.oruc);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      await ensureUserDoc(user.uid);

      const { data: kazaData } = await supabase
        .from('kaza_counters')
        .select('*')
        .eq('user_id', user.uid)
        .maybeSingle();

      if (kazaData) {
        const newNamaz = { ...DEFAULT_KAZA_NAMAZ, ...(kazaData.namaz_counts || {}) };
        const newOruc = { ...DEFAULT_KAZA_ORUC, ...(kazaData.oruc_counts || {}) };

        // Update local state and global cache
        setKazaNamazlari(newNamaz);
        setKazaOruclari(newOruc);

        globalCache.namaz = newNamaz;
        globalCache.oruc = newOruc;
        globalCache.isLoaded = true;
        globalCache.timestamp = Date.now();
      }
    } catch (error) {
      console.error('Error refreshing kaza counters from Supabase:', error);
    } finally {
      setLoading(false);
    }
  }, [ensureUserDoc, user?.uid]);

  // Initial load
  useEffect(() => {
    if (user?.uid) {
      refresh();
    }
  }, [user?.uid, refresh]);

  const updateNamaz = useCallback(
    async (type, delta) => {
      if (!user?.uid) return;

      const nextNamaz = {
        ...kazaNamazlari,
        [type]: Math.max(0, Number(kazaNamazlari[type] || 0) + delta)
      };

      // UI sync first for responsiveness
      setKazaNamazlari(nextNamaz);

      // Update Cache immediately
      globalCache.namaz = nextNamaz;

      try {
        await supabase.from('kaza_counters').upsert({
          user_id: user.uid,
          namaz_counts: nextNamaz,
          updated_at: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error updating kaza namaz in Supabase:', error);
        // Rollback strategy could be added here
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

      // Update Cache immediately
      globalCache.oruc = nextOruc;

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


