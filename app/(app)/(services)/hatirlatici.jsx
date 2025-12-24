import { View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions, Platform, Modal, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { BlurView } from 'expo-blur';
import ScreenBackground from '../../../components/common/ScreenBackground';
import { useState } from 'react';
import { Switch } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

// Responsive calculations
const horizontalPadding = 10;
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);

// Prayer time icons mapping
const prayerIcons = {
  imsak: 'moon-outline',
  gunes: 'sunny-outline',
  ogle: 'sunny',
  ikindi: 'partly-sunny-outline',
  aksam: 'moon',
  yatsi: 'moon-outline',
};

// Sample prayer time reminders data
const prayerReminders = [
  {
    id: 1,
    name: 'İmsak',
    time: '05:45',
    days: null,
    offset: null,
    icon: 'moon-outline',
    enabled: false,
  },
  {
    id: 2,
    name: 'Güneş',
    time: '07:15',
    days: null,
    offset: null,
    icon: 'sunny-outline',
    enabled: false,
  },
  {
    id: 3,
    name: 'Öğle',
    time: '12:50',
    days: null,
    offset: null,
    icon: 'sunny',
    enabled: false,
  },
  {
    id: 4,
    name: 'İkindi',
    time: '15:25',
    days: null,
    offset: null,
    icon: 'partly-sunny-outline',
    enabled: false,
  },
  {
    id: 5,
    name: 'Akşam',
    time: '18:00',
    days: null,
    offset: null,
    icon: 'moon',
    enabled: false,
  },
  {
    id: 6,
    name: 'Yatsı',
    time: '19:30',
    days: null,
    offset: null,
    icon: 'moon-outline',
    enabled: false,
  },
];

// Sample custom reminders data
const customReminders = [];

export default function HatirlaticiScreen() {
  const router = useRouter();
  const [reminders, setReminders] = useState(prayerReminders);
  const [customRemindersList, setCustomRemindersList] = useState(customReminders);
  const [newReminderName, setNewReminderName] = useState('');
  const [selectedDays, setSelectedDays] = useState('Her gün');
  const [reminderTime, setReminderTime] = useState('18:00');
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [alarmEnabled, setAlarmEnabled] = useState(false);
  
  // Modal state
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedReminder, setSelectedReminder] = useState(null);
  const [modalDays, setModalDays] = useState('Her gün');
  const [modalOffset, setModalOffset] = useState('Tam vaktinde');
  const [modalNotification, setModalNotification] = useState(false);
  const [modalAlarm, setModalAlarm] = useState(true);
  const [showDaysDropdown, setShowDaysDropdown] = useState(false);
  const [showOffsetDropdown, setShowOffsetDropdown] = useState(false);
  const [selectedDaysList, setSelectedDaysList] = useState([]);

  const daysOptions = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
  const offsetOptions = ['Tam vaktinde', '5 dakika önce', '10 dakika önce', '15 dakika önce', '30 dakika önce', '45 dakika önce', '1 saat önce'];

  const toggleReminder = (id) => {
    setReminders(reminders.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const toggleCustomReminder = (id) => {
    setCustomRemindersList(customRemindersList.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const handleDeleteCustomReminder = (id) => {
    setCustomRemindersList(customRemindersList.filter(r => r.id !== id));
  };

  const handleSave = () => {
    if (newReminderName.trim()) {
      const newReminder = {
        id: customRemindersList.length + 1,
        name: newReminderName,
        time: reminderTime,
        days: selectedDays,
        enabled: true,
      };
      setCustomRemindersList([...customRemindersList, newReminder]);
      setNewReminderName('');
    }
  };

  const handleUpdatePress = (reminder, isCustom = false) => {
    setSelectedReminder({ ...reminder, isCustom });
    // Parse days string to array if it contains multiple days
    if (reminder.days && reminder.days.includes(',')) {
      const daysArray = reminder.days.split(',').map(d => d.trim());
      setSelectedDaysList(daysArray);
      setModalDays('Özel');
    } else if (reminder.days === 'Her gün') {
      // Her gün seçiliyse tüm günleri seçili göster
      setSelectedDaysList(daysOptions);
      setModalDays('Her gün');
    } else if (reminder.days === 'Hafta içi') {
      setSelectedDaysList(['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma']);
      setModalDays('Hafta içi');
    } else if (reminder.days === 'Hafta sonu') {
      setSelectedDaysList(['Cumartesi', 'Pazar']);
      setModalDays('Hafta sonu');
    } else {
      setSelectedDaysList([]);
      setModalDays(reminder.days || 'Her gün');
    }
    // Parse offset string
    const offsetText = reminder.offset || 'Tam vaktinde';
    if (offsetText === 'Tam vaktinde') {
      setModalOffset('Tam vaktinde');
    } else if (offsetText.includes('5 dk önce') || offsetText.includes('5 dakika önce')) {
      setModalOffset('5 dakika önce');
    } else if (offsetText.includes('10 dk önce') || offsetText.includes('10 dakika önce')) {
      setModalOffset('10 dakika önce');
    } else if (offsetText.includes('15 dk önce') || offsetText.includes('15 dakika önce')) {
      setModalOffset('15 dakika önce');
    } else if (offsetText.includes('30 dk önce') || offsetText.includes('30 dakika önce')) {
      setModalOffset('30 dakika önce');
    } else if (offsetText.includes('45 dk önce') || offsetText.includes('45 dakika önce')) {
      setModalOffset('45 dakika önce');
    } else if (offsetText.includes('1 saat önce')) {
      setModalOffset('1 saat önce');
    } else {
      setModalOffset('Tam vaktinde');
    }
    setModalNotification(false);
    setModalAlarm(false);
    setIsModalVisible(true);
  };

  const toggleDaySelection = (day) => {
    if (selectedDaysList.includes(day)) {
      setSelectedDaysList(selectedDaysList.filter(d => d !== day));
    } else {
      setSelectedDaysList([...selectedDaysList, day]);
    }
  };

  const handleModalSave = () => {
    if (selectedReminder) {
      let daysText = modalDays;
      if (selectedDaysList.length > 0 && selectedDaysList.length < 7) {
        daysText = selectedDaysList.join(', ');
      } else if (selectedDaysList.length === 7) {
        daysText = 'Her gün';
      } else if (modalDays !== 'Her gün' && modalDays !== 'Hafta içi' && modalDays !== 'Hafta sonu') {
        daysText = selectedDaysList.length > 0 ? selectedDaysList.join(', ') : 'Her gün';
      }
      
      let offsetText = modalOffset;
      if (modalOffset !== 'Tam vaktinde') {
        offsetText = `Vaktinden ${modalOffset.replace('dakika önce', 'dk önce').replace('saat önce', 'saat önce')}`;
      }
      
      if (selectedReminder.isCustom) {
        setCustomRemindersList(customRemindersList.map(r => 
          r.id === selectedReminder.id 
            ? { ...r, days: daysText, offset: offsetText }
            : r
        ));
      } else {
        setReminders(reminders.map(r => 
          r.id === selectedReminder.id 
            ? { ...r, days: daysText, offset: offsetText }
            : r
        ));
      }
    }
    setIsModalVisible(false);
    setShowDaysDropdown(false);
    setShowOffsetDropdown(false);
  };

  return (
    <ScreenBackground>
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-2 pb-2">
          <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 items-center justify-center">
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Cinzel-Black',
              color: '#FFFFFF',
              fontSize: 24,
              textAlign: 'center',
              letterSpacing: -2,
            }}
          >
            HATIRLATICI
          </Text>
          <View className="w-9" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ 
            paddingHorizontal: horizontalPadding,
            paddingTop: 24,
            paddingBottom: 0,
          }}
        >
          {/* Vakit Hatırlatıcıları Section */}
          <View style={{ marginBottom: 32 }}>
            <Text
              style={{
                fontFamily,
                fontSize: 16 * 1.3,
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: 8,
                textAlign: 'center',
              }}
            >
              Vakit Hatırlatıcıları
            </Text>
            <Text
              style={{
                fontFamily,
                fontSize: 10 * 1.3,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.6)',
                textAlign: 'center',
                marginBottom: 16,
              }}
            >
              Seçtiğin vakitlerden önce bildirim al veya alarm kur.
            </Text>

            {/* Prayer Reminder Cards */}
            <View style={{ gap: 12 }}>
              {reminders.map((reminder) => (
                <View
                  key={reminder.id}
                  style={{
                    width: contentWidth,
                    minHeight: 105,
                    borderRadius: 10,
                    borderWidth: 0.5,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'rgba(24, 39, 35, 0.5)',
                    padding: 12,
                  }}
                >
                  {/* Top Section: Icon + Name and Toggle Switch */}
                  <View style={{ marginBottom: 8 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        {/* Icon */}
                        <View style={{ marginRight: 12 }}>
                          <Ionicons name={reminder.icon} size={24} color="#FFFFFF" />
                        </View>
                        {/* Vakit Name */}
                        <Text
                          style={{
                            fontFamily,
                            fontSize: 18,
                            fontWeight: '600',
                            color: '#FFFFFF',
                            flexShrink: 1,
                          }}
                        >
                          {reminder.name}
                        </Text>
                      </View>

                      {/* Toggle Switch */}
                      <Switch
                        value={reminder.enabled}
                        onValueChange={() => toggleReminder(reminder.id)}
                        trackColor={{ false: '#7C8381', true: '#15614D' }}
                        thumbColor="#FFFFFF"
                        ios_backgroundColor="#7C8381"
                      />
                    </View>
                    {/* Time - iconun tam altında */}
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{ width: 52, alignItems: 'flex-start' }}>
                        <Text
                          numberOfLines={1}
                          style={{
                            fontFamily,
                            fontSize: 14 * 1.1,
                            fontWeight: '400',
                            color: 'rgba(255, 255, 255, 0.6)',
                          }}
                        >
                          {reminder.time}
                        </Text>
                      </View>
                    </View>
                  </View>

                  {/* Separator Line */}
                  <View
                    style={{
                      width: '100%',
                      height: 0.5,
                      backgroundColor: 'rgba(217, 217, 217, 0.5)',
                      marginBottom: 8,
                    }}
                  />

                  {/* Bottom Section: Days/Offset and Update Button */}
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    {/* Left Side: Days, Offset */}
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontFamily,
                          fontSize: 14,
                          fontWeight: '400',
                          color: reminder.days ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                          marginBottom: 4,
                        }}
                      >
                        {reminder.days || 'Gün seçili değil'}
                      </Text>
                      <Text
                        style={{
                          fontFamily,
                          fontSize: 12,
                          fontWeight: '400',
                          color: reminder.offset ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                        }}
                      >
                        {reminder.offset || 'Vakit seçili değil'}
                      </Text>
                    </View>

                    {/* Right Side: Update Button */}
                    <TouchableOpacity
                      onPress={() => handleUpdatePress(reminder, false)}
                      style={{
                        width: 87,
                        height: 25,
                        borderRadius: 5,
                        borderWidth: 0.5,
                        borderColor: 'rgba(255, 255, 255, 0.5)',
                        backgroundColor: 'rgba(24, 39, 35, 0.5)',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontFamily,
                          fontSize: 12,
                          fontWeight: '400',
                          color: '#FFFFFF',
                        }}
                      >
                        Güncelle
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Özel Hatırlatıcılar Section */}
          <View style={{ marginBottom: 32 }}>
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

            {/* Custom Reminder Cards */}
            <View style={{ gap: 12, marginBottom: 24 }}>
              {customRemindersList.map((reminder) => (
                <View
                  key={reminder.id}
                  style={{
                    width: contentWidth,
                    minHeight: 105,
                    borderRadius: 10,
                    borderWidth: 0.5,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'rgba(24, 39, 35, 0.5)',
                    padding: 12,
                  }}
                >
                  {/* Top Section: Name and Toggle Switch */}
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <Text
                      style={{
                        fontFamily,
                        fontSize: 18,
                        fontWeight: '600',
                        color: '#FFFFFF',
                      }}
                    >
                      {reminder.name}
                    </Text>

                    {/* Toggle Switch */}
                    <Switch
                      value={reminder.enabled}
                      onValueChange={() => toggleCustomReminder(reminder.id)}
                      trackColor={{ false: '#7C8381', true: '#15614D' }}
                      thumbColor="#FFFFFF"
                      ios_backgroundColor="#7C8381"
                    />
                  </View>

                  {/* Separator Line */}
                  <View
                    style={{
                      width: '100%',
                      height: 0.5,
                      backgroundColor: 'rgba(217, 217, 217, 0.5)',
                      marginBottom: 8,
                    }}
                  />

                  {/* Bottom Section: Time/Days and Update Button */}
                  <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                    {/* Left Side: Time and Days */}
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontFamily,
                          fontSize: 14 * 1.1,
                          fontWeight: '400',
                          color: reminder.time ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.5)',
                          marginBottom: 4,
                        }}
                      >
                        {reminder.time || 'Vakit seçili değil'}
                      </Text>
                      <Text
                        style={{
                          fontFamily,
                          fontSize: 12,
                          fontWeight: '400',
                          color: reminder.days ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                        }}
                      >
                        {reminder.days || 'Gün seçili değil'}
                      </Text>
                    </View>

                    {/* Right Side: Update and Delete Buttons */}
                    <View style={{ flexDirection: 'row', gap: 8 }}>
                      <TouchableOpacity
                        onPress={() => handleUpdatePress(reminder, true)}
                        style={{
                          width: 87,
                          height: 25,
                          borderRadius: 5,
                          borderWidth: 0.5,
                          borderColor: 'rgba(255, 255, 255, 0.5)',
                          backgroundColor: 'rgba(24, 39, 35, 0.5)',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Text
                          style={{
                            fontFamily,
                            fontSize: 12,
                            fontWeight: '400',
                            color: '#FFFFFF',
                          }}
                        >
                          Güncelle
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => handleDeleteCustomReminder(reminder.id)}
                        style={{
                          width: 60,
                          height: 25,
                          borderRadius: 5,
                          borderWidth: 0.5,
                          borderColor: 'rgba(255, 0, 0, 0.75)',
                          backgroundColor: 'rgba(24, 39, 35, 0.5)',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Ionicons name="trash-outline" size={16} color="#FF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* New Reminder Form */}
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
                value={newReminderName}
                onChangeText={setNewReminderName}
              />

              {/* Days Dropdown */}
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
                value={reminderTime}
                onChangeText={setReminderTime}
              />

              {/* Notification Checkbox */}
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

              {/* Alarm Checkbox */}
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

              {/* Save Button */}
              <TouchableOpacity
                onPress={handleSave}
                style={{
                  width: '100%',
                  height: 44,
                  borderRadius: 10,
                  backgroundColor: '#15614D',
                  alignItems: 'center',
                  justifyContent: 'center',
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
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Settings Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {
          setIsModalVisible(false);
          setShowDaysDropdown(false);
          setShowOffsetDropdown(false);
        }}
      >
        <BlurView
          intensity={50}
          tint="dark"
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: horizontalPadding,
          }}
        >
          <Pressable
            style={{
              flex: 1,
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              setIsModalVisible(false);
              setShowDaysDropdown(false);
              setShowOffsetDropdown(false);
            }}
          >
            <Pressable
              style={{
                width: '100%',
                maxWidth: SCREEN_WIDTH * 0.9,
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: '#172521',
                padding: 20,
              }}
              onPress={(e) => e.stopPropagation()}
            >
            {/* Modal Header */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <Text
                style={{
                  fontFamily,
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#FFFFFF',
                }}
              >
                Hatırlatıcı Ayarları
              </Text>
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(false);
                  setShowDaysDropdown(false);
                  setShowOffsetDropdown(false);
                }}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Description */}
            <Text
              style={{
                fontFamily,
                fontSize: 14,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.6)',
                textAlign: 'center',
                marginBottom: 24,
                lineHeight: 20,
              }}
            >
              Bu vakitte nasıl hatırlatılmak istediğini seçebilirsin.
            </Text>

            {/* Days Dropdown */}
            <Text
              style={{
                fontFamily,
                fontSize: 14,
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: 8,
              }}
            >
              Hangi günlerde hatırlatma gelsin?
            </Text>
            <View style={{ marginBottom: 20, zIndex: 10 }}>
              <TouchableOpacity
                onPress={() => {
                  setShowOffsetDropdown(false);
                  setShowDaysDropdown(!showDaysDropdown);
                }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 10,
                  borderWidth: 0.5,
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  paddingHorizontal: 15,
                  paddingVertical: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily,
                    fontSize: 16,
                    fontWeight: '400',
                    color: '#FFFFFF',
                  }}
                >
                  {selectedDaysList.length === 7 ? 'Her gün' : selectedDaysList.length > 0 ? selectedDaysList.join(', ') : modalDays}
                </Text>
                <Ionicons name={showDaysDropdown ? "chevron-up" : "chevron-down"} size={20} color="#FFFFFF" />
              </TouchableOpacity>

              {showDaysDropdown && (
                <View
                  style={{
                    marginTop: 4,
                    backgroundColor: '#172521',
                    borderRadius: 10,
                    borderWidth: 0.5,
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Quick Options */}
                  <TouchableOpacity
                    onPress={() => {
                      if (selectedDaysList.length === 7) {
                        setSelectedDaysList([]);
                        setModalDays('Her gün');
                      } else {
                        setSelectedDaysList(daysOptions);
                        setModalDays('Her gün');
                      }
                    }}
                    style={{
                      paddingHorizontal: 15,
                      paddingVertical: 12,
                      borderBottomWidth: 0.5,
                      borderBottomColor: 'rgba(255, 255, 255, 0.1)',
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily,
                        fontSize: 16,
                        fontWeight: '400',
                        color: '#FFFFFF',
                      }}
                    >
                      Her gün
                    </Text>
                    {selectedDaysList.length === 7 && (
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderWidth: 1.5,
                          borderColor: '#FFFFFF',
                          borderRadius: 4,
                          backgroundColor: '#172521',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                      </View>
                    )}
                    {selectedDaysList.length !== 7 && (
                      <View
                        style={{
                          width: 20,
                          height: 20,
                          borderWidth: 1.5,
                          borderColor: '#FFFFFF',
                          borderRadius: 4,
                          backgroundColor: '#172521',
                        }}
                      />
                    )}
                  </TouchableOpacity>
                  
                  {/* Individual Days */}
                  {daysOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        toggleDaySelection(option);
                        setModalDays('Özel');
                      }}
                      style={{
                        paddingHorizontal: 15,
                        paddingVertical: 12,
                        borderBottomWidth: index < daysOptions.length - 1 ? 0.5 : 0,
                        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontFamily,
                          fontSize: 16,
                          fontWeight: '400',
                          color: '#FFFFFF',
                        }}
                      >
                        {option}
                      </Text>
                      {selectedDaysList.includes(option) ? (
                        <View
                          style={{
                            width: 20,
                            height: 20,
                            borderWidth: 1.5,
                            borderColor: '#FFFFFF',
                            borderRadius: 4,
                            backgroundColor: '#172521',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                        </View>
                      ) : (
                        <View
                          style={{
                            width: 20,
                            height: 20,
                            borderWidth: 1.5,
                            borderColor: '#FFFFFF',
                            borderRadius: 4,
                            backgroundColor: '#172521',
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Offset Dropdown */}
            <Text
              style={{
                fontFamily,
                fontSize: 14,
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: 8,
              }}
            >
              Vaktinden ne kadar önce hatırlatma gelsin?
            </Text>
            <View style={{ marginBottom: 20, zIndex: 5 }}>
              <TouchableOpacity
                onPress={() => {
                  setShowDaysDropdown(false);
                  setShowOffsetDropdown(!showOffsetDropdown);
                }}
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 10,
                  borderWidth: 0.5,
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  paddingHorizontal: 15,
                  paddingVertical: 12,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily,
                    fontSize: 16,
                    fontWeight: '400',
                    color: '#FFFFFF',
                  }}
                >
                  {modalOffset}
                </Text>
                <Ionicons name={showOffsetDropdown ? "chevron-up" : "chevron-down"} size={20} color="#FFFFFF" />
              </TouchableOpacity>

              {showOffsetDropdown && (
                <View
                  style={{
                    marginTop: 4,
                    backgroundColor: '#172521',
                    borderRadius: 10,
                    borderWidth: 0.5,
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                    overflow: 'hidden',
                    maxHeight: 250,
                  }}
                >
                  {offsetOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        setModalOffset(option);
                        setShowOffsetDropdown(false);
                      }}
                      style={{
                        paddingHorizontal: 15,
                        paddingVertical: 12,
                        borderBottomWidth: index < offsetOptions.length - 1 ? 0.5 : 0,
                        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Text
                        style={{
                          fontFamily,
                          fontSize: 16,
                          fontWeight: '400',
                          color: '#FFFFFF',
                        }}
                      >
                        {option}
                      </Text>
                      {modalOffset === option ? (
                        <View
                          style={{
                            width: 20,
                            height: 20,
                            borderWidth: 1.5,
                            borderColor: '#FFFFFF',
                            borderRadius: 4,
                            backgroundColor: '#172521',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                        </View>
                      ) : (
                        <View
                          style={{
                            width: 20,
                            height: 20,
                            borderWidth: 1.5,
                            borderColor: '#FFFFFF',
                            borderRadius: 4,
                            backgroundColor: '#172521',
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  ))}
                </View>
              )}
            </View>

            {/* Notification Checkbox */}
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16 }}>
              <Switch
                value={modalNotification}
                onValueChange={setModalNotification}
                trackColor={{ false: '#7C8381', true: '#15614D' }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#7C8381"
                style={{ marginRight: 12, marginTop: 2 }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily,
                    fontSize: 12,
                    fontWeight: '700',
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

            {/* Alarm Checkbox */}
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 24 }}>
              <Switch
                value={modalAlarm}
                onValueChange={setModalAlarm}
                trackColor={{ false: '#7C8381', true: '#15614D' }}
                thumbColor="#FFFFFF"
                ios_backgroundColor="#7C8381"
                style={{ marginRight: 12, marginTop: 2 }}
              />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily,
                    fontSize: 12,
                    fontWeight: '700',
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

            {/* Save Button */}
            <TouchableOpacity
              onPress={handleModalSave}
              style={{
                width: '100%',
                height: 40,
                borderRadius: 10,
                backgroundColor: '#15614D',
                alignItems: 'center',
                justifyContent: 'center',
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
          </Pressable>
          </Pressable>
        </BlurView>
      </Modal>
    </ScreenBackground>
  );
}

