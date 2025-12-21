import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

// Responsive calculations
const horizontalPadding = 20;
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);

// Sample prayer times data
const prayerTimesList = [
  {
    id: 1,
    date: '25 Şaban 1445 / 6 Mart Çarşamba',
    times: {
      imsak: '06:19',
      gunes: '07:48',
      ogle: '12:54',
      ikindi: '15:26',
      aksam: '17:49',
      yatsi: '19:12',
    },
  },
  {
    id: 2,
    date: '25 Şaban 1445 / 6 Mart Çarşamba',
    times: {
      imsak: '06:19',
      gunes: '07:48',
      ogle: '12:54',
      ikindi: '15:26',
      aksam: '17:49',
      yatsi: '19:12',
    },
  },
  {
    id: 3,
    date: '25 Şaban 1445 / 6 Mart Çarşamba',
    times: {
      imsak: '06:19',
      gunes: '07:48',
      ogle: '12:54',
      ikindi: '15:26',
      aksam: '17:49',
      yatsi: '19:12',
    },
  },
  {
    id: 4,
    date: '25 Şaban 1445 / 6 Mart Çarşamba',
    times: {
      imsak: '06:19',
      gunes: '07:48',
      ogle: '12:54',
      ikindi: '15:26',
      aksam: '17:49',
      yatsi: '19:12',
    },
  },
  {
    id: 5,
    date: '25 Şaban 1445 / 6 Mart Çarşamba',
    times: {
      imsak: '06:19',
      gunes: '07:48',
      ogle: '12:54',
      ikindi: '15:26',
      aksam: '17:49',
      yatsi: '19:12',
    },
  },
  {
    id: 6,
    date: '25 Şaban 1445 / 6 Mart Çarşamba',
    times: {
      imsak: '06:19',
      gunes: '07:48',
      ogle: '12:54',
      ikindi: '15:26',
      aksam: '17:49',
      yatsi: '19:12',
    },
  },
];

const prayerNames = ['İmsak', 'Güneş', 'Öğle', 'İkindi', 'Akşam', 'Yatsı'];

export default function ImsakiyeScreen() {
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
            İMSAKİYE
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
          {/* Title Section */}
          <View style={{ marginBottom: 16, alignItems: 'center' }}>
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
              Bu Ayın Vakitleri
            </Text>
            <Text
              style={{
                fontFamily,
                fontSize: 10,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: 14,
                textAlign: 'center',
              }}
            >
              Bu ayın imsak, iftar ve namaz vakitlerini günlük olarak{'\n'}buradan takip edebilirsin.
            </Text>
          </View>

          {/* Prayer Times List */}
          <View style={{ gap: 12 }}>
            {prayerTimesList.map((item) => (
              <View
                key={item.id}
                style={{
                  width: contentWidth,
                  minHeight: 95,
                  borderRadius: 10,
                  borderWidth: 0.5,
                  borderColor: 'rgba(255, 255, 255, 0.75)',
                  backgroundColor: 'rgba(24, 39, 35, 0.5)',
                  paddingHorizontal: 11,
                  paddingVertical: 10,
                }}
              >
                {/* Date */}
                <Text
                  style={{
                    fontFamily,
                    fontSize: 14,
                    fontWeight: '300',
                    color: '#FFFFFF',
                    marginBottom: 8,
                  }}
                >
                  {item.date}
                </Text>

                {/* Separator Line */}
                <View
                  style={{
                    width: '100%',
                    height: 0.5,
                    backgroundColor: 'rgba(217, 217, 217, 0.5)',
                    marginBottom: 8,
                  }}
                />

                {/* Prayer Names Row */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 4 }}>
                  {prayerNames.map((name) => (
                    <Text
                      key={name}
                      style={{
                        fontFamily,
                        fontSize: 14,
                        fontWeight: '300',
                        color: '#FFFFFF',
                        textAlign: 'center',
                        flex: 1,
                      }}
                    >
                      {name}
                    </Text>
                  ))}
                </View>

                {/* Prayer Times Row */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text
                    style={{
                      fontFamily,
                      fontSize: 16,
                      fontWeight: '700',
                      color: '#FFFFFF',
                      textAlign: 'center',
                      flex: 1,
                    }}
                  >
                    {item.times.imsak}
                  </Text>
                  <Text
                    style={{
                      fontFamily,
                      fontSize: 16,
                      fontWeight: '700',
                      color: '#FFFFFF',
                      textAlign: 'center',
                      flex: 1,
                    }}
                  >
                    {item.times.gunes}
                  </Text>
                  <Text
                    style={{
                      fontFamily,
                      fontSize: 16,
                      fontWeight: '700',
                      color: '#FFFFFF',
                      textAlign: 'center',
                      flex: 1,
                    }}
                  >
                    {item.times.ogle}
                  </Text>
                  <Text
                    style={{
                      fontFamily,
                      fontSize: 16,
                      fontWeight: '700',
                      color: '#FFFFFF',
                      textAlign: 'center',
                      flex: 1,
                    }}
                  >
                    {item.times.ikindi}
                  </Text>
                  <Text
                    style={{
                      fontFamily,
                      fontSize: 16,
                      fontWeight: '700',
                      color: '#FFFFFF',
                      textAlign: 'center',
                      flex: 1,
                    }}
                  >
                    {item.times.aksam}
                  </Text>
                  <Text
                    style={{
                      fontFamily,
                      fontSize: 16,
                      fontWeight: '700',
                      color: '#FFFFFF',
                      textAlign: 'center',
                      flex: 1,
                    }}
                  >
                    {item.times.yatsi}
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

