import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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

  const handleItemPress = (id) => {
    // Navigate to detail screen based on id
    console.log(`Navigate to ${id}`);
    // router.push(`/(app)/(services)/${id}`);
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

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: horizontalPadding,
            paddingTop: 24,
            paddingBottom: Platform.OS === 'ios' ? 120 : 100,
          }}
        >
          {/* Hakkında Section */}
          <View style={{ marginBottom: 32, alignItems: 'center' }}>
            <Text
              style={{
                fontFamily,
                fontSize: 16,
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: 8,
                textAlign: 'center',
              }}
            >
              Hakkında
            </Text>
            <Text
              style={{
                fontFamily,
                fontSize: 10,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: 24,
                lineHeight: 13,
                textAlign: 'center',
                maxWidth: SCREEN_WIDTH - (horizontalPadding * 2),
              }}
            >
              Takva uygulamasının hukuksal metinlerine ve genel bilgilere bu bölümden ulaşabilirsin.
            </Text>

            {/* About Items List */}
            <View
              style={{
                width: '100%',
                borderRadius: 15,
                backgroundColor: 'rgba(24, 39, 35, 0.5)',
                overflow: 'hidden',
              }}
            >
              {aboutItems.map((item, index) => (
                <View key={item.id}>
                  <TouchableOpacity
                    onPress={() => handleItemPress(item.id)}
                    style={{
                      width: '100%',
                      paddingVertical: 16,
                      paddingHorizontal: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View style={{ flex: 1, marginRight: 12 }}>
                      <Text
                        style={{
                          fontFamily,
                          fontSize: 16,
                          fontWeight: '500',
                          color: '#FFFFFF',
                          marginBottom: 4,
                        }}
                      >
                        {item.title}
                      </Text>
                      <Text
                        style={{
                          fontFamily,
                          fontSize: 10,
                          fontWeight: '400',
                          color: 'rgba(255, 255, 255, 0.8)',
                          lineHeight: 13,
                        }}
                      >
                        {item.description}
                      </Text>
                    </View>
                    <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
                  </TouchableOpacity>
                  
                  {/* Divider Line */}
                  {index < aboutItems.length - 1 && (
                    <View
                      style={{
                        width: '100%',
                        height: 0.5,
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        marginLeft: 16,
                      }}
                    />
                  )}
                </View>
              ))}
            </View>

            {/* Copyright */}
            <Text
              style={{
                fontFamily,
                fontSize: 10,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.8)',
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

