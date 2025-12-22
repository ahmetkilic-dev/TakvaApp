import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileHeader = ({ userName, userEmail }) => {
    return (
        <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
                <LinearGradient
                    colors={['#2D4A3E', '#1A3A35']}
                    style={styles.avatarGradient}
                >
                    <Ionicons name="person" size={40} color="#4ECDC4" />
                </LinearGradient>
            </View>
            <View style={styles.profileInfo}>
                <Text style={styles.userName}>{userName}</Text>
                <Text style={styles.userEmail}>{userEmail}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    avatarContainer: {
        marginRight: 15,
    },
    avatarGradient: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#3D5A50',
    },
    profileInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 4,
    },
    userEmail: {
        fontSize: 12,
        color: '#9CA3AF',
    },
});

export default ProfileHeader;

