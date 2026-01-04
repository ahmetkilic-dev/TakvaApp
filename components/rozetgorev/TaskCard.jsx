import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import ProgressCircle from './ProgressCircle';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const horizontalPadding = 20;
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);
const fontFamily = 'Plus Jakarta Sans';

export const TaskCard = ({ text, label, icon, progress, target, onPress, isLocked, requiredTier }) => {
    const percentage = target > 0 ? (progress / target) * 100 : 0;

    return (
        <TouchableOpacity
            onPress={isLocked ? null : onPress}
            activeOpacity={0.7}
            style={{
                width: contentWidth,
                minHeight: 62,
                borderRadius: 20,
                borderWidth: 0.5,
                borderColor: isLocked ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.5)',
                backgroundColor: isLocked ? 'rgba(0, 0, 0, 0.3)' : 'rgba(255, 255, 255, 0.05)',
                paddingHorizontal: 16,
                paddingVertical: 12,
                marginBottom: 12,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                opacity: isLocked ? 0.6 : 1,
                overflow: 'hidden' // Ensure label fits in border radius
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 12 }}>
                {icon && (
                    <View>
                        <Image
                            source={icon}
                            style={{ width: 40, height: 40, marginRight: 12, opacity: isLocked ? 0.4 : 1 }}
                            contentFit="contain"
                            transition={200}
                        />
                    </View>
                )}
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontFamily,
                            fontSize: 16,
                            fontWeight: isLocked ? '300' : '300',
                            color: isLocked ? 'rgba(255, 255, 255, 0.5)' : '#FFFFFF',
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
                                color: 'rgba(255, 255, 255, 0.4)',
                            }}
                        >
                            {label}
                        </Text>
                    )}
                </View>
            </View>

            {/* Right Side: Progress Circle or Lock Icon */}
            {!isLocked ? (
                <ProgressCircle percentage={percentage} size={40} />
            ) : (
                <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                        source={require('../../assets/statistics/kilitic.png')}
                        style={{ width: 40, height: 40, opacity: 0.8 }} // Same size as ProgressCircle
                        contentFit="contain"
                    />
                </View>
            )}

            {/* Locked Tier Label (PremiumBanner style) */}
            {isLocked && (
                <View
                    style={{
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        backgroundColor: requiredTier === 'premium' ? 'rgba(207, 155, 71, 0.2)' : 'rgba(255, 255, 255, 0.15)',
                        borderTopLeftRadius: 10,
                        paddingHorizontal: 8,
                        paddingVertical: 4,
                        borderTopWidth: 0.5,
                        borderLeftWidth: 0.5,
                        borderColor: requiredTier === 'premium' ? 'rgba(207, 155, 71, 0.5)' : 'rgba(255, 255, 255, 0.3)',
                    }}
                >
                    <Text
                        style={{
                            fontFamily,
                            fontSize: 10,
                            fontWeight: '600',
                            color: requiredTier === 'premium' ? '#CF9B47' : '#E0E0E0',
                            letterSpacing: 0.2,
                        }}
                    >
                        {requiredTier === 'plus' ? 'Plus gerekli' : 'Premium gerekli'}
                    </Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

export default React.memo(TaskCard);
