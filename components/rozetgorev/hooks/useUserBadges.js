import { useMemo } from 'react';
import { useUserStats } from '../../../contexts/UserStatsContext';

/**
 * Kullanıcının rozet durumlarını UserStatsContext'ten alır (cache'den).
 * Artık gereksiz network request yok!
 * @returns {Object} { userBadges, loading }
 * userBadges: { [badge_id]: { is_completed, current_progress, ... } }
 */
export const useUserBadges = () => {
    const { userBadges: badgesArray, loading } = useUserStats();

    // Dizi halindeki veriyi Obje'ye çevir: { 'namaz_streak_7': { ... } }
    const userBadges = useMemo(() => {
        const badgesMap = {};
        if (badgesArray && Array.isArray(badgesArray)) {
            badgesArray.forEach(badge => {
                badgesMap[badge.badge_id] = badge;
            });
        }
        return badgesMap;
    }, [badgesArray]);

    return {
        userBadges,
        loading
    };
};
