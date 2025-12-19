import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function HadithCard() {
  const fontStyle = { fontFamily: 'Plus Jakarta Sans' };

  return (
    <View style={styles.container}>
      {/* Başlık Alanı */}
      <Text style={[fontStyle, styles.mainTitle]}>Hadis</Text>
      <Text style={[fontStyle, styles.subTitle]}>
        Peygamber Efendimiz'in (s.a.v.) sözleri,{'\n'}davranışları ve onayları.
      </Text>

      {/* Hadis Kartı */}
      <View style={styles.card}>
        <Text style={[fontStyle, styles.hadithText]}>
          Ameller ancak niyetlere göredir.
        </Text>
      </View>
    </View>
  );
}

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
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hadithText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 26,
  },
});
