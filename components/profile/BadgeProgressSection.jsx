import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const horizontalPadding = 20;
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);
const fontFamily = 'Plus Jakarta Sans';

const badgeIconsSet = {
    kuran: {
        1: require('../../assets/statistics/kuran1.png'),
        2: require('../../assets/statistics/kuran2.png'),
        3: require('../../assets/statistics/kuran3.png'),
        4: require('../../assets/statistics/kuran4.png'),
        5: require('../../assets/statistics/kuran5.png'),
        6: require('../../assets/statistics/kuran6.png'),
        7: require('../../assets/statistics/kuran7.png'),
    },
    namaz: {
        1: require('../../assets/statistics/namaz1.png'),
        2: require('../../assets/statistics/namaz2.png'),
        3: require('../../assets/statistics/namaz3.png'),
        4: require('../../assets/statistics/namaz4.png'),
        5: require('../../assets/statistics/namaz5.png'),
        6: require('../../assets/statistics/namaz6.png'),
        7: require('../../assets/statistics/namaz7.png'),
    },
    zksl: {
        1: require('../../assets/statistics/zksl1.png'),
        2: require('../../assets/statistics/zksl2.png'),
        3: require('../../assets/statistics/zksl3.png'),
        4: require('../../assets/statistics/zksl4.png'),
        5: require('../../assets/statistics/zksl5.png'),
        6: require('../../assets/statistics/zksl6.png'),
        7: require('../../assets/statistics/zksl7.png'),
    },
    ilim: {
        1: require('../../assets/statistics/ilim1.png'),
        2: require('../../assets/statistics/ilim2.png'),
        3: require('../../assets/statistics/ilim3.png'),
        4: require('../../assets/statistics/ilim4.png'),
        5: require('../../assets/statistics/ilim5.png'),
        6: require('../../assets/statistics/ilim6.png'),
        7: require('../../assets/statistics/ilim7.png'),
    },
    uygulama: {
        1: require('../../assets/statistics/uygulama1.png'),
        2: require('../../assets/statistics/uygulama2.png'),
        3: require('../../assets/statistics/uygulama3.png'),
        4: require('../../assets/statistics/uygulama4.png'),
        5: require('../../assets/statistics/uygulama5.png'),
        6: require('../../assets/statistics/uygulama6.png'),
        7: require('../../assets/statistics/uygulama7.png'),
    },
};

export const BadgeProgressSection = ({ badgeCount, categoryLevels }) => {
    // 35 total badges in the system
    const percentage = Math.min(100, Math.floor((badgeCount / 35) * 100));

    const renderBadge = (category) => {
        const level = (categoryLevels && categoryLevels[category]) || 0;
        const icon = level > 0 ? badgeIconsSet[category][level] : badgeIconsSet[category][1];

        return (
            <Image
                key={category}
                source={icon}
                style={{
                    width: 32,
                    height: 32,
                    marginHorizontal: 15,
                    opacity: level > 0 ? 1 : 0.2 // Level 0 ise silik göster
                }}
                resizeMode="contain"
            />
        );
    };

    return (
        <View style={{ marginBottom: 32 }}>
            {/* Badge Icons Row */}
            <View style={{ width: '100%', alignItems: 'center', marginBottom: 16 }}>
                <View style={{
                    width: Math.min(contentWidth, 350),
                    height: 54,
                    borderRadius: 12,
                    backgroundColor: 'rgba(24, 39, 35, 0.8)',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    borderWidth: 0.5,
                    borderColor: 'rgba(216, 196, 158, 0.3)',
                }}>
                    {['kuran', 'namaz', 'zksl', 'ilim', 'uygulama'].map(cat => renderBadge(cat))}
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

export default React.memo(BadgeProgressSection);
