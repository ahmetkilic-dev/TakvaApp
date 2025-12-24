import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import ScreenBackground from '../../../components/common/ScreenBackground';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

// Responsive calculations
const horizontalPadding = 20;
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);

export default function HesapScreen() {
  const router = useRouter();
  const [expandedSections, setExpandedSections] = useState({
    telefon: false,
    email: false,
    dogumTarihi: false,
    parola: false,
    hesapSil: false,
  });

  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneCode, setPhoneCode] = useState(['', '', '', '', '', '', '']);
  const [showPhoneCode, setShowPhoneCode] = useState(false);
  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState(['', '', '', '', '', '', '']);
  const [showEmailCode, setShowEmailCode] = useState(false);
  const [birthDate, setBirthDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCodeInput = (index, value, type) => {
    if (type === 'phone') {
      const newCode = [...phoneCode];
      newCode[index] = value;
      setPhoneCode(newCode);
    } else {
      const newCode = [...emailCode];
      newCode[index] = value;
      setEmailCode(newCode);
    }
  };

  const formatDate = (date) => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  };

  const onDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
      if (event.type === 'set' && selectedDate) {
        setBirthDate(selectedDate);
      }
    } else {
      // iOS'ta sadece tarihi güncelle, picker'ı kapatma (sadece butonlarla kapanacak)
      if (selectedDate) {
        setBirthDate(selectedDate);
      }
    }
  };

  const handleSaveBirthDate = () => {
    // Burada doğum tarihini kaydetme işlemi yapılacak
    console.log('Doğum tarihi kaydedildi:', birthDate);
    // API çağrısı veya state güncellemesi burada yapılabilir
  };

  const handleSavePassword = () => {
    // Burada şifre değiştirme işlemi yapılacak
    if (newPassword !== confirmPassword) {
      alert('Yeni parolalar eşleşmiyor!');
      return;
    }
    console.log('Şifre değiştirildi');
    // API çağrısı burada yapılabilir
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const sections = [
    {
      id: 'telefon',
      title: 'Telefon numarası',
      description: 'Hesabının güvenliği ve doğrulaması için kullanılır.',
      expanded: expandedSections.telefon,
    },
    {
      id: 'email',
      title: 'E-posta Adresi',
      description: 'Giriş yapmak ve bildirimleri alabilmek için kullanılır.',
      expanded: expandedSections.email,
    },
    {
      id: 'dogumTarihi',
      title: 'Doğum Tarihi',
      description: 'Daha kişisel bir deneyim sunabilmemiz için kullanılır.',
      expanded: expandedSections.dogumTarihi,
    },
    {
      id: 'parola',
      title: 'Parola Değiştir',
      description: 'Hesabının güvenliğini artırmak için yeni bir parola belirleyebilirsin.',
      expanded: expandedSections.parola,
    },
  ];

  return (
    <ScreenBackground>
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-2 pb-2">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="w-9 h-9 items-center justify-center"
          >
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
            PROFİL
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
          {/* Hesap Section */}
          <View style={{ marginBottom: 32, alignItems: 'center' }}>
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
              Hesap
            </Text>
            <Text
              style={{
                fontFamily,
                fontSize: 10,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: 24,
                lineHeight: 13,
                textAlign: 'center',
              }}
            >
              Hesap bilgilerini görüntüleyebilir, güncelleyebilir ve yönetebilirsin.
            </Text>

            {/* Collapsible Sections */}
            <View
              style={{
                width: '100%',
                borderRadius: 15,
                backgroundColor: 'rgba(24, 39, 35, 0.5)',
                overflow: 'hidden',
              }}
            >
              {sections.map((section, index) => (
                <View key={section.id}>
                  {/* Section Header */}
                  <TouchableOpacity
                    onPress={() => toggleSection(section.id)}
                    style={{
                      width: '100%',
                      paddingVertical: 16,
                      paddingHorizontal: 16,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <View style={{ flex: 1 }}>
                      <Text
                        style={{
                          fontFamily,
                          fontSize: 16,
                          fontWeight: '500',
                          color: '#FFFFFF',
                          marginBottom: 4,
                        }}
                      >
                        {section.title}
                      </Text>
                      <Text
                        style={{
                          fontFamily,
                          fontSize: 10,
                          fontWeight: '400',
                          color: 'rgba(255, 255, 255, 0.8)',
                        }}
                      >
                        {section.description}
                      </Text>
                    </View>
                    <Ionicons
                      name={section.expanded ? 'chevron-up' : 'chevron-down'}
                      size={20}
                      color="#FFFFFF"
                      style={{ marginLeft: 12 }}
                    />
                  </TouchableOpacity>

                  {/* Expanded Content */}
                  {section.expanded && (
                    <View
                      style={{
                        paddingHorizontal: 16,
                        paddingBottom: 16,
                      }}
                    >
                    {/* Telefon Numarası */}
                    {section.id === 'telefon' && (
                      <>
                        <View style={{ marginBottom: 16, position: 'relative' }}>
                          <TextInput
                            style={{
                              width: '100%',
                              height: 42,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: 'rgba(255, 255, 255, 0.7)',
                              backgroundColor: '#15221E',
                              paddingHorizontal: 15,
                              paddingRight: 90,
                              color: '#FFFFFF',
                              fontFamily,
                              fontSize: 12,
                            }}
                            placeholder="Telefon numaranızı giriniz"
                            placeholderTextColor="rgba(255, 255, 255, 0.5)"
                            value={phoneNumber}
                            onChangeText={setPhoneNumber}
                            keyboardType="phone-pad"
                          />
                          <TouchableOpacity
                            onPress={() => setShowPhoneCode(true)}
                            style={{
                              position: 'absolute',
                              right: 15,
                              top: 0,
                              height: 42,
                              justifyContent: 'center',
                            }}
                          >
                            <Text
                              style={{
                                fontFamily,
                                fontSize: 10,
                                fontWeight: '400',
                                color: '#FFFFFF',
                              }}
                            >
                              Kodu gönder
                            </Text>
                          </TouchableOpacity>
                        </View>
                        {/* Code Input Boxes */}
                        {showPhoneCode && (
                          <>
                            <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
                              {phoneCode.map((digit, idx) => (
                                <TextInput
                                  key={idx}
                                  style={{
                                    width: 40,
                                    height: 43,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                    backgroundColor: '#15221E',
                                    textAlign: 'center',
                                    color: '#FFFFFF',
                                    fontFamily,
                                    fontSize: 20,
                                    fontWeight: '400',
                                  }}
                                  value={digit}
                                  onChangeText={(value) => handleCodeInput(idx, value, 'phone')}
                                  keyboardType="number-pad"
                                  maxLength={1}
                                />
                              ))}
                            </View>
                            <TouchableOpacity
                              style={{
                                width: '100%',
                                height: 42,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                                backgroundColor: '#15221E',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily,
                                  fontSize: 18,
                                  fontWeight: '500',
                                  color: '#FFFFFF',
                                }}
                              >
                                Kaydet
                              </Text>
                            </TouchableOpacity>
                          </>
                        )}
                      </>
                    )}

                    {/* E-posta Adresi */}
                    {section.id === 'email' && (
                      <>
                        <View style={{ marginBottom: 16, position: 'relative' }}>
                          <TextInput
                            style={{
                              width: '100%',
                              height: 42,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: 'rgba(255, 255, 255, 0.7)',
                              backgroundColor: '#15221E',
                              paddingHorizontal: 15,
                              paddingRight: 90,
                              color: '#FFFFFF',
                              fontFamily,
                              fontSize: 12,
                            }}
                            placeholder="E-postanızı giriniz"
                            placeholderTextColor="rgba(255, 255, 255, 0.5)"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                          />
                          <TouchableOpacity
                            onPress={() => setShowEmailCode(true)}
                            style={{
                              position: 'absolute',
                              right: 15,
                              top: 0,
                              height: 42,
                              justifyContent: 'center',
                            }}
                          >
                            <Text
                              style={{
                                fontFamily,
                                fontSize: 10,
                                fontWeight: '400',
                                color: '#FFFFFF',
                              }}
                            >
                              Kodu gönder
                            </Text>
                          </TouchableOpacity>
                        </View>
                        {/* Code Input Boxes */}
                        {showEmailCode && (
                          <>
                            <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center', marginBottom: 16 }}>
                              {emailCode.map((digit, idx) => (
                                <TextInput
                                  key={idx}
                                  style={{
                                    width: 40,
                                    height: 43,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                    backgroundColor: '#15221E',
                                    textAlign: 'center',
                                    color: '#FFFFFF',
                                    fontFamily,
                                    fontSize: 20,
                                    fontWeight: '400',
                                  }}
                                  value={digit}
                                  onChangeText={(value) => handleCodeInput(idx, value, 'email')}
                                  keyboardType="number-pad"
                                  maxLength={1}
                                />
                              ))}
                            </View>
                            <TouchableOpacity
                              style={{
                                width: '100%',
                                height: 42,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                                backgroundColor: '#15221E',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily,
                                  fontSize: 18,
                                  fontWeight: '500',
                                  color: '#FFFFFF',
                                }}
                              >
                                Kaydet
                              </Text>
                            </TouchableOpacity>
                          </>
                        )}
                      </>
                    )}

                    {/* Doğum Tarihi */}
                    {section.id === 'dogumTarihi' && (
                      <>
                        <TouchableOpacity
                          onPress={() => setShowDatePicker(true)}
                          style={{
                            width: '100%',
                            height: 42,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.7)',
                            backgroundColor: '#15221E',
                            paddingHorizontal: 15,
                            justifyContent: 'center',
                            marginBottom: 16,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily,
                              fontSize: 12,
                              color: birthDate ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
                            }}
                          >
                            {birthDate ? formatDate(birthDate) : 'Doğum tarihini giriniz'}
                          </Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                          <>
                            <DateTimePicker
                              value={birthDate || new Date()}
                              mode="date"
                              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                              onChange={onDateChange}
                              maximumDate={new Date()}
                              minimumDate={new Date(1900, 0, 1)}
                              locale="tr-TR"
                              textColor="#FFFFFF"
                              themeVariant="dark"
                            />
                            {Platform.OS === 'ios' && (
                              <View style={{ flexDirection: 'row', gap: 8, marginTop: 8 }}>
                                <TouchableOpacity
                                  onPress={() => setShowDatePicker(false)}
                                  style={{
                                    flex: 1,
                                    height: 42,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                    backgroundColor: '#15221E',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontFamily,
                                      fontSize: 14,
                                      fontWeight: '500',
                                      color: '#FFFFFF',
                                    }}
                                  >
                                    İptal
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                  onPress={() => {
                                    if (!birthDate) setBirthDate(new Date());
                                    setShowDatePicker(false);
                                  }}
                                  style={{
                                    flex: 1,
                                    height: 42,
                                    borderRadius: 10,
                                    borderWidth: 1,
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                    backgroundColor: '#15221E',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                  }}
                                >
                                  <Text
                                    style={{
                                      fontFamily,
                                      fontSize: 14,
                                      fontWeight: '500',
                                      color: '#FFFFFF',
                                    }}
                                  >
                                    Tamam
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            )}
                            <TouchableOpacity
                              onPress={() => {
                                handleSaveBirthDate();
                                setShowDatePicker(false);
                              }}
                              disabled={!birthDate}
                              style={{
                                width: '100%',
                                height: 42,
                                borderRadius: 10,
                                borderWidth: 1,
                                borderColor: 'rgba(255, 255, 255, 0.5)',
                                backgroundColor: birthDate ? '#15221E' : 'rgba(21, 34, 30, 0.5)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: birthDate ? 1 : 0.5,
                                marginTop: 8,
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily,
                                  fontSize: 18,
                                  fontWeight: '500',
                                  color: '#FFFFFF',
                                }}
                              >
                                Kaydet
                              </Text>
                            </TouchableOpacity>
                          </>
                        )}
                        {!showDatePicker && (
                          <TouchableOpacity
                            onPress={handleSaveBirthDate}
                            disabled={!birthDate}
                            style={{
                              width: '100%',
                              height: 42,
                              borderRadius: 10,
                              borderWidth: 1,
                              borderColor: 'rgba(255, 255, 255, 0.5)',
                              backgroundColor: birthDate ? '#15221E' : 'rgba(21, 34, 30, 0.5)',
                              alignItems: 'center',
                              justifyContent: 'center',
                              opacity: birthDate ? 1 : 0.5,
                            }}
                          >
                            <Text
                              style={{
                                fontFamily,
                                fontSize: 18,
                                fontWeight: '500',
                                color: '#FFFFFF',
                              }}
                            >
                              Kaydet
                            </Text>
                          </TouchableOpacity>
                        )}
                      </>
                    )}

                    {/* Parola Değiştir */}
                    {section.id === 'parola' && (
                      <>
                        <TextInput
                          style={{
                            width: '100%',
                            height: 42,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.7)',
                            backgroundColor: '#15221E',
                            paddingHorizontal: 15,
                            color: '#FFFFFF',
                            fontFamily,
                            fontSize: 12,
                            marginBottom: 12,
                          }}
                          placeholder="Mevcut parolanızı giriniz"
                          placeholderTextColor="rgba(255, 255, 255, 0.5)"
                          value={currentPassword}
                          onChangeText={setCurrentPassword}
                          secureTextEntry
                        />
                        <TextInput
                          style={{
                            width: '100%',
                            height: 42,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.7)',
                            backgroundColor: '#15221E',
                            paddingHorizontal: 15,
                            color: '#FFFFFF',
                            fontFamily,
                            fontSize: 12,
                            marginBottom: 12,
                          }}
                          placeholder="Yeni parolanızı giriniz"
                          placeholderTextColor="rgba(255, 255, 255, 0.5)"
                          value={newPassword}
                          onChangeText={setNewPassword}
                          secureTextEntry
                        />
                        <TextInput
                          style={{
                            width: '100%',
                            height: 42,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.7)',
                            backgroundColor: '#15221E',
                            paddingHorizontal: 15,
                            color: '#FFFFFF',
                            fontFamily,
                            fontSize: 12,
                            marginBottom: 16,
                          }}
                          placeholder="Yeni parolanızı tekrar giriniz"
                          placeholderTextColor="rgba(255, 255, 255, 0.5)"
                          value={confirmPassword}
                          onChangeText={setConfirmPassword}
                          secureTextEntry
                        />
                        <TouchableOpacity
                          onPress={handleSavePassword}
                          disabled={!currentPassword || !newPassword || !confirmPassword}
                          style={{
                            width: '100%',
                            height: 42,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                            backgroundColor: (currentPassword && newPassword && confirmPassword) ? '#15221E' : 'rgba(21, 34, 30, 0.5)',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: (currentPassword && newPassword && confirmPassword) ? 1 : 0.5,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily,
                              fontSize: 18,
                              fontWeight: '500',
                              color: '#FFFFFF',
                            }}
                          >
                            Kaydet
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}

                    </View>
                  )}
                  
                  {/* Divider Line */}
                  {index < sections.length - 1 && (
                    <View
                      style={{
                        width: '100%',
                        height: 0.5,
                        backgroundColor: 'rgba(255, 255, 255, 0.5)',
                        marginLeft: 16,
                      }}
                    />
                  )}
                </View>
              ))}

              {/* Divider before Hesabı Sil */}
              <View
                style={{
                  width: '100%',
                  height: 0.5,
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  marginLeft: 16,
                }}
              />

              {/* Hesabı Sil Section - Always Visible, Inside Main Box */}
              <View
                style={{
                  width: '100%',
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                }}
              >
                <Text
                  style={{
                    fontFamily,
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#FFFFFF',
                    marginBottom: 4,
                  }}
                >
                  Hesabı Sil
                </Text>
                <Text
                  style={{
                    fontFamily,
                    fontSize: 10,
                    fontWeight: '400',
                    color: 'rgba(255, 255, 255, 0.8)',
                    marginBottom: 16,
                  }}
                >
                  Hesabını kalıcı olarak silmek tüm verilerini geri döndürülemez şekilde kaldırır.
                </Text>
                <TouchableOpacity
                  style={{
                    width: 100,
                    height: 30,
                    borderRadius: 10,
                    borderWidth: 0.5,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily,
                      fontSize: 14,
                      fontWeight: '500',
                      color: '#E74C3C',
                    }}
                  >
                    Hesabı Sil
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

