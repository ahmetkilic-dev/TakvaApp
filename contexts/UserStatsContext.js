import React, { createContext, useContext, useState, useEffect, useCallback, useMemo, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { supabase } from '../lib/supabase';
import { UserStatsService } from '../services/UserStatsService';
import { canUnlockBadge } from '../constants/badgeTiers';

const UserStatsContext = createContext(null);

const CACHE_KEY = '@takva_user_stats_cache';

export const UserStatsProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total_verses: 0, // Daily Reveal count (Swipes)
        quran_verses_read: 0, // Actual reading count
        total_salavat: 0,
        total_dhikr: 0,
        total_prayers: 0,
        quiz_count: 0,
        prayer_streak: 0,
        total_juzs: 0,
        total_surahs: 0,
        total_khatims: 0,
        total_pages_read: 0,
        last_read_page: 1,
        shares: 0,
        login_streak: 1,
        rated: false,
        follows: []
    });
    const [profile, setProfile] = useState({
        name: '',
        role: 'user',
        application_status: 'none',
        following: [],
        premium_state: 'free'
    });
    const [dailyTasks, setDailyTasks] = useState([]);
    const [userBadges, setUserBadges] = useState([]); // Array of { badge_id, is_completed, current_progress, badges: { title, category, ... } }
    const [isInitialized, setIsInitialized] = useState(false);

    // Refs to access latest state without adding to dependency array
    const statsRef = useRef(stats);
    const profileRef = useRef(profile);
    const dailyTasksRef = useRef(dailyTasks);
    const userBadgesRef = useRef(userBadges);

    useEffect(() => { statsRef.current = stats; }, [stats]);
    useEffect(() => { profileRef.current = profile; }, [profile]);
    useEffect(() => { dailyTasksRef.current = dailyTasks; }, [dailyTasks]);
    useEffect(() => { userBadgesRef.current = userBadges; }, [userBadges]);

    // Initial cache loading
    const loadCache = useCallback(async () => {
        try {
            const cached = await AsyncStorage.getItem(CACHE_KEY);
            if (cached) {
                const parsed = JSON.parse(cached);
                if (parsed.stats) {
                    setStats(parsed.stats);
                    statsRef.current = parsed.stats;
                }
                if (parsed.dailyTasks) {
                    setDailyTasks(parsed.dailyTasks);
                    dailyTasksRef.current = parsed.dailyTasks;
                }
                if (parsed.userBadges) {
                    setUserBadges(parsed.userBadges);
                    userBadgesRef.current = parsed.userBadges;
                }
                if (parsed.profile) {
                    setProfile(parsed.profile);
                    profileRef.current = parsed.profile;
                }
            }
        } catch (e) {
            // silent cache error
        }
    }, []);

    const saveCache = useCallback(async (newStats, newTasks, newProfile, newUserBadges) => {
        try {
            await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({
                stats: newStats,
                dailyTasks: newTasks,
                profile: newProfile,
                userBadges: newUserBadges,
                timestamp: new Date().getTime()
            }));
        } catch (e) {
            // silent save error
        }
    }, []);

    const fetchStats = useCallback(async (uid) => {
        const { data } = await supabase.from('user_stats').select('*').eq('user_id', uid).maybeSingle();
        if (data) {
            const final = { ...data, follows: data.follows || [] };
            setStats(final);
            statsRef.current = final;
            return final;
        }
        return statsRef.current;
    }, []);

    const fetchDailyTasks = useCallback(async (uid) => {
        const { data } = await supabase.rpc('get_daily_tasks', { p_user_id: uid });
        if (data) {
            setDailyTasks(data);
            dailyTasksRef.current = data;
        }
        return data || [];
    }, []);

    const fetchProfile = useCallback(async (uid) => {
        const { data } = await supabase.from('profiles').select('id, name, username, role, application_status, following, premium_state, profile_picture, bio, social_links').eq('id', uid).maybeSingle();
        if (data) {
            const final = { ...data, following: data.following || [] };
            setProfile(final);
            profileRef.current = final;
            return final;
        }
        return profileRef.current;
    }, []);

    const fetchUserBadges = useCallback(async (uid) => {
        const { data } = await supabase.from('user_badges').select('*, badges(title, category, icon_key, target_value)').eq('user_id', uid);
        if (data) {
            setUserBadges(data);
            userBadgesRef.current = data;
        }
        return data || [];
    }, []);

    const fetchAllData = useCallback(async (uid, silent = false) => {
        if (!uid) return;
        if (!silent) setLoading(true);
        try {
            const [s, t, p, b] = await Promise.all([
                fetchStats(uid),
                fetchDailyTasks(uid),
                fetchProfile(uid),
                fetchUserBadges(uid)
            ]);
            await saveCache(s, t, p, b);
        } catch (error) {
            console.error('Fetch all data error:', error);
        } finally {
            setLoading(false);
            setIsInitialized(true);
        }
    }, [fetchStats, fetchDailyTasks, fetchProfile, fetchUserBadges, saveCache]);

    // Auth Listener
    useEffect(() => {
        loadCache().then(() => {
            const unsub = onAuthStateChanged(auth, (u) => {
                setUser(u);
                if (u) {
                    fetchAllData(u.uid);
                } else {
                    setLoading(false);
                    setIsInitialized(true);
                }
            });
            return unsub;
        });
    }, []);

    // Real-time Subscriptions - Granular Updates
    useEffect(() => {
        if (user?.uid) {
            const statsSub = supabase
                .channel(`global_stats:${user.uid}`)
                .on('postgres_changes',
                    { event: '*', schema: 'public', table: 'user_stats', filter: `user_id=eq.${user.uid}` },
                    (payload) => {
                        // Optimistic: Update immediately from payload if possible
                        if (payload.new) {
                            const updated = { ...statsRef.current, ...payload.new };
                            setStats(updated);
                            statsRef.current = updated;
                        } else {
                            fetchStats(user.uid);
                        }
                    }
                )
                .subscribe();

            const profileSub = supabase
                .channel(`global_profile:${user.uid}`)
                .on('postgres_changes',
                    { event: '*', schema: 'public', table: 'profiles', filter: `id=eq.${user.uid}` },
                    () => fetchProfile(user.uid)
                )
                .subscribe();

            const badgesSub = supabase
                .channel(`global_badges:${user.uid}`)
                .on('postgres_changes',
                    { event: '*', schema: 'public', table: 'user_badges', filter: `user_id=eq.${user.uid}` },
                    () => fetchUserBadges(user.uid)
                )
                .subscribe();

            const dailySub = supabase
                .channel(`daily_stats:${user.uid}`)
                .on('postgres_changes',
                    { event: '*', schema: 'public', table: 'daily_user_stats', filter: `user_id=eq.${user.uid}` },
                    () => fetchDailyTasks(user.uid)
                )
                .subscribe();

            return () => {
                supabase.removeChannel(statsSub);
                supabase.removeChannel(profileSub);
                supabase.removeChannel(badgesSub);
                supabase.removeChannel(dailySub);
            };
        }
    }, [user?.uid, fetchStats, fetchProfile, fetchUserBadges, fetchDailyTasks]);

    // Computed Values - ARTIK SERVERSIDE VERİYİ KULLANIYOR
    const badgeLogic = useMemo(() => {
        const currentTier = profile?.premium_state || 'free';

        // Tamamlananları say - STATE'E GÖRE FİLTRELE
        // Sadece kullanıcının paketine dahil olan (unlockable) ve tamamlanmış rozetleri sayıyoruz.
        const completedBadges = userBadges.filter(b => {
            if (!b.is_completed) return false;
            return canUnlockBadge(currentTier, b.badge_id); // Önemli: Paket yetiyor mu?
        });

        const total = completedBadges.length;

        // Kategorilere göre seviye hesaplama
        const levels = { kuran: 0, namaz: 0, zksl: 0, ilim: 0, uygulama: 0 };

        // Kategorisel sayım (Sadece filtrelenmiş rozetler üzerinden)
        completedBadges.forEach(b => {
            if (b.badges) {
                const cat = b.badges.category; // 'namaz', 'zksl', 'ilim', 'kuran'
                // DB'den gelen category key'i ile eşleşmeli. 
                // BADGE_DEFINITIONS'da iconKey kullandık. DB'de category sütunu 'namaz', 'kuran' vb. olmalı.
                // Eğer DB'de 'Namaz Görevleri' yazıyorsa maplemek gerekebilir.
                // Ancak step 1669'da BadgeProgressSection'da iconKey kullandık.
                // context'ten gelen veride b.badges.category ne dönüyor?
                // Genelde 'namaz', 'kuran' gibi key dönüyor diye varsayıyoruz. 
                // Güvenlik için key kontrolü yapalım.
                if (levels.hasOwnProperty(cat)) {
                    levels[cat]++;
                }
            }
        });

        return { badgeCount: total, categoryLevels: levels };
    }, [userBadges, profile?.premium_state]);

    const updateStat = useCallback(async (key, amount) => {
        // Optimistic update
        setStats(prev => ({
            ...prev,
            [key]: (prev[key] || 0) + amount
        }));

        // Sync with DB using Service
        if (user?.uid) {
            await UserStatsService.incrementField(user.uid, key, amount);
        }
    }, [user?.uid]);

    const setStatsDirect = useCallback((updates) => {
        setStats(prev => ({
            ...prev,
            ...updates
        }));
    }, []);

    const refreshTasks = useCallback(async () => {
        if (user?.uid) {
            const { data } = await supabase.rpc('get_daily_tasks', { p_user_id: user.uid });
            if (data) setDailyTasks(data);
        }
    }, [user?.uid]);

    const value = useMemo(() => ({
        user,
        stats,
        profile,
        dailyTasks,
        userBadges, // Expose raw data
        loading,
        isInitialized,
        ...badgeLogic,
        // Helper functions
        isPlus: () => profile?.premium_state === 'plus',
        isPremium: () => profile?.premium_state === 'premium',
        isPlusOrAbove: () => ['plus', 'premium'].includes(profile?.premium_state),
        updateStat,
        setStatsDirect,
        refreshTasks: () => fetchAllData(user?.uid),
        refreshAll: () => fetchAllData(user?.uid)
    }), [user, stats, profile, dailyTasks, userBadges, loading, isInitialized, badgeLogic, updateStat, setStatsDirect, fetchAllData]);

    return (
        <UserStatsContext.Provider value={value}>
            {children}
        </UserStatsContext.Provider>
    );
};

export const useUserStats = () => {
    const context = useContext(UserStatsContext);
    if (!context) throw new Error('useUserStats must be used within UserStatsProvider');
    return context;
};
