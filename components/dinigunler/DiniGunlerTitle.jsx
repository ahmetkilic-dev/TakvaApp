import { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FONT_FAMILY = 'Plus Jakarta Sans';
const TITLE_FONT_SIZE = 21;
const SUBTITLE_FONT_SIZE = 13;
const MARGIN_BOTTOM = 24;

const DiniGunlerTitle = memo(() => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bu Yılın Dini Günleri</Text>
      <Text style={styles.subtitle}>
        Mübarek günlere ve gecelere kalan süreyi buradan takip edebilirsin.
      </Text>
    </View>
  );
});

DiniGunlerTitle.displayName = 'DiniGunlerTitle';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: MARGIN_BOTTOM,
  },
  title: {
    fontFamily: FONT_FAMILY,
    fontSize: TITLE_FONT_SIZE,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: FONT_FAMILY,
    fontSize: SUBTITLE_FONT_SIZE,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
});

export default DiniGunlerTitle;

