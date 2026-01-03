import { usePrayerTimes } from '../contexts/PrayerTimesContext';

/**
 * Namazdurumu için namaz vakitlerini ve vakit takibini sağlar
 * Artık global PrayerTimesContext'ten okur - API çağrısı yapmaz!
 * todayKey, arrived, currentPrayerKey, loading döndürür
 */
export const useDailyPrayerTimes = () => {
  const { todayKey, arrived, currentPrayerKey, loading, dailyTimes } = usePrayerTimes();

  return {
    todayKey,
    arrived,
    currentPrayerKey,
    loading,
    prayerTimes: dailyTimes,
  };
};

