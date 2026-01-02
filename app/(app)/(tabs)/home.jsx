import { ScrollView, StatusBar } from 'react-native';
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

export default function HomeScreen() {
  const [phase, setPhase] = useState(0); // 0: header, 1: critical, 2: rest

  useEffect(() => {
    // Progressive rendering for instant feel
    setPhase(1); // Critical content immediately
    const timer = setTimeout(() => setPhase(2), 100); // Rest after 100ms
    return () => clearTimeout(timer);
  }, []);

  return (
    <ScreenBackground>
      <StatusBar barStyle="light-content" />

      <SafeAreaView edges={['top']} className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          removeClippedSubviews={true}
          maxToRenderPerBatch={2}
          windowSize={5}
          scrollEventThrottle={16}
        >
          {/* Ana sayfa başlık ve namaz vakitleri - INSTANT */}
          <HomeHeader />

          {/* Critical content - Immediate */}
          {phase >= 1 && (
            <>
              <DailyCarousel />
              <SalavatCard />
            </>
          )}

          {/* Rest of content - 100ms delay */}
          {phase >= 2 && (
            <>
              <EsmaSlider />
              <QuranSection />
              <HadithCard />
              <ReligiousDayCard />
            </>
          )}
        </ScrollView>
      </SafeAreaView>
      <FloatingHocaButton />
    </ScreenBackground>
  );
}
