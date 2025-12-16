import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const user = auth.currentUser; // Şu anki kullanıcıyı al

  const fontStyle = { fontFamily: 'Plus Jakarta Sans' };

  // ÇIKIŞ YAPMA FONKSİYONU
  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/(auth)/login'); // Login ekranına at
    } catch (error) {
      console.error("Çıkış hatası:", error);
    }
  };

  return (
    <View className="flex-1 bg-[#15221E]">
      <ScrollView 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ÜST BAŞLIK (HEADER) */}
        <View 
            style={{ paddingTop: insets.top + 20 }} 
            className="px-6 pb-6 bg-[#1A2C26] rounded-b-[30px] shadow-lg"
        >
            <View className="flex-row justify-between items-center mb-4">
                <View>
                    <Text style={fontStyle} className="text-gray-400 text-sm">Esselamü Aleyküm,</Text>
                    <Text style={fontStyle} className="text-white text-xl font-bold mt-1">
                        {user?.email ? user.email.split('@')[0] : 'Misafir'}
                    </Text>
                </View>
                {/* Çıkış Yap Butonu (Test için buraya koydum) */}
                <TouchableOpacity 
                    onPress={handleLogout}
                    className="w-10 h-10 bg-red-500/20 rounded-full items-center justify-center border border-red-500/50"
                >
                    <Ionicons name="log-out-outline" size={20} color="#FF6B6B" />
                </TouchableOpacity>
            </View>

            {/* VAKİT KARTI (Örnek Tasarım) */}
            <View className="bg-emerald-600 rounded-2xl p-4 flex-row justify-between items-center">
                <View>
                    <Text style={fontStyle} className="text-emerald-100 text-xs">Sıradaki Vakit</Text>
                    <Text style={fontStyle} className="text-white text-2xl font-bold">İkindi</Text>
                    <Text style={fontStyle} className="text-emerald-100 text-sm mt-1">Kalan: 01:23:45</Text>
                </View>
                <Ionicons name="sunny" size={40} color="white" style={{ opacity: 0.8 }} />
            </View>
        </View>

        {/* İÇERİK IZGARASI (Grid) */}
        <View className="px-6 mt-6">
            <Text style={fontStyle} className="text-white text-lg font-bold mb-4">Hızlı Erişim</Text>
            
            <View className="flex-row flex-wrap justify-between gap-y-4">
                {/* Kart 1: Kuran */}
                <View className="w-[48%] bg-[#1F332D] p-4 rounded-xl border border-white/5 items-center">
                    <Ionicons name="book" size={28} color="#10B981" />
                    <Text style={fontStyle} className="text-white font-bold mt-2">Kuran-ı Kerim</Text>
                </View>

                {/* Kart 2: Zikirmatik */}
                <View className="w-[48%] bg-[#1F332D] p-4 rounded-xl border border-white/5 items-center">
                    <Ionicons name="finger-print" size={28} color="#10B981" />
                    <Text style={fontStyle} className="text-white font-bold mt-2">Zikirmatik</Text>
                </View>

                {/* Kart 3: Kıble */}
                <View className="w-[48%] bg-[#1F332D] p-4 rounded-xl border border-white/5 items-center">
                    <Ionicons name="compass" size={28} color="#10B981" />
                    <Text style={fontStyle} className="text-white font-bold mt-2">Kıble Bul</Text>
                </View>

                {/* Kart 4: Ayarlar */}
                <View className="w-[48%] bg-[#1F332D] p-4 rounded-xl border border-white/5 items-center">
                    <Ionicons name="settings" size={28} color="#10B981" />
                    <Text style={fontStyle} className="text-white font-bold mt-2">Ayarlar</Text>
                </View>
            </View>
        </View>

      </ScrollView>
    </View>
  );
}