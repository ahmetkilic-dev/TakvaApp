import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const horizontalPadding = 20;
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);
const fontFamily = 'Plus Jakarta Sans';

const badgeIcons = [
    require('../../assets/İstatistikler/kuran1.png'),
    require('../../assets/İstatistikler/namaz1.png'),
    require('../../assets/İstatistikler/zksl1.png'),
    require('../../assets/İstatistikler/ilim1.png'),
    require('../../assets/İstatistikler/uygulama1.png'),
];

export const BadgeProgressSection = ({ badgeCount }) => {
    // 35 total badges in the system
    const percentage = Math.min(100, Math.floor((badgeCount / 35) * 100));

    return (
        <View style={{ marginBottom: 32 }}>
            {/* Badge Icons Row */}
            <View style={{ width: '100%', alignItems: 'center', marginBottom: 12 }}>
                <View style={{
                    width: Math.min(contentWidth, 350),
                    height: 50,
                    borderRadius: 10,
                    backgroundColor: 'rgba(24, 39, 35, 0.8)',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 5
                }}>
                    {badgeIcons.map((icon, index) => (
                        <Image key={index} source={icon} style={{ width: 32, height: 32, marginHorizontal: 15 }} resizeMode="contain" />
                    ))}
                </View>
            </View>

            {/* Progress Bar */}
            <View style={{
                width: Math.min(contentWidth, 346),
                height: 17,
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: '#E2E2E2',
                overflow: 'hidden',
                alignSelf: 'center'
            }}>
                <LinearGradient
                    colors={['#2B3C37', '#172521']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{ width: `${percentage}%`, height: '100%', borderRadius: 10, alignItems: 'center', justifyContent: 'center' }}
                >
                    <Text style={{ fontFamily, fontSize: 10, fontWeight: '600', color: '#FFFFFF' }}>%{percentage}</Text>
                </LinearGradient>
            </View>
        </View>
    );
};

export default BadgeProgressSection;
