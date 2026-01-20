import React, { memo, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions, Platform, Text } from 'react-native';
import { WebView } from 'react-native-webview';

const HutbePDFViewer = memo(({ pdfUrl }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (!pdfUrl) {
    return null;
  }

  let finalUrl = pdfUrl;
  if (pdfUrl && !pdfUrl.startsWith('http')) {
    const cleanPath = pdfUrl.startsWith('/') ? pdfUrl.substring(1) : pdfUrl;
    finalUrl = `https://dinhizmetleri.diyanet.gov.tr/${cleanPath}`;
  }

  // Consistent User Agent that worked for the list
  const USER_AGENT = "Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36";

  // PDF.js Viewer HTML Template for Android
  const getPdfJsHtml = (url) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=2.0">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js"></script>
      <script>
        pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      </script>
      <style>
        body { margin: 0; padding: 0; background-color: #525659; }
        #viewer { display: flex; flex-direction: column; align-items: center; width: 100%; }
        canvas { display: block; margin: 10px 0; box-shadow: 0 4px 8px rgba(0,0,0,0.2); max-width: 95%; background: white; }
        .loading { color: white; margin-top: 20px; font-family: sans-serif; text-align: center; }
        .error { color: #ff6b6b; margin-top: 20px; font-family: sans-serif; text-align: center; padding: 20px; }
      </style>
    </head>
    <body>
      <div id="viewer">
        <div class="loading" id="loader">Hutbe Yükleniyor...</div>
      </div>
      <script>
        const url = "${url}";
        const viewer = document.getElementById('viewer');
        const loader = document.getElementById('loader');

        // Fetch PDF with same-origin credentials (cookies/headers are handled by WebView logic largely)
        const loadingTask = pdfjsLib.getDocument({
          url: url,
          cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/cmaps/',
          cMapPacked: true,
        });

        loadingTask.promise.then(function(pdf) {
          loader.style.display = 'none';
          
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            pdf.getPage(pageNum).then(function(page) {
              const scale = 1.5;
              const viewport = page.getViewport({scale: scale});
              
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
              canvas.height = viewport.height;
              canvas.width = viewport.width;
              
              // Style for responsiveness
              canvas.style.width = '95%'; 
              canvas.style.height = 'auto';

              viewer.appendChild(canvas);

              const renderContext = {
                canvasContext: context,
                viewport: viewport
              };
              page.render(renderContext);
            });
          }
        }, function (reason) {
          console.error(reason);
          loader.style.display = 'none';
          viewer.innerHTML += '<div class="error">Hutbe yüklenemedi.<br><br>' + reason + '</div>';
          // Communicate error back to React Native
          window.ReactNativeWebView.postMessage("ERROR:" + reason);
        });
      </script>
    </body>
    </html>
  `;

  let source = {};
  if (Platform.OS === 'android') {
    source = {
      html: getPdfJsHtml(finalUrl),
      baseUrl: "https://dinhizmetleri.diyanet.gov.tr/" // Key for CORS
    };
  } else {
    source = { uri: finalUrl };
  }

  return (
    <View style={styles.container}>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#182723" />
        </View>
      )}
      {error && (
        <View style={styles.loadingContainer}>
          <Text style={{ color: 'white' }}>PDF Yüklenemedi.</Text>
        </View>
      )}
      <WebView
        source={source}
        style={styles.webview}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
        onMessage={(event) => {
          if (event.nativeEvent.data.startsWith("ERROR:")) {
            console.log("PDFJS Error:", event.nativeEvent.data);
            setError(true);
            setLoading(false);
          }
        }}
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.error('WebView error: ', nativeEvent);
          setLoading(false);
        }}
        originWhitelist={['*']}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowFileAccess={true}
        allowUniversalAccessFromFileURLs={true}
        mixedContentMode="always"
        userAgent={USER_AGENT}
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

