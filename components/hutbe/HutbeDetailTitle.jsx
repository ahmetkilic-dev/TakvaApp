import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FONT_FAMILY = 'Plus Jakarta Sans';
const horizontalPadding = 20;
const TITLE_PADDING_TOP = 24;
const TITLE_PADDING_BOTTOM = 8;

const HutbeDetailTitle = memo(({ title, date }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title} numberOfLines={2}>
        {title}
      </Text>
      {date && (
        <Text style={styles.date}>
          {date}
        </Text>
      )}
    </View>
  );
});

HutbeDetailTitle.displayName = 'HutbeDetailTitle';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: horizontalPadding,
    paddingTop: TITLE_PADDING_TOP,
    paddingBottom: TITLE_PADDING_BOTTOM,
  },
  title: {
    fontFamily: FONT_FAMILY,
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
    textAlign: 'center',
  },
  date: {
    fontFamily: FONT_FAMILY,
    fontSize: 10,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
  },
});

export default HutbeDetailTitle;

