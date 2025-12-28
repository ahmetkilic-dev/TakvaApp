import React, { memo, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const horizontalPadding = 20;
const CONTAINER_BORDER_RADIUS = 20;
const CONTAINER_MARGIN_TOP = 16;
const CONTAINER_MARGIN_BOTTOM = 24;

const HutbePDFViewer = memo(({ pdfUrl }) => {
  const [loading, setLoading] = useState(true);

  if (!pdfUrl) {
    return null;
  }

  // PDF URL'ini Google Docs Viewer ile yükle
  let pdfViewerUrl = pdfUrl;
  
  if (pdfUrl) {
    // URL'i tam URL haline getir
    let fullUrl = pdfUrl;
    if (!pdfUrl.startsWith('http')) {
      fullUrl = `https://dinhizmetleri.diyanet.gov.tr${pdfUrl.startsWith('/') ? '' : '/'}${pdfUrl}`;
    }
    
    // Google Docs Viewer kullan (CORS sorunlarını önlemek için)
    // encodeURIComponent URL'i tamamen encode eder (Türkçe karakterler dahil)
    pdfViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(fullUrl)}&embedded=true`;
  }

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}
      <WebView
        source={{ uri: pdfViewerUrl }}
        style={styles.webview}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error: ', nativeEvent);
          setLoading(false);
        }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
      />
    </View>
  );
});

HutbePDFViewer.displayName = 'HutbePDFViewer';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalPadding,
    paddingVertical: 24,
    borderRadius: CONTAINER_BORDER_RADIUS,
    backgroundColor: 'rgba(24, 39, 35, 0.8)',
    marginHorizontal: horizontalPadding,
    marginTop: CONTAINER_MARGIN_TOP,
    marginBottom: CONTAINER_MARGIN_BOTTOM,
    height: SCREEN_HEIGHT * 0.7, // Ekranın %70'i
    minHeight: 400,
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});

export default HutbePDFViewer;

