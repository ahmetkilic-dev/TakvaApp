import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import QuranCta from '../../assets/images/quran-cta.png';
import HeadphoneIcon from '../../assets/images/headphone.svg';
import PlayIcon from '../../assets/images/play.svg';
import StopIcon from '../../assets/images/stop.svg';

const { width } = Dimensions.get('window');

export default function QuranSection() {
   const fontStyle = { fontFamily: 'Plus Jakarta Sans' };

   return (
      <View style={{ marginTop: 56 }} className="mb-20 px-5 items-center">
         {/* Başlık Alanı */}
         <View className="items-center mb-6">
            <Text style={fontStyle} className="text-white text-2xl font-bold text-center mb-1">Kuran-ı Kerim</Text>
            <Text style={fontStyle} className="text-gray-400 text-sm text-center">Ruhunu Kuran’ın sesiyle dinlendir.</Text>
         </View>

         {/* Radyo/Player Kartı */}
         <View style={styles.radioCard}>
            <View className="flex-row items-center justify-between h-full px-5">
               <View>
                  <Text style={[fontStyle, { marginLeft: 16 }]} className="text-white text-[20px] font-bold mb-1">Nassar el Qatami</Text>
                  <Text style={[fontStyle, { marginLeft: 16 }]} className="text-white text-[14px] font-light">Kral Pop FM</Text>
               </View>

               {/* Sağ İkonlar */}
               <View style={{ marginRight: 8 }} className="items-center justify-center gap-y-1">
                  <TouchableOpacity>
                     <PlayIcon width={24} height={24} fill="white" />
                  </TouchableOpacity>
                  <View className="items-center">
                     <HeadphoneIcon width={24} height={24} color="white" />
                     <Text style={fontStyle} className="text-white text-[7px] font-light mt-0.5">107</Text>
                  </View>
               </View>
            </View>
         </View>

         {/* Kuran CTA Kartı */}
         <View style={styles.ctaCard} className="mt-4 flex-row items-center overflow-hidden">
            {/* Sol Metin Alanı */}
            <View className="flex-1 pl-5 pr-2 justify-center h-full">
               <Text style={[fontStyle, { marginLeft: 16 }]} className="text-white font-bold text-[16px] mb-1">Kuran-ı Kerim</Text>
               <Text style={[fontStyle, { marginLeft: 16 }]} className="text-white text-[12px] font-light leading-4 mb-3">
                  Kuran-ı Kerim’i okuyabilir, mealleri inceleyebilir, ayet bulabilirsin.
               </Text>

               <TouchableOpacity style={[styles.ctaButton, { marginTop: 8, marginLeft: 16 }]}>
                  <Text style={fontStyle} className="text-white text-[10px] font-semibold">Kuran’a git</Text>
               </TouchableOpacity>
            </View>

            {/* Sağ Görsel */}
            <View className="mr-4">
               <Image
                  source={QuranCta}
                  style={styles.ctaImage}
                  resizeMode="cover"
               />
            </View>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   radioCard: {
      width: 350,
      height: 102,
      backgroundColor: '#24322E',
      borderRadius: 20,
      borderWidth: 0.5,
      borderColor: 'rgba(255, 255, 255, 0.5)',
   },
   ctaCard: {
      width: 350,
      height: 135,
      backgroundColor: '#24322E',
      borderRadius: 20,
      borderWidth: 0.5,
      borderColor: 'rgba(255, 255, 255, 0.5)',
   },
   ctaButton: {
      backgroundColor: '#182723',
      borderWidth: 0.5,
      borderColor: 'rgba(255, 186, 74, 0.5)', // #FFBA4A %50
      borderRadius: 8,
      paddingVertical: 6,
      paddingHorizontal: 12,
      alignSelf: 'flex-start',
   },
   ctaImage: {
      width: 162,
      height: 108,
      borderWidth: 0.5,
      borderColor: 'rgba(255, 255, 255, 0.5)',
      borderRadius: 10,
   }
});