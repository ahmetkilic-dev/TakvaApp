import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { hadithData } from '../../constants/hadithData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HadithCard = () => {
  const fontStyle = { fontFamily: 'Plus Jakarta Sans' };

  // Günün hadisini seç
  const currentHadith = useMemo(() => {
    const startOfYear = new Date(new Date().getFullYear(), 0, 0);
    const diff = new Date() - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Yılın gününe göre mod al
    return hadithData[dayOfYear % hadithData.length];
  }, []);

  return (
    <View style={styles.container}>
      {/* Başlık Alanı */}
      <Text style={[fontStyle, styles.mainTitle]}>Günün Hadisi</Text>
      <Text style={[fontStyle, styles.subTitle]}>
        Peygamber Efendimiz'in (s.a.v.) sözleri,{'\n'}davranışları ve onayları.
      </Text>

      {/* Hadis Kartı */}
      <View style={styles.card}>
        <Text style={[fontStyle, styles.hadithText]}>
          "{currentHadith.metin}"
        </Text>
        <Text style={[fontStyle, styles.sourceText]}>
          - {currentHadith.kaynak}
        </Text>
      </View>
    </View>
  );
};

export default React.memo(HadithCard);

const styles = StyleSheet.create({
  container: {
    marginTop: 48,
    width: '100%',
    alignItems: 'center',
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subTitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  card: {
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: '#24322E',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hadithText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 28,
    fontStyle: 'italic',
  },
  sourceText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 12,
  },
});
