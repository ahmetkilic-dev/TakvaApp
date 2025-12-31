import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';

// Görseller
import AbdestImg from '../../assets/images/abdest.png';
import NamazImg from '../../assets/images/namaz.png';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function LearningGuides({ onAbdestPress, onNamazPress }) {
  const fontStyle = { fontFamily: 'Plus Jakarta Sans' };

  return (
    <View style={styles.container}>
      <Text style={[fontStyle, styles.sectionTitle]}>Öğrenme Rehberleri</Text>

      {/* Abdest Rehberi Kartı */}
      <View style={styles.guideCardAbdest}>
        <View style={styles.imageContainerLeft}>
          <Image source={AbdestImg} style={styles.guideImageAbdest} resizeMode="cover" />
        </View>
        <View style={styles.guideContentRight}>
          <Text style={[fontStyle, styles.guideTitle]}>Abdest Alma Rehberi</Text>
          <Text style={[fontStyle, styles.guideDescription]}>
            Abdesti doğru şekilde ve sırasıyla birlikte öğrenin.
          </Text>
          <TouchableOpacity style={styles.guideButton} onPress={onAbdestPress}>
            <Text style={[fontStyle, styles.guideButtonText]}>Abdesti Öğren</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Namaz Rehberi Kartı */}
      <View style={styles.guideCardNamaz}>
        <View style={styles.guideContentLeft}>
          <Text style={[fontStyle, styles.guideTitle]}>Namaz Kılma Rehberi</Text>
          <Text
            style={[fontStyle, styles.guideDescription, styles.twoLineDescription]}
            numberOfLines={2}
            adjustsFontSizeToFit
            minimumFontScale={0.95}
          >
            Namazın hareketlerini ve dualarını adım adım öğrenin.
          </Text>
          <TouchableOpacity style={styles.guideButton} onPress={onNamazPress}>
            <Text style={[fontStyle, styles.guideButtonText]}>Namazı Öğren</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageContainerRight}>
          <Image source={NamazImg} style={styles.guideImageNamaz} resizeMode="cover" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  guideCardAbdest: {
    width: SCREEN_WIDTH * 0.9,
    height: 130, // Kart yüksekliğini sabit tutabiliriz veya 'auto' + minHeight verebiliriz, ama kullanıcı iPhone 11 yapısını sevdiği için 130 iyi bir referans.
    alignSelf: 'center',
    backgroundColor: '#24322E',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10, // Padding'i biraz kıstım, içeriğe yer kalsın
    marginBottom: 14,
    overflow: 'hidden', // Resimlerin radius taşmasını önlemek için
  },
  guideCardNamaz: {
    width: SCREEN_WIDTH * 0.9,
    height: 130,
    alignSelf: 'center',
    backgroundColor: '#24322E',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 14,
    overflow: 'hidden',
  },
  imageContainerLeft: {
    width: '43%', // iPhone 11'deki approx oran (160/375 ~ 0.43)
    height: '100%',
    marginRight: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  imageContainerRight: {
    width: '43%',
    height: '100%',
    marginLeft: 10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  guideImageAbdest: {
    width: '100%',
    height: '100%',
  },
  guideImageNamaz: {
    width: '100%',
    height: '100%',
  },
  guideContentRight: {
    flex: 1, // Kalan alanı doldur
    justifyContent: 'center',
    paddingVertical: 4,
  },
  guideContentLeft: {
    flex: 1, // Kalan alanı doldur
    justifyContent: 'center',
    paddingVertical: 4,
  },
  guideTitle: {
    color: '#FFFFFF',
    fontSize: 16, // Font boyutunu sabit tutuyorum, çok küçük ekranlar hariç okunur
    fontWeight: '700',
    marginBottom: 4,
  },
  guideDescription: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12, // Küçük ve okunabilir
    lineHeight: 16,
    marginBottom: 8,
    flexShrink: 1, // Yazı taşarsa sığmaya çalış
  },
  twoLineDescription: {
    // Esnek yükseklik
  },
  guideButton: {
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 186, 74, 0.5)',
    borderRadius: 20,
    paddingVertical: 6, // Buton görselden taşmasın diye biraz daha kompakt
    paddingHorizontal: 16, // Genişliği koru
    alignSelf: 'flex-start',
  },
  guideButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

