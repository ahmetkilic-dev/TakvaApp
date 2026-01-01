import { supabase } from '../lib/supabase';

/**
 * KelamService - Handles video metadata and interactions
 */
export const KelamService = {
    // Simple in-memory cache for instant loading
    _feedCache: [],

    getCachedFeed() {
        return this._feedCache;
    },

    /**
     * Fetch video feed with creator info
     */
    async fetchVideos(limit = 20, offset = 0, userId = null, shouldShuffle = true) {
        try {
            const { data, error } = await supabase
                .from('kelam_videos')
                .select(`
                    *,
                    creator:profiles!kelam_videos_creator_id_fkey(id, name, username, profile_picture)
                `)
                .order('created_at', { ascending: false })
                // Calculate range based on larger limit for better variety
                .range(offset, offset + limit - 1);

            if (error) throw error;

            let videos = data || [];

            // If user is logged in, check which videos they liked
            if (userId && videos.length > 0) {
                const videoIds = videos.map(v => v.id);
                const { data: likes } = await supabase
                    .from('kelam_likes')
                    .select('video_id')
                    .eq('user_id', userId)
                    .in('video_id', videoIds);

                const likedSet = new Set(likes?.map(l => l.video_id));
                videos = videos.map(v => ({
                    ...v,
                    isLiked: likedSet.has(v.id)
                }));
            }

            // Client-side shuffle only if requested
            if (shouldShuffle) {
                const shuffled = videos.sort(() => Math.random() - 0.5);
                if (offset === 0) this._feedCache = shuffled;
                return shuffled;
            }

            if (offset === 0) this._feedCache = videos;
            return videos;
        } catch (error) {
            console.error('KelamService: fetchVideos error', error);
            return [];
        }
    },

    /**
     * Increment view count for a video
     */
    async incrementView(videoId) {
        try {
            const { error } = await supabase.rpc('increment_kelam_views', { video_id: videoId });
            if (error) throw error;
        } catch (error) {
            console.error('KelamService: incrementView error', error);
        }
    },

    /**
     * Save video metadata to Supabase
     */
    async saveVideoMetadata(videoData) {
        try {
            const { data, error } = await supabase
                .from('kelam_videos')
                .insert([videoData])
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            console.error('KelamService: saveVideoMetadata error', error);
            throw error;
        }
    },

    /**
     * Like/Unlike a video
     */
    async toggleLike(videoId, userId, isLiked) {
        try {
            console.log('[KelamService] toggleLike processing:', { videoId, userId, isLiked });

            if (!userId) {
                console.error('[KelamService] toggleLike failed: No userId provided');
                return false;
            }

            if (isLiked) {
                const { error } = await supabase
                    .from('kelam_likes')
                    .delete()
                    .match({ user_id: userId, video_id: videoId });
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('kelam_likes')
                    .insert([{ user_id: userId, video_id: videoId }]);
                if (error) throw error;
            }
            return true;
        } catch (error) {
            console.error('[KelamService] toggleLike error', error);
            return false;
        }
    },

    /**
     * Fetch videos for a specific creator
     */
    async fetchCreatorVideos(creatorId, currentUserId = null) {
        try {
            const { data, error } = await supabase
                .from('kelam_videos')
                .select(`
                    *,
                    creator:profiles!kelam_videos_creator_id_fkey(id, name, username, profile_picture)
                `)
                .eq('creator_id', creatorId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            let videos = data || [];

            // If user is logged in, check which videos they liked
            if (currentUserId && videos.length > 0) {
                const videoIds = videos.map(v => v.id);
                const { data: likes } = await supabase
                    .from('kelam_likes')
                    .select('video_id')
                    .eq('user_id', currentUserId)
                    .in('video_id', videoIds);

                const likedSet = new Set(likes?.map(l => l.video_id));
                videos = videos.map(v => ({
                    ...v,
                    isLiked: likedSet.has(v.id)
                }));
            }

            return videos;
        } catch (error) {
            console.error('KelamService: fetchCreatorVideos error:', error);
            return [];
        }
    },

    /**
     * Delete a video (Supabase record + R2 file)
     */
    async deleteVideo(videoId, videoUrl, thumbUrl) {
        try {
            const workerUrl = 'https://takva-uploader.dev-400.workers.dev';

            const deleteFile = async (url) => {
                if (!url) return;
                try {
                    const fileName = url.split('/').pop();
                    await fetch(`${workerUrl}/${fileName}`, { method: 'DELETE' });
                } catch (e) {
                    console.error('R2 deletion failed:', url, e);
                }
            };

            // 1. R2'den dosyaları siliyoruz (Video + Thumbnail)
            await deleteFile(videoUrl);
            await deleteFile(thumbUrl);

            // 2. Supabase'den kaydı siliyoruz
            const { error } = await supabase
                .from('kelam_videos')
                .delete()
                .match({ id: videoId });

            if (error) throw error;
            return true;
        } catch (error) {
            console.error('KelamService: deleteVideo error', error);
            throw error;
        }
    }
};

export default KelamService;
