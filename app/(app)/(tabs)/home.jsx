import { ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Bileşenler
import ScreenBackground from '../../../components/common/ScreenBackground';
import HomeHeader from '../../../components/home/HomeHeader';
import DailyCarousel from '../../../components/home/DailyCarousel';
import SalavatCard from '../../../components/home/SalavatCard';
import EsmaSlider from '../../../components/home/EsmaSlider';
import QuranSection from '../../../components/home/QuranSection';
import HadithCard from '../../../components/home/HadithCard';
import ReligiousDayCard from '../../../components/home/ReligiousDayCard';

export default function HomeScreen() {
  return (
    <ScreenBackground>
      <StatusBar barStyle="light-content" />

      <SafeAreaView edges={['top']} className="flex-1">
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
        >
          {/* Ana sayfa başlık ve namaz vakitleri */}
          <HomeHeader />

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
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}
