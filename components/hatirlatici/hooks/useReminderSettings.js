import { useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

const STORAGE_KEY = '@takva_prayer_reminders';
const CUSTOM_STORAGE_KEY = '@takva_custom_reminders';

// Notification handler setup
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/**
 * Hatırlatıcı ayarlarını yöneten hook
 * - AsyncStorage ile ayarları saklar
 * - Expo Notifications ile bildirim kurar
 * - Production-ready, hata toleransı yüksek
 */
export const useReminderSettings = (prayerTimes) => {
  const [reminders, setReminders] = useState({});
  const [customReminders, setCustomReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificationPermission, setNotificationPermission] = useState(null);
  const scheduledIdsRef = useRef([]);

  // İlk yükleme: AsyncStorage'dan ayarları al
  useEffect(() => {
    loadSettings();
    loadCustomReminders();
    checkNotificationPermissions();
    setupNotificationChannel();
  }, []);

  // Android için notification channel setup
  const setupNotificationChannel = async () => {
    if (Platform.OS === 'android') {
      try {
        await Notifications.setNotificationChannelAsync('prayer-reminders', {
          name: 'Namaz Vakti Hatırlatıcıları',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FFBA4A',
          sound: 'default',
          enableVibrate: true,
          showBadge: true,
        });
        console.log('✅ Android notification channel kuruldu');
      } catch (error) {
        console.error('❌ Channel setup hatası:', error);
      }
    }
  };

  // Prayer times ve custom reminders değiştiğinde bildirimleri yeniden kur
  useEffect(() => {
    if (!loading && prayerTimes && prayerTimes.length > 0) {
      scheduleNotifications();
    }
  }, [reminders, customReminders, loading, prayerTimes]);

  // Bildirim izinlerini kontrol et
  const checkNotificationPermissions = async () => {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      setNotificationPermission(status);
      
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        setNotificationPermission(newStatus);
      }
    } catch (error) {
      console.error('❌ Bildirim izni hatası:', error);
      setNotificationPermission('denied');
    }
  };

  // AsyncStorage'dan ayarları yükle
  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setReminders(parsed);
        console.log('✅ Hatırlatıcı ayarları yüklendi');
      } else {
        setReminders({});
      }
    } catch (error) {
      console.error('❌ Ayar yükleme hatası:', error);
      setReminders({});
    } finally {
      setLoading(false);
    }
  };

  // Özel hatırlatıcıları yükle
  const loadCustomReminders = async () => {
    try {
      const stored = await AsyncStorage.getItem(CUSTOM_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setCustomReminders(parsed);
        console.log('✅ Özel hatırlatıcılar yüklendi');
      } else {
        setCustomReminders([]);
      }
    } catch (error) {
      console.error('❌ Özel hatırlatıcı yükleme hatası:', error);
      setCustomReminders([]);
    }
  };

  // AsyncStorage'a kaydet
  const saveSettings = async (newReminders) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newReminders));
      setReminders(newReminders);
      console.log('✅ Hatırlatıcı ayarları kaydedildi');
    } catch (error) {
      console.error('❌ Ayar kaydetme hatası:', error);
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
    if (!daysText || daysText === 'Her gün') return [0, 1, 2, 3, 4, 5, 6];
    
    const dayMap = {
      'Pazar': 0, 'Pazartesi': 1, 'Salı': 2, 'Çarşamba': 3,
      'Perşembe': 4, 'Cuma': 5, 'Cumartesi': 6
    };
    
    const dayNames = daysText.split(',').map(d => d.trim());
    return dayNames.map(name => dayMap[name]).filter(idx => idx !== undefined);
  };

  // Bildirim zamanını hesapla
  const calculateNotificationTime = (prayerTime, offsetMinutes) => {
    try {
      const cleanTime = prayerTime.split(' ')[0];
      const [hours, minutes] = cleanTime.split(':').map(Number);
      
      const notifDate = new Date();
      notifDate.setHours(hours, minutes - offsetMinutes, 0, 0);
      
      // Geçmiş zamansa yarına kur
      const now = new Date();
      if (notifDate <= now) {
        notifDate.setDate(notifDate.getDate() + 1);
      }
      
      return notifDate;
    } catch (error) {
      console.error('❌ Zaman hesaplama hatası:', error);
      return null;
    }
  };

  // Tüm bildirimleri kur
  const scheduleNotifications = async () => {
    try {
      // İzin kontrolü
      if (notificationPermission !== 'granted') {
        console.warn('⚠️ Bildirim izni verilmemiş');
        return;
      }

      // Prayer times kontrolü
      if (!prayerTimes || prayerTimes.length === 0) {
        console.warn('⚠️ Namaz vakitleri henüz yüklenmedi');
        return;
      }

      // Eski bildirimleri iptal et
      for (const id of scheduledIdsRef.current) {
        await Notifications.cancelScheduledNotificationAsync(id);
      }
      scheduledIdsRef.current = [];

      const today = new Date().getDay();
      let scheduledCount = 0;

      // Her hatırlatıcı için bildirim kur
      for (const [prayerId, reminder] of Object.entries(reminders)) {
        if (!reminder.enabled) continue;

        // Prayer time bul
        const prayer = prayerTimes.find(p => p.id === parseInt(prayerId));
        if (!prayer || !prayer.time) continue;

        // Gün kontrolü
        const allowedDays = parseDays(reminder.days);
        if (!allowedDays.includes(today)) continue;

        // Bildirim zamanını hesapla
        const offsetMinutes = parseOffset(reminder.offset);
        const notifTime = calculateNotificationTime(prayer.time, offsetMinutes);
        
        if (!notifTime) continue;

        // Bildirim içeriği
        const content = {
          title: `${prayer.label} Vakti`,
          body: offsetMinutes > 0 
            ? `${offsetMinutes} dakika sonra ${prayer.label} vakti giriyor`
            : `${prayer.label} vakti girdi`,
          sound: reminder.isAlarm ? 'default' : reminder.isNotification ? 'default' : null,
          priority: reminder.isAlarm ? Notifications.AndroidNotificationPriority.MAX : Notifications.AndroidNotificationPriority.DEFAULT,
          data: { prayerId, prayerName: prayer.label },
        };

        // iOS için kategori
        if (Platform.OS === 'ios' && reminder.isAlarm) {
          content.categoryIdentifier = 'alarm';
        }

        // Trigger oluştur (Android ve iOS için uyumlu format)
        const trigger = Platform.OS === 'android' 
          ? {
              channelId: 'prayer-reminders',
              date: notifTime,
            }
          : {
              date: notifTime,
            };

        // Bildirim kur
        const notificationId = await Notifications.scheduleNotificationAsync({
          content,
          trigger,
        });

        scheduledIdsRef.current.push(notificationId);
        scheduledCount++;

        console.log(`✅ ${prayer.label} için bildirim kuruldu: ${notifTime.toLocaleString('tr-TR')}`);
      }

      console.log(`✅ Toplam ${scheduledCount} bildirim kuruldu`);
    } catch (error) {
      console.error('❌ Bildirim kurma hatası:', error);
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
    await saveSettings(newReminders);
  }, [reminders]);

  // Toggle enabled
  const toggleReminder = useCallback(async (prayerId) => {
    const current = reminders[prayerId];
    await updateReminder(prayerId, {
      enabled: !current?.enabled,
    });
  }, [reminders, updateReminder]);

  // Özel hatırlatıcı ekle
  const addCustomReminder = useCallback(async (reminder) => {
    try {
      const newReminder = {
        ...reminder,
        id: Date.now().toString(),
      };
      const newList = [...customReminders, newReminder];
      await AsyncStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(newList));
      setCustomReminders(newList);
      console.log('✅ Özel hatırlatıcı eklendi');
    } catch (error) {
      console.error('❌ Özel hatırlatıcı ekleme hatası:', error);
    }
  }, [customReminders]);

  // Özel hatırlatıcı güncelle
  const updateCustomReminder = useCallback(async (id, updates) => {
    try {
      const newList = customReminders.map(r =>
        r.id === id ? { ...r, ...updates } : r
      );
      await AsyncStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(newList));
      setCustomReminders(newList);
      console.log('✅ Özel hatırlatıcı güncellendi');
    } catch (error) {
      console.error('❌ Özel hatırlatıcı güncelleme hatası:', error);
    }
  }, [customReminders]);

  // Özel hatırlatıcı sil
  const deleteCustomReminder = useCallback(async (id) => {
    try {
      const newList = customReminders.filter(r => r.id !== id);
      await AsyncStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(newList));
      setCustomReminders(newList);
      console.log('✅ Özel hatırlatıcı silindi');
    } catch (error) {
      console.error('❌ Özel hatırlatıcı silme hatası:', error);
    }
  }, [customReminders]);

  // Özel hatırlatıcı toggle
  const toggleCustomReminder = useCallback(async (id) => {
    const current = customReminders.find(r => r.id === id);
    if (current) {
      await updateCustomReminder(id, { enabled: !current.enabled });
    }
  }, [customReminders, updateCustomReminder]);

  return {
    reminders,
    customReminders,
    loading,
    notificationPermission,
    updateReminder,
    toggleReminder,
    addCustomReminder,
    updateCustomReminder,
    deleteCustomReminder,
    toggleCustomReminder,
    refreshNotifications: scheduleNotifications,
  };
};

