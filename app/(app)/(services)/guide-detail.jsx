import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Icon imports - matching the filenames in assets/hizmetler
import NamazDurumuIcon from '../../../assets/hizmetler/namazdurumu.png';
import AyetIcon from '../../../assets/hizmetler/ayet.png';
import NamazRehberiIcon from '../../../assets/hizmetler/namazrehberi.png';
import AbdestRehberiIcon from '../../../assets/hizmetler/abdestrehberi.png';
import ZikirIcon from '../../../assets/hizmetler/zikir.png';
import KuranIcon from '../../../assets/hizmetler/kuran.png';
import HutbeIcon from '../../../assets/hizmetler/hutbe.png';
import HatirlaticiIcon from '../../../assets/hizmetler/hatirlatici.png';
import KibleIcon from '../../../assets/hizmetler/kible.png';
import KelamIcon from '../../../assets/hizmetler/kelam.png';
import IlimIcon from '../../../assets/hizmetler/ilim.png';
import DiniGunIcon from '../../../assets/hizmetler/dinigün.png';
import ImsakiyeIcon from '../../../assets/hizmetler/imsakiye.png';
import HocaIcon from '../../../assets/hizmetler/hoca.png';
import GorevRozetIcon from '../../../assets/hizmetler/görev-rozet.png';
import ProfilIcon from '../../../assets/hizmetler/profil.png';

const fontFamily = 'Plus Jakarta Sans';

// Services data matching the design
const services = [
  {
    id: 1,
    title: 'Namaz Durumu',
    description: 'Günlük namazlarını işaretle, ilerlemeni takip et.',
    icon: NamazDurumuIcon,
  },
  {
    id: 2,
    title: 'Günlük Ayet',
    description: 'Her gün seçilmiş bir ayeti anlamıyla birlikte keşfet.',
    icon: AyetIcon,
  },
  {
    id: 3,
    title: 'Namaz Rehberi',
    description: 'Adım adım doğru namaz kılma rehberi.',
    icon: NamazRehberiIcon,
  },
  {
    id: 4,
    title: 'Abdest Rehberi',
    description: 'Adım adım doğru abdest alma rehberi.',
    icon: AbdestRehberiIcon,
  },
  {
    id: 5,
    title: 'Zikir & Dua',
    description: 'Zikir çek, dua oku ve ilerlemeni kaydet.',
    icon: ZikirIcon,
  },
  {
    id: 6,
    title: 'Kuran-ı Kerim',
    description: 'Sureleri oku, meallerini incele, kaldığın yerden devam et.',
    icon: KuranIcon,
  },
  {
    id: 7,
    title: 'Hutbe',
    description: 'Haftalık hutbeleri oku, ana mesajı öğren.',
    icon: HutbeIcon,
  },
  {
    id: 8,
    title: 'Hatırlatıcılar',
    description: 'Namaz vakti ve kişisel hatırlatıcıları buradan yönet.',
    icon: HatirlaticiIcon,
  },
  {
    id: 9,
    title: 'Kıble Pusulası',
    description: 'Konumuna göre kıble yönünü hassas şekilde bul.',
    icon: KibleIcon,
  },
  {
    id: 10,
    title: 'Kelâm',
    description: 'İslami içerik üreticilerinden kısa videoları keşfet.',
    icon: KelamIcon,
  },
  {
    id: 11,
    title: 'İlim',
    description: 'Bilgini ölç, ilmini artır ve kategorilere göre test çöz.',
    icon: IlimIcon,
  },
  {
    id: 12,
    title: 'Dini Günler',
    description: 'Mübarek gün ve gecelere kalan süreyi takip et.',
    icon: DiniGunIcon,
  },
  {
    id: 13,
    title: 'İmsakiye',
    description: 'İmsak, iftar ve günlük namaz vakitlerini görüntüle.',
    icon: ImsakiyeIcon,
  },
  {
    id: 14,
    title: 'HocaAI',
    description: 'Dini sorularına rehberlik sağlayan yapay zekâ hocası.',
    icon: HocaIcon,
  },
  {
    id: 15,
    title: 'Görevler & Rozetler',
    description: 'İlerlemene göre rozet kazan, günlük görevleri tamamla.',
    icon: GorevRozetIcon,
  },
  {
    id: 16,
    title: 'Profil & İstatistikler',
    description: 'İlerlemelerini, rozetlerini ve istatistiklerini gör.',
    icon: ProfilIcon,
  },
];

export default function GuideDetailScreen() {
  const router = useRouter();

  const handleServicePress = (service) => {
    // Abdest Rehberi'ne basınca abdest ekranına git
    if (service.title === 'Abdest Rehberi') {
      router.push('/(app)/(services)/abdest');
    } else if (service.title === 'Kuran-ı Kerim') {
      router.push('/(app)/(services)/quran');
    } else if (service.title === 'Hutbe') {
      router.push('/(app)/(services)/hutbe');
    } else if (service.title === 'İmsakiye') {
      router.push('/(app)/(services)/imsakiye');
    } else if (service.title === 'Hatırlatıcılar') {
      router.push('/(app)/(services)/hatirlatici');
    } else if (service.title === 'Namaz Durumu') {
      router.push('/(app)/(tabs)/namaz');
    } else if (service.title === 'Günlük Ayet') {
      router.push('/(app)/(services)/quran');
    } else if (service.title === 'HocaAI') {
      router.push('/(app)/(services)/hoca-ai');
    } else if (service.title === 'Görevler & Rozetler') {
      router.push('/(app)/(services)/rozetgorev');
    } else if (service.title === 'Dini Günler') {
      router.push('/(app)/(services)/diniGunler');
    } else {
      // Diğer hizmetler için şimdilik console.log
      console.log('Service pressed:', service.title);
    }
  };

  const handlePremiumPress = () => {
    router.push('/(app)/(services)/premium');
  };

  // Calculate card width for 2 columns with padding (matching design: 20px side padding = 40px total, 16px gap)
  // Using responsive calculation that works on all screen sizes (iOS and Android)
  const sidePadding = 20; // px-5 = 20px on each side (40px total)
  const gapBetweenCards = 16;
  const totalPadding = sidePadding * 2;
  const cardWidth = Math.floor((SCREEN_WIDTH - totalPadding - gapBetweenCards) / 2);

  return (
    <ScreenBackground>
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-5 pt-2 pb-4">
          <TouchableOpacity onPress={() => router.back()} className="w-8 h-8 items-center justify-center">
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <View className="flex-1" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 120 : 100 }}
        >
          {/* Title Section */}
          <View className="px-5 mb-6 mt-2">
            <Text
              style={{ 
                fontFamily,
                fontSize: 16,
                fontWeight: '700',
                color: '#FFFFFF',
                textAlign: 'center',
                lineHeight: 16,
                marginBottom: 8,
              }}
            >
              Tüm Hizmetlerimiz
            </Text>
            <Text
              style={{ 
                fontFamily,
                fontSize: 12,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.8)',
                textAlign: 'center',
                lineHeight: 16.8,
              }}
            >
              Takva'da sana sunulan tüm özellikleri{'\n'}buradan keşfedebilirsiniz.
            </Text>
          </View>

          {/* Services Grid */}
          <View className="px-5">
            <View className="flex-row flex-wrap justify-between">
              {services.map((service) => (
                <TouchableOpacity
                  key={service.id}
                  onPress={() => handleServicePress(service)}
                  activeOpacity={0.7}
                  className="mb-4 overflow-hidden"
                  style={{
                    width: cardWidth,
                    height: 140,
                    backgroundColor: 'rgba(24, 39, 35, 0.5)',
                    borderWidth: 0.5,
                    borderColor: 'rgba(255, 255, 255, 0.75)',
                    borderRadius: 15,
                  }}
                >
                  <View className="flex-1 p-4 items-center justify-center">
                    {/* Icon with Circle Background */}
                    <View 
                      className="mb-3 items-center justify-center"
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        backgroundColor: 'rgba(250, 183, 75, 0.07)',
                        borderWidth: 0.5,
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                      }}
                    >
                      <Image
                        source={service.icon}
                        style={{ width: 30, height: 30 }}
                        resizeMode="contain"
                      />
                    </View>

                    {/* Title */}
                    <Text
                      style={{ 
                        fontFamily,
                        fontSize: 12,
                        fontWeight: '700',
                        color: '#FFFFFF',
                        textAlign: 'center',
                        lineHeight: 12,
                        marginBottom: 8,
                      }}
                    >
                      {service.title}
                    </Text>

                    {/* Description */}
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
                      {service.description}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Premium Banner */}
          <TouchableOpacity
            onPress={handlePremiumPress}
            activeOpacity={0.8}
            className="mx-5 mt-4 mb-6 rounded-[15px] overflow-hidden"
            style={{
              backgroundColor: '#1E3A35',
              borderWidth: 0.5,
              borderColor: 'rgba(255, 255, 255, 0.1)',
            }}
          >
            <View className="flex-row items-center px-4 py-4">
              {/* Crescent Icon */}
              <View className="w-12 h-12 items-center justify-center mr-3">
                <Text style={{ fontSize: 24 }}>🌙</Text>
              </View>

              {/* Text Content */}
              <View className="flex-1">
                <Text
                  style={{ 
                    fontFamily,
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#FAB74B',
                    marginBottom: 4,
                  }}
                >
                  TAKVA PREMIUM
                </Text>
                <Text
                  style={{ 
                    fontFamily,
                    fontSize: 12,
                    fontWeight: '400',
                    color: 'rgba(255, 255, 255, 0.8)',
                  }}
                >
                  Daha fazla özellik ve reklamsız deneyim için Premium'u keşfet.
                </Text>
              </View>

              {/* Arrow Icon */}
              <Ionicons name="chevron-forward" size={20} color="#FAB74B" />
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}