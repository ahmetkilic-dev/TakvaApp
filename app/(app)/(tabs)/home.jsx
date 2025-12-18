import { View, ScrollView, ImageBackground, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Bileşenler
import HomeHeader from '../../../components/home/HomeHeader';
import DailyCarousel from '../../../components/home/DailyCarousel';
import SalavatCard from '../../../components/home/SalavatCard';

// Arka plan görseli
import homeBg from '../../../assets/images/home-bg.png';

export default function HomeScreen() {
  return (
    <View className="flex-1">
      <ImageBackground source={homeBg} className="flex-1" resizeMode="cover">
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
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}