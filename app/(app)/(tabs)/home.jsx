import { ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';

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

  // Render all content top-down for stability
  // Phase state kept simple to ensure immediate render


  return (
    <ScreenBackground>
      <StatusBar barStyle="light-content" />

      <SafeAreaView edges={['top']} className="flex-1">
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          removeClippedSubviews={false}
          scrollEventThrottle={16}
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
