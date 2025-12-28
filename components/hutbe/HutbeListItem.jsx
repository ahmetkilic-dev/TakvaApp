import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const FONT_FAMILY = 'Plus Jakarta Sans';
const horizontalPadding = 20;
const ITEM_MAX_WIDTH = 350;
const ITEM_HEIGHT = 60;
const ITEM_BORDER_RADIUS = 15;
const ITEM_PADDING_HORIZONTAL = 15;
const ITEM_GAP = 12;

const HutbeListItem = memo(({ hutbe, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.7}
    >
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>
          {hutbe.title}
        </Text>
        <Text style={styles.date}>
          {hutbe.date}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
    </TouchableOpacity>
  );
});

HutbeListItem.displayName = 'HutbeListItem';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: ITEM_MAX_WIDTH,
    height: ITEM_HEIGHT,
    borderRadius: ITEM_BORDER_RADIUS,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.75)',
    backgroundColor: 'rgba(24, 39, 35, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: ITEM_PADDING_HORIZONTAL,
    alignSelf: 'center',
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  date: {
    fontFamily: FONT_FAMILY,
    fontSize: 10,
    fontWeight: '300',
    color: 'rgba(255, 255, 255, 0.6)',
  },
});

export default HutbeListItem;

