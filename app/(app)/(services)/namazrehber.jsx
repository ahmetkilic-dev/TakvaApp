import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';
import { useState } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

// Responsive calculations
const horizontalPadding = 20;
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);

// Prayer list data
const prayers = [
  { id: 1, name: 'Sabah namazı', rekât: 4, fullName: 'Sabah namazı (4 rekât)' },
  { id: 2, name: 'Öğle namazı', rekât: 10, fullName: 'Öğle namazı (10 rekât)' },
  { id: 3, name: 'İkindi namazı', rekât: 8, fullName: 'İkindi namazı (8 rekât)' },
  { id: 4, name: 'Akşam namazı', rekât: 5, fullName: 'Akşam namazı (5 rekât)' },
  { id: 5, name: 'Yatsı namazı', rekât: 13, fullName: 'Yatsı namazı (13 rekât)' },
];

export default function NamazRehberScreen() {
  const router = useRouter();
  const [selectedPrayer, setSelectedPrayer] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handlePrayerSelect = (prayer) => {
    setSelectedPrayer(prayer);
    setIsDropdownOpen(false);
    // TODO: Navigate to prayer guide detail screen
  };

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
            NAMAZ
          </Text>
          <View className="w-9" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: horizontalPadding,
            paddingTop: 24,
            paddingBottom: 0,
            alignItems: 'center',
          }}
        >
          <View style={{ width: '100%', alignItems: 'center' }}>
            {/* Title */}
            <Text
              style={{
                fontFamily,
                fontSize: 20,
                fontWeight: '500',
                color: '#FFFFFF',
                marginBottom: 8,
                textAlign: 'center',
              }}
            >
              Namaz Kılma Rehberi
            </Text>

            {/* Subtitle */}
            <Text
              style={{
                fontFamily,
                fontSize: 14,
                fontWeight: '500',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: 24,
                textAlign: 'center',
                lineHeight: 20,
              }}
            >
              Seçtiğiniz namazın kılınışını adım adım öğrenin.
            </Text>

            {/* Dropdown Container */}
            <View style={{ width: Math.min(contentWidth, 320), position: 'relative', zIndex: 10 }}>
              <TouchableOpacity
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{
                  width: '100%',
                  height: 40,
                  borderRadius: 15,
                  borderWidth: 0.5,
                  borderColor: 'rgba(255, 255, 255, 0.75)',
                  backgroundColor: 'rgba(23, 37, 33, 0.5)',
                  paddingHorizontal: 15,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    fontFamily,
                    fontSize: 16,
                    fontWeight: '400',
                    color: selectedPrayer ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                  }}
                >
                  {selectedPrayer ? selectedPrayer.fullName : 'Namaz seçiniz'}
                </Text>
                <Ionicons
                  name={isDropdownOpen ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#FFFFFF"
                />
              </TouchableOpacity>

              {/* Dropdown List */}
              {isDropdownOpen && (
                <View
                  style={{
                    position: 'absolute',
                    top: 48,
                    left: 0,
                    width: '100%',
                    borderRadius: 15,
                    borderWidth: 0.5,
                    borderColor: 'rgba(255, 255, 255, 0.75)',
                    backgroundColor: 'rgba(23, 37, 33, 0.95)',
                    overflow: 'hidden',
                    marginTop: 4,
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 8,
                  }}
                >
                  {prayers.map((prayer, index) => (
                    <View key={prayer.id}>
                      <TouchableOpacity
                        onPress={() => handlePrayerSelect(prayer)}
                        style={{
                          width: '100%',
                          height: 53,
                          paddingHorizontal: 15,
                          paddingVertical: 16,
                          justifyContent: 'center',
                          backgroundColor: selectedPrayer?.id === prayer.id ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
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
                          {prayer.fullName}
                        </Text>
                      </TouchableOpacity>
                      {index < prayers.length - 1 && (
                        <View
                          style={{
                            width: Math.min(contentWidth - 60, 300),
                            height: 0.5,
                            backgroundColor: 'rgba(255, 255, 255, 0.5)',
                            marginLeft: 15,
                          }}
                        />
                      )}
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

