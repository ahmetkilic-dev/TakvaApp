import { ScrollView, StatusBar, View, ActivityIndicator } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { usePrayerTimes } from '../../../contexts/PrayerTimesContext';

// Bileşenler
import ScreenBackground from '../../../components/common/ScreenBackground';
import HomeHeader from '../../../components/home/HomeHeader';
import DailyCarousel from '../../../components/home/DailyCarousel';
import SalavatCard from '../../../components/home/SalavatCard';
import EsmaSlider from '../../../components/home/EsmaSlider';
import QuranSection from '../../../components/home/QuranSection';
import HadithCard from '../../../components/home/HadithCard';
import ReligiousDayCard from '../../../components/home/ReligiousDayCard';
import FloatingHocaButton from '../../../components/common/FloatingHocaButton';
import AdBanner from '../../../components/ads/AdBanner'; // Reklam Bileşeni
import { useScrollJumpFix } from '../../../utils/scrollOptimization';

export default function HomeScreen() {
  const scrollViewRef = useScrollJumpFix();
  const [phase, setPhase] = useState(2); // Start with all content for smooth top-down
  const { refreshPrayerTimes } = usePrayerTimes();
  const [refreshing, setRefreshing] = useState(false);
  const insets = useSafeAreaInsets();

  const handleRefresh = async () => {
    setRefreshing(true);
    // Haptic feedback (optional) or just wait
    // Wait slightly to show the spinner
    try {
      await Promise.all([
        refreshPrayerTimes(),
        new Promise(resolve => setTimeout(resolve, 800)) // Minimum delay to show spinner
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  };

  const handleScrollEndDrag = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    // Trigger refresh if pulled down significantly
    if (offsetY < -80 && !refreshing) {
      handleRefresh();
    }
  };

  return (
    <ScreenBackground>
      <StatusBar barStyle="light-content" />

      {/* Custom Refresh Spinner Overlay */}
      {refreshing && (
        <View style={{
          position: 'absolute',
          top: insets.top + 10,
          left: 0,
          right: 0,
          zIndex: 100,
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
        }}>
          <ActivityIndicator size="small" color="#D4AF37" />
        </View>
      )}

      <SafeAreaView edges={['top']} className="flex-1">
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          removeClippedSubviews={false}
          scrollEventThrottle={16}
          onScrollEndDrag={handleScrollEndDrag}
        >
          {/* Ana sayfa başlık ve namaz vakitleri - INSTANT */}
          <HomeHeader />

          {/* Phase 1: Critical Content */}
          <DailyCarousel />
          <SalavatCard />

          {/* Phase 2: Secondary Content (Rendered immediately but after critical) */}
          <EsmaSlider />
          <QuranSection />
          <HadithCard />
          <ReligiousDayCard />
        </ScrollView>
      </SafeAreaView>
      <View style={{ marginBottom: 0 }}>
        <AdBanner />
      </View>
      <FloatingHocaButton />
    </ScreenBackground>
  );
}
