import { useCallback, useEffect, useMemo, useState } from 'react';
import { db } from '../../../firebaseConfig';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { useDayChangeContext } from '../../../contexts/DayChangeContext';

const DAILY_STATS_SUBCOL = 'dailyStats'; // users/{uid}/dailyStats/{YYYY-MM-DD}

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
  const { user, getToday, isLoading: dayLoading, isDayChanged } = useDayChangeContext();

  const [loading, setLoading] = useState(true);
  const [verseRevealed, setVerseRevealed] = useState(false); // Bugün ayet gösterildi mi?
  const [currentVerseData, setCurrentVerseData] = useState(null); // Bugünün ayeti

  const today = useMemo(() => (getToday ? getToday() : new Date()), [getToday]);
  const todayKey = useMemo(() => toDayKeyLocal(today), [today]);

  const dailyDocRef = useMemo(() => {
    if (!user?.uid) return null;
    return doc(db, 'users', user.uid, DAILY_STATS_SUBCOL, todayKey);
  }, [todayKey, user?.uid]);

  // Gün değişimi kontrolü
  useEffect(() => {
    if (isDayChanged) {
      console.log('📖 Gün değişti! Ayet gösterme hakkı sıfırlanıyor...');
      setVerseRevealed(false);
      setCurrentVerseData(null);
      console.log(`📖 Yeni gün başlangıcı (${todayKey}): Ayet gösterilebilir`);
    }
  }, [isDayChanged, todayKey]);

  // Firebase'den günlük ayet verisini yükle
  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        if (!alive) return;
        if (!user?.uid || !dailyDocRef) {
          setVerseRevealed(false);
          setCurrentVerseData(null);
          setLoading(false);
          return;
        }

        setLoading(true);
        const snap = await getDoc(dailyDocRef);
        if (!alive) return;

        if (snap.exists()) {
          const data = snap.data() || {};
          const revealed = Boolean(data.verseRevealed);
          setVerseRevealed(revealed);
          
          if (revealed && data.verseData) {
            setCurrentVerseData(data.verseData);
            console.log(`📖 Günlük ayet yüklendi (${todayKey}): ${data.verseData.reference}`);
          } else {
            setCurrentVerseData(null);
            console.log(`📖 Yeni gün başlangıcı (${todayKey}): Ayet henüz gösterilmedi`);
          }
        } else {
          setVerseRevealed(false);
          setCurrentVerseData(null);
          console.log(`📖 Yeni gün başlangıcı (${todayKey}): Ayet gösterilebilir`);
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
  }, [dailyDocRef, todayKey, user?.uid]);

  // Ayeti kaydet ve göster
  const revealVerse = useCallback(
    async (verseData) => {
      if (!user?.uid || !dailyDocRef) {
        console.warn('📖 Kullanıcı giriş yapmamış');
        return { success: false, message: 'Kullanıcı giriş yapmamış' };
      }

      if (verseRevealed) {
        console.warn('📖 Bugün zaten ayet gösterildi');
        return { success: false, message: 'Bugün zaten ayet gösterildi' };
      }

      try {
        // Firebase'e kaydet
        await setDoc(
          dailyDocRef,
          {
            date: todayKey,
            verseRevealed: true,
            verseData: {
              id: verseData.id,
              arabic: verseData.arabic,
              turkish: verseData.turkish,
              reference: verseData.reference,
              surahNumber: verseData.surahNumber,
              surahName: verseData.surahName,
              ayahNumber: verseData.ayahNumber,
            },
            updatedAt: serverTimestamp(),
          },
          { merge: true }
        );

        // State güncelle
        setVerseRevealed(true);
        setCurrentVerseData(verseData);

        console.log(`📖 Ayet gösterildi ve kaydedildi (${todayKey}): ${verseData.reference}`);
        return { success: true, message: 'Ayet gösterildi' };
      } catch (e) {
        console.error('📖 Ayet kaydetme hatası:', e?.message || e);
        return { success: false, message: 'Ayet kaydedilemedi' };
      }
    },
    [dailyDocRef, todayKey, user?.uid, verseRevealed]
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

