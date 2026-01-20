import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Symbol from '../../assets/images/symbol.png';

function ScreenBackground({ children }) {
  return (
    <View style={styles.container}>
      {/* Gradient Overlay (z-index 1) */}
      <LinearGradient
        colors={[
          'rgba(0, 0, 0, 0.56)',   // 0% - Dark (Top)
          'rgba(0, 0, 0, 0.48)',   // 25%
          'rgba(0, 0, 0, 0.24)',   // 50%
          'rgba(0, 0, 0, 0.12)',   // 75%
          'rgba(0, 0, 0, 0)'       // 100% - Transparent
        ]}
        locations={[0, 0.25, 0.50, 0.75, 1]}
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
    backgroundColor: '#182723',
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
