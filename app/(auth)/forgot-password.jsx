import { View, Text, ImageBackground, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebaseConfig';

// Görseller
import bgIntro from '../../assets/images/bg-intro-register.png';
import registerLogo from '../../assets/images/register-logo.png';

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    const fontStyle = { fontFamily: 'Plus Jakarta Sans' };

    const handleSendResetLink = async () => {
        if (!email) {
            Alert.alert("Eksik Bilgi", "Lütfen e-posta adresinizi giriniz.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert("Geçersiz E-posta", "Lütfen geçerli bir e-posta adresi giriniz.");
            return;
        }

        setLoading(true);
        try {
            // Standart Firebase Web Akışı:
            await sendPasswordResetEmail(auth, email);

            Alert.alert(
                "Bağlantı Gönderildi",
                "E-posta adresinize şifre sıfırlama bağlantısı gönderildi.\n\nLinke tıkladığınızda açılan sayfada yeni şifrenizi belirleyebilirsiniz.",
                [{ text: "Tamam, Giriş'e Dön", onPress: () => router.back() }]
            );
        } catch (error) {
            console.log("Firebase Error:", error);
            let msg = "Gönderilemedi.";
            if (error.code === 'auth/user-not-found') msg = "Bu e-posta adresiyle kayıtlı kullanıcı bulunamadı.";
            if (error.code === 'auth/invalid-email') msg = "Geçersiz e-posta adresi.";
            Alert.alert("Hata", msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground source={bgIntro} className="flex-1" resizeMode="cover">
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} bounces={false}>
                    <View className="flex-1 px-6" style={{ paddingTop: insets.top, paddingBottom: insets.bottom + 20 }}>

                        {/* Header */}
                        <View className="flex-row items-center justify-between mt-2 mb-10">
                            <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 active:opacity-60">
                                <Ionicons name="chevron-back" size={28} color="white" />
                            </TouchableOpacity>
                            <View className="flex-1 items-center ">
                                <Image source={registerLogo} className="w-32 h-10" resizeMode="contain" />
                            </View>
                            <View className="w-8" />
                        </View>

                        <Text style={fontStyle} className="text-white text-2xl font-bold text-center mb-2 -mt-6">
                            Şifremi Unuttum
                        </Text>
                        <Text style={fontStyle} className="text-gray-300 text-sm text-center mb-8 px-4">
                            E-posta adresinizi girin, size şifrenizi sıfırlamanız için bir bağlantı gönderelim.
                        </Text>

                        <View className="gap-y-4">
                            <TextInput
                                style={fontStyle}
                                placeholder="E-posta adresiniz"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                className="w-full bg-[#15221E] border border-white/80 rounded-[10px] px-4 py-4 text-white text-[15px]"
                                value={email}
                                onChangeText={setEmail}
                            />
                            <TouchableOpacity
                                onPress={handleSendResetLink}
                                disabled={loading}
                                className={`w-full py-4 bg-white rounded-[10px] flex-row items-center justify-center active:opacity-90 mt-4 shadow-lg ${loading ? 'opacity-70' : ''}`}
                            >
                                {loading ? <ActivityIndicator color="black" /> : <Text style={fontStyle} className="text-black text-[15px] font-medium">Bağlantı Gönder</Text>}
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
            <StatusBar style="light" />
        </ImageBackground>
    );
}
