import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const FONT_FAMILY = 'Plus Jakarta Sans';

const HutbeError = memo(({ error, onRetry }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.errorText}>
        {error || 'Bir hata oluştu'}
      </Text>
      {onRetry && (
        <TouchableOpacity onPress={onRetry} style={styles.retryButton}>
          <Text style={styles.retryButtonText}>Tekrar Dene</Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

HutbeError.displayName = 'HutbeError';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
    paddingHorizontal: 20,
  },
  errorText: {
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  retryButtonText: {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

export default HutbeError;

