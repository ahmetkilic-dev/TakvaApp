import { useState, useEffect, useMemo } from 'react';
import { useLocation } from '../contexts/LocationContext';

const API_BASE = 'https://api.aladhan.com/v1/timings';

const pad2 = (n) => String(n).padStart(2, '0');
const toDayKey = (date) => {
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  return `${y}-${m}-${d}`;
};

const createDateFromTime = (timeStr) => {
  if (!timeStr) return null;
  const cleanTime = timeStr.split(' ')[0];
  const now = new Date();
  const [hours, minutes] = cleanTime.split(':').map(Number);
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
};

/**
 * Namazdurumu için namaz vakitlerini ve vakit takibini sağlar
 * todayKey, arrived, currentPrayerKey, loading döndürür
 */
export const useDailyPrayerTimes = () => {
  const { location: userLocation, city: userCity, hasPermission, isLoading: locationLoading } = useLocation();
  
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [loading, setLoading] = useState(true);

  const todayKey = useMemo(() => toDayKey(new Date()), []);

  // API'den vakitleri çek
  useEffect(() => {
    const fetchTimes = async () => {
      try {
        setLoading(true);

        const now = new Date();
        const dateStr = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;
        
        let finalUrl;
        
        if (hasPermission && userLocation) {
          finalUrl = `${API_BASE}/${dateStr}?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&method=13`;
        } else {
          // Fallback: İstanbul
          finalUrl = `${API_BASE}/${dateStr}?city=Istanbul&country=Turkey&method=13`;
        }

        const response = await fetch(finalUrl);
        const result = await response.json();

        if (result.data && result.data.timings) {
          const t = result.data.timings;
          setPrayerTimes({
            sabah: t.Fajr,
            ogle: t.Dhuhr,
            ikindi: t.Asr,
            aksam: t.Maghrib,
            yatsi: t.Isha,
          });
        } else {
          // Fallback data
          setPrayerTimes({
            sabah: '06:43',
            ogle: '13:06',
            ikindi: '15:24',
            aksam: '17:44',
            yatsi: '19:10',
          });
        }
      } catch (error) {
        console.error('🕌 Namazdurumu: Vakit çekme hatası:', error);
        // Fallback data
        setPrayerTimes({
          sabah: '06:43',
          ogle: '13:06',
          ikindi: '15:24',
          aksam: '17:44',
          yatsi: '19:10',
        });
      } finally {
        setLoading(false);
      }
    };

    if (!locationLoading) {
      fetchTimes();
    }
  }, [userLocation, hasPermission, locationLoading]);

  // Vakit gelmiş mi kontrolü
  const arrived = useMemo(() => {
    if (!prayerTimes) {
      return { sabah: false, ogle: false, ikindi: false, aksam: false, yatsi: false };
    }

    const now = new Date();
    
    return {
      sabah: createDateFromTime(prayerTimes.sabah) <= now,
      ogle: createDateFromTime(prayerTimes.ogle) <= now,
      ikindi: createDateFromTime(prayerTimes.ikindi) <= now,
      aksam: createDateFromTime(prayerTimes.aksam) <= now,
      yatsi: createDateFromTime(prayerTimes.yatsi) <= now,
    };
  }, [prayerTimes]);

  // Şu anki vakit
  const currentPrayerKey = useMemo(() => {
    if (!prayerTimes) return null;

    const now = new Date();
    const keys = ['yatsi', 'aksam', 'ikindi', 'ogle', 'sabah'];
    
    for (const key of keys) {
      if (createDateFromTime(prayerTimes[key]) <= now) {
        return key;
      }
    }
    
    return null;
  }, [prayerTimes]);

  return {
    todayKey,
    arrived,
    currentPrayerKey,
    loading: loading || locationLoading,
    prayerTimes,
  };
};
