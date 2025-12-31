import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, StatusBar, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { supabase } from '../../../lib/supabase';
import UserService from '../../../services/UserService';
import { useUserStats } from '../../../contexts/UserStatsContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Search Result Card Component (matching user design)
const SearchResultCard = ({ creator, currentUserId }) => {
    const router = useRouter();
    const [stats, setStats] = useState({ followerCount: 0, totalLikes: 0 });
    const [isFollowing, setIsFollowing] = useState(false);
    const [followLoading, setFollowLoading] = useState(false);
    const [loading, setLoading] = useState(true);

    const loadStats = useCallback(async () => {
        const data = await UserService.getCreatorStats(creator.id);
        setStats(data);

        // Check following status
        const followed = await UserService.getFollowStatus(currentUserId, creator.id);
        setIsFollowing(followed);
        setLoading(false);
    }, [creator.id, currentUserId]);

    useEffect(() => {
        loadStats();
    }, [loadStats]);

    const handleFollowToggle = async () => {
        if (!currentUserId) return;
        setFollowLoading(true);
        try {
            const newStatus = await UserService.toggleFollow(currentUserId, creator.id);
            // newStatus is true if now following, false if unfollowed
            if (newStatus !== null && newStatus !== undefined) {
                setIsFollowing(newStatus);
                setStats(prev => ({
                    ...prev,
                    followerCount: newStatus ? prev.followerCount + 1 : Math.max(0, prev.followerCount - 1)
                }));
            }
        } catch (error) {
            console.error('Search follow error:', error);
        } finally {
            setFollowLoading(false);
        }
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => router.push(`/(app)/(services)/creator-profile/${creator.id}`)}
            style={styles.cardContainer}
        >
            <View style={styles.cardTop}>
                {/* Avatar */}
                <View style={styles.avatarBorder}>
                    {creator.profile_picture ? (
                        <Image
                            source={{ uri: creator.profile_picture }}
                            style={styles.avatar}
                            contentFit="cover"
                        />
                    ) : (
                        <View style={[styles.avatar, { backgroundColor: '#F2F2F7', alignItems: 'center', justifyContent: 'center' }]}>
                            <Ionicons name="person" size={24} color="#8E8E93" />
                        </View>
                    )}
                </View>

                {/* Info */}
                <View style={styles.infoContainer}>
                    <Text style={styles.username}>{creator.username || creator.name}</Text>
                    <View style={styles.statsRow}>
                        <Text style={styles.statsText}>{formatNumber(stats.followerCount)} takipçi</Text>
                        <View style={styles.dot} />
                        <Text style={styles.statsText}>{formatNumber(stats.totalLikes)} beğeni</Text>
                    </View>
                </View>

                <TouchableOpacity
                    onPress={handleFollowToggle}
                    disabled={followLoading}
                    style={[
                        styles.followButton,
                        !isFollowing && { backgroundColor: 'rgba(0,0,0,0.1)', borderWidth: 1, borderColor: 'rgba(0,0,0,0.1)' }
                    ]}
                >
                    {followLoading ? (
                        <ActivityIndicator size="small" color={isFollowing ? "white" : "black"} />
                    ) : (
                        <Text style={[styles.followButtonText, !isFollowing && { color: 'black' }]}>
                            {isFollowing ? 'Takipte' : 'Takip Et'}
                        </Text>
                    )}
                </TouchableOpacity>
            </View>

            {/* Divider */}
            <View style={styles.divider} />

            {/* Bio Section */}
            <View style={styles.cardBottom}>
                <Text numberOfLines={3} style={styles.bioText}>
                    {creator.bio || (creator.social_links?.bio) || ''}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default function KelamSearchScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { user } = useUserStats();

    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSearch = async (text) => {
        setSearchQuery(text);
        if (text.length >= 2) {
            setLoading(true);
            const data = await UserService.searchCreators(text);
            setResults(data);
            setLoading(false);
        } else {
            setResults([]);
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            <SafeAreaView edges={['top']} className="flex-1">
                {/* Search Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
                    </TouchableOpacity>

                    <View style={styles.searchInputContainer}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Sözler köşkü"
                            placeholderTextColor="rgba(255,255,255,0.4)"
                            value={searchQuery}
                            onChangeText={handleSearch}
                            autoFocus
                        />
                    </View>
                </View>

                {/* Results List */}
                <View style={styles.content}>
                    {loading ? (
                        <View style={styles.centerContainer}>
                            <ActivityIndicator color="#D4AF37" size="large" />
                        </View>
                    ) : results.length > 0 ? (
                        <FlatList
                            data={results}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{ alignItems: 'center', paddingTop: 20 }}
                            renderItem={({ item }) => (
                                <SearchResultCard creator={item} currentUserId={user?.uid} />
                            )}
                        />
                    ) : searchQuery.length >= 2 ? (
                        <View style={styles.centerContainer}>
                            <Text style={styles.emptyText}>Sonuç bulunamadı.</Text>
                        </View>
                    ) : null}
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#071512', // Match the darker green background from image
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        marginRight: 12,
    },
    searchInputContainer: {
        flex: 1,
        height: 44,
        backgroundColor: '#1A2321', // Dark background for input
        borderWidth: 1.5,
        borderColor: '#4A5553',
        borderRadius: 10,
        justifyContent: 'center',
        paddingHorizontal: 15,
    },
    searchInput: {
        color: '#FFFFFF',
        fontFamily: 'Plus Jakarta Sans',
        fontSize: 16,
    },
    content: {
        flex: 1,
    },
    centerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
    },
    emptyText: {
        color: 'rgba(255,255,255,0.4)',
        fontSize: 16,
        fontFamily: 'Plus Jakarta Sans',
    },
    // Search Result Card Styles (Strictly 330x114 as requested)
    cardContainer: {
        width: SCREEN_WIDTH - 35,
        height: 114,
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        padding: 12,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTop: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 6,
    },
    avatarBorder: {
        width: 44,
        height: 44,
        borderRadius: 22,
        borderWidth: 2,
        borderColor: '#898F8E',
        padding: 2,
        marginRight: 10,
    },
    avatar: {
        width: '100%',
        height: '100%',
        borderRadius: 22,
    },
    infoContainer: {
        flex: 1,
    },
    username: {
        fontSize: 17,
        fontWeight: '700',
        color: '#000',
        fontFamily: 'Plus Jakarta Sans',
        marginBottom: 2,
    },
    statsRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statsText: {
        fontSize: 11,
        color: '#8E8E93',
        fontFamily: 'Plus Jakarta Sans',
    },
    dot: {
        width: 2,
        height: 2,
        borderRadius: 1,
        backgroundColor: '#8E8E93',
        marginHorizontal: 4,
    },
    followButton: {
        backgroundColor: '#1A1A1A',
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: 18,
    },
    followButtonText: {
        color: '#FFFFFF',
        fontSize: 12,
        fontWeight: '600',
        fontFamily: 'Plus Jakarta Sans',
    },
    divider: {
        height: 0.5,
        backgroundColor: '#E5E5EA',
        marginVertical: 6,
    },
    cardBottom: {
        paddingHorizontal: 2,
    },
    bioText: {
        fontSize: 11,
        color: '#3A3A3C',
        lineHeight: 14,
        fontFamily: 'Plus Jakarta Sans',
    }
});
