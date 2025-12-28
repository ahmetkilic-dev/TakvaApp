import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const fontFamily = 'Plus Jakarta Sans';

export const LogoutButton = ({ onLogout }) => {
    return (
        <View style={{ width: '100%', alignItems: 'center', marginBottom: 32 }}>
            <TouchableOpacity
                onPress={onLogout}
                style={{
                    width: 119,
                    height: 30,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#FFFFFF',
                    backgroundColor: '#FFFFFF',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={{ fontFamily, fontSize: 14, fontWeight: '500', color: '#E74C3C', letterSpacing: 0.28 }}>
                    Çıkış yap
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default LogoutButton;
