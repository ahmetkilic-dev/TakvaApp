import { useState, useEffect, useCallback, useMemo } from 'react';
import { auth } from '../../../firebaseConfig';
import { supabase } from '../../../lib/supabase';
import { onAuthStateChanged } from 'firebase/auth';
import { useUserStats } from '../../../contexts/UserStatsContext';

export const useProfile = () => {
    const {
        user,
        stats,
        profile,
        badgeCount,
        categoryLevels,
        userBadges, // ARTIK CONTEXT'TEN GELİYOR
        loading: statsLoading,
        isInitialized,
        refreshAll
    } = useUserStats();

    // Data mapping for legacy UI compatibility
    const profileData = useMemo(() => {
        // Server-side badges mapping
        // Sadece tamamlanmış (is_completed: true) olanları al
        const earnedBadges = (userBadges || [])
            .filter(b => b.is_completed && b.badges)
            .map(b => ({
                id: b.badge_id,
                title: b.badges.title,
                category: b.badges.category
            }));

        return {
            id: profile.id,
            name: profile.name || user?.displayName || "Misafir Kullanıcı",
            profile_picture: profile.profile_picture,
            bio: profile.bio || profile.social_links?.bio || '',
            social_links: profile.social_links || {},
            stats: {
                totalVerses: stats.total_verses || 0,
                totalSalavat: stats.total_salavat || 0,
                totalDhikr: stats.total_dhikr || 0,
                totalPrayers: stats.total_prayers || 0,
                quizCount: stats.quiz_count || 0,
                completedTasks: badgeCount,
            },
            followingCount: (profile.following || []).length,
            badgeCount: badgeCount,
            isPremium: profile.is_premium || false,
            following: profile.following || [],
            badges: earnedBadges, // ARTIK GERÇEK VERİ
            categoryLevels: categoryLevels,
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
