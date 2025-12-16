import { View, ScrollView, ImageBackground, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Sadece Header'ı çağırıyoruz
import HomeHeader from '../../../components/home/HomeHeader';

// Arka Plan Görseli (Mandala desenli olan)
import homeBg from '../../../assets/images/home-bg.png';

export default function HomeScreen() {
  return (
    <ImageBackground source={homeBg} className="flex-1" resizeMode="cover">
      <StatusBar barStyle="light-content" />
      
      <SafeAreaView edges={['top']} className="flex-1">
        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          {/* Sadece Header Bileşeni */}
          <HomeHeader />

        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
}