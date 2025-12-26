import { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const FONT_FAMILY = 'Plus Jakarta Sans';

const DiniGunlerEmpty = memo(() => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="calendar-outline" size={48} color="rgba(255, 255, 255, 0.4)" />
      </View>
      <Text style={styles.title}>Dini Gün Bulunamadı</Text>
      <Text style={styles.message}>
        Önümüzdeki bir yıl içinde gösterilecek dini gün bulunamadı.
      </Text>
    </View>
  );
});

DiniGunlerEmpty.displayName = 'DiniGunlerEmpty';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontFamily: FONT_FAMILY,
    fontSize: 18,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.4)',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default DiniGunlerEmpty;

