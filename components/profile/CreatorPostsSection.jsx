import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KelamService } from '../../services/KelamService';
import { Alert } from 'react-native';

const fontFamily = 'Plus Jakarta Sans';

export const CreatorPostsSection = ({ posts = [], isOwner = false, onRefresh }) => {

    const handleDelete = async (video) => {
        Alert.alert(
            'Videoyu Sil',
            `"${video.title}" başlıklı videoyu silmek istediğine emin misin?`,
            [
                { text: 'Vazgeç', style: 'cancel' },
                {
                    text: 'Sil',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await KelamService.deleteVideo(video.id, video.video_url);
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
                    <View
                        key={post.id || index}
                        style={{
                            width: (Dimensions.get('window').width - 60) / 3, // 3 column grid with padding
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
                                resizeMode="cover"
                            />
                        ) : (
                            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F1A17' }}>
                                <Ionicons name="play-circle" size={32} color="rgba(255,255,255,0.2)" />
                            </View>
                        )}

                        {/* Text Overlay */}
                        <View style={{ position: 'absolute', bottom: 25, left: 0, right: 0, paddingHorizontal: 6 }}>
                            <Text numberOfLines={1} style={{
                                fontFamily,
                                fontSize: 11,
                                fontWeight: '700',
                                color: '#FFFFFF',
                                textAlign: 'center',
                                textShadowColor: 'rgba(0, 0, 0, 0.8)',
                                textShadowOffset: { width: 0, height: 1 },
                                textShadowRadius: 4
                            }}>
                                {post.title || "İçerik"}
                            </Text>
                        </View>

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
                                onPress={() => handleDelete(post)}
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
                    </View>
                ))
            ) : (
                // Placeholder band when no posts
                [1, 2, 3].map((_, i) => (
                    <View
                        key={i}
                        style={{
                            width: (Dimensions.get('window').width - 60) / 3,
                            height: 180,
                            borderRadius: 12,
                            backgroundColor: '#1A2A26',
                            marginHorizontal: 3,
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: 0.3
                        }}
                    >
                        <Ionicons name="image-outline" size={30} color="#FFFFFF" />
                    </View>
                ))
            )}
        </View>
    );
};

export default CreatorPostsSection;
