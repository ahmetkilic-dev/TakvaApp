import { useState, useEffect, useCallback } from 'react';
import { auth } from '../../../firebaseConfig';
import { supabase } from '../../../lib/supabase';
import { onAuthStateChanged } from 'firebase/auth';
import { useUserStats } from '../../../contexts/UserStatsContext';

export const useProfile = () => {
    const {
        user,
        stats,
        badgeCount,
        categoryLevels,
        loading: statsLoading,
        isInitialized
    } = useUserStats();

    const [profileLoading, setProfileLoading] = useState(true);
    const [profileInfo, setProfileInfo] = useState({
        name: '',
        isPremium: false,
        following: [],
        followingCount: 0
    });

    const fetchProfileInfo = useCallback(async (uid, silent = false) => {
        if (!uid) return;
        if (!silent) setProfileLoading(true);

        try {
            const { data: profile } = await supabase
                .from('profiles')
                .select('name, is_premium, following')
                .eq('id', uid)
                .maybeSingle();

            if (profile) {
                setProfileInfo({
                    name: profile.name || '',
                    isPremium: profile.is_premium || false,
                    following: profile.following || [],
                    followingCount: (profile.following || []).length
                });
            }
        } catch (error) {
            console.error('useProfile: fetchProfileInfo error', error);
        } finally {
            if (!silent) setProfileLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user?.uid) {
            fetchProfileInfo(user.uid);

            const profileSub = supabase
                .channel(`profile_info:${user.uid}`)
                .on('postgres_changes',
                    { event: '*', schema: 'public', table: 'profiles', filter: `id=eq.${user.uid}` },
                    () => fetchProfileInfo(user.uid, true)
                )
                .subscribe();

            return () => {
                supabase.removeChannel(profileSub);
            };
        } else if (isInitialized && !user) {
            setProfileLoading(false);
        }
    }, [user?.uid, isInitialized, fetchProfileInfo]);

    // Data mapping for legacy UI compatibility
    const profileData = {
        name: profileInfo.name || user?.displayName || "Misafir Kullanıcı",
        stats: {
            totalVerses: stats.total_verses || 0,
            totalSalavat: stats.total_salavat || 0,
            totalDhikr: stats.total_dhikr || 0,
            totalPrayers: stats.total_prayers || 0,
            quizCount: stats.quiz_count || 0,
            completedTasks: badgeCount,
        },
        followingCount: profileInfo.followingCount,
        badgeCount: badgeCount,
        isPremium: profileInfo.isPremium,
        following: profileInfo.following,
        badges: getEarnedBadges(stats),
        categoryLevels: categoryLevels
    };

    return {
        user,
        loading: statsLoading || (profileLoading && !isInitialized),
        profileData,
        refreshProfile: () => fetchProfileInfo(user?.uid)
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
