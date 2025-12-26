// app/(auth)/login.jsx
import { View, Text, ImageBackground, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Firebase
import { auth, db } from '../../firebaseConfig';
import { signInWithEmailAndPassword, OAuthProvider, signInWithCredential } from 'firebase/auth';
// GÜNCELLEME 1: doc, setDoc ve serverTimestamp eklendi
import { collection, query, where, getDocs, doc, setDoc, serverTimestamp } from 'firebase/firestore';

// Apple Auth & Crypto
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Crypto from 'expo-crypto';

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

  // Görsel olarak +90 ekle (Kullanıcıya kolaylık olsun diye)
  const handleIdentifierChange = (text) => {
    if (/^[0-9]/.test(text) && !text.startsWith('+')) {
        setIdentifier('+90' + text); // Boşluksuz ekliyoruz
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
      // 1. ADIM: Eğer telefon numarası girildiyse (içinde @ yoksa)
      if (!identifier.includes('@')) {
        
        // TELEFON TEMİZLEME: Sorgu yapmadan önce boşlukları sil
        const cleanPhone = identifier.replace(/\s/g, ''); 
        
        // Firestore'da temizlenmiş numarayı ara
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("phone", "==", cleanPhone));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDoc = querySnapshot.docs[0].data();
          loginEmail = userDoc.email;
        } else {
          setLoading(false);
          return Alert.alert("Hesap Bulunamadı", "Bu telefon numarası ile kayıtlı bir kullanıcı bulunamadı. Lütfen numarayı kontrol edin veya yeni hesap oluşturun.");
        }
      }

      // 2. ADIM: Giriş Yap
      await signInWithEmailAndPassword(auth, loginEmail, password);
      
      setLoading(false);
      router.replace('/(app)/(tabs)/home'); 

    } catch (error) {
      setLoading(false);
      let msg = "Giriş yapılamadı.";
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') msg = "Hatalı şifre veya kullanıcı bilgisi.";
      if (error.code === 'auth/invalid-email') msg = "Geçersiz format.";
      Alert.alert("Hata", msg);
    }
  };

  // --- APPLE İLE GİRİŞ FONKSİYONU (GÜNCELLENDİ) ---
  const handleAppleLogin = async () => {
    try {
      setLoading(true);
      
      // 1. Rastgele bir "nonce" oluştur
      const rawNonce = Math.random().toString(36).substring(2, 10);
      const requestedScopes = [
        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
        AppleAuthentication.AppleAuthenticationScope.EMAIL,
      ];

      // 2. Apple'dan kimlik doğrulama iste
      const appleCredential = await AppleAuthentication.signInAsync({
        requestedScopes,
        nonce: await Crypto.digestStringAsync(
          Crypto.CryptoDigestAlgorithm.SHA256,
          rawNonce
        ),
      });

      const { identityToken } = appleCredential;

      if (!identityToken) {
        throw new Error("Apple Identity Token bulunamadı.");
      }

      // 3. Firebase için credential oluştur
      const provider = new OAuthProvider('apple.com');
      const credential = provider.credential({
        idToken: identityToken,
        rawNonce: rawNonce, 
      });

      // 4. Firebase'e giriş yap
      const userCredential = await signInWithCredential(auth, credential);
      const user = userCredential.user;

      // --- GÜNCELLEME 2: FIRESTORE KAYIT İŞLEMİ ---
      
      // Apple isimi sadece ilk girişte verir. 
      // Eğer 'appleCredential.fullName' doluysa, yeni kullanıcıdır veya isim verisini alabiliyoruzdur.
      let fullName = user.displayName; 
      
      if (appleCredential.fullName?.givenName) {
        fullName = `${appleCredential.fullName.givenName} ${appleCredential.fullName.familyName || ''}`.trim();
      }

      // Veritabanına yazılacak veri
      const userData = {
        uid: user.uid,
        email: user.email,
        name: fullName || "Apple Kullanıcısı", // İsim yoksa varsayılan
        role: 'user',
        lastLogin: serverTimestamp(), // Son giriş zamanı
      };

      // Eğer kullanıcı ilk defa kayıt oluyorsa (veya yeni bir oturumsa) createdAt ekle
      // _tokenResponse firebase internal yapısıdır, genellikle isNewUser bilgisini taşır.
      if (userCredential._tokenResponse?.isNewUser) {
          userData.createdAt = serverTimestamp();
      }

      // Firestore'a kaydet. { merge: true } sayesinde varsa üzerine yazmaz, sadece günceller.
      await setDoc(doc(db, "users", user.uid), userData, { merge: true });
      
      // ------------------------------------------------

      // Başarılı
      setLoading(false);
      router.replace('/(app)/(tabs)/home');

    } catch (e) {
      setLoading(false);
      if (e.code === 'ERR_REQUEST_CANCELED') {
        // Kullanıcı iptal etti, işlem yapma
      } else {
        Alert.alert("Hata", "Apple ile giriş yapılamadı.");
        console.error(e);
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
                        <TextInput style={{...fontStyle, flex: 1}} placeholder="Şifre" placeholderTextColor="#9CA3AF" secureTextEntry={!showPassword} className="text-white text-[15px]" value={password} onChangeText={setPassword} />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}><Ionicons name={showPassword ? "eye-off" : "eye"} size={20} color="#9CA3AF" /></TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => handleNotImplemented('Şifre Sıfırlama')} className="mt-4 self-start"><Text style={fontStyle} className="text-white text-[13px] font-medium">Şifremi unuttum</Text></TouchableOpacity>
                </View>
            </View>

            <View className="mt-8 gap-y-4"> 
                <View className="flex-row w-full gap-3 mb-1">
                    {/* Apple Butonu: Sadece iOS'ta gösterilmesi önerilir ama tasarım bozulmasın diye şimdilik gizlemedim */}
                    <TouchableOpacity onPress={handleAppleLogin} className="flex-1 h-14 bg-[#15221E] border border-white/80 rounded-2xl flex-row overflow-hidden active:opacity-90 shadow-sm">
                        <View className="w-[20%] ml-2 h-full items-center justify-center"><Image source={appleLogo} className="w-7 h-7" resizeMode="contain" /></View>
                        <View className="w-[80%] h-full justify-center pl-1"><Text style={fontStyle} className="text-white font-regular mr-4 text-[12px] leading-tight">Apple ile devam et</Text></View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={() => handleNotImplemented('Google')} className="flex-1 h-14 bg-[#15221E] border border-white/80 rounded-2xl flex-row overflow-hidden active:opacity-90 shadow-sm">
                        <View className="w-[20%] h-full ml-2 items-center justify-center"><Image source={googleLogo} className="w-7 h-7" resizeMode="contain" /></View>
                        <View className="w-[80%] h-full justify-center pl-1"><Text style={fontStyle} className="text-white font-regular text-[12px] leading-tight">Google ile devam et</Text></View>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={handleLogin} disabled={loading} className={`w-full py-4 bg-[#15221E] border border-white/80 rounded-[10px] flex-row items-center justify-center active:opacity-90 ${loading ? 'opacity-70' : ''}`}>
                    {loading ? <ActivityIndicator color="white" /> : <Text style={fontStyle} className="text-white text-[15px] font-medium">Giriş yap</Text>}
                </TouchableOpacity>
            </View>

            <View className="mt-auto pt-6">
                <TouchableOpacity onPress={() => router.push('/create-account')} className="w-full py-4 bg-white rounded-[10px] items-center justify-center active:opacity-80 shadow-lg">
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