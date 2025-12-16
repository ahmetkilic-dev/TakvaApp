import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function QuranSection() {
  const fontStyle = { fontFamily: 'Plus Jakarta Sans' };

  return (
    <View className="mb-8">
       <Text style={fontStyle} className="text-white text-base font-bold text-center mb-1">Kuran-ı Kerim</Text>
       <Text style={fontStyle} className="text-gray-500 text-[10px] text-center mb-4">Ruhunu Kuran'ın sesiyle dinlendir.</Text>

       {/* Mini Player */}
       <View className="bg-[#0F221E] p-4 rounded-2xl border border-white/10 flex-row items-center justify-between mb-4">
          <View className="flex-row items-center gap-3">
             {/* Profil Resmi (Varsayılan bir görsel) */}
             <View className="w-10 h-10 bg-gray-700 rounded-full overflow-hidden">
                <Image source={{ uri: 'https://i.pravatar.cc/150?img=33' }} className="w-full h-full" />
             </View>
             <View>
                <Text style={fontStyle} className="text-white text-sm font-bold">Nassar el Qatami</Text>
                <Text style={fontStyle} className="text-gray-400 text-[10px]">Kral TV</Text>
             </View>
          </View>
          <View className="flex-row gap-4 items-center">
             <TouchableOpacity><Ionicons name="play" size={24} color="white" /></TouchableOpacity>
             <TouchableOpacity><Ionicons name="headset" size={20} color="#9CA3AF" /></TouchableOpacity>
          </View>
       </View>

       {/* Kuran Okuma Kartı */}
       <View className="h-28 bg-[#1A1510] rounded-2xl border border-white/5 flex-row overflow-hidden relative">
          <View className="flex-1 p-5 justify-center">
             <Text style={fontStyle} className="text-white font-bold text-sm mb-1">Kuran-ı Kerim</Text>
             <Text style={fontStyle} className="text-gray-400 text-[10px] leading-4 w-3/4">
                Kuran'ı oku, mealini incele ve ayetleri keşfet.
             </Text>
             <TouchableOpacity className="mt-2 bg-white/10 w-24 py-1.5 rounded-lg items-center border border-white/5">
                <Text style={fontStyle} className="text-white text-[10px] font-bold">Okumaya Başla</Text>
             </TouchableOpacity>
          </View>
          
          {/* Sağ Taraftaki Görsel (Placeholder) */}
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1584286595398-a59f21d313f5?q=80&w=600' }} 
            className="w-24 h-full opacity-60"
            resizeMode="cover"
          />
       </View>
    </View>
  );
}