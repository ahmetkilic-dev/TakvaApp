import { supabase } from '../lib/supabase';

/**
 * KelamService - Handles video metadata and interactions
 */
export const KelamService = {
    /**
     * Fetch video feed with creator info
     */
    async fetchVideos(limit = 10, offset = 0) {
        try {
            const { data, error } = await supabase
                .from('kelam_videos')
                .select(`
                    *,
                    creator:profiles!kelam_videos_creator_id_fkey(id, name)
                `)
                .order('created_at', { ascending: false })
                .range(offset, offset + limit - 1);

            if (error) throw error;
            return data || [];
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
            console.error('KelamService: toggleLike error', error);
            return false;
        }
    },

    /**
     * Fetch videos for a specific creator
     */
    async fetchCreatorVideos(creatorId) {
        try {
            const { data, error } = await supabase
                .from('kelam_videos')
                .select('*')
                .eq('creator_id', creatorId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return data || [];
        } catch (error) {
            console.error('KelamService: fetchCreatorVideos error:', error);
            return [];
        }
    },

    /**
     * Delete a video (Supabase record + R2 file)
     */
    async deleteVideo(videoId, videoUrl) {
        try {
            // 1. R2'den dosyayı siliyoruz (Worker üzerinden)
            if (videoUrl) {
                const fileName = videoUrl.split('/').pop();
                const workerUrl = 'https://takva-uploader.dev-400.workers.dev'; // R2UploadService'den çekilebilir

                try {
                    await fetch(`${workerUrl}/${fileName}`, {
                        method: 'DELETE'
                    });
                } catch (e) {
                    console.error('R2 deletion skipped/failed:', e);
                }
            }

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
