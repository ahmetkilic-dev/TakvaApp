import React, { memo } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const günlükPuanIcon = require('../../assets/İlim/günlükpuan.png');
const toplamPuanIcon = require('../../assets/İlim/toplampuan.png');

const FONT_FAMILY = 'Rubik';

const IlimPointsCard = memo(({ dailyPoints = 0, totalPoints = 0 }) => {
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

      {/* Vertical Divider */}
      <View style={styles.divider} />

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
  divider: {
    width: 0.5,
    height: 48,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

export default IlimPointsCard;

