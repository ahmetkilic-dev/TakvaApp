import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Symbol from '../../assets/images/symbol.png';

function ScreenBackground({ children }) {
  return (
    <View style={styles.container}>
      {/* Main Background Gradient (z-index 1) */}
      <LinearGradient
        colors={['#0C1311', '#162421']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
      />

      {/* Symbol (z-index 2) - Placed after gradient to be on top */}
      <Image
        source={Symbol}
        style={styles.symbol}
        resizeMode="contain"
      />

      {/* Content (z-index 3) */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0C1311', // Fallback color (Start color)
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    pointerEvents: 'none',
  },
  symbol: {
    position: 'absolute',
    top: 105,
    left: 45,
    width: 300,
    height: 300,
    opacity: 0.5,
    tintColor: 'rgba(211, 164, 83, 1)', // #D3A453
    zIndex: 2,
  },
  content: {
    flex: 1,
    zIndex: 3,
  },
});

export default React.memo(ScreenBackground);
