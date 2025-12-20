// app/_layout.jsx
import "../global.css";
import { Slot, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig'; 
import { View, ActivityIndicator } from 'react-native';
import { useFonts, Cinzel_900Black } from '@expo-google-fonts/cinzel';
import * as SplashScreen from 'expo-splash-screen';

// Splash screen'i açık tut
SplashScreen.preventAutoHideAsync();

// İlk başta loading durumunu kontrol etmek için ayrı bir component
const InitialLoader = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#15221E' }}>
    <ActivityIndicator size="large" color="#ffffff" />
  </View>
);

// Ana Yetkilendirme Durumu Yöneticisi
function AuthGuard() {
  const [user, setUser] = useState(undefined); 
  const segments = useSegments();
  const router = useRouter();
  
  // Firebase durumunu dinle
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); 
    });
    return unsubscribe;
  }, []);

  // Yönlendirme mantığı
  useEffect(() => {
    if (user === undefined) return; 
    
    // Auth ekranları (login, register), Welcome ekranı ve (app) ekranları
    const inAuthFlow = segments[0] === '(auth)' || segments[0] === ''; // '' index.jsx demek

    if (user && inAuthFlow) {
      // 1. Durum: Kullanıcı GİRİŞ YAPTIYSA ve Auth/Welcome görüyorsa
      // -> Login/Welcome'ı atla, App'e (Home) yönlendir.
      router.replace('/(app)/(tabs)/home'); 
    } else if (!user && segments[0] === '(app)') {
      // 2. Durum: Kullanıcı GİRİŞ YAPMADIYSA ve App Layout'a girmeye çalışıyorsa
      // -> Geri Login'e yönlendir.
      router.replace('/(auth)/login');
    }
  }, [user, segments]);

  // Yüklenme anında
  if (user === undefined) {
    return <InitialLoader />;
  }

  return <Slot />;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Cinzel-Black': Cinzel_900Black,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return <InitialLoader />;
  }

  return (
    <>
      <AuthGuard /> 
      <StatusBar style="light" />
    </>
  );
}
