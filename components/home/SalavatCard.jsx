import { View, Text, Image, StyleSheet } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

// Görseller
import salavatSwipeIcon from '../../assets/images/salavat-swipe.png';
import roseLeft from '../../assets/images/rose-left.png';
import roseRight from '../../assets/images/rose-right.png';

// Slider sabitleri
const SLIDER_WIDTH = 300;
const BUTTON_WIDTH = 100;
const BUTTON_HEIGHT = 32;
const PADDING = 3;
const MAX_VALUE = SLIDER_WIDTH - BUTTON_WIDTH - (PADDING * 2) - 2;

export default function SalavatCard() {
  // Sayaçlar
  const [totalCount, setTotalCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  // Swipe yüzdesi için state
  const [swipeProgress, setSwipeProgress] = useState(0);

  // Reanimated shared value
  const offset = useSharedValue(0);

  // Sayaçları güncelle
  const incrementCounters = () => {
    setTotalCount(prev => prev + 1);
    setTodayCount(prev => prev + 1);
    setUserCount(prev => prev + 1);
  };

  // Swipe progress güncelle
  const updateProgress = (value) => {
    setSwipeProgress(value);
  };

  // Pan gesture
  const pan = Gesture.Pan().onChange((event) => {
    offset.value =
      Math.abs(offset.value) <= MAX_VALUE
        ? offset.value + event.changeX <= 0
          ? 0
          : offset.value + event.changeX >= MAX_VALUE
            ? MAX_VALUE
            : offset.value + event.changeX
        : offset.value;

    const progress = offset.value / MAX_VALUE;
    runOnJS(updateProgress)(progress);
  }).onEnd(() => {
    if (offset.value >= MAX_VALUE * 0.9) {
      runOnJS(incrementCounters)();
    }
    offset.value = 0;
    runOnJS(updateProgress)(0);
  });

  // Animated style
  const sliderStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: offset.value }],
    };
  });

  // Sayı formatlayıcı
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // Arapça metin
  const arabicText = 'اللَّهُمَّ صَلِّ عَلَىٰ سَيِّدِنَا مُحَمَّدٍ';

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View className="w-full px-5 mt-8">
        {/* Başlık */}
        <Text className="text-white text-2xl font-bold text-center mb-1">
          Salavat Zinciri
        </Text>
        <Text className="text-gray-400 text-sm text-center mb-8">
          Takva'daki herkesle birlikte salavat getir.
        </Text>

        {/* Ana içerik alanı */}
        <View className="relative items-center">

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

          {/* Arapça metin alanı */}
          <View style={styles.textContainer}>
            {/* Arapça salavat - gradient geçişi */}
            <MaskedView
              style={styles.maskedView}
              maskElement={
                <Text style={styles.arabicMask}>
                  {arabicText}
                </Text>
              }
            >
              <LinearGradient
                colors={['#FFFFFF', '#FFBA4A']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                locations={[Math.max(1 - swipeProgress, 0), 1]}
                style={{ flex: 1 }}
              />
            </MaskedView>

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
            <GestureDetector gesture={pan}>
              <Animated.View style={[styles.sliderHandle, sliderStyle]}>
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
        <View className="items-center gap-y-2 mt-4">
          <Text className="text-gray-400 text-base">
            Toplam Salavat: <Text className="text-white font-bold">{formatNumber(totalCount)}</Text>
          </Text>
          <Text className="text-gray-400 text-base">
            Bugünkü Salavat Sayısı: <Text className="text-white font-bold">{formatNumber(todayCount)}</Text>
          </Text>
          <Text className="text-gray-400 text-base">
            Senin Salavatların: <Text className="text-[#FFBA4A] font-bold">{formatNumber(userCount)}</Text>
          </Text>
        </View>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  roseLeft: {
    position: 'absolute',
    left: 0,
    top: '50%',
    width: 131,
    height: 260,
    opacity: 0.35,
    transform: [{ translateY: -70 }],
  },
  roseRight: {
    position: 'absolute',
    right: 0,
    top: '50%',
    width: 131,
    height: 260,
    opacity: 0.35,
    transform: [{ translateY: -180 }],
  },
  textContainer: {
    width: 350,
    backgroundColor: '#24322E',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    paddingTop: 18,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  maskedView: {
    height: 32,
    marginBottom: 8,
  },
  arabicMask: {
    fontSize: 20,
    textAlign: 'right',
    writingDirection: 'rtl',
    color: 'black',
  },
  turkishText: {
    fontSize: 14,
    textAlign: 'left',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
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
  },
});