// app/index.jsx
import { View, Text, ImageBackground, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

// Resimleri import ediyoruz (Klasör yollarını kontrol edin)
import bgIntro from '../assets/images/bg-intro.png';
import iconIntro from '../assets/images/bg-intro-icon.png';

export default function WelcomeScreen() {
  const router = useRouter();
  const fontStyle = { fontFamily: 'Plus Jakarta Sans' };

  return (
    <ImageBackground
      source={bgIntro}
      className="flex-1"
      resizeMode="cover"
    >
      <View className="flex-1 justify-end px-6 pb-16 z-10">

        {/* --- BAŞLIK VE İKON --- */}
        <View className="flex-row items-center justify-center mb-2">
          <Text style={fontStyle} className="text-white text-[28px] font-semibold tracking-tight text-center drop-shadow-lg">
            Takva'ya Hoş Geldin
          </Text>
          <Image
            source={iconIntro}
            className="w-8 h-8 ml-2 drop-shadow-lg"
            resizeMode="contain"
          />
        </View>

        {/* --- AYET (SLOGAN) --- */}
        <Text style={fontStyle} className="text-gray-100 text-center text-[14px] font-light px-8 leading-5 mb-10 drop-shadow-md">
          Allah katında en üstün olanınız,{'\n'} takva bakımından en ileri olanınızdır.
        </Text>

        {/* --- BAŞLA BUTONU (KAYIT OL) --- */}
        <TouchableOpacity
          onPress={() => router.push('/(auth)/create-account')}
          className="w-full py-4 bg-[#15221E] border border-white rounded-2xl items-center mb-6 shadow-xl active:opacity-90"
        >
          <Text style={fontStyle} className="text-white text-[24px] font-medium">
            Başla
          </Text>
        </TouchableOpacity>

        {/* --- GİRİŞ YAP LİNKİ --- */}
        <View className="flex-row justify-center items-center drop-shadow-md">
          <Text style={fontStyle} className="text-gray-300 text-m font-light">
            Zaten hesabın var mı?
          </Text>
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={fontStyle} className="text-white font-semibold text-sm ml-1">
              Giriş yap
            </Text>
          </TouchableOpacity>
        </View>

      </View>

      <StatusBar style="light" />
    </ImageBackground>
  );
}