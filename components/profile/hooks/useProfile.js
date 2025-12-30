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
                    followingCount: 0, badgeCount: 0, isPremium: false, following: [], badges: []
                });
            }
        });
        return unsub;
    }, []);

    // Data Fetcher
    const fetchProfileData = useCallback(async (uid) => {
        if (!uid) return;
        setLoading(true);

        try {
            // Profile data fetch
            const { data: profile, error: pError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', uid)
                .single();

            if (profile) {
                setProfileData(prev => ({
                    ...prev,
                    name: profile.name || '',
                    isPremium: profile.is_premium || false,
                    following: profile.following || [],
                    followingCount: (profile.following || []).length,
                }));
            }

            // Stats data fetch
            const { data: stats, error: sError } = await supabase
                .from('user_stats')
                .select('*')
                .eq('user_id', uid)
                .single();

            if (stats) {
                const completedCount = calculateCompletedBadges(stats);
                setProfileData(prev => ({
                    ...prev,
                    stats: {
                        totalVerses: stats.total_verses || 0,
                        totalSalavat: stats.total_salavat || 0,
                        totalDhikr: stats.dhikr_count || 0,
                        totalPrayers: stats.total_prayers || 0,
                        quizCount: stats.quiz_count || 0,
                        completedTasks: completedCount,
                    },
                    badgeCount: completedCount,
                    badges: getEarnedBadges(stats),
                }));
            }
        } catch (error) {
            console.error('Error fetching profile data from Supabase:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user) {
            fetchProfileData(user.uid);

            // Set up realtime subscription for updates
            const profileSub = supabase
                .channel(`profile:${user.uid}`)
                .on('postgres_changes', { event: '*', schema: 'public', table: 'profiles', filter: `id=eq.${user.uid}` }, () => {
                    fetchProfileData(user.uid);
                })
                .subscribe();

            const statsSub = supabase
                .channel(`stats:${user.uid}`)
                .on('postgres_changes', { event: '*', schema: 'public', table: 'user_stats', filter: `user_id=eq.${user.uid}` }, () => {
                    fetchProfileData(user.uid);
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
    let count = 0;
    // Kur'an
    if (stats.totalVerses >= 50) count++;
    if (stats.totalVerses >= 250) count++;
    if (stats.totalVerses >= 1000) count++;
    if (stats.totalJuzs >= 15) count++;
    if (stats.totalSurahs >= 80) count++;
    if (stats.totalVerses >= 5000) count++;
    if (stats.totalKhatims >= 1) count++;

    // Namaz
    if (stats.totalPrayers >= 5) count++; // Logic for "all in one day" is simplified here
    if (stats.prayerStreak >= 35) count++;
    if (stats.prayerStreak >= 150) count++;
    if (stats.totalPrayers >= 100) count++;
    if (stats.totalPrayers >= 200) count++;
    if (stats.totalPrayers >= 1000) count++;
    if (stats.totalPrayers >= 2500) count++;

    // Zikir
    if (stats.dhikrCount >= 100) count++;
    if (stats.dhikrCount >= 500) count++;
    if (stats.dhikrCount >= 1000) count++;
    if (stats.dhikrCount >= 5000) count++;
    if (stats.dhikrCount >= 10000) count++;
    if (stats.dhikrCount >= 25000) count++;
    if (stats.dhikrCount >= 50000) count++;

    // İlim
    if (stats.quizCount >= 5) count++;
    if (stats.quizCount >= 15) count++;
    if (stats.quizCount >= 30) count++;
    if (stats.quizCount >= 50) count++;
    if (stats.quizCount >= 100) count++;
    if (stats.quizCount >= 200) count++;
    if (stats.quizCount >= 500) count++;

    return count;
}

function getEarnedBadges(stats) {
    // Returns a list of badge identifiers or icons
    // For now we can just return placeholders or actual logic if needed
    return [];
}
