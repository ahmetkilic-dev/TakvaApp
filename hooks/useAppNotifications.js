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

        const result = await NotificationService.rescheduleAll();

        if (result.success) {

            return BackgroundFetch.BackgroundFetchResult.NewData;
        }
        return BackgroundFetch.BackgroundFetchResult.NoData;
    } catch (error) {

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
                        minimumInterval: 60 * 60 * 24, // 24 hours
                        stopOnTerminate: false,
                        startOnBoot: true,
                    });

                }
            } catch (err) {

            }
        };
        setup();

        // Handle Alarm Actions (Stop / Snooze)
        const subscription = Notifications.addNotificationResponseReceivedListener(response => {
            const actionId = response.actionIdentifier;
            const notificationContent = response.notification.request.content;
            const data = notificationContent.data;

            if (actionId === 'SNOOZE_ACTION') {

                const snoozeDate = new Date();
                snoozeDate.setMinutes(snoozeDate.getMinutes() + 5);

                Notifications.scheduleNotificationAsync({
                    content: {
                        ...notificationContent,
                        title: `(Ertelendi) ${data.title || notificationContent.title}`,
                        body: `Erteleme: ${data.body || notificationContent.body}`,
                    },
                    trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: snoozeDate },
                });
            } else if (actionId === 'STOP_ACTION') {

            }
        });

        return () => subscription.remove();
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

            } finally {
                setLoading(false);
            }
        };
        loadSettings();
    }, []);

    const saveSettings = async (newState, changedKey = null) => {
        try {
            await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
            setNotificationStates(newState);

            // If specific key changed, only reschedule that type
            // If 'all' changed or no specific key, reschedule everything
            if (changedKey && changedKey !== 'all') {

                await NotificationService.rescheduleSpecific(changedKey);
            } else {

                await NotificationService.rescheduleAll();
            }
        } catch (error) {

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
            saveSettings(newState, 'all');
        } else {
            newState[id] = !notificationStates[id];
            const { all, ...rest } = newState;
            const allEnabled = Object.values(rest).every(v => v);
            newState.all = allEnabled;
            saveSettings(newState, id); // Pass the changed key
        }
    };

    return {
        notificationStates,
        notificationPermission,
        loading,
        toggleNotification,
    };
};

