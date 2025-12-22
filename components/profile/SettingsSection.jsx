import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsItem = ({ label, onPress }) => {
    return (
        <TouchableOpacity style={styles.settingsItem} onPress={onPress}>
            <Text style={styles.settingsItemText}>{label}</Text>
            <Ionicons name="chevron-forward" size={22} color="#666" />
        </TouchableOpacity>
    );
};

const SettingsSection = ({ onAccountPress, onNotificationsPress, onAboutPress }) => {
    return (
        <View style={styles.settingsSection}>
            <Text style={styles.settingsTitle}>Hesap Ayarları</Text>
            
            <SettingsItem label="Hesap" onPress={onAccountPress} />
            <SettingsItem label="Bildirimler" onPress={onNotificationsPress} />
            <SettingsItem label="Hakkında" onPress={onAboutPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    settingsSection: {
        marginBottom: 25,
    },
    settingsTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 15,
    },
    settingsItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(255,255,255,0.95)',
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderRadius: 14,
        marginBottom: 10,
    },
    settingsItemText: {
        fontSize: 16,
        color: '#1F2937',
        fontWeight: '500',
    },
});

export default SettingsSection;

