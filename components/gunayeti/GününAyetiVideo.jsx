import { View, Dimensions } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { useRef, useEffect } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Responsive calculations
const horizontalPadding = Math.max(20, SCREEN_WIDTH * 0.05);
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);

export default function GününAyetiVideo({ onVideoEnd }) {
  const videoRef = useRef(null);

  useEffect(() => {
    // Video yüklendiğinde otomatik oynat
    const playVideo = async () => {
      if (videoRef.current) {
        try {
          await videoRef.current.playAsync();
        } catch (error) {
          console.error('Video oynatma hatası:', error);
        }
      }
    };
    
    playVideo();

    return () => {
      // Cleanup: Video unmount olduğunda durdur
      const stopVideo = async () => {
        if (videoRef.current) {
          try {
            await videoRef.current.stopAsync();
            await videoRef.current.unloadAsync();
          } catch (error) {
            console.error('Video durdurma hatası:', error);
          }
        }
      };
      stopVideo();
    };
  }, []);

  const handlePlaybackStatusUpdate = (status) => {
    if (status.isLoaded && status.didJustFinish) {
      // Video bittiğinde callback'i çağır
      if (onVideoEnd) {
        onVideoEnd();
      }
    }
  };

  return (
    <View style={{ marginBottom: 16, alignItems: 'center' }}>
      <Video
        ref={videoRef}
        source={require('../../assets/images/ayetvideo.mp4')}
        style={{
          width: Math.min(300, contentWidth),
          height: Math.min(300 * (163 / 300), Math.min(300, contentWidth) * (163 / 300)),
          borderRadius: 25,
          borderWidth: 0.5,
          borderColor: 'rgba(255, 255, 255, 0.5)',
        }}
        resizeMode={ResizeMode.COVER}
        shouldPlay={true} // Otomatik oynat
        isLooping={false}
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />
    </View>
  );
}

