import { useState, useEffect, useMemo } from 'react';
import { useLocation } from '../../../contexts/LocationContext';

const API_BASE = 'https://api.aladhan.com/v1/calendar';
const METHOD = 13; // Türkiye için

export const usePrayerTimes = () => {
  // HomeHeader ile BİREBİR aynı konum hook'u
  const { location: userLocation, city: userCity, hasPermission, isLoading: locationLoading } = useLocation();
  const [prayerTimesList, setPrayerTimesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  // HomeHeader ile BİREBİR aynı mantık
  useEffect(() => {
    // Konum yüklenirken bekle, sonra fetch et (HomeHeader satır 107 - BİREBİR AYNI)
    if (locationLoading) {
      return;
    }

    const fetchMonthlyPrayerTimes = async () => {
      // Eğer konum izni varsa ve konum alındıysa, koordinat ile sorgula (HomeHeader satır 64)
      if (!hasPermission || !userLocation) {
        // Konum yoksa loading'i false yap (sonsuz loading'i önle)
        console.log('🕌 İmsakiye: Konum yok, hasPermission:', hasPermission, 'userLocation:', userLocation);
        setLoading(false);
        return;
      }

      // Konum değerlerini kontrol et
      if (typeof userLocation.latitude !== 'number' || typeof userLocation.longitude !== 'number') {
        console.error('🕌 İmsakiye: Konum koordinatları geçersiz', userLocation);
        setError('Konum bilgisi alınamadı');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();
        
        console.log('🕌 İmsakiye konuma göre alınıyor:', userCity, userLocation.latitude, userLocation.longitude);
        // Calendar API formatı: /calendar?month=X&year=Y&latitude=Z&longitude=W&method=M
        const finalUrl = `${API_BASE}?month=${currentMonth}&year=${currentYear}&latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&method=${METHOD}`;
        
        console.log('🕌 İmsakiye API URL:', finalUrl);

        const response = await fetch(finalUrl);
        const result = await response.json();

        console.log('🕌 İmsakiye API Response:', JSON.stringify(result).substring(0, 500));

        if (!response.ok || result.code !== 200) {
          const errorMsg = result.data || result.status || `API Error: ${response.status}`;
          console.error('🕌 İmsakiye API Hatası:', errorMsg);
          throw new Error(typeof errorMsg === 'string' ? errorMsg : 'Namaz vakitleri alınamadı');
        }

        // Calendar API response kontrolü - result.data array olmalı
        // API response formatı: { code: 200, data: [...] }
        if (result && result.data && Array.isArray(result.data) && result.data.length > 0) {
          const formattedData = result.data.map((day) => {
            // API date formatı: "01-12-2025" (DD-MM-YYYY)
            const dateStr = day.date.gregorian.date; // "01-12-2025"
            const [dayPart, monthPart, yearPart] = dateStr.split('-');
            // JavaScript Date: month 0-indexed olduğu için -1
            const date = new Date(parseInt(yearPart), parseInt(monthPart) - 1, parseInt(dayPart));
            
            return {
              date,
              dateStr: dateStr,
              times: {
                imsak: day.timings.Fajr.split(' ')[0],
                gunes: day.timings.Sunrise.split(' ')[0],
                ogle: day.timings.Dhuhr.split(' ')[0],
                ikindi: day.timings.Asr.split(' ')[0],
                aksam: day.timings.Maghrib.split(' ')[0],
                yatsi: day.timings.Isha.split(' ')[0],
              },
            };
          });

          // Geçmiş günleri filtrele (bugün dahil)
          const filteredData = formattedData.filter(item => {
            const itemDate = new Date(item.date);
            itemDate.setHours(0, 0, 0, 0);
            return itemDate >= today;
          });

          console.log('🕌 İmsakiye formatted data length:', formattedData.length, 'filtered:', filteredData.length);

          setPrayerTimesList(filteredData);
          setLoading(false);
        } else {
          console.error('İmsakiye API response hatası:', result);
          setError('Namaz vakitleri alınamadı');
          setLoading(false);
        }
      } catch (error) {
        console.error('İmsakiye çekme hatası:', error.message || error);
        setError(error.message || 'Namaz vakitleri alınamadı');
        setLoading(false);
      }
    };

    fetchMonthlyPrayerTimes();
  }, [userLocation, hasPermission, userCity, locationLoading, today]); // HomeHeader ile BİREBİR aynı dependency array

  return {
    prayerTimesList,
    loading,
    error,
    hasPermission,
    userLocation,
    locationLoading,
    today,
  };
};
