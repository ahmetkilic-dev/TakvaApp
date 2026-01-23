import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { usePrayerTimes } from '../../contexts/PrayerTimesContext';
import LocationPermissionGuard from '../common/LocationPermissionGuard';

// İkonlar
import icHatirlatici from '../../assets/images/hatirlatici.png';
import icIlim from '../../assets/images/ilim.png';
import icKible from '../../assets/images/kible.png';
import icKuran from '../../assets/hizmetler/kuran.png';
import icDahaFazla from '../../assets/images/daha-fazlasi.png';

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

  // Global context'ten namaz vakitlerini al - API çağrısı yok!
  const { dailyTimes: prayerTimes, displayCity, loading } = usePrayerTimes();

  const [displayData, setDisplayData] = useState({
    nextPrayerName: "Yükleniyor",
    remainingTime: "--:--:--",
    activeVakitIndex: -1
  });

  // 1. Geri Sayım - Optimize Edilmiş
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
    // UI thread'i bloklamadan navigasyon yap (basıldığı an tepki versin)
    requestAnimationFrame(() => {
      router.push(path);
    });
  }, [router]);

  const menuItems = useMemo(() => [
    { image: icHatirlatici, label: 'Hatırlatıcı', path: '/(app)/(services)/hatirlatici' },
    { image: icIlim, label: 'İlim', path: '/(app)/(services)/ilim' },
    { image: icKible, label: 'Kıble', path: '/(app)/(services)/qibla' },
    { image: icKuran, label: 'Kuran', path: '/(app)/(services)/quran' },
    { image: icDahaFazla, label: 'Daha fazlası', path: '/(app)/(services)/guide-detail' },
  ], []);

  const hijriDate = useMemo(() => getHijriDate(), []);
  const todayDate = useMemo(() => new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }), []);

  return (
    <View className="px-4 pt-6 pb-6">

      {/* 1. SAYAÇ ve KONUM ALANI */}
      <LocationPermissionGuard compact={true}>
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
      </LocationPermissionGuard>

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
              <Image
                source={item.image}
                style={{ width: 22, height: 22, tintColor: '#FFFFFF' }}
                contentFit="contain"
              />
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