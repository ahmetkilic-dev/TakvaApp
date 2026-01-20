import React, { memo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import ScreenBackground from '../common/ScreenBackground';
import HutbeHeader from './HutbeHeader';
import HutbeList from './HutbeList';
import HutbeLoading from './HutbeLoading';
import HutbeError from './HutbeError';
import { useHutbes, HUTBE_PAGE_URL } from './hooks/useHutbes';

const horizontalPadding = 20;
const SCROLL_PADDING_TOP = 42;

const HutbeContainer = memo(() => {
  const router = useRouter();
  const { hutbes, loading, error, processHtml, refresh, refreshKey, handleError } = useHutbes();

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

  // Inject JS to extract HTML after page loads
  const INJECTED_JS = `
    window.ReactNativeWebView.postMessage(document.documentElement.outerHTML);
    true;
  `;

  return (
    <ScreenBackground>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <HutbeHeader />

        {/* Hidden WebView for WAF Bypass */}
        <View style={{ height: 0, width: 0, opacity: 0, overflow: 'hidden' }}>
          <WebView
            key={refreshKey}
            source={{ uri: HUTBE_PAGE_URL }}
            onMessage={(event) => processHtml(event.nativeEvent.data)}
            injectedJavaScript={INJECTED_JS}
            onError={(syntheticEvent) => handleError(syntheticEvent.nativeEvent.description)}
            onHttpError={(syntheticEvent) => handleError(`HTTP ${syntheticEvent.nativeEvent.statusCode}`)}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            startInLoadingState={false}
            // Mimic a real browser slightly better
            userAgent="Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36"
          />
        </View>

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
