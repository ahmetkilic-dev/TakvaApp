import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const LogoutButton = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.logoutButton} onPress={onPress}>
            <Text style={styles.logoutButtonText}>Çıkış yap</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    logoutButton: {
        alignSelf: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1.5,
        borderColor: '#EF4444',
        borderRadius: 25,
        paddingVertical: 14,
        paddingHorizontal: 50,
        marginTop: 5,
    },
    logoutButtonText: {
        fontSize: 16,
        color: '#EF4444',
        fontWeight: '600',
    },
});

export default LogoutButton;

