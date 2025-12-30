import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { Platform } from 'react-native';
import { NotificationService } from '../services/notificationService';

const STORAGE_KEY = '@takva_app_notifications';
const BACKGROUND_NOTIFICATION_TASK = 'BACKGROUND_NOTIFICATION_RESCHEDULE';

// Define the background task outside the hook
TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, async () => {
    try {
        console.log('🔄 [Background] Arka plan bildirimleri yenileniyor...');
        const result = await NotificationService.rescheduleAll();

        if (result.success) {
            console.log(`✅ [Background] Yenileme başarılı: ${result.count} bildirim kuruldu.`);
            return BackgroundFetch.BackgroundFetchResult.NewData;
        }
        return BackgroundFetch.BackgroundFetchResult.NoData;
    } catch (error) {
        console.error('❌ [Background] Arka plan görev hatası:', error);
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
});

export const useAppNotifications = () => {
    const [notificationStates, setNotificationStates] = useState({
        all: false,
        prayer: false,
        verse: false,
        dhikr: false,
        knowledge: false,
        religious: false,
    });
    const [notificationPermission, setNotificationPermission] = useState(null);
    const [loading, setLoading] = useState(true);

    // Register background task and Android channels
    useEffect(() => {
        const setup = async () => {
            try {
                // Setup Android Channels
                await NotificationService.setupChannels();

                // Check and Request Permissions
                await NotificationService.checkAndRequestPermissions();
                const status = await NotificationService.getPermissionStatus();
                setNotificationPermission(status);

                // Register Background Task
                const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_NOTIFICATION_TASK);
                if (!isRegistered) {
                    await BackgroundFetch.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK, {
                        minimumInterval: 60 * 60 * 12, // 12 hours
                        stopOnTerminate: false,
                        startOnBoot: true,
                    });
                    console.log('✅ [Setup] Arka plan görev kaydı başarılı (12 saat).');
                }
            } catch (err) {
                console.log('❌ [Setup] Hatası:', err);
            }
        };
        setup();
    }, []);

    // Load setttings on mount
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const stored = await AsyncStorage.getItem(STORAGE_KEY);
                if (stored) {
                    const parsed = JSON.parse(stored);
                    setNotificationStates(parsed);
                }
                // Always ensure notifications are up to date on app launch
                await NotificationService.rescheduleAll();
            } catch (error) {
                console.error('❌ [LoadSettings] Hatası:', error);
            } finally {
                setLoading(false);
            }
        };
        loadSettings();
    }, []);

    const saveSettings = async (newState) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
            setNotificationStates(newState);
            // Trigger immediate reschedule when settings change
            await NotificationService.rescheduleAll();
        } catch (error) {
            console.error('❌ [SaveSettings] Hatası:', error);
        }
    };

    const toggleNotification = (id) => {
        let newState = { ...notificationStates };
        if (id === 'all') {
            const newValue = !notificationStates.all;
            newState = Object.keys(newState).reduce((acc, key) => {
                acc[key] = newValue;
                return acc;
            }, {});
        } else {
            newState[id] = !notificationStates[id];
            const { all, ...rest } = newState;
            const allEnabled = Object.values(rest).every(v => v);
            newState.all = allEnabled;
        }
        saveSettings(newState);
    };

    return {
        notificationStates,
        notificationPermission,
        loading,
        toggleNotification,
    };
};

