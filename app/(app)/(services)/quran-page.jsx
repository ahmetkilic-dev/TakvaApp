import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';
import { useState } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';
const arabicFontFamily = 'Noto Sans Arabic';

// Responsive calculations
const horizontalPadding = 20;
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);

// Sample verses data
const verses = [
  {
    id: 1,
    arabic: 'بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ',
    turkish: "Rahmân ve Rahîm olan Allah'ın adıyla",
    verseNumber: null,
    verseNumberText: null,
  },
  {
    id: 2,
    arabic: 'الم',
    turkish: 'Elif Lâm Mîm',
    verseNumber: 1,
    verseNumberText: '(1)',
  },
  {
    id: 3,
    arabic: 'ذَلِكَ الْكِتَابُ لَا رَيْبَ فِيهِ هُدًى لِلْمُتَّقِينَ',
    turkish: "O kitap (Kur'an); onda asla şüphe yoktur. O, müttakîler (sakınanlar ve arınmak isteyenler) için bir yol göstericidir.",
    verseNumber: 2,
    verseNumberText: '(۲)',
  },
  {
    id: 4,
    arabic: 'الَّذِينَ يُؤْمِنُونَ بِالْغَيْبِ وَيُقِيمُونَ الصَّلَوةَ وَمِمَّا رَزَقْنَاهُمْ يُنْفِقُونَ',
    turkish: 'Onlar gayba inanırlar, namaz kılarlar, kendilerine verdiğimiz mallardan Allah yolunda harcarlar.',
    verseNumber: 3,
    verseNumberText: '(۳)',
  },
  {
    id: 5,
    arabic: 'وَالَّذِينَ يُؤْمِنُونَ بِمَا أُنْزِلَ إِلَيْكَ وَمَا أُنْزِلَ مِنْ قَبْلِكَ وَبِالْآخِرَةِ هُمْ يُوقِنُونَ',
    turkish: "Yine onlar, sana indirilene ve senden önce indirilene iman ederler; ahiret gününe de kesinkes inanırlar.",
    verseNumber: 4,
    verseNumberText: '(٤)',
  },
  {
    id: 6,
    arabic: 'أُوْلَئِكَ عَلَى هُدًى مِنْ رَبِّهِمْ وَأُوْلَئِكَ هُمُ الْمُفْلِحُونَ',
    turkish: "İşte onlar, Rablerinden gelen bir hidayet üzeredirler ve kurtuluşa erenler de ancak onlardır.",
    verseNumber: 5,
    verseNumberText: '(0)',
  },
];

export default function QuranPageScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedPage, setSelectedPage] = useState(3);
  const [activeTab, setActiveTab] = useState('Kur\'an');

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
          {/* Sura Title */}
          <View style={{ paddingHorizontal: horizontalPadding, paddingTop: 24, paddingBottom: 16 }}>
            <Text
              style={{
                fontFamily,
                fontSize: 20,
                fontWeight: '700',
                color: '#FFFFFF',
                textAlign: 'center',
                letterSpacing: 2,
              }}
            >
              Bakara suresi
            </Text>
          </View>

          {/* Page Navigation Numbers and Kur'an / Meal Tabs */}
          <View style={{ paddingHorizontal: horizontalPadding, marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
              {/* Page Numbers */}
              {[1, 2, 3, 4, 5].map((pageNum) => (
                <TouchableOpacity
                  key={pageNum}
                  onPress={() => setSelectedPage(pageNum)}
                  style={{ alignItems: 'center' }}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  activeOpacity={0.7}
                >
                  <Text
                    style={{
                      fontFamily,
                      fontSize: 15,
                      fontWeight: selectedPage === pageNum ? '700' : '300',
                      color: selectedPage === pageNum ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                      letterSpacing: 2,
                    }}
                  >
                    {pageNum}
                  </Text>
                  {selectedPage === pageNum && (
                    <View
                      style={{
                        width: 40,
                        height: 1,
                        backgroundColor: '#FFFFFF',
                        borderRadius: 10,
                        marginTop: 4,
                      }}
                    />
                  )}
                </TouchableOpacity>
              ))}
              
              {/* Kur'an / Meal Tabs */}
              <TouchableOpacity onPress={() => setActiveTab('Kur\'an')} style={{ alignItems: 'center', marginLeft: 12 }}>
                <Text
                  style={{
                    fontFamily,
                    fontSize: 15,
                    fontWeight: activeTab === 'Kur\'an' ? '700' : '300',
                    color: activeTab === 'Kur\'an' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                    letterSpacing: 2,
                  }}
                >
                  Kur'an
                </Text>
                {activeTab === 'Kur\'an' && (
                  <View
                    style={{
                      width: 63,
                      height: 1,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 10,
                      marginTop: 4,
                    }}
                  />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTab('Meal')} style={{ alignItems: 'center' }}>
                <Text
                  style={{
                    fontFamily,
                    fontSize: 15,
                    fontWeight: activeTab === 'Meal' ? '700' : '300',
                    color: activeTab === 'Meal' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                    letterSpacing: 2,
                  }}
                >
                  Meal
                </Text>
                {activeTab === 'Meal' && (
                  <View
                    style={{
                      width: 46,
                      height: 1,
                      backgroundColor: '#FFFFFF',
                      borderRadius: 10,
                      marginTop: 4,
                    }}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Content Area */}
          <View
            style={{
              paddingHorizontal: horizontalPadding,
              paddingVertical: 24,
              borderRadius: 20,
              backgroundColor: 'rgba(24, 39, 35, 0.8)',
              marginHorizontal: horizontalPadding,
              marginBottom: 24,
            }}
          >
            {activeTab === 'Kur\'an' ? (
              /* Kur'an Tab - Single Arabic Text Block */
              <Text
                style={{
                  fontFamily: arabicFontFamily,
                  fontSize: 20,
                  fontWeight: '300',
                  color: '#E9CC88',
                  textAlign: 'right',
                  lineHeight: 37,
                  letterSpacing: 2,
                }}
              >
                {verses.map((verse) => {
                  if (verse.verseNumberText) {
                    return `${verse.arabic} ${verse.verseNumberText} `;
                  }
                  return `${verse.arabic} `;
                }).join('')}
              </Text>
            ) : (
              /* Meal Tab - Separate Verses with Turkish Translation */
              verses.map((verse, index) => (
                <View key={verse.id}>
                  {/* Arabic Text with Verse Number */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {verse.verseNumberText && (
                      <Text
                        style={{
                          fontFamily: arabicFontFamily,
                          fontSize: 15,
                          fontWeight: '300',
                          color: '#FFBA4A',
                          lineHeight: 37,
                          letterSpacing: 2,
                          marginRight: 8,
                        }}
                      >
                        {verse.verseNumberText}
                      </Text>
                    )}
                    <Text
                      style={{
                        fontFamily: arabicFontFamily,
                        fontSize: 20,
                        fontWeight: '300',
                        color: '#E9CC88',
                        textAlign: 'center',
                        lineHeight: 37,
                        letterSpacing: 2,
                      }}
                    >
                      {verse.arabic}
                    </Text>
                  </View>

                  {/* Turkish Translation */}
                  <Text
                    style={{
                      fontFamily,
                      fontSize: 15,
                      fontWeight: '300',
                      color: '#FFFFFF',
                      textAlign: 'center',
                      lineHeight: 15,
                      letterSpacing: 2,
                      width: '100%',
                      marginTop: 8,
                    }}
                  >
                    {verse.turkish}
                  </Text>

                  {/* Horizontal Separator Line after Arabic and Turkish */}
                  {index < verses.length - 1 && (
                    <View
                      style={{
                        width: '100%',
                        height: 0.5,
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        marginTop: 24,
                        marginBottom: 0,
                      }}
                    />
                  )}
                </View>
              ))
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

