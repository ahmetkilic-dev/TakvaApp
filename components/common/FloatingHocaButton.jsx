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

  const inApp = segments?.[0] === '(app)';
  if (!inApp) return null; // (auth) ve root (index) ekranlarında görünmesin

  // HocaAI ekranında bu ikon görünmesin
  const isHocaAiScreen =
    segments?.includes('hoca-ai') || segments?.[2] === 'hoca-ai' || segments?.[3] === 'hoca-ai';
  if (isHocaAiScreen) return null;

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
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: '#FFBA4A', // fill
    borderWidth: 2, // stroke
    borderColor: '#FFBA4A', // %100 stroke
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


