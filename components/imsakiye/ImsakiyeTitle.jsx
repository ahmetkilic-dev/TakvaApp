import { View, Text, StyleSheet } from 'react-native';

const fontFamily = 'Plus Jakarta Sans';

const TITLE_FONT_SIZE = 16;
const TITLE_FONT_WEIGHT = '700';
const TITLE_MARGIN_BOTTOM = 8;

const SUBTITLE_FONT_SIZE = 10;
const SUBTITLE_FONT_WEIGHT = '400';
const SUBTITLE_COLOR = 'rgba(255, 255, 255, 0.6)';
const SUBTITLE_LINE_HEIGHT = 14;

const CONTAINER_MARGIN_BOTTOM = 16;

export default function ImsakiyeTitle() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Bu Ayın Vakitleri
      </Text>
      <Text style={styles.subtitle}>
        Bu ayın imsak, iftar ve namaz vakitlerini günlük olarak{'\n'}buradan takip edebilirsin.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: CONTAINER_MARGIN_BOTTOM,
    alignItems: 'center',
  },
  title: {
    fontFamily,
    fontSize: TITLE_FONT_SIZE,
    fontWeight: TITLE_FONT_WEIGHT,
    color: '#FFFFFF',
    marginBottom: TITLE_MARGIN_BOTTOM,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily,
    fontSize: SUBTITLE_FONT_SIZE,
    fontWeight: SUBTITLE_FONT_WEIGHT,
    color: SUBTITLE_COLOR,
    lineHeight: SUBTITLE_LINE_HEIGHT,
    textAlign: 'center',
  },
});

