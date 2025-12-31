import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * High performance video player for the Reels feed.
 * Handles auto-play/pause based on visibility.
 */
export const ReelsPlayer = React.memo(({ video, isActive, isMuted, onLike }) => {
    const player = useVideoPlayer(video?.video_url, (player) => {
        player.loop = true;
        player.muted = isMuted;
        if (isActive) {
            player.play();
        }
    });

    useEffect(() => {
        if (!player) return;

        if (isActive) {
            console.log("Playing video:", video.video_url);
            player.play();
        } else {
            player.pause();
        }
    }, [isActive, player, video.video_url]);

    useEffect(() => {
        player.muted = isMuted;
    }, [isMuted, player]);

    return (
        <View style={styles.container}>
            <VideoView
                player={player}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
                allowsFullscreen={false}
                allowsPictureInPicture={false}
            />

            {/* Bottom Overlay Gradient */}
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.bottomGradient}
            />

            {/* Video Info & Interactions */}
            <View style={styles.overlayContainer}>
                <View style={styles.leftInfo}>
                    <Text style={styles.creatorName}>@{video.creator?.name || 'Yazar'}</Text>
                    <Text style={styles.videoTitle} numberOfLines={2}>{video.title}</Text>
                </View>

                <View style={styles.rightActions}>
                    <TouchableOpacity style={styles.actionButton} onPress={onLike}>
                        <Ionicons name="heart" size={38} color={video.isLiked ? '#FF4B4B' : '#FFFFFF'} />
                        <Text style={styles.actionText}>{video.likes_count || 0}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.actionButton}>
                        <Ionicons name="share-social" size={36} color="#FFFFFF" />
                        <Text style={styles.actionText}>Paylaş</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        backgroundColor: '#000',
    },
    bottomGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '40%',
    },
    overlayContainer: {
        position: 'absolute',
        bottom: 100, // Above tab bar
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    leftInfo: {
        flex: 1,
        marginBottom: 10,
    },
    creatorName: {
        fontFamily: 'Plus Jakarta Sans',
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    videoTitle: {
        fontFamily: 'Plus Jakarta Sans',
        color: '#FFFFFF',
        fontSize: 14,
        opacity: 0.9,
    },
    rightActions: {
        alignItems: 'center',
        gap: 24,
        marginLeft: 20,
    },
    actionButton: {
        alignItems: 'center',
    },
    actionText: {
        fontFamily: 'Plus Jakarta Sans',
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
        marginTop: 4,
    }
});
