import { ScrollView, Dimensions, View } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCallback, useState, useMemo } from 'react';
import { useVerses } from './hooks/useVerses';
import { useVersesDailyStats } from './hooks/useVersesDailyStats';
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
  const { currentVerse, loading: versesLoading, error: versesError, getRandomVerse } = useVerses();
  const {
    loading: dailyStatsLoading,
    verseRevealed,
    canRevealVerse,
    currentVerseData,
    revealVerse,
  } = useVersesDailyStats();

  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  // Gösterilecek ayet: Sadece ayet gösterildiyse currentVerseData göster
  const displayVerse = useMemo(() => {
    return verseRevealed ? currentVerseData : null;
  }, [verseRevealed, currentVerseData]);

  // Slider tamamlandığında video oynat (ayet henüz seçilmez)
  const handleSliderComplete = useCallback(async () => {
    if (!canRevealVerse) {
      console.warn('📖 Bugün ayet gösterme hakkı yok');
      return;
    }

    // Sadece video oynat (ayet henüz seçilmez)
    setIsVideoPlaying(true);
  }, [canRevealVerse]);

  // Video bittiğinde rastgele ayet seç, kaydet ve göster
  const handleVideoEnd = useCallback(async () => {
    try {
      // Video bitti, artık rastgele ayet seç
      const newVerse = await getRandomVerse();

      if (!newVerse) {
        console.error('📖 Rastgele ayet seçilemedi');
        setIsVideoPlaying(false);
        return;
      }

      // Seçilen ayeti Firebase'e kaydet
      const result = await revealVerse(newVerse);
      if (result.success) {
        console.log('📖 Rastgele ayet seçildi ve kaydedildi:', newVerse.reference);
      } else {
        console.error('📖 Ayet kaydedilemedi:', result.message);
      }

      // Video'yu kapat, ayet göster
      setIsVideoPlaying(false);
    } catch (error) {
      console.error('Video bitiş hatası:', error);
      setIsVideoPlaying(false);
    }
  }, [getRandomVerse, revealVerse]);

  // Loading durumu - Hook'lardan sonra return
  if (versesLoading || dailyStatsLoading) {
    return <GününAyetiLoading />;
  }

  // Error durumu
  if (versesError) {
    return <GününAyetiError error={versesError} />;
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


        {/* Media Container - Fixed Height to prevent layout shifts */}
        <View style={{ marginBottom: 16, alignItems: 'center', height: Math.min(300 * (163 / 300), (SCREEN_WIDTH - horizontalPadding * 2) * (163 / 300)) }}>
          {isVideoPlaying ? (
            <Animated.View
              entering={FadeIn.duration(600)}
              style={{ width: '100%', height: '100%', alignItems: 'center' }}
            >
              <GününAyetiVideo onVideoEnd={handleVideoEnd} />
            </Animated.View>
          ) : (
            <Animated.View
              entering={FadeIn.duration(600)}
              exiting={FadeOut.duration(600)}
              style={{ width: '100%', height: '100%', alignItems: 'center', position: 'absolute' }}
            >
              <GününAyetiImage />
            </Animated.View>
          )}
        </View>

        {/* Navigation Slider - Sadece bugün ayet gösterilmediyse aktif */}
        <VerseSlider
          onComplete={handleSliderComplete}
          disabled={!canRevealVerse}
          message={!canRevealVerse ? "Bugün kaydırma hakkınız bitti." : null}
        />

        {/* Verse Content - Eğer ayet gösterildiyse göster, değilse gizle */}
        <VerseContent verse={displayVerse} isRevealed={verseRevealed} />
      </ScrollView>
    </SafeAreaView>
  );
}

