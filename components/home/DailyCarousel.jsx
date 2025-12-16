import { View, Text, ScrollView, Dimensions, ImageBackground, Image } from 'react-native';

// Görseller
import gununAyetiBg from '../../assets/images/gunun-ayeti.png';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32; 

export default function DailyCarousel() {
  const fontStyle = { fontFamily: 'Plus Jakarta Sans' };

  return (
    <View className="mb-8">
      <ScrollView 
        horizontal 
        pagingEnabled 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        snapToInterval={CARD_WIDTH + 16} 
        decelerationRate="fast"
      >
        
        {/* 1. KART: GÜNÜN AYETİ (Özel Resimli) */}
        <View style={{ width: CARD_WIDTH, marginRight: 16 }}>
           <Text style={fontStyle} className="text-white text-base font-bold mb-3 text-center">Günün Ayeti</Text>
           <Text style={fontStyle} className="text-gray-500 text-[10px] mb-2 text-center -mt-2">Rabbimizden herkese bir rehber ve şifa.</Text>
           
           <View className="h-48 rounded-3xl overflow-hidden bg-[#0F221E] border border-white/5 relative justify-end">
               <Image 
                  source={gununAyetiBg}
                  className="absolute w-full h-full opacity-80"
                  resizeMode="cover"
               />
               
               {/* Buton */}
               <View className="absolute bottom-4 left-0 right-0 items-center">
                  <View className="bg-black/40 px-4 py-2 rounded-full border border-white/10 backdrop-blur-md">
                     <Text style={fontStyle} className="text-white text-xs font-bold">Günün ayeti {'>'}</Text>
                  </View>
               </View>
           </View>
        </View>

        {/* 2. KART: ZİKİR VE DUA */}
        <View style={{ width: CARD_WIDTH, marginRight: 16 }}>
           <Text style={fontStyle} className="text-white text-base font-bold mb-3 text-center">Zikir ve Dua</Text>
           <Text style={fontStyle} className="text-gray-500 text-[10px] mb-2 text-center -mt-2">Ruhun gıdası.</Text>

           <View className="h-48 rounded-3xl bg-[#1A1510] border border-[#D4AF37]/20 p-6 items-center justify-center">
               <Text className="text-[#D4AF37] text-xl font-bold mb-2">سُبْحَانَ اللّٰهِ</Text>
               <Text style={fontStyle} className="text-white text-lg font-bold">Subhanallah</Text>
               <Text style={fontStyle} className="text-gray-400 text-xs text-center mt-2">"Allah her türlü eksiklikten münezzehtir."</Text>
           </View>
        </View>

      </ScrollView>
    </View>
  );
}