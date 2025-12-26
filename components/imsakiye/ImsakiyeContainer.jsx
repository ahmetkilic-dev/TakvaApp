import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImsakiyeHeader from './ImsakiyeHeader';
import ImsakiyeTitle from './ImsakiyeTitle';
import PrayerTimesList from './PrayerTimesList';
import ImsakiyeLoading from './ImsakiyeLoading';
import ImsakiyeError from './ImsakiyeError';
import { usePrayerTimes } from './hooks/usePrayerTimes';

const fontFamily = 'Plus Jakarta Sans';
const HORIZONTAL_PADDING = 20;
const SCROLL_PADDING_TOP = 24;
const SCROLL_PADDING_BOTTOM = 0;

const EMPTY_TEXT_FONT_SIZE = 14;
const EMPTY_MARGIN_TOP = 32;

export default function ImsakiyeContainer() {
  const { prayerTimesList, loading, error, locationLoading } = usePrayerTimes();

  // Loading durumu
  if (locationLoading || loading) {
    return <ImsakiyeLoading />;
  }

  // Error durumu
  if (error) {
    return <ImsakiyeError error={error} />;
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1">
      <ImsakiyeHeader />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <ImsakiyeTitle />
        
        <PrayerTimesList prayerTimesList={prayerTimesList} />
        
        {prayerTimesList.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              Bu ay için namaz vakti bulunamadı
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: SCROLL_PADDING_TOP,
    paddingBottom: SCROLL_PADDING_BOTTOM,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: EMPTY_MARGIN_TOP,
  },
  emptyText: {
    fontFamily,
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: EMPTY_TEXT_FONT_SIZE,
  },
});

