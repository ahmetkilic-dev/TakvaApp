import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';
import Svg, { Path, Circle } from 'react-native-svg';
import { useState } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

// Responsive calculations
const horizontalPadding = 20;
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);

// Hexagon Icon Component
const HexagonIcon = ({ number, size = 40 }) => {
  const hexSize = size;
  const center = hexSize / 2;
  const radius = hexSize * 0.35;

  // Create hexagon path (6 sides)
  const points = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    points.push([x, y]);
  }

  const pathData = `M ${points[0][0]} ${points[0][1]} ${points.slice(1).map(p => `L ${p[0]} ${p[1]}`).join(' ')} Z`;

  return (
    <View style={{ width: hexSize, height: hexSize, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={hexSize} height={hexSize} viewBox={`0 0 ${hexSize} ${hexSize}`}>
        <Path
          d={pathData}
          fill="#7C8381"
          stroke="#FFFFFF"
          strokeWidth={0.5}
          strokeOpacity={0.5}
        />
      </Svg>
      <View style={{ position: 'absolute', width: hexSize, height: hexSize, alignItems: 'center', justifyContent: 'center' }}>
        <Text
          style={{
            fontFamily,
            fontSize: 16,
            fontWeight: '700',
            color: '#FFFFFF',
          }}
        >
          {number}
        </Text>
      </View>
    </View>
  );
};

// Progress Circle Component
const ProgressCircle = ({ percentage, size = 40 }) => {
  const radius = size / 2 - 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={6}
        />
        {/* Progress circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#8CD7C0"
          strokeWidth={6}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={{ position: 'absolute', width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Text
          style={{
            fontFamily,
            fontSize: 10,
            fontWeight: '400',
            color: '#FFFFFF',
          }}
        >
          %{percentage}
        </Text>
      </View>
    </View>
  );
};

// Sample data for Quran sections
const quranSections = [
  { id: 1, title: 'Fâtiha - Bakara', ayet: 7, progress: 0 },
  { id: 2, title: 'Bakara', ayet: 286, progress: 0 },
  { id: 3, title: 'Bakara - Âl-i İmrân', ayet: 200, progress: 0 },
  { id: 4, title: 'Fâtiha Suresi', ayet: 7, progress: 0 },
  { id: 5, title: 'Bakara Suresi', ayet: 286, progress: 0 },
  { id: 6, title: 'Âl-i İmrân Suresi', ayet: 200, progress: 0 },
];

export default function QuranScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Cüz');

  return (
    <ScreenBackground>
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-2 pb-2">
          <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 items-center justify-center">
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
            KUR'AN-I KERİM
          </Text>
          <View className="w-9" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 120 : 100 }}
        >
          {/* Kuran Yolculuğun Section */}
          <View style={{ paddingHorizontal: horizontalPadding, paddingTop: 42, paddingBottom: 16 }}>
            <Text
              style={{
                fontFamily,
                fontSize: 16,
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: 8,
                textAlign: 'center',
              }}
            >
              Kuran Yolculuğun
            </Text>
            <Text
              style={{
                fontFamily,
                fontSize: 10,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.6)',
                textAlign: 'center',
                lineHeight: 14,
              }}
            >
              Kur'ân-ı Kerim'i okuyabilir, meallerini inceleyebilir ve aradığın ayeti kolayca bulabilirsin.
            </Text>
          </View>

          {/* Okumaya Devam Et Section */}
          <View style={{ paddingHorizontal: horizontalPadding, marginBottom: 24 }}>
            <Text
              style={{
                fontFamily,
                fontSize: 15,
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: 12,
              }}
            >
              Okumaya Devam Et
            </Text>

            {/* Continue Card */}
            <View
              style={{
                width: '100%',
                height: 136,
                borderRadius: 20,
                borderWidth: 0.5,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                flexDirection: 'row',
                overflow: 'hidden',
              }}
            >
              {/* Left Side - Text Content */}
              <View style={{ flex: 1, padding: 16, justifyContent: 'space-between' }}>
                <View>
                  <Text
                    style={{
                      fontFamily,
                      fontSize: 20,
                      fontWeight: '400',
                      color: '#FFFFFF',
                      marginBottom: 4,
                    }}
                  >
                    Bakara Suresi
                  </Text>
                  <Text
                    style={{
                      fontFamily,
                      fontSize: 14,
                      fontWeight: '400',
                      color: '#FFFFFF',
                      marginBottom: 12,
                    }}
                  >
                    Ayet 53
                  </Text>
                </View>

                <TouchableOpacity onPress={() => router.push('/(app)/(services)/quran-page')}>
                  <Text
                    style={{
                      fontFamily,
                      fontSize: 14,
                      fontWeight: '400',
                      color: '#FFFFFF',
                      marginBottom: 8,
                    }}
                  >
                    Devam et {'>'}
                  </Text>
                </TouchableOpacity>

                {/* Progress Bar */}
                <View
                  style={{
                    width: '100%',
                    height: 16,
                    borderRadius: 10,
                    backgroundColor: '#7C8381',
                    borderWidth: 0.5,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    overflow: 'hidden',
                  }}
                >
                  <View
                    style={{
                      width: '0%',
                      height: '100%',
                      backgroundColor: '#8CD7C0',
                      borderRadius: 10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily,
                        fontSize: 10,
                        fontWeight: '600',
                        color: '#FFFFFF',
                      }}
                    >
                      %0
                    </Text>
                  </View>
                </View>
              </View>

              {/* Right Side - Image */}
              <View style={{ width: 162, height: 108, marginRight: 16, marginTop: 14, marginBottom: 14 }}>
                <Image
                  source={require('../../../assets/images/quran-cta.png')}
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    borderRadius: 8,
                    borderWidth: 0.5,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  }}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>

          {/* Kuran Section */}
          <View style={{ paddingHorizontal: horizontalPadding }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily,
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#FFFFFF',
                }}
              >
                Kuran
              </Text>

              {/* Tabs - Container Box */}
              <View
                style={{
                  flexDirection: 'row',
                  gap: 9.2,
                  padding: 3.45,
                  borderRadius: 11.5,
                  borderWidth: 0.5,
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }}
              >
                {['Sure', 'Cüz', 'Sayfa'].map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    onPress={() => setActiveTab(tab)}
                    style={{
                      paddingHorizontal: 9.2,
                      height: 24.15,
                      borderRadius: 11.5,
                      backgroundColor: activeTab === tab ? '#143E33' : 'transparent',
                      borderWidth: 0.5,
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: activeTab === tab ? 1 : 0.1,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily,
                        fontSize: 11.5,
                        fontWeight: '400',
                        color: '#FFFFFF',
                        lineHeight: 11.5,
                      }}
                    >
                      {tab}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* List Items */}
            <View style={{ gap: 12 }}>
              {quranSections.map((section) => (
                <TouchableOpacity
                  key={section.id}
                  onPress={() => router.push('/(app)/(services)/quran-page')}
                  style={{
                    width: '100%',
                    height: 62,
                    borderRadius: 20,
                    borderWidth: 0.5,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                  }}
                >
                  {/* Kuran Icon with Number */}
                  <View style={{ marginRight: 12, width: 40, height: 40, position: 'relative' }}>
                    <Image
                      source={require('../../../assets/images/kuranicc.png')}
                      style={{
                        width: 40,
                        height: 40,
                      }}
                      resizeMode="contain"
                    />
                    {/* Number Overlay */}
                    <View
                      style={{
                        position: 'absolute',
                        width: 40,
                        height: 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontFamily,
                          fontSize: 16,
                          fontWeight: '700',
                          color: '#FFFFFF',
                        }}
                      >
                        {section.id}
                      </Text>
                    </View>
                  </View>

                  {/* Text Content */}
                  <View style={{ flex: 1 }}>
                    <Text
                      style={{
                        fontFamily,
                        fontSize: 20,
                        fontWeight: '400',
                        color: '#FFFFFF',
                        marginBottom: 4,
                      }}
                    >
                      {section.title}
                    </Text>
                    <Text
                      style={{
                        fontFamily,
                        fontSize: 10,
                        fontWeight: '400',
                        color: 'rgba(255, 255, 255, 0.7)',
                      }}
                    >
                      {section.ayet} Ayet
                    </Text>
                  </View>

                  {/* Progress Circle */}
                  <ProgressCircle percentage={section.progress} size={40} />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}
