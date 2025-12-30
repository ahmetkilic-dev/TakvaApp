// app/(auth)/register.jsx
import { View, Text, ImageBackground, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
            paddingTop: insets.top + 20,
            paddingBottom: insets.bottom + 20
          }}
        >

          {/* --- ÜST KISIM --- */}
          <View className="items-center w-full mt-4">
            <Image
              source={registerLogo}
              className="w-32 h-14 mb-4"
              resizeMode="contain"
            />

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

            {/* 1. Satır: Apple ve Google (SENİN KODUN - DEĞİŞTİRİLMEDİ) */}
            <View className="flex-row w-full gap-3 mb-4">

              {/* Apple Butonu */}
              <TouchableOpacity className="flex-1 h-14 bg-[#15221E] border border-white/80 rounded-2xl flex-row overflow-hidden active:opacity-90 shadow-sm">

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
              <TouchableOpacity className="flex-1 h-14 bg-[#15221E] border border-white/80 rounded-2xl flex-row overflow-hidden active:opacity-90 shadow-sm">

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
            <View className="items-center">
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