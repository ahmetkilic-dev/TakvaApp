import { useMemo } from 'react';
import { usePrayerTimes } from '../contexts/PrayerTimesContext';

/**
 * Hatırlatıcı ekranı için bugünkü namaz vakitlerini al
 * Artık global PrayerTimesContext'ten okur - API çağrısı yapmaz!
 */
export const usePrayerTimesForReminders = () => {
  const { dailyTimes, displayCity, loading } = usePrayerTimes();

  // dailyTimes formatını hatırlatıcı formatına çevir
  const prayerTimes = useMemo(() => {
    if (!dailyTimes || dailyTimes.length === 0) return [];

    // dailyTimes: [{ label: 'İmsak', time: '06:43' }, ...]
    // Hatırlatıcı formatı: [{ id: 1, label: 'İmsak', time: '06:43', key: 'imsak' }, ...]

    const keyMap = {
      'İmsak': 'imsak',
      'Güneş': 'gunes',
      'Öğle': 'ogle',
      'İkindi': 'ikindi',
      'Akşam': 'aksam',
      'Yatsı': 'yatsi'
    };

    return dailyTimes.map((prayer, index) => ({
      id: index + 1,
      label: prayer.label,
      time: prayer.time,
      key: keyMap[prayer.label] || prayer.label.toLowerCase()
    }));
  }, [dailyTimes]);

  return {
    prayerTimes,
    loading,
    error: null,
    displayCity,
  };
};

