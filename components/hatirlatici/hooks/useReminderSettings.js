import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { NotificationService } from '../../../services/notificationService';

const STORAGE_KEY = '@takva_prayer_reminders';
const CUSTOM_STORAGE_KEY = '@takva_custom_reminders';

export const useReminderSettings = () => {
  const [reminders, setReminders] = useState({});
  const [customReminders, setCustomReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notificationPermission, setNotificationPermission] = useState(null);

  useEffect(() => {
    const init = async () => {
      await loadSettings();
      await loadCustomReminders();
      await checkNotificationPermissions();
      // Ensure channels are set up
      await NotificationService.setupChannels();
    };
    init();
  }, []);

  const checkNotificationPermissions = async () => {
    const { status } = await NotificationService.rescheduleAll();
    // This isn't perfect for status only, but we use rescheduleAll to check/trigger logic
    // Actually, let's just use the direct notification check
    const { status: currentStatus } = await require('expo-notifications').getPermissionsAsync();
    setNotificationPermission(currentStatus);
  };

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) setReminders(JSON.parse(stored));
    } catch (e) { } finally { setLoading(false); }
  };

  const loadCustomReminders = async () => {
    try {
      const stored = await AsyncStorage.getItem(CUSTOM_STORAGE_KEY);
      if (stored) setCustomReminders(JSON.parse(stored));
    } catch (e) { }
  };

  const saveSettings = async (newReminders) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newReminders));
      setReminders(newReminders);
      await NotificationService.rescheduleAll();
    } catch (e) { }
  };

  const updateReminder = useCallback(async (prayerId, updates) => {
    const newReminders = { ...reminders, [prayerId]: { ...reminders[prayerId], ...updates } };
    await saveSettings(newReminders);
  }, [reminders]);

  const toggleReminder = useCallback(async (prayerId) => {
    const current = reminders[prayerId];
    if (!current?.enabled && !current?.days) {
      Alert.alert('Eksik Bilgi', 'Lütfen önce gün seçimi yapın.');
      return;
    }
    await updateReminder(prayerId, { enabled: !current?.enabled });
  }, [reminders, updateReminder]);

  const addCustomReminder = useCallback(async (reminder) => {
    const newList = [...customReminders, { ...reminder, id: Date.now().toString() }];
    await AsyncStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(newList));
    setCustomReminders(newList);
    await NotificationService.rescheduleAll();
  }, [customReminders]);

  const updateCustomReminder = useCallback(async (id, updates) => {
    const newList = customReminders.map(r => r.id === id ? { ...r, ...updates } : r);
    await AsyncStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(newList));
    setCustomReminders(newList);
    await NotificationService.rescheduleAll();
  }, [customReminders]);

  const deleteCustomReminder = useCallback(async (id) => {
    const newList = customReminders.filter(r => r.id !== id);
    await AsyncStorage.setItem(CUSTOM_STORAGE_KEY, JSON.stringify(newList));
    setCustomReminders(newList);
    await NotificationService.rescheduleAll();
  }, [customReminders]);

  const toggleCustomReminder = useCallback(async (id) => {
    const current = customReminders.find(r => r.id === id);
    if (current && !current.enabled && (!current.days || current.days === 'Gün seçili değil')) {
      Alert.alert('Eksik Bilgi', 'Lütfen gün seçimi yapın.');
      return;
    }
    if (current) await updateCustomReminder(id, { enabled: !current.enabled });
  }, [customReminders, updateCustomReminder]);

  return {
    reminders, customReminders, loading, notificationPermission,
    updateReminder, toggleReminder, addCustomReminder, updateCustomReminder, deleteCustomReminder, toggleCustomReminder,
    refreshNotifications: () => NotificationService.rescheduleAll(),
  };
};

