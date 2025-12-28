import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const fontFamily = 'Plus Jakarta Sans';

export const AccountSettings = ({ onNavigate }) => {
    const settings = [
        { id: 'hesap', title: 'Hesap', route: '/(app)/(services)/hesap' },
        { id: 'bildirimler', title: 'Bildirimler', route: '/(app)/(services)/bildirimler' },
        { id: 'hakkinda', title: 'Hakkında', route: '/(app)/(services)/hakkinda' },
    ];

    return (
        <View style={{ marginBottom: 32 }}>
            <Text style={{ fontFamily, fontSize: 20, fontWeight: '700', color: '#FFFFFF', marginBottom: 16 }}>
                Hesap Ayarları
            </Text>
            <View style={{
                width: '100%',
                borderRadius: 15,
                borderWidth: 0.5,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: 'rgba(24, 39, 35, 0.5)',
                overflow: 'hidden'
            }}>
                {settings.map((item, index) => (
                    <React.Fragment key={item.id}>
                        <TouchableOpacity
                            onPress={() => onNavigate(item.route)}
                            style={{
                                width: '100%',
                                paddingVertical: 16,
                                paddingHorizontal: 16,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}
                        >
                            <Text style={{ fontFamily, fontSize: 16, fontWeight: '500', color: '#FFFFFF', letterSpacing: 0.32 }}>
                                {item.title}
                            </Text>
                            <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
                        </TouchableOpacity>
                        {index < settings.length - 1 && (
                            <View style={{ width: '100%', height: 0.5, backgroundColor: 'rgba(255, 255, 255, 0.5)', marginLeft: 16 }} />
                        )}
                    </React.Fragment>
                ))}
            </View>
        </View>
    );
};

export default AccountSettings;
