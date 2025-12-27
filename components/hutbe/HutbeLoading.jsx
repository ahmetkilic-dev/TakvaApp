import React, { memo } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const HutbeLoading = memo(() => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FFFFFF" />
    </View>
  );
});

HutbeLoading.displayName = 'HutbeLoading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 48,
  },
});

export default HutbeLoading;

