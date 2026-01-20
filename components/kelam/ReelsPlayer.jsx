import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity, Animated, LayoutAnimation, Platform, UIManager, Share } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useVideoPlayer, VideoView } from 'expo-video';
import { Image } from 'expo-image';
import { useIsFocused } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { formatRelativeTime } from '../../utils/timeFormat';
import { useUserStats } from '../../contexts/UserStatsContext';
import { UserService } from '../../services/UserService';
import { KelamService } from '../../services/KelamService';
import { rsW } from '../../utils/responsive';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

/**
 * Instagram Reels-style video player
 */
export const ReelsPlayer = React.memo(({ video, isActive, isMuted, onLike }) => {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { user, profile, refreshAll } = useUserStats();

    // UI State
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFollowLoading, setIsFollowLoading] = useState(false);
    const [isScrubbing, setIsScrubbing] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false); // Description expansion

    // Animation Values
    const progressAnim = useRef(new Animated.Value(0)).current;
    const wasPlayingRef = useRef(false);

    // View Counting Refs
    const hasViewedRef = useRef(false);
    const viewTimerRef = useRef(null);

    // Reset view status when video changes
    useEffect(() => {
        hasViewedRef.current = false;
        if (viewTimerRef.current) clearTimeout(viewTimerRef.current);
    }, [video.id]);

    // Track View (3 Seconds Rule)
    useEffect(() => {
        if (isActive && isPlaying && !hasViewedRef.current) {
            viewTimerRef.current = setTimeout(() => {
                if (isActive && isPlaying && !hasViewedRef.current) {
                    KelamService.incrementView(video.id);
                    hasViewedRef.current = true;
                }
            }, 3000); // 3 Seconds
        }

        return () => {
            if (viewTimerRef.current) {
                clearTimeout(viewTimerRef.current);
            }
        };
    }, [isActive, isPlaying, video.id]);

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

    // Progress Link (Only when NOT scrubbing)
    useEffect(() => {
        if (!player || !isPlaying || !isActive || isScrubbing) return;

        const interval = setInterval(() => {
            if (player.currentTime && player.duration) {
                const val = (player.currentTime / player.duration) * 100;
                progressAnim.setValue(val);
            }
        }, 100);

        return () => clearInterval(interval);
    }, [player, isPlaying, isActive, isScrubbing]);

    // Enhanced Scrubbing Handler (Live Seeking)
    const handleScrub = (e, phase) => {
        const x = e.nativeEvent.locationX;
        const p = Math.max(0, Math.min(1, x / SCREEN_WIDTH));

        // 1. Instant Visual Feedback (No Latency)
        progressAnim.setValue(p * 100);

        // 2. Play/Pause Management & State
        if (phase === 'start') {
            wasPlayingRef.current = isPlaying;
            setIsScrubbing(true);
            if (player) player.pause();
        }

        // 3. Live Seeking (Smooth)
        if (player?.duration) {
            player.currentTime = p * player.duration;
        }

        // 4. End Phase
        if (phase === 'end') {
            setIsScrubbing(false);
            if (wasPlayingRef.current && player) {
                player.play();
            }
        }
    };

    const togglePlayPause = () => {
        if (!player) return;
        if (isPlaying) {
            player.pause();
        } else {
            player.play();
        }
    };

    const toggleDescription = () => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setIsExpanded(!isExpanded);
    };

    const relativeTime = formatRelativeTime(video.created_at);

    // Calculate visible area for video (Screen - TabBar)
    // BottomNavBar height = 53 (padding+icon) + bottom inset
    const tabBarHeight = 53 + Math.max(insets.bottom, 8);
    const videoHeight = SCREEN_HEIGHT - tabBarHeight;

    // Interpolate animated width for performance
    const widthInterpolation = progressAnim.interpolate({
        inputRange: [0, 100],
        outputRange: ['0%', '100%'],
        extrapolate: 'clamp'
    });

    const handleShare = async () => {
        try {
            // Cloudflare Worker URL (Redirector)
            const shareUrl = `https://takva-uploader.dev-400.workers.dev/share/${video.id}`;
            const title = `Takva'da bu kelamı izle: ${video.title}`;

            if (Platform.OS === 'ios') {
                await Share.share({
                    message: title,
                    url: shareUrl,
                });
            } else {
                await Share.share({
                    message: `${title}\n\n${shareUrl}`,
                    title: 'Kelam Paylaş'
                });
            }
        } catch (error) {
            console.error('Paylaşım hatası:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={togglePlayPause}
                style={StyleSheet.absoluteFill}
            >
                {/* Blurred Background for Immersive Feel (Fills Full Screen) */}
                {video.thumbnail_url && (
                    <Image
                        source={{ uri: video.thumbnail_url }}
                        style={[StyleSheet.absoluteFill, { opacity: 0.6 }]}
                        contentFit="cover"
                        blurRadius={50}
                    />
                )}

                {/* Video Container - Ends above Tab Bar */}
                <View style={{ width: SCREEN_WIDTH, height: videoHeight, overflow: 'hidden' }}>
                    <VideoView
                        player={player}
                        style={{
                            width: SCREEN_WIDTH,
                            height: videoHeight,
                            backgroundColor: 'transparent'
                        }}
                        contentFit="cover"
                        nativeControls={false}
                    />
                </View>

                {/* Play/Pause Indicator (Optional - simplistic overlay if paused) */}
                {!isPlaying && isActive && isFocused && (
                    <View style={styles.pauseOverlay}>
                        <Ionicons name="play" size={50} color="rgba(255,255,255,0.5)" />
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
                                <Ionicons name="person" size={24} color="rgba(255,255,255,0.5)" />
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
                                <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: 'white' }} />
                            ) : (
                                <Ionicons name="add" size={16} color="#FFFFFF" />
                            )}
                        </TouchableOpacity>
                    )}
                    {isFollowing && !isOwner && (
                        <View style={[styles.followButton, { backgroundColor: '#4ADE80' }]}>
                            <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                        </View>
                    )}
                </View>

                {/* Like Button */}
                <TouchableOpacity style={styles.actionButton} onPress={onLike}>
                    <Ionicons
                        name={video.isLiked ? "heart" : "heart-outline"}
                        size={32}
                        color={video.isLiked ? '#FF4B4B' : '#FFFFFF'}
                    />
                    <Text style={styles.actionText}>{video.likes_count || 0}</Text>
                </TouchableOpacity>



                {/* Share Button */}
                <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
                    <Ionicons name="arrow-redo-outline" size={30} color="#FFFFFF" />
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
                <TouchableOpacity activeOpacity={1} onPress={toggleDescription} hitSlop={{ top: 10, bottom: 10 }}>
                    <Text style={styles.videoTitle} numberOfLines={isExpanded ? undefined : 2}>
                        {video.title}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Full Width Progress Bar - Scrubbable (Native & Smooth) - Moved Outside to align with TabBar */}
            <View
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: tabBarHeight,
                    height: 2,
                    backgroundColor: 'rgba(255,255,255,0.3)',
                    zIndex: 50
                }}
                hitSlop={{ top: 20, bottom: 20 }}
                onStartShouldSetResponder={() => true}
                onResponderGrant={(e) => handleScrub(e, 'start')}
                onResponderMove={(e) => handleScrub(e, 'move')}
                onResponderRelease={(e) => handleScrub(e, 'end')}
                onResponderTerminate={(e) => handleScrub(e, 'end')}
            >
                {/* Background Track */}
                <View style={{ flex: 1, backgroundColor: 'transparent' }}>
                    <Animated.View
                        style={[
                            styles.progressBar,
                            { width: widthInterpolation }
                        ]}
                    />
                </View>
            </View>
        </View>
    );
}); // End Component

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
        right: 12,
        bottom: 120,
        alignItems: 'center',
        gap: 20,
    },
    profileContainer: {
        position: 'relative',
        marginBottom: 8,
    },
    profilePic: {
        width: 48,
        height: 48,
        borderRadius: 24,
        borderWidth: 2,
        borderColor: '#FFFFFF',
    },
    followButton: {
        position: 'absolute',
        bottom: -8,
        left: 14,
        width: 20,
        height: 20,
        borderRadius: 10,
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
        fontSize: 11,
        fontWeight: '600',
        marginTop: 4,
    },

    // Bottom Info
    bottomInfo: {
        position: 'absolute',
        bottom: 100, // Adjusted to sit clearly above actions if needed, or actions sit above it
        left: 16,
        right: 80,
    },
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    username: {
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: '600',
        color: '#FFFFFF',
        fontSize: 15,
    },
    dot: {
        color: 'rgba(255,255,255,0.6)',
        fontSize: 15,
    },
    timestamp: {
        fontFamily: 'Plus Jakarta Sans',
        color: 'rgba(255,255,255,0.8)',
        fontSize: 13,
    },
    videoTitle: {
        fontFamily: 'Plus Jakarta Sans',
        color: '#FFFFFF',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 12,
    },

    // Progress Bar (Inner style for Animated.View)
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
