import { useCallback } from 'react';
import { useRouter } from 'expo-router';
import { useUserStats } from '../../../contexts/UserStatsContext';

export const useTasks = () => {
    const router = useRouter();
    const {
        user,
        stats,
        dailyTasks,
        loading,
        refreshAll
    } = useUserStats();

    const navigateToTask = (route) => {
        if (route) {
            router.push(route);
        }
    };

    return {
        user,
        tasksData: {
            daily: dailyTasks || [],
            stats: {
                totalVerses: stats.total_verses || 0,
                totalSalavat: stats.total_salavat || 0,
                totalDhikr: stats.total_dhikr || 0,
                totalPrayers: stats.total_prayers || 0,
                quizCount: stats.quiz_count || 0,
                prayerStreak: stats.prayer_streak || 0,
                totalJuzs: stats.total_juzs || 0,
                totalSurahs: stats.total_surahs || 0,
                totalKhatims: stats.total_khatims || 0,
                shares: stats.shares || 0,
                loginStreak: stats.login_streak || 1,
                rated: stats.rated || false,
                follows: stats.follows || [],
                dhikrCount: stats.total_dhikr || 0, // compatibility
                salavatCount: stats.total_salavat || 0 // compatibility
            },
        },
        loading,
        refreshTasks: refreshAll,
        navigateToTask
    };
};
