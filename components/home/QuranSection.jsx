import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import { useAudioPlayer, useAudioPlayerStatus } from 'expo-audio';
import { Ionicons } from '@expo/vector-icons';
import QuranCta from '../../assets/images/quran-cta.png';
import HeadphoneIcon from '../../assets/images/headphone.svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const STREAM_SOURCES = [
   'https://qurango.net/radio/mix',             // Qurango (MP3Quran) - Ana Kaynak
   'https://stream.radiojar.com/8s5u8tp48v8uv', // Sharjah Quran Radio - Yedek 1
   'https://radio.alukah.net/ulumalquran.mp3'   // Alukah Quran - Yedek 2
];

import React from 'react';

const QuranSection = React.memo(() => {
   const router = useRouter();
   const [currentSourceIndex, setCurrentSourceIndex] = useState(0);
   const [isPlaying, setIsPlaying] = useState(false);

   const fontStyle = { fontFamily: 'Plus Jakarta Sans' };

   // Initialize the audio player
   const player = useAudioPlayer(STREAM_SOURCES[currentSourceIndex]);
   const status = useAudioPlayerStatus(player);

   const isLoading = status.buffering || (isPlaying && !status.playing && !status.isLoaded);

   useEffect(() => {
      if (status.didJustFinish) {
         setIsPlaying(false);
      }

      // Handle errors and try next source
      if (status.error) {
         console.error(`Source ${currentSourceIndex} Error:`, status.error);
         tryNextSource();
      }
   }, [status]);

   const tryNextSource = () => {
      const nextIndex = currentSourceIndex + 1;
      if (nextIndex < STREAM_SOURCES.length) {
         setCurrentSourceIndex(nextIndex);
         player.replace(STREAM_SOURCES[nextIndex]);
         if (isPlaying) player.play();
      } else {
         console.error('All sources failed');
         setIsPlaying(false);
         setCurrentSourceIndex(0);
         player.replace(STREAM_SOURCES[0]);
      }
   };

   const togglePlayback = () => {
      if (player.playing) {
         player.pause();
         setIsPlaying(false);
      } else {
         player.play();
         setIsPlaying(true);
      }
   };

   return (
      <View style={styles.container}>
         {/* Başlık Alanı */}
         <View style={styles.headerContainer}>
            <Text style={[fontStyle, styles.mainTitle]}>Kuran-ı Kerim</Text>
            <Text style={[fontStyle, styles.subTitle]}>Ruhunu Kuran'ın sesiyle dinlendir.</Text>
         </View>

         {/* Radyo/Player Kartı */}
         <View style={styles.radioCard}>
            <View style={styles.radioContent}>
               {/* Sol Metin */}
               <View style={styles.radioTextContainer}>
                  <Text style={[fontStyle, styles.radioTitle]}>Kesintisiz Kuran Tilaveti</Text>
                  <Text style={[fontStyle, styles.radioSubtitle]}>7/24 Dünyaca Ünlü Hafızlar</Text>
               </View>

               {/* Sağ İkonlar - metinlerle hizalı */}
               <View style={styles.iconContainer}>
                  <TouchableOpacity
                     style={styles.playButtonRow}
                     onPress={togglePlayback}
                     disabled={isLoading}
                  >
                     {isLoading ? (
                        <ActivityIndicator size="small" color="#FFFFFF" />
                     ) : (
                        <Ionicons
                           name={isPlaying ? "pause" : "play"}
                           size={24}
                           color="white"
                        />
                     )}
                  </TouchableOpacity>
                  <View style={styles.headphoneRow}>
                     <HeadphoneIcon width={20} height={20} color="white" />
                     <Text style={[fontStyle, styles.listenerText]}>CANLI</Text>
                  </View>
               </View>
            </View>
         </View>

         {/* Kuran CTA Kartı */}
         <View style={styles.ctaCard}>
            {/* Sol Metin Alanı */}
            <View style={styles.ctaTextContainer}>
               <Text style={[fontStyle, styles.ctaTitle]}>Kuran-ı Kerim</Text>
               <Text style={[fontStyle, styles.ctaDescription]}>
                  Kuran-ı Kerim'i okuyabilir, mealleri inceleyebilir, ayet bulabilirsin.
               </Text>

               <TouchableOpacity
                  style={styles.ctaButton}
                  onPress={() => router.push('/(app)/(services)/quran')}
                  activeOpacity={0.8}
               >
                  <Text style={[fontStyle, styles.ctaButtonText]}>Kuran'a git</Text>
               </TouchableOpacity>
            </View>

            {/* Sağ Görsel */}
            <View style={styles.ctaImageContainer}>
               <Image
                  source={QuranCta}
                  style={styles.ctaImage}
                  resizeMode="cover"
               />
            </View>
         </View>
      </View>
   );
});

export default QuranSection;

const styles = StyleSheet.create({
   container: {
      marginTop: 48,
      marginBottom: 20,
      width: '100%',
      alignItems: 'center',
   },
   headerContainer: {
      alignItems: 'center',
      marginBottom: 24,
   },
   mainTitle: {
      color: '#FFFFFF',
      fontSize: 22,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 4,
   },
   subTitle: {
      color: 'rgba(255, 255, 255, 0.6)',
      fontSize: 14,
      textAlign: 'center',
   },
   radioCard: {
      width: SCREEN_WIDTH * 0.9,
      height: 102,
      backgroundColor: '#24322E',
      borderRadius: 20,
      borderWidth: 0.5,
      borderColor: 'rgba(255, 255, 255, 0.5)',
   },
   radioContent: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '100%',
      paddingHorizontal: 24,
   },
   radioTextContainer: {
      justifyContent: 'center',
   },
   radioTitle: {
      color: '#FFFFFF',
      fontSize: 20,
      fontWeight: '700',
      marginBottom: 4,
   },
   radioSubtitle: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: 14,
      fontWeight: '300',
   },
   iconContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      gap: 6,
   },
   playButtonRow: {
      alignItems: 'center',
      justifyContent: 'center',
   },
   headphoneRow: {
      alignItems: 'center',
      justifyContent: 'center',
   },
   listenerText: {
      color: 'rgba(255, 255, 255, 0.7)',
      fontSize: 10,
      marginTop: 2,
   },
   ctaCard: {
      width: SCREEN_WIDTH * 0.9,
      height: 135,
      backgroundColor: '#24322E',
      borderRadius: 20,
      borderWidth: 0.5,
      borderColor: 'rgba(255, 255, 255, 0.5)',
      marginTop: 16,
      flexDirection: 'row',
      alignItems: 'center',
      overflow: 'hidden',
   },
   ctaTextContainer: {
      flex: 1,
      paddingLeft: 20,
      paddingRight: 8,
      justifyContent: 'center',
   },
   ctaTitle: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '700',
      marginBottom: 4,
   },
   ctaDescription: {
      color: '#FFFFFF',
      fontSize: 12,
      fontWeight: '300',
      lineHeight: 16,
      marginBottom: 12,
   },
   ctaButton: {
      backgroundColor: '#182723',
      borderWidth: 0.5,
      borderColor: 'rgba(255, 186, 74, 0.5)',
      borderRadius: 8,
      paddingVertical: 6,
      paddingHorizontal: 12,
      alignSelf: 'flex-start',
   },
   ctaButtonText: {
      color: '#FFFFFF',
      fontSize: 10,
      fontWeight: '600',
   },
   ctaImageContainer: {
      paddingRight: 16,
   },
   ctaImage: {
      width: 140,
      height: 108,
      borderWidth: 0.5,
      borderColor: 'rgba(255, 255, 255, 0.5)',
      borderRadius: 10,
   }
});
