import AsyncStorage from '@react-native-async-storage/async-storage';

const TASKS_STORAGE_KEY = '@takva_daily_tasks_v2';

export const DAILY_TASKS_TEMPLATE = [
    { id: 1, text: 'Günün ayetini oku.', progress: 0, target: 1, route: '/(app)/(services)/quran' },
    { id: 2, text: 'Bugün en az 20 ayet oku.', progress: 0, target: 20, route: '/(app)/(services)/quran' },
    { id: 3, text: 'Bugün 100 zikir yap.', progress: 0, target: 100, route: '/(app)/(services)/dhikr' },
    { id: 4, text: 'Bugün bir salavat getir.', progress: 0, target: 1, route: '/(app)/(tabs)/home' },
    { id: 5, text: 'Bugün bir namaz vaktini işaretle.', progress: 0, target: 1, route: '/(app)/(services)/namazdurumu' },
    { id: 6, text: "bu Kelam'dan bir içerik izle.", progress: 0, target: 1, route: '/(app)/(tabs)/kelam' },
    { id: 7, text: 'Bugün Hoca AI\'ye bir soru sor.', progress: 0, target: 1, route: '/(app)/(services)/hoca-ai' },
];

const getTodayKey = () => new Date().toISOString().split('T')[0];

const TaskService = {
    /**
     * Günlük görevleri çeker, gün değişmişse sıfırlar.
     */
    async getDailyTasks() {
        try {
            const today = getTodayKey();
            const stored = await AsyncStorage.getItem(TASKS_STORAGE_KEY);

            if (stored) {
                const parsed = JSON.parse(stored);
                if (parsed.lastReset === today) {
                    return parsed.tasks;
                }
            }

            // Eğer veri yoksa veya gün geçmişse sıfırla
            const initialData = {
                lastReset: today,
                tasks: DAILY_TASKS_TEMPLATE
            };
            await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(initialData));
            return initialData.tasks;
        } catch (e) {
            console.error('TaskService.getDailyTasks error:', e);
            return DAILY_TASKS_TEMPLATE;
        }
    },

    /**
     * Belirli bir görevin ilerlemesini artırır.
     * @param {number} taskId - Görev ID'si
     * @param {number} amount - Eklenecek miktar
     */
    async incrementTaskProgress(taskId, amount = 1) {
        try {
            const today = getTodayKey();
            const stored = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
            let data;

            if (stored) {
                data = JSON.parse(stored);
                if (data.lastReset !== today) {
                    data = { lastReset: today, tasks: DAILY_TASKS_TEMPLATE };
                }
            } else {
                data = { lastReset: today, tasks: DAILY_TASKS_TEMPLATE };
            }

            data.tasks = data.tasks.map(task => {
                if (task.id === taskId) {
                    const newProgress = Math.min(task.target, task.progress + amount);
                    return { ...task, progress: newProgress };
                }
                return task;
            });

            await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(data));

            return data.tasks;
        } catch (e) {
            console.error('TaskService.incrementTaskProgress error:', e);
        }
    },

    /**
     * Bir görevi direkt tamamlandı olarak işaretler.
     */
    async completeTask(taskId) {
        try {
            const today = getTodayKey();
            const stored = await AsyncStorage.getItem(TASKS_STORAGE_KEY);
            let data = stored ? JSON.parse(stored) : { lastReset: today, tasks: DAILY_TASKS_TEMPLATE };

            data.tasks = data.tasks.map(task => {
                if (task.id === taskId) {
                    return { ...task, progress: task.target };
                }
                return task;
            });

            await AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.error('TaskService.completeTask error:', e);
        }
    }
};

export default TaskService;
