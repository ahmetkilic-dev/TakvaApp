import { useCallback, useEffect, useMemo, useState } from 'react';
import { supabase } from '../../../lib/supabase';
import { useDayChangeContext } from '../../../contexts/DayChangeContext';
import { useUserStats } from '../../../contexts/UserStatsContext';

const pad2 = (n) => String(n).padStart(2, '0');
const toDayKeyLocal = (date) => {
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  return `${y}-${m}-${d}`;
};

/**
 * Günlük ayet gösterme hook'u
 * Kullanıcı günde 1 kere ayet kaydırıp görebilir
 * Gün değiştiğinde otomatik sıfırlanır
 */
export const useVersesDailyStats = () => {
  const { getToday, isLoading: dayLoading, isDayChanged } = useDayChangeContext();
  const { user } = useUserStats();

  const [loading, setLoading] = useState(true);
  const [verseRevealed, setVerseRevealed] = useState(false); // Bugün ayet gösterildi mi?
  const [currentVerseData, setCurrentVerseData] = useState(null); // Bugünün ayeti

  const today = useMemo(() => (getToday ? getToday() : new Date()), [getToday]);
  const todayKey = useMemo(() => toDayKeyLocal(today), [today]);

  // Gün değişimi kontrolü
  /* Local daily reset logic removed - Date key handles uniqueness */

  // Supabase'den günlük ayet verisini yükle
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        if (!alive) return;
        if (!user?.uid) {
          setVerseRevealed(false);
          setCurrentVerseData(null);
          setLoading(false);
          return;
        }

        setLoading(true);
        const { data, error } = await supabase
          .from('daily_user_stats')
          .select('verse_revealed, verse_data')
          .eq('user_id', user.uid)
          .eq('date_key', todayKey)
          .single();

        if (!alive) return;

        if (data) {
          const revealed = Boolean(data.verse_revealed);
          setVerseRevealed(revealed);

          if (revealed && data.verse_data) {
            setCurrentVerseData(data.verse_data);
          } else {
            setCurrentVerseData(null);
          }
        } else {
          setVerseRevealed(false);
          setCurrentVerseData(null);
        }
      } catch (e) {
        console.warn('📖 Günlük ayet verisi yükleme hatası:', e?.message || e);
        setVerseRevealed(false);
        setCurrentVerseData(null);
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [todayKey, user?.uid]);

  // Ayeti kaydet ve göster
  const revealVerse = useCallback(
    async (verseData) => {
      if (!user?.uid) {
        console.warn('📖 Kullanıcı giriş yapmamış');
        return { success: false, message: 'Kullanıcı giriş yapmamış' };
      }

      if (verseRevealed) {
        console.warn('📖 Bugün zaten ayet gösterildi');
        return { success: false, message: 'Bugün zaten ayet gösterildi' };
      }

      try {
        // Supabase'e kaydet (Günlük bazda)
        await supabase.from('daily_user_stats').upsert({
          user_id: user.uid,
          date_key: todayKey,
          verse_revealed: true,
          verse_data: {
            id: verseData.id,
            arabic: verseData.arabic,
            turkish: verseData.turkish,
            reference: verseData.reference,
            surahNumber: verseData.surahNumber,
            surahName: verseData.surahName,
            ayahNumber: verseData.ayahNumber,
          },
          updated_at: new Date().toISOString()
        });

        // Toplam hanesine de bir tane ekle (Kumulatif / Hesap bazlı)
        await supabase.rpc('increment_user_stat', {
          target_user_id: user.uid,
          column_name: 'total_verses',
          increment_by: 1
        });

        // State güncelle
        setVerseRevealed(true);
        setCurrentVerseData(verseData);

        // 1. Günlük görev tamamlama - ARTIK SUNUCU TARAFLI
        // await incrementTask(1, 1);

        console.log(`📖 Ayet gösterildi ve kaydedildi (${todayKey}): ${verseData.reference}`);
        return { success: true, message: 'Ayet gösterildi' };
      } catch (e) {
        console.error('📖 Ayet kaydetme hatası:', e?.message || e);
        return { success: false, message: 'Ayet kaydedilemedi' };
      }
    },
    [todayKey, user?.uid, verseRevealed]
  );


  return {
    user,
    todayKey,
    loading: dayLoading || loading,
    verseRevealed, // Bugün ayet gösterildi mi?
    canRevealVerse: !verseRevealed, // Bugün ayet gösterebilir mi?
    currentVerseData, // Bugünün ayeti (varsa)
    revealVerse, // Ayeti göster ve kaydet
  };
};

export default useVersesDailyStats;


