import { Stack } from 'expo-router';
import { View } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import Constants from 'expo-constants';

export default function AuthLayout() {
  const router = useRouter();

  // --- EXPO GO KONTROLÜ - Tüm auth kısmını atla ---
  useEffect(() => {
    if (Constants.appOwnership === 'expo') {
      console.log('Expo Go detected - skipping auth section');
      router.replace('/(app)/(tabs)/home');
    }
  }, [router]);

  // Eğer Expo Go'daysak, hiçbir şey render etme
  if (Constants.appOwnership === 'expo') {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        // BU SATIR BAŞLIKLARI GİZLER
        headerShown: false,

        // Sayfa geçiş animasyonu (İsteğe bağlı)
        animation: 'fade',

        // Arka plan rengini şeffaf yapar
        contentStyle: { backgroundColor: 'transparent' },
      }}
    >
      <Stack.Screen name="register" />
      <Stack.Screen name="login" />
      <Stack.Screen name="create-account" />
      <Stack.Screen name="creator-register" />
    </Stack>
  );
}