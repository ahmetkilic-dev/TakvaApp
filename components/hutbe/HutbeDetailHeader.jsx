import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const HEADER_FONT_SIZE = 24;
const HEADER_LETTER_SPACING = -2;
const ICON_SIZE = 28;
const BUTTON_SIZE = 36;
const HEADER_PADDING_HORIZONTAL = 16;
const HEADER_PADDING_TOP = 8;
const HEADER_PADDING_BOTTOM = 8;

const HutbeDetailHeader = memo(() => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        onPress={() => router.back()} 
        style={styles.backButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        activeOpacity={0.7}
      >
        <Ionicons name="chevron-back" size={ICON_SIZE} color="#FFFFFF" />
      </TouchableOpacity>
      
      <Text style={styles.title}>HUTBE</Text>
      
      <View style={styles.placeholder} />
    </View>
  );
});

HutbeDetailHeader.displayName = 'HutbeDetailHeader';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: HEADER_PADDING_HORIZONTAL,
    paddingTop: HEADER_PADDING_TOP,
    paddingBottom: HEADER_PADDING_BOTTOM,
  },
  backButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Cinzel-Black',
    color: '#FFFFFF',
    fontSize: HEADER_FONT_SIZE,
    textAlign: 'center',
    letterSpacing: HEADER_LETTER_SPACING,
  },
  placeholder: {
    width: BUTTON_SIZE,
  },
});

export default HutbeDetailHeader;

