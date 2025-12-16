import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useState, useEffect } from 'react';

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

export default function HomeHeader() {
  const fontFamily = 'Plus Jakarta Sans';
  const ACTIVE_COLOR = '#FFBA4A';
  const INACTIVE_COLOR = 'white';
  
  const [prayerTimes, setPrayerTimes] = useState([]);
  const [displayData, setDisplayData] = useState({
      nextPrayerName: "Yükleniyor",
      remainingTime: "--:--:--",
      activeVakitIndex: -1
  });
  
  const [location, setLocation] = useState('İstanbul');

  // 1. API İsteği
  useEffect(() => {
    const fetchTimes = async () => {
        try {
            const now = new Date();
            const dateStr = `${now.getDate()}-${now.getMonth()+1}-${now.getFullYear()}`;
            const finalUrl = `${API_BASE}/${dateStr}?city=Istanbul&country=Turkey&method=13`;
            
            const response = await fetch(finalUrl);
            const result = await response.json();
            
            if (result.data && result.data.timings) {
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
                setLocation('İstanbul');
            } else {
                useFallbackData();
            }
        } catch (error) {
            useFallbackData();
        }
    };

    const useFallbackData = () => {
        setPrayerTimes([
            { label: 'İmsak', time: '06:43' }, { label: 'Güneş', time: '08:15' },
            { label: 'Öğle', time: '13:06' }, { label: 'İkindi', time: '15:24' },
            { label: 'Akşam', time: '17:44' }, { label: 'Yatsı', time: '19:10' }
        ]);
    };
    fetchTimes();
  }, []);

  // 2. Geri Sayım
  useEffect(() => {
    if (prayerTimes.length === 0) return;

    const timer = setInterval(() => {
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

        const activeIndex = (nextIndex - 1 + prayerTimes.length) % prayerTimes.length;

        setDisplayData({
            nextPrayerName: prayerTimes[nextIndex].label,
            remainingTime: `${h}:${m}:${s}`,
            activeVakitIndex: activeIndex
        });

    }, 1000);

    return () => clearInterval(timer);
  }, [prayerTimes]);

  const [hours, minutes, seconds] = displayData.remainingTime.split(':');

  const menuItems = [
    { image: icHatirlatici, label: 'Hatırlatıcı' },
    { image: icIlim, label: 'İlim' },
    { image: icKible, label: 'Kıble' },
    { image: icTakvim, label: 'Takvim' },
    { image: icDahaFazla, label: 'Daha fazlası' },
  ];

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
        {/* Bu View ekranın ortasındadır */}
        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: -4 }}>
            
            {/* SAAT ve DAKİKA KUTUSU (Referans Noktası) */}
            <View>
                <Text 
                  style={{ 
                      fontFamily, 
                      color: ACTIVE_COLOR, 
                      fontSize: 80, 
                      fontWeight: '600',
                      lineHeight: 90,
                      includeFontPadding: false,
                      textAlign: 'center'
                  }} 
                >
                {hours}:{minutes}
                </Text>

                {/* SANİYE KUTUSU */}
                {/* Text içine DEĞİL, View'in içine kardeş olarak koyduk */}
                {/* left: '100%' -> Saatin bittiği yerden başla */}
                <View style={{ 
                    position: 'absolute', 
                    left: '100%', 
                    bottom: 11, // Saniyeyi aşağı/yukarı buradan ayarlayabilirsiniz (Artarsa yukarı, azalırsa aşağı)
                    marginLeft: 2 // Saat ile saniye arasındaki boşluk
                }}>
                    <Text 
                      style={{ 
                          fontFamily, 
                          color: ACTIVE_COLOR, 
                          fontSize: 20, 
                          fontWeight: '500', 
                          includeFontPadding: false
                      }} 
                    >
                    :{seconds}
                    </Text>
                </View>
            </View>

        </View>
        
        <Text 
            style={{ fontFamily, fontSize: 16, fontWeight: '400', color: INACTIVE_COLOR }} 
            className="mt-0"
        >
          {location}
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
         <Text style={{ fontFamily, fontSize: 14, fontWeight: '300', opacity: 0.8 }} className="text-white tracking-wide">
           {getHijriDate()} / 
           {' ' + new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
         </Text>
      </View>

      {/* 4. MENÜ BUTONLARI */}
      <View className="flex-row justify-center px-2" style={{ gap: 19 }}>
        {menuItems.map((item, index) => (
          <View key={index} className="items-center" style={{ gap: 8 }}>
            <TouchableOpacity 
                activeOpacity={0.7}
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
}