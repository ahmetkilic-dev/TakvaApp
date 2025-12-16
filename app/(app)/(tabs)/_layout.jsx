import { Tabs } from 'expo-router';
import { Image, View, Platform } from 'react-native';

// İkonları import ediyoruz
import icHome from '../../../assets/images/ic-home.png';   // Rosette (Çark)
import icNamaz from '../../../assets/images/ic-namaz.png'; // Mihrab (Seccade/Kapı)
import icKelam from '../../../assets/images/ic-kelam.png'; // Hilal (Ay)
import icTasks from '../../../assets/images/ic-tasks.png'; // Liste (Clipboard)
import icProfile from '../../../assets/images/ic-profile.png'; // Profil (Adam)

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false, // Yazıları kapattım (Tasarımdaki gibi)
        tabBarStyle: {
          backgroundColor: '#04100D', // Tam Siyah-Yeşil zemin
          borderTopColor: '#FFFFFF10', // Çok silik üst çizgi
          borderTopWidth: 1,
          height: Platform.OS === 'ios' ? 95 : 70, // iPhone için yükseklik
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#D4AF37', // Altın Sarısı
        tabBarInactiveTintColor: '#6B7280', // Pasif Gri
      }}
    >
      {/* 1. ANASAYFA (Rosette İkonu) */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
              source={icHome} 
              style={{ width: 28, height: 28, tintColor: focused ? '#D4AF37' : '#526D64' }} 
              resizeMode="contain"
            />
          ),
        }}
      />

      {/* 2. NAMAZ (Mihrab İkonu) */}
      <Tabs.Screen
        name="namaz"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
              source={icNamaz} 
              style={{ width: 26, height: 26, tintColor: focused ? '#D4AF37' : '#526D64' }} 
              resizeMode="contain"
            />
          ),
        }}
      />

      {/* 3. KELAM (Hilal İkonu - Ortadaki Büyük İkon) */}
      <Tabs.Screen
        name="kelam"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className={`${focused ? 'bg-[#D4AF37]/10' : ''} p-3 rounded-full`}>
                <Image 
                  source={icKelam} 
                  style={{ width: 32, height: 32, tintColor: focused ? '#D4AF37' : '#526D64' }} 
                  resizeMode="contain"
                />
            </View>
          ),
        }}
      />

      {/* 4. TAKVİM/GÖREVLER (Liste İkonu) */}
      <Tabs.Screen
        name="tasks"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
              source={icTasks} 
              style={{ width: 26, height: 26, tintColor: focused ? '#D4AF37' : '#526D64' }} 
              resizeMode="contain"
            />
          ),
        }}
      />

      {/* 5. PROFİL (Kişi İkonu) */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <Image 
              source={icProfile} 
              style={{ width: 26, height: 26, tintColor: focused ? '#D4AF37' : '#526D64' }} 
              resizeMode="contain"
            />
          ),
        }}
      />
    </Tabs>
  );
}