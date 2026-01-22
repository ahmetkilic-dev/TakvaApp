// app/(auth)/login.jsx
import { View, Text, ImageBackground, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Firebase/Supabase
import { auth } from '../../firebaseConfig';
import { supabase } from '../../lib/supabase';
import { signInWithEmailAndPassword, OAuthProvider, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';

// Apple Auth & Crypto
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';

// Google Auth
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// Görseller
import bgIntro from '../../assets/images/bg-intro-register.png';
import registerLogo from '../../assets/images/register-logo.png';
import appleLogo from '../../assets/images/apple-logo.png';
import googleLogo from '../../assets/images/google-logo.png';

export default function LoginScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const fontStyle = { fontFamily: 'Plus Jakarta Sans' };

  // --- GOOGLE KONFİGÜRASYONU ---
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1063960456618-f5clq2ujmacf5dvaf7efqg6jpc6ie0d9.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const handleIdentifierChange = (text) => {
    if (/^[0-9]/.test(text) && !text.startsWith('+')) {
      setIdentifier('+90' + text);
      return;
    }
    if (text === '+90') { setIdentifier(''); return; }
    setIdentifier(text);
  };

  const handleLogin = async () => {
    if (!identifier || !password) {
      Alert.alert("Eksik Bilgi", "Lütfen giriş bilgilerinizi doldurunuz.");
      return;
    }
    setLoading(true);
    let loginEmail = identifier;
    try {
      if (!identifier.includes('@')) {
        const cleanPhone = identifier.replace(/\s/g, '');
        const { data, error } = await supabase
          .from('profiles')
          .select('email')
          .eq('phone', cleanPhone)
          .single();

        if (data) {
          loginEmail = data.email;
        } else {
          setLoading(false);
          return Alert.alert("Hesap Bulunamadı", "Bu numara ile kayıtlı kullanıcı bulunamadı.");
        }
      }
      await signInWithEmailAndPassword(auth, loginEmail, password);
      setLoading(false);
      router.replace('/(app)/(tabs)/home');
    } catch (error) {
      setLoading(false);
      let msg = "Giriş yapılamadı.";
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password') msg = "Hatalı şifre veya kullanıcı bilgisi.";
      Alert.alert("Hata", msg);
    }
  };

  // --- APPLE İLE GİRİŞ ---
  const handleAppleLogin = async () => {
    try {
      setLoading(true);
      const rawNonce = Math.random().toString(36).substring(2, 10);
      const requestedScopes = [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ];

      const appleCredential = await AppleAuthentication.signInAsync({
        requestedScopes,
        nonce: await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, rawNonce),
      });

      const { identityToken } = appleCredential;
      if (!identityToken) throw new Error("Apple Identity Token bulunamadı.");

      const provider = new OAuthProvider('apple.com');
      const credential = provider.credential({ idToken: identityToken, rawNonce: rawNonce });

      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;

      let fullName = user.displayName;
      if (appleCredential.fullName?.givenName) {
        fullName = `${appleCredential.fullName.givenName} ${appleCredential.fullName.familyName || ''}`.trim();
      }

      const userData = {
        id: user.uid,
        email: user.email,
        name: fullName || "Apple Kullanıcısı",
        role: 'user',
        updated_at: new Date().toISOString()
      };

      await supabase.from('profiles').upsert(userData);
      setLoading(false);
      router.replace('/(app)/(tabs)/home');
    } catch (e) {
      setLoading(false);
      if (e.code !== 'ERR_REQUEST_CANCELED') {
        Alert.alert("Hata", "Apple ile giriş yapılamadı.");
      }
    }
  };

  // --- GOOGLE İLE GİRİŞ ---
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      const userInfo = await GoogleSignin.signIn();
      console.log('GOOGLE USER INFO 👉', userInfo);

      // Bazı sürümlerde idToken direkt userInfo altında, bazılarında userInfo.data altında gelir.
      const idToken = userInfo.data?.idToken || userInfo.idToken;

      if (!idToken) throw new Error('Google ID Token alınamadı');

      const googleCredential = GoogleAuthProvider.credential(idToken);
      const userCredential = await signInWithCredential(auth, googleCredential);
      const user = userCredential.user;

      const userData = {
        id: user.uid,
        email: user.email,
        name: user.displayName || "Google Kullanıcısı",
        role: 'user',
        updated_at: new Date().toISOString(),
      };

      await supabase.from('profiles').upsert(userData);
      setLoading(false);
      router.replace('/(app)/(tabs)/home');

    } catch (error) {
      setLoading(false);

      // Detaylı loglama (Terminalden burayı takip et)
      console.log('DETAYLI HATA KODU:', error.code);
      console.log('HATA MESAJI:', error.message);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return; // Kullanıcı geri çıktı
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert("İşlem Sürüyor", "Giriş işlemi zaten devam ediyor.");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Hata", "Google Play Hizmetleri kullanılamıyor.");
      } else if (error.code === 'DEVELOPER_ERROR') {
        Alert.alert("Yapılandırma Hatası", "SHA-1/SHA-256 kodları veya Paket Adı Firebase/Google Cloud ile eşleşmiyor.");
      } else {
        Alert.alert("Hata", "Google ile giriş yapılamadı: " + error.message);
      }
    }
  };

  const handleNotImplemented = (feature) => { Alert.alert("Yakında", `${feature} özelliği yakında eklenecek.`); };

  return (
    <ImageBackground source={bgIntro} className="flex-1" resizeMode="cover">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} bounces={false}>
          <View className="flex-1 px-6" style={{ paddingTop: insets.top, paddingBottom: insets.bottom + 20 }}>

            <View className="flex-row items-center justify-between mt-2 mb-10">
              <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 active:opacity-60">
                <Ionicons name="chevron-back" size={28} color="white" />
              </TouchableOpacity>
              <View className="flex-1 items-center "><Image source={registerLogo} className="w-32 h-10" resizeMode="contain" /></View>
              <View className="w-8" />
            </View>

            <Text style={fontStyle} className="text-white text-2xl font-bold text-center mb-8 -mt-6">Giriş yap</Text>

            <View className="gap-y-4">
              <TextInput style={fontStyle} placeholder="E-posta veya telefon numarası" placeholderTextColor="#9CA3AF" keyboardType="email-address" autoCapitalize="none" className="w-full bg-[#15221E] border border-white/80 rounded-[10px] px-4 py-4 text-white text-[15px]" value={identifier} onChangeText={handleIdentifierChange} />
              <View className="mb-4">
                <View className="w-full bg-[#15221E] border border-white/80 rounded-[10px] px-4 py-4 flex-row items-center">
                  <TextInput style={{ ...fontStyle, flex: 1 }} placeholder="Şifre" placeholderTextColor="#9CA3AF" secureTextEntry={!showPassword} className="text-white text-[15px]" value={password} onChangeText={setPassword} />
                  <TouchableOpacity onPress={() => setShowPassword(!showPassword)}><Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#9CA3AF" /></TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')} className="mt-4 self-start"><Text style={fontStyle} className="text-white text-[13px] font-medium">Şifremi unuttum</Text></TouchableOpacity>
              </View>
            </View>

            <View className="mt-8 gap-y-4">
              <View className="flex-row w-full gap-3 mb-1">
                {Platform.OS === 'ios' && (
                  <TouchableOpacity onPress={handleAppleLogin} className="flex-1 h-14 bg-[#15221E] border border-white/80 rounded-2xl flex-row overflow-hidden active:opacity-90 shadow-sm">
                    <View className="w-[20%] ml-2 h-full items-center justify-center"><Image source={appleLogo} className="w-7 h-7" resizeMode="contain" /></View>
                    <View className="w-[80%] h-full justify-center pl-1"><Text style={fontStyle} className="text-white font-regular mr-4 text-[12px] leading-tight">Apple ile devam et</Text></View>
                  </TouchableOpacity>
                )}

                <TouchableOpacity
                  onPress={handleGoogleLogin}
                  className={`${Platform.OS === 'ios' ? 'flex-1' : 'w-full'} h-14 bg-[#15221E] border border-white/80 rounded-2xl flex-row overflow-hidden active:opacity-90 shadow-sm`}
                >
                  <View className="w-[20%] h-full ml-2 items-center justify-center"><Image source={googleLogo} className="w-7 h-7" resizeMode="contain" /></View>
                  <View className="w-[80%] h-full justify-center pl-1"><Text style={fontStyle} className="text-white font-regular text-[12px] leading-tight">Google ile devam et</Text></View>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={handleLogin} disabled={loading} className={`w-full py-4 bg-[#15221E] border border-white/80 rounded-[10px] flex-row items-center justify-center active:opacity-90 ${loading ? 'opacity-70' : ''}`}>
                {loading ? <ActivityIndicator color="white" /> : <Text style={fontStyle} className="text-white text-[15px] font-medium">Giriş yap</Text>}
              </TouchableOpacity>
            </View>

            {/* Creator Link - Register ekranından alındı */}
            <View className="items-center mt-4">
              <Text style={fontStyle} className="text-gray-300 text-[12px] text-center mb-1">
                İlham verici İslami içerikler üretmek ister misiniz?
              </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/creator-register')}>
                <Text style={fontStyle} className="text-white font-bold text-sm underline">Başvuru yapın</Text>
              </TouchableOpacity>
            </View>

            <View className="mt-auto pt-6">
              <TouchableOpacity onPress={() => router.push('/(auth)/create-account')} className="w-full py-4 bg-white rounded-[10px] items-center justify-center active:opacity-80 shadow-lg">
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