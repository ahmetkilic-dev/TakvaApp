import React, { useRef } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image, PanResponder, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

// Responsive calculations
const horizontalPadding = Math.max(20, SCREEN_WIDTH * 0.05);
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);

// Sample data - will be replaced with real data
const verseData = {
  arabic: 'يَا أَيُّهَا النَّاسُ إِنَّا خَلَقْنَاكُمْ مِنْ ذَكَرٍ وَأُنْثَىٰ وَجَعَلْنَاكُمْ شُعُوبًا وَقَبَائِلَ لِتَعَارَفُوا إِنَّ أَكْرَمَكُمْ عِندَ اللَّهِ أَتْقَاكُمْ إِنَّ اللَّهَ عَلِيمٌ خَبِيرٌ',
  turkish: "Biz sizi bir erkek ve bir kadından yarattık ve birbirinizle tanışmanız için sizi milletler ve kabilelere ayırdık. Allah katında en üstün olanınız, O'na karşı gelmekten en çok sakınanınızdır. Şüphesiz Allah hakkıyla bilendir, her şeyden haberdardır.",
  reference: 'Hucurat 13. Ayet',
};

export default function HadithScreen() {
  const router = useRouter();
  const boxWidth = Math.min(300, contentWidth);
  const buttonWidth = 114;
  const maxTranslateX = boxWidth - buttonWidth - 8; // 4px padding on each side
  
  const translateX = useRef(new Animated.Value(0)).current;
  const startX = useRef(0);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        translateX.stopAnimation((value) => {
          startX.current = value;
        });
      },
      onPanResponderMove: (e, gestureState) => {
        const newX = startX.current + gestureState.dx;
        const clampedX = Math.max(0, Math.min(newX, maxTranslateX));
        translateX.setValue(clampedX);
      },
      onPanResponderRelease: (e, gestureState) => {
        const finalX = startX.current + gestureState.dx;
        const clampedX = Math.max(0, Math.min(finalX, maxTranslateX));
        
        // Her zaman en sola dön (0'a) - smooth animasyon
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: false,
          tension: 40,
          friction: 8,
          velocity: gestureState.vx || 0,
        }).start();
        
        startX.current = 0;
      },
    })
  ).current;

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
          contentContainerStyle={{
            paddingHorizontal: horizontalPadding,
            paddingTop: 24,
            paddingBottom: Platform.OS === 'ios' ? 120 : 100,
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
            {/* Outer Box */}
            <View
              style={{
                width: boxWidth,
                height: 40,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: 'rgba(255, 186, 74, 0.5)', // #FFBA4A with 50% opacity
                backgroundColor: '#24322E',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Slidable Button Inside */}
              <Animated.View
                style={{
                  position: 'absolute',
                  left: 4,
                  top: (40 - 32) / 2, // Yükseklik olarak ortalama
                  width: buttonWidth,
                  height: 32,
                  borderRadius: 20,
                  borderWidth: 0.5,
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  backgroundColor: '#182723',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 12,
                  transform: [{ translateX }],
                }}
                {...panResponder.panHandlers}
              >
                <Ionicons name="book" size={20} color="#FFFFFF" />
                <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
              </Animated.View>
            </View>
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
