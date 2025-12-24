import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';
const arabicFontFamily = 'Noto Sans Arabic';

// Responsive calculations
const horizontalPadding = 20;
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);

// Sample hutbe content
const hutbeContent = {
  title: 'Fedakârlığın Zirvesi: Îsâr',
  date: '28 Kasım 2025',
  dateFormatted: '28.11.2025',
  arabicVerse: 'وَيُطْعِمُونَ الطَّعَامَ على حبه مسكينا وجيما وأسيرا',
  arabicHadith: 'وَقَالَ رَسُولُ اللَّهِ صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ: لا يُؤْمِنُ أَحَدُكُمْ حَتَّى يُحِبُّ لأَخِيهِ مَا يُحِبُّ لِنَفْسِهِ',
  sections: [
    {
      heading: 'Muhterem Müslümanlar!',
      content: 'Îsâr, Arapça kökenli bir kelime olup, "başkasını kendine tercih etmek, öncelik vermek" anlamına gelir. Bu erdem, İslam ahlakının en yüce mertebelerinden biridir.'
    },
    {
      heading: 'Aziz Müminler!',
      content: 'Kur\'an-ı Kerim\'de Yüce Allah şöyle buyurur: "Kendileri ihtiyaç içinde olsalar bile, yoksula, yetime ve esire yemek yedirirler." Bu ayet, îsârın ne kadar önemli bir erdem olduğunu gösterir.'
    },
    {
      heading: 'Kıymetli Müslümanlar!',
      content: 'Günlük hayatımızda îsârı nasıl uygulayabiliriz? Trafikte başkasına yol vermek, engelli birine yardım etmek, ailemizde sevdiklerimizi kendimize tercih etmek... Bunların hepsi îsârın pratik örnekleridir.'
    },
    {
      heading: 'Aziz Müslümanlar!',
      content: 'Yüce Allah, iyilik ve takvada yardımlaşmamızı emreder. Îsâr, bu yardımlaşmanın en güzel örneğidir. Peygamber Efendimiz (s.a.s) buyuruyor: "Allah, kardeşine yardım edene yardım eder."'
    }
  ],
  references: [
    '¹ İnsan, 76/8,9.',
    '² Buhârî, İmân, 7.'
  ]
};

export default function HutbeDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  const title = params.title || hutbeContent.title;
  const date = params.date || hutbeContent.date;

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
            paddingBottom: Platform.OS === 'ios' ? 120 : 100,
          }}
        >
          {/* Title Section */}
          <View style={{ paddingHorizontal: horizontalPadding, paddingTop: 24, paddingBottom: 8 }}>
            <Text
              style={{
                fontFamily,
                fontSize: 16,
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: 4,
                textAlign: 'center',
              }}
            >
              {title}
            </Text>
            <Text
              style={{
                fontFamily,
                fontSize: 10,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.6)',
                textAlign: 'center',
              }}
            >
              {date}
            </Text>
          </View>

          {/* Content Area - Two Column Layout */}
          <View
            style={{
              paddingHorizontal: horizontalPadding,
              paddingVertical: 24,
              borderRadius: 20,
              backgroundColor: 'rgba(24, 39, 35, 0.8)',
              marginHorizontal: horizontalPadding,
              marginTop: 16,
              marginBottom: 24,
            }}
          >
            {/* Date */}
            <Text
              style={{
                fontFamily,
                fontSize: 12,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.8)',
                marginBottom: 16,
              }}
            >
              Tarih: {hutbeContent.dateFormatted}
            </Text>

            {/* Arabic Verse */}
            <Text
              style={{
                fontFamily: arabicFontFamily,
                fontSize: 18,
                fontWeight: '300',
                color: '#E9CC88',
                textAlign: 'right',
                lineHeight: 32,
                marginBottom: 16,
              }}
            >
              {hutbeContent.arabicVerse}
            </Text>

            {/* Arabic Hadith */}
            <Text
              style={{
                fontFamily: arabicFontFamily,
                fontSize: 16,
                fontWeight: '300',
                color: '#E9CC88',
                textAlign: 'right',
                lineHeight: 28,
                marginBottom: 24,
              }}
            >
              {hutbeContent.arabicHadith}
            </Text>

            {/* Title Again */}
            <Text
              style={{
                fontFamily,
                fontSize: 16,
                fontWeight: '700',
                color: '#FFFFFF',
                textAlign: 'center',
                marginBottom: 24,
                textTransform: 'uppercase',
              }}
            >
              {title.toUpperCase()}
            </Text>

            {/* Sections */}
            {hutbeContent.sections.map((section, index) => (
              <View key={index} style={{ marginBottom: 20 }}>
                <Text
                  style={{
                    fontFamily,
                    fontSize: 14,
                    fontWeight: '700',
                    color: '#FFFFFF',
                    marginBottom: 12,
                  }}
                >
                  {section.heading}
                </Text>
                <Text
                  style={{
                    fontFamily,
                    fontSize: 14,
                    fontWeight: '400',
                    color: '#FFFFFF',
                    lineHeight: 22,
                    textAlign: 'justify',
                  }}
                >
                  {section.content}
                </Text>
              </View>
            ))}

            {/* References */}
            <View style={{ marginTop: 24, paddingTop: 16, borderTopWidth: 0.5, borderTopColor: 'rgba(255, 255, 255, 0.2)' }}>
              {hutbeContent.references.map((ref, index) => (
                <Text
                  key={index}
                  style={{
                    fontFamily,
                    fontSize: 10,
                    fontWeight: '400',
                    color: 'rgba(255, 255, 255, 0.6)',
                    marginBottom: 4,
                  }}
                >
                  {ref}
                </Text>
              ))}
            </View>

            {/* Footer */}
            <Text
              style={{
                fontFamily,
                fontSize: 12,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.6)',
                textAlign: 'center',
                marginTop: 24,
              }}
            >
              Din Hizmetleri Genel Müdürlüğü
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

