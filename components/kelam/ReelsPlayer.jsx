import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Image } from 'expo-image';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { formatRelativeTime } from '../../utils/timeFormat';
import { useUserStats } from '../../contexts/UserStatsContext';
import { UserService } from '../../services/UserService';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
import { rsW, rsH, rsF } from '../../utils/responsive';

/**
 * Instagram Reels-style video player
 */
export const ReelsPlayer = React.memo(({ video, isActive, isMuted, onLike }) => {
    const router = useRouter();
    const { user, profile, refreshAll } = useUserStats();
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFollowLoading, setIsFollowLoading] = useState(false);

    const isFollowing = (profile?.following || []).includes(video.creator?.id);
    const isOwner = user?.uid === video.creator?.id;

    const handleProfilePress = () => {
        if (video.creator?.id) {
            router.push(`/(app)/(services)/creator-profile/${video.creator.id}`);
        }
    };

    const handleFollow = async () => {
        if (!user || isFollowLoading || isOwner) return;
        setIsFollowLoading(true);
        try {
            await UserService.toggleFollow(user.uid, video.creator.id);
            await refreshAll();
        } catch (error) {
            console.error('Follow error:', error);
        } finally {
            setIsFollowLoading(false);
        }
    };

    const player = useVideoPlayer(video?.video_url, (player) => {
        player.loop = true;
        player.muted = isMuted;
    });

    const isFocused = useIsFocused();

    // Auto-play/pause logic with restart on re-entry
    useEffect(() => {
        if (!player) return;

        if (isActive && isFocused) {
            // Restart video when it becomes active
            player.currentTime = 0;
            player.play();
            setIsPlaying(true);
        } else {
            player.pause();
            setIsPlaying(false);
        }
    }, [isActive, isFocused, player]);

    // Mute control
    useEffect(() => {
        if (player) {
            player.muted = isMuted;
        }
    }, [isMuted, player]);

    // Sync playing state
    useEffect(() => {
        if (!player) return;
        const subscription = player.addListener('playingChange', (event) => {
            setIsPlaying(event.isPlaying);
        });
        return () => subscription.remove();
    }, [player]);

    // Progress tracking
    useEffect(() => {
        if (!player) return;

        const interval = setInterval(() => {
            if (player.currentTime && player.duration) {
                setProgress((player.currentTime / player.duration) * 100);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [player]);

    const togglePlayPause = () => {
        if (!player) return;
        if (isPlaying) {
            player.pause();
        } else {
            player.play();
        }
    };

    const handleSeek = (e) => {
        if (!player || !player.duration) return;
        const width = e.nativeEvent.layout.width || (SCREEN_WIDTH - (rsW(16) + rsW(80))); // Dynamic width based on responsive margins
        const x = e.nativeEvent.locationX;
        const percentage = x / width;
        const seekTime = percentage * player.duration;
        player.currentTime = seekTime;
        setProgress(percentage * 100);
    };

    const relativeTime = formatRelativeTime(video.created_at);

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={togglePlayPause}
                style={StyleSheet.absoluteFill}
            >
                <VideoView
                    player={player}
                    style={StyleSheet.absoluteFill}
                    contentFit="contain"
                    nativeControls={false}
                    allowsFullscreen={false}
                    allowsPictureInPicture={false}
                />

                {/* Play/Pause Indicator (Optional - simplistic overlay if paused) */}
                {!isPlaying && isActive && isFocused && (
                    <View style={styles.pauseOverlay}>
                        <Ionicons name="play" size={rsW(50)} color="rgba(255,255,255,0.5)" />
                    </View>
                )}
            </TouchableOpacity>

            {/* Bottom Gradient */}
            <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.7)']}
                style={styles.bottomGradient}
                pointerEvents="none"
            />

            {/* Right Side Actions */}
            <View style={styles.rightActions}>
                {/* Profile Picture with Follow Button */}
                <View style={styles.profileContainer}>
                    <TouchableOpacity onPress={handleProfilePress}>
                        {video.creator?.profile_picture ? (
                            <Image
                                source={{ uri: video.creator.profile_picture }}
                                style={styles.profilePic}
                                contentFit="cover"
                                transition={500}
                            />
                        ) : (
                            <View style={[styles.profilePic, { backgroundColor: 'rgba(255,255,255,0.1)', alignItems: 'center', justifyContent: 'center' }]}>
                                <Ionicons name="person" size={rsW(24)} color="rgba(255,255,255,0.5)" />
                            </View>
                        )}
                    </TouchableOpacity>
                    {!isFollowing && !isOwner && (
                        <TouchableOpacity
                            style={styles.followButton}
                            onPress={handleFollow}
                            disabled={isFollowLoading}
                            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                        >
                            {isFollowLoading ? (
                                <View style={{ width: rsW(8), height: rsW(8), borderRadius: rsW(4), backgroundColor: 'white' }} />
                            ) : (
                                <Ionicons name="add" size={rsW(16)} color="#FFFFFF" />
                            )}
                        </TouchableOpacity>
                    )}
                    {isFollowing && !isOwner && (
                        <View style={[styles.followButton, { backgroundColor: '#4ADE80' }]}>
                            <Ionicons name="checkmark" size={rsW(14)} color="#FFFFFF" />
                        </View>
                    )}
                </View>

                {/* Like Button */}
                <TouchableOpacity style={styles.actionButton} onPress={onLike}>
                    <Ionicons
                        name={video.isLiked ? "heart" : "heart-outline"}
                        size={rsW(32)}
                        color={video.isLiked ? '#FF4B4B' : '#FFFFFF'}
                    />
                    <Text style={styles.actionText}>{video.likes_count || 0}</Text>
                </TouchableOpacity>

                {/* Share Button */}
                <TouchableOpacity style={styles.actionButton}>
                    <Ionicons name="arrow-redo-outline" size={rsW(30)} color="#FFFFFF" />
                    <Text style={styles.actionText}>Paylaş</Text>
                </TouchableOpacity>
            </View>

            {/* Bottom Info */}
            <View style={styles.bottomInfo}>
                {/* Username and Time */}
                <View style={styles.userRow}>
                    <Text style={styles.username}>
                        {video.creator?.username || video.creator?.name || 'Yazar'}
                    </Text>
                    <Text style={styles.dot}> • </Text>
                    <Text style={styles.timestamp}>{relativeTime}</Text>
                </View>

                {/* Video Title */}
                <Text style={styles.videoTitle} numberOfLines={2}>
                    {video.title}
                </Text>

                {/* Interactive Progress Bar */}
                <TouchableOpacity
                    style={styles.progressBarContainer}
                    activeOpacity={1}
                    hitSlop={{ top: 10, bottom: 10, left: 0, right: 0 }}
                    onPress={(e) => {
                        // We need the width of the container. 
                        // Since we can't easily get layout here reliably without onLayout, 
                        // we'll rely on the assumption or onLayout.
                        // Let's use a simple heuristic: SCREEN_WIDTH - (left margin + right margin)
                        // defined in styles. bottomInfo left=16, right=80. Width = SCREEN_WIDTH - 96.
                        const containerWidth = SCREEN_WIDTH - (rsW(16) + rsW(80));
                        const x = e.nativeEvent.locationX;
                        const percentage = Math.max(0, Math.min(1, x / containerWidth));
                        if (player && player.duration) {
                            player.currentTime = percentage * player.duration;
                        }
                    }}
                >
                    <View style={[styles.progressBar, { width: `${progress}%` }]} />
                </TouchableOpacity>
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
        height: '35%',
    },

    // Right Side Actions
    rightActions: {
        position: 'absolute',
        right: rsW(12),
        bottom: rsH(120),
        alignItems: 'center',
        gap: rsH(20),
    },
    profileContainer: {
        position: 'relative',
        marginBottom: rsH(8),
    },
    profilePic: {
        width: rsW(48),
        height: rsW(48),
        borderRadius: rsW(24),
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    followButton: {
        position: 'absolute',
        bottom: -rsH(8),
        left: rsW(14),
        width: rsW(20),
        height: rsW(20),
        borderRadius: rsW(10),
        backgroundColor: '#FF4B4B',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
        borderWidth: 1.5,
        borderColor: '#000',
    },
    actionButton: {
        alignItems: 'center',
    },
    actionText: {
        fontFamily: 'Plus Jakarta Sans',
        color: '#FFFFFF',
        fontSize: rsF(11),
        fontWeight: '600',
        marginTop: rsH(4),
    },

    // Bottom Info
    bottomInfo: {
        position: 'absolute',
        bottom: rsH(100),
        left: rsW(16),
        right: rsW(80),
    },
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: rsH(6),
    },
    username: {
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: '600',
        color: '#FFFFFF',
        fontSize: rsF(15),
    },
    dot: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: rsF(15),
    },
    timestamp: {
        fontFamily: 'Plus Jakarta Sans',
        color: 'rgba(255,255,255,0.8)',
        fontSize: rsF(13),
    },
    videoTitle: {
        fontFamily: 'Plus Jakarta Sans',
        color: '#FFFFFF',
        fontSize: rsF(14),
        lineHeight: rsH(20),
        marginBottom: rsH(12),
    },

    // Progress Bar
    progressBarContainer: {
        height: rsH(2),
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: rsW(1),
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: '#FFFFFF',
    },
    pauseOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
    },
});
