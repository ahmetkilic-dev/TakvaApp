import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function AuthLayout() {
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