import { View, Text, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import gunayetIcon from '../../assets/images/gunayet.png';
import { useCallback } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Responsive calculations
const horizontalPadding = Math.max(20, SCREEN_WIDTH * 0.05);
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);

// Slider sabitleri - responsive
const boxWidth = Math.min(300, contentWidth);
const buttonWidth = 114;
const buttonHeight = 32;
const boxHeight = 40;
const padding = 4;
const maxTranslateX = boxWidth - buttonWidth - (padding * 2);

export default function VerseSlider({ onComplete, disabled = false, message = null }) {
  // Reanimated Shared Values - smooth animasyon için
  const translateX = useSharedValue(0);
  const isAnimating = useSharedValue(false);

  // Callback'i güvenli şekilde çağır (runOnJS ile)
  const handleComplete = useCallback(() => {
    if (onComplete && typeof onComplete === 'function') {
      try {
        onComplete();
      } catch (error) {
        console.error('VerseSlider onComplete hatası:', error);
      }
    }
  }, [onComplete]);

  // Gesture Handler - production-ready smooth gesture
  const panGesture = Gesture.Pan()
    .enabled(!disabled) // Disabled ise gesture'ı devre dışı bırak
    .activeOffsetX(5) // Sağa 5px hareket edince aktif ol
    .failOffsetY([-10, 10]) // Dikey hareket 10px'den fazlaysa iptal et
    .onStart(() => {
      // Animasyon başladığında mevcut değeri al
      isAnimating.value = false;
    })
    .onUpdate((event) => {
      // Sadece sağa (ileri) hareket izin ver
      if (event.translationX > 0) {
        // Sınırları aşma - smooth clamping
        translateX.value = Math.min(event.translationX, maxTranslateX);
      }
    })
    .onEnd((event) => {
      // Eğer %80'den fazla çekildiyse tamamla
      const threshold = maxTranslateX * 0.8;
      if (translateX.value > threshold) {
        // Sona git - smooth timing animasyonu
        isAnimating.value = true;
        translateX.value = withTiming(maxTranslateX, {
          duration: 200,
        }, (finished) => {
          if (finished) {
            // Tamamlandıktan sonra callback'i çağır (runOnJS ile güvenli)
            runOnJS(handleComplete)();

            // Geri dön - smooth spring
            translateX.value = withSpring(0, {
              damping: 20,
              stiffness: 200,
              mass: 0.5,
            }, (finished) => {
              if (finished) {
                isAnimating.value = false;
              }
            });
          }
        });
      } else {
        // Yeterince çekilmediyse geri bırak - smooth spring animasyonu
        isAnimating.value = true;
        translateX.value = withSpring(0, {
          damping: 20,
          stiffness: 200,
          mass: 0.5,
        }, (finished) => {
          if (finished) {
            isAnimating.value = false;
          }
        });
      }
    });

  // Buton Animasyon Stili - native driver ile smooth
  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  // Box opacity animasyonu (opsiyonel - daha smooth görünüm için)
  const boxAnimatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateX.value,
      [0, maxTranslateX * 0.5, maxTranslateX],
      [1, 0.95, 0.9],
      Extrapolation.CLAMP
    );
    return {
      opacity,
    };
  });

  return (
    <View style={{ marginBottom: 24, alignItems: 'center' }}>
      {message && (
        <View style={{ marginBottom: 16, alignItems: 'center' }}>
          <Text style={{ fontFamily: 'Plus Jakarta Sans', fontSize: 14, fontWeight: '600', color: '#FFBA4A', textAlign: 'center' }}>
            {message}
          </Text>
        </View>
      )}
      {/* Outer Box */}
      <Animated.View
        style={[
          {
            width: boxWidth,
            height: boxHeight,
            borderRadius: 20,
            borderWidth: 1,
            borderColor: disabled ? 'rgba(255, 186, 74, 0.2)' : 'rgba(255, 186, 74, 0.5)',
            backgroundColor: '#24322E',
            position: 'relative',
            overflow: 'hidden',
            justifyContent: 'center',
            opacity: disabled ? 0.5 : 1,
          },
          boxAnimatedStyle,
        ]}
      >
        {/* Slidable Button Inside */}
        <GestureDetector gesture={panGesture}>
          <Animated.View
            style={[
              {
                position: 'absolute',
                left: padding,
                width: buttonWidth,
                height: buttonHeight,
                borderRadius: 20,
                borderWidth: 0.5,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: '#182723',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingHorizontal: 12,
              },
              buttonAnimatedStyle,
            ]}
          >
            <Image
              source={gunayetIcon}
              style={{ width: 22, height: 22 }}
              contentFit="contain"
            />
            <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </View>
  );
}

