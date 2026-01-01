
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { supabase } from '../../../../lib/supabase';
import ScreenBackground from '../../../../components/common/ScreenBackground';
import { UserService } from '../../../../services/UserService';
import { KelamService } from '../../../../services/KelamService';
import { useUserStats } from '../../../../contexts/UserStatsContext';
import CreatorPostsSection from '../../../../components/profile/CreatorPostsSection';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function CreatorProfileScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { user, refreshAll } = useUserStats();

    const [profile, setProfile] = useState(null);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);

    const loadData = useCallback(async (isRefresh = false) => {
        if (!id) return;

        // Only trigger full screen loading if generic load and no data
        if (!isRefresh && !profile) {
            setLoading(true);
        }

        try {
            // Modified profile fetch to include username directly from profiles table
            const [profileDataResult, videoData, followerCount] = await Promise.all([
                supabase.from('profiles').select('id, name, username, role, application_status, following, is_premium, profile_picture, bio, social_links').eq('id', id).maybeSingle(),
                KelamService.fetchCreatorVideos(id),
                UserService.getFollowerCount(id)
            ]);

            if (profileDataResult.data) {
                setProfile({ ...profileDataResult.data, follower_count: followerCount });
            } else {
                setProfile(null); // Handle case where profile is not found
            }
            setVideos(videoData);

            if (user) {
                const following = await UserService.getFollowStatus(user.uid, id);
                setIsFollowing(following);
            }
        } catch (error) {
            console.error('CreatorProfile: Load error', error);
        } finally {
            setLoading(false);
        }
    }, [id, user, profile]);

    useEffect(() => {
        // Initial load only
        loadData();
    }, [loadData]);

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadData(true);
        setRefreshing(false);
    };

    const handleFollowToggle = async () => {
        if (!user) return;
        setFollowLoading(true);
        try {
            const newStatus = await UserService.toggleFollow(user.uid, id);
            setIsFollowing(newStatus);
            // Refresh own stats to update "following" count
            await refreshAll();

            // Optimistically update follower count in UI
            setProfile(prev => ({
                ...prev,
                // Update local follower count if possible
            }));

        } catch (error) {
            console.error('Follow error:', error);
        } finally {
            setFollowLoading(false);
        }
    };

    if (loading) {
        return (
            <ScreenBackground>
                <SafeAreaView className="flex-1 justify-center items-center">
                    <ActivityIndicator color="#D4AF37" size="large" />
                </SafeAreaView>
            </ScreenBackground>
        );
    }

    if (!profile) return null;

    // Social bio fallback to match Edit Profile logic
    const bioDisplay = profile.bio || profile.social_links?.bio;

    return (
        <ScreenBackground>
            <SafeAreaView edges={['top']} className="flex-1">
                {/* Header: Centered Username similar to Tasks header */}
                <View className="items-center justify-center py-4 border-b border-white/5 relative">
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="absolute left-4 w-10 h-10 items-center justify-center z-10"
                    >
                        <Ionicons name="chevron-back" size={28} color="#FFF" />
                    </TouchableOpacity>
                    <Text className="text-white font-['Cinzel-Black'] text-2xl tracking-widest uppercase shadow-sm shadow-black">
                        {profile.username || "İÇERİK ÜRETİCİSİ"}
                    </Text>
                </View>

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40 }}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#D4AF37" />
                    }
                >
                    <View className="px-5 pt-8">
                        {/* Top Section: Avatar Left, Info Right */}
                        <View className="flex-row items-start">
                            {/* Left: Avatar (80x80) */}
                            <View style={{
                                width: 100,
                                height: 100,
                                borderRadius: 50,
                                borderWidth: 2,
                                borderColor: '#898F8E',
                                padding: 4,
                                backgroundColor: 'rgba(255,255,255,0.05)',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} className="mr-5">
                                {profile.profile_picture ? (
                                    <Image
                                        source={{ uri: profile.profile_picture }}
                                        style={{ width: '100%', height: '100%', borderRadius: 46 }}
                                        contentFit="cover"
                                    />
                                ) : (
                                    <Ionicons name="person" size={50} color="rgba(255,255,255,0.3)" />
                                )}
                            </View>

                            {/* Right: Info (Username & Bio) */}
                            <View className="flex-1 pt-1">
                                {/* Name (22px) */}
                                <Text style={{ fontSize: 22 }} className="text-white font-['Plus Jakarta Sans'] font-bold mb-1 leading-7">
                                    {profile.name}
                                </Text>

                                {/* Bio */}
                                {bioDisplay ? (
                                    <Text className="text-white/80 font-['Plus Jakarta Sans'] text-sm leading-5">
                                        {bioDisplay}
                                    </Text>
                                ) : null}
                            </View>
                        </View>

                        {/* Center Follow Button (Directly below Bio, zero gap) */}
                        <View className="items-center mt-0 mb-8">
                            <TouchableOpacity
                                onPress={handleFollowToggle}
                                disabled={followLoading}
                                style={{
                                    width: 140,
                                    height: 38,
                                    backgroundColor: isFollowing ? 'rgba(255, 255, 255, 0.15)' : 'transparent',
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: !isFollowing ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {followLoading ? (
                                    <ActivityIndicator color="white" size="small" />
                                ) : (
                                    <Text className="text-white font-['Plus Jakarta Sans'] font-semibold text-sm">
                                        {isFollowing ? 'Takipte' : 'Takip et'}
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>

                        {/* Divider */}
                        <View className="h-[1px] bg-white/10 mb-4" />

                        {/* Stats Row */}
                        <View className="flex-row justify-around mb-4">
                            <View className="items-center">
                                <Text className="text-white font-bold text-xl font-['Plus Jakarta Sans']">{videos.length}</Text>
                                <Text className="text-white/60 text-xs font-['Plus Jakarta Sans']">gönderi</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-white font-bold text-xl font-['Plus Jakarta Sans']">
                                    {profile.follower_count || "-"}
                                </Text>
                                <Text className="text-white/60 text-xs font-['Plus Jakarta Sans']">takipçi</Text>
                            </View>
                            <View className="items-center">
                                <Text className="text-white font-bold text-xl font-['Plus Jakarta Sans']">{(profile.following || []).length}</Text>
                                <Text className="text-white/60 text-xs font-['Plus Jakarta Sans']">takip</Text>
                            </View>
                        </View>

                        {/* Divider */}
                        <View className="h-[1px] bg-white/10 mb-4" />

                    </View>

                    {/* Videos Grid */}
                    <CreatorPostsSection
                        posts={videos}
                        isOwner={false}
                        onRefresh={loadData}
                        onPostPress={(video, index) => {
                            router.push({
                                pathname: '/(app)/(services)/creator-feed',
                                params: { id: profile.id, initialVideoId: video.id }
                            });
                        }}
                    />

                </ScrollView>
            </SafeAreaView>
        </ScreenBackground>
    );
}
