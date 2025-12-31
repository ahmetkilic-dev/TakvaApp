
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, LayoutAnimation, Platform, UIManager } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';
import { supabase } from '../../../lib/supabase';
import { useUserStats } from '../../../contexts/UserStatsContext';

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const AccordionItem = ({ label, description, isOpen, onPress, children, showBorder = true }) => {
    return (
        <View className="mb-4">
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={onPress}
                className="flex-row items-center justify-between"
            >
                <View className="flex-1 pr-4">
                    <Text className="text-white text-[16px] font-medium" style={{ fontFamily: 'Plus Jakarta Sans' }}>{label}</Text>
                    <Text className="text-white/60 text-[12px] mt-0.5" style={{ fontFamily: 'Plus Jakarta Sans' }}>{description}</Text>
                </View>
                <Ionicons
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="white"
                />
            </TouchableOpacity>

            {isOpen && (
                <View className="mt-3">
                    {children}
                </View>
            )}

            {showBorder && <View className="h-[1px] bg-white/10 mt-4 w-full" />}
        </View>
    );
};

export default function CreatorEditScreen() {
    const router = useRouter();
    const { user } = useUserStats();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Accordion states
    const [openSections, setOpenSections] = useState({}); // { username: true, name: false ... }

    const [formData, setFormData] = useState({
        username: '',
        name: '',
        bio: '',
        link: ''
    });

    const toggleSection = (section) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    useEffect(() => {
        fetchProfile();
    }, [user?.uid]);

    const fetchProfile = async () => {
        if (!user?.uid) return;
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('username, display_name, social_links')
                .eq('id', user.uid)
                .single();

            if (error) throw error;

            if (data) {
                // social_links JSON yapısında bio ve website saklayalım
                const links = data.social_links || {};

                setFormData({
                    username: data.username || '',
                    name: data.display_name || '',
                    bio: links.bio || '',
                    link: links.website || ''
                });
            }
        } catch (error) {
            console.error('Profil datası çekme hatası:', error);
            // Alert.alert('Hata', 'Profil bilgileri yüklenemedi.');
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            // 1. Mevcut social_links'i al
            const { data: currentData } = await supabase
                .from('profiles')
                .select('social_links')
                .eq('id', user.uid)
                .single();

            const currentLinks = currentData?.social_links || {};

            // 2. Yeni verileri social_links içine merge et
            const updatedLinks = {
                ...currentLinks,
                bio: formData.bio,
                website: formData.link
            };

            const updates = {
                username: formData.username,
                display_name: formData.name, // Ad Soyad (sadece adminler görür)
                social_links: updatedLinks,  // Bio ve Website buraya
                updated_at: new Date().toISOString(),
            };

            const { error } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', user.uid);

            if (error) throw error;

            Alert.alert('Başarılı', 'Profil bilgileriniz güncellendi.');
        } catch (error) {
            console.error('Kaydetme hatası:', error);
            Alert.alert('Hata', 'Güncelleme yapılırken bir sorun oluştu.');
        } finally {
            setSaving(false);
        }
    };

    const inputStyle = "w-full bg-[#15221E] border border-white/20 rounded-[12px] px-4 py-3 text-white text-[14px] font-[Plus Jakarta Sans]";

    return (
        <ScreenBackground>
            <SafeAreaView edges={['top']} className="flex-1">
                {/* Header */}
                <View className="flex-row items-center justify-between px-4 pt-2 pb-2">
                    <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 items-center justify-center">
                        <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
                    </TouchableOpacity>
                    <View className="items-center">
                        <Text style={{ fontFamily: 'Cinzel-Black', color: '#FFFFFF', fontSize: 24 }}>PROFİL</Text>
                    </View>
                    <View className="w-9" />
                </View>

                {/* Content Title */}
                <View className="items-center mt-4 mb-6 px-10">
                    <Text style={{ fontFamily: 'Plus Jakarta Sans', color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginBottom: 4 }}>Profili Düzenle</Text>
                    <Text className="text-center" style={{ fontFamily: 'Plus Jakarta Sans', color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '400', lineHeight: 14 }}>
                        Profil bilgilerini güncelle, kendini Takva'da dilediğin gibi yansıt.
                    </Text>
                </View>

                {loading ? (
                    <View className="flex-1 items-center justify-center">
                        <ActivityIndicator color="white" />
                    </View>
                ) : (
                    <ScrollView
                        className="flex-1 px-5 pt-6"
                        contentContainerStyle={{ flexGrow: 1 }}
                        showsVerticalScrollIndicator={false}
                        bounces={false}
                        overScrollMode="never"
                    >

                        {/* Accordion List */}
                        <View className="flex-1 rounded-t-[20px] p-5 pt-7 pb-32" style={{ backgroundColor: 'rgba(24, 39, 35, 0.9)' }}>

                            {/* Kullanıcı Adı */}
                            <AccordionItem
                                label="Kullanıcı Adı"
                                description="Profilinde görünecek kullanıcı adını güncelle."
                                isOpen={!!openSections['username']}
                                onPress={() => toggleSection('username')}
                            >
                                <TextInput
                                    value={formData.username}
                                    onChangeText={(t) => setFormData(prev => ({ ...prev, username: t }))}
                                    placeholder="Kullanıcı adınızı giriniz"
                                    placeholderTextColor="#666"
                                    className={inputStyle}
                                    autoCapitalize="none"
                                />
                            </AccordionItem>

                            {/* Adınız */}
                            <AccordionItem
                                label="Adınız"
                                description="Profilinde görünecek adını güncelle."
                                isOpen={!!openSections['name']}
                                onPress={() => toggleSection('name')}
                            >
                                <TextInput
                                    value={formData.name}
                                    onChangeText={(t) => setFormData(prev => ({ ...prev, name: t }))}
                                    placeholder="Adınızı giriniz"
                                    placeholderTextColor="#666"
                                    className={inputStyle}
                                />
                                <Text className="text-white/40 text-[11px] mt-2 ml-1" style={{ fontFamily: 'Plus Jakarta Sans' }}>* Bu isim sadece yönetim tarafından görülür. Diğer kullanıcılar kullanıcı adınızı görür.</Text>
                            </AccordionItem>

                            {/* Biyografi */}
                            <AccordionItem
                                label="Biyografi"
                                description="Kendini kısaca tanıt veya niyetini paylaş."
                                isOpen={!!openSections['bio']}
                                onPress={() => toggleSection('bio')}
                            >
                                <TextInput
                                    value={formData.bio}
                                    onChangeText={(t) => setFormData(prev => ({ ...prev, bio: t }))}
                                    placeholder="Kısa ve sade tutmanı öneririz."
                                    placeholderTextColor="#666"
                                    className={`${inputStyle} h-24 pt-3`}
                                    multiline
                                    textAlignVertical="top"
                                />
                            </AccordionItem>

                            {/* Bağlantı */}
                            <AccordionItem
                                label="Bağlantı"
                                description="Kişisel web siteni veya sosyal medya hesabını ekle."
                                isOpen={!!openSections['link']}
                                onPress={() => toggleSection('link')}
                                showBorder={false}
                            >
                                <TextInput
                                    value={formData.link}
                                    onChangeText={(t) => setFormData(prev => ({ ...prev, link: t }))}
                                    placeholder="(Örn: Instagram, YouTube, X, kişisel site)"
                                    placeholderTextColor="#666"
                                    className={inputStyle}
                                    autoCapitalize="none"
                                    keyboardType="url"
                                />
                            </AccordionItem>

                        </View>
                    </ScrollView>
                )}

                {/* Save Button */}
                <View className="absolute bottom-8 left-5 right-5">
                    <TouchableOpacity
                        onPress={handleSave}
                        disabled={saving || loading}
                        className={`w-full py-4 rounded-[16px] flex-row items-center justify-center ${saving ? 'bg-emerald-800' : 'bg-[#1F3029] border border-white/20'}`}
                    >
                        {saving ? (
                            <ActivityIndicator color="white" size="small" />
                        ) : (
                            <Text className="text-white font-bold text-[16px]" style={{ fontFamily: 'Plus Jakarta Sans' }}>
                                Kaydet
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </ScreenBackground>
    );
}
