import React, { memo, useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KelamService } from '../../services/KelamService';
import { Alert } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';

const fontFamily = 'Plus Jakarta Sans';

// Individual Post Item with Thumbnail Generation
const PostItem = memo(({ post, index, isOwner, onPostPress, onDelete, width }) => {
    const [thumbnail, setThumbnail] = useState(post.thumbnail_url || null);
    const [loading, setLoading] = useState(!post.thumbnail_url);

    useEffect(() => {
        let isMounted = true;

        const generateThumbnail = async () => {
            if (post.thumbnail_url) return;

            try {
                // Generate thumbnail from video URL (from 1st second)
                const { uri } = await VideoThumbnails.getThumbnailAsync(post.video_url, {
                    time: 1000,
                });

                if (isMounted) {
                    setThumbnail(uri);
                    setLoading(false);
                }
            } catch (e) {
                console.warn("Thumbnail generation failed, using fallback", e);
                if (isMounted) setLoading(false);
            }
        };

        generateThumbnail();

        return () => { isMounted = false; };
    }, [post.thumbnail_url, post.video_url]);

    return (
        <TouchableOpacity
            key={post.id || index}
            activeOpacity={0.9}
            onPress={() => onPostPress && onPostPress(post, index)}
            style={{
                width: width,
                height: 180,
                borderRadius: 12,
                backgroundColor: '#1A2A26',
                marginHorizontal: 3,
                marginBottom: 8,
                overflow: 'hidden',
                position: 'relative',
                borderWidth: 1,
                borderColor: 'rgba(255,255,255,0.05)'
            }}
        >
            {loading ? (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F1A17' }}>
                    <ActivityIndicator size="small" color="rgba(255,255,255,0.3)" />
                </View>
            ) : thumbnail ? (
                <Image
                    source={{ uri: thumbnail }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                />
            ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F1A17' }}>
                    {/* Fallback if generation fails */}
                    <Ionicons name="videocam" size={32} color="rgba(255,255,255,0.1)" />
                </View>
            )}

            {/* View Count Overlay */}
            <View style={{
                position: 'absolute',
                bottom: 6,
                left: 6,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.5)',
                paddingHorizontal: 4,
                paddingVertical: 1,
                borderRadius: 4
            }}>
                <Ionicons name="eye-outline" size={10} color="#FFFFFF" />
                <Text style={{
                    fontFamily,
                    fontSize: 9,
                    fontWeight: '500',
                    color: '#FFFFFF',
                    marginLeft: 3
                }}>
                    {post.views_count || '0'}
                </Text>
            </View>

            {/* Delete Button */}
            {isOwner && (
                <TouchableOpacity
                    onPress={() => onDelete(post)}
                    style={{
                        position: 'absolute',
                        top: 6,
                        right: 6,
                        backgroundColor: 'rgba(239, 68, 68, 0.8)',
                        width: 24,
                        height: 24,
                        borderRadius: 12,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10
                    }}
                >
                    <Ionicons name="trash-outline" size={14} color="#FFFFFF" />
                </TouchableOpacity>
            )}
        </TouchableOpacity>
    );
});

export const CreatorPostsSection = ({ posts = [], isOwner = false, onRefresh, onPostPress }) => {

    // Calculate width once
    const itemWidth = (Dimensions.get('window').width - 60) / 3;

    const handleDelete = async (video) => {
        Alert.alert(
            'Videoyu Sil',
            `"${video.title}" başlıklı videoyu silmek istediğine emin misin ? `,
            [
                { text: 'Vazgeç', style: 'cancel' },
                {
                    text: 'Sil',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await KelamService.deleteVideo(video.id, video.video_url, video.thumbnail_url);
                            Alert.alert('Başarılı', 'Video silindi.');
                            if (onRefresh) onRefresh();
                        } catch (error) {
                            Alert.alert('Hata', 'Video silinirken bir sorun oluştu.');
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={{ marginBottom: 24, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <PostItem
                        key={post.id || index}
                        post={post}
                        index={index}
                        isOwner={isOwner}
                        onPostPress={onPostPress}
                        onDelete={handleDelete}
                        width={itemWidth}
                    />
                ))
            ) : (
                // Empty State Message
                <View style={{ width: '100%', paddingVertical: 40, alignItems: 'center' }}>
                    <Ionicons name="videocam-off-outline" size={40} color="rgba(255,255,255,0.2)" />
                    <Text style={{
                        fontFamily,
                        fontSize: 14,
                        color: 'rgba(255,255,255,0.4)',
                        marginTop: 10
                    }}>
                        Hiç içerik yok
                    </Text>
                </View>
            )}
        </View>
    );
};

export default CreatorPostsSection;
