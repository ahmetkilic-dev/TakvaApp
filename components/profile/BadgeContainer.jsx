import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const DEFAULT_BADGES = [
    { id: 1, icon: 'book-open-variant', color: '#8B4513' },
    { id: 2, icon: 'moon-waning-crescent', color: '#4ECDC4' },
    { id: 3, icon: 'map-marker', color: '#4ECDC4' },
    { id: 4, icon: 'star-four-points', color: '#D4AF37' },
    { id: 5, icon: 'weather-night', color: '#4ECDC4' },
];

const BadgeContainer = ({ badges = DEFAULT_BADGES }) => {
    return (
        <View style={styles.badgeContainer}>
            {badges.map((badge) => (
                <View key={badge.id} style={styles.badgeItem}>
                    <MaterialCommunityIcons name={badge.icon} size={28} color={badge.color} />
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    badgeContainer: {
        width: '90%',
        height: 50,
        backgroundColor: 'rgba(24, 39, 35, 0.8)',
        borderRadius: 10,
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginVertical: 15,
    },
    badgeItem: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default BadgeContainer;

