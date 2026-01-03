import { View, Text, ScrollView, FlatList } from 'react-native';
import { Dimensions } from 'react-native';
import React, { useCallback, useMemo } from 'react';

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

// Tek bir ayeti render eden component (Meal modu için)
const MealVerseItem = React.memo(({ verse, index, total }) => {
  return (
    <View style={{
      marginBottom: 0,
      backgroundColor: '#EDEBD0', // Ayet için sayfa rengi
      paddingHorizontal: horizontalPadding,
      paddingVertical: 16, // Ayetler arası biraz boşluk
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

      {/* Separator - Son ayet hariç */}
      {index < total - 1 && (
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
    </View>
  );
});

const VerseContent = ({ verses, activeTab, loading, error, ListHeaderComponent }) => {

  const renderItem = useCallback(({ item, index }) => (
    <MealVerseItem
      verse={item}
      index={index}
      total={verses.length}
    />
  ), [verses.length]);

  const keyExtractor = useCallback((item, index) => item.id ? item.id.toString() : index.toString(), []);

  // Full Arabic Text (Block Mode)
  const fullArabicText = useMemo(() => {
    if (!verses) return "";
    return verses.map((verse) => {
      if (verse.verseNumber) {
        return `${verse.arabic} (${toArabicDigits(verse.verseNumber)}) `;
      }
      return `${verse.arabic} `;
    }).join('');
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
    paddingBottom: 40,
    // paddingHorizontal ve vertical'ı buradan kaldırdık, item'lara taşıyacağız
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
          backgroundColor: '#EDEBD0',
          paddingHorizontal: horizontalPadding,
          paddingVertical: 24,
          minHeight: Dimensions.get('window').height * 0.7 // Sayfa boş görünmesin diye
        }}>
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
            {fullArabicText}
          </Text>
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
      showsVerticalScrollIndicator={false}
      initialNumToRender={4}
      maxToRenderPerBatch={5}
      windowSize={5}
      removeClippedSubviews={true}
    // Liste elemanları arasına veya arkasına renk vermek yerine 
    // her item kendi arkaplanına sahip olacak
    />
  );
};

export default React.memo(VerseContent);
