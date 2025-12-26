import { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenBackground from '../common/ScreenBackground';
import DiniGunlerHeader from './DiniGunlerHeader';

const FONT_FAMILY = 'Plus Jakarta Sans';

const DiniGunlerError = memo(({ error, onRetry }) => {
  return (
    <ScreenBackground>
      <SafeAreaView edges={['top']} style={styles.container}>
        <DiniGunlerHeader />
        
        <View style={styles.content}>
          <View style={styles.errorContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="alert-circle-outline" size={64} color="#FFBA4A" />
            </View>
            
            <Text style={styles.errorTitle}>Bir Hata Oluştu</Text>
            
            <Text style={styles.errorMessage}>
              {error || 'Dini günler yüklenirken bir sorun oluştu. Lütfen internet bağlantınızı kontrol edip tekrar deneyin.'}
            </Text>
            
            {onRetry && (
              <TouchableOpacity 
                style={styles.retryButton} 
                onPress={onRetry}
                activeOpacity={0.8}
              >
                <Ionicons name="refresh" size={20} color="#FFFFFF" />
                <Text style={styles.retryButtonText}>Tekrar Dene</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </SafeAreaView>
    </ScreenBackground>
  );
});

DiniGunlerError.displayName = 'DiniGunlerError';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  errorContainer: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(36, 50, 46, 0.3)',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    maxWidth: 320,
    width: '100%',
  },
  iconContainer: {
    marginBottom: 16,
  },
  errorTitle: {
    fontFamily: FONT_FAMILY,
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
  },
  errorMessage: {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFBA4A',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  retryButtonText: {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default DiniGunlerError;

