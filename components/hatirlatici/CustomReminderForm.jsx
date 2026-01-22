import { View, Text, TouchableOpacity, TextInput, Switch, Modal, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import CustomReminderSettingsModal from './CustomReminderSettingsModal';

const fontFamily = 'Plus Jakarta Sans';

export default function CustomReminderForm({ onSave, contentWidth }) {
  const [name, setName] = useState('');
  const [selectedDays, setSelectedDays] = useState('Her gün');
  const [time, setTime] = useState('18:00');
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  const [dayModalVisible, setDayModalVisible] = useState(false);

  const handleSave = () => {
    if (name.trim()) {
      onSave({
        name: name.trim(),
        time,
        days: selectedDays,
        isNotification: notificationEnabled,
        isAlarm: alarmEnabled,
        enabled: true,
      });
      // Reset form
      setName('');
      setTime('18:00');
      setSelectedDays('Her gün');
      setNotificationEnabled(false);
      setAlarmEnabled(false);
    }
  };

  return (
    <View
      style={{
        width: contentWidth,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        backgroundColor: 'rgba(24, 39, 35, 0.5)',
        padding: 16,
      }}
    >
      {/* Reminder Name Input */}
      <Text
        style={{
          fontFamily,
          fontSize: 12,
          fontWeight: '400',
          color: '#FFFFFF',
          marginBottom: 8,
        }}
      >
        Hatırlatıcı Adı
      </Text>
      <TextInput
        style={{
          fontFamily,
          fontSize: 14,
          fontWeight: '400',
          color: '#FFFFFF',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 5,
          borderWidth: 0.5,
          borderColor: 'rgba(255, 255, 255, 0.3)',
          paddingHorizontal: 12,
          paddingVertical: 10,
          marginBottom: 16,
        }}
        placeholder="Kur'an okuma, Zikir, Dua, Ders..."
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={name}
        onChangeText={setName}
      />

      {/* Days Dropdown (placeholder for now) */}
      <Text
        style={{
          fontFamily,
          fontSize: 12,
          fontWeight: '400',
          color: '#FFFFFF',
          marginBottom: 8,
        }}
      >
        Hangi günlerde hatırlatma gelsin?
      </Text>
      <TouchableOpacity
        onPress={() => setDayModalVisible(true)}
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 5,
          borderWidth: 0.5,
          borderColor: 'rgba(255, 255, 255, 0.3)',
          paddingHorizontal: 12,
          paddingVertical: 10,
          marginBottom: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            fontFamily,
            fontSize: 14,
            fontWeight: '400',
            color: '#FFFFFF',
          }}
        >
          {selectedDays}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Time Input */}
      <Text
        style={{
          fontFamily,
          fontSize: 12,
          fontWeight: '400',
          color: '#FFFFFF',
          marginBottom: 8,
        }}
      >
        Ne zaman gelsin?
      </Text>
      <TextInput
        style={{
          fontFamily,
          fontSize: 14,
          fontWeight: '400',
          color: '#FFFFFF',
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 5,
          borderWidth: 0.5,
          borderColor: 'rgba(255, 255, 255, 0.3)',
          paddingHorizontal: 12,
          paddingVertical: 10,
          marginBottom: 16,
        }}
        placeholder="18:00"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={time}
        onChangeText={setTime}
      />

      {/* Notification Switch */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
        <Switch
          value={notificationEnabled}
          onValueChange={setNotificationEnabled}
          trackColor={{ false: '#7C8381', true: '#15614D' }}
          thumbColor="#FFFFFF"
          ios_backgroundColor="#7C8381"
        />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text
            style={{
              fontFamily,
              fontSize: 12,
              fontWeight: '400',
              color: '#FFFFFF',
              marginBottom: 4,
            }}
          >
            Bildirim Gönder
          </Text>
          <Text
            style={{
              fontFamily,
              fontSize: 10,
              fontWeight: '400',
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            Sessiz bir uyarı alırsın, telefon çalmadan bildirim görünür.
          </Text>
        </View>
      </View>

      {/* Alarm Switch */}
      {Platform.OS !== 'ios' && (
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 16 }}>
          <Switch
            value={alarmEnabled}
            onValueChange={setAlarmEnabled}
            trackColor={{ false: '#7C8381', true: '#15614D' }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#7C8381"
          />
          <View style={{ flex: 1, marginLeft: 12 }}>
            <Text
              style={{
                fontFamily,
                fontSize: 12,
                fontWeight: '400',
                color: '#FFFFFF',
                marginBottom: 4,
              }}
            >
              Alarm Kur
            </Text>
            <Text
              style={{
                fontFamily,
                fontSize: 10,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              Telefon çalarak seni uyandıran tam ekran bir alarm kurulur.
            </Text>
          </View>
        </View>
      )}

      {/* Save Button */}
      <TouchableOpacity
        onPress={handleSave}
        style={{
          width: '100%',
          height: 44,
          borderRadius: 10,
          backgroundColor: '#182723',
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.2)',
        }}
      >
        <Text
          style={{
            fontFamily,
            fontSize: 14,
            fontWeight: '600',
            color: '#FFFFFF',
          }}
        >
          Kaydet
        </Text>
      </TouchableOpacity>

      {/* Day Selection Modal */}
      <CustomReminderSettingsModal
        visible={dayModalVisible}
        onClose={() => setDayModalVisible(false)}
        onSave={(settings) => {
          setSelectedDays(settings.days);
          setDayModalVisible(false);
        }}
        reminder={{ name: name || 'Özel Hatırlatıcı' }}
        currentSettings={{ days: selectedDays }}
        daysOnly={true}
      />
    </View>
  );
}

