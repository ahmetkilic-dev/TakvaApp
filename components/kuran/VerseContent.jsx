import { View, Text, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';
import React from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const horizontalPadding = Math.max(20, SCREEN_WIDTH * 0.05);
const fontFamily = 'PlusJakartaSans-Light';
const arabicFontFamily = 'ScheherazadeNew-Regular';

const toArabicDigits = (num) => {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().split('').map(digit => arabicDigits[parseInt(digit)] || digit).join('');
};

const BISMILLAH_ARABIC = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
const BISMILLAH_TURKISH = "Rahmân ve Rahîm olan Allah'ın adıyla.";




const VerseContent = ({ verses, activeTab, loading, error }) => {
  if (loading) {
    return (
      <View
        style={{
          paddingHorizontal: horizontalPadding,
          paddingVertical: 24,
          borderRadius: 0,
          backgroundColor: '#EDEBD0',
          marginHorizontal: 0,
          marginBottom: 24,

          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 200,
        }}
      >
        <Text
          style={{
            fontFamily,
            fontSize: 16,
            fontWeight: '300',
            color: '#2A2A2A',

          }}
        >
          Yükleniyor...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          paddingHorizontal: horizontalPadding,
          paddingVertical: 24,
          borderRadius: 0,
          backgroundColor: '#EDEBD0',
          marginHorizontal: 0,
          marginBottom: 24,

          alignItems: 'center',

          justifyContent: 'center',
          minHeight: 200,
        }}
      >
        <Text
          style={{
            fontFamily,
            fontSize: 16,
            fontWeight: '300',
            color: '#FF6B6B',
          }}
        >
          {error}
        </Text>
      </View>
    );
  }

  if (!verses || verses.length === 0) {
    return null;
  }

  return (
    <View
      style={{
        paddingHorizontal: horizontalPadding,
        paddingVertical: 24,
        borderRadius: 0,
        backgroundColor: '#EDEBD0',
        marginHorizontal: 0,
        flex: 1,
      }}



    >
      {activeTab === 'Kur\'an' ? (
        /* Kur'an Tab - Single Arabic Text Block */
        <Text
          style={{
            fontFamily: arabicFontFamily,
            fontSize: 24,
            fontWeight: '400',
            color: '#000000',
            textAlign: 'center',
            lineHeight: 45,
            letterSpacing: 2,
          }}

        >
          {verses.map((verse) => {
            if (verse.verseNumber) {
              return `${verse.arabic} (${toArabicDigits(verse.verseNumber)}) `;
            }
            return `${verse.arabic} `;
          }).join('')}

        </Text>
      ) : (
        /* Meal Tab - Separate Verses with Turkish Translation */
        verses.map((verse, index) => (
          <View key={verse.id || index}>
            {/* Arabic Text with Verse Number */}
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
              {verse.verseNumber && (
                <Text
                  style={{
                    fontFamily: arabicFontFamily,
                    fontSize: 24,
                    fontWeight: '400',
                    color: '#000000',
                    lineHeight: 45,
                    letterSpacing: 2,

                    marginRight: 8,
                  }}
                >
                  ({toArabicDigits(verse.verseNumber)})

                </Text>
              )}
              <Text
                style={{
                  fontFamily: arabicFontFamily,
                  fontSize: 24,
                  fontWeight: '400',
                  color: '#000000',
                  textAlign: 'center',
                  lineHeight: 45,
                  letterSpacing: 2,
                }}

              >
                {verse.arabic}
              </Text>
            </View>

            {/* Turkish Translation */}
            {verse.turkish && (
              <Text
                style={{
                  fontFamily,
                  fontSize: 15,
                  fontWeight: '300',
                  color: '#2A2A2A',
                  textAlign: 'center',
                  lineHeight: 22,
                  letterSpacing: 0,
                  width: '100%',
                  marginTop: 12,
                }}
              >
                {/* Besmele Kontrolü: Eğer arapça metin besmele ile başlıyorsa ve mealde yoksa ekle */}
                {verse.arabic?.includes(BISMILLAH_ARABIC) &&
                  !verse.turkish?.includes("Rahmân") &&
                  verse.surahNumber !== 1 ?
                  `${BISMILLAH_TURKISH}\n\n${verse.turkish}` :
                  verse.turkish}
              </Text>
            )}


            {/* Horizontal Separator Line after Arabic and Turkish */}
            {index < verses.length - 1 && (
              <View
                style={{
                  width: '100%',
                  height: 0.5,
                  backgroundColor: 'rgba(0, 0, 0, 0.1)',
                  marginTop: 32,
                  marginBottom: 8,

                }}
              />
            )}
          </View>
        ))
      )}
    </View>
  );
};

export default React.memo(VerseContent);
