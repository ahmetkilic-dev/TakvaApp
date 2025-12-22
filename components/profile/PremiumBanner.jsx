import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const PremiumBanner = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.premiumBanner} onPress={onPress}>
            <LinearGradient
                colors={['#1A3A35', '#2D4A3E']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.premiumGradient}
            >
                <View style={styles.premiumLeft}>
                    <View style={styles.premiumIconContainer}>
                        <MaterialCommunityIcons name="moon-waning-crescent" size={30} color="#4ECDC4" />
                    </View>
                    <View style={styles.premiumTextContainer}>
                        <Text style={styles.premiumTitle}>
                            <Text style={styles.premiumTakva}>TAKVA </Text>
                            <Text style={styles.premiumWord}>PREMİUM</Text>
                        </Text>
                        <Text style={styles.premiumSubtitle}>
                            Daha fazla özellik ve reklamsız deneyim için Premium'u keşfet.
                        </Text>
                    </View>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#4ECDC4" />
            </LinearGradient>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    premiumBanner: {
        marginBottom: 30,
        borderRadius: 16,
        overflow: 'hidden',
    },
    premiumGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    premiumLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    premiumIconContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(78, 205, 196, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    premiumTextContainer: {
        flex: 1,
    },
    premiumTitle: {
        marginBottom: 4,
    },
    premiumTakva: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
    },
    premiumWord: {
        fontSize: 18,
        fontWeight: '700',
        color: '#D4AF37',
    },
    premiumSubtitle: {
        fontSize: 12,
        color: '#9CA3AF',
        lineHeight: 18,
    },
});

export default PremiumBanner;

