import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

const fontFamily = 'Plus Jakarta Sans';

export const ProgressCircle = ({ percentage, size = 40 }) => {
    const radius = size / 2 - 4;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (Math.min(100, percentage) / 100) * circumference;

    return (
        <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
            <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.1)"
                    strokeWidth={size / 5}
                />
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="#8CD7C0"
                    strokeWidth={size / 5}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </Svg>
            <View style={{ position: 'absolute', width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
                {percentage >= 100 ? (
                    <Ionicons name="checkmark" size={size / 2} color="#8CD7C0" />
                ) : (
                    <Text
                        style={{
                            fontFamily,
                            fontSize: size / 4,
                            fontWeight: '400',
                            color: '#FFFFFF',
                            textAlign: 'center',
                        }}
                    >
                        %{Math.floor(percentage)}
                    </Text>
                )}
            </View>
        </View>
    );
};

export default React.memo(ProgressCircle);
