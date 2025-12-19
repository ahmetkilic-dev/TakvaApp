import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { esmaNames } from '../../constants/esmaData';

export default function EsmaSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const fontStyle = { fontFamily: 'Plus Jakarta Sans' };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % esmaNames.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + esmaNames.length) % esmaNames.length);
  };

  const currentEsma = esmaNames[currentIndex];

  return (

    <View className="mb-8 items-center" style={{ marginTop: 56 }}>
      <Text style={fontStyle} className="text-white text-2xl font-bold text-center mb-1">Esmaü’l-Hüsna</Text>
      <Text style={fontStyle} className="text-gray-400 text-sm text-center mb-6">Allah’ın en güzel isimleri.</Text>

      {/* Slider Container */}
      <View className="flex-row items-center justify-center space-x-4">

        {/* Sol Ok */}
        <TouchableOpacity onPress={handlePrev} className="p-2">
          <Ionicons name="chevron-back" size={32} color="#FFFFFF" />
        </TouchableOpacity>

        {/* İçerik Kartı */}
        <View style={styles.card}>
          {/* Sayaç */}
          <Text style={[fontStyle, styles.counter]}>
            {currentEsma.id}/99
          </Text>

          <View className="items-center justify-center flex-1 w-full px-2">
            {/* Arapça İsim */}
            <Text style={[fontStyle, styles.arabicText]} className="mb-1">
              {currentEsma.arabic}
            </Text>

            {/* Türkçe Okunuş */}
            <Text style={[fontStyle, styles.turkishText]} className="mb-2">
              {currentEsma.name}
            </Text>

            {/* Anlamı */}
            <Text style={[fontStyle, styles.meaningText]} numberOfLines={3}>
              {currentEsma.meaning}
            </Text>
          </View>
        </View>

        {/* Sağ Ok */}
        <TouchableOpacity onPress={handleNext} className="p-2">
          <Ionicons name="chevron-forward" size={32} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 258,
    height: 148,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  counter: {
    position: 'absolute',
    top: 10,
    right: 15,
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 10,
  },
  arabicText: {
    color: '#F3D38C',
    fontSize: 30,
    fontWeight: '400',
  },
  turkishText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 20,
    fontWeight: '400',
  },
  meaningText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 16,
  }
});