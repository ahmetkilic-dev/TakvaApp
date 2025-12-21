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

// Sample hutbe data
const hutbeList = [
  {
    id: 1,
    title: 'Fedakârlığın Zirvesi: Îsâr',
    date: '28 Kasım 2025',
  },
  {
    id: 2,
    title: 'Fedakârlığın Zirvesi: Îsâr',
    date: '28 Kasım 2025',
  },
  {
    id: 3,
    title: 'Fedakârlığın Zirvesi: Îsâr',
    date: '28 Kasım 2025',
  },
  {
    id: 4,
    title: 'Fedakârlığın Zirvesi: Îsâr',
    date: '28 Kasım 2025',
  },
  {
    id: 5,
    title: 'Fedakârlığın Zirvesi: Îsâr',
    date: '28 Kasım 2025',
  },
  {
    id: 6,
    title: 'Fedakârlığın Zirvesi: Îsâr',
    date: '28 Kasım 2025',
  },
  {
    id: 7,
    title: 'Fedakârlığın Zirvesi: Îsâr',
    date: '28 Kasım 2025',
  },
  {
    id: 8,
    title: 'Fedakârlığın Zirvesi: Îsâr',
    date: '28 Kasım 2025',
  },
];

export default function HutbeScreen() {
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
            HUTBE
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
          {/* List Items */}
          <View style={{ gap: 12 }}>
            {hutbeList.map((hutbe) => (
              <TouchableOpacity
                key={hutbe.id}
                style={{
                  width: '100%',
                  maxWidth: 350,
                  height: 45,
                  borderRadius: 15,
                  borderWidth: 0.5,
                  borderColor: 'rgba(255, 255, 255, 0.75)',
                  backgroundColor: 'rgba(24, 39, 35, 0.5)',
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  alignSelf: 'center',
                }}
              >
                {/* Text Content */}
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily,
                      fontSize: 16,
                      fontWeight: '700',
                      color: '#FFFFFF',
                      marginBottom: 2,
                    }}
                  >
                    {hutbe.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily,
                      fontSize: 10,
                      fontWeight: '300',
                      color: 'rgba(255, 255, 255, 0.6)',
                    }}
                  >
                    {hutbe.date}
                  </Text>
                </View>

                {/* Arrow Icon */}
                <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

