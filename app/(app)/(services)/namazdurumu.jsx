import React, { useEffect, useRef, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image, Animated } from 'react-native';
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
const prayers = [
  { id: 1, name: 'Sabah namazı', completed: false },
  { id: 2, name: 'Öğle namazı', completed: false },
  { id: 3, name: 'İkindi namazı', completed: false },
  { id: 4, name: 'Akşam namazı', completed: false },
  { id: 5, name: 'Yatsı namazı', completed: false },
];

const completedCount = 0;
const totalCount = prayers.length;

export default function NamazDurumuScreen() {
  const router = useRouter();
  const [prayerStates, setPrayerStates] = useState(prayers);
  const checkAnim = useRef(new Animated.Value(1)).current;

  const togglePrayer = (id) => {
    setPrayerStates(prev => 
      prev.map(prayer => 
        prayer.id === id ? { ...prayer, completed: !prayer.completed } : prayer
      )
    );
  };

  const currentCompletedCount = prayerStates.filter(p => p.completed).length;
  const allCompleted = currentCompletedCount === totalCount;

  useEffect(() => {
    if (!allCompleted) return;
    checkAnim.setValue(1);
    Animated.sequence([
      Animated.spring(checkAnim, { toValue: 1.25, useNativeDriver: true, speed: 20, bounciness: 10 }),
      Animated.spring(checkAnim, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 10 }),
    ]).start();
  }, [allCompleted, checkAnim]);

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
            NAMAZ DURUMU
          </Text>
          <View className="w-9" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: horizontalPadding,
            paddingTop: 24,
            paddingBottom: 0,
          }}
        >
          {/* Main Image */}
          <View style={{ marginBottom: 24, alignItems: 'center' }}>
            <Image
              source={require('../../../assets/images/namaz-durumu.png')}
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

          {/* Prayer List (Border + Separators) */}
          <View
            style={{
              marginBottom: 24,
              borderRadius: 12,
              borderWidth: 0.5,
              borderColor: 'rgba(255, 255, 255, 0.5)',
              backgroundColor: 'rgba(24, 39, 35, 0.35)',
              overflow: 'hidden',
            }}
          >
            {prayerStates.map((prayer, index) => (
              <View key={prayer.id}>
                <TouchableOpacity
                  onPress={() => togglePrayer(prayer.id)}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingVertical: 12,
                    paddingHorizontal: 12,
                  }}
                  activeOpacity={0.7}
                >
                  <Text
                    style={{
                      fontFamily,
                      fontSize: 14,
                      fontWeight: '300',
                      color: '#FFFFFF',
                    }}
                  >
                    {prayer.name}
                  </Text>
                  <View
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 9,
                      borderWidth: 1,
                      borderColor: prayer.completed ? '#8CD7C0' : 'rgba(255, 255, 255, 0.5)',
                      backgroundColor: prayer.completed ? '#8CD7C0' : 'transparent',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {prayer.completed && (
                      <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                    )}
                  </View>
                </TouchableOpacity>
                {index < prayerStates.length - 1 && (
                  <View
                    style={{
                      width: '100%',
                      height: 0.5,
                      backgroundColor: 'rgba(217, 217, 217, 0.5)',
                    }}
                  />
                )}
              </View>
            ))}
          </View>

          {/* Status Message */}
          <View style={{ 
            flexDirection: 'row', 
            alignItems: 'center', 
            justifyContent: 'center',
            marginBottom: 16,
          }}>
            <Animated.View style={{ transform: [{ scale: checkAnim }], marginRight: 8 }}>
              <Ionicons
                name={allCompleted ? 'checkmark-circle' : 'checkmark-circle-outline'}
                size={20}
                color={allCompleted ? '#8CD7C0' : '#FFFFFF'}
              />
            </Animated.View>
            <Text
              style={{
                fontFamily,
                fontSize: 14,
                fontWeight: '300',
                color: '#FFFFFF',
              }}
            >
              Bugün {currentCompletedCount}/{totalCount} vakit kıldın
            </Text>
          </View>

          {/* Information Box */}
          <View
            style={{
              width: '100%',
              maxWidth: 350,
              minHeight: 38,
              borderRadius: 10,
              borderWidth: 0.2,
              borderColor: '#818181',
              backgroundColor: 'rgba(24, 39, 35, 0.7)', // #182723 with 70% opacity
              paddingVertical: 12,
              paddingHorizontal: 16,
              alignSelf: 'center',
            }}
          >
            <Text
              style={{
                fontFamily,
                fontSize: 14,
                fontWeight: '300',
                color: '#FFFFFF',
                lineHeight: 19,
                textAlign: 'center',
              }}
            >
              İşaretlemediğin vakitler otomatik olarak namaz ekranında "Kaza Namazları"na eklenir.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

