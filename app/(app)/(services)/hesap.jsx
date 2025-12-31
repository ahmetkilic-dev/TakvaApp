import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, TextInput, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DateTimePicker from '@react-native-community/datetimepicker';
import ScreenBackground from '../../../components/common/ScreenBackground';
import { useHesap } from '../../../components/profile/hooks/useHesap';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

const horizontalPadding = 20;

export default function HesapScreen() {
  const router = useRouter();
  const {
    profile,
    loading: hesapLoading,
    updatePhone,
    updateEmail,
    updateBirthDate,
    changePassword,
    deleteAccount
  } = useHesap();

  const [expandedSections, setExpandedSections] = useState({
    telefon: false,
    email: false,
    dogumTarihi: false,
    parola: false,
  });

  const [localPhone, setLocalPhone] = useState('');
  const [localEmail, setLocalEmail] = useState('');
  const [localBirthDate, setLocalBirthDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [deletePassword, setDeletePassword] = useState('');
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    if (profile) {
      setLocalPhone(profile.phone || '');
      setLocalEmail(profile.email || '');
      if (profile.birth_date) {
        // GG/AA/YYYY formatını Date objesine çevir
        const [d, m, y] = profile.birth_date.split('/').map(Number);
        if (d && m && y) setLocalBirthDate(new Date(y, m - 1, d));
      }
    }
  }, [profile]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const formatDate = (date) => {
    if (!date) return '';
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const onDateChange = (event, selectedDate) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
      if (event.type === 'set' && selectedDate) {
        setLocalBirthDate(selectedDate);
      }
    } else {
      if (selectedDate) setLocalBirthDate(selectedDate);
    }
  };

  const handleUpdatePhone = async () => {
    if (!localPhone) return;
    setIsUpdating(true);
    const res = await updatePhone(localPhone);
    setIsUpdating(false);
    if (res.success) {
      Alert.alert('Başarılı', 'Telefon numaranız güncellendi.');
      toggleSection('telefon');
    } else {
      Alert.alert('Hata', res.error || 'Güncelleme başarısız.');
    }
  };

  const handleUpdateEmail = async () => {
    if (!localEmail) return;
    setIsUpdating(true);
    const res = await updateEmail(localEmail);
    setIsUpdating(false);
    if (res.success) {
      Alert.alert('Başarılı', 'E-posta adresiniz güncellendi.');
      toggleSection('email');
    } else {
      Alert.alert('Hata', res.error || 'Güncelleme başarısız.');
    }
  };

  const handleUpdateBirthDate = async () => {
    if (!localBirthDate) return;
    setIsUpdating(true);
    const res = await updateBirthDate(formatDate(localBirthDate));
    setIsUpdating(false);
    if (res.success) {
      Alert.alert('Başarılı', 'Doğum tarihiniz güncellendi.');
      toggleSection('dogumTarihi');
    } else {
      Alert.alert('Hata', res.error || 'Güncelleme başarısız.');
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Hata', 'Yeni parolalar eşleşmiyor!');
      return;
    }
    setIsUpdating(true);
    const res = await changePassword(currentPassword, newPassword);
    setIsUpdating(false);
    if (res.success) {
      Alert.alert('Başarılı', 'Parolanız güncellendi.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      toggleSection('parola');
    } else {
      Alert.alert('Hata', res.error || 'Güncelleme başarısız.');
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      Alert.alert('Hata', 'İşlemi onaylamak için parolanızı girmelisiniz.');
      return;
    }

    setIsUpdating(true);
    const res = await deleteAccount(deletePassword);
    setIsUpdating(false);
    if (res.success) {
      setIsDeleteModalVisible(false);
      router.replace('/(auth)/login');
    } else {
      Alert.alert('Hata', res.error || 'Hesap silinemedi. Lütfen parolanızı kontrol edin.');
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

  if (hesapLoading) {
    return (
      <ScreenBackground>
        <SafeAreaView className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#FFBA4A" />
        </SafeAreaView>
      </ScreenBackground>
    );
  }

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
            HESAP
          </Text>
          <View className="w-9" />
        </View>

        {/* Content Title */}
        <View className="items-center mt-4 mb-2 px-10">
          <Text style={{ fontFamily: 'Plus Jakarta Sans', color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginBottom: 4 }}>Hesap Bilgileri</Text>
          <Text className="text-center" style={{ fontFamily: 'Plus Jakarta Sans', color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '400', lineHeight: 14 }}>
            Kişisel bilgilerini görüntüle, güncelle ve hesap işlemlerini yönet.
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 12,
          }}
        >
          {/* Hesap Section */}
          <View className="flex-1 rounded-t-[20px] p-5 pt-7 pb-40" style={{ backgroundColor: 'rgba(24, 39, 35, 0.9)' }}>
            {sections.map((section, index) => (
              <View key={section.id} className="mb-4">
                {/* Section Header */}
                <TouchableOpacity
                  onPress={() => toggleSection(section.id)}
                  activeOpacity={0.7}
                  className="flex-row items-center justify-between"
                >
                  <View className="flex-1 pr-4">
                    <Text
                      style={{
                        fontFamily,
                        fontSize: 16,
                        fontWeight: '500',
                        color: '#FFFFFF',
                      }}
                    >
                      {section.title}
                    </Text>
                    <Text
                      style={{
                        fontFamily,
                        fontSize: 12,
                        fontWeight: '400',
                        color: 'rgba(255, 255, 255, 0.6)',
                        marginTop: 2
                      }}
                    >
                      {section.description}
                    </Text>
                  </View>
                  <Ionicons
                    name={section.expanded ? 'chevron-up' : 'chevron-down'}
                    size={20}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>

                {/* Expanded Content */}
                {section.expanded && (
                  <View style={{ marginTop: 16 }}>
                    {/* Telefon Numarası */}
                    {section.id === 'telefon' && (
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
                          placeholder="Yeni telefon numaranızı giriniz"
                          placeholderTextColor="rgba(255, 255, 255, 0.5)"
                          value={localPhone}
                          onChangeText={setLocalPhone}
                          keyboardType="phone-pad"
                        />
                        <TouchableOpacity
                          onPress={handleUpdatePhone}
                          disabled={isUpdating}
                          style={{
                            width: '100%',
                            height: 42,
                            borderRadius: 10,
                            backgroundColor: '#15614D',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: isUpdating ? 0.7 : 1,
                          }}
                        >
                          {isUpdating ? <ActivityIndicator size="small" color="#FFF" /> : (
                            <Text style={{ fontFamily, fontSize: 14, fontWeight: '600', color: '#FFFFFF' }}>Güncelle</Text>
                          )}
                        </TouchableOpacity>
                      </>
                    )}

                    {/* E-posta Adresi */}
                    {section.id === 'email' && (
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
                          placeholder="Yeni e-postanızı giriniz"
                          placeholderTextColor="rgba(255, 255, 255, 0.5)"
                          value={localEmail}
                          onChangeText={setLocalEmail}
                          keyboardType="email-address"
                          autoCapitalize="none"
                        />
                        <TouchableOpacity
                          onPress={handleUpdateEmail}
                          disabled={isUpdating}
                          style={{
                            width: '100%',
                            height: 42,
                            borderRadius: 10,
                            backgroundColor: '#15614D',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: isUpdating ? 0.7 : 1,
                          }}
                        >
                          {isUpdating ? <ActivityIndicator size="small" color="#FFF" /> : (
                            <Text style={{ fontFamily, fontSize: 14, fontWeight: '600', color: '#FFFFFF' }}>Güncelle</Text>
                          )}
                        </TouchableOpacity>
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
                            marginBottom: 12,
                          }}
                        >
                          <Text style={{ fontFamily, fontSize: 12, color: localBirthDate ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)' }}>
                            {localBirthDate ? formatDate(localBirthDate) : 'Doğum tarihini seçiniz'}
                          </Text>
                        </TouchableOpacity>

                        {showDatePicker && (
                          <View>
                            <DateTimePicker
                              value={localBirthDate || new Date()}
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
                              <TouchableOpacity
                                onPress={() => setShowDatePicker(false)}
                                style={{ padding: 10, alignItems: 'center' }}
                              >
                                <Text style={{ color: '#FFF' }}>Tamam</Text>
                              </TouchableOpacity>
                            )}
                          </View>
                        )}

                        <TouchableOpacity
                          onPress={handleUpdateBirthDate}
                          disabled={isUpdating || !localBirthDate}
                          style={{
                            width: '100%',
                            height: 42,
                            borderRadius: 10,
                            backgroundColor: '#15614D',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: (isUpdating || !localBirthDate) ? 0.7 : 1,
                          }}
                        >
                          {isUpdating ? <ActivityIndicator size="small" color="#FFF" /> : (
                            <Text style={{ fontFamily, fontSize: 14, fontWeight: '600', color: '#FFFFFF' }}>Güncelle</Text>
                          )}
                        </TouchableOpacity>
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
                            marginBottom: 12,
                          }}
                          placeholder="Yeni parolanızı tekrar giriniz"
                          placeholderTextColor="rgba(255, 255, 255, 0.5)"
                          value={confirmPassword}
                          onChangeText={setConfirmPassword}
                          secureTextEntry
                        />
                        <TouchableOpacity
                          onPress={handleUpdatePassword}
                          disabled={isUpdating || !currentPassword || !newPassword}
                          style={{
                            width: '100%',
                            height: 42,
                            borderRadius: 10,
                            backgroundColor: '#15614D',
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: (isUpdating || !currentPassword || !newPassword) ? 0.7 : 1,
                          }}
                        >
                          {isUpdating ? <ActivityIndicator size="small" color="#FFF" /> : (
                            <Text style={{ fontFamily, fontSize: 14, fontWeight: '600', color: '#FFFFFF' }}>Parolayı Güncelle</Text>
                          )}
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                )}

                <View className="h-[1px] bg-white/10 mt-4 w-full" />
              </View>
            ))}

            {/* Hesabı Sil Section */}
            <View className="mt-4 mb-4">
              <Text style={{ fontFamily, fontSize: 16, fontWeight: '500', color: '#FFFFFF', marginBottom: 2 }}>Hesabı Sil</Text>
              <Text style={{ fontFamily, fontSize: 12, fontWeight: '400', color: 'rgba(255, 255, 255, 0.6)', marginBottom: 16 }}>
                Hesabını kalıcı olarak silmek tüm verilerini geri döndürülemez şekilde kaldırır.
              </Text>

              <TouchableOpacity
                onPress={() => setIsDeleteModalVisible(true)}
                disabled={isUpdating}
                style={{
                  width: 100,
                  height: 35,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: '#E74C3C',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: isUpdating ? 0.7 : 1,
                }}
              >
                <Text style={{ fontFamily, fontSize: 14, fontWeight: '500', color: '#E74C3C' }}>Hesabı Sil</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>

        {/* Delete Confirmation Modal */}
        {isDeleteModalVisible && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
              zIndex: 1000,
            }}
          >
            <View
              style={{
                width: '100%',
                backgroundColor: '#15221E',
                borderRadius: 20,
                padding: 24,
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.2)',
              }}
            >
              <Text style={{ fontFamily: 'Cinzel-Black', color: '#FFFFFF', fontSize: 20, marginBottom: 12, textAlign: 'center' }}>
                HESABI SİL
              </Text>
              <Text style={{ fontFamily, color: 'rgba(255, 255, 255, 0.7)', fontSize: 13, marginBottom: 20, textAlign: 'center', lineHeight: 18 }}>
                Hesabınızı kalıcı olarak silmek üzeresiniz. Bu işlem geri alınamaz. Lütfen onaylamak için parolanızı girin.
              </Text>

              <TextInput
                style={{
                  width: '100%',
                  height: 48,
                  borderRadius: 12,
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.3)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  paddingHorizontal: 16,
                  color: '#FFFFFF',
                  fontFamily,
                  fontSize: 14,
                  marginBottom: 20,
                }}
                placeholder="Parolanız"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                value={deletePassword}
                onChangeText={setDeletePassword}
                secureTextEntry
                autoFocus
              />

              <View style={{ flexDirection: 'row', gap: 12 }}>
                <TouchableOpacity
                  onPress={() => {
                    setIsDeleteModalVisible(false);
                    setDeletePassword('');
                  }}
                  style={{
                    flex: 1,
                    height: 45,
                    borderRadius: 12,
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ fontFamily, color: '#FFFFFF', fontWeight: '600' }}>İptal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleDeleteAccount}
                  disabled={isUpdating || !deletePassword}
                  style={{
                    flex: 1,
                    height: 45,
                    borderRadius: 12,
                    backgroundColor: '#E74C3C',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: (isUpdating || !deletePassword) ? 0.6 : 1,
                  }}
                >
                  {isUpdating ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <Text style={{ fontFamily, color: '#FFFFFF', fontWeight: '700' }}>Evet, Sil</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </SafeAreaView>
    </ScreenBackground >
  );
}

