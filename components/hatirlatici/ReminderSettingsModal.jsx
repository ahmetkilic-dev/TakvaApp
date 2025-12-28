import { View, Text, TouchableOpacity, Modal, Pressable, Dimensions, ScrollView, Switch } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

const daysOptions = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];
const offsetOptions = ['Tam vaktinde', '5 dakika önce', '10 dakika önce', '15 dakika önce', '30 dakika önce', '45 dakika önce', '1 saat önce'];

export default function ReminderSettingsModal({ visible, onClose, onSave, prayer, currentSettings }) {
  const [modalDays, setModalDays] = useState('Her gün');
  const [modalOffset, setModalOffset] = useState('Tam vaktinde');
  const [modalNotification, setModalNotification] = useState(false);
  const [modalAlarm, setModalAlarm] = useState(true);
  const [showDaysDropdown, setShowDaysDropdown] = useState(false);
  const [showOffsetDropdown, setShowOffsetDropdown] = useState(false);
  const [selectedDaysList, setSelectedDaysList] = useState([]);

  // Modal açıldığında mevcut ayarları yükle
  useEffect(() => {
    if (visible && currentSettings) {
      // Days parse
      if (currentSettings.days) {
        const daysText = currentSettings.days;
        if (daysText === 'Her gün') {
          setSelectedDaysList(daysOptions);
          setModalDays('Her gün');
        } else if (daysText.includes(',')) {
          const daysArray = daysText.split(',').map(d => d.trim());
          setSelectedDaysList(daysArray);
          setModalDays('Özel');
        } else {
          setSelectedDaysList([]);
          setModalDays(daysText);
        }
      } else {
        setSelectedDaysList(daysOptions);
        setModalDays('Her gün');
      }

      // Offset parse
      if (currentSettings.offset) {
        const offsetText = currentSettings.offset;
        if (offsetText === 'Tam vaktinde') {
          setModalOffset('Tam vaktinde');
        } else if (offsetText.includes('5')) {
          setModalOffset('5 dakika önce');
        } else if (offsetText.includes('10')) {
          setModalOffset('10 dakika önce');
        } else if (offsetText.includes('15')) {
          setModalOffset('15 dakika önce');
        } else if (offsetText.includes('30')) {
          setModalOffset('30 dakika önce');
        } else if (offsetText.includes('45')) {
          setModalOffset('45 dakika önce');
        } else if (offsetText.includes('1 saat')) {
          setModalOffset('1 saat önce');
        } else {
          setModalOffset('Tam vaktinde');
        }
      } else {
        setModalOffset('Tam vaktinde');
      }

      // Notification/Alarm
      setModalNotification(currentSettings.isNotification || false);
      setModalAlarm(currentSettings.isAlarm !== undefined ? currentSettings.isAlarm : true);
    }
  }, [visible, currentSettings]);

  const toggleDaySelection = (day) => {
    if (selectedDaysList.includes(day)) {
      setSelectedDaysList(selectedDaysList.filter(d => d !== day));
    } else {
      setSelectedDaysList([...selectedDaysList, day]);
    }
  };

  const handleSave = () => {
    let daysText = modalDays;
    if (selectedDaysList.length > 0 && selectedDaysList.length < 7) {
      daysText = selectedDaysList.join(', ');
    } else if (selectedDaysList.length === 7) {
      daysText = 'Her gün';
    }

    let offsetText = modalOffset;
    if (modalOffset !== 'Tam vaktinde') {
      offsetText = `Vaktinden ${modalOffset.replace('dakika önce', 'dk önce').replace('saat önce', 'saat önce')}`;
    }

    onSave({
      days: daysText,
      offset: offsetText,
      isNotification: modalNotification,
      isAlarm: modalAlarm,
    });

    setShowDaysDropdown(false);
    setShowOffsetDropdown(false);
  };

  const handleClose = () => {
    setShowDaysDropdown(false);
    setShowOffsetDropdown(false);
    onClose();
  };

  if (!prayer) return null;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleClose}
    >
      <BlurView
        intensity={50}
        tint="dark"
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}
      >
        <Pressable
          style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={handleClose}
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
              maxHeight: '80%',
            }}
            onPress={(e) => e.stopPropagation()}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
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
                <TouchableOpacity onPress={handleClose}>
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
                {prayer.label} vaktinde nasıl hatırlatılmak istediğini seçebilirsin.
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
                      maxHeight: 250,
                    }}
                  >
                    <ScrollView>
                      {/* Her gün */}
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
                        <Text style={{ fontFamily, fontSize: 16, fontWeight: '400', color: '#FFFFFF' }}>
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
                          <Text style={{ fontFamily, fontSize: 16, fontWeight: '400', color: '#FFFFFF' }}>
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
                    </ScrollView>
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
                  <Text style={{ fontFamily, fontSize: 16, fontWeight: '400', color: '#FFFFFF' }}>
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
                    <ScrollView>
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
                          <Text style={{ fontFamily, fontSize: 16, fontWeight: '400', color: '#FFFFFF' }}>
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
                    </ScrollView>
                  </View>
                )}
              </View>

              {/* Notification Switch */}
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
                  <Text style={{ fontFamily, fontSize: 12, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 }}>
                    Bildirim Gönder
                  </Text>
                  <Text style={{ fontFamily, fontSize: 10, fontWeight: '400', color: 'rgba(255, 255, 255, 0.6)' }}>
                    Sessiz bir uyarı alırsın, telefon çalmadan bildirim görünür.
                  </Text>
                </View>
              </View>

              {/* Alarm Switch */}
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
                  <Text style={{ fontFamily, fontSize: 12, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 }}>
                    Alarm Kur
                  </Text>
                  <Text style={{ fontFamily, fontSize: 10, fontWeight: '400', color: 'rgba(255, 255, 255, 0.6)' }}>
                    Telefon çalarak seni uyandıran tam ekran bir alarm kurulur.
                  </Text>
                </View>
              </View>

              {/* Save Button */}
              <TouchableOpacity
                onPress={handleSave}
                style={{
                  width: '100%',
                  height: 40,
                  borderRadius: 10,
                  backgroundColor: '#15614D',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ fontFamily, fontSize: 14, fontWeight: '600', color: '#FFFFFF' }}>
                  Kaydet
                </Text>
              </TouchableOpacity>
            </ScrollView>
          </Pressable>
        </Pressable>
      </BlurView>
    </Modal>
  );
}

