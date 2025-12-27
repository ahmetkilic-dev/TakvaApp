import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const IlimProgressBar = memo(({ progress = 0 }) => {
  // Progress 0-100 arası olmalı
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <View style={styles.container}>
      <View style={styles.progressBarBackground}>
        <LinearGradient
          colors={['#518375', '#094736']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progressBarFill, { width: `${clampedProgress}%` }]}
        />
      </View>
    </View>
  );
});

IlimProgressBar.displayName = 'IlimProgressBar';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  progressBarBackground: {
    width: '100%',
    height: 16,
    borderRadius: 10,
    backgroundColor: '#D1D1D1',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 10,
  },
});

export default IlimProgressBar;

