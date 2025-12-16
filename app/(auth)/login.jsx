// app/(auth)/login.jsx
import { View, Text, ImageBackground, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Firebase
import { auth } from '../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

// Görseller
import bgIntro from '../../assets/images/bg-intro-register.png';
import registerLogo from '../../assets/images/register-logo.png';
import appleLogo from '../../assets/images/apple-logo.png';
import googleLogo from '../../assets/images/google-logo.png';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fontStyle = { fontFamily: 'Plus Jakarta Sans' };

  // --- GİRİŞ FONKSİYONU ---
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Eksik Bilgi", "Lütfen e-posta ve şifrenizi giriniz.");
      return;
    }
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      router.replace('/(tabs)/home'); 
    } catch (error) {
      setLoading(false);
      let msg = "Giriş yapılamadı.";
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') msg = "E-posta veya şifre hatalı.";
      if (error.code === 'auth/invalid-email') msg = "Geçersiz e-posta formatı.";
      Alert.alert("Hata", msg);
    }
  };

  const handleNotImplemented = (feature) => {
    Alert.alert("Yakında", `${feature} özelliği yakında eklenecek.`);
  };

  return (
    <ImageBackground source={bgIntro} className="flex-1" resizeMode="cover">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} bounces={false}>
          <View 
            className="flex-1 px-6"
            style={{ paddingTop: insets.top, paddingBottom: insets.bottom + 20 }}
          >
            
            {/* --- HEADER (GERİ VE LOGO AYNI HİZADA) --- */}
            <View className="flex-row items-center justify-between mt-2 mb-10">
              <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 active:opacity-60">
                <Ionicons name="chevron-back" size={28} color="white" />
              </TouchableOpacity>
              
              {/* Logo ve Başlık (Ortalama) */}
              <View className="flex-1 items-center ">
                 <Image source={registerLogo} className="w-32 h-10" resizeMode="contain" />
              </View>
              <View className="w-8" />
            </View>

            <Text style={fontStyle} className="text-white text-2xl font-bold text-center mb-8 -mt-6">
                Giriş yap
            </Text>

            {/* --- FORM ALANI --- */}
            <View className="gap-y-4">
                {/* E-posta */}
                <TextInput 
                  style={fontStyle}
                  placeholder="E-posta veya telefon numarası"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="w-full bg-[#15221E] border border-white/80 rounded-[10px] px-4 py-4 text-white text-[15px]"
                  value={email}
                  onChangeText={setEmail}
                />

                {/* Şifre Grubu */}
                <View className="mb-4">
                    <View className="w-full bg-[#15221E] border border-white/80 rounded-[10px] px-4 py-4 flex-row items-center">
                        <TextInput 
                            style={{...fontStyle, flex: 1}}
                            placeholder="Şifre"
                            placeholderTextColor="#9CA3AF"
                            secureTextEntry={!showPassword}
                            className="text-white text-[15px]"
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#9CA3AF" />
                        </TouchableOpacity>
                    </View>
                    
                    {/* Şifremi Unuttum */}
                    <TouchableOpacity onPress={() => handleNotImplemented('Şifre Sıfırlama')} className="mt-4 self-start">
                        <Text style={fontStyle} className="text-white text-[13px] font-medium">Şifremi unuttum</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* --- ORTA BUTONLAR (Sosyal + Giriş) --- */}
            <View className="mt-8 gap-y-4"> 
                
                {/* 1. SIRA: APPLE VE GOOGLE BUTONLARI (YENİ TASARIM) */}
                <View className="flex-row w-full gap-3 mb-1">
                    
                    {/* Apple Butonu */}
                    <TouchableOpacity 
                        onPress={() => handleNotImplemented('Apple')}
                        className="flex-1 h-14 bg-[#15221E] border border-white/80 rounded-2xl flex-row overflow-hidden active:opacity-90 shadow-sm"
                    >
                        
                        {/* SOL %20: İKON ALANI */}
                        <View className="w-[20%] ml-2 h-full items-center justify-center">
                            <Image source={appleLogo} className="w-7 h-7" resizeMode="contain" />
                        </View>

                        {/* SAĞ %80: TEXT ALANI */}
                        <View className="w-[80%] h-full justify-center pl-1">
                            <Text style={fontStyle} className="text-white font-regular mr-4 text-[12px] leading-tight">
                                Apple ile devam et
                            </Text>
                        </View>

                    </TouchableOpacity>


                    {/* Google Butonu */}
                    <TouchableOpacity 
                         onPress={() => handleNotImplemented('Google')}
                        className="flex-1 h-14 bg-[#15221E] border border-white/80 rounded-2xl flex-row overflow-hidden active:opacity-90 shadow-sm"
                    >
                        
                        {/* SOL %20: İKON ALANI */}
                        <View className="w-[20%] h-full ml-2 items-center justify-center">
                            <Image source={googleLogo} className="w-7 h-7" resizeMode="contain" />
                        </View>

                        {/* SAĞ %80: TEXT ALANI */}
                        <View className="w-[80%] h-full justify-center pl-1">
                            <Text style={fontStyle} className="text-white font-regular text-[12px] leading-tight">
                                Google ile devam et
                            </Text>
                        </View>

                    </TouchableOpacity>

                </View>
                {/* 1. SIRA BİTİŞİ */}
                
                {/* 2. SIRA: Ana Giriş Butonu */}
                <TouchableOpacity 
                    onPress={handleLogin}
                    disabled={loading}
                    className={`w-full py-4 bg-[#15221E] border border-white/80 rounded-[10px] flex-row items-center justify-center active:opacity-90 ${loading ? 'opacity-70' : ''}`}
                >
                    {loading ? (
                        <ActivityIndicator color="white" />
                    ) : (
                        <Text style={fontStyle} className="text-white text-[15px] font-medium">Giriş yap</Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* --- ALT BUTON (Yeni Hesap) --- */}
            <View className="mt-auto pt-6">
                <TouchableOpacity 
                    onPress={() => router.push('/create-account')}
                    className="w-full py-4 bg-white rounded-[10px] items-center justify-center active:opacity-80 shadow-lg"
                >
                  <Text style={fontStyle} className="text-black font-regular text-[15px]">Yeni hesap oluştur</Text>
                </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style="light" />
    </ImageBackground>
  );
}