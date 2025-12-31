import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { supabase } from '../lib/supabase';
import TaskService from '../services/TaskService';

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
    const [isInitialized, setIsInitialized] = useState(false);

    // Initial cache loading
    const loadCache = useCallback(async () => {
        try {
            const cached = await AsyncStorage.getItem(CACHE_KEY);
            if (cached) {
                const parsed = JSON.parse(cached);
                setStats(parsed.stats || stats);
                setDailyTasks(parsed.dailyTasks || []);
                if (parsed.profile) setProfile(parsed.profile);
            }
        } catch (e) {
            console.warn('UserStatsContext: Cache load error', e);
        }
    }, []);

    const saveCache = useCallback(async (newStats, newTasks, newProfile) => {
        try {
            await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({
                stats: newStats,
                dailyTasks: newTasks,
                profile: newProfile,
                timestamp: new Date().getTime()
            }));
        } catch (e) {
            console.warn('UserStatsContext: Cache save error', e);
        }
    }, []);

    const fetchAllData = useCallback(async (uid, silent = false) => {
        if (!uid) return;
        if (!silent) setLoading(true);

        try {
            const [statsResult, tasksResult, profileResult] = await Promise.all([
                supabase.from('user_stats').select('*').eq('user_id', uid).maybeSingle(),
                TaskService.getDailyTasks(),
                supabase.from('profiles').select('id, name, role, application_status, following, is_premium').eq('id', uid).maybeSingle()
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
                console.log('UserStatsContext: Profile data fetched:', profileResult.data);
                finalProfile = {
                    ...profileResult.data,
                    following: profileResult.data.following || []
                };
                setProfile(finalProfile);
            }

            await saveCache(finalStats, finalTasks, finalProfile);
        } catch (error) {
            console.error('UserStatsContext: fetchAllData error', error);
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

            return () => {
                supabase.removeChannel(statsSub);
                supabase.removeChannel(profileSub);
            };
        }
    }, [user?.uid, fetchAllData]);

    // Computed Values
    const badgeLogic = useMemo(() => {
        let total = 0;
        const levels = { kuran: 0, namaz: 0, zksl: 0, ilim: 0, uygulama: 0 };

        const s = stats;

        // Kur'an
        if ((s.total_verses || 0) >= 50) { total++; levels.kuran = 1; }
        if ((s.total_verses || 0) >= 250) { total++; levels.kuran = 2; }
        if ((s.total_verses || 0) >= 1000) { total++; levels.kuran = 3; }
        if ((s.total_juzs || 0) >= 15) { total++; levels.kuran = 4; }
        if ((s.total_surahs || 0) >= 80) { total++; levels.kuran = 5; }
        if ((s.total_verses || 0) >= 5000) { total++; levels.kuran = 6; }
        if ((s.total_khatims || 0) >= 1) { total++; levels.kuran = 7; }

        // Namaz
        if ((s.total_prayers || 0) >= 5) { total++; levels.namaz = 1; }
        if ((s.prayer_streak || 0) >= 35) { total++; levels.namaz = 2; }
        if ((s.prayer_streak || 0) >= 150) { total++; levels.namaz = 3; }
        if ((s.total_prayers || 0) >= 100) { total++; levels.namaz = 4; }
        if ((s.total_prayers || 0) >= 200) { total++; levels.namaz = 5; }
        if ((s.total_prayers || 0) >= 1000) { total++; levels.namaz = 6; }
        if ((s.total_prayers || 0) >= 2500) { total++; levels.namaz = 7; }

        // Zikir & Salavat
        const zkslCount = Math.max(s.total_dhikr || 0, s.total_salavat || 0);
        if (zkslCount >= 100) { total++; levels.zksl = 1; }
        if (zkslCount >= 500) { total++; levels.zksl = 2; }
        if (zkslCount >= 1000) { total++; levels.zksl = 3; }
        if (zkslCount >= 5000) { total++; levels.zksl = 4; }
        if (zkslCount >= 10000) { total++; levels.zksl = 5; }
        if (zkslCount >= 25000) { total++; levels.zksl = 6; }
        if (zkslCount >= 50000) { total++; levels.zksl = 7; }

        // İlim
        const qCount = s.quiz_count || 0;
        if (qCount >= 5) { total++; levels.ilim = 1; }
        if (qCount >= 15) { total++; levels.ilim = 2; }
        if (qCount >= 30) { total++; levels.ilim = 3; }
        if (qCount >= 50) { total++; levels.ilim = 4; }
        if (qCount >= 100) { total++; levels.ilim = 5; }
        if (qCount >= 200) { total++; levels.ilim = 6; }
        if (qCount >= 500) { total++; levels.ilim = 7; }

        // Uygulama
        const shareCount = s.shares || 0;
        const followCount = (s.follows || []).length;
        const loginStr = s.login_streak || 1;

        if (shareCount >= 1) { total++; levels.uygulama = 1; }
        if (shareCount >= 10) { total++; levels.uygulama = 2; }
        if ((s.follows || []).includes('takva_social')) { total++; levels.uygulama = 3; }
        if (followCount >= 10) { total++; levels.uygulama = 4; }
        if (loginStr >= 3) { total++; levels.uygulama = 5; }
        if (loginStr >= 30) { total++; levels.uygulama = 6; }
        if (s.rated) { total++; levels.uygulama = 7; }

        return { badgeCount: total, categoryLevels: levels };
    }, [stats]);

    const updateStat = useCallback((key, amount) => {
        setStats(prev => ({
            ...prev,
            [key]: (prev[key] || 0) + amount
        }));
    }, []);

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
        loading,
        isInitialized,
        ...badgeLogic,
        updateStat,
        incrementTask,
        refreshTasks,
        refreshAll: () => fetchAllData(user?.uid)
    }), [user, stats, profile, dailyTasks, loading, isInitialized, badgeLogic, updateStat, incrementTask, refreshTasks]);

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
