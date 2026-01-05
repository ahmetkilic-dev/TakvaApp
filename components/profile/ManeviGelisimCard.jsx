import React from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Image } from 'expo-image';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const horizontalPadding = 20;
const cardWidth = SCREEN_WIDTH - (horizontalPadding * 2);

const fontFamily = 'Plus Jakarta Sans';

import { useRouter } from 'expo-router';

export default function ManeviGelisimCard() {
    const router = useRouter();
    return (
        <View style={{ width: '100%', marginBottom: 24 }}>
            <LinearGradient
                colors={['rgba(255, 255, 255, 0.3)', 'rgba(207, 155, 71, 0.3)']}
                locations={[0.0188, 1]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={{
                    width: '100%',
                    minHeight: 160,
                    borderRadius: 25,
                    padding: 20,
                    borderWidth: 0.5,
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    position: 'relative',
                    overflow: 'hidden',
                    justifyContent: 'space-between'
                }}
            >
                {/* Background Pattern - Optional, using a subtle gradient overlay for now */}
                <LinearGradient
                    colors={['rgba(255,255,255,0.05)', 'transparent']}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '100%' }}
                />

                {/* Content Container */}
                <View style={{ flex: 1 }}>
                    {/* Title */}
                    <Text style={{
                        fontFamily,
                        fontSize: 20,
                        fontWeight: '700',
                        color: '#FFFFFF',
                        marginBottom: 8
                    }}>
                        Manevi Gelişim Analizi
                    </Text>

                    <View style={{ height: 0.5, backgroundColor: 'rgba(255, 255, 255, 0.5)', marginBottom: 8 }} />

                    {/* Description Text */}
                    <Text style={{
                        fontFamily,
                        fontSize: 10,
                        fontWeight: '400',
                        color: 'rgba(255, 255, 255, 0.8)',
                        lineHeight: 14
                    }}>
                        Namaz istikrarından okuduğun ayetlere, çektiğin zikirlerden ilim yolundaki doğru cevaplarına kadar tüm manevi yolculuğunu günlük, haftalık ve aylık raporlarla takip et. Gelişimini verilerle gör, takvanı disiplinle büyüt.
                    </Text>
                </View>

                {/* Button */}
                <View style={{ width: '100%', alignItems: 'flex-end', marginTop: 10 }}>
                    <TouchableOpacity
                        onPress={() => router.push('/(app)/(services)/manevi-analiz')}
                        style={{
                            width: 122,
                            height: 26,
                            borderRadius: 16,
                            borderWidth: 0.5,
                            borderColor: '#FFFFFF',
                            backgroundColor: 'rgba(217, 217, 217, 0.2)',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Text style={{
                            fontFamily,
                            fontSize: 10,
                            fontWeight: '600',
                            color: '#FFFFFF'
                        }}>
                            Detaylı Raporu İncele
                        </Text>
                    </TouchableOpacity>
                </View>

            </LinearGradient>
        </View>
    );
}
