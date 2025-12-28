import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const fontFamily = 'Plus Jakarta Sans';

export const ProfileHeader = ({ name, email, photoURL, onEditPress }) => {
    return (
        <View style={{ flexDirection: 'row', marginBottom: 24 }}>
            {/* Avatar */}
            <View
                style={{
                    width: 80, height: 80, borderRadius: 40, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: '#14201D', alignItems: 'center', justifyContent: 'center', marginRight: 12, overflow: 'hidden'
                }}
            >
                {photoURL ? (
                    <Image source={{ uri: photoURL }} style={{ width: 80, height: 80 }} />
                ) : (
                    <Ionicons name="person" size={40} color="#FFFFFF" />
                )}
            </View>

            {/* User Info */}
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ fontFamily, fontSize: 20, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 }}>
                    {name || "Misafir Kullanıcı"}
                </Text>
                <Text style={{ fontFamily, fontSize: 12, fontWeight: '400', color: 'rgba(255, 255, 255, 0.8)', marginBottom: 8 }}>
                    {email || "Giriş yapılmadı"}
                </Text>

                <TouchableOpacity
                    onPress={onEditPress}
                    style={{
                        width: 73, height: 20, borderRadius: 27, borderWidth: 0.5, borderColor: 'rgba(255, 255, 255, 0.5)',
                        backgroundColor: 'rgba(24, 39, 35, 0.8)', alignItems: 'center', justifyContent: 'center',
                    }}
                >
                    <Text style={{ fontFamily, fontSize: 12, fontWeight: '500', color: '#FFFFFF' }}>Düzenle</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProfileHeader;
