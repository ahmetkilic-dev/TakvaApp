import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocation } from '../../contexts/LocationContext';

// İkonlar
import icHatirlatici from '../../assets/images/hatirlatici.png';
import icIlim from '../../assets/images/ilim.png';
import icKible from '../../assets/images/kible.png';
import icTakvim from '../../assets/images/takvim.png';
import icDahaFazla from '../../assets/images/daha-fazlasi.png';

// 🚀 ALADHAN API
const API_BASE = 'https://api.aladhan.com/v1/timings';

const createDateFromTime = (timeStr) => {
  if (!timeStr) return null;
  const cleanTime = timeStr.split(' ')[0];
  const now = new Date();
  const [hours, minutes] = cleanTime.split(':').map(Number);
  return new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
};

const getHijriDate = () => {
  try {
    return new Intl.DateTimeFormat('tr-TR-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date()).replace('Ah', '').trim();
  } catch (e) {
    return "";
  }
};

const HomeHeader = React.memo(() => {
  const router = useRouter();
  const fontFamily = 'Plus Jakarta Sans';
  const ACTIVE_COLOR = '#FFBA4A';
  const INACTIVE_COLOR = 'white';

  // Konum context'inden al
  const { location: userLocation, city: userCity, hasPermission, isLoading: locationLoading } = useLocation();

  const [prayerTimes, setPrayerTimes] = useState([]);
  const [displayData, setDisplayData] = useState({
    nextPrayerName: "Yükleniyor",
    remainingTime: "--:--:--",
    activeVakitIndex: -1
  });

  const [displayCity, setDisplayCity] = useState('Konum alınıyor...');

  // 1. API İsteği - Konum değiştiğinde güncelle (CACHE ile optimize edildi)
  useEffect(() => {
    let mounted = true;
    const fetchTimes = async () => {
      try {
        const now = new Date();
        const dateStr = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

        let finalUrl;
        let cacheKey;

        // Eğer konum izni varsa ve konum alındıysa, koordinat ile sorgula
        if (hasPermission && userLocation) {
          const lat = userLocation.latitude.toFixed(2);
          const lon = userLocation.longitude.toFixed(2);
          cacheKey = `@prayer_times_${dateStr}_${lat}_${lon}`;
          finalUrl = `${API_BASE}/${dateStr}?latitude=${userLocation.latitude}&longitude=${userLocation.longitude}&method=13`;
          setDisplayCity(userCity || 'Türkiye');
        } else {
          // Varsayılan olarak İstanbul kullan
          cacheKey = `@prayer_times_${dateStr}_istanbul`;
          finalUrl = `${API_BASE}/${dateStr}?city=Istanbul&country=Turkey&method=13`;
          if (mounted) setDisplayCity('İstanbul');
        }

        // Önce cache'i kontrol et
        const cached = await AsyncStorage.getItem(cacheKey);
        if (cached && mounted) {
          const parsedCache = JSON.parse(cached);
          setPrayerTimes(parsedCache);
          return; // Cache varsa API çağrısı yapma
        }

        // Cache yoksa API'den çek
        if (hasPermission && userLocation) {
          console.log('🕌 Namaz vakitleri konuma göre alınıyor:', userCity, userLocation.latitude, userLocation.longitude);
        }

        const response = await fetch(finalUrl);
        const result = await response.json();

        if (mounted && result.data && result.data.timings) {
          const t = result.data.timings;
          const mapping = [
            { label: 'İmsak', time: t.Fajr },
            { label: 'Güneş', time: t.Sunrise },
            { label: 'Öğle', time: t.Dhuhr },
            { label: 'İkindi', time: t.Asr },
            { label: 'Akşam', time: t.Maghrib },
            { label: 'Yatsı', time: t.Isha }
          ];
          setPrayerTimes(mapping);
          // Cache'e kaydet
          await AsyncStorage.setItem(cacheKey, JSON.stringify(mapping));
        } else if (mounted) {
          useFallbackData();
        }
      } catch (error) {
        if (mounted) useFallbackData();
      }
    };

    const useFallbackData = () => {
      setPrayerTimes([
        { label: 'İmsak', time: '06:43' }, { label: 'Güneş', time: '08:15' },
        { label: 'Öğle', time: '13:06' }, { label: 'İkindi', time: '15:24' },
        { label: 'Akşam', time: '17:44' }, { label: 'Yatsı', time: '19:10' }
      ]);
      setDisplayCity('İstanbul');
    };

    // Konum yüklenirken bekle, sonra fetch et
    if (!locationLoading) {
      fetchTimes();
    }
    return () => { mounted = false; };
  }, [userLocation, hasPermission, userCity, locationLoading]);

  // 2. Geri Sayım - Optimize Edilmiş
  useEffect(() => {
    if (prayerTimes.length === 0) return;

    const updateTimer = () => {
      const now = new Date();
      let nextIndex = -1;
      let targetDate = null;

      for (let i = 0; i < prayerTimes.length; i++) {
        const pDate = createDateFromTime(prayerTimes[i].time);
        if (pDate > now) {
          nextIndex = i;
          targetDate = pDate;
          break;
        }
      }

      if (nextIndex === -1) {
        nextIndex = 0;
        const imsakTime = createDateFromTime(prayerTimes[0].time);
        targetDate = new Date(imsakTime.getTime() + 24 * 60 * 60 * 1000);
      }

      let diff = Math.max(0, Math.floor((targetDate.getTime() - now.getTime()) / 1000));

      const h = String(Math.floor(diff / 3600)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600) / 60)).padStart(2, '0');
      const s = String(diff % 60).padStart(2, '0');
      const remainingTime = `${h}:${m}:${s}`;

      setDisplayData(prev => {
        // Sadece saniye değiştiğinde re-render olmaması için kontrol (gerekirse)
        // Ancak bu bir saat olduğu için her saniye render mecburi.
        // Fakat index değişmediyse activeVakitIndex'i koru
        if (prev.remainingTime === remainingTime && prev.activeVakitIndex === nextIndex) return prev;

        return {
          nextPrayerName: prayerTimes[nextIndex].label,
          remainingTime,
          activeVakitIndex: nextIndex
        };
      });
    };

    // İlk hesap
    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [prayerTimes]);

  const [hours, minutes, seconds] = displayData.remainingTime.split(':');

  const handleMenuPress = useCallback((path) => {
    router.push(path);
  }, [router]);

  const menuItems = useMemo(() => [
    { image: icHatirlatici, label: 'Hatırlatıcı', path: '/(app)/(services)/hatirlatici' },
    { image: icIlim, label: 'İlim', path: '/(app)/(services)/ilim' },
    { image: icKible, label: 'Kıble', path: '/(app)/(services)/qibla' },
    { image: icTakvim, label: 'Takvim', path: '/(app)/(services)/diniGunler' },
    { image: icDahaFazla, label: 'Daha fazlası', path: '/(app)/(services)/guide-detail' },
  ], []);

  const hijriDate = useMemo(() => getHijriDate(), []);
  const todayDate = useMemo(() => new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }), []);

  return (
    <View className="px-4 pt-6 pb-6">

      {/* 1. SAYAÇ ve KONUM ALANI */}
      <View className="items-center mb-6">
        <Text
          style={{ fontFamily, fontSize: 18, fontWeight: '400' }}
          className="text-white mb-0 tracking-wide"
        >
          {displayData.nextPrayerName} vaktine
        </Text>

        {/* MERKEZİ SAYAÇ ALANI */}
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: -4 }}>

          {/* SAAT, DAKİKA ve SANİYE KUTUSU */}
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text
              style={{
                fontFamily,
                color: ACTIVE_COLOR,
                fontSize: 80,
                fontWeight: '600',
                lineHeight: 90,
                includeFontPadding: false,
              }}
            >
              {hours}:{minutes}
            </Text>

            {/* SANİYE */}
            <Text
              style={{
                fontFamily,
                color: ACTIVE_COLOR,
                fontSize: 24,
                fontWeight: '500',
                includeFontPadding: false,
                marginLeft: 2,
              }}
            >
              :{seconds}
            </Text>
          </View>

        </View>

        <Text
          style={{ fontFamily, fontSize: 16, fontWeight: '400', color: INACTIVE_COLOR }}
          className="mt-0"
        >
          {displayCity}
        </Text>
      </View>

      {/* 2. VAKİTLER ÇİZELGESİ */}
      <View className="flex-row justify-center items-center mb-4 px-1" style={{ gap: 17 }}>
        {prayerTimes.length > 0 ? (
          prayerTimes.map((v, i) => {
            const isActive = i === displayData.activeVakitIndex;
            const textColor = isActive ? ACTIVE_COLOR : INACTIVE_COLOR;

            return (
              <View key={i} className="items-center gap-y-1">
                <Text style={{ fontFamily, color: textColor, fontSize: 14, fontWeight: '400' }}>
                  {v.label}
                </Text>
                <Text style={{ fontFamily, color: textColor, fontSize: 16, fontWeight: '700' }}>
                  {v.time.split(' ')[0]}
                </Text>
              </View>
            );
          })
        ) : (
          <Text style={{ fontFamily }} className="text-white/50 text-center w-full">Yükleniyor...</Text>
        )}
      </View>

      {/* 3. TARİH ALANI */}
      <View className="items-center mb-8 pt-2 w-full self-center">
        <Text style={{ fontFamily, fontSize: 14, fontWeight: '400', color: '#FFFFFF' }} className="tracking-wide">
          {hijriDate} / {todayDate}
        </Text>
      </View>

      {/* 4. MENÜ BUTONLARI */}
      <View className="flex-row justify-center px-2" style={{ gap: 19 }}>
        {menuItems.map((item, index) => (
          <View key={index} className="items-center" style={{ gap: 8 }}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => handleMenuPress(item.path)}
              style={{
                width: 50, height: 50, borderRadius: 25,
                backgroundColor: 'rgba(250, 183, 75, 0.07)',
                borderColor: 'rgba(255, 255, 255, 0.5)', borderWidth: 0.5,
                alignItems: 'center', justifyContent: 'center'
              }}
            >
              <Image source={item.image} style={{ width: 22, height: 22, tintColor: '#FFFFFF' }} resizeMode="contain" />
            </TouchableOpacity>

            <Text style={{ fontFamily, fontSize: 12, fontWeight: '400' }} className="text-gray-300 text-center">
              {item.label}
            </Text>
          </View>
        ))}
      </View>

    </View>
  );
});

export default HomeHeader;