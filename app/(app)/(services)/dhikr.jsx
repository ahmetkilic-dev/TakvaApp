import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';
import Svg, { Circle } from 'react-native-svg';
import BottomNavBar from '../../../components/common/BottomNavBar';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

// Responsive calculations
const horizontalPadding = Math.max(20, SCREEN_WIDTH * 0.05);
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);

// Responsive sizes
const isSmallScreen = SCREEN_WIDTH < 375;
const progressCircleSize = isSmallScreen ? 90 : 110;
const strokeWidth = 20;
const progressRadius = (progressCircleSize - strokeWidth) / 2;

// Aşamalar ve renkler
const stages = [
  { name: 'Huzur', min: 0, max: 100, titleColor: '#8CD7C0', barColor: '#8CD7C0' },
  { name: 'Sabır', min: 100, max: 500, titleColor: '#8CD7C0', barColor: '#F2C879' },
  { name: 'Tevekkül', min: 500, max: 1000, titleColor: '#6CA8E9', barColor: '#6CA8E9' },
  { name: 'Sekîne', min: 1000, max: 2500, titleColor: '#6749C1', barColor: '#6749C1' },
  { name: 'Feyz', min: 2500, max: 5000, titleColor: '#F5D76E', barColor: '#F5D76E' },
];

// Sample data - will be replaced with real data
const dhikrData = {
  arabic: 'Sübhanallah',
  meaning: "Allah'ı tüm noksan sıfatlardan tenzih ederim.",
};

const duaData = {
  arabic: 'رَبَّنَا ظَلَمْنَا أَنْفُسَنَا وَإِنْ لَمْ تَغْفِرْ لَنَا وَتَرْحَمْنَا لَنَكُونَنَّ مِنَ الْخَاسِرِينَ',
  meaning: "Rabbimiz! Biz kendimize zulmettik. Bizi bağışlamaz ve bize merhamet etmezsen, gerçekten hüsrana uğrayanlardan oluruz.",
  explanation: "Bu dua Hz. Adem (a.s.)'ın tevbe duasıdır. Kısa, etkili ve günlük kullanım için çok uygundur.",
};

export default function DhikrScreen() {
  const router = useRouter();
  const [currentCount, setCurrentCount] = useState(0);
  
  // Mevcut aşamayı bul
  const getCurrentStage = () => {
    if (currentCount >= 5000) {
      return stages[4]; // Feyz - son aşama
    }
    for (let i = stages.length - 1; i >= 0; i--) {
      if (currentCount >= stages[i].min) {
        return stages[i];
      }
    }
    return stages[0]; // Huzur - başlangıç
  };

  const currentStage = getCurrentStage();
  
  // Progress calculation for current stage
  const calculateStageProgress = () => {
    if (currentCount >= currentStage.max) {
      return 100; // Aşama tamamlandı
    }
    return ((currentCount - currentStage.min) / (currentStage.max - currentStage.min)) * 100;
  };
  
  const stageProgress = calculateStageProgress();
  
  const circumference = 2 * Math.PI * progressRadius;
  
  // Zikir çek butonuna basınca sayacı artır
  const handleZikirPress = () => {
    setCurrentCount(prev => prev + 1);
  };
  
  // Progress circle'ları render et (önceki aşamalar tamamen dolu, mevcut aşama kısmen)
  const renderProgressCircles = () => {
    const circles = [];
    const currentStageIndex = stages.findIndex(s => s === currentStage);
    
    // Önceki aşamaları tamamen dolu olarak render et
    for (let i = 0; i < currentStageIndex; i++) {
      const stage = stages[i];
      circles.push(
        <Circle
          key={`stage-${i}`}
          cx={progressCircleSize / 2}
          cy={progressCircleSize / 2}
          r={progressRadius}
          stroke={stage.barColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={0}
          strokeLinecap="round"
          transform={`rotate(-90 ${progressCircleSize / 2} ${progressCircleSize / 2})`}
        />
      );
    }
    
    // Mevcut aşamayı kısmen dolu olarak render et
    const currentOffset = circumference - (stageProgress / 100) * circumference;
    circles.push(
      <Circle
        key={`stage-current`}
        cx={progressCircleSize / 2}
        cy={progressCircleSize / 2}
        r={progressRadius}
        stroke={currentStage.barColor}
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={currentOffset}
        strokeLinecap="round"
        transform={`rotate(-90 ${progressCircleSize / 2} ${progressCircleSize / 2})`}
      />
    );
    
    return circles;
  };

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
            ZİKİR & DUA
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
          <View style={{ marginBottom: 32, alignItems: 'center' }}>
            <Image
              source={require('../../../assets/images/zikir-dua.png')}
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

          {/* Huzur Card */}
          <View
            style={{
              width: '100%',
              maxWidth: 400,
              borderRadius: 15,
              backgroundColor: '#1C1C1C',
              padding: 16,
              marginBottom: 40,
              alignSelf: 'center',
              position: 'relative',
            }}
          >
            {/* Left Arrow - Box'ın en soluna, zikir çek butonuyla aynı yükseklikte */}
            <TouchableOpacity
              style={{
                width: 22,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                left: -16 - 22, // Box'ın padding'i (16) + arrow genişliği kadar dışarı
                bottom: 16, // Zikir çek butonuyla aynı hizada (padding kadar yukarıdan)
              }}
            >
              <Ionicons name="chevron-back" size={16} color="#FFFFFF" />
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
              {/* Progress Circle */}
              <View style={{ marginRight: 16, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Svg width={progressCircleSize} height={progressCircleSize}>
                  {/* Background circle */}
                  <Circle
                    cx={progressCircleSize / 2}
                    cy={progressCircleSize / 2}
                    r={progressRadius}
                    stroke="#7C8381"
                    strokeWidth={strokeWidth}
                    fill="transparent"
                  />
                  {/* Progress circles - önceki aşamalar ve mevcut aşama */}
                  {renderProgressCircles()}
                </Svg>
                <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
                  <Text
                    style={{
                      fontFamily,
                      fontSize: isSmallScreen ? 16 : 18,
                      fontWeight: '600',
                      color: '#FFFFFF',
                      marginBottom: 2,
                    }}
                  >
                    {currentCount}
                  </Text>
                  <Text
                    style={{
                      fontFamily,
                      fontSize: isSmallScreen ? 11 : 12,
                      fontWeight: '500',
                      color: '#AAA9A9',
                    }}
                  >
                    {currentCount >= 5000 ? `${currentCount}/5000+` : `${currentCount}/${currentStage.max}`}
                  </Text>
                </View>
              </View>

              {/* Right Content */}
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily,
                    fontSize: 14,
                    fontWeight: '600',
                    color: currentStage.titleColor,
                    letterSpacing: 1.4, // 10% of 14px
                    marginBottom: 8,
                  }}
                >
                  {currentStage.name}
                </Text>
                <Text
                  style={{
                    fontFamily,
                    fontSize: 12,
                    fontWeight: '300',
                    color: '#FFFFFF',
                    marginBottom: 4,
                  }}
                >
                  {dhikrData.arabic}
                </Text>
                <Text
                  style={{
                    fontFamily,
                    fontSize: 12,
                    fontWeight: '300',
                    color: '#898989',
                    marginBottom: 12,
                    lineHeight: 16,
                  }}
                >
                  {dhikrData.meaning}
                </Text>
                
                {/* Zikir çek Button - "Allah'ı tüm noksan sıfatlardan tenzih ederim." yazısının altında */}
                <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
                  {/* Zikir çek Button */}
                  <TouchableOpacity
                    onPress={handleZikirPress}
                    style={{
                      width: 90,
                      height: 35,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: currentStage.titleColor,
                      backgroundColor: '#1C1C1C',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily,
                        fontSize: 14,
                        fontWeight: '300',
                        color: '#FFFFFF',
                      }}
                    >
                      Zikir çek
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            {/* Right Arrow - Box'ın en sağına, zikir çek butonuyla aynı yükseklikte */}
            <TouchableOpacity
              style={{
                width: 22,
                height: 35,
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                right: -16 - 22, // Box'ın padding'i (16) + arrow genişliği kadar dışarı
                bottom: 16, // Zikir çek butonuyla aynı hizada (padding kadar yukarıdan)
              }}
            >
              <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Dua Section */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontFamily,
                fontSize: 18,
                fontWeight: '600',
                color: '#FFFFFF',
                marginBottom: 12,
              }}
            >
              Dua
            </Text>
            <Text
              style={{
                fontFamily: 'Noto Sans Arabic',
                fontSize: 20,
                fontWeight: '300',
                color: '#FFBA4A',
                lineHeight: 37,
                letterSpacing: 0.4, // 2% of 20px
                textAlign: 'right',
                marginBottom: 16,
              }}
            >
              {duaData.arabic}
            </Text>
          </View>

          {/* Divider */}
          <View
            style={{
              height: 0.5,
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              marginBottom: 24,
            }}
          />

          {/* Meali Section */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontFamily,
                fontSize: 18,
                fontWeight: '600',
                color: '#FFFFFF',
                marginBottom: 12,
              }}
            >
              Meali
            </Text>
            <Text
              style={{
                fontFamily,
                fontSize: 16,
                fontWeight: '300',
                color: '#FFFFFF',
                lineHeight: 24,
              }}
            >
              {duaData.meaning}
            </Text>
          </View>

          {/* Divider */}
          <View
            style={{
              height: 0.5,
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              marginBottom: 24,
            }}
          />

          {/* Açıklama Section */}
          <View style={{ marginBottom: 24 }}>
            <Text
              style={{
                fontFamily,
                fontSize: 18,
                fontWeight: '600',
                color: '#FFFFFF',
                marginBottom: 12,
              }}
            >
              Açıklama
            </Text>
            <Text
              style={{
                fontFamily,
                fontSize: 16,
                fontWeight: '300',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: 24,
              }}
            >
              {duaData.explanation}
            </Text>
          </View>

          {/* Bottom Action Bar */}
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: 24,
          }}>
            <TouchableOpacity
              style={{
                width: 95,
                height: 38,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#8CD7C0',
                backgroundColor: '#1C1C1C',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily,
                  fontSize: 14,
                  fontWeight: '300',
                  color: '#FFFFFF',
                }}
              >
                Yeni dua
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
      <BottomNavBar />
    </ScreenBackground>
  );
}
