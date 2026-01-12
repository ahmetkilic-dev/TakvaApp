import React, { memo, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions, TouchableOpacity, Text, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

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
  let fullUrl = pdfUrl;

  if (pdfUrl) {
    // 1. Base URL fix
    if (!pdfUrl.startsWith('http')) {
      // Diyanet often returns relative paths like '/Documents/...'
      const cleanPath = pdfUrl.startsWith('/') ? pdfUrl.substring(1) : pdfUrl;
      fullUrl = `https://dinhizmetleri.diyanet.gov.tr/${cleanPath}`;
    }

    // 2. Google Docs Viewer URL construction
    // IMPORTANT: Android WebView struggles if the embedded URL isn't perfectly encoded.
    // We encode the full URL to ensure special chars (Turkish) and slashes pass through safely.
    const encodedTarget = encodeURIComponent(fullUrl);
    pdfViewerUrl = `https://docs.google.com/viewer?url=${encodedTarget}&embedded=true`;
  }

  const handleOpenExternal = async () => {
    try {
      const canOpen = await Linking.canOpenURL(fullUrl);
      if (canOpen) {
        await Linking.openURL(fullUrl);
      } else {
        // Fallback to viewer URL if direct link fails
        await Linking.openURL(pdfViewerUrl);
      }
    } catch (e) {
      console.error("Link açma hatası:", e);
    }
  };

  // Google Docs Viewer optimize edilmiş CSS
  const INJECTED_JAVASCRIPT = `
    const meta = document.createElement('meta');
    meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=1');
    meta.setAttribute('name', 'viewport');
    document.getElementsByTagName('head')[0].appendChild(meta);

    const style = document.createElement('style');
    style.innerHTML = '
      /* Toolbar ve headerları gizle */
      div[role="toolbar"], .toolbar { display: none !important; }
      .ndfHFb-c4YZDc-Wrql6b { display: none !important; }
      
      /* Arka planı beyaz yap */
      body, html { 
        background-color: #ffffff !important; 
        margin: 0 !important; 
        padding: 0 !important;
        overflow-x: hidden !important;
      }
      
      /* İçeriği (PDF resimlerini) tam genişliğe yay */
      img { 
        width: 100% !important; 
        height: auto !important; 
        margin: 0 auto !important;
        display: block !important;
      }
      
      /* Gereksiz boşlukları sil */
      .ndfHFb-c4YZDc-Wrql6b-bMEDc { margin-top: 0 !important; padding-top: 0 !important; }
    ';
    document.head.appendChild(style);
    true;
  `;

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#182723" />
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
        injectedJavaScript={INJECTED_JAVASCRIPT}
        scrollEnabled={true}
      />
    </View>
  );
});

HutbePDFViewer.displayName = 'HutbePDFViewer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#182723',
    overflow: 'hidden',
  },
  webview: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    backgroundColor: '#182723',
  },
});

export default HutbePDFViewer;

