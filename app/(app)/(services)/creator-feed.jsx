import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, StatusBar, ActivityIndicator } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { KelamFeed } from '../../../components/kelam/KelamFeed';
import KelamService from '../../../services/KelamService';
import { useUserStats } from '../../../contexts/UserStatsContext';
import { rsW, rsF } from '../../../utils/responsive';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function CreatorFeedScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { id: creatorId, initialVideoId } = useLocalSearchParams();
    const { user } = useUserStats();

    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [initialIndex, setInitialIndex] = useState(0);
    const [isMoreLoading, setIsMoreLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const LIMIT = 20;

    const loadVideos = useCallback(async (pageOffset, isInitial = false, isRefresh = false) => {
        if (isInitial && !isRefresh) setIsLoading(true);
        else if (pageOffset > 0) setIsMoreLoading(true);

        try {
            // Fetch all videos for creator (Already ordered by created_at DESC)
            const newVideos = await KelamService.fetchCreatorVideos(creatorId, user?.uid);

            if (newVideos && newVideos.length > 0) {
                // Find initial index if initialVideoId is provided
                if (isInitial && initialVideoId && !isRefresh) { // Don't reset index on refresh
                    const idx = newVideos.findIndex(v => v.id === initialVideoId || v.id.toString() === initialVideoId);
                    if (idx !== -1) setInitialIndex(idx);
                }

                setVideos(newVideos);
            } else if (isRefresh) {
                // Handle empty case on refresh
                setVideos([]);
            }
        } catch (error) {
            console.error('CreatorFeed: Load error', error);
        } finally {
            setIsLoading(false);
            setIsMoreLoading(false);
            setRefreshing(false);
        }
    }, [creatorId, initialVideoId, user?.uid]);

    useEffect(() => {
        if (creatorId) {
            loadVideos(0, true);
        }
    }, [creatorId, loadVideos]);

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        loadVideos(0, true, true);
    }, [loadVideos]);

    const handleLike = async (video) => {
        if (!user) return;
        const success = await KelamService.toggleLike(video.id, user.uid, video.isLiked);
        if (success) {
            setVideos(prev => prev.map(v =>
                v.id === video.id ? { ...v, isLiked: !v.isLiked, likes_count: v.isLiked ? (v.likes_count || 0) - 1 : (v.likes_count || 0) + 1 } : v
            ));
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Header Overlay */}
            <View style={[styles.headerContainer, { paddingTop: Math.max(insets.top, 8) }]}>
                {/* Left: Back Button */}
                <View style={styles.headerSide}>
                    <TouchableOpacity
                        style={styles.headerIconButton}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>

                {/* Center: Standardized Title */}
                <Text style={styles.standardTitle}>KELÂM</Text>

                {/* Right: Empty Placeholder to balance title */}
                <View style={styles.headerSide} />
            </View>

            {/* Content Area */}
            {isLoading ? (
                <View style={styles.centerContent}>
                    <ActivityIndicator color="#D4AF37" size="large" />
                </View>
            ) : videos.length > 0 ? (
                <KelamFeed
                    videos={videos}
                    onLike={handleLike}
                    initialIndex={initialIndex}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    progressViewOffset={120}
                />
            ) : (
                <View style={styles.centerContent}>
                    <Text style={styles.emptyText}>Gösterilecek video bulunamadı.</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: rsW(10),
        zIndex: 100,
    },
    headerSide: {
        width: rsW(60),
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIconButton: {
        width: rsW(44),
        height: rsW(44),
        alignItems: 'center',
        justifyContent: 'center',
    },
    standardTitle: {
        fontFamily: 'Cinzel-Black',
        color: '#FFFFFF',
        fontSize: rsF(26),
        textAlign: 'center',
        letterSpacing: rsW(1),
    },
    centerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontFamily: 'Plus Jakarta Sans',
        color: 'rgba(255,255,255,0.5)',
        fontSize: 16,
    },
});
