import { View, Text } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';

export default function HadithCard() {
  const fontStyle = { fontFamily: 'Plus Jakarta Sans' };

  return (
    <View className="mb-2">
      <Text style={fontStyle} className="text-white text-base font-bold text-center mb-1">Hadis</Text>
      <Text style={fontStyle} className="text-gray-500 text-[10px] text-center mb-4">Peygamber efendimiz (s.a.v.)'den inciler.</Text>

      <View className="bg-[#0F221E] border border-white/10 rounded-2xl py-6 px-6 items-center relative">
         <FontAwesome5 name="quote-left" size={16} color="#D4AF37" style={{ marginBottom: 12, opacity: 0.8 }} />
         
         <Text style={fontStyle} className="text-white text-center text-sm font-medium italic leading-6">
           "Ameller ancak niyetlere göredir."
         </Text>
         
         <Text style={fontStyle} className="text-gray-500 text-[10px] mt-3">Buhârî, Bed'ü'l-Vahy, 1</Text>
      </View>
    </View>
  );
}