
import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, LayoutAnimation, Platform, UIManager, ActivityIndicator, Alert, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';
import { useUserStats } from '../../../contexts/UserStatsContext';
import { KelamService } from '../../../services/KelamService';

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
                className="flex-row items-start justify-between"
            >
                <View className="flex-1 pr-4">
                    <Text className="text-white text-[16px] font-medium" style={{ fontFamily: 'Plus Jakarta Sans' }}>{label}</Text>
                    {description && (
                        <Text className="text-white/60 text-[12px] mt-0.5" style={{ fontFamily: 'Plus Jakarta Sans' }}>{description}</Text>
                    )}
                </View>
                <Ionicons
                    name={isOpen ? "chevron-up" : "chevron-down"}
                    size={20}
                    color="white"
                    style={{ marginTop: 2 }}
                />
            </TouchableOpacity>

            {isOpen && (
                <View className="mt-4">
                    {children}
                </View>
            )}

            {showBorder && <View className="h-[1px] bg-white/10 mt-4 w-full" />}
        </View>
    );
};


const StatRow = ({ label, value }) => (
    <View className="flex-row justify-between items-center py-2 border-b border-white/10 border-dashed">
        <Text className="text-white/60 text-[13px] flex-1 mr-4" style={{ fontFamily: 'Plus Jakarta Sans' }}>{label}</Text>
        <Text className="text-white text-[15px] font-medium" style={{ fontFamily: 'Plus Jakarta Sans' }}>{value}</Text>
    </View>
);

export default function CreatorStatsScreen() {
    const router = useRouter();
    const { profile, user } = useUserStats();
    const [openSections, setOpenSections] = useState({ 'videos': true }); // Videolarım başta açık gelsin
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadVideos = useCallback(async () => {
        const creatorId = profile?.id || user?.uid;
        if (!creatorId) return;

        setLoading(true);
        try {
            console.log('CreatorStats: Loading videos for:', creatorId);
            const data = await KelamService.fetchCreatorVideos(creatorId);
            setVideos(data);
        } catch (error) {
            console.error('Load videos error:', error);
        } finally {
            setLoading(false);
        }
    }, [profile?.id, user?.uid]);

    useEffect(() => {
        loadVideos();
    }, [loadVideos]);

    const handleDeleteVideo = async (video) => {
        Alert.alert(
            'Videoyu Sil',
            `"${video.title}" başlıklı videoyu silmek istediğine emin misin?`,
            [
                { text: 'Vazgeç', style: 'cancel' },
                {
                    text: 'Sil',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await KelamService.deleteVideo(video.id, video.video_url);
                            Alert.alert('Başarılı', 'Video silindi.');
                            loadVideos(); // Listeyi yenile
                        } catch (error) {
                            Alert.alert('Hata', 'Video silinirken bir sorun oluştu.');
                        }
                    }
                }
            ]
        );
    };

    const toggleSection = (section) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

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

                {/* Content */}
                <View className="items-center mt-4 mb-6">
                    <Text style={{ fontFamily: 'Plus Jakarta Sans', color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginBottom: 4 }}>Genel Performans</Text>
                    <Text style={{ fontFamily: 'Plus Jakarta Sans', color: 'rgba(255,255,255,0.6)', fontSize: 10, fontWeight: '400' }}>İçeriklerinin bugüne kadarki toplam performansı.</Text>
                </View>

                <ScrollView
                    className="flex-1 px-5 pt-6"
                    contentContainerStyle={{ flexGrow: 1 }}
                    showsVerticalScrollIndicator={false}
                    bounces={false}
                    overScrollMode="never"
                >
                    <View className="flex-1 rounded-t-[20px] p-5 pt-7 pb-32" style={{ backgroundColor: 'rgba(24, 39, 35, 0.9)' }}>

                        {/* Videolarım (Yeni Bölüm) */}
                        <AccordionItem
                            label="Videolarımı Yönet"
                            description={`${videos.length} adet paylaşılan içerik.`}
                            isOpen={!!openSections['videos']}
                            onPress={() => toggleSection('videos')}
                        >
                            {loading ? (
                                <ActivityIndicator color="#FFFFFF" className="my-4" />
                            ) : videos.length > 0 ? (
                                <View className="flex-row flex-wrap justify-between">
                                    {videos.map((video) => (
                                        <View key={video.id} className="w-[48%] mb-4 rounded-xl overflow-hidden bg-white/5 border border-white/10">
                                            <View className="aspect-square bg-black/40 items-center justify-center">
                                                {video.thumbnail_url ? (
                                                    <Image
                                                        source={{ uri: video.thumbnail_url }}
                                                        style={{ width: '100%', height: '100%' }}
                                                        resizeMode="cover"
                                                    />
                                                ) : (
                                                    <Ionicons name="play-circle" size={40} color="white" />
                                                )}
                                            </View>
                                            <View className="p-2">
                                                <Text numberOfLines={1} className="text-white text-[12px] font-medium mb-2">{video.title}</Text>
                                                <View className="flex-row items-center justify-between">
                                                    <View className="flex-row items-center">
                                                        <Ionicons name="eye-outline" size={12} color="rgba(255,255,255,0.6)" />
                                                        <Text className="text-white/60 text-[10px] ml-1">{video.views_count}</Text>
                                                    </View>
                                                    <TouchableOpacity
                                                        onPress={() => handleDeleteVideo(video)}
                                                        className="bg-red-500/20 p-1.5 rounded-full"
                                                    >
                                                        <Ionicons name="trash-outline" size={14} color="#EF4444" />
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        </View>
                                    ))}
                                </View>
                            ) : (
                                <View className="items-center py-6">
                                    <Text className="text-white/40 italic">Henüz video paylaşmadın.</Text>
                                </View>
                            )}
                        </AccordionItem>

                        {/* İçerik Sayısı */}
                        <AccordionItem
                            label="İçerik sayısı"
                            description="Paylaştığın tüm içeriklerin toplamı."
                            isOpen={!!openSections['content']}
                            onPress={() => toggleSection('content')}
                        >
                            <StatRow label="Son 1 haftalık toplam." value="0" />
                            <StatRow label="Son 1 aylık toplam." value="0" />
                            <StatRow label="Son 6 aylık toplam." value="0" />
                            <StatRow label="Son 1 yıllık toplam." value="0" />
                        </AccordionItem>

                        {/* Toplam Görüntülenme */}
                        <AccordionItem
                            label="Toplam görüntülenme"
                            description="İçeriklerinin toplam görüntülenme sayısı."
                            isOpen={!!openSections['views']}
                            onPress={() => toggleSection('views')}
                        >
                            <StatRow label="Son 1 haftalık toplam." value="0" />
                            <StatRow label="Son 1 aylık toplam." value="0" />
                            <StatRow label="Son 6 aylık toplam." value="0" />
                            <StatRow label="Son 1 yıllık toplam." value="0" />
                        </AccordionItem>

                        {/* Toplam Beğeni */}
                        <AccordionItem
                            label="Toplam beğeni"
                            description="İçeriklerine gelen toplam beğeni."
                            isOpen={!!openSections['likes']}
                            onPress={() => toggleSection('likes')}
                        >
                            <StatRow label="Son 1 haftalık toplam." value="0" />
                            <StatRow label="Son 1 aylık toplam." value="0" />
                            <StatRow label="Son 6 aylık toplam." value="0" />
                            <StatRow label="Son 1 yıllık toplam." value="0" />
                        </AccordionItem>

                        {/* Toplam Paylaşım */}
                        <AccordionItem
                            label="Toplam paylaşım"
                            description="İçeriklerinin paylaşılma sayısı."
                            isOpen={!!openSections['shares']}
                            onPress={() => toggleSection('shares')}
                            showBorder={false}
                        >
                            <StatRow label="Son 1 haftalık toplam." value="0" />
                            <StatRow label="Son 1 aylık toplam." value="0" />
                            <StatRow label="Son 6 aylık toplam." value="0" />
                            <StatRow label="Son 1 yıllık toplam." value="0" />
                        </AccordionItem>

                    </View>
                </ScrollView>

            </SafeAreaView>
        </ScreenBackground>
    );
}
