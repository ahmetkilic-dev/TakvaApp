import "../global.css";
import { Slot, useRouter, useSegments } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { View, ActivityIndicator, Platform, AppState } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';
import { useFonts, Cinzel_900Black } from '@expo-google-fonts/cinzel';
import {
  PlusJakartaSans_300Light,
  PlusJakartaSans_400Regular,
  PlusJakartaSans_700Bold
} from '@expo-google-fonts/plus-jakarta-sans';
import * as SplashScreen from 'expo-splash-screen';
import { LocationProvider } from '../contexts/LocationContext';
import { DayChangeProvider } from '../contexts/DayChangeContext';
import { UserStatsProvider } from '../contexts/UserStatsContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

SplashScreen.preventAutoHideAsync();

const InitialLoader = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#04100D' }}>
    <ActivityIndicator size="large" color="#ffffff" />
  </View>
);

function AuthGuard() {
  const [user, setUser] = useState(undefined);
  const [initialRoute, setInitialRoute] = useState(false);
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (user === undefined) return;

    const inAuthFlow = segments[0] === '(auth)' || segments[0] === '' || segments[0] === undefined || segments.length === 0;
    const inApp = segments[0] === '(app)';

    if (user && !inApp) {
      router.replace('/(app)/(tabs)/home');
      setInitialRoute(true);
    } else if (!user && inApp) {
      router.replace('/(auth)/login');
      setInitialRoute(true);
    } else {
      setInitialRoute(true);
    }
  }, [user, segments]);

  if (user === undefined || !initialRoute) {
    return <InitialLoader />;
  }

  return <Slot />;
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Cinzel-Black': Cinzel_900Black,
    'Cinzel-Bold': require('../assets/font/Cinzel-Bold.ttf'),
    'PlusJakartaSans-Light': PlusJakartaSans_300Light,
    'PlusJakartaSans-Regular': PlusJakartaSans_400Regular,
    'PlusJakartaSans-Bold': PlusJakartaSans_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      const setNavBar = async () => {
        await NavigationBar.setBackgroundColorAsync("#04100D");
        await NavigationBar.setButtonStyleAsync("light");
        // İsteğe bağlı: Tam ekran (immersive) mod için gizle
        // await NavigationBar.setVisibilityAsync("hidden"); 
        // await NavigationBar.setBehaviorAsync("overlay-swipe");
      };

      setNavBar();

      const subscription = AppState.addEventListener('change', (nextAppState) => {
        if (nextAppState === 'active') {
          setNavBar();
        }
      });

      return () => {
        subscription.remove();
      };
    }
  }, []);

  if (!fontsLoaded) {
    return <InitialLoader />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LocationProvider>
        <DayChangeProvider>
          <UserStatsProvider>
            <AuthGuard />
            <StatusBar style="light" />
          </UserStatsProvider>
        </DayChangeProvider>
      </LocationProvider>
    </GestureHandlerRootView>
  );
}