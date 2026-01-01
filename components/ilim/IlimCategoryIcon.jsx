import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { getCategoryInfo } from './utils/questionUtils';

const FONT_FAMILY = 'Plus Jakarta Sans';

const IlimCategoryIcon = memo(({ categoryKey, categoryName }) => {
  const categoryInfo = getCategoryInfo(categoryKey);

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={categoryInfo.icon}
          style={styles.icon}
          contentFit="contain"
          transition={200}
        />
      </View>
      <Text style={styles.categoryText}>
        {categoryName || categoryInfo.name}
      </Text>
    </View>
  );
});

IlimCategoryIcon.displayName = 'IlimCategoryIcon';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(217, 217, 217, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 44,
    height: 44,
  },
  categoryText: {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.6)',
  },
});

export default IlimCategoryIcon;

