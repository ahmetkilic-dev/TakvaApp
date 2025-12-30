import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const horizontalPadding = 20;
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);
const fontFamily = 'Plus Jakarta Sans';

const badgeIconsSet = {
    kuran: {
        1: require('../../assets/İstatistikler/kuran1.png'),
        2: require('../../assets/İstatistikler/kuran2.png'),
        3: require('../../assets/İstatistikler/kuran3.png'),
        4: require('../../assets/İstatistikler/kuran4.png'),
        5: require('../../assets/İstatistikler/kuran5.png'),
        6: require('../../assets/İstatistikler/kuran6.png'),
        7: require('../../assets/İstatistikler/kuran7.png'),
    },
    namaz: {
        1: require('../../assets/İstatistikler/namaz1.png'),
        2: require('../../assets/İstatistikler/namaz2.png'),
        3: require('../../assets/İstatistikler/namaz3.png'),
        4: require('../../assets/İstatistikler/namaz4.png'),
        5: require('../../assets/İstatistikler/namaz5.png'),
        6: require('../../assets/İstatistikler/namaz6.png'),
        7: require('../../assets/İstatistikler/namaz7.png'),
    },
    zksl: {
        1: require('../../assets/İstatistikler/zksl1.png'),
        2: require('../../assets/İstatistikler/zksl2.png'),
        3: require('../../assets/İstatistikler/zksl3.png'),
        4: require('../../assets/İstatistikler/zksl4.png'),
        5: require('../../assets/İstatistikler/zksl5.png'),
        6: require('../../assets/İstatistikler/zksl6.png'),
        7: require('../../assets/İstatistikler/zksl7.png'),
    },
    ilim: {
        1: require('../../assets/İstatistikler/ilim1.png'),
        2: require('../../assets/İstatistikler/ilim2.png'),
        3: require('../../assets/İstatistikler/ilim3.png'),
        4: require('../../assets/İstatistikler/ilim4.png'),
        5: require('../../assets/İstatistikler/ilim5.png'),
        6: require('../../assets/İstatistikler/ilim6.png'),
        7: require('../../assets/İstatistikler/ilim7.png'),
    },
    uygulama: {
        1: require('../../assets/İstatistikler/uygulama1.png'),
        2: require('../../assets/İstatistikler/uygulama2.png'),
        3: require('../../assets/İstatistikler/uygulama3.png'),
        4: require('../../assets/İstatistikler/uygulama4.png'),
        5: require('../../assets/İstatistikler/uygulama5.png'),
        6: require('../../assets/İstatistikler/uygulama6.png'),
        7: require('../../assets/İstatistikler/uygulama7.png'),
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

export default BadgeProgressSection;
