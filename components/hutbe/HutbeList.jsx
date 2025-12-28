import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import HutbeListItem from './HutbeListItem';

const LIST_GAP = 12;
const LIST_PADDING_TOP = 42;
const horizontalPadding = 20;

const HutbeList = memo(({ hutbes, onItemPress }) => {
  if (!hutbes || hutbes.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      {hutbes.map((hutbe) => (
        <HutbeListItem
          key={hutbe.id}
          hutbe={hutbe}
          onPress={() => onItemPress(hutbe)}
        />
      ))}
    </View>
  );
});

HutbeList.displayName = 'HutbeList';

const styles = StyleSheet.create({
  container: {
    gap: LIST_GAP,
  },
});

export default HutbeList;

