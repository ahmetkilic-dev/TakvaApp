import { View, Text, ScrollView, Image, Dimensions } from 'react-native';
import { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import swipeIcon from '../../assets/images/salavat-swipe.png';

const { width } = Dimensions.get('window');

export default function SalavatCard() {
  const fontStyle = { fontFamily: 'Plus Jakarta Sans' };
  const [count, setCount] = useState(214820);
  const [key, setKey] = useState(0); 

  const handleScroll = (event) => {
    if (event.nativeEvent.contentOffset.x > 100) { 
      setCount(prev => prev + 1);
      setKey(prev => prev + 1); 
    }
  };

  return (
    <View className="mb-10 w-full">
      <Text style={fontStyle} className="text-white text-lg font-bold mb-1 text-center">Salavat Zinciri</Text>
      <Text style={fontStyle} className="text-gray-500 text-xs mb-5 text-center">"Sizden, herkese binlerce rahmet gelir."</Text>

      {/* Koyu Yeşil Kart */}
      <View className="bg-[#0A1814] w-full rounded-[30px] p-6 border border-white/5 relative overflow-hidden shadow-2xl">
        
        {/* Gül Süslemesi (Flu) */}
        <MaterialCommunityIcons name="flower-tulip" size={100} color="#EF4444" style={{ position:'absolute', right:-20, bottom:-20, opacity:0.08, transform:[{rotate: '-20deg'}] }} />
        <MaterialCommunityIcons name="flower-tulip" size={80} color="#EF4444" style={{ position:'absolute', left:-20, top:-10, opacity:0.08, transform:[{rotate: '20deg'}] }} />

        {/* Arapça Yazı */}
        <Text className="text-white text-2xl text-center font-bold mb-3 mt-2" style={{ fontFamily: 'System' }}>
            اللّٰهُمَّ صَلِّ عَلَى سَيِّدِنَا مُحَمَّدٍ
        </Text>
        <Text style={fontStyle} className="text-gray-400 text-[11px] text-center mb-6 italic leading-5 px-4">
            Allahümme salli ala seyyidina Muhammedin ve ala ali seyyidina Muhammed
        </Text>

        {/* Slider Alanı */}
        <View className="h-[50px] bg-[#04100D] rounded-full border border-[#D4AF37]/30 justify-center mb-6 overflow-hidden relative mx-2">
          <Text style={fontStyle} className="absolute w-full text-center text-white/30 text-[11px] z-0 ml-4 tracking-widest">
            KAYDIR
          </Text>
          
          <ScrollView
            key={key}
            horizontal
            showsHorizontalScrollIndicator={false}
            onScrollEndDrag={handleScroll}
            className="w-full h-full z-10"
          >
             <View className="w-[50px] h-full justify-center items-center bg-[#D4AF37]/10 rounded-full border-r border-[#D4AF37]/20">
                <Image source={swipeIcon} className="w-6 h-6" resizeMode="contain" style={{ tintColor: '#D4AF37' }} />
             </View>
             <View style={{ width: width - 100 }} /> 
          </ScrollView>
        </View>

        {/* İstatistikler */}
        <View className="items-center gap-y-1">
           <Text style={fontStyle} className="text-gray-500 text-[11px]">Toplam Salavat: <Text className="text-white font-bold">214.820</Text></Text>
           <Text style={fontStyle} className="text-gray-500 text-[11px]">Bugünkü Sizden Gelen: <Text className="text-white font-bold">14.320</Text></Text>
           <Text style={fontStyle} className="text-gray-500 text-[11px]">Senin Salavatların: <Text className="text-[#D4AF37] font-bold text-sm"> {482}</Text></Text>
        </View>
      </View>
    </View>
  );
}