import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, StatusBar, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useUserStats } from '../../../contexts/UserStatsContext';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useRouter } from 'expo-router';
import { KelamFeed } from '../../../components/kelam/KelamFeed';
import KelamService from '../../../services/KelamService';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function KelamScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { profile, user, loading } = useUserStats();
    // Creator check
    const isCreator = profile?.role === 'creator' || profile?.application_status === 'approved';
    const [videos, setVideos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadVideos();
    }, []);

    const loadVideos = async () => {
        setIsLoading(true);
        const data = await KelamService.fetchVideos();
        setVideos(data);
        setIsLoading(false);
    };

    const handleLike = async (video) => {
        if (!user) return;
        const success = await KelamService.toggleLike(video.id, user.id, video.isLiked);
        if (success) {
            setVideos(prev => prev.map(v =>
                v.id === video.id ? { ...v, isLiked: !v.isLiked, likes_count: v.isLiked ? (v.likes_count || 0) - 1 : (v.likes_count || 0) + 1 } : v
            ));
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Background Feed Container */}
            <View style={StyleSheet.absoluteFill}>
                <View style={[StyleSheet.absoluteFill, { backgroundColor: '#04100D' }]} />
            </View>

            {/* Header Overlay */}
            <View style={[styles.headerContainer, { paddingTop: Math.max(insets.top, 8) }]}>
                {/* Left: Add Icon (Creator Only) */}
                <View style={styles.headerSide}>
                    {isCreator && (
                        <TouchableOpacity
                            style={styles.headerIconButton}
                            onPress={() => router.push('/(app)/(services)/kelam-upload')}
                        >
                            <Ionicons name="add" size={30} color="#FFFFFF" />
                        </TouchableOpacity>
                    )}
                </View>

                {/* Center: Standardized Title */}
                <Text style={styles.standardTitle}>KELÂM</Text>

                {/* Right: Search Icon (All Users) */}
                <View style={styles.headerSide}>
                    <TouchableOpacity style={styles.headerIconButton}>
                        <Ionicons name="search" size={26} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Content Area */}
            {isLoading ? (
                <View style={styles.centerContent}>
                    <ActivityIndicator color="#D4AF37" size="large" />
                    <Text style={[styles.emptyText, { marginTop: 20 }]}>Kelam yükleniyor...</Text>
                </View>
            ) : videos.length > 0 ? (
                <KelamFeed videos={videos} onLike={handleLike} />
            ) : (
                <View style={styles.centerContent}>
                    <Ionicons name="videocam-outline" size={64} color="rgba(255,255,255,0.1)" />
                    <Text style={styles.emptyText}>Henüz bir kelam paylaşılmamış.</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#04100D',
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        zIndex: 100,
    },
    headerSide: {
        width: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerIconButton: {
        width: 44,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },
    standardTitle: {
        fontFamily: 'Cinzel-Black',
        color: '#FFFFFF',
        fontSize: 24,
        textAlign: 'center',
        letterSpacing: -2,
    },
    centerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },
    subtitlesText: {
        fontFamily: 'Plus Jakarta Sans',
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        textShadowColor: 'rgba(0,0,0,0.8)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 4,
    },
    emptyText: {
        fontFamily: 'Plus Jakarta Sans',
        color: 'rgba(255,255,255,0.3)',
        fontSize: 16,
        textAlign: 'center',
    },
});

