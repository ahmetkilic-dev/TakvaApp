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
    height: 130,
    alignSelf: 'center',
    backgroundColor: '#24322E',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 13,
    marginBottom: 14,
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
    padding: 13,
    marginBottom: 14,
  },
  imageContainerLeft: {
    width: 160,
    height: 100,
    marginRight: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainerRight: {
    width: 160,
    height: 100,
    marginLeft: 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
  guideImageAbdest: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  guideImageNamaz: {
    width: '100%',
    height: '100%',
  },
  guideContentRight: {
    flex: 1,
    justifyContent: 'center',
  },
  guideContentLeft: {
    flex: 1,
    justifyContent: 'center',
  },
  guideTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 6,
  },
  guideDescription: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 10,
  },
  twoLineDescription: {
    // 2 satırın tam sığması için (lineHeight * 2)
    minHeight: 32,
  },
  guideButton: {
    backgroundColor: 'transparent',
    borderWidth: 0.5,
    borderColor: 'rgba(255, 186, 74, 0.5)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: 'flex-start',
  },
  guideButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
});

