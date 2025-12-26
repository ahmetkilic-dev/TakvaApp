import { View, StyleSheet } from 'react-native';
import PrayerTimeCard from './PrayerTimeCard';

const CARD_GAP = 12;

export default function PrayerTimesList({ prayerTimesList }) {
  if (prayerTimesList.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {prayerTimesList.map((item, index) => (
        <PrayerTimeCard key={index} item={item} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: CARD_GAP,
  },
});

