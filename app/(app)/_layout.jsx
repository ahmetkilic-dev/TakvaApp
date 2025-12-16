// app/(app)/_layout.jsx
import { Stack } from 'expo-router';

// Bu Layout, Kullanıcının GİRİŞ YAPTIKTAN SONRA göreceği ana uygulama yapısını yönetir.
export default function AppLayout() {
  return (
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
  );
}