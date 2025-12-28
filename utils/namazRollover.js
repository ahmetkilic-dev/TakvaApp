import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';

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

const dayDiff = (fromKey, toKey) => {
  const from = parseDayKey(fromKey);
  const to = parseDayKey(toKey);
  if (!from || !to) return 0;
  const diff = Math.floor((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
};

/**
 * Kullanıcı bazlı namaz rollover:
 * - Son kayıtlı gün ile bugün farklıysa:
 *   - Son günün işaretlenmeyenlerini kaza sayaçlarına ekler
 *   - Aradaki günleri (app'e girilmediyse) tüm vakitler kaçırılmış kabul edip ekler
 *   - Bugün için namazDurumu.completed sıfırlanır
 */
export async function rolloverNamazIfNeeded({ db, uid, todayKey }) {
  if (!db || !uid || !todayKey) return;

  const userRef = doc(db, 'users', uid);

  await runTransaction(db, async (tx) => {
    const snap = await tx.get(userRef);
    const data = snap.exists() ? snap.data() : {};

    const prev = data?.namazDurumu || {};
    const prevDayKey = prev?.dateKey || todayKey;
    const prevCompleted = { ...emptyCompleted(), ...(prev?.completed || {}) };

    const diffDays = dayDiff(prevDayKey, todayKey);
    if (diffDays <= 0) {
      // aynı gün: normalize
      tx.set(
        userRef,
        {
          namazDurumu: {
            dateKey: todayKey,
            completed: prevCompleted,
            updatedAt: serverTimestamp(),
          },
        },
        { merge: true }
      );
      return;
    }

    const inc = { sabah: 0, ogle: 0, ikindi: 0, aksam: 0, yatsi: 0 };
    for (const key of PRAYER_KEYS) {
      inc[key] += prevCompleted[key] ? 0 : 1;
    }

    if (diffDays > 1) {
      const extra = diffDays - 1;
      for (const key of PRAYER_KEYS) {
        inc[key] += extra;
      }
    }

    const currentKaza = data?.kazaNamazlari || {};
    const nextKaza = {
      ...currentKaza,
      sabah: Math.max(0, Number(currentKaza.sabah || 0) + inc.sabah),
      ogle: Math.max(0, Number(currentKaza.ogle || 0) + inc.ogle),
      ikindi: Math.max(0, Number(currentKaza.ikindi || 0) + inc.ikindi),
      aksam: Math.max(0, Number(currentKaza.aksam || 0) + inc.aksam),
      yatsi: Math.max(0, Number(currentKaza.yatsi || 0) + inc.yatsi),
    };

    tx.set(
      userRef,
      {
        kazaNamazlari: nextKaza,
        namazDurumu: {
          dateKey: todayKey,
          completed: emptyCompleted(),
          rolledFrom: prevDayKey,
          rolledDays: diffDays,
          updatedAt: serverTimestamp(),
        },
      },
      { merge: true }
    );
  });
}


