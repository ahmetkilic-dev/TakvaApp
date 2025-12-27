import React, { memo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams } from 'expo-router';
import ScreenBackground from '../common/ScreenBackground';
import HutbeDetailHeader from './HutbeDetailHeader';
import HutbeDetailTitle from './HutbeDetailTitle';
import HutbePDFViewer from './HutbePDFViewer';
import HutbeLoading from './HutbeLoading';
import HutbeError from './HutbeError';
import { useHutbeDetail } from './hooks/useHutbes';

const HutbeDetailContainer = memo(() => {
  const params = useLocalSearchParams();
  const hutbeId = params.id;
  const { hutbe, loading, error } = useHutbeDetail(hutbeId);

  // Params'tan veya API'den gelen veriyi kullan
  const title = params.title || hutbe?.title || '';
  const date = params.date || hutbe?.date || '';
  const pdfUrl = params.pdfUrl || hutbe?.pdfUrl || hutbe?.pdf_url || hutbe?.url || '';

  return (
    <ScreenBackground>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <HutbeDetailHeader />
        
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          <HutbeDetailTitle title={title} date={date} />
          
          {loading && <HutbeLoading />}
          
          {error && <HutbeError error={error} />}
          
          {!loading && !error && pdfUrl && (
            <HutbePDFViewer pdfUrl={pdfUrl} />
          )}
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
});

HutbeDetailContainer.displayName = 'HutbeDetailContainer';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 0,
  },
});

export default HutbeDetailContainer;

