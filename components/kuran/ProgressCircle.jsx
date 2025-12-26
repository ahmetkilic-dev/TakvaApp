import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const fontFamily = 'Plus Jakarta Sans';

export default function ProgressCircle({ percentage, size = 40 }) {
  const radius = size / 2 - 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={6}
        />
        {/* Progress circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#8CD7C0"
          strokeWidth={6}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={{ position: 'absolute', width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Text
          style={{
            fontFamily,
            fontSize: 10,
            fontWeight: '400',
            color: '#FFFFFF',
          }}
        >
          %{percentage}
        </Text>
      </View>
    </View>
  );
}

