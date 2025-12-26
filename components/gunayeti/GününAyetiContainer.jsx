import { ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useState } from 'react';
import { useVerses } from './hooks/useVerses';
import GününAyetiHeader from './GününAyetiHeader';
import GününAyetiImage from './GününAyetiImage';
import GününAyetiVideo from './GününAyetiVideo';
import VerseSlider from './VerseSlider';
import VerseContent from './VerseContent';
import GününAyetiLoading from './GününAyetiLoading';
import GününAyetiError from './GününAyetiError';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Responsive calculations
const horizontalPadding = Math.max(20, SCREEN_WIDTH * 0.05);

export default function GününAyetiContainer() {
  const { currentVerse, loading, error, getRandomVerse } = useVerses();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Slider tamamlandığında video oynatmayı başlat
  const handleSliderComplete = useCallback(() => {
    setIsVideoPlaying(true);
  }, []);

  // Video bittiğinde yeni ayet getir ve image'i geri göster
  const handleVideoEnd = useCallback(() => {
    try {
      setIsVideoPlaying(false);
      getRandomVerse();
    } catch (error) {
      console.error('Video bitiş hatası:', error);
      setIsVideoPlaying(false);
    }
  }, [getRandomVerse]);

  // Loading durumu - Hook'lardan sonra return
  if (loading) {
    return <GününAyetiLoading />;
  }

  // Error durumu
  if (error) {
    return <GününAyetiError error={error} />;
  }

  return (
    <SafeAreaView edges={['top']} className="flex-1">
      <GününAyetiHeader />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate="normal"
        bounces={true}
        alwaysBounceVertical={false}
        contentContainerStyle={{
          paddingHorizontal: horizontalPadding,
          paddingTop: 24,
          paddingBottom: 0,
        }}
        style={{
          flex: 1,
        }}
      >
        {/* Main Image veya Video */}
        {isVideoPlaying ? (
          <GününAyetiVideo onVideoEnd={handleVideoEnd} />
        ) : (
          <GününAyetiImage />
        )}

        {/* Navigation Slider */}
        <VerseSlider onComplete={handleSliderComplete} />

        {/* Verse Content */}
        <VerseContent verse={currentVerse} />
      </ScrollView>
    </SafeAreaView>
  );
}

