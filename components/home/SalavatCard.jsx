import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming, // Yaylanma olmadan hareket için
  runOnJS,
  interpolate,
  Extrapolation 
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

// Görseller
import salavatSwipeIcon from '../../assets/images/salavat-swipe.png';
import roseLeft from '../../assets/images/rose-left.png';
import roseRight from '../../assets/images/rose-right.png';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Slider sabitleri - responsive
const CARD_WIDTH = SCREEN_WIDTH * 0.9;
const SLIDER_WIDTH = CARD_WIDTH * 0.85;
const BUTTON_WIDTH = 100;
const BUTTON_HEIGHT = 32;
const PADDING = 3;
// Sürüklenebilir maksimum mesafe
const MAX_DRAG = SLIDER_WIDTH - BUTTON_WIDTH - (PADDING * 2);

export default function SalavatCard() {
  // Sayaçlar (State)
  const [totalCount, setTotalCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  // Reanimated Shared Values
  const translateX = useSharedValue(0);
  const isCompleted = useSharedValue(false);

  // Sayaçları güncelleme fonksiyonu (JS Thread)
  const incrementCounters = () => {
    setTotalCount(prev => prev + 1);
    setTodayCount(prev => prev + 1);
    setUserCount(prev => prev + 1);
  };

  // İşlem tamamlandığında çalışacak fonksiyon
  const handleComplete = () => {
    incrementCounters();
    // Butonu ve yazıyı SIFIRLAMA (Savrulma olmadan)
    setTimeout(() => {
      // duration: 0 ile anında başlangıca atar (yaylanmaz)
      translateX.value = withTiming(0, { duration: 0 });
      isCompleted.value = false;
    }, 100); // 100ms kısa bir bekleme (kullanıcı bittiğini görsün diye)
  };

  // Gesture Handler
  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Sadece ileri (sağa) harekete ve işlem bitmemişse izin ver
      if (event.translationX > 0 && !isCompleted.value) {
        // Sınırları aşma
        translateX.value = Math.min(event.translationX, MAX_DRAG);
      }
    })
    .onEnd(() => {
      // Eğer %90'dan fazla çekildiyse tamamla
      if (translateX.value > MAX_DRAG * 0.9) {
        // Sona giderken de spring değil timing kullanıyoruz ki net dursun
        translateX.value = withTiming(MAX_DRAG, { duration: 100 });
        isCompleted.value = true;
        runOnJS(handleComplete)();
      } else {
        // Yeterince çekilmediyse geri bırak (burada hafif yaylanabilir)
        translateX.value = withSpring(0, { damping: 20, stiffness: 200 });
      }
    });

  // Buton Animasyon Stili
  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  // Altın Rengi Yazı Maskesi Animasyonu (SAĞDAN SOLA DOLMA)
  const textMaskStyle = useAnimatedStyle(() => {
    const widthPercent = interpolate(
      translateX.value,
      [0, MAX_DRAG],
      [0, 100], // %0'dan %100'e
      Extrapolation.CLAMP
    );
    return {
      width: `${widthPercent}%`,
    };
  });

  // Sayı formatlayıcı
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  const arabicText = 'اللَّهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ';

  return (
    <View style={styles.container}>
      {/* Başlık */}
      <Text style={styles.mainTitle}>
        Salavat Zinciri
      </Text>
      <Text style={styles.subTitle}>
        Takva'daki herkesle birlikte salavat getir.
      </Text>

      {/* Ana içerik alanı */}
      <View style={styles.contentArea}>

        {/* Gül süslemeleri */}
        <Image
          source={roseLeft}
          style={styles.roseLeft}
          resizeMode="contain"
        />
        <Image
          source={roseRight}
          style={styles.roseRight}
          resizeMode="contain"
        />

        {/* Metin Alanı */}
        <View style={styles.textContainer}>
          
          {/* ARAPÇA METİN YAPISI (Hizalama Düzeltildi)
              Her iki metin de (Beyaz ve Altın) aynı container içinde
              absolute pozisyonda üst üste bindirildi.
          */}
          <View style={styles.arabicTextWrapper}>
            
            {/* 1. Katman: Beyaz Metin (Arka Plan) */}
            <Text style={[styles.arabicTextBase, { color: '#FFFFFF', opacity: 1 }]}>
              {arabicText}
            </Text>

            {/* 2. Katman: Altın Metin (Maskelenmiş - Sağdan Sola Açılır) */}
            <Animated.View style={[styles.arabicTextMaskContainer, textMaskStyle]}>
               {/* İçerideki metin kapsayıcısı sabit genişlikte (Parent kadar) olmalı ki
                  maske daralsa bile metin kaymasın.
               */}
              <View style={styles.arabicTextInnerFixed}>
                <Text style={[styles.arabicTextBase, { color: '#FFBA4A' }]}>
                  {arabicText}
                </Text>
              </View>
            </Animated.View>

          </View>

          {/* Türkçe okunuş */}
          <Text style={styles.turkishText}>
            Allahümme salli alâ seyyidinâ Muhammed.
          </Text>

          {/* Türkçe anlam */}
          <Text style={styles.meaningText}>
            Allah'ım, Efendimiz Muhammed'e salat (rahmet ve tazim) eyle.
          </Text>
        </View>

        {/* Swipe Slider */}
        <View style={styles.sliderTrack}>
          <GestureDetector gesture={panGesture}>
            <Animated.View style={[styles.sliderHandle, buttonAnimatedStyle]}>
              {/* Salavat ikonu */}
              <Image
                source={salavatSwipeIcon}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
              />
              {/* Arrow */}
              <Ionicons name="chevron-forward" size={12} color="rgba(255, 255, 255, 0.8)" />
            </Animated.View>
          </GestureDetector>
        </View>
      </View>

      {/* İstatistikler */}
      <View style={styles.statsContainer}>
        <Text style={styles.statText}>
          Toplam Salavat: <Text style={styles.statValue}>{formatNumber(totalCount)}</Text>
        </Text>
        <Text style={styles.statText}>
          Bugünkü Salavat Sayısı: <Text style={styles.statValue}>{formatNumber(todayCount)}</Text>
        </Text>
        <Text style={styles.statText}>
          Senin Salavatların: <Text style={styles.statValueGold}>{formatNumber(userCount)}</Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 48,
    width: '100%',
    alignItems: 'center',
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  subTitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
  },
  contentArea: {
    position: 'relative',
    alignItems: 'center',
  },
  roseLeft: {
    position: 'absolute',
    left: -20,
    top: '50%',
    width: 131,
    height: 260,
    opacity: 0.35,
    transform: [{ translateY: -70 }],
  },
  roseRight: {
    position: 'absolute',
    right: -20,
    top: '50%',
    width: 131,
    height: 260,
    opacity: 0.35,
    transform: [{ translateY: -180 }],
  },
  textContainer: {
    width: CARD_WIDTH,
    backgroundColor: '#24322E',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    paddingTop: 18,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  
  // --- YENİLENEN METİN STİLLERİ ---
  arabicTextWrapper: {
    height: 40, // Yüksekliği sabitledik (font boyutuna göre ayarla)
    width: '100%',
    marginBottom: 8,
    position: 'relative',
    justifyContent: 'center', // Dikey ortala
  },
  arabicTextBase: {
    fontSize: 20,
    textAlign: 'right', // Sağa yaslı
    writingDirection: 'rtl',
    fontWeight: '400',
    width: '100%',
    lineHeight: 40, // Wrapper height ile aynı yaparak dikey hizalamayı garantiledik
    position: 'absolute', // Üst üste binmeleri için
    right: 0,
    top: 0,
  },
  arabicTextMaskContainer: {
    height: '100%',
    position: 'absolute',
    right: 0, // Sağa yaslı (maske buradan açılacak)
    top: 0,
    overflow: 'hidden', // Taşan kısmı gizle
    zIndex: 2,
  },
  arabicTextInnerFixed: {
    width: CARD_WIDTH - 32, // Container padding'i çıkarılmış net genişlik
    height: '100%',
    position: 'absolute',
    right: 0, // Metni sağa sabitle ki maske daraldığında metin kaymasın
    top: 0,
  },
  // ------------------------------

  turkishText: {
    fontSize: 14,
    textAlign: 'left',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
    marginTop: 8,
  },
  meaningText: {
    fontSize: 11,
    textAlign: 'left',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  sliderTrack: {
    width: SLIDER_WIDTH,
    height: 40,
    backgroundColor: '#24322E',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 186, 74, 0.5)',
    marginTop: 12,
    justifyContent: 'center',
    padding: PADDING,
  },
  sliderHandle: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    backgroundColor: '#182723',
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    position: 'absolute',
    left: PADDING,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    zIndex: 10,
  },
  statsContainer: {
    alignItems: 'center',
    gap: 8,
    marginTop: 16,
  },
  statText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  statValue: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  statValueGold: {
    color: '#FFBA4A',
    fontWeight: '700',
  },
});