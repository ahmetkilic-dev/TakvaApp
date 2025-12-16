import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function EsmaSlider() {
  const fontStyle = { fontFamily: 'Plus Jakarta Sans' };

  return (
    <View className="mb-8 mt-4">
      <Text style={fontStyle} className="text-white text-base font-bold text-center mb-1">Esmaü'l-Hüsna</Text>
      <Text style={fontStyle} className="text-gray-500 text-[10px] text-center mb-4">Allah'ın güzel isimleri.</Text>

      {/* Slider Kartı */}
      <View className="flex-row items-center justify-between px-2">
        
        {/* Sol Ok */}
        <TouchableOpacity className="p-2 opacity-60">
            <Ionicons name="chevron-back" size={24} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Orta İçerik Kartı */}
        <View 
            style={{ width: width - 100 }}
            className="h-40 bg-[#0F221E] border border-white/10 rounded-3xl items-center justify-center p-4 relative"
        >
            <Text style={fontStyle} className="absolute top-4 right-4 text-gray-600 text-[10px]">1/99</Text>
            
            <Text className="text-[#D4AF37] text-3xl font-bold mb-2">اَلرَّحْمٰنُ</Text>
            <Text style={fontStyle} className="text-white text-xl font-bold mb-1">Er-Rahmân</Text>
            <Text style={fontStyle} className="text-gray-400 text-[10px] text-center px-2 leading-4">
              Dünyada bütün mahlûkata merhamet eden, şefkat gösteren, ihsan eden.
            </Text>
        </View>

        {/* Sağ Ok */}
        <TouchableOpacity className="p-2 opacity-60">
            <Ionicons name="chevron-forward" size={24} color="#9CA3AF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}