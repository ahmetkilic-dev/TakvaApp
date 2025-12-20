import { View, Text, Image, StyleSheet, Dimensions, Animated, PanResponder } from 'react-native';
import { useState, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';
import { Ionicons } from '@expo/vector-icons';

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
const MAX_VALUE = SLIDER_WIDTH - BUTTON_WIDTH - (PADDING * 2) - 2;

export default function SalavatCard() {
  // Sayaçlar
  const [totalCount, setTotalCount] = useState(0);
  const [todayCount, setTodayCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  // Swipe yüzdesi için state
  const [swipeProgress, setSwipeProgress] = useState(0);

  // Animated value
  const pan = useRef(new Animated.Value(0)).current;

  // Sayaçları güncelle
  const incrementCounters = () => {
    setTotalCount(prev => prev + 1);
    setTodayCount(prev => prev + 1);
    setUserCount(prev => prev + 1);
  };

  // PanResponder
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newValue = Math.max(0, Math.min(gestureState.dx, MAX_VALUE));
        pan.setValue(newValue);
        setSwipeProgress(newValue / MAX_VALUE);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx >= MAX_VALUE * 0.9) {
          incrementCounters();
        }
        Animated.spring(pan, {
          toValue: 0,
          useNativeDriver: true,
          friction: 5,
        }).start();
        setSwipeProgress(0);
      },
    })
  ).current;

  // Sayı formatlayıcı
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  };

  // Arapça metin
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
          <Animated.View
            style={[
              styles.sliderHandle,
              { transform: [{ translateX: pan }] }
            ]}
            {...panResponder.panHandlers}
          >
            {/* Salavat ikonu */}
            <Image
              source={salavatSwipeIcon}
              style={{ width: 20, height: 20 }}
              resizeMode="contain"
            />
            {/* Arrow */}
            <Ionicons name="chevron-forward" size={12} color="rgba(255, 255, 255, 0.8)" />
          </Animated.View>
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
