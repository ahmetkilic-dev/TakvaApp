import { useState, useEffect } from 'react';
import { useLocation } from '../contexts/LocationContext';

const API_BASE = 'https://api.aladhan.com/v1/timings';

const createDateFromTime = (timeStr) => {
  if (!timeStr) return null;
  const cleanTime = timeStr.split(' ')[0];
  const now = new Date();
  const [hours, minutes] = cleanTime.split(':').map(Number);
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
};

/**
 * Bugünkü namaz vakitlerini al (Home ile aynı mantık)
 * HomeHeader ile birebir aynı API ve mantığı kullanır
 */
export const usePrayerTimesForReminders = () => {
  const { location: userLocation, city: userCity, hasPermission, isLoading: locationLoading } = useLocation();

  const [prayerTimes, setPrayerTimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [displayCity, setDisplayCity] = useState('Konum alınıyor...');

  useEffect(() => {
    const fetchTimes = async () => {
      try {
        setLoading(true);
        setError(null);

        const now = new Date();
        const dateStr = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

        let finalUrl;

        // Eğer konum izni varsa ve konum alındıysa, koordinat ile sorgula
        if (hasPermission && userLocation) {
          console.log('🕌 Hatırlatıcı: Namaz vakitleri konuma göre alınıyor');
          finalUrl = `${API_BASE}/${dateStr}?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&method=13`;
          setDisplayCity(userCity || 'Türkiye');
        } else {
          // Varsayılan olarak İstanbul kullan
          console.log('🕌 Hatırlatıcı: Varsayılan İstanbul');
          finalUrl = `${API_BASE}/${dateStr}?city=Istanbul&country=Turkey&method=13`;
          setDisplayCity('İstanbul');
        }

        const response = await fetch(finalUrl);
        const result = await response.json();

        if (result.data && result.data.timings) {
          const t = result.data.timings;
          const mapping = [
            { id: 1, label: 'İmsak', time: t.Fajr, key: 'imsak' },
            { id: 2, label: 'Güneş', time: t.Sunrise, key: 'gunes' },
            { id: 3, label: 'Öğle', time: t.Dhuhr, key: 'ogle' },
            { id: 4, label: 'İkindi', time: t.Asr, key: 'ikindi' },
            { id: 5, label: 'Akşam', time: t.Maghrib, key: 'aksam' },
            { id: 6, label: 'Yatsı', time: t.Isha, key: 'yatsi' }
          ];
          setPrayerTimes(mapping);
        } else {
          throw new Error('Namaz vakitleri alınamadı');
        }
      } catch (err) {
        console.error('🕌 Hatırlatıcı: API hatası', err);
        setError(err.message);
        // Fallback data
        setPrayerTimes([
          { id: 1, label: 'İmsak', time: '06:43', key: 'imsak' },
          { id: 2, label: 'Güneş', time: '08:15', key: 'gunes' },
          { id: 3, label: 'Öğle', time: '13:06', key: 'ogle' },
          { id: 4, label: 'İkindi', time: '15:24', key: 'ikindi' },
          { id: 5, label: 'Akşam', time: '17:44', key: 'aksam' },
          { id: 6, label: 'Yatsı', time: '19:10', key: 'yatsi' }
        ]);
        setDisplayCity('İstanbul');
      } finally {
        setLoading(false);
      }
    };

    // Konum yüklenirken bekle, sonra fetch et
    if (!locationLoading) {
      fetchTimes();

      // Günlük otomatik yenileme - her gün gece 00:01'de
      const now = new Date();
      const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 1, 0);
      const msUntilMidnight = tomorrow - now;

      console.log(`⏰ Bir sonraki namaz vakti güncellemesi: ${tomorrow.toLocaleString('tr-TR')}`);

      const midnightTimer = setTimeout(() => {
        console.log('🌙 Gece yarısı - Namaz vakitleri güncelleniyor...');
        fetchTimes();

        // Her 24 saatte bir tekrarla
        const dailyInterval = setInterval(() => {
          console.log('🌙 Günlük güncelleme - Namaz vakitleri yenileniyor...');
          fetchTimes();
        }, 24 * 60 * 60 * 1000);

        return () => clearInterval(dailyInterval);
      }, msUntilMidnight);

      return () => clearTimeout(midnightTimer);
    }
  }, [userLocation, hasPermission, userCity, locationLoading]);

  return {
    prayerTimes,
    loading: loading || locationLoading,
    error,
    displayCity,
  };
};
