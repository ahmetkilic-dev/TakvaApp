import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

// Responsive calculations
const horizontalPadding = 20;
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);

// Responsive values for right content
const minRightWidth = Math.min(110, SCREEN_WIDTH * 0.25); // Max 25% of screen width
const lineWidth = Math.min(60, SCREEN_WIDTH * 0.15); // Max 15% of screen width

// Responsive font sizes
const kalanSureFontSize = Math.max(14, Math.min(16, SCREEN_WIDTH / 40)); // Between 14-16px
const gunSayisiFontSize = Math.max(24, Math.min(28, SCREEN_WIDTH / 15)); // Between 24-28px

// Sample data for religious days
const religiousDays = [
  {
    id: 1,
    name: 'Berat Kandili',
    description: 'Günahların affı ve kaderin yazıldığı\nmübarek gece.',
    hijriDate: '15 Şaban 1446',
    gregorianDate: '25 Şubat 2025',
    remainingDays: 12,
    icon: 'moon',
  },
  {
    id: 2,
    name: 'Ramazan Başlangıcı',
    description: 'Oruç tutma ayının başladığı\nmübarek gün.',
    hijriDate: '1 Ramazan 1446',
    gregorianDate: '1 Mart 2025',
    remainingDays: 18,
    icon: 'calendar',
  },
  {
    id: 3,
    name: 'Kadir Gecesi',
    description: 'Bin aydan daha hayırlı olan\nmübarek gece.',
    hijriDate: '27 Ramazan 1446',
    gregorianDate: '27 Mart 2025',
    remainingDays: 44,
    icon: 'star',
  },
  {
    id: 4,
    name: 'Ramazan Bayramı',
    description: 'Üç gün süren sevinç ve\nkutlama günleri.',
    hijriDate: '1 Şevval 1446',
    gregorianDate: '31 Mart 2025',
    remainingDays: 48,
    icon: 'sunny',
  },
  {
    id: 5,
    name: 'Arefe Günü',
    description: 'Kurban Bayramı\'ndan önceki\nmübarek gün.',
    hijriDate: '9 Zilhicce 1446',
    gregorianDate: '6 Haziran 2025',
    remainingDays: 115,
    icon: 'time',
  },
  {
    id: 6,
    name: 'Kurban Bayramı',
    description: 'Dört gün süren kurban\nkesme bayramı.',
    hijriDate: '10 Zilhicce 1446',
    gregorianDate: '7 Haziran 2025',
    remainingDays: 116,
    icon: 'gift',
  },
  {
    id: 7,
    name: 'Mevlid Kandili',
    description: 'Peygamberimizin doğum\ngünü mübarek gecesi.',
    hijriDate: '12 Rebiülevvel 1447',
    gregorianDate: '4 Eylül 2025',
    remainingDays: 205,
    icon: 'heart',
  },
];

export default function DiniGunlerScreen() {
  const router = useRouter();

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
            DİNİ GÜNLER
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
          {/* Title Section */}
          <View className="items-center mb-6">
            <Text
              style={{
                fontFamily,
                fontSize: 21,
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: 4,
              }}
            >
              Bu Yılın Dini Günleri
            </Text>
            <Text
              style={{
                fontFamily,
                fontSize: 13,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.6)',
                textAlign: 'center',
              }}
            >
              Mübarek günlere ve gecelere kalan süreyi buradan takip edebilirsin.
            </Text>
          </View>

          {/* Religious Days List */}
          <View style={{ gap: 16 }}>
            {religiousDays.map((day) => (
              <View
                key={day.id}
                style={{
                  width: contentWidth,
                  backgroundColor: 'rgba(36, 50, 46, 0.05)',
                  borderRadius: 20,
                  borderWidth: 0.5,
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
              >
                {/* Left Content */}
                <View style={{ flex: 1, paddingRight: 12 }}>
                  {/* Title Row */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                    <Ionicons name={day.icon} size={20} color="#FFFFFF" />
                    <Text
                      style={{
                        fontFamily,
                        color: '#FFFFFF',
                        fontSize: 18,
                        fontWeight: '700',
                      }}
                    >
                      {day.name}
                    </Text>
                  </View>

                  {/* Description */}
                  <Text
                    style={{
                      fontFamily,
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: 12,
                      lineHeight: 16,
                      marginBottom: 16,
                    }}
                  >
                    {day.description}
                  </Text>

                  {/* Date Container */}
                  <View style={{ gap: 6 }}>
                    <Text
                      style={{
                        fontFamily,
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: 13,
                      }}
                      numberOfLines={1}
                    >
                      Hicrî Takvim :{' '}
                      <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>{day.hijriDate}</Text>
                    </Text>
                    <View
                      style={{
                        width: '100%',
                        height: 1,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      }}
                    />
                    <Text
                      style={{
                        fontFamily,
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: 13,
                      }}
                      numberOfLines={1}
                    >
                      Miladî Takvim :{' '}
                      <Text style={{ color: '#FFFFFF', fontWeight: '600' }}>{day.gregorianDate}</Text>
                    </Text>
                  </View>
                </View>

                {/* Right Content */}
                <View style={{ alignItems: 'center', justifyContent: 'center', minWidth: minRightWidth }}>
                  <View style={{ alignItems: 'center' }}>
                    <Text
                      style={{
                        fontFamily,
                        color: '#FFBA4A',
                        fontSize: kalanSureFontSize,
                        marginBottom: 4,
                      }}
                    >
                      Kalan Süre
                    </Text>
                    <View
                      style={{
                        width: lineWidth,
                        height: 1,
                        backgroundColor: '#FFBA4A',
                        marginBottom: 4,
                      }}
                    />
                  </View>
                  <Text
                    style={{
                      fontFamily,
                      color: '#FFBA4A',
                      fontSize: gunSayisiFontSize,
                      fontWeight: '700',
                    }}
                  >
                    {day.remainingDays} Gün
                  </Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

