import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import ProgressCircle from './ProgressCircle';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const horizontalPadding = 20;
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);
const fontFamily = 'Plus Jakarta Sans';

export const TaskCard = ({ text, label, icon, progress, target, onPress }) => {
    const percentage = target > 0 ? (progress / target) * 100 : 0;

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            style={{
                width: contentWidth,
                minHeight: 62,
                borderRadius: 20,
                borderWidth: 0.5,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                paddingHorizontal: 16,
                paddingVertical: 12,
                marginBottom: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 12 }}>
                {icon && (
                    <Image
                        source={icon}
                        style={{ width: 40, height: 40, marginRight: 12 }}
                        contentFit="contain"
                        transition={200}
                    />
                )}
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontFamily,
                            fontSize: 16,
                            fontWeight: '300',
                            color: '#FFFFFF',
                            lineHeight: 20,
                            marginBottom: label ? 2 : 0,
                        }}
                        numberOfLines={2}
                    >
                        {text}
                    </Text>
                    {label && (
                        <Text
                            style={{
                                fontFamily,
                                fontSize: 12,
                                fontWeight: '300',
                                color: 'rgba(255, 255, 255, 0.8)',
                            }}
                        >
                            {label}
                        </Text>
                    )}
                </View>
            </View>
            <ProgressCircle percentage={percentage} size={40} />
        </TouchableOpacity>
    );
};

export default React.memo(TaskCard);
