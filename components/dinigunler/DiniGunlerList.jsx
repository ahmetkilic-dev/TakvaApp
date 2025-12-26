import { memo, useCallback } from 'react';
import { FlatList, StyleSheet, View, RefreshControl } from 'react-native';
import DiniGunlerCard from './DiniGunlerCard';
import DiniGunlerTitle from './DiniGunlerTitle';

const ITEM_GAP = 16;
const HORIZONTAL_PADDING = 20;

// Optimize list item rendering
const keyExtractor = (item) => item.id;

// Item separator component
const ItemSeparator = memo(() => <View style={styles.separator} />);
ItemSeparator.displayName = 'ItemSeparator';

// List header component (scrolls with list)
const ListHeader = memo(() => (
  <View style={styles.headerWrapper}>
    <DiniGunlerTitle />
  </View>
));
ListHeader.displayName = 'ListHeader';

const DiniGunlerList = memo(({ religiousDays, onRefresh, refreshing }) => {
  // Memoize render item function
  const renderItem = useCallback(({ item }) => (
    <DiniGunlerCard day={item} />
  ), []);

  // Memoize refresh control
  const refreshControl = (
    <RefreshControl
      refreshing={refreshing}
      onRefresh={onRefresh}
      tintColor="#FFBA4A"
      colors={['#FFBA4A']}
      progressBackgroundColor="#24322E"
    />
  );

  return (
    <FlatList
      data={religiousDays}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      contentContainerStyle={styles.listContent}
      showsVerticalScrollIndicator={false}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={ListHeader}
      refreshControl={refreshControl}
      // Performance optimizations
      removeClippedSubviews={true}
      maxToRenderPerBatch={8}
      initialNumToRender={6}
      windowSize={10}
      // Improve scroll performance
      scrollEventThrottle={16}
      decelerationRate="fast"
    />
  );
});

DiniGunlerList.displayName = 'DiniGunlerList';

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingBottom: 32,
  },
  headerWrapper: {
    paddingTop: 24,
    paddingBottom: 8,
  },
  separator: {
    height: ITEM_GAP,
  },
});

export default DiniGunlerList;

