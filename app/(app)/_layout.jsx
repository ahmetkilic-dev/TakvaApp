// app/(app)/_layout.jsx
import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useSegments } from 'expo-router';
import BottomNavBar from '../../components/common/BottomNavBar';

// Bu Layout, Kullanıcının GİRİŞ YAPTIKTAN SONRA göreceği ana uygulama yapısını yönetir.
export default function AppLayout() {
  const segments = useSegments();
  const isHocaAiScreen = segments?.[1] === '(services)' && segments?.[2] === 'hoca-ai';

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Stack>
          {/* (tabs) klasöründeki tüm ekranları dahil et (Ana sekmeler: Home, Namaz, Profile vb.)
            Header'ı burada kapatıyoruz, çünkü Sekmelerin kendi içinde Header'ı olacaktır.
          */}
          <Stack.Screen 
            name="(tabs)" 
            options={{ headerShown: false }} 
          />
          
          {/* (services) klasöründeki tüm ekranları dahil et (Ek hizmetler, detay sayfaları vb.)
            Bunlar Stack içinde normal bir sayfa gibi açılacaktır.
          */}
          <Stack.Screen 
            name="(services)" 
            options={{ headerShown: false }} 
          />
          
          {/* Giriş yapıldıktan sonraki diğer bağımsız ekranlar (Örn: Ayarlar, Kullanım Koşulları)
            buraya Stack.Screen olarak eklenebilir.
          */}
        </Stack>
      </View>

      {/* Tek (global) bottom bar: tabs + services boyunca aynı instance kalır */}
      {!isHocaAiScreen && <BottomNavBar />}
    </View>
  );
}