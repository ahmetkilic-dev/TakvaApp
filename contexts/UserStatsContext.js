import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { supabase } from '../lib/supabase';
import TaskService from '../services/TaskService';
import { UserStatsService } from '../services/UserStatsService';

const UserStatsContext = createContext(null);

const CACHE_KEY = '@takva_user_stats_cache';

export const UserStatsProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        total_verses: 0,
        total_salavat: 0,
        total_dhikr: 0,
        total_prayers: 0,
        quiz_count: 0,
        prayer_streak: 0,
        total_juzs: 0,
        total_surahs: 0,
        total_khatims: 0,
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
        is_premium: false
    });
    const [dailyTasks, setDailyTasks] = useState([]);
    const [userBadges, setUserBadges] = useState([]); // Array of { badge_id, is_completed, current_progress, badges: { title, category, ... } }
    const [isInitialized, setIsInitialized] = useState(false);

    // Initial cache loading
    const loadCache = useCallback(async () => {
        try {
            const cached = await AsyncStorage.getItem(CACHE_KEY);
            if (cached) {
                const parsed = JSON.parse(cached);
                setStats(parsed.stats || stats);
                setDailyTasks(parsed.dailyTasks || []);
                setUserBadges(parsed.userBadges || []);
                if (parsed.profile) setProfile(parsed.profile);
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

    const fetchAllData = useCallback(async (uid, silent = false) => {
        if (!uid) return;
        if (!silent) setLoading(true);

        try {
            // user_badges tablosunu, badges tablosuyla join yaparak çekiyoruz
            const [statsResult, tasksResult, profileResult, badgesResult] = await Promise.all([
                supabase.from('user_stats').select('*').eq('user_id', uid).maybeSingle(),
                TaskService.getDailyTasks(),
                supabase.from('profiles').select('id, name, username, role, application_status, following, is_premium, profile_picture, bio, social_links').eq('id', uid).maybeSingle(),
                supabase.from('user_badges').select('*, badges(title, category, icon_key, target_value)').eq('user_id', uid)
            ]);

            let finalStats = stats;
            if (statsResult.data) {
                finalStats = {
                    ...statsResult.data,
                    follows: statsResult.data.follows || []
                };
                setStats(finalStats);
            }

            const finalTasks = tasksResult || [];
            setDailyTasks(finalTasks);

            let finalProfile = profile;
            if (profileResult.data) {
                finalProfile = {
                    ...profileResult.data,
                    following: profileResult.data.following || []
                };
                setProfile(finalProfile);
            }

            const finalBadges = badgesResult.data || [];
            setUserBadges(finalBadges);

            await saveCache(finalStats, finalTasks, finalProfile, finalBadges);
        } catch (error) {
            // silent fetch error
            console.error(error);
        } finally {
            setLoading(false);
            setIsInitialized(true);
        }
    }, [saveCache, stats]);

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

    // Real-time Subscriptions
    useEffect(() => {
        if (user?.uid) {
            const statsSub = supabase
                .channel(`global_stats:${user.uid}`)
                .on('postgres_changes',
                    { event: '*', schema: 'public', table: 'user_stats', filter: `user_id=eq.${user.uid}` },
                    () => fetchAllData(user.uid, true)
                )
                .subscribe();

            const profileSub = supabase
                .channel(`global_profile:${user.uid}`)
                .on('postgres_changes',
                    { event: '*', schema: 'public', table: 'profiles', filter: `id=eq.${user.uid}` },
                    () => fetchAllData(user.uid, true)
                )
                .subscribe();

            // Badge değişikliklerini de dinleyelim
            const badgesSub = supabase
                .channel(`global_badges:${user.uid}`)
                .on('postgres_changes',
                    { event: '*', schema: 'public', table: 'user_badges', filter: `user_id=eq.${user.uid}` },
                    () => fetchAllData(user.uid, true)
                )
                .subscribe();

            return () => {
                supabase.removeChannel(statsSub);
                supabase.removeChannel(profileSub);
                supabase.removeChannel(badgesSub);
            };
        }
    }, [user?.uid, fetchAllData]);

    // Computed Values - ARTIK SERVERSIDE VERİYİ KULLANIYOR
    const badgeLogic = useMemo(() => {
        // Tamamlananları say
        const completedBadges = userBadges.filter(b => b.is_completed);
        const total = completedBadges.length;

        // Kategorilere göre seviye hesaplama (Basitçe kazanılan sayı olarak level veriyoruz şimdilik)
        // Veya en yüksek target_value'ya sahip badge'in ikon numarasını level olarak alabiliriz.
        // Şimdilik basit tutuyoruz.
        const levels = { kuran: 0, namaz: 0, zksl: 0, ilim: 0, uygulama: 0 };

        // Kategorisel sayım
        userBadges.forEach(b => {
            if (b.is_completed && b.badges) {
                const cat = b.badges.category; // 'namaz', 'zksl', 'ilim', 'kuran'
                // Mevcut mantıkta categoryLevels sadece bir sayı (level).
                // Biz basitçe o kategoride kazanılan rozet sayısını verelim.
                if (cat === 'namaz') levels.namaz++;
                if (cat === 'zksl') levels.zksl++;
                if (cat === 'ilim') levels.ilim++;
                if (cat === 'kuran') levels.kuran++;
                if (cat === 'uygulama') levels.uygulama++;
            }
        });

        return { badgeCount: total, categoryLevels: levels };
    }, [userBadges]);

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

    const incrementTask = useCallback(async (taskId, amount = 1) => {
        // Update local state for instant feedback
        setDailyTasks(prev => prev.map(t =>
            t.id === taskId ? { ...t, progress: Math.min(t.target, t.progress + amount) } : t
        ));
        // Persist to storage
        await TaskService.incrementTaskProgress(taskId, amount);
    }, []);

    const refreshTasks = useCallback(async () => {
        const tasks = await TaskService.getDailyTasks();
        setDailyTasks(tasks);
    }, []);

    const value = useMemo(() => ({
        user,
        stats,
        profile,
        dailyTasks,
        userBadges, // Expose raw data
        loading,
        isInitialized,
        ...badgeLogic,
        updateStat,
        incrementTask,
        refreshTasks,
        refreshAll: () => fetchAllData(user?.uid)
    }), [user, stats, profile, dailyTasks, userBadges, loading, isInitialized, badgeLogic, updateStat, incrementTask, refreshTasks]);

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
