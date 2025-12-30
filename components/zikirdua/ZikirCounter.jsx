import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { useZikirDuaDailyStats } from './hooks/useZikirDuaDailyStats';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

// Responsive sizes
const isSmallScreen = SCREEN_WIDTH < 375;
const progressCircleSize = isSmallScreen ? 90 : 110;
const strokeWidth = 20;
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

// Zikir metni (Moved outside or memoized)
const dhikrData = {
  arabic: 'Sübhanallah',
  meaning: "Allah'ı tüm noksan sıfatlardan tenzih ederim.",
};

const ZikirCounter = React.memo(() => {
  const { dhikrCount: count, incrementDhikr } = useZikirDuaDailyStats();

  // Mevcut aşamayı bul
  const currentStage = useMemo(() => {
    if (count >= 5000) return stages[4];
    for (let i = stages.length - 1; i >= 0; i--) {
      if (count >= stages[i].min) return stages[i];
    }
    return stages[0];
  }, [count]);

  // Progress calculation
  const stageProgress = useMemo(() => {
    if (count >= currentStage.max) return 100;
    return ((count - currentStage.min) / (currentStage.max - currentStage.min)) * 100;
  }, [count, currentStage]);

  // Progress circle'ları render et - Memoized
  const renderedCircles = useMemo(() => {
    const circles = [];
    const currentStageIndex = stages.findIndex(s => s === currentStage);

    // Önceki aşamaları tamamen dolu olarak render et
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

    // Mevcut aşamayı kısmen dolu olarak render et
    const currentOffset = circumference - (stageProgress / 100) * circumference;
    circles.push(
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

    return circles;
  }, [currentStage, stageProgress]);

  return (
    <View
      style={{
        width: '100%',
        maxWidth: 400,
        borderRadius: 15,
        backgroundColor: '#1C1C1C',
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        padding: 16,
        marginBottom: 40,
        alignSelf: 'center',
        position: 'relative',
      }}
    >
      {/* Left Arrow */}
      <TouchableOpacity
        style={{ width: 22, height: 35, alignItems: 'center', justifyContent: 'center', position: 'absolute', left: -38, bottom: 16 }}
      >
        <Ionicons name="chevron-back" size={16} color="#FFFFFF" />
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        {/* Progress Circle */}
        <View style={{ marginRight: 16, alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
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
            {renderedCircles}
          </Svg>
          <View style={{ position: 'absolute', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontFamily, fontSize: isSmallScreen ? 16 : 18, fontWeight: '600', color: '#FFFFFF', marginBottom: 2 }}>
              {count}
            </Text>
            <Text style={{ fontFamily, fontSize: isSmallScreen ? 11 : 12, fontWeight: '500', color: '#AAA9A9' }}>
              {count >= 5000 ? `${count}/5000+` : `${count}/${currentStage.max}`}
            </Text>
          </View>
        </View>

        {/* Right Content */}
        <View style={{ flex: 1 }}>
          <Text style={{ fontFamily, fontSize: 14, fontWeight: '600', color: currentStage.titleColor, letterSpacing: 1.4, marginBottom: 8 }}>
            {currentStage.name}
          </Text>
          <Text style={{ fontFamily, fontSize: 12, fontWeight: '300', color: '#FFFFFF', marginBottom: 4 }}>
            {dhikrData.arabic}
          </Text>
          <Text style={{ fontFamily, fontSize: 12, fontWeight: '300', color: '#898989', marginBottom: 12, lineHeight: 16 }}>
            {dhikrData.meaning}
          </Text>

          {/* Zikir çek Button */}
          <View style={{ flexDirection: 'row', alignItems: 'center', position: 'relative' }}>
            <TouchableOpacity
              onPress={incrementDhikr}
              style={{ width: 90, height: 35, borderRadius: 10, borderWidth: 1, borderColor: currentStage.titleColor, backgroundColor: '#1C1C1C', alignItems: 'center', justifyContent: 'center' }}
            >
              <Text style={{ fontFamily, fontSize: 14, fontWeight: '300', color: '#FFFFFF' }}>
                Zikir çek
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Right Arrow */}
      <TouchableOpacity
        style={{ width: 22, height: 35, alignItems: 'center', justifyContent: 'center', position: 'absolute', right: -38, bottom: 16 }}
      >
        <Ionicons name="chevron-forward" size={16} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
});

export default ZikirCounter;

