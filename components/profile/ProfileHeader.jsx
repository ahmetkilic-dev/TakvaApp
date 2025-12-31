import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';

const fontFamily = 'Plus Jakarta Sans';

export const ProfileHeader = ({ name, email, photoURL, onEditPress, role, followerCount, postCount, applicationStatus, bio, socialLinks }) => {
    const isCreator = role === 'creator' || applicationStatus === 'approved';

    // Helper to format large numbers
    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    return (
        <View style={{ marginBottom: 24 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {/* Avatar with Edit Icon */}
                <View style={{ position: 'relative', marginRight: 16 }}>
                    <View
                        style={{
                            width: 88,
                            height: 88,
                            borderRadius: 44,
                            borderWidth: 1.5,
                            borderColor: 'rgba(255, 255, 255, 0.4)',
                            backgroundColor: '#14201D',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}
                    >
                        {photoURL ? (
                            <Image
                                source={{ uri: photoURL }}
                                style={{ width: 88, height: 88, borderRadius: 44 }}
                                contentFit="cover"
                                transition={500}
                            />
                        ) : (
                            <Ionicons name="person" size={44} color="#FFFFFF" />
                        )}
                    </View>

                    {/* Edit Icon Button - Top Right */}
                    {onEditPress && (
                        <TouchableOpacity
                            onPress={onEditPress}
                            activeOpacity={0.8}
                            style={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: 24,
                                height: 24,
                                borderRadius: 12,
                                backgroundColor: '#24322E',
                                borderWidth: 1.5,
                                borderColor: '#FFFFFF',
                                alignItems: 'center',
                                justifyContent: 'center',
                                zIndex: 10
                            }}
                        >
                            <Ionicons name="camera" size={12} color="#FFFFFF" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* User Info */}
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontFamily, fontSize: 22, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 }}>
                        {name || "Misafir Kullanıcı"}
                    </Text>
                    <Text style={{ fontFamily, fontSize: 13, fontWeight: '400', color: 'rgba(255, 255, 255, 0.6)', marginBottom: 6 }}>
                        {email || "Misafir"}
                    </Text>

                    {isCreator && (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontFamily, fontSize: 14, color: 'white', fontWeight: '600' }}>
                                {formatNumber(followerCount || 0)}
                                <Text style={{ fontWeight: '400', color: 'rgba(255,255,255,0.6)' }}> takipçi</Text>
                            </Text>
                            <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.3)', marginHorizontal: 8 }} />
                            <Text style={{ fontFamily, fontSize: 14, color: 'white', fontWeight: '600' }}>
                                {formatNumber(postCount || 0)}
                                <Text style={{ fontWeight: '400', color: 'rgba(255,255,255,0.6)' }}> gönderi</Text>
                            </Text>
                        </View>
                    )}
                </View>
            </View>

            {/* Links (Bio removed as requested for profile.jsx) */}
            {socialLinks && (
                <View style={{ marginTop: 16 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                        {socialLinks.website && (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="link" size={14} color="#4ADE80" style={{ transform: [{ rotate: '-45deg' }], marginRight: 4 }} />
                                <Text style={{ fontFamily, fontSize: 13, color: '#4ADE80' }}>
                                    {socialLinks.website.replace(/^https?:\/\//, '')}
                                </Text>
                            </View>
                        )}
                        {socialLinks.instagram && (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="logo-instagram" size={14} color="rgba(255,255,255,0.6)" style={{ marginRight: 4 }} />
                                <Text style={{ fontFamily, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{socialLinks.instagram}</Text>
                            </View>
                        )}
                        {socialLinks.twitter && (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Ionicons name="logo-twitter" size={14} color="rgba(255,255,255,0.6)" style={{ marginRight: 4 }} />
                                <Text style={{ fontFamily, fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{socialLinks.twitter}</Text>
                            </View>
                        )}
                    </View>
                </View>
            )}
        </View>
    );
};

export default ProfileHeader;
