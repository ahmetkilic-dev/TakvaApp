import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ReligiousDayCard() {
  const fontStyle = { fontFamily: 'Plus Jakarta Sans' };

  return (
    <View className="mb-8">
      <Text style={fontStyle} className="text-white text-base font-bold text-center mb-1">Dini Günler</Text>
      <Text style={fontStyle} className="text-gray-500 text-[10px] text-center mb-4">Yaklaşan mübarek gün ve gecelere kalan süre.</Text>

      <View className="bg-[#0F221E] border border-white/10 rounded-2xl p-4 flex-row justify-between items-center relative overflow-hidden">
         {/* Sol Taraf: Gün Bilgisi */}
         <View className="flex-1">
            <View className="flex-row items-center gap-2 mb-2">
               <Ionicons name="moon" size={16} color="#D4AF37" />
               <Text style={fontStyle} className="text-white font-bold text-sm">Berat Kandili</Text>
            </View>
            <Text style={fontStyle} className="text-gray-400 text-[10px]">Hicri: 15 Şaban 1446</Text>
            <Text style={fontStyle} className="text-gray-400 text-[10px]">Miladi: 25 Şubat 2025</Text>
         </View>

         {/* Sağ Taraf: Sayaç */}
         <View className="items-center justify-center pl-4 border-l border-white/10 ml-2">
            <Text style={fontStyle} className="text-[#D4AF37] text-[10px] mb-1">Kalan Süre</Text>
            <Text style={fontStyle} className="text-white text-xl font-bold mb-1">12 <Text className="text-xs font-normal text-gray-400">Gün</Text></Text>
            
            <TouchableOpacity className="bg-[#1A2C26] border border-white/10 px-3 py-1 rounded text-center">
               <Text style={fontStyle} className="text-white text-[9px]">Takvimi gör</Text>
            </TouchableOpacity>
         </View>
      </View>
    </View>
  );
}