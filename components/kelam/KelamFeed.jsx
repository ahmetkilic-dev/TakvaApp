import React, { useState, useCallback, useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, FlatList, ActivityIndicator, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { rsH } from '../../utils/responsive';
import { ReelsPlayer } from './ReelsPlayer';
import { useInterstitialAd } from '../ads/useInterstitialAd';
const { height: WINDOW_HEIGHT } = Dimensions.get('window');
const { height: SCREEN_HEIGHT_FULL } = Dimensions.get('screen');

// Android'de transparan status bar ve navigation bar (edge-to-edge) kullandığımız için
// Window height bazen eksik kalıyor (nav bar kadar). Screen height kullanmak daha güvenli.
const SCREEN_HEIGHT = Platform.OS === 'android' ? SCREEN_HEIGHT_FULL : WINDOW_HEIGHT;

/**
 * Main Feed Component for Kelam Videos
 * Custom Pull-to-Refresh implemented with standard Scroll events.
 */
export const KelamFeed = ({ videos, onLike, onEndReached, initialIndex = 0, refreshing, onRefresh }) => {
    const insets = useSafeAreaInsets();
    const [activeIndex, setActiveIndex] = useState(initialIndex);
    const [isMuted, setIsMuted] = useState(false);

    // AdMob Interstitial
    const { showAd, isLoaded } = useInterstitialAd();
    const lastAdIndex = useRef(0);

    // Fix: onViewableItemsChanged is frozen, so it needs a ref to see the latest state
    const adStateRef = useRef({ showAd, isLoaded });

    // Her render'da ref'i güncelle
    useEffect(() => {
        adStateRef.current = { showAd, isLoaded };
    }, [showAd, isLoaded]);

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const newIndex = viewableItems[0].index;
            // console.log('Kelam Feed Index:', newIndex);
            setActiveIndex(newIndex);

            // Her 5 videoda bir reklam göster (5, 10, 15...)
            if (newIndex > 0 && newIndex % 5 === 0) {
                // Ref üzerinden en güncel durumu oku
                const { isLoaded: currentIsLoaded, showAd: currentShowAd } = adStateRef.current;

                if (newIndex > lastAdIndex.current) {
                    if (currentIsLoaded) {
                        currentShowAd();
                        lastAdIndex.current = newIndex;
                    }
                }
            }
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
