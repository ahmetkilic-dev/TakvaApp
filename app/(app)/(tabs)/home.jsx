import { ScrollView, StatusBar, View, InteractionManager } from 'react-native';
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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Navigasyon animasyonu bittikten sonra ağır bileşenleri yükle
    const task = InteractionManager.runAfterInteractions(() => {
      setIsReady(true);
    });

    return () => task.cancel();
  }, []);

  return (
    <ScreenBackground>
      <StatusBar barStyle="light-content" />

      <SafeAreaView edges={['top']} className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* Ana sayfa başlık ve namaz vakitleri - ANINDA YÜKLENİR */}
          <HomeHeader />

          {/* Ağır içerikler - Deferred Loading */}
          {isReady ? (
            <>
              {/* Günlük içerik carousel */}
              <DailyCarousel />

              {/* Salavat kartı */}
              <SalavatCard />

              {/* Esmaü'l-Hüsna kartı */}
              <EsmaSlider />

              {/* Kuran kartı */}
              <QuranSection />

              {/* Hadis kartı */}
              <HadithCard />

              {/* Dini Günler kartı */}
              <ReligiousDayCard />
            </>
          ) : (
            // Placeholder: Yüklenirken boşluk bırakarak layout shift'i engellemeye çalışabiliriz
            // veya kullanıcıya "loading" hissi vermemek için boş bırakabiliriz.
            // Header zaten dolu olduğu için boş kalmasında sakınca yok.
            <View style={{ height: 1000 }} />
          )}
        </ScrollView>
      </SafeAreaView>
      <FloatingHocaButton />
    </ScreenBackground>
  );
}
