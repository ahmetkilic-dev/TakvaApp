import { useCallback, useEffect, useMemo, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, runTransaction, serverTimestamp, setDoc } from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig';
import { getTodayKeyLocal } from '../../../utils/dateKey';
import { rolloverNamazIfNeeded } from '../../../utils/namazRollover';

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
    const userRef = doc(db, 'users', uid);
    await setDoc(
      userRef,
      {
        kazaNamazlari: DEFAULT_KAZA_NAMAZ,
        kazaOruclari: DEFAULT_KAZA_ORUC,
        kazaUpdatedAt: serverTimestamp(),
      },
      { merge: true }
    );
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
      // Gün atladıysa kaza sayaçlarını otomatik artır (hesap bazlı)
      await rolloverNamazIfNeeded({ db, uid: user.uid, todayKey: getTodayKeyLocal() });
      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);
      const data = snap.exists() ? snap.data() : {};
      setKazaNamazlari({ ...DEFAULT_KAZA_NAMAZ, ...(data?.kazaNamazlari || {}) });
      setKazaOruclari({ ...DEFAULT_KAZA_ORUC, ...(data?.kazaOruclari || {}) });
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
      const userRef = doc(db, 'users', user.uid);

      await runTransaction(db, async (tx) => {
        const snap = await tx.get(userRef);
        const data = snap.exists() ? snap.data() : {};
        const current = Number(data?.kazaNamazlari?.[type] || 0);
        const next = Math.max(0, current + delta);
        tx.set(
          userRef,
          {
            kazaNamazlari: { [type]: next },
            kazaUpdatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      });

      // UI sync
      setKazaNamazlari((prev) => ({ ...prev, [type]: Math.max(0, Number(prev[type] || 0) + delta) }));
    },
    [user?.uid]
  );

  const updateOruc = useCallback(
    async (type, delta) => {
      if (!user?.uid) return;
      const userRef = doc(db, 'users', user.uid);

      await runTransaction(db, async (tx) => {
        const snap = await tx.get(userRef);
        const data = snap.exists() ? snap.data() : {};
        const current = Number(data?.kazaOruclari?.[type] || 0);
        const next = Math.max(0, current + delta);
        tx.set(
          userRef,
          {
            kazaOruclari: { [type]: next },
            kazaUpdatedAt: serverTimestamp(),
          },
          { merge: true }
        );
      });

      setKazaOruclari((prev) => ({ ...prev, [type]: Math.max(0, Number(prev[type] || 0) + delta) }));
    },
    [user?.uid]
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


