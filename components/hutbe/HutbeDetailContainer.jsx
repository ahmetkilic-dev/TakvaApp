import React, { memo, useCallback, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useFocusEffect } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';

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

  const [orientation, setOrientation] = useState(ScreenOrientation.Orientation.PORTRAIT_UP);

  // Sayfa odaklandığında (ekrana geldiğinde)
  useFocusEffect(
    useCallback(() => {
      const unlockOrientation = async () => {
        try {
          await ScreenOrientation.unlockAsync();
        } catch (error) {
          console.error("Orientation unlock error:", error);
        }
      };

      unlockOrientation();

      // Listener ekle
      const subscription = ScreenOrientation.addOrientationChangeListener((evt) => {
        setOrientation(evt.orientationInfo.orientation);
      });

      // Sayfa odaktan çıktığında
      return () => {
        ScreenOrientation.removeOrientationChangeListener(subscription);
        const lockPortrait = async () => {
          try {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
          } catch (error) {
            console.error("Orientation lock error:", error);
          }
        };
        lockPortrait();
      };
    }, [])
  );

  const isLandscape = orientation === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
    orientation === ScreenOrientation.Orientation.LANDSCAPE_RIGHT;

  // Params'tan veya API'den gelen veriyi kullan
  const title = params.title || hutbe?.title || '';
  const date = params.date || hutbe?.date || '';
  const pdfUrl = params.pdfUrl || hutbe?.pdfUrl || hutbe?.pdf_url || hutbe?.url || '';

  return (
    <ScreenBackground>
      <SafeAreaView edges={isLandscape ? [] : ['top']} style={styles.safeArea}>
        {!isLandscape && <HutbeDetailHeader />}

        <View style={styles.content}>
          {!isLandscape && <HutbeDetailTitle title={title} date={date} />}

          {loading && <HutbeLoading />}

          {error && <HutbeError error={error} />}

          {!loading && !error && pdfUrl && (
            <HutbePDFViewer pdfUrl={pdfUrl} key={orientation} />
          )}
        </View>
      </SafeAreaView>
    </ScreenBackground>
  );
});

HutbeDetailContainer.displayName = 'HutbeDetailContainer';

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});

export default HutbeDetailContainer;

