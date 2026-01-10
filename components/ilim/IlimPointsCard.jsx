import React, { memo } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const günlükPuanIcon = require('../../assets/ilim/gunlukpuan.png');
const toplamPuanIcon = require('../../assets/ilim/toplampuan.png');

const FONT_FAMILY = 'Rubik';

const IlimPointsCard = memo(({ dailyPoints = 0, totalPoints = 0, remainingLives = 3 }) => {
  return (
    <LinearGradient
      colors={['#182724', '#28312F']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      {/* Left: Daily Points */}
      <View style={styles.leftSection}>
        <Image
          source={günlükPuanIcon}
          style={styles.icon}
          resizeMode="contain"
        />
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsValue}>{dailyPoints}</Text>
          <Text style={styles.pointsLabel}>Puan</Text>
        </View>
      </View>

      {/* Center: Remaining Lives (Heart) */}
      <View style={styles.centerSection}>
        <View style={styles.heartWrapper}>
          <Ionicons name="heart" size={44} color="#FF0000" />
          <Text style={styles.remainingLivesText}>{remainingLives}</Text>
        </View>
      </View>

      {/* Right: Total Points */}
      <View style={styles.rightSection}>
        <Image
          source={toplamPuanIcon}
          style={styles.icon}
          resizeMode="contain"
        />
        <View style={styles.pointsContainer}>
          <Text style={styles.pointsValue}>{totalPoints}</Text>
          <Text style={styles.pointsLabel}>Puan</Text>
        </View>
      </View>
    </LinearGradient>
  );
});

IlimPointsCard.displayName = 'IlimPointsCard';

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 18 },
    shadowOpacity: 0.05,
    shadowRadius: 36,
    elevation: 5,
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  icon: {
    width: 48,
    height: 48,
    marginRight: 12,
  },
  pointsContainer: {
    alignItems: 'flex-start',
  },
  pointsValue: {
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  pointsLabel: {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    fontWeight: '400',
    color: '#FFFFFF',
    letterSpacing: 0.24,
  },
  centerSection: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  heartWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  remainingLivesText: {
    position: 'absolute',
    fontFamily: FONT_FAMILY,
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    top: '22%', // Büyük kalbin tam ortasında durması için
  },
});

export default IlimPointsCard;

