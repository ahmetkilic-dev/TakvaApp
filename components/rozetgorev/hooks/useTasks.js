import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../../firebaseConfig';

const DAILY_TASKS_TEMPLATE = [
    { id: 1, text: 'Günün ayetini oku.', progress: 0, target: 1, route: '/(app)/(services)/quran' },
    { id: 2, text: 'Bugün en az 20 ayet oku.', progress: 0, target: 20, route: '/(app)/(services)/quran' },
    { id: 3, text: 'Bugün 100 zikir yap.', progress: 0, target: 100, route: '/(app)/(services)/dhikr' },
    { id: 4, text: 'Bugün bir salavat getir.', progress: 0, target: 1, route: '/(app)/(services)/dhikr' },
    { id: 5, text: 'Bugün bir namaz vaktini işaretle.', progress: 0, target: 1, route: '/(app)/(services)/namazdurumu' },
    { id: 6, text: "bu Kelam'dan bir içerik izle.", progress: 0, target: 1, route: '/(app)/(tabs)/kelam' },
    { id: 7, text: 'Bugün Hoca AI\'ye bir soru sor.', progress: 0, target: 1, route: '/(app)/(services)/hoca-ai' },
];

export function useTasks() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tasksData, setTasksData] = useState({
        daily: {
            lastReset: new Date().toISOString().split('T')[0],
            tasks: DAILY_TASKS_TEMPLATE
        },
        stats: {
            totalVerses: 0,
            totalJuzs: 0,
            totalSurahs: 0,
            totalKhatims: 0,
            totalPrayers: 0,
            prayerStreak: 0,
            dhikrCount: 0,
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
            let data;
            if (uid) {
                const docRef = doc(db, 'users', uid, 'tasks', 'progress');
                const snap = await getDoc(docRef);
                if (snap.exists()) {
                    data = snap.data();
                }
            } else {
                const local = await AsyncStorage.getItem('@takva_tasks_data');
                if (local) data = JSON.parse(local);
            }

            if (data) {
                const today = getTodayKey();
                if (data.daily?.lastReset !== today) {
                    // Reset daily tasks
                    data.daily = {
                        lastReset: today,
                        tasks: DAILY_TASKS_TEMPLATE
                    };
                    // Increment login streak if applicable
                    const yesterday = new Date();
                    yesterday.setDate(yesterday.getDate() - 1);
                    const yesterdayKey = yesterday.toISOString().split('T')[0];

                    if (data.stats.lastLogin === yesterdayKey) {
                        data.stats.loginStreak += 1;
                    } else if (data.stats.lastLogin !== today) {
                        data.stats.loginStreak = 1;
                    }
                    data.stats.lastLogin = today;

                    // Save reset data
                    if (uid) {
                        const docRef = doc(db, 'users', uid, 'tasks', 'progress');
                        await setDoc(docRef, data, { merge: true });
                    } else {
                        await AsyncStorage.setItem('@takva_tasks_data', JSON.stringify(data));
                    }
                }
                setTasksData(data);
            } else {
                // Initial setup
                const initial = {
                    daily: { lastReset: getTodayKey(), tasks: DAILY_TASKS_TEMPLATE },
                    stats: {
                        totalVerses: 0, totalJuzs: 0, totalSurahs: 0, totalKhatims: 0,
                        totalPrayers: 0, prayerStreak: 0, dhikrCount: 0, quizCount: 0,
                        shares: 0, follows: [], loginStreak: 1, lastLogin: getTodayKey()
                    }
                };
                setTasksData(initial);
                if (uid) {
                    const docRef = doc(db, 'users', uid, 'tasks', 'progress');
                    await setDoc(docRef, initial);
                } else {
                    await AsyncStorage.setItem('@takva_tasks_data', JSON.stringify(initial));
                }
            }
        } catch (e) {
            console.error('Task load error:', e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadData(user?.uid);
    }, [user?.uid, loadData]);

    const navigateToTask = (route) => {
        if (route) router.push(route);
    };

    return {
        loading,
        tasksData,
        navigateToTask,
        user
    };
}
