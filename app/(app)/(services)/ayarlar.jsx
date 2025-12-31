import { useProfile } from '../../../components/profile/hooks/useProfile';
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

const getSettingsOptions = (role, applicationStatus) => {
    const isCreator = role === 'creator' || applicationStatus === 'approved';
    const options = [
        {
            id: 'hesap',
            title: 'Hesap',
            description: 'Kişisel bilgilerini görüntüle, güncelle ve hesap işlemlerini yönet.',
            route: '/(app)/(services)/hesap',
        },
    ];

    if (isCreator) {
        options.push(
            {
                id: 'creator-edit',
                title: 'Profili düzenle',
                description: 'Kişisel bilgilerini görüntüle, güncelle ve hesap işlemlerini yönet.',
                route: '/(app)/(services)/creator-edit', // Placeholder for now
            },
            {
                id: 'creator-stats',
                title: 'İstatistikler',
                description: 'Kişisel bilgilerini görüntüle, güncelle ve hesap işlemlerini yönet.',
                route: '/(app)/(services)/creator-stats', // Placeholder for now
            }
        );
    }

    options.push(
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
        }
    );

    return options;
};


export default function AyarlarScreen() {
    const router = useRouter();
    const { profileData } = useProfile();
    const settingsOptions = getSettingsOptions(profileData?.role, profileData?.applicationStatus);

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

                {/* Content Title */}
                <View className="items-center mt-4 mb-2 px-10">
                    <Text style={{ fontFamily: 'Plus Jakarta Sans', color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginBottom: 4 }}>Hesap Ayarları</Text>
                    <Text className="text-center" style={{ fontFamily: 'Plus Jakarta Sans', color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '400', lineHeight: 14 }}>
                        Hesabını, bildirimleri ve uygulama tercihlerini buradan yönetebilirsin.
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
                    {/* Settings Section */}
                    <View className="flex-1 rounded-t-[20px] p-5 pt-7 pb-40" style={{ backgroundColor: 'rgba(24, 39, 35, 0.9)' }}>
                        {settingsOptions.map((option, index) => (
                            <View key={option.id} className="mb-4">
                                <TouchableOpacity
                                    onPress={() => router.push(option.route)}
                                    className="flex-row items-center justify-between"
                                    activeOpacity={0.7}
                                >
                                    <View className="flex-1 pr-4">
                                        <Text
                                            style={{
                                                fontFamily,
                                                fontSize: 16,
                                                fontWeight: '500',
                                                color: '#FFFFFF',
                                            }}
                                        >
                                            {option.title}
                                        </Text>
                                        <Text
                                            style={{
                                                fontFamily,
                                                fontSize: 12,
                                                fontWeight: '400',
                                                color: 'rgba(255, 255, 255, 0.6)',
                                                marginTop: 2
                                            }}
                                        >
                                            {option.description}
                                        </Text>
                                    </View>
                                    <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.6)" />
                                </TouchableOpacity>

                                <View className="h-[1px] bg-white/10 mt-4 w-full" />
                            </View>
                        ))}

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
