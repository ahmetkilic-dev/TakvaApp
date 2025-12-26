import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { formatPrayerDate } from './utils/dateHelpers';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

const HORIZONTAL_PADDING = 20;
const CONTENT_WIDTH = SCREEN_WIDTH - (HORIZONTAL_PADDING * 2);

const CARD_MIN_HEIGHT = 95;
const CARD_BORDER_RADIUS = 10;
const CARD_BORDER_WIDTH = 0.5;
const CARD_PADDING_HORIZONTAL = 11;
const CARD_PADDING_VERTICAL = 10;
const CARD_GAP = 12;

const DATE_FONT_SIZE = 14;
const DATE_FONT_WEIGHT = '300';
const DATE_MARGIN_BOTTOM = 8;

const SEPARATOR_HEIGHT = 0.5;
const SEPARATOR_MARGIN_BOTTOM = 8;
const SEPARATOR_COLOR = 'rgba(217, 217, 217, 0.5)';

const PRAYER_NAME_FONT_SIZE = 14;
const PRAYER_NAME_FONT_WEIGHT = '300';
const PRAYER_NAME_MARGIN_BOTTOM = 4;

const PRAYER_TIME_FONT_SIZE = 16;
const PRAYER_TIME_FONT_WEIGHT = '700';

const PRAYER_NAMES = ['İmsak', 'Güneş', 'Öğle', 'İkindi', 'Akşam', 'Yatsı'];

export default function PrayerTimeCard({ item }) {
  return (
    <View style={styles.card}>
      {/* Date */}
      <Text style={styles.dateText}>
        {formatPrayerDate(item.date)}
      </Text>

      {/* Separator Line */}
      <View style={styles.separator} />

      {/* Prayer Names Row */}
      <View style={styles.prayerNamesRow}>
        {PRAYER_NAMES.map((name) => (
          <Text key={name} style={styles.prayerNameText}>
            {name}
          </Text>
        ))}
      </View>

      {/* Prayer Times Row */}
      <View style={styles.prayerTimesRow}>
        <Text style={styles.prayerTimeText}>
          {item.times.imsak}
        </Text>
        <Text style={styles.prayerTimeText}>
          {item.times.gunes}
        </Text>
        <Text style={styles.prayerTimeText}>
          {item.times.ogle}
        </Text>
        <Text style={styles.prayerTimeText}>
          {item.times.ikindi}
        </Text>
        <Text style={styles.prayerTimeText}>
          {item.times.aksam}
        </Text>
        <Text style={styles.prayerTimeText}>
          {item.times.yatsi}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: CONTENT_WIDTH,
    minHeight: CARD_MIN_HEIGHT,
    borderRadius: CARD_BORDER_RADIUS,
    borderWidth: CARD_BORDER_WIDTH,
    borderColor: 'rgba(255, 255, 255, 0.75)',
    backgroundColor: 'rgba(24, 39, 35, 0.5)',
    paddingHorizontal: CARD_PADDING_HORIZONTAL,
    paddingVertical: CARD_PADDING_VERTICAL,
  },
  dateText: {
    fontFamily,
    fontSize: DATE_FONT_SIZE,
    fontWeight: DATE_FONT_WEIGHT,
    color: '#FFFFFF',
    marginBottom: DATE_MARGIN_BOTTOM,
  },
  separator: {
    width: '100%',
    height: SEPARATOR_HEIGHT,
    backgroundColor: SEPARATOR_COLOR,
    marginBottom: SEPARATOR_MARGIN_BOTTOM,
  },
  prayerNamesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: PRAYER_NAME_MARGIN_BOTTOM,
  },
  prayerNameText: {
    fontFamily,
    fontSize: PRAYER_NAME_FONT_SIZE,
    fontWeight: PRAYER_NAME_FONT_WEIGHT,
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
  },
  prayerTimesRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  prayerTimeText: {
    fontFamily,
    fontSize: PRAYER_TIME_FONT_SIZE,
    fontWeight: PRAYER_TIME_FONT_WEIGHT,
    color: '#FFFFFF',
    textAlign: 'center',
    flex: 1,
  },
});

