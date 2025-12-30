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
        dailyTasks, // Artık context'ten geliyor, anlık güncel
        stats: {
            dhikrCount: stats.total_dhikr || 0,
            salavatCount: stats.total_salavat || 0,
            quizCount: stats.quiz_count || 0
        },
        loading,
        refreshTasks: refreshAll,
        navigateToTask
    };
};
