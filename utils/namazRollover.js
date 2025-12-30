import { supabase } from '../lib/supabase';

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
export async function rolloverNamazIfNeeded({ uid, todayKey }) {
  if (!uid || !todayKey) return;

  try {
    // 1. Get latest namaz_durumu record
    const { data: latestRecord, error: lError } = await supabase
      .from('namaz_durumu')
      .select('*')
      .eq('user_id', uid)
      .order('date_key', { ascending: false })
      .limit(1)
      .single();

    const prevDayKey = latestRecord?.date_key || todayKey;
    const prevCompleted = latestRecord?.completed || emptyCompleted();

    const diffDays = dayDiff(prevDayKey, todayKey);
    if (diffDays <= 0) {
      return;
    }

    // 2. Calculate missed prayers
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

    // 3. Get current kaza counters
    const { data: kazaData, error: kError } = await supabase
      .from('kaza_counters')
      .select('*')
      .eq('user_id', uid)
      .single();

    const currentKaza = kazaData?.namaz_counts || { sabah: 0, ogle: 0, ikindi: 0, aksam: 0, yatsi: 0, vitir: 0 };
    const nextKaza = {
      ...currentKaza,
      sabah: Math.max(0, Number(currentKaza.sabah || 0) + inc.sabah),
      ogle: Math.max(0, Number(currentKaza.ogle || 0) + inc.ogle),
      ikindi: Math.max(0, Number(currentKaza.ikindi || 0) + inc.ikindi),
      aksam: Math.max(0, Number(currentKaza.aksam || 0) + inc.aksam),
      yatsi: Math.max(0, Number(currentKaza.yatsi || 0) + inc.yatsi),
    };

    // 4. Update kaza_counters and insert today's namaz_durumu
    await supabase.from('kaza_counters').upsert({
      user_id: uid,
      namaz_counts: nextKaza,
      updated_at: new Date().toISOString()
    });

    await supabase.from('namaz_durumu').upsert({
      user_id: uid,
      date_key: todayKey,
      completed: emptyCompleted(),
      updated_at: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error during namaz rollover:', error);
  }
}


