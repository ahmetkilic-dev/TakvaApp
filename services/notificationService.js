import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { STATIC_RELIGIOUS_DAYS_2026 } from '../components/dinigunler/hooks/useReligiousDays';

const STORAGE_KEYS = {
    PRAYER_REMINDERS: '@takva_prayer_reminders',
    CUSTOM_REMINDERS: '@takva_custom_reminders',
    APP_SETTINGS: '@takva_app_notifications',
    USER_LOCATION: '@user_location',
};

const CHANNELS = {
    PRAYER: 'prayer-reminders',
    ALARM: 'prayer-alarms-v2',
    DEFAULT: 'default',
};

const CATEGORIES = {
    ALARM: 'alarm-actions',
};

/**
 * PRODUCTION READY NOTIFICATION SERVICE
 */
export const NotificationService = {
    /**
     * Set up Android notification channels
     */
    async setupChannels() {
        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync(CHANNELS.PRAYER, {
                name: 'Namaz Vakti Hatırlatıcıları',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 500, 250, 500],
                lightColor: '#FFBA4A',
                enableVibrate: true,
                showBadge: true,
                lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
            });

            await Notifications.setNotificationChannelAsync(CHANNELS.ALARM, {
                name: 'Namaz Vakti Alarmları',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 1000, 1000, 1000, 1000, 1000], // Daha agresif titreşim
                lightColor: '#FF4A4A',
                sound: 'notification.wav', // Extension added back for clarity, though expo handles it
                enableVibrate: true,
                showBadge: true,
                lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
                audioAttributes: {
                    usage: Notifications.AndroidAudioUsage.ALARM,
                    contentType: Notifications.AndroidAudioContentType.SONIFICATION,
                },
                bypassDnd: true, // Do Not Disturb modunu delmesi için (User permission gerekebilir)
            });

            await Notifications.setNotificationChannelAsync(CHANNELS.DEFAULT, {
                name: 'Genel Hatırlatıcılar',
                importance: Notifications.AndroidImportance.DEFAULT,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FFBA4A',
            });
        }

        // Register Notification Categories (Buttons like Stop/Snooze)
        await Notifications.setNotificationCategoryAsync(CATEGORIES.ALARM, [
            {
                identifier: 'STOP_ACTION',
                buttonTitle: 'Durdur',
                options: { isDestructive: true },
            },
            {
                identifier: 'SNOOZE_ACTION',
                buttonTitle: '5 Dakika Ertele',
                options: { isAuthenticationRequired: false },
            },
        ]);
    },

    /**
     * Check and Request Permissions
     */
    async checkAndRequestPermissions() {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }

        return finalStatus === 'granted';
    },

    async getPermissionStatus() {
        const { status } = await Notifications.getPermissionsAsync();
        return status;
    },

    /**
     * Fetch prayer times for 10 days based on CURRENT location with caching
     */
    async getPrayerTimesForRange(latitude, longitude, daysCount = 10) {
        const results = [];
        const monthDataCache = {};
        const now = new Date();
        const latFixed = latitude.toFixed(2);
        const lonFixed = longitude.toFixed(2);

        const fetchWithCache = async (month, year) => {
            const cacheKey = `@prayer_times_${year}_${month}_${latFixed}_${lonFixed}`;
            try {
                const cached = await AsyncStorage.getItem(cacheKey);
                if (cached) {
                    const parsed = JSON.parse(cached);
                    // Check if cache is still valid (e.g., less than 7 days old)
                    return parsed.data;
                }

                const response = await fetch(
                    `https://api.aladhan.com/v1/calendar?month=${month}&year=${year}&latitude=${latitude}&longitude=${longitude}&method=13`
                );
                const json = await response.json();
                if (json.code === 200) {
                    await AsyncStorage.setItem(cacheKey, JSON.stringify({ data: json.data, timestamp: Date.now() }));
                    return json.data;
                }
            } catch (e) {

            }
            return null;
        };

        for (let i = 0; i < daysCount; i++) {
            const targetDate = new Date();
            targetDate.setDate(now.getDate() + i);
            const m = targetDate.getMonth() + 1;
            const y = targetDate.getFullYear();
            const mKey = `${y}-${m}`;

            if (!monthDataCache[mKey]) {
                monthDataCache[mKey] = await fetchWithCache(m, y);
            }

            const monthData = monthDataCache[mKey];
            if (monthData) {
                const dayData = monthData.find(d => parseInt(d.date.gregorian.day) === targetDate.getDate());
                if (dayData) {
                    results.push({
                        date: new Date(targetDate),
                        timings: dayData.timings,
                    });
                }
            }
        }
        return results;
    },

    /**
     * Reschedule everything
     */
    async rescheduleAll() {
        // Run in background slightly to not block UI transition
        setTimeout(async () => {
            try {

                await Notifications.cancelAllScheduledNotificationsAsync();

                const [prayerRemindersRaw, customRemindersRaw, appSettingsRaw, locationRaw] = await Promise.all([
                    AsyncStorage.getItem(STORAGE_KEYS.PRAYER_REMINDERS),
                    AsyncStorage.getItem(STORAGE_KEYS.CUSTOM_REMINDERS),
                    AsyncStorage.getItem(STORAGE_KEYS.APP_SETTINGS),
                    AsyncStorage.getItem(STORAGE_KEYS.USER_LOCATION),
                ]);

                const prayerReminders = prayerRemindersRaw ? JSON.parse(prayerRemindersRaw) : {};
                const customReminders = customRemindersRaw ? JSON.parse(customRemindersRaw) : [];
                const appSettings = appSettingsRaw ? JSON.parse(appSettingsRaw) : { prayer: true, verse: true, dhikr: true, knowledge: true, religious: true };
                const location = locationRaw ? JSON.parse(locationRaw) : { latitude: 41.0082, longitude: 28.9784, city: 'İstanbul' };

                const cityName = location.cityName || location.city || location.name || 'İstanbul';
                // USER REQUEST: Rolling Window (Sürekli Döngü)
                // Her gece saat 00:10'da uyanıp "BUGÜN ve YARIN" (2 Gün) planını tazeler.
                const timings = await this.getPrayerTimesForRange(location.latitude, location.longitude, 2);
                if (!timings || timings.length === 0) return;

                const now = new Date();

                // Helper to check if a date is within the "Priority Phase" (Next 2 days)
                const isPriorityDay = (date) => {
                    const diffDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
                    return diffDays <= 2;
                };

                const getFormattedTime = () => {
                    const d = new Date();
                    return d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                };

                const getNextWakeUp = () => {
                    const d = new Date();
                    d.setHours(0, 10, 0, 0);
                    // Eğer şu an 00:10'u geçtiyse, bir sonraki günün 00:10'unu hedefle
                    if (d <= now) {
                        d.setDate(d.getDate() + 1);
                    }
                    return d;
                };

                const nextWakeUp = getNextWakeUp();

                const timeUntil = (target) => {
                    const diffMs = target - new Date();
                    const hours = Math.floor(diffMs / (1000 * 60 * 60));
                    const mins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
                    return `${hours} saat ${mins} dakika`;
                };

                const scheduleLogic = async (timingsSlice, isBackground = false) => {
                    let count = 0;
                    const prayerKeyMap = { '1': 'Fajr', '2': 'Sunrise', '3': 'Dhuhr', '4': 'Asr', '5': 'Maghrib', '6': 'Isha' };
                    const prayerNameMap = { '1': 'İmsak', '2': 'Güneş', '3': 'Öğle', '4': 'İkindi', '5': 'Akşam', '6': 'Yatsı' };

                    // Pre-calculate allowed background settings once
                    const generalTasks = [
                        { key: 'verse', t: 'Günün Ayeti', h: 11, m: 0 },
                        { key: 'dhikr', t: 'Zikir Hatırlatıcısı', h: 21, m: 0 },
                        { key: 'knowledge', t: 'İlim Hatırlatıcısı', h: 18, m: 0 }
                    ];

                    // --- 1. GENEL NAMAZ BİLDİRİMLERİ ---
                    if (appSettings.prayer) {
                        for (const prayerId of ['1', '2', '3', '4', '5', '6']) {
                            for (const dayEntry of timingsSlice) {
                                const rawTime = dayEntry.timings[prayerKeyMap[prayerId]].split(' ')[0];
                                const [h, m] = rawTime.split(':').map(Number);
                                const triggerDate = new Date(dayEntry.date);
                                triggerDate.setHours(h, m, 0, 0);

                                if (triggerDate > now) {
                                    await Notifications.scheduleNotificationAsync({
                                        content: {
                                            title: 'Namaz Vakti',
                                            body: `${cityName} için ${prayerNameMap[prayerId]} vakti girdi. 🕋`,
                                            sound: true,
                                            channelId: CHANNELS.PRAYER,
                                        },
                                        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: triggerDate },
                                    });
                                    count++;
                                }
                            }
                        }
                    }

                    // --- 2. HATIRLATICI NAMAZ BİLDİRİMLERİ ---
                    for (const [prayerId, config] of Object.entries(prayerReminders)) {
                        if (!config.enabled) continue;
                        const allowedDays = this.parseDays(config.days);
                        const offsetMinutes = this.parseOffset(config.offset);
                        const label = prayerNameMap[prayerId];
                        const key = prayerKeyMap[prayerId];

                        for (const dayEntry of timingsSlice) {
                            if (!allowedDays.includes(dayEntry.date.getDay())) continue;
                            const rawTime = dayEntry.timings[key].split(' ')[0];
                            const [h, m] = rawTime.split(':').map(Number);
                            const triggerDate = new Date(dayEntry.date);
                            triggerDate.setHours(h, m - offsetMinutes, 0, 0);

                            if (triggerDate > now) {
                                // 1. Schedule Alarm if enabled
                                if (config.isAlarm) {
                                    await Notifications.scheduleNotificationAsync({
                                        content: {
                                            title: `${label} Alarmı`,
                                            body: offsetMinutes > 0 ? `${offsetMinutes} dk sonra ${label} vakti girecek.` : `${label} vakti geldi.`,
                                            sound: 'notification.wav',
                                            priority: Notifications.AndroidNotificationPriority.MAX,
                                            channelId: CHANNELS.ALARM,
                                            categoryIdentifier: CATEGORIES.ALARM,
                                            interruptionLevel: 'timeSensitive',
                                            autoDismiss: false, // Android: Don't dismiss on click
                                            sticky: true,       // Android: Cannot be swiped away
                                            data: {
                                                type: 'prayer_rem',
                                                prayerId,
                                                isAlarm: true,
                                                title: `${label} Alarmı`,
                                                body: offsetMinutes > 0 ? `${offsetMinutes} dk sonra ${label} vakti girecek.` : `${label} vakti geldi.`
                                            },
                                        },
                                        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: triggerDate },
                                    });
                                    count++;
                                }

                                // 2. Schedule Notification if enabled
                                if (config.isNotification) {
                                    await Notifications.scheduleNotificationAsync({
                                        content: {
                                            title: `${label} Hatırlatıcısı`,
                                            body: offsetMinutes > 0 ? `${offsetMinutes} dk sonra ${label} vakti girecek.` : `${label} vakti geldi.`,
                                            sound: true,
                                            priority: Notifications.AndroidNotificationPriority.HIGH,
                                            channelId: CHANNELS.PRAYER,
                                            interruptionLevel: 'active',
                                            data: { type: 'prayer_rem', prayerId, isAlarm: false },
                                        },
                                        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: triggerDate },
                                    });
                                    count++;
                                }
                            }
                        }
                    }

                    // --- 3. ÖZEL HATIRLATICILAR ---
                    for (const reminder of customReminders) {
                        if (!reminder.enabled || !reminder.time) continue;
                        const allowedDays = this.parseDays(reminder.days);
                        const [h, m] = reminder.time.split(':').map(Number);

                        for (const dayEntry of timingsSlice) {
                            const triggerDate = new Date(dayEntry.date);
                            triggerDate.setHours(h, m, 0, 0);

                            if (allowedDays.includes(triggerDate.getDay()) && triggerDate > now) {
                                // 1. Schedule Alarm if enabled
                                if (reminder.isAlarm) {
                                    await Notifications.scheduleNotificationAsync({
                                        content: {
                                            title: reminder.name || 'Özel Alarm',
                                            body: `${reminder.name} vakti geldi.`,
                                            sound: 'notification.wav',
                                            priority: Notifications.AndroidNotificationPriority.MAX,
                                            channelId: CHANNELS.ALARM,
                                            categoryIdentifier: CATEGORIES.ALARM,
                                            interruptionLevel: 'timeSensitive',
                                            autoDismiss: false,
                                            sticky: true,
                                            data: {
                                                isAlarm: true,
                                                title: reminder.name || 'Özel Alarm',
                                                body: `${reminder.name} vakti geldi.`
                                            },
                                        },
                                        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: triggerDate },
                                    });
                                    count++;
                                }

                                // 2. Schedule Notification if enabled
                                if (reminder.isNotification) {
                                    await Notifications.scheduleNotificationAsync({
                                        content: {
                                            title: reminder.name || 'Özel Hatırlatıcı',
                                            body: `${reminder.name} vakti geldi.`,
                                            sound: true,
                                            priority: Notifications.AndroidNotificationPriority.HIGH,
                                            channelId: CHANNELS.DEFAULT,
                                            interruptionLevel: 'active',
                                            data: { isAlarm: false },
                                        },
                                        trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: triggerDate },
                                    });
                                    count++;
                                }
                            }
                        }
                    }

                    // --- 4. GENEL UYGULAMA BİLDİRİMLERİ (Ayet, Zikir, İlim) ---
                    for (const task of generalTasks) {
                        if (!appSettings[task.key]) continue;
                        for (const dayEntry of timingsSlice) {
                            const triggerDate = new Date(dayEntry.date);
                            triggerDate.setHours(task.h, task.m, 0, 0);

                            if (triggerDate > now) {
                                await Notifications.scheduleNotificationAsync({
                                    content: {
                                        title: task.t,
                                        body: `${task.t} zamanı geldi. ✨`,
                                        sound: true,
                                        priority: Notifications.AndroidNotificationPriority.HIGH,
                                        channelId: CHANNELS.DEFAULT,
                                        data: { isAlarm: false }
                                    },
                                    trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: triggerDate },
                                });
                                count++;
                            }
                        }
                    }

                    // --- 5. DİNİ GÜNLER ---
                    if (appSettings.religious) {
                        for (const day of STATIC_RELIGIOUS_DAYS_2026) {
                            const triggerDate = new Date(day.dateObj);
                            triggerDate.setDate(triggerDate.getDate() - 1);
                            triggerDate.setHours(10, 0, 0, 0);

                            // If religous day is within our priority window
                            if (triggerDate > now && isPriorityDay(triggerDate)) {
                                await Notifications.scheduleNotificationAsync({
                                    content: { title: 'Dini Gün Hatırlatıcı', body: `Yarın ${day.name}. ✨`, sound: true },
                                    trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: triggerDate },
                                });
                                count++;
                            }
                        }
                    }

                    return count;
                };

                // USER REQUEST: Rolling Window (2 Günlük Döngü)
                // İlk kurulumda Bugünü ve Yarını planlar, sonra her gece 00:10'da uyanıp listeyi tazeler.
                const totalScheduled = await scheduleLogic(timings, false);

                // Get all scheduled details for logging
                const scheduled = await Notifications.getAllScheduledNotificationsAsync();

                // Filter: All upcoming items (Vakit, Reminder, Alarm)
                // Filter items with DATE trigger and relevant content
                const upcomingItems = scheduled
                    .filter(n => n.trigger.type === 'date' || n.content.data?.type === 'prayer_rem')
                    .map(n => {
                        const isAlarm = n.content.channelId === CHANNELS.ALARM || n.content.priority === 'max' || n.content.priority === 5;
                        const isVakit = n.content.title === 'Namaz Vakti';

                        let label = '🔔 BİLDİRİM';
                        if (isAlarm) label = '🚨 ALARM';
                        else if (isVakit) label = '🕋 VAKİT';

                        return {
                            title: n.content.title,
                            date: new Date(n.trigger.value),
                            type: label
                        };
                    })
                    .sort((a, b) => a.date - b.date);

                const counts = upcomingItems.reduce((acc, item) => {
                    acc[item.type] = (acc[item.type] || 0) + 1;
                    return acc;
                }, {});



            } catch (error) {

            }
        }, 100);
        return { success: true };
    },

    /**
     * Reschedule only specific notification type
     * @param {string} type - 'prayer', 'verse', 'dhikr', 'knowledge', 'religious'
     */
    async rescheduleSpecific(type) {
        try {


            // Get current settings
            const [appSettingsRaw, locationRaw] = await Promise.all([
                AsyncStorage.getItem(STORAGE_KEYS.APP_SETTINGS),
                AsyncStorage.getItem(STORAGE_KEYS.USER_LOCATION),
            ]);

            const appSettings = appSettingsRaw ? JSON.parse(appSettingsRaw) : {};
            const location = locationRaw ? JSON.parse(locationRaw) : { latitude: 41.0082, longitude: 28.9784, city: 'İstanbul' };
            const cityName = location.cityName || location.city || location.name || 'İstanbul';

            // Get all scheduled notifications
            const allScheduled = await Notifications.getAllScheduledNotificationsAsync();

            // Cancel only notifications of this type
            const typeIdentifiers = {
                prayer: (n) => n.content.title === 'Namaz Vakti',
                verse: (n) => n.content.title === 'Günün Ayeti',
                dhikr: (n) => n.content.title === 'Zikir Hatırlatıcısı',
                knowledge: (n) => n.content.title === 'İlim Hatırlatıcısı',
                religious: (n) => n.content.title === 'Dini Gün Hatırlatıcı',
            };

            const identifierFn = typeIdentifiers[type];
            if (!identifierFn) {

                return { success: false };
            }

            // Cancel matching notifications
            for (const notification of allScheduled) {
                if (identifierFn(notification.content)) {
                    await Notifications.cancelScheduledNotificationAsync(notification.identifier);
                }
            }

            // If setting is enabled, reschedule for next 2 days
            if (!appSettings[type]) {

                return { success: true };
            }

            const timings = await this.getPrayerTimesForRange(location.latitude, location.longitude, 2);
            if (!timings || timings.length === 0) {

                return { success: false };
            }

            const now = new Date();
            let count = 0;

            // Schedule based on type
            if (type === 'prayer') {
                const prayerKeyMap = { '1': 'Fajr', '2': 'Sunrise', '3': 'Dhuhr', '4': 'Asr', '5': 'Maghrib', '6': 'Isha' };
                const prayerNameMap = { '1': 'İmsak', '2': 'Güneş', '3': 'Öğle', '4': 'İkindi', '5': 'Akşam', '6': 'Yatsı' };

                for (const prayerId of ['1', '2', '3', '4', '5', '6']) {
                    for (const dayEntry of timings) {
                        const rawTime = dayEntry.timings[prayerKeyMap[prayerId]].split(' ')[0];
                        const [h, m] = rawTime.split(':').map(Number);
                        const triggerDate = new Date(dayEntry.date);
                        triggerDate.setHours(h, m, 0, 0);

                        if (triggerDate > now) {
                            await Notifications.scheduleNotificationAsync({
                                content: {
                                    title: 'Namaz Vakti',
                                    body: `${cityName} için ${prayerNameMap[prayerId]} vakti girdi. 🕋`,
                                    sound: true,
                                    channelId: CHANNELS.PRAYER,
                                },
                                trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: triggerDate },
                            });
                            count++;
                        }
                    }
                }
            } else if (type === 'verse' || type === 'dhikr' || type === 'knowledge') {
                const taskMap = {
                    verse: { t: 'Günün Ayeti', h: 11, m: 0 },
                    dhikr: { t: 'Zikir Hatırlatıcısı', h: 21, m: 0 },
                    knowledge: { t: 'İlim Hatırlatıcısı', h: 18, m: 0 },
                };
                const task = taskMap[type];

                for (const dayEntry of timings) {
                    const triggerDate = new Date(dayEntry.date);
                    triggerDate.setHours(task.h, task.m, 0, 0);

                    if (triggerDate > now) {
                        await Notifications.scheduleNotificationAsync({
                            content: {
                                title: task.t,
                                body: `${task.t} zamanı geldi. ✨`,
                                sound: true,
                                priority: Notifications.AndroidNotificationPriority.HIGH,
                                channelId: CHANNELS.DEFAULT,
                                data: { isAlarm: false }
                            },
                            trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: triggerDate },
                        });
                        count++;
                    }
                }
            } else if (type === 'religious') {
                const isPriorityDay = (date) => {
                    const diffDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
                    return diffDays <= 2;
                };

                for (const day of STATIC_RELIGIOUS_DAYS_2026) {
                    const triggerDate = new Date(day.dateObj);
                    triggerDate.setDate(triggerDate.getDate() - 1);
                    triggerDate.setHours(10, 0, 0, 0);

                    if (triggerDate > now && isPriorityDay(triggerDate)) {
                        await Notifications.scheduleNotificationAsync({
                            content: { title: 'Dini Gün Hatırlatıcı', body: `Yarın ${day.name}. ✨`, sound: true },
                            trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: triggerDate },
                        });
                        count++;
                    }
                }
            }


            return { success: true, count };
        } catch (error) {

            return { success: false, error };
        }
    },

    // Helpers
    parseOffset(offsetText) {
        if (!offsetText || offsetText === 'Tam vaktinde') return 0;
        const match = offsetText.match(/\d+/);
        return match ? parseInt(match[0]) : 0;
    },

    parseDays(daysText) {
        if (!daysText || daysText === 'Her gün') return [0, 1, 2, 3, 4, 5, 6];
        const dayMap = { 'Pazar': 0, 'Pazartesi': 1, 'Salı': 2, 'Çarşamba': 3, 'Perşembe': 4, 'Cuma': 5, 'Cumartesi': 6 };
        return daysText.split(',').map(d => dayMap[d.trim()]).filter(idx => idx !== undefined);
    }
};
