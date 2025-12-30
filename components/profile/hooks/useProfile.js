import { useState, useEffect, useCallback } from 'react';
import { auth } from '../../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { supabase } from '../../../lib/supabase';

export function useProfile() {
    const [user, setUser] = useState(auth.currentUser);
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState({
        name: '',
        stats: {
            totalVerses: 0,
            totalSalavat: 0,
            totalDhikr: 0,
            totalPrayers: 0,
            quizCount: 0,
            completedTasks: 0,
        },
        followingCount: 0,
        badgeCount: 0,
        isPremium: false,
        following: [], // Takip edilen içerik üreticileri
        badges: [], // Kazanılan rozetler
        categoryLevels: {
            kuran: 0,
            namaz: 0,
            zksl: 0,
            ilim: 0,
            uygulama: 0
        }
    });

    // Auth Listener
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => {
            setUser(u);
            if (!u) {
                setLoading(false);
                // Reset to zeros if no user
                setProfileData({
                    name: '',
                    stats: { totalVerses: 0, totalSalavat: 0, totalDhikr: 0, totalPrayers: 0, quizCount: 0, completedTasks: 0 },
                    followingCount: 0, badgeCount: 0, isPremium: false, following: [], badges: [],
                    categoryLevels: { kuran: 0, namaz: 0, zksl: 0, ilim: 0, uygulama: 0 }
                });
            }
        });
        return unsub;
    }, []);

    // Data Fetcher
    const fetchProfileData = useCallback(async (uid, silent = false) => {
        if (!uid) return;
        if (!silent) setLoading(true);

        try {
            // Parallel fetch for better performance
            const [profileResult, statsResult] = await Promise.all([
                supabase.from('profiles').select('*').eq('id', uid).maybeSingle(),
                supabase.from('user_stats').select('*').eq('user_id', uid).maybeSingle()
            ]);

            const profile = profileResult.data;
            const stats = statsResult.data;

            if (profile || stats) {
                setProfileData(prev => {
                    const newData = { ...prev };

                    if (profile) {
                        newData.name = profile.name || '';
                        newData.isPremium = profile.is_premium || false;
                        newData.following = profile.following || [];
                        newData.followingCount = (profile.following || []).length;
                    }

                    if (stats) {
                        const { total, levels } = calculateCompletedBadges(stats);
                        newData.stats = {
                            totalVerses: stats.total_verses || 0,
                            totalSalavat: stats.total_salavat || 0,
                            totalDhikr: stats.total_dhikr || 0,
                            totalPrayers: stats.total_prayers || 0,
                            quizCount: stats.quiz_count || 0,
                            completedTasks: total,
                        };
                        newData.badgeCount = total;
                        newData.categoryLevels = levels;
                        newData.badges = getEarnedBadges(stats);
                    }

                    return newData;
                });
            }
        } catch (error) {
            console.error('Error fetching profile data from Supabase:', error);
        } finally {
            if (!silent) setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user) {
            fetchProfileData(user.uid);

            // Set up realtime subscription for updates
            const profileSub = supabase
                .channel(`profile:${user.uid}`)
                .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles', filter: `id=eq.${user.uid}` }, () => {
                    fetchProfileData(user.uid, true); // Silent update
                })
                .subscribe();

            const statsSub = supabase
                .channel(`stats:${user.uid}`)
                .on('postgres_changes', { event: '*', schema: 'public', table: 'user_stats', filter: `user_id=eq.${user.uid}` }, () => {
                    fetchProfileData(user.uid, true); // Silent update
                })
                .subscribe();

            return () => {
                supabase.removeChannel(profileSub);
                supabase.removeChannel(statsSub);
            };
        }
    }, [user, fetchProfileData]);

    return {
        user,
        loading,
        profileData,
        refreshProfile: () => fetchProfileData(user?.uid)
    };
}

// Logic to check which badges are earned
function calculateCompletedBadges(stats) {
    let total = 0;
    const levels = {
        kuran: 0,
        namaz: 0,
        zksl: 0,
        ilim: 0,
        uygulama: 0
    };

    // Kur'an
    if ((stats.total_verses || 0) >= 50) { total++; levels.kuran = 1; }
    if ((stats.total_verses || 0) >= 250) { total++; levels.kuran = 2; }
    if ((stats.total_verses || 0) >= 1000) { total++; levels.kuran = 3; }
    if ((stats.total_juzs || 0) >= 15) { total++; levels.kuran = 4; }
    if ((stats.total_surahs || 0) >= 80) { total++; levels.kuran = 5; }
    if ((stats.total_verses || 0) >= 5000) { total++; levels.kuran = 6; }
    if ((stats.total_khatims || 0) >= 1) { total++; levels.kuran = 7; }

    // Namaz
    if ((stats.total_prayers || 0) >= 5) { total++; levels.namaz = 1; }
    if ((stats.prayer_streak || 0) >= 35) { total++; levels.namaz = 2; }
    if ((stats.prayer_streak || 0) >= 150) { total++; levels.namaz = 3; }
    if ((stats.total_prayers || 0) >= 100) { total++; levels.namaz = 4; }
    if ((stats.total_prayers || 0) >= 200) { total++; levels.namaz = 5; }
    if ((stats.total_prayers || 0) >= 1000) { total++; levels.namaz = 6; }
    if ((stats.total_prayers || 0) >= 2500) { total++; levels.namaz = 7; }

    // Zikir & Salavat
    const zkslCount = Math.max(stats.total_dhikr || 0, stats.total_salavat || 0);
    if (zkslCount >= 100) { total++; levels.zksl = 1; }
    if (zkslCount >= 500) { total++; levels.zksl = 2; }
    if (zkslCount >= 1000) { total++; levels.zksl = 3; }
    if (zkslCount >= 5000) { total++; levels.zksl = 4; }
    if (zkslCount >= 10000) { total++; levels.zksl = 5; }
    if (zkslCount >= 25000) { total++; levels.zksl = 6; }
    if (zkslCount >= 50000) { total++; levels.zksl = 7; }

    // İlim
    const qCount = stats.quiz_count || 0;
    if (qCount >= 5) { total++; levels.ilim = 1; }
    if (qCount >= 15) { total++; levels.ilim = 2; }
    if (qCount >= 30) { total++; levels.ilim = 3; }
    if (qCount >= 50) { total++; levels.ilim = 4; }
    if (qCount >= 100) { total++; levels.ilim = 5; }
    if (qCount >= 200) { total++; levels.ilim = 6; }
    if (qCount >= 500) { total++; levels.ilim = 7; }

    // Uygulama (Basitleştirilmiş, ilerde gerçek verilere bağlanabilir)
    const shareCount = stats.shares || 0;
    const followCount = (stats.follows || []).length;
    const loginStr = stats.login_streak || 1;

    if (shareCount >= 1) { total++; levels.uygulama = 1; }
    if (shareCount >= 10) { total++; levels.uygulama = 2; }
    if ((stats.follows || []).includes('takva_social')) { total++; levels.uygulama = 3; }
    if (followCount >= 10) { total++; levels.uygulama = 4; }
    if (loginStr >= 3) { total++; levels.uygulama = 5; }
    if (loginStr >= 30) { total++; levels.uygulama = 6; }
    if (stats.rated) { total++; levels.uygulama = 7; }

    return { total, levels };
}

function getEarnedBadges(stats) {
    // Returns a list of badge identifiers or icons
    // For now we can just return placeholders or actual logic if needed
    return [];
}
