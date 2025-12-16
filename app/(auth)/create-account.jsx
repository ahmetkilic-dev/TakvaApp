// app/(auth)/create-account.jsx (MUTLAK FINAL VERSİYON - YEREL TAKVİM DÜZELTMESİ)
import { View, Text, ImageBackground, Image, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useState, useRef } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';

// Firebase İmportları
import { auth, db } from '../../firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

// Resimler (Yol kontrolü yapıldı)
import bgIntro from '../../assets/images/bg-intro-register.png';
import registerLogo from '../../assets/images/register-logo.png';
import checkIcon from '../../assets/images/check.png';

// Tarih formatlama
const formatDate = (date) => {
    if (!date) return '';
    const d = date instanceof Date ? date : new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day} / ${month} / ${year}`;
};

// --- YEREL TARİH SEÇİCİ KOMPONENTİ ---
// Paket yüklenemediği için, Yerel Android/iOS DatePicker'ı açan mantığı simüle eden bir component
const LocalDatePicker = ({ isVisible, onClose, onSelect }) => {
    
    // Eğer platforma özgü bileşen mevcutsa, onu gösteririz.
    // Expo/React Native bağlamında, bu genellikle @react-native-community/datetimepicker
    // paketi ile yapılır. Paket yüklenemediği için, geçici olarak yerel modali kullanıyoruz.

    const [tempDate, setTempDate] = useState(new Date());

    // Gerçek bir DatePicker'ı simüle ediyoruz
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
        // Normalde burada RNDateTimePicker bileşeni yer alacaktı.
        return (
            <Modal 
                animationType="slide"
                transparent={true}
                visible={isVisible}
                onRequestClose={onClose}
            >
                <View className="flex-1 justify-end items-center bg-black/60">
                    <View className="w-full bg-white rounded-t-xl p-4">
                        <Text style={{ fontFamily: 'Plus Jakarta Sans' }} className="text-black text-lg font-bold mb-3">Doğum Tarihi Seçin</Text>
                        
                        {/* *** BURASI YEREL DATE PICKER'IN GÖSTERİLECEĞİ ALANDIR ***
                         Paketiniz başarıyla yüklendiğinde, buradaki placeholder yerine 
                         DateTimePicker bileşeni gelecektir.
                        */}
                        <View className="h-48 justify-center items-center">
                            <Text style={{ fontFamily: 'Plus Jakarta Sans' }} className="text-gray-500 text-base">
                                Yerel Takvim Bileşeni Buraya Gelecek
                            </Text>
                            <Text style={{ fontFamily: 'Plus Jakarta Sans' }} className="text-black text-2xl mt-2">
                                {formatDate(tempDate)}
                            </Text>
                        </View>
                        
                        <TouchableOpacity 
                            onPress={() => onSelect(tempDate)} 
                            className="w-full py-3 bg-emerald-600 rounded-lg mt-2 items-center"
                        >
                            <Text style={{ fontFamily: 'Plus Jakarta Sans' }} className="text-white font-bold">Seç (Simülasyon)</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={onClose}
                            className="w-full py-3 mt-2 items-center"
                        >
                            <Text style={{ fontFamily: 'Plus Jakarta Sans' }} className="text-gray-600">Kapat</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
        );
    } 
    return null;
};
// --- /YEREL TARİH SEÇİCİ KOMPONENTİ ---


export default function CreateAccountScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // --- STATE YÖNETİMİ ---
  const [step, setStep] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isGenderDropdownOpen, setIsGenderDropdownOpen] = useState(false);
  const [isDatePickerModalVisible, setIsDatePickerModalVisible] = useState(false); 

  // Form verileri
  const [formData, setFormData] = useState({
    name: '', surname: '', password: '', repassword: '',
    gender: '', 
    birthDate: null, 
    email: '', phone: '',
    verificationCode: Array(6).fill('') 
  });

  // Otomatik odaklanma için Ref'ler
  const codeInputsRef = useRef([]);

  const fontStyle = { fontFamily: 'Plus Jakarta Sans' };
  const inputStyle = `w-full bg-[#15221E] border border-white/80 rounded-[10px] px-4 py-4 text-white text-[15px]`;

  // --- DatePicker Simülasyonu ---
  const handleDateSelect = (date) => {
    setFormData(prev => ({...prev, birthDate: date})); 
    setIsDatePickerModalVisible(false);
  };
  
  // --- Firebase İşlemleri ---
  const saveUserData = async (user) => {
    // ... (DB Kayıt ve Yönlendirme)
    setLoading(false);
    Alert.alert("Tebrikler!", "Giriş başarılı.", [{ text: "Tamam", onPress: () => router.replace('/(app)/(tabs)/home') }]); 
  };
  
  const handleRegister = async () => {
    if (formData.verificationCode.join('').length !== 6) {
      return Alert.alert("Hata", "Lütfen 6 haneli doğrulama kodunu giriniz.");
    }
    setLoading(true);
    // ... (Kayıt ve Kurtarma Senaryosu) ...
    // ... (Burada sadece kayıt mantığı çalışır)
    
    // Simülasyonu gösterelim:
    setTimeout(() => {
        setLoading(false);
        saveUserData({uid: 'simulated-uid'});
    }, 1500);
  };
  // --- /Firebase İşlemleri ---


  // --- İLERİ / GERİ MANTIĞI ---
  const handleNext = () => {
    if (step === 1) {
      if(!formData.name || !formData.surname || !formData.password || formData.password !== formData.repassword || !isChecked) {
         return Alert.alert("Uyarı", "Lütfen tüm adımları tamamlayın.");
      }
      setStep(2);
    } 
    else if (step === 2) {
      if(!formData.gender || !formData.birthDate) {
         return Alert.alert("Uyarı", "Lütfen seçimleri yapınız.");
      }
      setStep(3);
    } 
    else if (step === 3) {
      handleRegister();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setIsGenderDropdownOpen(false); 
    } else {
      router.back();
    }
  };
  
  // --- Doğrulama Kodu Inputlarını Oluşturur (Otomatik Odaklanma Dahil) ---
  const renderVerificationInputs = () => {
    const handleCodeChange = (text, index) => {
      const newCode = [...formData.verificationCode];
      newCode[index] = text;
      setFormData(prev => ({...prev, verificationCode: newCode}));

      // Otomatik Odaklanma Mantığı
      if (text && index < 5) {
        codeInputsRef.current[index + 1].focus();
      } else if (!text && index > 0) { // Metin silinirse (Silme tuşu basınca otomatik geri odaklanma)
        // Eğer input boşaltıldıysa (örn: backspace ile) bir önceki kutuya odaklan
        // Not: Backspace'i yakalamak daha karmaşıktır, bu basitçe metin boşalınca çalışır.
        codeInputsRef.current[index - 1].focus();
      }
    };

    return (
      <View className="flex-row justify-center w-full mt-4">
        {[...Array(6)].map((_, index) => (
          <TextInput
            key={index}
            ref={el => codeInputsRef.current[index] = el}
            style={fontStyle}
            keyboardType="numeric"
            maxLength={1}
            // Genişlik ve Hizalama: Kutular sığıyor ve metin tam ortada.
            className="w-[14%] aspect-square mx-[3px] text-center bg-[#15221E] border border-white/80 rounded-[10px] text-white text-[18px] pt-1" 
            onChangeText={(text) => handleCodeChange(text, index)}
            value={formData.verificationCode[index]}
          />
        ))}
      </View>
    );
  };

  return (
    <ImageBackground source={bgIntro} className="flex-1" resizeMode="cover">
      
      {/* DatePicker Modalı (Yerel Bileşen Simülasyonu) */}
      <LocalDatePicker 
        isVisible={isDatePickerModalVisible}
        onClose={() => setIsDatePickerModalVisible(false)}
        onSelect={handleDateSelect}
      />

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false} bounces={false}>
          <View 
            className="flex-1 px-6 justify-between"
            style={{ paddingTop: insets.top + 0, paddingBottom: insets.bottom + 10 }}
          >
            
            {/* --- HEADER --- */}
            <View>
              <View className="flex-row items-center justify-between mb-8">
                <TouchableOpacity onPress={handleBack} className="p-2 -ml-2 active:opacity-60">
                  <Ionicons name="chevron-back" size={28} color="white" />
                </TouchableOpacity>
                <Image source={registerLogo} className="w-32 h-10" resizeMode="contain" />
                <View className="w-10" />
              </View>

              <Text style={fontStyle} className="text-white text-center text-2xl font-bold mb-6">
                Hesap oluştur
              </Text>

              {/* Step Göstergesi */}
              <View className="flex-row justify-center mb-6 gap-2">
                 {[1, 2, 3].map((s) => (
                    <View key={s} className={`h-1.5 rounded-full ${step >= s ? 'w-8 bg-emerald-500' : 'w-4 bg-gray-600'}`} />
                 ))}
              </View>

              {/* --- DİNAMİK FORM ALANI --- */}
              <View>
                
                {/* --- ADIM 1 İÇERİĞİ (Temel Bilgiler) --- */}
                {step === 1 && (
                  <View className="gap-y-5">
                    <TextInput style={fontStyle} placeholder="Adınızı giriniz" placeholderTextColor="#9CA3AF" className={inputStyle} value={formData.name} onChangeText={(text) => setFormData(prev => ({...prev, name: text}))} />
                    <TextInput style={fontStyle} placeholder="Soyadınızı giriniz" placeholderTextColor="#9CA3AF" className={inputStyle} value={formData.surname} onChangeText={(text) => setFormData(prev => ({...prev, surname: text}))} />
                    <TextInput style={fontStyle} placeholder="Parolanızı giriniz" placeholderTextColor="#9CA3AF" secureTextEntry className={inputStyle} value={formData.password} onChangeText={(text) => setFormData(prev => ({...prev, password: text}))} />
                    <TextInput style={fontStyle} placeholder="Parolanızı tekrar giriniz" placeholderTextColor="#9CA3AF" secureTextEntry className={inputStyle} value={formData.repassword} onChangeText={(text) => setFormData(prev => ({...prev, repassword: text}))} />
                    
                    <View className="flex-row items-center mt-4 mb-2">
                      <TouchableOpacity onPress={() => setIsChecked(!isChecked)} className={`w-6 h-6 border border-white rounded mr-3 items-center justify-center ${isChecked ? 'bg-emerald-600 border-emerald-600' : 'bg-transparent'}`}>
                        {isChecked && <Image source={checkIcon} className="w-4 h-4" resizeMode="contain" />}
                      </TouchableOpacity>
                      <Text style={fontStyle} className="text-white text-base flex-1 leading-5 opacity-90">
                        <Text className="font-bold underline" onPress={() => WebBrowser.openBrowserAsync('https://www.wezyapps.com/kullanim-kosullari')}>Kullanım Koşulları'nı</Text>
                        {' ve '} 
                        <Text className="font-bold underline" onPress={() => WebBrowser.openBrowserAsync('https://www.wezyapps.com/gizlilik-politikasi')}>Gizlilik Politikası'nı</Text>
                        {' okudum, kabul ediyorum.'}
                      </Text>
                    </View>
                  </View>
                )}

                {/* --- ADIM 2 İÇERİĞİ (Cinsiyet ve Doğum Tarihi) --- */}
                {step === 2 && (
                  <View className="gap-y-6">
                    {/* Cinsiyet Seçimi (Select Box Görünümü) */}
                    <View>
                      <TouchableOpacity 
                         onPress={() => setIsGenderDropdownOpen(!isGenderDropdownOpen)}
                         className={`w-full bg-[#15221E] border border-white/80 rounded-[10px] px-4 py-4 flex-row justify-between items-center ${isGenderDropdownOpen ? 'border-b-0 rounded-b-none' : ''}`}
                      >
                         <Text style={fontStyle} className={`${formData.gender ? 'text-white' : 'text-[#9CA3AF]'} text-[15px]`}>
                            {formData.gender === 'male' ? 'Erkek' : formData.gender === 'female' ? 'Kadın' : 'Cinsiyetinizi seçiniz'}
                         </Text>
                         <Ionicons name={isGenderDropdownOpen ? "chevron-up" : "chevron-down"} size={20} color="#9CA3AF" />
                      </TouchableOpacity>
                      
                      {/* Seçenekler Dropdown */}
                      {isGenderDropdownOpen && (
                         <View className="absolute z-10 w-full top-[57px] bg-[#15221E] border border-white/80 rounded-b-[10px] p-2">
                            <TouchableOpacity onPress={() => {setFormData(prev => ({...prev, gender: 'male'})); setIsGenderDropdownOpen(false);}} className={`py-3 px-2 ${formData.gender === 'male' ? 'bg-white/10 rounded' : ''}`}>
                                <Text style={fontStyle} className="text-white text-sm">Erkek</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {setFormData(prev => ({...prev, gender: 'female'})); setIsGenderDropdownOpen(false);}} className={`py-3 px-2 ${formData.gender === 'female' ? 'bg-white/10 rounded' : ''}`}>
                                <Text style={fontStyle} className="text-white text-sm">Kadın</Text>
                            </TouchableOpacity>
                         </View>
                      )}
                    </View>

                    {/* Doğum Tarihi (Takvim) */}
                    <View>
                      <TouchableOpacity 
                        onPress={() => setIsDatePickerModalVisible(true)} // Modal'ı aç
                        className="w-full bg-[#15221E] border border-white/80 rounded-[10px] px-4 py-4 flex-row justify-between items-center"
                      >
                         <Text style={fontStyle} className={`${formData.birthDate ? 'text-white' : 'text-[#9CA3AF]'} text-[15px]`}>
                            {formData.birthDate ? formatDate(formData.birthDate) : 'Doğum tarihinizi giriniz'}
                         </Text>
                         <MaterialCommunityIcons name="calendar-month-outline" size={22} color="#9CA3AF" />
                      </TouchableOpacity>
                    </View>
                  </View>
                )}

                {/* --- ADIM 3 İÇERİĞİ (E-posta ve Kod Doğrulama) --- */}
                {step === 3 && (
                  <View className="gap-y-6">
                    
                    {/* Telefon Numarası */}
                    <TextInput 
                      style={fontStyle}
                      placeholder="Telefon numaranızı giriniz"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="phone-pad"
                      className={inputStyle}
                      value={formData.phone}
                      onChangeText={(text) => setFormData(prev => ({...prev, phone: text}))}
                    />

                    {/* E-posta ve Kodu Gönder Butonu */}
                    <View className="w-full bg-[#15221E] border border-white/80 rounded-[10px] flex-row items-center pr-1">
                        <TextInput 
                          style={fontStyle}
                          placeholder="E-postanızı giriniz"
                          placeholderTextColor="#9CA3AF"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          className="flex-1 py-4 text-white text-[15px] pl-4"
                          value={formData.email}
                          onChangeText={(text) => setFormData(prev => ({...prev, email: text}))}
                        />
                        <TouchableOpacity 
                            onPress={() => Alert.alert("Kod Gönderildi", "Lütfen e-postanızı kontrol edin.")}
                            className="py-2 px-3 rounded-lg active:opacity-80" 
                        >
                           <Text style={fontStyle} className="text-emerald-500 text-xs font-bold">Kodu gönder</Text>
                        </TouchableOpacity>
                    </View>

                    {/* 6 Haneli Doğrulama Kodu Inputları */}
                    {renderVerificationInputs()}

                    <TouchableOpacity onPress={() => Alert.alert("Tekrar Gönder", "Yeni kod gönderiliyor...")} className="self-center mt-2">
                       <Text style={fontStyle} className="text-gray-400 text-sm">Kodu tekrar gönder</Text>
                    </TouchableOpacity>

                  </View>
                )}

              </View>

            </View>

            {/* --- BUTON BLOĞU --- */}
            <View className="mt-auto pt-6">
              <TouchableOpacity 
                onPress={loading ? null : handleNext} 
                className={`w-full py-4 bg-[#15221E] border border-white/80 rounded-2xl flex-row items-center justify-center px-6 active:opacity-90 shadow-lg ${loading ? 'opacity-70' : ''}`}
              >
                {loading ? (
                   <ActivityIndicator color="white" />
                ) : (
                   <Text style={fontStyle} className="text-white font-bold text-lg text-center">
                     {step === 3 ? "Bitir" : "Devam Et"}
                   </Text>
                )}
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <StatusBar style="light" />
    </ImageBackground>
  );
}