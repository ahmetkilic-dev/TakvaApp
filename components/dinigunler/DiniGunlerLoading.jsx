import { memo, useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenBackground from '../common/ScreenBackground';
import DiniGunlerHeader from './DiniGunlerHeader';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const HORIZONTAL_PADDING = 20;
const CONTENT_WIDTH = SCREEN_WIDTH - (HORIZONTAL_PADDING * 2);
const CARD_COUNT = 4;

// Skeleton Card Component
const SkeletonCard = memo(({ delay }) => {
  const animatedValue = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 0.6,
          duration: 800,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [animatedValue, delay]);

  return (
    <View style={styles.card}>
      {/* Left Content */}
      <View style={styles.leftContent}>
        {/* Title Row Skeleton */}
        <View style={styles.titleRow}>
          <Animated.View style={[styles.iconSkeleton, { opacity: animatedValue }]} />
          <Animated.View style={[styles.titleSkeleton, { opacity: animatedValue }]} />
        </View>

        {/* Description Skeleton */}
        <Animated.View style={[styles.descriptionSkeleton, { opacity: animatedValue }]} />
        <Animated.View style={[styles.descriptionSkeleton2, { opacity: animatedValue }]} />

        {/* Date Skeleton */}
        <View style={styles.dateContainer}>
          <Animated.View style={[styles.dateSkeleton, { opacity: animatedValue }]} />
          <View style={styles.dateDivider} />
          <Animated.View style={[styles.dateSkeleton, { opacity: animatedValue }]} />
        </View>
      </View>

      {/* Right Content */}
      <View style={styles.rightContent}>
        <Animated.View style={[styles.labelSkeleton, { opacity: animatedValue }]} />
        <Animated.View style={[styles.daysSkeleton, { opacity: animatedValue }]} />
      </View>
    </View>
  );
});

SkeletonCard.displayName = 'SkeletonCard';

const DiniGunlerLoading = memo(() => {
  return (
    <ScreenBackground>
      <SafeAreaView edges={['top']} style={styles.container}>
        <DiniGunlerHeader />
        
        <View style={styles.content}>
          {/* Title Skeleton */}
          <View style={styles.titleContainer}>
            <View style={styles.mainTitleSkeleton} />
            <View style={styles.subtitleSkeleton} />
          </View>

          {/* Cards Skeleton */}
          <View style={styles.cardsContainer}>
            {Array.from({ length: CARD_COUNT }).map((_, index) => (
              <SkeletonCard key={index} delay={index * 100} />
            ))}
          </View>
        </View>
      </SafeAreaView>
    </ScreenBackground>
  );
});

DiniGunlerLoading.displayName = 'DiniGunlerLoading';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 24,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  mainTitleSkeleton: {
    width: 200,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    marginBottom: 8,
  },
  subtitleSkeleton: {
    width: 280,
    height: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 6,
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    width: CONTENT_WIDTH,
    backgroundColor: 'rgba(36, 50, 46, 0.05)',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContent: {
    flex: 1,
    paddingRight: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  iconSkeleton: {
    width: 20,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 10,
  },
  titleSkeleton: {
    width: 120,
    height: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 6,
  },
  descriptionSkeleton: {
    width: '90%',
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    marginBottom: 4,
  },
  descriptionSkeleton2: {
    width: '70%',
    height: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
    marginBottom: 16,
  },
  dateContainer: {
    gap: 6,
  },
  dateSkeleton: {
    width: '80%',
    height: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 4,
  },
  dateDivider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  rightContent: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  labelSkeleton: {
    width: 70,
    height: 14,
    backgroundColor: 'rgba(255, 186, 74, 0.2)',
    borderRadius: 4,
    marginBottom: 8,
  },
  daysSkeleton: {
    width: 60,
    height: 28,
    backgroundColor: 'rgba(255, 186, 74, 0.2)',
    borderRadius: 6,
  },
});

export default DiniGunlerLoading;

