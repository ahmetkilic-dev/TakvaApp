import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const fontFamily = 'Plus Jakarta Sans';

export const ProfileHeader = ({ name, email, photoURL, onEditPress, role, followerCount, postCount, applicationStatus }) => {
    const isCreator = role === 'creator' || applicationStatus === 'approved';

    // Helper to format large numbers
    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    return (
        <View style={{ flexDirection: 'row', marginBottom: 24, alignItems: 'center' }}>
            {/* Avatar with Edit Icon */}
            <View style={{ position: 'relative', marginRight: 12 }}>
                <View
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: 40,
                        borderWidth: 1.5,
                        borderColor: 'rgba(255, 255, 255, 0.4)',
                        backgroundColor: '#14201D',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }}
                >
                    {photoURL ? (
                        <Image source={{ uri: photoURL }} style={{ width: 80, height: 80 }} />
                    ) : (
                        <Ionicons name="person" size={40} color="#FFFFFF" />
                    )}
                </View>

                {/* Edit Icon Button */}
                <TouchableOpacity
                    onPress={onEditPress}
                    activeOpacity={0.8}
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        width: 22,
                        height: 22,
                        borderRadius: 11,
                        backgroundColor: '#24322E',
                        borderWidth: 1.5,
                        borderColor: '#FFFFFF',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10
                    }}
                >
                    <Ionicons name="pencil" size={10} color="#FFFFFF" />
                </TouchableOpacity>
            </View>

            {/* User Info */}
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <Text style={{ fontFamily, fontSize: 20, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 }}>
                    {name || "Misafir Kullanıcı"}
                </Text>
                <Text style={{ fontFamily, fontSize: 12, fontWeight: '400', color: 'rgba(255, 255, 255, 0.6)', marginBottom: isCreator ? 4 : 0 }}>
                    {email || "Giriş yapılmadı"}
                </Text>

                {isCreator && (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{
                            fontFamily,
                            fontSize: 14,
                            fontWeight: '400',
                            color: 'rgba(255, 255, 255, 0.8)',
                            letterSpacing: -0.28 // -2% of 14px
                        }}>
                            {formatNumber(followerCount || 0)} takipçi
                        </Text>
                        <View style={{ width: 0.5, height: 16, backgroundColor: '#FFFFFF', marginHorizontal: 8, opacity: 0.3 }} />
                        <Text style={{
                            fontFamily,
                            fontSize: 14,
                            fontWeight: '400',
                            color: 'rgba(255, 255, 255, 0.8)',
                            letterSpacing: -0.28
                        }}>
                            {formatNumber(postCount || 0)} gönderi
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );
};

export default ProfileHeader;
