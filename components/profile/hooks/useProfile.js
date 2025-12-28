import { useState, useEffect, useCallback } from 'react';
import { auth, db } from '../../../firebaseConfig';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

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
                    stats: { totalVerses: 0, totalSalavat: 0, totalDhikr: 0, totalPrayers: 0, quizCount: 0, completedTasks: 0 },
                    followingCount: 0, badgeCount: 0, isPremium: false, following: [], badges: []
                });
            }
        });
        return unsub;
    }, []);

    // Data Listener (Realtime)
    useEffect(() => {
        if (!user) return;

        setLoading(true);
        const userRef = doc(db, 'users', user.uid);
        const tasksRef = doc(db, 'users', user.uid, 'tasks', 'progress');

        // Main user doc for basic info and stats
        const unsubUser = onSnapshot(userRef, (snap) => {
            if (snap.exists()) {
                const data = snap.data();
                setProfileData(prev => ({
                    ...prev,
                    name: data.name || data.displayName || '',
                    isPremium: data.isPremium || false,
                    following: data.following || [],
                    followingCount: (data.following || []).length,
                }));
            }
        });

        // Sub-document for task progress and detailed stats
        const unsubTasks = onSnapshot(tasksRef, (snap) => {
            if (snap.exists()) {
                const data = snap.data();
                const stats = data.stats || {};

                // Calculate completed badge tasks (Example logic based on badgeTasks definitions)
                // This would normally be a more complex calculation based on targets
                const completedCount = calculateCompletedBadges(stats);

                setProfileData(prev => ({
                    ...prev,
                    stats: {
                        totalVerses: stats.totalVerses || 0,
                        totalSalavat: stats.totalSalavat || 0,
                        totalDhikr: stats.dhikrCount || 0,
                        totalPrayers: stats.totalPrayers || 0,
                        quizCount: stats.quizCount || 0,
                        completedTasks: completedCount,
                    },
                    badgeCount: completedCount,
                    badges: getEarnedBadges(stats),
                }));
                setLoading(false);
            } else {
                setLoading(false);
            }
        });

        return () => {
            unsubUser();
            unsubTasks();
        };
    }, [user]);

    return {
        user,
        loading,
        profileData,
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
