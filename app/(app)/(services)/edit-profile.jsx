import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ScreenBackground from '../../../components/common/ScreenBackground';
import { useUserStats } from '../../../contexts/UserStatsContext';
import { UserService } from '../../../services/UserService';

export default function EditProfileScreen() {
    const router = useRouter();
    const { user, profile, refreshAll } = useUserStats();

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        bio: '',
        website: '',
        instagram: '',
        twitter: ''
    });

    useEffect(() => {
        if (profile) {
            setFormData({
                name: profile.name || user?.displayName || '',
                bio: profile.bio || profile.social_links?.bio || '',
                website: profile.social_links?.website || '',
                instagram: profile.social_links?.instagram || '',
                twitter: profile.social_links?.twitter || ''
            });
        }
    }, [profile, user]);

    const handleSave = async () => {
        if (!user) return;
        setLoading(true);

        try {
            const updates = {
                name: formData.name,
                bio: formData.bio,
                social_links: {
                    website: formData.website,
                    instagram: formData.instagram,
                    twitter: formData.twitter
                },
                updated_at: new Date()
            };

            console.log('[EditProfile] Sending updates:', JSON.stringify(updates, null, 2));

            await UserService.updateProfile(user.uid, updates);
            await refreshAll(); // Update context

            Alert.alert('Başarılı', 'Profil bilgileriniz güncellendi.');
            router.back();
        } catch (error) {
            console.error('Edit Profile Error:', error);
            Alert.alert('Hata', 'Güncelleme sırasında bir sorun oluştu.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScreenBackground>
            <SafeAreaView className="flex-1">
                {/* Header */}
                <View className="flex-row items-center justify-between px-4 py-3 border-b border-white/10">
                    <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center">
                        <Ionicons name="close" size={24} color="#FFF" />
                    </TouchableOpacity>
                    <Text className="text-white font-bold text-lg font-['Plus Jakarta Sans']">Profili Düzenle</Text>
                    <TouchableOpacity
                        onPress={handleSave}
                        disabled={loading}
                        className="w-10 h-10 items-center justify-center"
                    >
                        {loading ? (
                            <ActivityIndicator color="#4ADE80" size="small" />
                        ) : (
                            <Ionicons name="checkmark" size={24} color="#4ADE80" />
                        )}
                    </TouchableOpacity>
                </View>

                <ScrollView className="flex-1 px-5 pt-6">
                    {/* Name */}
                    <View className="mb-6">
                        <Text className="text-white/60 mb-2 font-['Plus Jakarta Sans']">Ad Soyad</Text>
                        <TextInput
                            value={formData.name}
                            onChangeText={(t) => setFormData(prev => ({ ...prev, name: t }))}
                            className="bg-white/5 text-white p-4 rounded-xl font-['Plus Jakarta Sans'] border border-white/10 focus:border-[#4ADE80]"
                            placeholder="Adınız"
                            placeholderTextColor="rgba(255,255,255,0.3)"
                        />
                    </View>

                    {/* Bio */}
                    <View className="mb-6">
                        <Text className="text-white/60 mb-2 font-['Plus Jakarta Sans']">Biyografi</Text>
                        <TextInput
                            value={formData.bio}
                            onChangeText={(t) => setFormData(prev => ({ ...prev, bio: t }))}
                            className="bg-white/5 text-white p-4 rounded-xl font-['Plus Jakarta Sans'] border border-white/10 focus:border-[#4ADE80] h-32"
                            placeholder="Kendinizden bahsedin..."
                            placeholderTextColor="rgba(255,255,255,0.3)"
                            multiline
                            textAlignVertical="top"
                        />
                    </View>

                    <Text className="text-[#D4AF37] font-bold text-lg mb-4 mt-2 font-['Cinzel-Black']">SOSYAL MEDYA</Text>

                    {/* Website */}
                    <View className="mb-4">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="globe-outline" size={16} color="rgba(255,255,255,0.6)" style={{ marginRight: 8 }} />
                            <Text className="text-white/60 font-['Plus Jakarta Sans']">Website</Text>
                        </View>
                        <TextInput
                            value={formData.website}
                            onChangeText={(t) => setFormData(prev => ({ ...prev, website: t }))}
                            className="bg-white/5 text-white p-4 rounded-xl font-['Plus Jakarta Sans'] border border-white/10 focus:border-[#4ADE80]"
                            placeholder="https://..."
                            placeholderTextColor="rgba(255,255,255,0.3)"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Instagram */}
                    <View className="mb-4">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="logo-instagram" size={16} color="rgba(255,255,255,0.6)" style={{ marginRight: 8 }} />
                            <Text className="text-white/60 font-['Plus Jakarta Sans']">Instagram (Kullanıcı adı)</Text>
                        </View>
                        <TextInput
                            value={formData.instagram}
                            onChangeText={(t) => setFormData(prev => ({ ...prev, instagram: t }))}
                            className="bg-white/5 text-white p-4 rounded-xl font-['Plus Jakarta Sans'] border border-white/10 focus:border-[#4ADE80]"
                            placeholder="@kullaniciadi"
                            placeholderTextColor="rgba(255,255,255,0.3)"
                            autoCapitalize="none"
                        />
                    </View>

                    {/* Twitter */}
                    <View className="mb-8">
                        <View className="flex-row items-center mb-2">
                            <Ionicons name="logo-twitter" size={16} color="rgba(255,255,255,0.6)" style={{ marginRight: 8 }} />
                            <Text className="text-white/60 font-['Plus Jakarta Sans']">Twitter / X (Kullanıcı adı)</Text>
                        </View>
                        <TextInput
                            value={formData.twitter}
                            onChangeText={(t) => setFormData(prev => ({ ...prev, twitter: t }))}
                            className="bg-white/5 text-white p-4 rounded-xl font-['Plus Jakarta Sans'] border border-white/10 focus:border-[#4ADE80]"
                            placeholder="@kullaniciadi"
                            placeholderTextColor="rgba(255,255,255,0.3)"
                            autoCapitalize="none"
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ScreenBackground>
    );
}
