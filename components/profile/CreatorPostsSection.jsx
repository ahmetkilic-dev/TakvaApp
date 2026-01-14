import React, { memo, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { Image } from 'expo-image';
import { Ionicons } from '@expo/vector-icons';
import { KelamService } from '../../services/KelamService';
import { Alert } from 'react-native';
import * as VideoThumbnails from 'expo-video-thumbnails';

const fontFamily = 'Plus Jakarta Sans';

// Individual Post Item with Expo Image
const PostItem = memo(({ post, index, isOwner, onPostPress, onDelete, width }) => {
    // Debugging: Check why thumbnail is missing
    // console.log(`[PostItem] ID: ${post.id}, Thumb: ${post.thumbnail_url}`);

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
            {post.thumbnail_url ? (
                <Image
                    source={{ uri: post.thumbnail_url }}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="cover"
                    transition={500}
                    cachePolicy="memory-disk"
                />
            ) : (
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F1A17' }}>
                    <Ionicons name="videocam" size={32} color="rgba(255,255,255,0.2)" />
                </View>
            )}

            {/* View Count Overlay */}
            <View style={{
                position: 'absolute',
                bottom: 6,
                left: 6,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.6)',
                paddingHorizontal: 6,
                paddingVertical: 3,
                borderRadius: 6
            }}>
                <Ionicons name="play" size={10} color="#FFFFFF" />
                <Text style={{
                    fontFamily,
                    fontSize: 10,
                    fontWeight: '600',
                    color: '#FFFFFF',
                    marginLeft: 4
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
                        backgroundColor: 'rgba(0, 0, 0, 0.6)',
                        width: 28,
                        height: 28,
                        borderRadius: 14,
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 10,
                        borderWidth: 1,
                        borderColor: 'rgba(255,255,255,0.1)'
                    }}
                >
                    <Ionicons name="trash-outline" size={16} color="#FF4B4B" />
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
