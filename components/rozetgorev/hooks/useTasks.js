import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';
import { supabase } from '../../../lib/supabase';
import TaskService from '../../../services/TaskService';

export function useTasks() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tasksData, setTasksData] = useState({
        daily: [],
        stats: {
            totalVerses: 0,
            totalJuzs: 0,
            totalSurahs: 0,
            totalKhatims: 0,
            totalPrayers: 0,
            prayerStreak: 0,
            dhikrCount: 0,
            salavatCount: 0,
            quizCount: 0,
            shares: 0,
            follows: [],
            loginStreak: 0,
            lastLogin: new Date().toISOString().split('T')[0]
        }
    });

    // Auth listener
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (u) => setUser(u));
        return unsub;
    }, []);

    const getTodayKey = () => new Date().toISOString().split('T')[0];

    const loadData = useCallback(async (uid) => {
        try {
            setLoading(true);

            // 1. Local'den günlük görevleri çek
            const dailyTasks = await TaskService.getDailyTasks();

            // 2. Supabase'den kalıcı istatistikleri çek
            let statsData = {
                totalVerses: 0, totalJuzs: 0, totalSurahs: 0, totalKhatims: 0,
                totalPrayers: 0, prayerStreak: 0, dhikrCount: 0, salavatCount: 0, quizCount: 0,
                shares: 0, follows: [], loginStreak: 1, lastLogin: getTodayKey()
            };

            if (uid) {
                const { data: stats } = await supabase
                    .from('user_stats')
                    .select('*')
                    .eq('user_id', uid)
                    .single();

                if (stats) {
                    statsData = {
                        totalVerses: stats.total_verses || 0,
                        totalJuzs: stats.total_juzs || 0,
                        totalSurahs: stats.total_surahs || 0,
                        totalKhatims: stats.total_khatims || 0,
                        totalPrayers: stats.total_prayers || 0,
                        prayerStreak: stats.prayer_streak || 0,
                        dhikrCount: stats.total_dhikr || 0,
                        salavatCount: stats.total_salavat || 0,
                        quizCount: stats.quiz_count || 0,
                        shares: stats.shares || 0,
                        follows: stats.follows || [],
                        loginStreak: stats.login_streak || 0,
                        lastLogin: stats.last_login || getTodayKey()
                    };
                }
            }

            setTasksData({
                daily: dailyTasks,
                stats: statsData
            });

        } catch (e) {
            console.error('useTasks load error:', e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user?.uid) {
            loadData(user.uid);

            // Supabase Real-time Subscription (Önemli: Rozet ilerlemeleri anlık yansısın)
            const statsSub = supabase
                .channel(`tasks_stats:${user.uid}`)
                .on('postgres_changes',
                    { event: '*', schema: 'public', table: 'user_stats', filter: `user_id=eq.${user.uid}` },
                    () => loadData(user.uid)
                )
                .subscribe();

            return () => {
                supabase.removeChannel(statsSub);
            };
        }
    }, [user?.uid, loadData]);

    const navigateToTask = (route) => {
        if (route) router.push(route);
    };

    return {
        loading,
        tasksData,
        navigateToTask,
        user,
        refreshTasks: () => loadData(user?.uid)
    };
}
