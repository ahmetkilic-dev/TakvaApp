import React, { useEffect, useRef, useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenBackground from '../common/ScreenBackground';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import NamazDurumuHeader from './NamazDurumuHeader';
import { useNamazDurumu } from './hooks/useNamazDurumu';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

const horizontalPadding = Math.max(20, SCREEN_WIDTH * 0.05);
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);

const PrayerItem = React.memo(({ prayer, toggle, disabled, isLast, fontFamily }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => toggle(prayer.key)}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: 12,
          paddingHorizontal: 12,
          backgroundColor: 'transparent',
          opacity: disabled ? 0.45 : 1,
        }}
        activeOpacity={0.7}
        disabled={disabled}
      >
        <Text
          style={{
            fontFamily,
            fontSize: 14,
            fontWeight: '300',
            color: '#FFFFFF',
          }}
        >
          {prayer.label}
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
          {prayer.completed && <Ionicons name="checkmark" size={12} color="#FFFFFF" />}
        </View>
      </TouchableOpacity>

      {!isLast && (
        <View
          style={{
            width: '100%',
            height: 0.5,
            backgroundColor: 'rgba(217, 217, 217, 0.5)',
          }}
        />
      )}
    </View>
  );
});

export default function NamazDurumuContainer() {
  const insets = useSafeAreaInsets();
  const { user, loading, items, completedCount, totalCount, toggle } = useNamazDurumu();
  const checkAnim = useRef(new Animated.Value(1)).current;

  const allCompleted = completedCount === totalCount;

  // Image boyutlarını memoize et - her render'da hesaplama
  const imageDimensions = useMemo(() => {
    const width = Math.min(300, contentWidth);
    const height = width * (163 / 300);
    return { width, height };
  }, []);

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
        <NamazDurumuHeader />

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
              source={require('../../assets/images/namaz-durumu.png')}
              style={{
                width: imageDimensions.width,
                height: imageDimensions.height,
                borderRadius: 25,
                borderWidth: 0.5,
                borderColor: 'rgba(255, 255, 255, 0.5)',
              }}
              resizeMode="cover"
            />
          </View>

          {/* Prayer List */}
          <View
            style={{
              marginBottom: 24,
              borderRadius: 12,
              borderWidth: 0.5,
              borderColor: 'rgba(255, 255, 255, 0.5)',
              backgroundColor: 'rgba(24, 39, 35, 0.35)',
              overflow: 'hidden',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {items.map((prayer, index) => (
              <PrayerItem
                key={prayer.key}
                prayer={prayer}
                toggle={toggle}
                disabled={!prayer.enabled || loading}
                isLast={index === items.length - 1}
                fontFamily={fontFamily}
              />
            ))}
          </View>

          {/* Status */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 16,
            }}
          >
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
              Bugün {completedCount}/{totalCount} vakit kıldın
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
              backgroundColor: 'rgba(24, 39, 35, 0.7)',
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

            {!user?.uid && (
              <Text
                style={{
                  marginTop: 8,
                  fontFamily,
                  fontSize: 12,
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.7)',
                  textAlign: 'center',
                }}
              >
                Giriş yapmadığınız için veriler sadece bu cihazda saklanır.
              </Text>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}


