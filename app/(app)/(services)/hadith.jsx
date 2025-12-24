import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

// Responsive calculations - tüm cihazlarda çalışacak şekilde
const horizontalPadding = Math.max(20, SCREEN_WIDTH * 0.05);
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);

// Slider sabitleri - responsive
const boxWidth = Math.min(300, contentWidth);
const buttonWidth = 114;
const buttonHeight = 32;
const boxHeight = 40;
const padding = 4;
const maxTranslateX = boxWidth - buttonWidth - (padding * 2);

// Sample data - will be replaced with real data
const verseData = {
  arabic: 'يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُمْ مِنْ ذَكَرٍ وَأُنْثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ إِنَّ اللَّهَ عَلِيمٌ خَبِيرٌ',
  turkish: "Biz sizi bir erkek ve bir kadından yarattık ve birbirinizle tanışmanız için sizi milletler ve kabilelere ayırdık. Allah katında en üstün olanınız, O'na karşı gelmekten en çok sakınanınızdır. Şüphesiz Allah hakkıyla bilendir, her şeyden haberdardır.",
  reference: 'Hucurat 13. Ayet',
};

export default function HadithScreen() {
  const router = useRouter();
  
  // Reanimated Shared Values - smooth animasyon için
  const translateX = useSharedValue(0);
  const isAnimating = useSharedValue(false);

  // Gesture Handler - production-ready smooth gesture
  const panGesture = Gesture.Pan()
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
        }, () => {
          // Tamamlandıktan sonra geri dön - smooth spring
          translateX.value = withSpring(0, {
            damping: 20,
            stiffness: 200,
            mass: 0.5,
          }, () => {
            isAnimating.value = false;
          });
        });
      } else {
        // Yeterince çekilmediyse geri bırak - smooth spring animasyonu
        isAnimating.value = true;
        translateX.value = withSpring(0, {
          damping: 20,
          stiffness: 200,
          mass: 0.5,
        }, () => {
          isAnimating.value = false;
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
    <ScreenBackground>
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-2 pb-2">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="w-9 h-9 items-center justify-center"
          >
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Cinzel-Black',
              color: '#FFFFFF',
              fontSize: 24,
              textAlign: 'center',
              letterSpacing: -2,
            }}
          >
            GÜNÜN AYETİ
          </Text>
          <View className="w-9" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          decelerationRate="normal"
          bounces={true}
          alwaysBounceVertical={false}
          contentContainerStyle={{
            paddingHorizontal: horizontalPadding,
            paddingTop: 24,
            paddingBottom: Platform.OS === 'ios' ? 120 : 100,
          }}
          style={{
            flex: 1,
          }}
        >
          {/* Main Image */}
          <View style={{ marginBottom: 16, alignItems: 'center' }}>
            <Image
              source={require('../../../assets/images/gunun-ayeti.png')}
              style={{
                width: Math.min(300, contentWidth),
                height: Math.min(300 * (163 / 300), Math.min(300, contentWidth) * (163 / 300)),
                borderRadius: 25,
                borderWidth: 0.5,
                borderColor: 'rgba(255, 255, 255, 0.5)',
              }}
              resizeMode="cover"
            />
          </View>

          {/* Navigation Bar */}
          <View style={{ marginBottom: 24, alignItems: 'center' }}>
            {/* Outer Box - flexbox ile ortalama */}
            <Animated.View
              style={[
                {
                  width: boxWidth,
                  height: boxHeight,
                  borderRadius: 20,
                  borderWidth: 1,
                  borderColor: 'rgba(255, 186, 74, 0.5)', // #FFBA4A with 50% opacity
                  backgroundColor: '#24322E',
                  position: 'relative',
                  overflow: 'hidden',
                  justifyContent: 'center', // Dikey ortalama
                },
                boxAnimatedStyle,
              ]}
            >
              {/* Slidable Button Inside - flexbox ile mükemmel ortalama */}
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
                      alignItems: 'center', // İçerik dikey ortalama
                      justifyContent: 'space-between', // İçerik yatay dağılım
                      paddingHorizontal: 12,
                    },
                    buttonAnimatedStyle,
                  ]}
                >
                  <Ionicons name="book" size={20} color="#FFFFFF" />
                  <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
                </Animated.View>
              </GestureDetector>
            </Animated.View>
          </View>

          {/* Arabic Text */}
          <View style={{ marginBottom: 16 }}>
            <Text
              style={{
                fontFamily: 'Noto Sans Arabic',
                fontSize: 20,
                fontWeight: '300',
                color: '#FFBA4A',
                lineHeight: 37,
                letterSpacing: 0.4, // 2% of 20px
                textAlign: 'right',
              }}
            >
              {verseData.arabic}
            </Text>
          </View>

          {/* Divider */}
          <View
            style={{
              width: '100%',
              height: 0.5,
              backgroundColor: 'rgba(255, 255, 255, 0.5)',
              marginBottom: 24,
            }}
          />

          {/* Turkish Translation */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontFamily,
                fontSize: 16,
                fontWeight: '300',
                color: '#FFFFFF',
                lineHeight: 24,
                letterSpacing: 0.32, // 2% of 16px
              }}
            >
              {verseData.turkish}
            </Text>
          </View>

          {/* Verse Reference */}
          <View style={{ alignItems: 'flex-end', marginBottom: 24 }}>
            <Text
              style={{
                fontFamily,
                fontSize: 14,
                fontWeight: '700',
                color: 'rgba(255, 186, 74, 0.7)', // #FFBA4A with 70% opacity
                textAlign: 'right',
              }}
            >
              {verseData.reference}
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}
