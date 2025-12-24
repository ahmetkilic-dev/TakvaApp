import React from 'react';
import { Image, Platform, Pressable, StyleSheet, View } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const HOCA_ICON = require('../../assets/images/Hoca.png');

// `app/(app)/(tabs)/_layout.jsx` ile uyumlu
const TAB_BAR_HEIGHT = 50 + (Platform.OS === 'ios' ? 30 : 0);

export default function FloatingHocaButton() {
  const router = useRouter();
  const segments = useSegments();

  // Sadece Home ekranında göster: /(app)/(tabs)/home
  const isHomeScreen = segments?.[0] === '(app)' && segments?.[1] === '(tabs)' && segments?.[2] === 'home';
  if (!isHomeScreen) return null;

  // Tab bar olmayan ekranlarda da, tab bar varmış gibi aynı konumda kalsın
  const bottom = TAB_BAR_HEIGHT + 5;

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <Pressable
        onPress={() => router.push('/(app)/(services)/hoca-ai')}
        style={[styles.button, { right: 5, bottom }]}
        hitSlop={10}
      >
        <Image source={HOCA_ICON} style={styles.image} resizeMode="contain" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    // küçük bir gölge (production-safe)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  image: {
    width: 60,
    height: 60,
  },
});


