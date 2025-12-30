import { View, Text, ScrollView } from 'react-native';
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const horizontalPadding = Math.max(20, SCREEN_WIDTH * 0.05);
const fontFamily = 'PlusJakartaSans-Light';
const arabicFontFamily = 'Noto Sans Arabic';

export default function VerseContent({ verses, activeTab, loading, error }) {
  if (loading) {
    return (
      <View
        style={{
          paddingHorizontal: horizontalPadding,
          paddingVertical: 24,
          borderRadius: 20,
          backgroundColor: 'rgba(24, 39, 35, 0.8)',
          marginHorizontal: horizontalPadding,
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
            color: '#FFFFFF',
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
          borderRadius: 20,
          backgroundColor: 'rgba(24, 39, 35, 0.8)',
          marginHorizontal: horizontalPadding,
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
            if (verse.verseNumber) {
              return `${verse.arabic} (${verse.verseNumber}) `;
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
                    fontSize: 15,
                    fontWeight: '300',
                    color: '#FFBA4A',
                    lineHeight: 37,
                    letterSpacing: 2,
                    marginRight: 8,
                  }}
                >
                  ({verse.verseNumber})
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
            {verse.turkish && (
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
            )}

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
  );
}

