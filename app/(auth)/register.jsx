// app/(auth)/register.jsx
import { View, Text, ImageBackground, Image, TouchableOpacity, ScrollView, Platform, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

// Firebase/Supabase
import { auth } from '../../firebaseConfig';
import { supabase } from '../../lib/supabase';
import { OAuthProvider, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';

// Apple Auth & Crypto
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';

// Google Auth
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

// Resimler
import bgIntro from '../../assets/images/bg-intro.png';
import registerLogo from '../../assets/images/register-logo.png';
import appleLogo from '../../assets/images/apple-logo.png';
import googleLogo from '../../assets/images/google-logo.png';
import userIcon from '../../assets/images/user-icon.png';

export default function RegisterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const fontStyle = { fontFamily: 'Plus Jakarta Sans' };
  const [loading, setLoading] = useState(false);

  // --- GOOGLE KONFİGÜRASYONU ---
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1063960456618-f5clq2ujmacf5dvaf7efqg6jpc6ie0d9.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

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
      console.log('Google Sign-In Error:', error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        return;
      } else if (error.code === statusCodes.IN_PROGRESS) {
        Alert.alert("İşlem Sürüyor", "Giriş işlemi zaten devam ediyor.");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert("Hata", "Google Play Hizmetleri kullanılamıyor.");
      } else {
        Alert.alert("Hata", "Google ile giriş yapılamadı.");
      }
    }
  };

  return (
    <ImageBackground
      source={bgIntro}
      className="flex-1"
      resizeMode="cover"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* SafeArea */}
        <View
          className="flex-1 px-6 justify-between"
          style={{
            paddingTop: insets.top + 5,
            paddingBottom: insets.bottom + 5
          }}
        >

          {/* --- ÜST KISIM --- */}
          <View className="w-full mt-4">

            {/* Header Satırı: Geri Butonu + Logo + Boşluk */}
            <View className="flex-row items-center justify-between mb-4">
              <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 active:opacity-60">
                <Ionicons name="chevron-back" size={28} color="white" />
              </TouchableOpacity>

              <Image
                source={registerLogo}
                className="w-32 h-14"
                resizeMode="contain"
              />

              {/* Dengeli durması için boş view */}
              <View className="w-8" />
            </View>

            <View className="w-full px-2">
              <Text
                className="text-white text-center text-[18px] font-light italic leading-7 drop-shadow-md opacity-95"
              >
                Allah katında en üstün olanınız, takva {'\n'}bakımından en ileri olanınızdır.
              </Text>

              <Text
                style={fontStyle}
                className="text-white text-right text-[14px] font-extrabold mt-3 drop-shadow-md"
              >
                Hucurat Suresi 13. Ayet
              </Text>
            </View>
          </View>

          {/* --- BUTONLAR --- */}
          <View className="w-full pt-8">

            {/* 1. Satır: Apple ve Google */}
            <View className="flex-row w-full gap-3 mb-4">

              {/* Apple Butonu (Sadece iOS) */}
              {Platform.OS === 'ios' && (
                <TouchableOpacity
                  onPress={handleAppleLogin}
                  disabled={loading}
                  className={`flex-1 h-14 bg-[#15221E] border border-white/80 rounded-2xl flex-row overflow-hidden active:opacity-90 shadow-sm ${loading ? 'opacity-70' : ''}`}
                >
                  <View className="w-[20%] ml-2 h-full items-center justify-center">
                    {loading ? <ActivityIndicator color="white" size="small" /> : <Image source={appleLogo} className="w-7 h-7" resizeMode="contain" />}
                  </View>
                  <View className="w-[80%] h-full justify-center pl-1">
                    <Text style={fontStyle} className="text-white font-regular mr-4 text-[12px] leading-tight">
                      Apple ile devam et
                    </Text>
                  </View>
                </TouchableOpacity>
              )}


              {/* Google Butonu */}
              <TouchableOpacity
                onPress={handleGoogleLogin}
                disabled={loading}
                className={`${Platform.OS === 'ios' ? 'flex-1' : 'w-full'} h-14 bg-[#15221E] border border-white/80 rounded-2xl flex-row overflow-hidden active:opacity-90 shadow-sm ${loading ? 'opacity-70' : ''}`}
              >
                <View className="w-[20%] h-full ml-2 items-center justify-center">
                  {loading && Platform.OS !== 'ios' ? <ActivityIndicator color="white" size="small" /> : <Image source={googleLogo} className="w-7 h-7" resizeMode="contain" />}
                </View>

                <View className="w-[80%] h-full justify-center pl-1">
                  <Text style={fontStyle} className="text-white font-regular text-[12px] leading-tight">
                    Google ile devam et
                  </Text>
                </View>

              </TouchableOpacity>

            </View>

            {/* 2. Satır: Hesap Oluştur Butonu (GÜNCELLENDİ) */}
            {/* relative: İkonu absolute ile konumlandırmak için gerekli.
                justify-center items-center: Text'i tam ortaya almak için gerekli.
            */}
            <TouchableOpacity
              onPress={() => router.push('/(auth)/create-account')}
              className="w-full h-14 bg-[#15221E] border border-white/80 rounded-2xl flex-row items-center justify-center relative mb-8 active:opacity-90 shadow-md"
            >
              {/* İKON: Sola Yaslı (Absolute) 
                   left-6 veya left-8 üstteki butonların ikon hizasına denk gelir.
               */}
              <Image
                source={userIcon}
                className="w-7 h-7 absolute left-3"
                resizeMode="contain"
                style={{ tintColor: 'white' }}
              />

              {/* TEXT: Tam Ortada */}
              <Text style={fontStyle} className="text-white font-regular text-[16px]">
                Hesap Oluştur
              </Text>
            </TouchableOpacity>

            {/* Alt Footer */}
            <View className="items-center mt-auto pb-6">
              <Text style={fontStyle} className="text-gray-300 text-[12px] text-center mb-1">
                İlham verici İslami içerikler üretmek ister misiniz?
              </Text>
              <TouchableOpacity onPress={() => router.push('/(auth)/creator-register')}>
                <Text style={fontStyle} className="text-white font-bold text-sm underline">Başvuru yapın</Text>
              </TouchableOpacity>
            </View>

          </View>

        </View>
      </ScrollView>
      <StatusBar style="light" />
    </ImageBackground>
  );
}