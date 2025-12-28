import { useState, useEffect, useCallback, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Platform, Alert } from 'react-native';

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
  // + Günlük güncellik kontrolü
  useEffect(() => {
    const checkAndSchedule = async () => {
      if (!loading && prayerTimes && prayerTimes.length > 0) {
        try {
          // Son kurulum tarihini kontrol et
          const lastScheduleDate = await AsyncStorage.getItem('@takva_last_schedule_date');
          const today = new Date().toDateString();

          // Eğer tarih değiştiyse veya hiç kurulmamışsa, bildirimleri yeniden kur
          if (lastScheduleDate !== today) {
            console.log('📅 Yeni gün tespit edildi - Bildirimler yenileniyor...');
            await scheduleNotifications();
            await AsyncStorage.setItem('@takva_last_schedule_date', today);
          } else {
            // Aynı gün içinde sadece ayarlar değiştiyse yenile
            await scheduleNotifications();
          }
        } catch (error) {
          console.error('❌ Güncellik kontrolü hatası:', error);
          // Hata olursa yine de bildirimleri kur
          await scheduleNotifications();
        }
      }
    };

    checkAndSchedule();
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

  // Bildirim zamanını hesapla - belirli bir gün için
  const calculateNotificationTime = (prayerTime, offsetMinutes, targetDay) => {
    try {
      const cleanTime = prayerTime.split(' ')[0];
      const [hours, minutes] = cleanTime.split(':').map(Number);

      const now = new Date();
      const currentDay = now.getDay(); // 0-6 (Pazar-Cumartesi)

      // Hedef güne kadar olan gün farkını hesapla
      let daysUntilTarget = targetDay - currentDay;

      // Eğer hedef gün geçmişse veya bugünse ama saat geçmişse, bir sonraki haftaya al
      if (daysUntilTarget < 0) {
        daysUntilTarget += 7; // Bir sonraki hafta
      } else if (daysUntilTarget === 0) {
        // Bugün ama saat kontrolü yap
        const notifTimeToday = new Date();
        notifTimeToday.setHours(hours, minutes - offsetMinutes, 0, 0);

        if (notifTimeToday <= now) {
          // Bugün geçmiş, bir sonraki haftaya al
          daysUntilTarget = 7;
        }
      }

      // Bildirim tarihini hesapla
      const notifDate = new Date(now);
      notifDate.setDate(now.getDate() + daysUntilTarget);
      notifDate.setHours(hours, minutes - offsetMinutes, 0, 0);

      return notifDate;
    } catch (error) {
      console.error('❌ Zaman hesaplama hatası:', error);
      return null;
    }
  };

  // Tüm bildirimleri kur - her seçili gün için ayrı bildirim
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

      const MAX_NOTIFICATIONS = 60; // iOS ve Android limiti ~64, güvenlik payı
      let scheduledCount = 0;

      console.log('🔔 Bildirimler kuruluyor...');

      // Her hatırlatıcı için
      for (const [prayerId, reminder] of Object.entries(reminders)) {
        if (!reminder.enabled) continue;

        // Prayer time bul
        const prayer = prayerTimes.find(p => p.id === parseInt(prayerId));
        if (!prayer || !prayer.time) continue;

        // Seçili günleri al
        const allowedDays = parseDays(reminder.days);
        const offsetMinutes = parseOffset(reminder.offset);

        // Her seçili gün için ayrı bildirim kur
        for (const targetDay of allowedDays) {
          // Maksimum limit kontrolü
          if (scheduledCount >= MAX_NOTIFICATIONS) {
            console.warn('⚠️ Maksimum bildirim limitine ulaşıldı (60)');
            break;
          }

          // Bildirim zamanını hesapla
          const notifTime = calculateNotificationTime(prayer.time, offsetMinutes, targetDay);

          if (!notifTime) continue;

          // Gün adını al (log için)
          const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
          const dayName = dayNames[targetDay];

          // Bildirim içeriği
          const content = {
            title: `${prayer.label} Vakti`,
            body: offsetMinutes > 0
              ? `${offsetMinutes} dakika sonra ${prayer.label} vakti giriyor`
              : `${prayer.label} vakti girdi`,
            sound: reminder.isAlarm ? 'default' : reminder.isNotification ? 'default' : null,
            priority: reminder.isAlarm ? Notifications.AndroidNotificationPriority.MAX : Notifications.AndroidNotificationPriority.DEFAULT,
            data: {
              prayerId,
              prayerName: prayer.label,
              targetDay,
              dayName,
            },
          };

          // Android için channel ID
          if (Platform.OS === 'android') {
            content.channelId = 'prayer-reminders';
          }

          // iOS için kategori
          if (Platform.OS === 'ios' && reminder.isAlarm) {
            content.categoryIdentifier = 'alarm';
          }

          // Trigger oluştur (DateTriggerInput formatı)
          const trigger = {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: notifTime,
          };

          // Bildirim kur
          const notificationId = await Notifications.scheduleNotificationAsync({
            content,
            trigger,
          });

          scheduledIdsRef.current.push(notificationId);
          scheduledCount++;

          console.log(`✅ ${prayer.label} (${dayName}) - ${notifTime.toLocaleString('tr-TR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            hour: '2-digit',
            minute: '2-digit'
          })}`);
        }

        // Maksimum limite ulaşıldıysa döngüyü kır
        if (scheduledCount >= MAX_NOTIFICATIONS) break;
      }

      console.log(`✅ Toplam ${scheduledCount} namaz bildirimi kuruldu`);

      // -----------------------------------------------------------------------
      // Özel Hatırlatıcılar İçin Bildirim Kur
      // -----------------------------------------------------------------------
      for (const reminder of customReminders) {
        if (!reminder.enabled || !reminder.time) continue;

        const allowedDays = parseDays(reminder.days);

        for (const targetDay of allowedDays) {
          if (scheduledCount >= MAX_NOTIFICATIONS) {
            console.warn('⚠️ Maksimum bildirim limitine ulaşıldı (60)');
            break;
          }

          // Özel hatırlatıcılar için offset yok (0)
          const notifTime = calculateNotificationTime(reminder.time, 0, targetDay);

          if (!notifTime) continue;

          // Gün adını al
          const dayNames = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
          const dayName = dayNames[targetDay];

          const content = {
            title: reminder.name || 'Özel Hatırlatıcı',
            body: `${reminder.name || 'Hatırlatıcı'} vakti geldi`,
            sound: reminder.isAlarm ? 'default' : reminder.isNotification ? 'default' : null,
            priority: reminder.isAlarm ? Notifications.AndroidNotificationPriority.MAX : Notifications.AndroidNotificationPriority.DEFAULT,
            data: {
              customReminderId: reminder.id,
              name: reminder.name,
              targetDay,
              dayName,
            },
          };

          if (Platform.OS === 'android') {
            content.channelId = 'prayer-reminders';
          }

          if (Platform.OS === 'ios' && reminder.isAlarm) {
            content.categoryIdentifier = 'alarm';
          }

          const trigger = {
            type: Notifications.SchedulableTriggerInputTypes.DATE,
            date: notifTime,
          };

          const notificationId = await Notifications.scheduleNotificationAsync({
            content,
            trigger,
          });

          scheduledIdsRef.current.push(notificationId);
          scheduledCount++;

          console.log(`✅ Özel: ${reminder.name} (${dayName}) - ${notifTime.toLocaleString('tr-TR', {
            weekday: 'long', hour: '2-digit', minute: '2-digit'
          })}`);
        }

        if (scheduledCount >= MAX_NOTIFICATIONS) break;
      }

      console.log(`✅ Toplam (Namaz + Özel) ${scheduledCount} bildirim kuruldu`);
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

    // Açmaya çalışıyorsa validation yap
    if (!current?.enabled) {
      if (!current?.days) {
        Alert.alert('Eksik Bilgi', 'Hatırlatıcıyı açmak için lütfen önce gün seçimi yapın.');
        return;
      }
    }

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
      // Açmaya çalışıyorsa validation yap
      if (!current.enabled) {
        if (!current.days || current.days === 'Gün seçili değil') {
          Alert.alert('Eksik Bilgi', 'Hatırlatıcıyı açmak için lütfen gün seçimi yapın.');
          return;
        }
        if (!current.time || current.time === 'Vakit seçili değil') {
          Alert.alert('Eksik Bilgi', 'Hatırlatıcıyı açmak için lütfen saat seçimi yapın.');
          return;
        }
      }

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

