import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { useAudioPlayer } from 'expo-audio';
import * as Haptics from 'expo-haptics';
import { useZikirDuaDailyStats } from './hooks/useZikirDuaDailyStats';
import dhikrList from '../../constants/dhikrData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

// Progress circle size
const progressCircleSize = 200;
const strokeWidth = 37;
const progressRadius = (progressCircleSize - strokeWidth) / 2;
const circumference = 2 * Math.PI * progressRadius;

// Aşamalar ve renkler
const stages = [
  { name: 'Huzur', min: 0, max: 100, titleColor: '#8CD7C0', barColor: '#8CD7C0' },
  { name: 'Sabır', min: 100, max: 500, titleColor: '#8CD7C0', barColor: '#F2C879' },
  { name: 'Tevekkül', min: 500, max: 1000, titleColor: '#6CA8E9', barColor: '#6CA8E9' },
  { name: 'Sekîne', min: 1000, max: 2500, titleColor: '#6749C1', barColor: '#6749C1' },
  { name: 'Feyz', min: 2500, max: 5000, titleColor: '#F5D76E', barColor: '#F5D76E' },
];

const StaticRings = React.memo(({ currentStageIndex }) => {
  const circles = [];
  for (let i = 0; i < currentStageIndex; i++) {
    const stage = stages[i];
    circles.push(
      <Circle
        key={`stage-${i}`}
        cx={progressCircleSize / 2}
        cy={progressCircleSize / 2}
        r={progressRadius}
        stroke={stage.barColor}
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={0}
        strokeLinecap="round"
        transform={`rotate(-90 ${progressCircleSize / 2} ${progressCircleSize / 2})`}
      />
    );
  }
  return <>{circles}</>;
});

const ActiveRing = React.memo(({ currentStage, stageProgress }) => {
  const currentOffset = circumference - (stageProgress / 100) * circumference;
  return (
    <Circle
      key={`stage-current`}
      cx={progressCircleSize / 2}
      cy={progressCircleSize / 2}
      r={progressRadius}
      stroke={currentStage.barColor}
      strokeWidth={strokeWidth}
      fill="transparent"
      strokeDasharray={circumference}
      strokeDashoffset={currentOffset}
      strokeLinecap="round"
      transform={`rotate(-90 ${progressCircleSize / 2} ${progressCircleSize / 2})`}
    />
  );
});

const ZikirCounter = React.memo(() => {
  const { dhikrCount: globalTotal, incrementDhikr, perDhikrCounts } = useZikirDuaDailyStats();
  const [currentDhikrIndex, setCurrentDhikrIndex] = useState(0);

  const currentDhikr = useMemo(() => dhikrList[currentDhikrIndex], [currentDhikrIndex]);

  // Mevcut zikrin yerel sayısı
  const count = perDhikrCounts[currentDhikr.id] || 0;

  const player = useAudioPlayer(require('../../assets/audio/click_soft.wav'));

  const handlePrev = () => {
    setCurrentDhikrIndex((prev) => (prev === 0 ? dhikrList.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentDhikrIndex((prev) => (prev === dhikrList.length - 1 ? 0 : prev + 1));
  };

  const handleIncrement = () => {
    player.seekTo(0);
    player.play();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    incrementDhikr(currentDhikr.id);
  };

  // Mevcut aşamayı bul (Her zikir kendi aşamasını takip etsin diye zikir özelindeki count kullanılıyor)
  const currentStage = useMemo(() => {
    if (count >= 5000) return stages[4];
    for (let i = stages.length - 1; i >= 0; i--) {
      if (count >= stages[i].min) return stages[i];
    }
    return stages[0];
  }, [count]);

  const currentStageIndex = useMemo(() => stages.findIndex(s => s === currentStage), [currentStage]);

  // Progress calculation
  const stageProgress = useMemo(() => {
    if (count >= currentStage.max) return 100;
    return ((count - currentStage.min) / (currentStage.max - currentStage.min)) * 100;
  }, [count, currentStage]);

  return (
    <View
      style={{
        width: Math.min(SCREEN_WIDTH * 0.9, 360),
        minHeight: 450,
        borderRadius: 32,
        backgroundColor: '#1C1C1C',
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        padding: 24,
        marginBottom: 40,
        alignSelf: 'center',
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Top Section: Text Content */}
      <View style={{ flex: 1, justifyContent: 'flex-start' }}>
        {/* Title */}
        <Text style={{ fontFamily, fontSize: 28, fontWeight: '600', color: '#FFFFFF', marginBottom: 8, textAlign: 'center' }} numberOfLines={1} adjustsFontSizeToFit>
          {currentDhikr.title}
        </Text>

        {/* Arabic Text */}
        <Text style={{ fontFamily, fontSize: 18, fontWeight: '400', color: '#FFFFFF', marginBottom: 8, lineHeight: 26, textAlign: 'center' }}>
          {currentDhikr.arabic_pronunciation}
        </Text>

        {/* Turkish Meaning */}
        <Text style={{ fontFamily, fontSize: 15, fontWeight: '300', color: 'rgba(255, 255, 255, 0.6)', lineHeight: 20, textAlign: 'center' }}>
          {currentDhikr.meaning}
        </Text>
      </View>

      {/* Bottom Section: Progress Circle and Navigation - Relative Positioning */}
      <View style={{
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
      }}>
        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          {/* Left Arrow */}
          <TouchableOpacity
            onPress={handlePrev}
            style={{ position: 'absolute', left: -5, padding: 5, zIndex: 10 }}
          >
            <Ionicons name="chevron-back" size={48} color="#FFFFFF" />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleIncrement}
            activeOpacity={0.7}
            style={{ alignItems: 'center', justifyContent: 'center', position: 'relative' }}
          >
            <Svg width={progressCircleSize} height={progressCircleSize}>
              {/* Background circle */}
              <Circle
                cx={progressCircleSize / 2}
                cy={progressCircleSize / 2}
                r={progressRadius}
                stroke="#7C8381"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              <StaticRings currentStageIndex={currentStageIndex} />
              <ActiveRing currentStage={currentStage} stageProgress={stageProgress} />
            </Svg>
            <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ fontFamily, fontSize: 32, fontWeight: '600', color: '#FFFFFF', marginBottom: 4 }}>
                {count}
              </Text>
              <Text style={{ fontFamily, fontSize: 20, fontWeight: '500', color: '#AAA9A9' }}>
                {count >= 5000 ? `${count}/5000+` : `${count}/${currentStage.max}`}
              </Text>
            </View>
          </TouchableOpacity>

          {/* Right Arrow */}
          <TouchableOpacity
            onPress={handleNext}
            style={{ position: 'absolute', right: -5, padding: 5, zIndex: 10 }}
          >
            <Ionicons name="chevron-forward" size={48} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Stage Name Below Circle */}
        <Text style={{ fontFamily, fontSize: 28, fontWeight: '600', color: currentStage.titleColor, letterSpacing: 1.12, marginTop: 12 }}>
          {currentStage.name}
        </Text>
      </View>
    </View>
  );
});

export default ZikirCounter;
