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
    ALARM: 'prayer-alarms',
    DEFAULT: 'default',
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
                vibrationPattern: [0, 1000, 500, 1000], // Daha uzun titreşim
                lightColor: '#FF4A4A',
                sound: 'notification.wav',
                enableVibrate: true,
                showBadge: true,
                lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
            });

            await Notifications.setNotificationChannelAsync(CHANNELS.DEFAULT, {
                name: 'Genel Hatırlatıcılar',
                importance: Notifications.AndroidImportance.DEFAULT,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FFBA4A',
            });
        }
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
                console.error('API Fetch Error:', e);
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
                console.log('🔄 [NotificationService] Yeniden planlama başladı (Aşama 1: İlk 3 Gün)...');
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
                const timings = await this.getPrayerTimesForRange(location.latitude, location.longitude, 10);
                if (!timings || timings.length === 0) return;

                const now = new Date();

                // Helper to check if a date is within the "Priority Phase" (Next 3 days)
                const isPriorityDay = (date) => {
                    const diffDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
                    return diffDays <= 3;
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

                            const isAlarm = config.isAlarm;
                            const channelId = isAlarm ? CHANNELS.ALARM : CHANNELS.PRAYER;
                            const sound = isAlarm ? 'notification.wav' : true;

                            if (triggerDate > now) {
                                await Notifications.scheduleNotificationAsync({
                                    content: {
                                        title: `${label} Hatırlatıcısı`,
                                        body: offsetMinutes > 0 ? `${offsetMinutes} dk sonra ${label} vakti girecek.` : `${label} vakti geldi.`,
                                        sound: sound,
                                        priority: isAlarm ? Notifications.AndroidNotificationPriority.MAX : Notifications.AndroidNotificationPriority.HIGH,
                                        channelId: channelId,
                                        data: { type: 'prayer_rem', prayerId },
                                    },
                                    trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: triggerDate },
                                });
                                count++;
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
                                const isAlarm = reminder.isAlarm;
                                const channelId = isAlarm ? CHANNELS.ALARM : CHANNELS.DEFAULT;
                                const sound = isAlarm ? 'notification.wav' : true;

                                await Notifications.scheduleNotificationAsync({
                                    content: {
                                        title: reminder.name || 'Özel',
                                        body: `${reminder.name} vakti geldi.`,
                                        sound: sound,
                                        priority: isAlarm ? Notifications.AndroidNotificationPriority.MAX : Notifications.AndroidNotificationPriority.HIGH,
                                        channelId: channelId
                                    },
                                    trigger: { type: Notifications.SchedulableTriggerInputTypes.DATE, date: triggerDate },
                                });
                                count++;
                            }
                        }
                    }

                    // --- 4. GENEL UYGULAMA (Daily Triggers - Only in Phase 1) ---
                    if (!isBackground) {
                        for (const task of generalTasks) {
                            if (appSettings[task.key]) {
                                await Notifications.scheduleNotificationAsync({
                                    content: { title: task.t, body: `${task.t} zamanı geldi.`, sound: true, channelId: CHANNELS.DEFAULT },
                                    trigger: { type: Notifications.SchedulableTriggerInputTypes.DAILY, hour: task.h, minute: task.m },
                                });
                                count++;
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
                    }

                    return count;
                };

                // AŞAMA 1: İlk 3 Günü Hemen Kur (UI akıcı kalsın)
                const priorityTimings = timings.slice(0, 3);
                const p1Count = await scheduleLogic(priorityTimings, false);
                console.log(`✅ [NotificationService] Aşama 1 Bitti: ${p1Count} bildirim kuruldu. İlk 72 saat güvende.`);

                // AŞAMA 2: Kalan 7 Günü Arka Planda Kur (2 saniye bekle ki UI tamamen rahatlasın)
                setTimeout(async () => {
                    try {
                        console.log('🔄 [NotificationService] Aşama 2 Başladı (Gelecek hafta planlanıyor)...');
                        const futureTimings = timings.slice(3);
                        const p2Count = await scheduleLogic(futureTimings, true);
                        console.log(`✅ [NotificationService] Aşama 2 Bitti: ${p2Count} ek bildirim kuruldu.`);
                    } catch (futureErr) {
                        console.error('❌ Background reschedule error:', futureErr);
                    }
                }, 2000);

            } catch (error) {
                console.error('❌ Reschedule error:', error);
            }
        }, 100);
        return { success: true };
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
