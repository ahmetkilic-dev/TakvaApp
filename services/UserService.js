import { supabase } from '../lib/supabase';

export const UserService = {
    /**
     * Get full profile details including stats
     */
    async getProfile(userId) {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('UserService: getProfile error', error);
            return null;
        }
    },

    /**
     * Update profile details (bio, social links, etc.)
     */
    async updateProfile(userId, updates) {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', userId)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('UserService: updateProfile error', error);
            throw error;
        }
    },

    async searchCreators(query) {
        try {
            if (!query || query.length < 2) return [];

            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .or(`username.ilike.%${query}%,name.ilike.%${query}%`)
                .or(`role.eq.creator,application_status.eq.approved`)
                .limit(10);

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('UserService: searchCreators error', error);
            return [];
        }
    },

    async getCreatorStats(creatorId) {
        try {
            // 1. Get Followers
            const followerCount = await this.getFollowerCount(creatorId);

            // 2. Get Total Likes from all their videos
            const { data: videos, error } = await supabase
                .from('kelam_videos')
                .select('likes_count')
                .eq('creator_id', creatorId);

            if (error) throw error;

            const totalLikes = (videos || []).reduce((sum, v) => sum + (v.likes_count || 0), 0);

            return {
                followerCount,
                totalLikes
            };
        } catch (error) {
            console.error('UserService: getCreatorStats error', error);
            return { followerCount: 0, totalLikes: 0 };
        }
    },

    /**
     * Toggle follow status
     * Uses the 'toggle_follow' RPC function we created
     */
    async toggleFollow(currentUserId, targetUserId) {
        try {
            const { data, error } = await supabase
                .rpc('toggle_follow', {
                    current_user_id: currentUserId,
                    target_user_id: targetUserId
                });

            if (error) throw error;
            return data; // Returns true (following) or false (unfollowed)
        } catch (error) {
            console.error('UserService: toggleFollow error', error);
            throw error;
        }
    },

    /**
     * Check if current user follows target user
     */
    async getFollowStatus(currentUserId, targetUserId) {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('following')
                .eq('id', currentUserId)
                .single();

            if (error) throw error;

            const following = data?.following || [];
            return following.includes(targetUserId);
        } catch (error) {
            console.error('UserService: getFollowStatus error', error);
            return false;
        }
    },

    /**
     * Get follower count for a user
     * Counts how many profiles have targetUserId in their following array
     */
    async getFollowerCount(targetUserId) {
        if (!targetUserId) return 0;
        try {
            // jsonb kolonlarda 'contains' filtresi için PostgREST bazen ham JSON string bekler.
            // Explicit olarak JSON array string gönderiyoruz: ["ID"]
            const jsonTarget = JSON.stringify([targetUserId]);

            const { count, error } = await supabase
                .from('profiles')
                .select('id', { count: 'exact', head: true })
                .filter('following', 'cs', jsonTarget);

            if (error) {
                console.error('UserService: getFollowerCount query error:', error);
                throw error;
            }
            return count || 0;
        } catch (error) {
            console.error('UserService: getFollowerCount error', {
                message: error?.message,
                details: error?.details,
                hint: error?.hint,
                code: error?.code,
                userId: targetUserId,
                explanation: 'Eğer hata mesajı boşsa, muhtemelen profiles tablosunda RLS politikası eksiktir. Profil listeleme izni (SELECT) herkes için açık olmalıdır.'
            });
            return 0;
        }
    }
};

export default UserService;
