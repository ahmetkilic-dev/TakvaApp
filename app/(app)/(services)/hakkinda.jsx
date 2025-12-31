import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as WebBrowser from 'expo-web-browser';
import ScreenBackground from '../../../components/common/ScreenBackground';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

// Responsive calculations
const horizontalPadding = 20;

const aboutItems = [
  {
    id: 'hakkimizda',
    title: 'Hakkımızda',
    description: "Takva'nın amacı, kullanıcıların ibadet, ilim ve manevi gelişim yolculuklarında onlara güvenilir bir rehber sunmaktır.",
  },
  {
    id: 'kullanim',
    title: 'Kullanım Koşulları',
    description: "Takva'yı kullanırken geçerli olan kurallar ve yükümlülükler.",
  },
  {
    id: 'gizlilik',
    title: 'Gizlilik Politikası',
    description: 'Verilerinin nasıl korunduğunu ve işlendiğini öğren.',
  },
  {
    id: 'kvkk',
    title: 'KVKK Aydınlatma Metni',
    description: 'Kişisel verilerinin hangi amaçlarla kullanıldığını detaylı incele.',
  },
];

export default function HakkindaScreen() {
  const router = useRouter();

  const handleItemPress = async (id) => {
    if (id === 'gizlilik') {
      // Gizlilik Politikası web sayfasını aç
      await WebBrowser.openBrowserAsync('https://wezyapps.com/gizlilik-politikasi');
    } else if (id === 'kullanim') {
      // Kullanım Koşulları web sayfasını aç
      await WebBrowser.openBrowserAsync('https://wezyapps.com/kullanim-kosullari');
    } else {
      // Diğer öğeler için console log (ileride detay sayfaları eklenebilir)
      console.log(`Navigate to ${id}`);
    }
  };

  return (
    <ScreenBackground>
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-2 pb-2">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-9 h-9 items-center justify-center"
          >
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Cinzel-Black',
              color: '#FFFFFF',
              fontSize: 24,
              textAlign: 'center',
              letterSpacing: -2,
            }}
          >
            PROFİL
          </Text>
          <View className="w-9" />
        </View>

        {/* Content Title */}
        <View className="items-center mt-4 mb-2 px-10">
          <Text style={{ fontFamily: 'Plus Jakarta Sans', color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginBottom: 4 }}>Hakkında</Text>
          <Text className="text-center" style={{ fontFamily: 'Plus Jakarta Sans', color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '400', lineHeight: 14 }}>
            Takva uygulamasının hukuksal metinlerine ve genel bilgilere bu bölümden ulaşabilirsin.
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 12,
          }}
        >
          {/* Hakkında Section */}
          <View className="flex-1 rounded-t-[20px] p-5 pt-7 pb-20" style={{ backgroundColor: 'rgba(24, 39, 35, 0.9)' }}>
            {aboutItems.map((item, index) => (
              <View key={item.id} className="mb-4">
                <TouchableOpacity
                  onPress={() => handleItemPress(item.id)}
                  className="flex-row items-center justify-between"
                >
                  <View className="flex-1 pr-4">
                    <Text
                      style={{
                        fontFamily,
                        fontSize: 16,
                        fontWeight: '500',
                        color: '#FFFFFF',
                      }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontFamily,
                        fontSize: 12,
                        fontWeight: '400',
                        color: 'rgba(255, 255, 255, 0.6)',
                        marginTop: 2,
                        lineHeight: 16,
                      }}
                    >
                      {item.description}
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
                </TouchableOpacity>

                <View className="h-[1px] bg-white/10 mt-4 w-full" />
              </View>
            ))}

            {/* Copyright */}
            <Text
              style={{
                fontFamily,
                fontSize: 12,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.6)',
                marginTop: 24,
                textAlign: 'center',
              }}
            >
              © 2025 Takva. Tüm hakları saklıdır.
            </Text>
          </View>

        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

