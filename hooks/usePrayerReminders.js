import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { usePrayerTimes } from '../components/imsakiye/hooks/usePrayerTimes';

const STORAGE_KEY = '@prayer_reminders';

// Vakit isimleri mapping
const PRAYER_KEYS = {
  1: 'imsak',
  2: 'gunes',
  3: 'ogle',
  4: 'ikindi',
  5: 'aksam',
  6: 'yatsi',
};

// Gün isimleri (0 = Pazar)
const DAY_NAMES = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];

// Notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export const usePrayerReminders = () => {
  const { prayerTimesList } = usePrayerTimes();
  const [reminders, setReminders] = useState({});
  const [loading, setLoading] = useState(true);

  // AsyncStorage'dan yükle
  useEffect(() => {
    loadReminders();
  }, []);

  // Hatırlatıcılar değiştiğinde bildirim kur
  useEffect(() => {
    if (!loading && Object.keys(reminders).length > 0) {
      scheduleAllNotifications();
    }
  }, [reminders, loading, prayerTimesList]);

  const loadReminders = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setReminders(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Hatırlatıcı yükleme hatası:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveReminders = async (newReminders) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newReminders));
      setReminders(newReminders);
    } catch (error) {
      console.error('Hatırlatıcı kaydetme hatası:', error);
    }
  };

  // Offset'i dakikaya çevir
  const parseOffset = (offsetText) => {
    if (!offsetText || offsetText === 'Tam vaktinde') return 0;
    if (offsetText.includes('5')) return 5;
    if (offsetText.includes('10')) return 10;
    if (offsetText.includes('15')) return 15;
    if (offsetText.includes('30')) return 30;
    if (offsetText.includes('45')) return 45;
    if (offsetText.includes('1 saat')) return 60;
    return 0;
  };

  // Gün listesini parse et
  const parseDays = (daysText) => {
    if (daysText === 'Her gün') return [0, 1, 2, 3, 4, 5, 6];
    const days = daysText.split(',').map(d => d.trim());
    return days.map(day => DAY_NAMES.indexOf(day)).filter(idx => idx !== -1);
  };

  // Bugünün namaz vakitlerini al
  const getTodayPrayerTimes = () => {
    if (!prayerTimesList || prayerTimesList.length === 0) return null;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    return prayerTimesList.find(p => p.date === todayStr);
  };

  // Bildirim zamanını hesapla
  const calculateNotificationTime = (prayerTime, offsetMinutes) => {
    const [hours, minutes] = prayerTime.split(':').map(Number);
    const notifDate = new Date();
    notifDate.setHours(hours, minutes - offsetMinutes, 0, 0);
    return notifDate;
  };

  // Tüm bildirimleri kur
  const scheduleAllNotifications = async () => {
    try {
      // İzin kontrolü
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        console.warn('Bildirim izni verilmedi');
        return;
      }

      // Tüm mevcut bildirimleri iptal et
      await Notifications.cancelAllScheduledNotificationsAsync();

      const todayPrayers = getTodayPrayerTimes();
      if (!todayPrayers) return;

      const today = new Date().getDay();

      // Her hatırlatıcı için bildirim kur
      for (const [prayerId, reminder] of Object.entries(reminders)) {
        if (!reminder.enabled) continue;

        const prayerKey = PRAYER_KEYS[prayerId];
        if (!prayerKey || !todayPrayers.times[prayerKey]) continue;

        // Gün kontrolü
        const allowedDays = parseDays(reminder.days || 'Her gün');
        if (!allowedDays.includes(today)) continue;

        // Bildirim zamanını hesapla
        const offsetMinutes = parseOffset(reminder.offset);
        const notifTime = calculateNotificationTime(
          todayPrayers.times[prayerKey],
          offsetMinutes
        );

        // Geçmiş zamansa yarına kur
        if (notifTime < new Date()) {
          notifTime.setDate(notifTime.getDate() + 1);
        }

        // Bildirim içeriği
        const content = {
          title: `${reminder.name} Vakti`,
          body: offsetMinutes > 0 
            ? `${offsetMinutes} dakika sonra ${reminder.name} vakti giriyor`
            : `${reminder.name} vakti girdi`,
          sound: reminder.isAlarm ? 'default' : null,
          priority: reminder.isAlarm ? 'high' : 'default',
        };

        // Platform'a göre trigger
        const trigger = Platform.OS === 'android'
          ? { date: notifTime, repeats: false }
          : { date: notifTime };

        await Notifications.scheduleNotificationAsync({
          content,
          trigger,
        });

        console.log(`📢 ${reminder.name} için bildirim kuruldu: ${notifTime.toLocaleString()}`);
      }
    } catch (error) {
      console.error('Bildirim kurma hatası:', error);
    }
  };

  // Hatırlatıcıyı güncelle
  const updateReminder = useCallback(async (prayerId, updates) => {
    const newReminders = {
      ...reminders,
      [prayerId]: {
        ...reminders[prayerId],
        ...updates,
      },
    };
    await saveReminders(newReminders);
  }, [reminders]);

  // Toggle enabled
  const toggleReminder = useCallback(async (prayerId) => {
    await updateReminder(prayerId, {
      enabled: !reminders[prayerId]?.enabled,
    });
  }, [reminders, updateReminder]);

  return {
    reminders,
    loading,
    updateReminder,
    toggleReminder,
    getTodayPrayerTimes,
  };
};

