import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { esmaNames } from '../../constants/esmaData';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

import React from 'react';

const EsmaSlider = React.memo(() => {
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
    <View style={styles.container}>
      <Text style={[fontStyle, styles.mainTitle]}>Esmaü'l-Hüsna</Text>
      <Text style={[fontStyle, styles.subTitle]}>Allah'ın en güzel isimleri.</Text>

      {/* Slider Container */}
      <View style={styles.sliderContainer}>

        {/* Sol Ok */}
        <TouchableOpacity onPress={handlePrev} style={styles.arrowButton}>
          <Ionicons name="chevron-back" size={32} color="#FFFFFF" />
        </TouchableOpacity>

        {/* İçerik Kartı */}
        <View style={styles.card}>
          {/* Sayaç */}
          <Text style={[fontStyle, styles.counter]}>
            {currentEsma.id}/99
          </Text>

          <View style={styles.cardContent}>
            {/* Arapça İsim */}
            <Text style={[fontStyle, styles.arabicText]}>
              {currentEsma.arabic}
            </Text>

            {/* Türkçe Okunuş */}
            <Text style={[fontStyle, styles.turkishText]}>
              {currentEsma.name}
            </Text>

            {/* Anlamı */}
            <Text style={[fontStyle, styles.meaningText]} numberOfLines={3}>
              {currentEsma.meaning}
            </Text>
          </View>
        </View>

        {/* Sağ Ok */}
        <TouchableOpacity onPress={handleNext} style={styles.arrowButton}>
          <Ionicons name="chevron-forward" size={32} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default EsmaSlider;

const styles = StyleSheet.create({
  container: {
    marginTop: 48,
    marginBottom: 32,
    width: '100%',
    alignItems: 'center',
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
    marginBottom: 24,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 8,
  },
  arrowButton: {
    padding: 8,
  },
  card: {
    width: SCREEN_WIDTH * 0.65,
    height: 148,
    backgroundColor: '#24322E',
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
  cardContent: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    paddingHorizontal: 8,
  },
  arabicText: {
    color: '#F3D38C',
    fontSize: 30,
    fontWeight: '400',
    marginBottom: 4,
  },
  turkishText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 20,
    fontWeight: '400',
    marginBottom: 8,
  },
  meaningText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 13,
    fontWeight: '400',
    textAlign: 'center',
    lineHeight: 16,
  }
});
