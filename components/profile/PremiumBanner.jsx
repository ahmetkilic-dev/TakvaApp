import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const fontFamily = 'Plus Jakarta Sans';

export const PremiumBanner = ({ onPress, isPremium }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: '100%',
                height: 55,
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: 'rgba(207, 155, 71, 0.5)',
                overflow: 'visible',
                marginBottom: 32
            }}
        >
            <LinearGradient
                colors={['#0A2345', '#0C2F3B', '#0E3537', '#0F3B32']}
                start={{ x: 1, y: 0 }}
                end={{ x: 0, y: 0 }}
                style={{
                    flex: 1,
                    padding: 16,
                    paddingVertical: 14,
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderRadius: 10,
                    shadowColor: '#FFFFFF',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.25,
                    shadowRadius: 10,
                    elevation: 10
                }}
            >
                <Image source={require('../../assets/images/bg-intro-icon.png')} style={{ width: 24, height: 24, marginRight: 12 }} resizeMode="contain" />
                <View style={{ flex: 1 }}>
                    <Text style={{
                        fontFamily: 'Cinzel-Bold',
                        fontSize: 20,
                        fontWeight: '700',
                        color: '#CF9B47',
                        marginBottom: 4,
                        textShadowColor: 'rgba(255, 255, 255, 0.25)',
                        textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 10
                    }}>
                        TAKVA PREMİUM
                    </Text>
                    <Text style={{
                        fontFamily,
                        fontSize: 12,
                        fontWeight: '500',
                        color: 'rgba(255, 255, 255, 0.8)',
                        lineHeight: 16
                    }}
                        numberOfLines={1}
                        adjustsFontSizeToFit={true}
                        minimumFontScale={0.8}
                    >
                        {isPremium ? 'Tüm ayrıcalıklardan yararlanıyorsun.' : 'Daha fazla özellik ve reklamsız deneyim için Premium\'u keşfet.'}
                    </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#CF9B47" />
            </LinearGradient>
        </TouchableOpacity>
    );
};

export default PremiumBanner;
