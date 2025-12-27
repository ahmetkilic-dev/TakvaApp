import React, { memo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import ScreenBackground from '../common/ScreenBackground';
import HutbeHeader from './HutbeHeader';
import HutbeList from './HutbeList';
import HutbeLoading from './HutbeLoading';
import HutbeError from './HutbeError';
import { useHutbes } from './hooks/useHutbes';

const horizontalPadding = 20;
const SCROLL_PADDING_TOP = 42;

const HutbeContainer = memo(() => {
  const router = useRouter();
  const { hutbes, loading, error, refresh } = useHutbes();

  const handleItemPress = (hutbe) => {
    router.push({
      pathname: '/(app)/(services)/hutbe-detail',
      params: { 
        id: hutbe.id?.toString() || '1',
        title: hutbe.title || 'Hutbe',
        date: hutbe.date || '',
        pdfUrl: hutbe.pdfUrl || hutbe.pdf_url || hutbe.url || '',
      },
    });
  };

  return (
    <ScreenBackground>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <HutbeHeader />
        
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {loading && <HutbeLoading />}
          
          {!loading && error && (
            <HutbeError 
              error={error} 
              onRetry={refresh}
            />
          )}
          
          {!loading && !error && hutbes && hutbes.length > 0 && (
            <HutbeList 
              hutbes={hutbes} 
              onItemPress={handleItemPress}
            />
          )}
          
          {!loading && !error && (!hutbes || hutbes.length === 0) && (
            <HutbeError 
              error="Hutbe bulunamadı. Lütfen daha sonra tekrar deneyin." 
              onRetry={refresh}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
});

HutbeContainer.displayName = 'HutbeContainer';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: horizontalPadding,
    paddingTop: SCROLL_PADDING_TOP,
    paddingBottom: 0,
  },
});

export default HutbeContainer;

