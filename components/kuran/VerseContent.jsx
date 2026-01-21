import { View, Text, ScrollView, FlatList } from 'react-native';
import { Dimensions } from 'react-native';
import React, { useCallback, useMemo } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const horizontalPadding = Math.max(20, SCREEN_WIDTH * 0.05);
const fontFamily = 'PlusJakartaSans-Light';
const arabicFontFamily = 'ScheherazadeNew-Regular';

import { SURAH_INFO } from './hooks/useQuran';

const SurahHeader = ({ surahNumber, surahName }) => {
  if (!surahName) return null;

  // Tevbe (9) haricinde Besmele göster
  const showBismillah = surahNumber !== 9;

  return (
    <View style={{ alignItems: 'center', marginBottom: 24, marginTop: 16, width: '100%' }}>
      {/* Surah Name - Centered */}
      <View style={{
        marginBottom: 16, // Space between name and bismillah
        paddingHorizontal: 30,
        paddingVertical: 10,
        borderWidth: 1,
        borderColor: '#5CAB7D',
        borderRadius: 8,
        backgroundColor: 'rgba(92, 171, 125, 0.05)',
        minWidth: 200,
        alignItems: 'center'
      }}>
        <Text style={{ fontFamily: fontFamily, fontSize: 18, fontWeight: '600', color: '#2A2A2A' }}>
          {surahName} Sûresi
        </Text>
      </View>

      {/* Bismillah - Centered below name */}
      {showBismillah && (
        <Text style={{
          fontFamily: arabicFontFamily,
          fontSize: 32, // Slightly larger for better calligraphy visibility
          color: '#000',
          textAlign: 'center',
          marginBottom: 8
        }}>
          {BISMILLAH_ARABIC}
        </Text>
      )}
    </View>
  );
};



// Better looking simple marker
const SimpleSurahMarker = () => (
  <View style={{ alignItems: 'center', justifyContent: 'center', paddingVertical: 30, width: '100%' }}>
    <View style={{ flexDirection: 'row', alignItems: 'center', opacity: 0.6 }}>
      <View style={{ flex: 1, height: 1, backgroundColor: '#8E8B82', maxWidth: 100 }} />
      <View style={{ marginHorizontal: 15, transform: [{ rotate: '45deg' }] }}>
        <View style={{ width: 8, height: 8, backgroundColor: '#8E8B82' }} />
      </View>
      <View style={{ flex: 1, height: 1, backgroundColor: '#8E8B82', maxWidth: 100 }} />
    </View>
  </View>
);

const toArabicDigits = (num) => {
  const arabicDigits = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
  return num.toString().split('').map(digit => arabicDigits[parseInt(digit)] || digit).join('');
};

const BISMILLAH_ARABIC = "بِسْمِ ٱللَّهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ";
const BISMILLAH_TURKISH = "Rahmân ve Rahîm olan Allah'ın adıyla.";

// Tek bir ayeti render eden component (Meal modu için)
const MealVerseItem = React.memo(({ verse, index, total, isSurahEnd }) => {
  return (
    <View style={{
      marginBottom: 0,
      backgroundColor: '#EDEBD0', // Ayet için sayfa rengi
      paddingHorizontal: horizontalPadding,
      paddingVertical: 16, // Ayetler arası biraz boşluk
      borderTopLeftRadius: index === 0 ? 20 : 0,
      borderTopRightRadius: index === 0 ? 20 : 0,
    }}>
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
          {/* Besmele Kontrolü */}
          {verse.arabic?.includes(BISMILLAH_ARABIC) &&
            !verse.turkish?.includes("Rahmân") &&
            verse.surahNumber !== 1 ?
            `${BISMILLAH_TURKISH}\n\n${verse.turkish}` :
            verse.turkish}
        </Text>
      )}

      {/* Separator - Son ayet hariç (Eğer sure sonu değilse) */}
      {index < total - 1 && !isSurahEnd && (
        <View
          style={{
            width: '100%',
            height: 0.5,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            marginTop: 32,
            marginBottom: 32, // Margin arttırıldı ferahlık için
          }}
        />
      )}

      {/* Sure Sonu İşareti */}
      {isSurahEnd && <SimpleSurahMarker />}
    </View>
  );
});

const VerseContent = ({ verses, activeTab, loading, error, ListHeaderComponent }) => {

  const renderItem = useCallback(({ item, index }) => {
    // Check if this verse is the last one of its surah
    const surah = SURAH_INFO.find(s => s.number === item.surahNumber);
    const isSurahEnd = surah && item.verseNumber === surah.ayahCount;

    // Check for Surah Start (Verse 1)
    const isSurahStart = item.verseNumber === 1;

    // Apply Page Styling to the first item to match Kuran mode
    const wrapperStyle = index === 0 ? {
      backgroundColor: '#EDEBD0',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      paddingTop: 24, // Match Kuran mode container padding
    } : {
      backgroundColor: '#EDEBD0' // Ensure continuity for other items
    };

    return (
      <View style={wrapperStyle}>
        {isSurahStart && surah && (
          <SurahHeader surahNumber={surah.number} surahName={surah.name} />
        )}
        <MealVerseItem
          verse={item}
          index={index}
          total={verses.length}
          isSurahEnd={isSurahEnd}
        />
      </View>
    );
  }, [verses.length]);

  const keyExtractor = useCallback((item, index) => item.id ? item.id.toString() : index.toString(), []);

  // Arabic Block Mode Logic - Group by Surah
  const arabicBlocks = useMemo(() => {
    if (!verses || verses.length === 0) return [];

    const blocks = [];
    let currentBlock = { surahNumber: verses[0].surahNumber, text: '', startVerseNumber: verses[0].verseNumber };

    verses.forEach((verse, i) => {
      if (verse.surahNumber !== currentBlock.surahNumber) {
        // Push old block
        blocks.push(currentBlock);
        // Start new block
        currentBlock = { surahNumber: verse.surahNumber, text: '', startVerseNumber: verse.verseNumber };
      }

      if (verse.verseNumber) {
        currentBlock.text += `${verse.arabic} (${toArabicDigits(verse.verseNumber)}) `;
      } else {
        currentBlock.text += `${verse.arabic} `;
      }

      // If it's the last verse of the page, push the block
      if (i === verses.length - 1) {
        blocks.push(currentBlock);
      }
    });

    return blocks;
  }, [verses]);

  if (loading) {
    return (
      <View style={{ padding: 24, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontFamily }}>Yükleniyor...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ padding: 24, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontFamily, color: 'red' }}>{error}</Text>
      </View>
    );
  }

  if (!verses || verses.length === 0) return null;

  // Container Stilleri
  const containerStyle = {
    flex: 1,
    // backgroundColor: '#EDEBD0', // KALDIRILDI: Header'ın arkasını boyuyordu
  };

  const contentContainerStyle = {
    flexGrow: 1, // İçerik az olsa bile container'ın uzamasını sağlar
    // paddingBottom'ı kaldırdık, içerideki view'lara vereceğiz
  };

  // 'Kur'an' Modu: Blok Metin (ScrollView)
  if (activeTab === 'Kur\'an') {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={containerStyle}
        contentContainerStyle={contentContainerStyle}
      >
        {ListHeaderComponent}
        <View style={{
          flex: 1, // ScrollView flexGrow: 1 olduğu için bu da kalan alanı doldurur
          backgroundColor: '#EDEBD0',
          paddingHorizontal: horizontalPadding,
          paddingVertical: 24,
          paddingBottom: 100, // Alt boşluk buraya taşındı ve arttırıldı
          minHeight: Dimensions.get('window').height * 0.7, // Sayfa boş görünmesin diye
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
          {arabicBlocks.map((block, index) => {
            const surah = SURAH_INFO.find(s => s.number === block.surahNumber);
            // Check if the block ends with the actual end of the surah
            const lastVerseOfBlock = verses.filter(v => v.surahNumber === block.surahNumber).pop();
            const isSurahEnd = surah && lastVerseOfBlock && lastVerseOfBlock.verseNumber === surah.ayahCount;

            return (
              <View key={index}>
                {/* Surah Header for Block Mode */}
                {surah && block.startVerseNumber === 1 && (
                  <SurahHeader surahNumber={surah.number} surahName={surah.name} />
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
                    writingDirection: 'rtl'
                  }}
                >
                  {block.text}
                </Text>
                {isSurahEnd && <SimpleSurahMarker />}
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }

  // 'Meal' Modu: Liste (FlatList)
  return (
    <FlatList
      data={verses}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={containerStyle}
      contentContainerStyle={contentContainerStyle}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={() => (
        <View style={{ flex: 1, backgroundColor: '#EDEBD0', paddingBottom: 100 }} />
      )}
      showsVerticalScrollIndicator={false}
      initialNumToRender={4}
      maxToRenderPerBatch={5}
      windowSize={5}
      removeClippedSubviews={true}
    />
  );
};

export default React.memo(VerseContent);
