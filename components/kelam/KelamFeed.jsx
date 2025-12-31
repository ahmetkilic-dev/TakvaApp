import React, { useState, useCallback, useRef } from 'react';
import { View, StyleSheet, Dimensions, FlatList } from 'react-native';
import { ReelsPlayer } from './ReelsPlayer';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Main Feed Component for Kelam Videos
 */
export const KelamFeed = ({ videos, onLike, onEndReached, initialIndex = 0 }) => {
    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const [isMuted, setIsMuted] = useState(false);

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveIndex(viewableItems[0].index);
        }
    }).current;

    const viewabilityConfig = useRef({
        itemVisiblePercentThreshold: 80,
    }).current;

    const renderItem = useCallback(({ item, index }) => (
        <ReelsPlayer
            video={item}
            isActive={index === activeIndex}
            isMuted={isMuted}
            onLike={() => onLike(item)}
        />
    ), [activeIndex, isMuted, onLike]);

    const getItemLayout = useCallback((data, index) => ({
        length: SCREEN_HEIGHT,
        offset: SCREEN_HEIGHT * index,
        index,
    }), []);

    return (
        <View style={styles.container}>
            <FlatList
                data={videos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                pagingEnabled
                vertical
                showsVerticalScrollIndicator={false}
                snapToInterval={SCREEN_HEIGHT}
                snapToAlignment="start"
                decelerationRate="fast"
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}
                initialNumToRender={1}
                maxToRenderPerBatch={2}
                windowSize={3}
                removeClippedSubviews={true}
                onEndReached={onEndReached}
                onEndReachedThreshold={3}
                initialScrollIndex={initialIndex}
                getItemLayout={getItemLayout}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    }
});
