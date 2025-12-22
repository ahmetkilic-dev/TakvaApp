import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const ProfileProgressBar = ({ progress = 62 }) => {
    return (
        <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
                <LinearGradient
                    colors={['#4ECDC4', '#2EAF9F']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.progressFill, { width: `${progress}%` }]}
                />
                <View style={styles.progressTextContainer}>
                    <Text style={styles.progressText}>%{progress}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    progressContainer: {
        marginBottom: 30,
        paddingHorizontal: 5,
        width: '90%',
        alignSelf: 'center',
    },
    progressBar: {
        height: 32,
        backgroundColor: '#1A2F2A',
        borderRadius: 16,
        overflow: 'hidden',
        position: 'relative',
    },
    progressFill: {
        height: '100%',
        borderRadius: 16,
    },
    progressTextContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#fff',
    },
});

export default ProfileProgressBar;

