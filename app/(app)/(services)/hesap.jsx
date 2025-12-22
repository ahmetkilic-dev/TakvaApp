import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
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
  const [email, setEmail] = useState('');
  const [emailCode, setEmailCode] = useState(['', '', '', '', '', '', '']);
  const [birthDate, setBirthDate] = useState('');
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
            paddingBottom: Platform.OS === 'ios' ? 120 : 100,
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
                borderWidth: 0.5,
                borderColor: 'rgba(255, 255, 255, 0.5)',
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
                        <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
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
                        <View style={{ flexDirection: 'row', gap: 8, justifyContent: 'center' }}>
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
                      </>
                    )}

                    {/* Doğum Tarihi */}
                    {section.id === 'dogumTarihi' && (
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
                        }}
                        placeholder="Doğum tarihini giriniz"
                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                        value={birthDate}
                        onChangeText={setBirthDate}
                      />
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
                          placeholder="Parolanızı giriniz"
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
                          placeholder="Yeni parolanızı tekrar giriniz"
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
                          }}
                          placeholder="Yeni parolanızı tekrar giriniz"
                          placeholderTextColor="rgba(255, 255, 255, 0.5)"
                          value={confirmPassword}
                          onChangeText={setConfirmPassword}
                          secureTextEntry
                        />
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

