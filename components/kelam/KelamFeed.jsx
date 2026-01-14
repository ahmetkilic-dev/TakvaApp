import React, { useState, useCallback, useRef } from 'react';
import { View, StyleSheet, Dimensions, FlatList, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { rsH } from '../../utils/responsive';
import { ReelsPlayer } from './ReelsPlayer';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Main Feed Component for Kelam Videos
 * Custom Pull-to-Refresh implemented with standard Scroll events.
 */
export const KelamFeed = ({ videos, onLike, onEndReached, initialIndex = 0, refreshing, onRefresh }) => {
    const insets = useSafeAreaInsets();
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

    // Custom Pull-to-Refresh Logic
    const handleScrollEndDrag = (e) => {
        const offsetY = e.nativeEvent.contentOffset.y;
        // Trigger refresh if pulled down significantly (e.g., -80px)
        if (offsetY < -80 && !refreshing && onRefresh) {
            onRefresh();
        }
    };

    return (
        <View style={styles.container}>
            {/* Custom Overlay Spinner */}
            {refreshing && (
                <View style={[styles.loadingOverlay, { top: insets.top + 30 }]}>
                    <ActivityIndicator size="small" color="#D4AF37" />
                </View>
            )}

            <FlatList
                data={videos}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}

                // Paging and Snap
                pagingEnabled
                vertical
                showsVerticalScrollIndicator={false}
                snapToInterval={SCREEN_HEIGHT}
                snapToAlignment="start"
                decelerationRate="fast"

                // Viewability
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewabilityConfig}

                // PERFORMANCE OPTIMIZATIONS
                initialNumToRender={1}
                maxToRenderPerBatch={1}
                windowSize={3}
                updateCellsBatchingPeriod={100}
                removeClippedSubviews={true}

                // Layout optimization
                getItemLayout={getItemLayout}

                // Pagination
                onEndReached={onEndReached}
                onEndReachedThreshold={3}

                // Initial state
                initialScrollIndex={initialIndex}

                // Custom Pull Refresh Detection
                onScrollEndDrag={handleScrollEndDrag}
                // Disable native refresh control to prevent "push down"
                refreshControl={null}

                // EXTRA OPTIMIZATIONS
                scrollEventThrottle={16}
                overScrollMode="always"
                bounces={true}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    loadingOverlay: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 100,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
    }
});
