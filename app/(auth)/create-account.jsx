// app/(auth)/create-account.jsx
import { View, Text, ImageBackground, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons'; 
import { useState, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';

// Firebase İmportları
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, query, where, getDocs } from 'firebase/firestore'; // Firestore sorgu importları eklendi

// Resimler
import bgIntro from '../../assets/images/bg-intro-register.png';
import registerLogo from '../../assets/images/register-logo.png';
import checkIcon from '../../assets/images/check.png';

export default function CreateAccountScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [step, setStep] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    name: '', surname: '', password: '', repassword: '',
    gender: '', birthDate: '', email: '', phone: ''
  });

  const fontStyle = { fontFamily: 'Plus Jakarta Sans' };
  const inputStyle = `w-full bg-[#15221E] border border-white/80 rounded-[10px] px-4 py-4 text-white text-[15px]`;

  const handleOpenLink = async (url) => { await WebBrowser.openBrowserAsync(url); };

  const handleDateChange = (text) => {
    let cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length >= 2) cleaned = cleaned.slice(0, 2) + '/' + cleaned.slice(2);
    if (cleaned.length >= 5) cleaned = cleaned.slice(0, 5) + '/' + cleaned.slice(5);
    if (cleaned.length > 10) cleaned = cleaned.slice(0, 10);
    setFormData(prev => ({...prev, birthDate: cleaned}));
  };
  
  // --- TELEFON FORMATLAMA VE KONTROL ---
  const handlePhoneChange = (text) => {
    // 1. +90'ı ekle, kullanıcı silerse geri ekle
    if (!text.startsWith('+90')) {
        text = '+90' + text.replace(/[^0-9+]/g, '');
    }
    
    // 2. +90'dan sonraki ilk rakam 0 olamaz (Türkiye kuralı)
    if (text.length > 3 && text.charAt(3) === '0') {
      text = text.slice(0, 3) + text.slice(4); // 0'ı sil
    }

    // 3. Maksimum 10 karakter (alan kodu sonrası) için +90 ve sonrası 13 karakter
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
    // 1. E-posta kontrolü (Firebase Auth yapar, burada sadece Firestore'u kontrol edelim)
    
    // 2. Telefon Numarası kontrolü (Firestore'da)
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("phone", "==", cleanPhone));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      Alert.alert("Hata", "Bu telefon numarası zaten kullanımda.");
      return false;
    }
    
    return true;
  };

  const saveUserData = async (user, cleanPhone) => {
    try {
      await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: formData.name,
          surname: formData.surname,
          email: formData.email,
          phone: cleanPhone, // Temizlenmiş numara kaydediliyor
          gender: formData.gender,
          birthDate: formData.birthDate,
          createdAt: new Date(),
          role: 'user'
      }, { merge: true });

      setLoading(false);
      Alert.alert("Hoş Geldiniz!", "Hesabınız başarıyla oluşturuldu.", [
        { text: "Başla", onPress: () => router.replace('/(app)/(tabs)/home') } 
      ]);
    } catch (error) {
      console.error("Veritabanı Kayıt hatası:", error);
      setLoading(false);
      Alert.alert("Hata", "Kullanıcı verileri kaydedilirken bir sorun oluştu.");
    }
  };
  
  const handleRegister = async () => {
    if (!formData.email || !formData.phone) return Alert.alert("Eksik Bilgi", "Lütfen iletişim bilgilerinizi doldurunuz.");
    
    setLoading(true);
    const cleanPhone = formData.phone.replace(/\s/g, '');

    // Benzersizlik Kontrolü
    const isUnique = await checkUniqueness(cleanPhone);
    if (!isUnique) {
      setLoading(false);
      return;
    }

    try {
      // Firebase Auth (Email-in benzersizliğini kontrol eder ve kullanıcıyı oluşturur)
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      
      // Firestore'a kaydet (Telefon numarasının benzersiz olduğunu biliyoruz)
      await saveUserData(userCredential.user, cleanPhone);
      
    } catch (error) {
      setLoading(false);
      let msg = "Kayıt işlemi başarısız.";
      if (error.code === 'auth/email-already-in-use') msg = "Bu e-posta zaten kullanımda.";
      if (error.code === 'auth/weak-password') msg = "Şifre en az 6 karakter olmalıdır.";
      if (error.code === 'auth/invalid-email') msg = "Geçersiz e-posta adresi.";
      Alert.alert("Hata", msg);
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if(!formData.name || !formData.surname || !formData.password || formData.repassword !== formData.password || !isChecked) {
         if(formData.password !== formData.repassword) return Alert.alert("Hata", "Parolalar eşleşmiyor.");
         return Alert.alert("Uyarı", "Lütfen tüm alanları doldurun ve koşulları kabul edin.");
      }
      setStep(2);
    } 
    else if (step === 2) {
      if(!formData.gender || !formData.birthDate || formData.birthDate.length !== 10) {
         return Alert.alert("Uyarı", "Lütfen seçimleri eksiksiz yapın.");
      }
      setStep(3);
    } 
    else if (step === 3) {
      handleRegister();
    }
  };

  const handleBack = () => {
    if (step > 1) { setStep(step - 1); setIsGenderDropdownOpen(false); } else { router.back(); }
  };

  return (
    <ImageBackground source={bgIntro} className="flex-1" resizeMode="cover">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} bounces={false}>
          <View className="flex-1 px-6 justify-between" style={{ paddingTop: insets.top, paddingBottom: insets.bottom + 10 }}>
            
            <View>
              <View className="flex-row items-center justify-between mb-8">
                <TouchableOpacity onPress={handleBack} className="p-2 -ml-2 active:opacity-60">
                  <Ionicons name="chevron-back" size={28} color="white" />
                </TouchableOpacity>
                <Image source={registerLogo} className="w-32 h-10" resizeMode="contain" />
                <View className="w-10" />
              </View>

              <Text style={fontStyle} className="text-white text-center text-2xl font-bold mb-6">Hesap oluştur</Text>

              <View className="flex-row justify-center mb-6 gap-2">
                 {[1, 2, 3].map((s) => (
                    <View key={s} className={`h-1.5 rounded-full ${step >= s ? 'w-8 bg-emerald-500' : 'w-4 bg-gray-600'}`} />
                 ))}
              </View>

              <View>
                {step === 1 && (
                  <View className="gap-y-5">
                    <TextInput style={fontStyle} placeholder="Adınızı giriniz" placeholderTextColor="#9CA3AF" className={inputStyle} value={formData.name} onChangeText={(text) => setFormData(prev => ({...prev, name: text}))} />
                    <TextInput style={fontStyle} placeholder="Soyadınızı giriniz" placeholderTextColor="#9CA3AF" className={inputStyle} value={formData.surname} onChangeText={(text) => setFormData(prev => ({...prev, surname: text}))} textContentType="familyName" keyboardType="default"/>
                    <TextInput style={fontStyle} placeholder="Parolanızı giriniz" placeholderTextColor="#9CA3AF" secureTextEntry className={inputStyle} value={formData.password} onChangeText={(text) => setFormData(prev => ({...prev, password: text}))} />
                    <TextInput style={fontStyle} placeholder="Parolanızı tekrar giriniz" placeholderTextColor="#9CA3AF" secureTextEntry className={inputStyle} value={formData.repassword} onChangeText={(text) => setFormData(prev => ({...prev, repassword: text}))} />
                    
                    <View className="flex-row items-center mt-4 mb-2">
                      <TouchableOpacity onPress={() => setIsChecked(!isChecked)} className={`w-6 h-6 border border-white rounded mr-3 items-center justify-center`}>
                        {isChecked && <Image source={checkIcon} className="w-4 h-4" resizeMode="contain" />}
                      </TouchableOpacity>
                      <Text style={fontStyle} className="text-white text-base flex-1 leading-5 opacity-90">
                        <Text className="font-bold underline" onPress={() => handleOpenLink('https://www.wezyapps.com/kullanim-kosullari')}>Kullanım Koşulları'nı</Text>{' ve '}<Text className="font-bold underline" onPress={() => handleOpenLink('https://www.wezyapps.com/gizlilik-politikasi')}>Gizlilik Politikası'nı</Text>{' okudum, kabul ediyorum.'}
                      </Text>
                    </View>
                  </View>
                )}

                {step === 2 && (
                  <View className="gap-y-6">
                    <View>
                      <TouchableOpacity onPress={() => setIsGenderDropdownOpen(!isGenderDropdownOpen)} className={`w-full bg-[#15221E] border border-white/80 rounded-[10px] px-4 py-4 flex-row justify-between items-center ${isGenderDropdownOpen ? 'border-b-0 rounded-b-none' : ''}`}>
                         <Text style={fontStyle} className={`${formData.gender ? 'text-white' : 'text-[#9CA3AF]'} text-[15px]`}>{formData.gender === 'male' ? 'Erkek' : formData.gender === 'female' ? 'Kadın' : 'Cinsiyetinizi seçiniz'}</Text>
                         <Ionicons name={isGenderDropdownOpen ? "chevron-up" : "chevron-down"} size={20} color="#9CA3AF" />
                      </TouchableOpacity>
                      {isGenderDropdownOpen && (
                         <View className="absolute z-10 w-full top-[57px] bg-[#15221E] border border-white/80 rounded-b-[10px] p-2">
                            <TouchableOpacity onPress={() => {setFormData(prev => ({...prev, gender: 'male'})); setIsGenderDropdownOpen(false);}} className={`py-3 px-2 ${formData.gender === 'male' ? 'bg-white/10 rounded' : ''}`}><Text style={fontStyle} className="text-white text-sm">Erkek</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFormData(prev => ({...prev, gender: 'female'})); setIsGenderDropdownOpen(false);}} className={`py-3 px-2 ${formData.gender === 'female' ? 'bg-white/10 rounded' : ''}`}><Text style={fontStyle} className="text-white text-sm">Kadın</Text></TouchableOpacity>
                         </View>
                      )}
                    </View>
                    <TextInput style={fontStyle} placeholder="Doğum tarihinizi giriniz (GG/AA/YYYY)" placeholderTextColor="#9CA3AF" keyboardType="numeric" maxLength={10} className={inputStyle} value={formData.birthDate} onChangeText={handleDateChange} />
                  </View>
                )}

                {step === 3 && (
                  <View className="gap-y-6">
                    {/* Telefon Inputu: OnChange ve OnFocus Güncellendi */}
                    <TextInput 
                      style={fontStyle} 
                      placeholder="Telefon numaranızı giriniz" 
                      placeholderTextColor="#9CA3AF" 
                      keyboardType="phone-pad" 
                      className={inputStyle} 
                      value={formData.phone} 
                      onFocus={handlePhoneFocus} 
                      onChangeText={handlePhoneChange} 
                    />
                    
                    <TextInput style={fontStyle} placeholder="E-postanızı giriniz" placeholderTextColor="#9CA3AF" keyboardType="email-address" autoCapitalize="none" className={inputStyle} value={formData.email} onChangeText={(text) => setFormData(prev => ({...prev, email: text}))} />
                    <Text style={fontStyle} className="text-gray-400 text-xs text-center px-4 mt-2">Kaydı tamamlayarak iletişim bilgilerinizin doğruluğunu beyan etmiş olursunuz.</Text>
                  </View>
                )}
              </View>
            </View>

            <View className="mt-auto pt-6">
              <TouchableOpacity onPress={loading ? null : handleNext} className={`w-full py-4 bg-[#15221E] border border-white/80 rounded-2xl flex-row items-center justify-center px-6 active:opacity-90 shadow-lg ${loading ? 'opacity-70' : ''}`}>
                {loading ? <ActivityIndicator color="white" /> : <Text style={fontStyle} className="text-white font-bold text-lg text-center">{step === 3 ? "Bitir ve Kaydol" : "Devam Et"}</Text>}
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style="light" />
    </ImageBackground>
  );
}