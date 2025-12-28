import React, { memo, useMemo } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView, Image, Dimensions } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { getCategoryInfo } from './utils/questionUtils';

const FONT_FAMILY = 'Plus Jakarta Sans';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const IlimStatisticsModal = memo(({ visible, onClose, categoryStats }) => {
  const horizontalPadding = 20;

  // Kategorileri formatla - getAllCategoryStats hook'undan gelen formatta
  const formattedStats = useMemo(() => {
    const categories = ['fikih', 'kuran', 'hadis', 'ahlak', 'siyer', 'gunler', 'kavramlar', 'esma'];
    
    return categories.map((categoryKey) => {
      const categoryInfo = getCategoryInfo(categoryKey);
      const stats = categoryStats?.[categoryKey] || {};
      
      return {
        categoryKey,
        name: categoryInfo.name,
        icon: categoryInfo.icon,
        score: stats.score || 0,
        correct: stats.correct || 0,
        incorrect: stats.incorrect || 0,
        total: (stats.correct || 0) + (stats.incorrect || 0),
      };
    });
  }, [categoryStats]);

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
        <View style={[styles.modalContent, { maxWidth: Math.min(SCREEN_WIDTH - horizontalPadding * 2, 390) }]}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={onClose}
              style={styles.headerButton}
            >
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              İlim Yolculuğu
            </Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.headerButton}
            >
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Description */}
          <Text style={styles.description}>
            İstersen devam edebilir, çıkabilir veya ilerlemene göz atabilirsin.
          </Text>

          {/* Statistics Title */}
          <Text style={styles.statisticsTitle}>
            İstatistikler
          </Text>

          {/* Statistics List */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollView}
          >
            {formattedStats.map((stat, index) => {
              const progressPercentage = Math.min(100, (stat.score / 10) * 100);
              
              return (
                <View
                  key={stat.categoryKey}
                  style={styles.statRow}
                >
                  {/* Icon */}
                  <Image
                    source={stat.icon}
                    style={styles.statIcon}
                    resizeMode="contain"
                  />

                  {/* Progress Bar */}
                  <View style={styles.progressBarContainer}>
                    <View style={styles.progressBarBackground}>
                      <LinearGradient
                        colors={['#F5C96E', '#714D00']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.progressBarFill, { width: `${progressPercentage}%` }]}
                      />
                    </View>
                  </View>

                  {/* Score */}
                  <Text style={styles.scoreText}>
                    {stat.score.toFixed(1)}/10
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      </BlurView>
    </Modal>
  );
});

IlimStatisticsModal.displayName = 'IlimStatisticsModal';

const styles = StyleSheet.create({
  blurContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#172521',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.75)',
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  headerButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: FONT_FAMILY,
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
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
  statisticsTitle: {
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
    textDecorationLine: 'underline',
  },
  scrollView: {
    maxHeight: SCREEN_WIDTH * 0.8,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
  },
  progressBarContainer: {
    flex: 1,
    marginRight: 12,
  },
  progressBarBackground: {
    height: 16.25,
    borderRadius: 10,
    backgroundColor: '#D1D1D1',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 10,
  },
  scoreText: {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    fontWeight: '400',
    color: '#FFFFFF',
    minWidth: 50,
    textAlign: 'right',
  },
});

export default IlimStatisticsModal;

