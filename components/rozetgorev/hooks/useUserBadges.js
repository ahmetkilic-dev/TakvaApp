import { useState, useEffect } from 'react';
import { supabase } from '../../../lib/supabase';
import { useUserStats } from '../../../contexts/UserStatsContext';

/**
 * Kullanıcının rozet durumlarını çeker.
 * @returns {Object} { userBadges, loading, refreshBadges }
 * userBadges: { [badge_id]: { is_completed, current_progress, ... } }
 */
export const useUserBadges = () => {
    const { user } = useUserStats();
    const [userBadges, setUserBadges] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchBadges = async () => {
        try {
            if (!user?.uid) {
                setUserBadges({});
                setLoading(false);
                return;
            }

            setLoading(true);

            const { data, error } = await supabase
                .from('user_badges')
                .select('*')
                .eq('user_id', user.uid);

            if (error) throw error;

            // Dizi halindeki veriyi Obje'ye çevir: { 'namaz_streak_7': { ... } }
            const badgesMap = {};
            if (data) {
                data.forEach(badge => {
                    badgesMap[badge.badge_id] = badge;
                });
            }

            setUserBadges(badgesMap);
        } catch (e) {
            console.error('📛 Rozet verileri alınamadı:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBadges();
    }, [user?.uid]);

    return {
        userBadges,
        loading,
        refreshBadges: fetchBadges
    };
};
