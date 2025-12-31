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
        loading: statsLoading,
        isInitialized,
        refreshAll
    } = useUserStats();

    // Data mapping for legacy UI compatibility
    const profileData = useMemo(() => ({
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
        badges: getEarnedBadges(stats),
        categoryLevels: categoryLevels,
        role: profile.role || 'user',
        followerCount: 0, // Fallback for missing DB column as previously discussed
        postCount: 0,     // Fallback for missing DB column
        applicationStatus: profile.application_status || 'none',
        isApproved: profile.application_status === 'approved'
    }), [profile, user, stats, badgeCount, categoryLevels]);

    return {
        user,
        loading: !isInitialized || statsLoading,
        profileData,
        refreshProfile: refreshAll
    };
}

function getEarnedBadges(stats) {
    const earned = [];
    if (!stats) return earned;

    // Kuran
    if (stats.total_verses >= 50) earned.push({ id: 'k1', title: 'İlk Adım', category: 'Kur\'an' });
    if (stats.total_verses >= 250) earned.push({ id: 'k2', title: 'Hafız Yolunda', category: 'Kur\'an' });
    if (stats.total_juzs >= 15) earned.push({ id: 'k3', title: 'Yolun Yarısı', category: 'Kur\'an' });
    if (stats.total_khatims >= 1) earned.push({ id: 'k4', title: 'Hatmi Şerif', category: 'Kur\'an' });

    // Namaz
    if (stats.total_prayers >= 5) earned.push({ id: 'n1', title: 'Beş Vakit', category: 'Namaz' });
    if (stats.prayer_streak >= 35) earned.push({ id: 'n2', title: 'İstikrar Abidesi', category: 'Namaz' });

    // Zikir
    if (stats.total_dhikr >= 1000) earned.push({ id: 'z1', title: 'Zakir', category: 'Zikir' });

    // İlim
    if (stats.quiz_count >= 10) earned.push({ id: 'i1', title: 'Talib', category: 'İlim' });

    return earned;
}
