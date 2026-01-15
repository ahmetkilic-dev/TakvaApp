import { View, Text, ScrollView, Dimensions, ActivityIndicator, Linking, TouchableOpacity } from 'react-native';
import { usePrayerTimesForReminders } from '../../hooks/usePrayerTimesForReminders';
import { useReminderSettings } from './hooks/useReminderSettings';
import PrayerReminderCard from './PrayerReminderCard';
import CustomReminderCard from './CustomReminderCard';
import CustomReminderForm from './CustomReminderForm';
import ReminderSettingsModal from './ReminderSettingsModal';
import CustomReminderSettingsModal from './CustomReminderSettingsModal';
import { useState } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const horizontalPadding = Math.max(20, SCREEN_WIDTH * 0.05);
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);
const fontFamily = 'Plus Jakarta Sans';

export default function HatirlaticiContainer() {
  const { prayerTimes, loading: prayerLoading, displayCity } = usePrayerTimesForReminders();
  const {
    reminders,
    customReminders,
    loading: reminderLoading,
    notificationPermission,
    updateReminder,
    toggleReminder,
    addCustomReminder,
    updateCustomReminder,
    deleteCustomReminder,
    toggleCustomReminder,
  } = useReminderSettings();

  const [modalVisible, setModalVisible] = useState(false);
  const [customModalVisible, setCustomModalVisible] = useState(false);
  const [selectedPrayer, setSelectedPrayer] = useState(null);
  const [selectedCustomReminder, setSelectedCustomReminder] = useState(null);

  const handleUpdate = (item, isCustom = false) => {
    if (isCustom) {
      setSelectedCustomReminder(item);
      setCustomModalVisible(true);
    } else {
      setSelectedPrayer(item);
      setModalVisible(true);
    }
  };

  const handleSave = async (settings) => {
    if (selectedPrayer) {
      await updateReminder(selectedPrayer.id, {
        ...settings,
        enabled: true,
      });
      setModalVisible(false);
      setSelectedPrayer(null);
    }
  };

  const handleCustomSave = async (settings) => {
    if (selectedCustomReminder) {
      await updateCustomReminder(selectedCustomReminder.id, {
        ...settings,
        enabled: true,
      });
      setCustomModalVisible(false);
      setSelectedCustomReminder(null);
    }
  };

  const handleAddCustom = async (reminder) => {
    await addCustomReminder(reminder);
  };

  const handleDeleteCustom = async (id) => {
    await deleteCustomReminder(id);
  };

  if (prayerLoading || reminderLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: horizontalPadding }}>
        <ActivityIndicator size="large" color="#FFBA4A" />
        <Text
          style={{
            fontFamily,
            fontSize: 16,
            fontWeight: '400',
            color: 'rgba(255, 255, 255, 0.7)',
            marginTop: 16,
          }}
        >
          Yükleniyor...
        </Text>
      </View>
    );
  }

  if (notificationPermission !== 'granted') {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: horizontalPadding }}>
        <TouchableOpacity
          style={{ alignItems: 'center', padding: 20 }}
          onPress={() => Linking.openSettings()}
          activeOpacity={0.7}
        >
          <Text
            style={{
              fontFamily,
              fontSize: 16,
              fontWeight: '600',
              color: '#FFFFFF',
              textAlign: 'center',
              marginBottom: 12,
            }}
          >
            ⚠️ Bildirim İzni Gerekli
          </Text>
          <Text
            style={{
              fontFamily,
              fontSize: 14,
              fontWeight: '400',
              color: 'rgba(255, 255, 255, 0.7)',
              textAlign: 'center',
              lineHeight: 20,
            }}
          >
            Hatırlatıcı özelliğini kullanabilmek için lütfen telefonunuzun ayarlarından bildirim izni veriniz.
            {'\n'}(Ayarlara gitmek için tıklayın)
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!prayerTimes || prayerTimes.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: horizontalPadding }}>
        <Text
          style={{
            fontFamily,
            fontSize: 16,
            fontWeight: '400',
            color: 'rgba(255, 255, 255, 0.7)',
            textAlign: 'center',
          }}
        >
          Namaz vakitleri yüklenemedi
        </Text>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: horizontalPadding,
          paddingTop: 24,
          paddingBottom: 20,
        }}
        style={{ flex: 1 }}
      >
        {/* Vakit Kartları */}
        <View style={{ gap: 16 }}>
          {prayerTimes.map((prayer) => (
            <PrayerReminderCard
              key={prayer.id}
              prayer={prayer}
              reminder={reminders[prayer.id]}
              onToggle={() => toggleReminder(prayer.id)}
              onUpdate={() => handleUpdate(prayer)}
              contentWidth={contentWidth}
            />
          ))}
        </View>

        {/* Özel Hatırlatıcılar */}
        <View style={{ marginTop: 32, marginBottom: 0 }}>
          <Text
            style={{
              fontFamily,
              fontSize: 16,
              fontWeight: '700',
              color: '#FFFFFF',
              marginBottom: 8,
              textAlign: 'center',
            }}
          >
            Özel Hatırlatıcılar
          </Text>
          <Text
            style={{
              fontFamily,
              fontSize: 10,
              fontWeight: '400',
              color: 'rgba(255, 255, 255, 0.6)',
              textAlign: 'center',
              marginBottom: 16,
            }}
          >
            Namaz dışındaki zamanlar için kendine hatırlatma ekle.
          </Text>

          {/* Özel Hatırlatıcı Kartları */}
          {customReminders.length > 0 && (
            <View style={{ gap: 16, marginBottom: 0 }}>
              {customReminders.map((reminder) => (
                <CustomReminderCard
                  key={reminder.id}
                  reminder={reminder}
                  onToggle={() => toggleCustomReminder(reminder.id)}
                  onUpdate={() => handleUpdate(reminder, true)}
                  onDelete={() => handleDeleteCustom(reminder.id)}
                  contentWidth={contentWidth}
                />
              ))}
            </View>
          )}

          {/* Yeni Hatırlatıcı Formu */}
          <CustomReminderForm onSave={handleAddCustom} contentWidth={contentWidth} />
        </View>
      </ScrollView>

      {/* Prayer Settings Modal */}
      <ReminderSettingsModal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedPrayer(null);
        }}
        onSave={handleSave}
        prayer={selectedPrayer}
        currentSettings={selectedPrayer ? reminders[selectedPrayer.id] : null}
      />

      {/* Custom Reminder Settings Modal */}
      <CustomReminderSettingsModal
        visible={customModalVisible}
        onClose={() => {
          setCustomModalVisible(false);
          setSelectedCustomReminder(null);
        }}
        onSave={handleCustomSave}
        reminder={selectedCustomReminder}
        currentSettings={selectedCustomReminder}
      />
    </>
  );
}

