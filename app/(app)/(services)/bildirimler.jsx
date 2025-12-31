import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Switch, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';
import { useAppNotifications } from '../../../hooks/useAppNotifications';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

const horizontalPadding = 20;

const notificationConfigs = [
  {
    id: 'all',
    title: 'Tüm bildirimler',
    description: 'Tüm bildirimleri genel olarak aç veya kapat.',
  },
  {
    id: 'prayer',
    title: 'Namaz Bildirimleri',
    description: 'Namaz vakitleri yaklaşırken sana hatırlatma gönderelim.',
  },
  {
    id: 'verse',
    title: 'Günün ayeti bildirimi',
    description: 'Gün içinde günün ayetini gönder.',
  },
  {
    id: 'dhikr',
    title: 'Zikir hatırlatıcısı',
    description: 'Gün içinde zikir yapmayı hatırlat.',
  },
  {
    id: 'knowledge',
    title: 'İlim hatırlatıcısı',
    description: 'Gün içinde yeni sorular çözmen için bildirim gönder.',
  },
  {
    id: 'religious',
    title: 'Dini günler bildirimi',
    description: 'Mübarek gün ve gecelerden önce sana haber verelim.',
  },
];

export default function BildirimlerScreen() {
  const router = useRouter();
  const { notificationStates, loading, toggleNotification } = useAppNotifications();

  if (loading) {
    return (
      <ScreenBackground>
        <SafeAreaView className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#FFBA4A" />
        </SafeAreaView>
      </ScreenBackground>
    );
  }

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
            BİLDİRİMLER
          </Text>
          <View className="w-9" />
        </View>

        {/* Content Title */}
        <View className="items-center mt-4 mb-2 px-10">
          <Text style={{ fontFamily: 'Plus Jakarta Sans', color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginBottom: 4 }}>Bildirim Ayarları</Text>
          <Text className="text-center" style={{ fontFamily: 'Plus Jakarta Sans', color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '400', lineHeight: 14 }}>
            Takva'dan hangi bildirimleri ne zaman almak istediğini buradan ayarlayabilirsin.
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
          {/* Bildirimler Section */}
          <View className="flex-1 rounded-t-[20px] p-5 pt-7 pb-40" style={{ backgroundColor: 'rgba(24, 39, 35, 0.9)' }}>
            {notificationConfigs.map((notification, index) => (
              <View key={notification.id} className="mb-4">
                <View
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
                      {notification.title}
                    </Text>
                    <Text
                      style={{
                        fontFamily,
                        fontSize: 12,
                        fontWeight: '400',
                        color: 'rgba(255, 255, 255, 0.6)',
                        marginTop: 2
                      }}
                    >
                      {notification.description}
                    </Text>
                  </View>
                  <Switch
                    value={notificationStates[notification.id]}
                    onValueChange={() => toggleNotification(notification.id)}
                    trackColor={{
                      false: 'rgba(255, 255, 255, 0.2)',
                      true: '#185C65',
                    }}
                    thumbColor="#FFFFFF"
                    ios_backgroundColor="rgba(255, 255, 255, 0.2)"
                    style={{
                      transform: Platform.OS === 'ios'
                        ? [{ scaleX: 0.8 }, { scaleY: 0.8 }]
                        : [{ scaleX: 1 }, { scaleY: 1 }],
                    }}
                  />
                </View>

                <View className="h-[1px] bg-white/10 mt-4 w-full" />
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

