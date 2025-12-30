import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import ScreenBackground from '../../../components/common/ScreenBackground';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';
const horizontalPadding = 20;

const settingsOptions = [
    {
        id: 'hesap',
        title: 'Hesap',
        description: 'Kişisel bilgilerin görüntüle, güncelle ve hesap işlemlerini yönet.',
        route: '/(app)/(services)/hesap',
    },
    {
        id: 'bildirimler',
        title: 'Bildirimler',
        description: 'Namaz vakti, günlük görev ve hatırlatma bildirimlerini düzenle.',
        route: '/(app)/(services)/bildirimler',
    },
    {
        id: 'hakkinda',
        title: 'Hakkında',
        description: 'Takva uygulaması, hukuksal metinler ve sürüm bilgileri.',
        route: '/(app)/(services)/hakkinda',
    },
];

export default function AyarlarScreen() {
    const router = useRouter();

    const handleLogout = () => {
        Alert.alert(
            "Çıkış Yap",
            "Hesabınızdan çıkış yapmak istediğinizden emin misiniz?",
            [
                { text: "İptal", style: "cancel" },
                {
                    text: "Çıkış Yap",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await signOut(auth);
                            router.replace('/(auth)/login');
                        } catch (error) {
                            Alert.alert("Hata", "Çıkış yapılırken bir hata oluştu.");
                        }
                    }
                }
            ]
        );
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
                        PROFİL
                    </Text>
                    <View className="w-9" />
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingHorizontal: horizontalPadding,
                        paddingTop: 24,
                        paddingBottom: 40,
                    }}
                >
                    {/* Settings Section */}
                    <View style={{ marginBottom: 32, alignItems: 'center' }}>
                        <Text
                            style={{
                                fontFamily,
                                fontSize: 16,
                                fontWeight: '700',
                                color: '#FFFFFF',
                                marginBottom: 8,
                                textAlign: 'center',
                            }}
                        >
                            Hesap Ayarları
                        </Text>
                        <Text
                            style={{
                                fontFamily,
                                fontSize: 10,
                                fontWeight: '400',
                                color: 'rgba(255, 255, 255, 0.6)',
                                marginBottom: 24,
                                lineHeight: 13,
                                textAlign: 'center',
                            }}
                        >
                            Hesabını, bildirimleri ve uygulama tercihlerini buradan yönetebilirsin.
                        </Text>

                        {/* Settings List */}
                        <View
                            style={{
                                width: '100%',
                                borderRadius: 15,
                                backgroundColor: 'rgba(24, 39, 35, 0.5)',
                                overflow: 'hidden',
                            }}
                        >
                            {settingsOptions.map((option, index) => (
                                <View key={option.id}>
                                    <TouchableOpacity
                                        onPress={() => router.push(option.route)}
                                        style={{
                                            width: '100%',
                                            paddingVertical: 16,
                                            paddingHorizontal: 16,
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                        activeOpacity={0.7}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                                            <View style={{ flex: 1, marginRight: 12 }}>
                                                <Text
                                                    style={{
                                                        fontFamily,
                                                        fontSize: 16,
                                                        fontWeight: '500',
                                                        color: '#FFFFFF',
                                                        marginBottom: 4,
                                                    }}
                                                >
                                                    {option.title}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontFamily,
                                                        fontSize: 10,
                                                        fontWeight: '400',
                                                        color: 'rgba(255, 255, 255, 0.8)',
                                                    }}
                                                >
                                                    {option.description}
                                                </Text>
                                            </View>
                                        </View>
                                        <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.6)" />
                                    </TouchableOpacity>

                                    {index < settingsOptions.length - 1 && (
                                        <View
                                            style={{
                                                width: '100%',
                                                height: 0.5,
                                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                                marginLeft: 16,
                                            }}
                                        />
                                    )}
                                </View>
                            ))}
                        </View>

                        {/* Logout Button */}
                        <TouchableOpacity
                            onPress={handleLogout}
                            style={{
                                marginTop: 24,
                                width: '100%',
                                backgroundColor: '#FFFFFF',
                                paddingVertical: 12,
                                borderRadius: 12,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            activeOpacity={0.8}
                        >
                            <Text
                                style={{
                                    fontFamily,
                                    fontSize: 14,
                                    fontWeight: '600',
                                    color: '#FF4444',
                                }}
                            >
                                Çıkış Yap
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ScreenBackground>
    );
}
