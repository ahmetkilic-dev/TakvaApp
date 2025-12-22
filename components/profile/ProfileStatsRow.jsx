import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileStatsRow = ({ following = 12, badges = 12, premiumStatus = 'Aktif değil' }) => {
    return (
        <View style={styles.statsRow}>
            <View style={styles.statItem}>
                <Text style={styles.statNumber}>{following}</Text>
                <Text style={styles.statLabel}>Takip ettiklerim</Text>
            </View>
            <View style={styles.statItem}>
                <Text style={styles.statNumber}>{badges}</Text>
                <Text style={styles.statLabel}>Rozetlerim</Text>
            </View>
            <View style={styles.statItem}>
                <Text style={styles.statNumberInactive}>{premiumStatus}</Text>
                <Text style={styles.statLabel}>Premium</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statNumber: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    statNumberInactive: {
        fontSize: 14,
        fontWeight: '600',
        color: '#9CA3AF',
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: '#9CA3AF',
    },
});

export default ProfileStatsRow;

