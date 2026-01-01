import React, { memo } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const FONT_FAMILY = 'Plus Jakarta Sans';
const istatistikIcon = require('../../assets/ilim/istatistik.png');

const IlimPauseModal = memo(({ visible, onClose, onStatistics }) => {
  const router = useRouter();

  const handleSaveAndExit = () => {
    onClose();
    router.back();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <BlurView
        intensity={50}
        tint="dark"
        style={styles.blurContainer}
      >
        <View style={styles.modalContent}>
          {/* Close Button */}
          <TouchableOpacity
            onPress={onClose}
            style={styles.closeButton}
          >
            <Ionicons name="close" size={24} color="#FFFFFF" />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.title}>
            İlim Yolculuğu
          </Text>

          {/* Description */}
          <Text style={styles.description}>
            İstersen devam edebilir, çıkabilir veya ilerlemene göz atabilirsin.
          </Text>

          {/* Action Buttons Row */}
          <View style={styles.buttonRow}>
            {/* Save and Exit Button */}
            <TouchableOpacity
              onPress={handleSaveAndExit}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                Kaydet ve çık
              </Text>
            </TouchableOpacity>

            {/* Continue Button */}
            <TouchableOpacity
              onPress={onClose}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                Devam et
              </Text>
            </TouchableOpacity>
          </View>

          {/* Statistics Button */}
          <TouchableOpacity
            onPress={onStatistics}
            style={styles.statisticsButton}
          >
            <Image
              source={istatistikIcon}
              style={styles.statisticsIcon}
              resizeMode="contain"
            />
            <Text style={styles.statisticsButtonText}>
              İstatistikler
            </Text>
          </TouchableOpacity>
        </View>
      </BlurView>
    </Modal>
  );
});

IlimPauseModal.displayName = 'IlimPauseModal';

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 390,
    backgroundColor: '#182723',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.75)',
    padding: 24,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  title: {
    fontFamily: FONT_FAMILY,
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 8,
  },
  description: {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  button: {
    flex: 1,
    height: 40,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.75)',
    backgroundColor: '#182723',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 6,
  },
  buttonText: {
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  statisticsButton: {
    width: '100%',
    height: 40,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.75)',
    backgroundColor: '#182723',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  statisticsIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  statisticsButtonText: {
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});

export default IlimPauseModal;

