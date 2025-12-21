import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

// Responsive calculations
const horizontalPadding = 35;
const imageWidth = Math.min(320, SCREEN_WIDTH - (horizontalPadding * 2));
const imageHeight = (imageWidth * 175) / 320; // Maintain 320:175 ratio

// Abdest adımları - görüntüdeki metinlerle tam eşleşecek şekilde
const abdestSteps = [
  {
    id: 1,
    title: 'Niyet Etmek',
    image: require('../../../assets/abdest/niyet.webp'),
    descriptions: [
      'Abdest almaya kalben niyet edilir.',
      '"Bismillahirrahmanirrahim" denilerek abdeste başlanır.',
      'Eller bileklere kadar yıkanır.',
    ],
  },
  {
    id: 2,
    title: 'Ağız ve Burnu Yıkamak',
    image: require('../../../assets/abdest/agizburun.webp'),
    descriptions: [
      'Ağız üç kez çalkalanır, su üç kez buruna verilerek temizlenir.',
    ],
  },
  {
    id: 3,
    title: 'Yüzü Yıkamak',
    image: require('../../../assets/abdest/yüz.webp'),
    descriptions: [
      'Alından çene altına ve iki kulak arası dahil olmak üzere yüz üç kez yıkanır.',
    ],
  },
  {
    id: 4,
    title: 'Kolları Yıkamak',
    image: require('../../../assets/abdest/kollar.webp'),
    descriptions: [
      'Sağ kol dirsekle birlikte üç kez, ardından sol kol üç kez yıkanır.',
    ],
  },
  {
    id: 5,
    title: 'Başı Meshetmek',
    image: require('../../../assets/abdest/bas.webp'),
    descriptions: [
      'Sağ elin içi ıslatılıp alından enseye doğru sıvazlanarak baş mesh edilir.',
    ],
  },
  {
    id: 6,
    title: 'Kulakları Meshetmek',
    image: require('../../../assets/abdest/kulak.webp'),
    descriptions: [
      'Islak elin başparmağıyla, serçeparmağıyla sıvazlanarak kulaklar mesh edilir.',
    ],
  },
  {
    id: 7,
    title: 'Boynu Meshetmek',
    image: require('../../../assets/abdest/boyun.webp'),
    descriptions: [
      'Islak parmakların tersiyle, ense ortasından yanlara doğru boyun da mesh edilir.',
    ],
  },
  {
    id: 8,
    title: 'Ayakları Yıkamak',
    image: require('../../../assets/abdest/ayak.webp'),
    descriptions: [
      'Önce sağ ayak, sonra sol ayak topuklar dahil olmak üzere üç kez yıkanır. Ayak parmakları arası temizlenir.',
    ],
  },
];

export default function AbdestScreen() {
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
            NAMAZ
          </Text>
          <View className="w-9" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 120 : 100 }}
        >
          {/* Title Section */}
          <View style={{ paddingHorizontal: horizontalPadding, paddingTop: 24, paddingBottom: 16 }}>
            <Text
              style={{
                fontFamily,
                fontSize: 20,
                fontWeight: '500',
                color: '#FFFFFF',
                marginBottom: 4,
              }}
            >
              Abdest Alma Rehberi
            </Text>
            <Text
              style={{
                fontFamily,
                fontSize: 14,
                fontWeight: '500',
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              Abdest almayı adım adım öğrenin.
            </Text>
          </View>

          {/* Steps */}
          <View style={{ paddingHorizontal: horizontalPadding }}>
            {abdestSteps.map((step, index) => (
              <View key={step.id} style={{ marginBottom: 24 }}>
                {/* Step Title */}
                <Text
                  style={{
                    fontFamily,
                    fontSize: 18,
                    fontWeight: '600',
                    color: '#FFFFFF',
                    marginBottom: 8,
                    textAlign: 'center',
                  }}
                >
                  {step.title}
                </Text>

                {/* Image */}
                <View
                  style={{
                    marginBottom: 12,
                    overflow: 'hidden',
                    width: imageWidth,
                    height: imageHeight,
                    alignSelf: 'center',
                    borderRadius: 10,
                    borderWidth: 0.5,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: '#172521',
                  }}
                >
                  <Image
                    source={step.image}
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                    resizeMode="cover"
                  />
                  {/* Step Number */}
                  <View
                    style={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      width: 36,
                      height: 20,
                      borderTopLeftRadius: 10,
                      borderBottomRightRadius: 10,
                      borderTopRightRadius: 0,
                      borderBottomLeftRadius: 0,
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      borderWidth: 0.5,
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily,
                        fontSize: 14,
                        fontWeight: '600',
                        color: '#FFFFFF',
                      }}
                    >
                      {step.id}
                    </Text>
                  </View>
                </View>

                {/* Description Boxes */}
                {step.descriptions && step.descriptions.map((description, descIndex) => (
                  <View
                    key={descIndex}
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      width: imageWidth,
                      alignSelf: 'center',
                      borderRadius: 15,
                      backgroundColor: 'rgba(24, 39, 35, 0.5)',
                      borderWidth: 0.5,
                      borderColor: 'rgba(255, 255, 255, 0.75)',
                      marginBottom: descIndex < step.descriptions.length - 1 ? 8 : 0,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily,
                        fontSize: 16,
                        fontWeight: '400',
                        color: '#FFFFFF',
                        lineHeight: 22,
                        textAlign: 'left',
                      }}
                    >
                      {description}
                    </Text>
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}
