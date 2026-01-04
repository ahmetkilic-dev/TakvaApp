import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const horizontalPadding = 20;
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);
const fontFamily = 'Plus Jakarta Sans';

export const PersonalStatsGrid = ({ stats, badgeCount }) => {
    const statistics = [
        { id: 1, title: 'Toplam okunan ayet', value: (stats?.total_verses || 0).toString(), icon: 'book' },
        { id: 2, title: 'Toplam salavat', value: (stats?.total_salavat || 0).toString(), icon: 'beads' },
        { id: 3, title: 'Toplam zikir sayısı', value: (stats?.total_dhikr || 0).toString(), icon: 'dhikr' },
        { id: 4, title: 'Toplam kılınan namaz', value: (stats?.total_prayers || 0).toString(), icon: 'prayer' },
        { id: 5, title: 'İlim doğru cevap', value: (stats?.quiz_count || 0).toString(), icon: 'knowledge' },
        { id: 6, title: 'Tamamlanan görevler', value: (badgeCount || 0).toString(), icon: 'tasks' },
    ];

    return (
        <View style={{ marginBottom: 32 }}>
            <Text style={{ fontFamily, fontSize: 20, fontWeight: '700', color: '#FFFFFF', marginBottom: 8 }}>
                Kişisel İstatistiklerin
            </Text>
            <Text style={{ fontFamily, fontSize: 10, fontWeight: '400', color: 'rgba(255, 255, 255, 0.6)', marginBottom: 24, lineHeight: 13 }}>
                Bugüne kadar uygulamada yaptığın tüm ilerlemelerin.
            </Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
                {statistics.map((stat) => (
                    <LinearGradient
                        key={stat.id}
                        colors={['#182723', '#0A3727']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{
                            width: (contentWidth - 12) / 2,
                            height: 60,
                            borderRadius: 10,
                            borderWidth: 0.5,
                            borderColor: 'rgba(216, 196, 158, 0.5)',
                            paddingVertical: 6,
                            paddingHorizontal: 8,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text
                            numberOfLines={2}
                            adjustsFontSizeToFit
                            style={{
                                fontFamily,
                                fontSize: 11,
                                fontWeight: '400',
                                color: '#D8C49E',
                                marginBottom: 2,
                                letterSpacing: 0.24,
                                textAlign: 'center'
                            }}
                        >
                            {stat.title}
                        </Text>
                        <Text style={{
                            fontFamily,
                            fontSize: 14,
                            fontWeight: '700',
                            color: '#D8C49E',
                            letterSpacing: 0.28,
                            textAlign: 'center'
                        }}>
                            {stat.value}
                        </Text>
                    </LinearGradient>
                ))}
            </View>
        </View>
    );
};

export default React.memo(PersonalStatsGrid);
