import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useUserStats } from '../../../contexts/UserStatsContext';
import { UserStatsService } from '../../../services/UserStatsService';
import ScreenBackground from '../../../components/common/ScreenBackground';

const fontFamily = 'Plus Jakarta Sans';

export default function SocialMediaScreen() {
    const router = useRouter();
    const { user, stats } = useUserStats();
    const [isTracking, setIsTracking] = useState(false);

    const handleSocialPress = async (platform, url) => {
        // Linki her zaman aç, ama tracking sadece ilk seferde yap
        const shouldTrack = !isTracking && !stats.followed_social;

        try {
            if (shouldTrack) setIsTracking(true);

            const canOpen = await Linking.canOpenURL(url);

            if (canOpen) {
                await Linking.openURL(url);

                // Sadece görev tamamlanmadıysa tracking yap
                if (shouldTrack && user?.uid) {
                    setTimeout(async () => {
                        await UserStatsService.setField(user.uid, 'followed_social', true);
                        await UserStatsService.updateAppBadges(user.uid);

                        Alert.alert(
                            '✅ Görev Tamamlandı!',
                            'Sosyal medya görevini tamamladın. Teşekkürler!',
                            [{ text: 'Tamam', onPress: () => router.back() }]
                        );
                        setIsTracking(false);
                    }, 3000);
                }
            } else {
                if (shouldTrack) setIsTracking(false);
                Alert.alert('Hata', `${platform} açılamadı. Lütfen uygulamanın yüklü olduğundan emin ol.`);
            }
        } catch (error) {
            if (shouldTrack) setIsTracking(false);
            Alert.alert('Hata', 'Bir hata oluştu. Lütfen tekrar dene.');
        }
    };

    return (
        <ScreenBackground>
            <SafeAreaView edges={['top']} className="flex-1">
                {/* Header */}
                <View className="flex-row items-center justify-between px-4 pt-2 pb-2">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-9 h-9 items-center justify-center"
                    >
                        <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text
                        style={{
                            fontFamily: 'Cinzel-Black',
                            color: '#FFFFFF',
                            fontSize: 24,
                            textAlign: 'center',
                            letterSpacing: -2,
                        }}
                    >
                        SOSYAL MEDYA
                    </Text>
                    <View className="w-9" />
                </View>

                {/* Content Title */}
                <View className="items-center mt-4 mb-2 px-10">
                    <Text style={{ fontFamily, color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginBottom: 4 }}>
                        Takva'yı Takip Et
                    </Text>
                    <Text className="text-center" style={{ fontFamily, color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '400', lineHeight: 14 }}>
                        Sosyal medyada bizi takip ederek güncel içeriklerden haberdar ol ve topluluğumuza katıl.
                    </Text>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    overScrollMode="never"
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingTop: 12,
                    }}
                >
                    {/* Content Section */}
                    <View className="flex-1 rounded-t-[20px] p-5 pt-7 pb-20" style={{ backgroundColor: 'rgba(24, 39, 35, 0.9)' }}>

                        {/* Social Media Buttons */}
                        <View className="flex-row justify-center gap-4 mb-8">
                            {/* Instagram */}
                            <TouchableOpacity
                                onPress={() => handleSocialPress('Instagram', 'https://www.instagram.com/takva.app/')}
                            >
                                <LinearGradient
                                    colors={['#E1306C', '#FD1D1D', '#F77737']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 40,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        opacity: stats.followed_social ? 0.7 : 1,
                                    }}
                                >
                                    <Ionicons name="logo-instagram" size={40} color="#FFFFFF" />
                                </LinearGradient>
                                <Text style={{ fontFamily, fontSize: 12, fontWeight: '600', color: '#FFFFFF', textAlign: 'center', marginTop: 8 }}>
                                    Instagram
                                </Text>
                            </TouchableOpacity>

                            {/* TikTok */}
                            <TouchableOpacity
                                onPress={() => handleSocialPress('TikTok', 'https://www.tiktok.com/@takva.app')}
                            >
                                <LinearGradient
                                    colors={['#000000', '#00F2EA']}
                                    start={{ x: 0, y: 0 }}
                                    end={{ x: 1, y: 1 }}
                                    style={{
                                        width: 80,
                                        height: 80,
                                        borderRadius: 40,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        opacity: stats.followed_social ? 0.7 : 1,
                                    }}
                                >
                                    <Ionicons name="logo-tiktok" size={40} color="#FFFFFF" />
                                </LinearGradient>
                                <Text style={{ fontFamily, fontSize: 12, fontWeight: '600', color: '#FFFFFF', textAlign: 'center', marginTop: 8 }}>
                                    TikTok
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Info Box */}
                        {!stats.followed_social && (
                            <View
                                className="flex-row p-4 rounded-xl mb-4"
                                style={{
                                    backgroundColor: 'rgba(96, 165, 250, 0.1)',
                                    borderWidth: 1,
                                    borderColor: 'rgba(96, 165, 250, 0.2)',
                                    gap: 12,
                                }}
                            >
                                <Ionicons name="information-circle" size={20} color="#60A5FA" />
                                <Text
                                    className="flex-1"
                                    style={{
                                        fontFamily,
                                        fontSize: 14,
                                        fontWeight: '400',
                                        color: 'rgba(255,255,255,0.8)',
                                        lineHeight: 20
                                    }}
                                >
                                    Herhangi bir sosyal medya butonuna tıkladıktan sonra sayfamız açılacak.
                                    Sayfa açıldıktan 3 saniye sonra görev otomatik olarak tamamlanacak.
                                </Text>
                            </View>
                        )}

                        {/* Completed Message */}
                        {stats.followed_social && (
                            <View
                                className="flex-row items-center p-4 rounded-xl"
                                style={{
                                    backgroundColor: 'rgba(74, 222, 128, 0.1)',
                                    borderWidth: 1,
                                    borderColor: 'rgba(74, 222, 128, 0.2)',
                                    gap: 12,
                                }}
                            >
                                <Ionicons name="checkmark-circle" size={24} color="#4ADE80" />
                                <Text
                                    className="flex-1"
                                    style={{
                                        fontFamily,
                                        fontSize: 16,
                                        fontWeight: '600',
                                        color: '#4ADE80'
                                    }}
                                >
                                    Bu görevi tamamladın! Teşekkürler 🎉
                                </Text>
                            </View>
                        )}

                    </View>
                </ScrollView>
            </SafeAreaView>
        </ScreenBackground>
    );
}
