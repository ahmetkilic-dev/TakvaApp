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
import { ScheherazadeNew_400Regular } from '@expo-google-fonts/scheherazade-new';
import * as SplashScreen from 'expo-splash-screen';

import { LocationProvider } from '../contexts/LocationContext';
import { PrayerTimesProvider } from '../contexts/PrayerTimesContext';
import { DayChangeProvider } from '../contexts/DayChangeContext';
import { UserStatsProvider } from '../contexts/UserStatsContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import * as ScreenOrientation from 'expo-screen-orientation';


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
    'ScheherazadeNew-Regular': ScheherazadeNew_400Regular,
  });


  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      const setNavBar = async () => {
        try {
          await NavigationBar.setBackgroundColorAsync("#00000000"); // Fully transparent
          await NavigationBar.setButtonStyleAsync("light");
          await NavigationBar.setVisibilityAsync("hidden");
          await NavigationBar.setBehaviorAsync("overlay-swipe");
        } catch (e) {
          console.log('NavBar error:', e);
        }
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

  useEffect(() => {
    async function lockOrientation() {
      await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    }
    lockOrientation();
  }, []);


  if (!fontsLoaded) {
    return <InitialLoader />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <LocationProvider>
        <PrayerTimesProvider>
          <DayChangeProvider>
            <UserStatsProvider>
              <AuthGuard />
              <StatusBar style="light" />
            </UserStatsProvider>
          </DayChangeProvider>
        </PrayerTimesProvider>
      </LocationProvider>
    </GestureHandlerRootView>
  );
}