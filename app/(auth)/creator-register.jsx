// app/(auth)/creator-register.jsx
import { View, Text, ImageBackground, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons'; 
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';

// Firebase
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';

// Resimler
import bgIntro from '../../assets/images/bg-intro-register.png';
import registerLogo from '../../assets/images/register-logo.png';
import checkIcon from '../../assets/images/check.png';

export default function CreatorRegisterScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false); 

  const [formData, setFormData] = useState({
    username: '', 
    password: '', 
    repassword: '',
    socialInstagram: '',
    socialTiktok: '',
    socialYoutube: '',
    email: '', 
    phone: ''
  });

  const fontStyle = { fontFamily: 'Plus Jakarta Sans' };
  const inputStyle = `w-full bg-[#15221E] border border-white/80 rounded-[10px] px-4 py-4 text-white text-[15px]`;

  const handleOpenLink = async (url) => { await WebBrowser.openBrowserAsync(url); };

  // --- TELEFON FORMATLAMA ---
  const handlePhoneChange = (text) => {
    if (!text.startsWith('+90')) {
        text = '+90' + text.replace(/[^0-9+]/g, '');
    }
    if (text.length > 3 && text.charAt(3) === '0') {
      text = text.slice(0, 3) + text.slice(4);
    }
    if (text.length > 13) {
        text = text.slice(0, 13);
    }
    setFormData(prev => ({...prev, phone: text}));
  };

  const handlePhoneFocus = () => {
    if (!formData.phone || formData.phone === '+90') { 
        setFormData(prev => ({...prev, phone: '+90'}));
    }
  };

  // --- BENZERSİZLİK KONTROLÜ ---
  const checkUniqueness = async (cleanPhone) => {
    const usersRef = collection(db, "users");
    const qPhone = query(usersRef, where("phone", "==", cleanPhone));
    const phoneSnapshot = await getDocs(qPhone);
    if (!phoneSnapshot.empty) {
      Alert.alert("Hata", "Bu telefon numarası zaten kullanımda.");
      return false;
    }
    return true;
  };

  // --- KAYIT İŞLEMİ ---
  const saveCreatorData = async (user, cleanPhone) => {
    try {
      await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          username: formData.username,
          displayName: formData.username,
          email: formData.email,
          phone: cleanPhone,
          socialLinks: {
            instagram: formData.socialInstagram || '',
            tiktok: formData.socialTiktok || '',
            youtube: formData.socialYoutube || ''
          },
          role: 'creator_candidate', 
          applicationStatus: 'pending', 
          createdAt: new Date(),
      }, { merge: true });

      setLoading(false);
      Alert.alert(
        "Başvuru Alındı!", 
        "İçerik üretici başvurunuz başarıyla alındı. Ekibimiz sosyal medya hesaplarınızı inceleyip en kısa sürede dönüş yapacaktır.", 
        [{ text: "Tamam", onPress: () => router.replace('/(app)/(tabs)/home') }] 
      );
    } catch (error) {
      console.error("Kayıt hatası:", error);
      setLoading(false);
      Alert.alert("Hata", "Başvuru kaydedilirken bir sorun oluştu.");
    }
  };
  
  const handleRegister = async () => {
    if (!formData.email || !formData.phone) return Alert.alert("Eksik Bilgi", "Lütfen iletişim bilgilerinizi giriniz.");
    
    setLoading(true);
    const cleanPhone = formData.phone.replace(/\s/g, '');

    const isUnique = await checkUniqueness(cleanPhone);
    if (!isUnique) { setLoading(false); return; }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      await updateProfile(userCredential.user, { displayName: formData.username });
      await saveCreatorData(userCredential.user, cleanPhone);

    } catch (error) {
      setLoading(false);
      let msg = "Kayıt başarısız.";
      if (error.code === 'auth/email-already-in-use') msg = "Bu e-posta kullanımda.";
      if (error.code === 'auth/weak-password') msg = "Şifre zayıf.";
      Alert.alert("Hata", msg);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if(!formData.username || !formData.password || !formData.repassword) {
         return Alert.alert("Uyarı", "Lütfen kullanıcı adı ve şifre alanlarını doldurun.");
      }
      if(formData.password !== formData.repassword) {
          return Alert.alert("Hata", "Parolalar eşleşmiyor.");
      }
      if(!isChecked) {
        return Alert.alert("Uyarı", "Lütfen tüm sözleşmeleri kabul edin.");
      }
      setStep(2);
    } 
    else if (step === 2) {
      if(!formData.socialInstagram && !formData.socialTiktok && !formData.socialYoutube) {
         return Alert.alert("Uyarı", "İnceleme yapabilmemiz için en az bir sosyal medya linki girmelisiniz.");
      }
      setStep(3);
    } 
    else if (step === 3) {
      handleRegister();
    }
  };

  const handleBack = () => {
    if (step > 1) { setStep(step - 1); } else { router.back(); }
  };

  return (
    <ImageBackground source={bgIntro} className="flex-1" resizeMode="cover">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} bounces={false}>
          <View className="flex-1 px-6 justify-between" style={{ paddingTop: insets.top, paddingBottom: insets.bottom + 10 }}>
            
            <View>
              {/* HEADER */}
              <View className="flex-row items-center justify-between mb-8">
                <TouchableOpacity onPress={handleBack} className="p-2 -ml-2 active:opacity-60">
                  <Ionicons name="chevron-back" size={28} color="white" />
                </TouchableOpacity>
                <Image source={registerLogo} className="w-32 h-10" resizeMode="contain" />
                <View className="w-10" />
              </View>

              <Text style={fontStyle} className="text-white text-center text-2xl font-bold mb-2">İçerik Üretici Başvuru</Text>
              <Text style={fontStyle} className="text-gray-400 text-center text-sm mb-6">Topluluğumuza katılın ve içeriklerinizi paylaşın.</Text>

              {/* Step Indicator */}
              <View className="flex-row justify-center mb-6 gap-2">
                 {[1, 2, 3].map((s) => (
                    <View key={s} className={`h-1.5 rounded-full ${step >= s ? 'w-8 bg-emerald-500' : 'w-4 bg-gray-600'}`} />
                 ))}
              </View>

              <View>
                
                {/* --- ADIM 1 --- */}
                {step === 1 && (
                  <View className="gap-y-5">
                    <TextInput style={fontStyle} placeholder="Kullanıcı Adı" placeholderTextColor="#9CA3AF" className={inputStyle} value={formData.username} onChangeText={(text) => setFormData(prev => ({...prev, username: text}))} />
                    <TextInput style={fontStyle} placeholder="Parolanızı giriniz" placeholderTextColor="#9CA3AF" secureTextEntry className={inputStyle} value={formData.password} onChangeText={(text) => setFormData(prev => ({...prev, password: text}))} />
                    <TextInput style={fontStyle} placeholder="Parolanızı tekrar giriniz" placeholderTextColor="#9CA3AF" secureTextEntry className={inputStyle} value={formData.repassword} onChangeText={(text) => setFormData(prev => ({...prev, repassword: text}))} />
                    
                    {/* GÜNCELLENEN SÖZLEŞME ALANI */}
                    <View className="flex-row items-center mt-4 mb-2">
                      <TouchableOpacity onPress={() => setIsChecked(!isChecked)} className={`w-6 h-6 border border-white rounded mr-3 items-center justify-center`}>
                        {isChecked && <Image source={checkIcon} className="w-4 h-4" resizeMode="contain" />}
                      </TouchableOpacity>
                      
                      <Text style={fontStyle} className="text-white text-base flex-1 leading-5 opacity-90">
                        <Text 
                            className="font-bold underline" 
                            onPress={() => handleOpenLink('https://www.wezyapps.com/kullanim-kosullari')}
                        >
                            Kullanım Koşulları'nı
                        </Text>
                        {', '}
                        <Text 
                            className="font-bold underline" 
                            onPress={() => handleOpenLink('https://www.wezyapps.com/gizlilik-politikasi')}
                        >
                            Gizlilik Politikası'nı
                        </Text>
                        {' ve '}
                        <Text 
                            className="font-bold underline" 
                            onPress={() => handleOpenLink('https://www.wezyapps.com/icerik-uretici')}
                        >
                            İçerik Üretici Sözleşmesi’ni
                        </Text>
                        {' okudum, kabul ediyorum.'}
                      </Text>
                    </View>
                  </View>
                )}

                {/* --- ADIM 2 --- */}
                {step === 2 && (
                  <View className="gap-y-5">
                    <Text style={fontStyle} className="text-white/80 text-sm mb-2 text-center">İncelememiz için lütfen aktif profillerinizi ekleyin.</Text>
                    <View className="relative justify-center">
                        <View className="absolute left-4 z-10"><FontAwesome5 name="instagram" size={20} color="#E1306C" /></View>
                        <TextInput style={fontStyle} placeholder="Instagram Profil URL" placeholderTextColor="#9CA3AF" className={`${inputStyle} pl-12`} value={formData.socialInstagram} onChangeText={(text) => setFormData(prev => ({...prev, socialInstagram: text}))} autoCapitalize="none" keyboardType="url"/>
                    </View>
                    <View className="relative justify-center">
                        <View className="absolute left-4 z-10"><FontAwesome5 name="tiktok" size={20} color="#fff" /></View>
                        <TextInput style={fontStyle} placeholder="TikTok Profil URL" placeholderTextColor="#9CA3AF" className={`${inputStyle} pl-12`} value={formData.socialTiktok} onChangeText={(text) => setFormData(prev => ({...prev, socialTiktok: text}))} autoCapitalize="none" keyboardType="url"/>
                    </View>
                    <View className="relative justify-center">
                        <View className="absolute left-4 z-10"><FontAwesome5 name="youtube" size={18} color="#FF0000" /></View>
                        <TextInput style={fontStyle} placeholder="YouTube Kanal URL" placeholderTextColor="#9CA3AF" className={`${inputStyle} pl-12`} value={formData.socialYoutube} onChangeText={(text) => setFormData(prev => ({...prev, socialYoutube: text}))} autoCapitalize="none" keyboardType="url"/>
                    </View>
                  </View>
                )}

                {/* --- ADIM 3 --- */}
                {step === 3 && (
                  <View className="gap-y-6">
                    <TextInput style={fontStyle} placeholder="Telefon numaranızı giriniz" placeholderTextColor="#9CA3AF" keyboardType="phone-pad" className={inputStyle} value={formData.phone} onFocus={handlePhoneFocus} onChangeText={handlePhoneChange} />
                    <TextInput style={fontStyle} placeholder="E-postanızı giriniz" placeholderTextColor="#9CA3AF" keyboardType="email-address" autoCapitalize="none" className={inputStyle} value={formData.email} onChangeText={(text) => setFormData(prev => ({...prev, email: text}))} />
                    <Text style={fontStyle} className="text-gray-400 text-xs text-center px-4 mt-2">Başvuruyu tamamlayarak bilgilerin doğruluğunu beyan edersiniz.</Text>
                  </View>
                )}

              </View>
            </View>

            {/* BUTTON */}
            <View className="mt-auto pt-6">
              <TouchableOpacity onPress={loading ? null : handleNext} className={`w-full py-4 bg-[#15221E] border border-white/80 rounded-2xl flex-row items-center justify-center px-6 active:opacity-90 shadow-lg ${loading ? 'opacity-70' : ''}`}>
                {loading ? <ActivityIndicator color="white" /> : <Text style={fontStyle} className="text-white font-bold text-lg text-center">{step === 3 ? "Başvuruyu Tamamla" : "Devam Et"}</Text>}
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style="light" />
    </ImageBackground>
  );
}