import { useState, useEffect, useCallback, useMemo } from 'react';

import { useUserStats } from '../../../contexts/UserStatsContext';

export const useProfile = () => {
    const {
        user,
        stats,
        profile,
        subscription,
        badgeCount,
        categoryLevels,
        userBadges, // ARTIK CONTEXT'TEN GELİYOR
        loading: statsLoading,
        isInitialized,
        refreshAll,
        isPremium,
        isPlus
    } = useUserStats();

    const profileData = useMemo(() => {
        const earnedBadges = userBadges.map(ub => ({
            ...ub.badge,
            earnedDate: ub.earnedDate
        }));

        return {
            user,
            stats,
            profile,
            profile_picture: profile?.profile_picture,
            name: profile.surname ? `${profile.name} ${profile.surname}` : profile.name,
            following: profile.following || [],
            followingCount: (profile.following || []).length,
            badgeCount: badgeCount,
            categoryLevels: categoryLevels,
            userBadges,
            isPremium: isPremium(), // Helper from context
            isPlus: isPlus(),       // Helper from context
            premiumState: subscription?.subscription_type || 'free',
            role: profile.role || 'user',
            followerCount: 0, // Fallback for missing DB column as previously discussed
            postCount: 0,     // Fallback for missing DB column
            applicationStatus: profile.application_status || 'none',
            isApproved: profile.application_status === 'approved'
        };
    }, [profile, user, stats, badgeCount, categoryLevels, userBadges]);

    return {
        user,
        loading: !isInitialized || statsLoading,
        profileData,
        refreshProfile: refreshAll
    };
}
