import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, TextInput, ScrollView, Platform, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system/legacy';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { useUserStats } from '../../../contexts/UserStatsContext';
import KelamService from '../../../services/KelamService';
import { R2UploadService } from '../../../services/R2UploadService';
import { Video as VideoCompressor } from 'react-native-compressor';
import ScreenBackground from '../../../components/common/ScreenBackground';
import { LinearGradient } from 'expo-linear-gradient';
import { rsW, rsH, rsF } from '../../../utils/responsive';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function KelamUploadScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { user, profile } = useUserStats();

    const [title, setTitle] = useState('');
    const [videoUri, setVideoUri] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStep, setUploadStep] = useState(''); // 'compressing', 'uploading', ''

    const pickVideo = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['videos'],
            allowsEditing: false, // Prevents OS from creating a massive temp copy
            quality: 1.0,
            videoMaxDuration: 60,
        });

        if (!result.canceled) {
            setVideoUri(result.assets[0].uri);
        }
    };

    const handleUpload = async () => {
        if (!videoUri || !title) {
            Alert.alert('Hata', 'Lütfen bir video seçin ve başlık yazın.');
            return;
        }

        setIsUploading(true);
        let compressedUri = null;
        let thumbnailUri = null;

        try {
            const creatorId = profile?.id || user?.uid;

            if (!creatorId) {
                throw new Error('Kullanıcı kimliği bulunamadı.');
            }

            // 1. Video Sıkıştırma (1080p Kalite İyileştirmesi)
            setUploadStep('compressing');
            console.log('[Compressor] Sıkıştırma başlatılıyor...', videoUri);

            // Manual Sıkıştırma: 1080p @ 8 Mbps (Yüksek Kalite)
            // 'auto' yerine 'manual' kullanarak kontrolü elimize alıyoruz.
            const compressionResult = await VideoCompressor.compress(
                videoUri,
                {
                    compressionMethod: 'manual',
                    bitrate: 8000000, // 8 Mbps (Sabit Yüksek Kalite)
                    maxSize: 1920, // 1080p (Full HD)
                    input: 'uri',
                },
                (progress) => {
                    console.log(`[Compressor] İlerleme: %${(progress * 100).toFixed(0)}`);
                }
            );

            // VideoCompressor bazen "file://" önekini unutabilir, kontrol edelim.
            compressedUri = compressionResult.startsWith('file://') ? compressionResult : `file://${compressionResult}`;
            console.log('[Compressor] Sıkıştırma bitti:', compressedUri);

            // 1.1 Kapak Fotoğrafı (Thumbnail) - JPEG Formatında
            setUploadStep('thumbnailing');
            console.log('[Thumbnail] Oluşturuluyor...');

            try {
                // JPEG formatını zorluyoruz
                const { uri } = await VideoThumbnails.getThumbnailAsync(compressedUri, { // Sıkıştırılmış videodan alalım
                    quality: 0.8,
                });
                thumbnailUri = uri;
                console.log('[Thumbnail] Oluşturuldu:', thumbnailUri);
            } catch (err) {
                console.error('[Thumbnail] Hatası:', err);
                // Eğer sıkıştırılmıştan hata alırsak orijinalden deneyelim
                try {
                    const { uri } = await VideoThumbnails.getThumbnailAsync(videoUri, { quality: 0.8 });
                    thumbnailUri = uri;
                } catch (retryErr) {
                    console.error('[Thumbnail] Retry Hatası:', retryErr);
                }
            }

            // 2. Yükleme (Video + Thumbnail)
            setUploadStep('uploading');
            const timestamp = Date.now();
            const videoFileName = `kelam_${timestamp}.mp4`;
            const thumbFileName = `kelam_${timestamp}.jpg`;

            // Videoyu yükle
            const videoUrl = await R2UploadService.uploadFile(compressedUri, videoFileName, 'video/mp4');

            // Thumbnail yükle (Varsa)
            let thumbUrl = null;
            if (thumbnailUri) {
                try {
                    thumbUrl = await R2UploadService.uploadFile(thumbnailUri, thumbFileName, 'image/jpeg');
                } catch (e) {
                    console.error('Thumbnail upload keyfi hata:', e);
                }
            }

            // 3. Metadata Kaydı (Thumbnail URL eklendi)
            await KelamService.saveVideoMetadata({
                creator_id: creatorId,
                video_url: videoUrl,
                thumbnail_url: thumbUrl,
                title: title,
                views_count: 0,
                likes_count: 0,
                created_at: new Date().toISOString(),
            });

            Alert.alert('Başarılı', 'Videonuz yüklendi!', [{ text: 'Tamam', onPress: () => router.back() }]);
        } catch (error) {
            console.error('Upload error:', error);
            Alert.alert('Hata', 'Yükleme sırasında bir sorun oluştu.');
        } finally {
            setIsUploading(false);
            setUploadStep('');

            // 4. CLEANUP: AGGRESSIVE + TRUNCATE FALLBACK
            // Dosyalar tmp klasöründe kilitli kalırsa, içlerini boşaltarak (0 byte) yer açıyoruz.

            // Sıkıştırılmış Video Sil
            if (compressedUri) {
                try {
                    await FileSystem.deleteAsync(compressedUri, { idempotent: true });
                    console.log('[Cleanup] ✅ Sıkıştırılmış video silindi:', compressedUri);
                } catch (e) {
                    // Silmeye izin yoksa içini boşalt
                    console.warn('[Cleanup] Silinemedi, içi boşaltılıyor (Truncate)...');
                    try {
                        await FileSystem.writeAsStringAsync(compressedUri, '', { encoding: FileSystem.EncodingType.UTF8 });
                        console.log('[Cleanup] ✅ Dosya içeriği sıfırlandı (Alan açıldı).');
                    } catch (truncErr) {
                        console.error('[Cleanup] ❌ Truncate de başarısız:', truncErr.message);
                    }
                }
            }

            // Thumbnail Sil
            if (thumbnailUri) {
                try {
                    await FileSystem.deleteAsync(thumbnailUri, { idempotent: true });
                    console.log('[Cleanup] Thumbnail silindi:', thumbnailUri);
                } catch (e) {
                    console.warn('[Cleanup] Thumbnail silinemedi:', e.message);
                }
            }

            // Orijinal (Picker Cache) Video Sil
            if (videoUri && (videoUri.startsWith('file://') || videoUri.startsWith('/'))) {
                try {
                    await FileSystem.deleteAsync(videoUri, { idempotent: true });
                    console.log('[Cleanup] Video önbelleği silindi:', videoUri);
                } catch (e) {
                    console.warn('[Cleanup] Video önbelleği silinemedi:', e.message);
                }
            }
        }
    };

    return (
        <ScreenBackground>
            <View style={[styles.header, { paddingTop: Math.max(insets.top, 8) }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.headerSide}>
                    <Ionicons name="chevron-back" size={30} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.standardTitle}>KELÂM</Text>
                <View style={styles.headerSide} />
            </View>

            <ScrollView contentContainerStyle={styles.content} bounces={false}>
                <View style={styles.formContainer}>
                    {/* Left: Description Area */}
                    <View style={styles.textInputContainer}>
                        <LinearGradient
                            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0)']}
                            locations={[0.0002, 0.4723, 0.7996, 1.0]}
                            style={StyleSheet.absoluteFill}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Açıklama ekleyin..."
                            placeholderTextColor="rgba(255,255,255,0.3)"
                            value={title}
                            onChangeText={setTitle}
                            multiline
                            maxLength={500}
                        />
                    </View>

                    {/* Right: Picker Area */}
                    <TouchableOpacity
                        style={styles.pickerArea}
                        onPress={pickVideo}
                        disabled={isUploading}
                    >
                        <LinearGradient
                            colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0)']}
                            locations={[0.0002, 0.4723, 0.7996, 1.0]}
                            style={StyleSheet.absoluteFill}
                        />
                        {videoUri ? (
                            <View style={styles.selectedVideoInfo}>
                                <Ionicons name="videocam" size={36} color="#D4AF37" />
                                <Text style={styles.changeText}>Videonuz Seçildi</Text>
                                <Text style={styles.changeSubText}>Değiştir</Text>
                            </View>
                        ) : (
                            <View style={styles.pickerHint}>
                                <Ionicons name="share-outline" size={42} color="#FFFFFF" />
                                <Text style={styles.pickerText}>Video seçmek için dokun</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={[styles.uploadButton, (!videoUri || !title) && styles.disabledButton]}
                    onPress={handleUpload}
                    disabled={isUploading || !videoUri || !title}
                >
                    <LinearGradient
                        colors={['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0)']}
                        locations={[0.0002, 0.4723, 0.7996, 1.0]}
                        style={StyleSheet.absoluteFill}
                    />
                    {isUploading ? (
                        <View style={styles.loadingRow}>
                            <ActivityIndicator color="#FFFFFF" size="small" />
                            <Text style={styles.uploadButtonText}>
                                {uploadStep === 'compressing' ? 'Optimize Ediliyor...' :
                                    uploadStep === 'thumbnailing' ? 'Kapak Oluşturuluyor...' : 'Yükleniyor...'}
                            </Text>
                        </View>
                    ) : (
                        <Text style={styles.uploadButtonText}>Paylaş</Text>
                    )}
                </TouchableOpacity>
            </ScrollView>
        </ScreenBackground>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: rsW(10),
        zIndex: 100,
        height: 60 + rsH(10),
    },
    headerSide: {
        width: rsW(44),
        alignItems: 'center',
        justifyContent: 'center',
    },
    standardTitle: {
        fontFamily: 'Cinzel-Black',
        color: '#FFFFFF',
        fontSize: rsF(26),
        textAlign: 'center',
        letterSpacing: rsW(1),
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: rsW(20),
        paddingTop: rsH(30),
    },
    formContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: rsH(20),
    },
    textInputContainer: {
        flex: 2.5,
        height: rsH(178),
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'rgba(255,255,255,0.5)',
        marginRight: rsW(10),
        overflow: 'hidden',
    },
    input: {
        flex: 1,
        padding: 15,
        color: '#FFFFFF',
        fontFamily: 'PlusJakartaSans-Regular',
        fontSize: rsF(14),
        textAlignVertical: 'top',
    },
    pickerArea: {
        flex: 1,
        height: rsH(178),
        backgroundColor: 'rgba(255,255,255,0.02)',
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'rgba(255,255,255,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    pickerHint: {
        alignItems: 'center',
        paddingHorizontal: rsW(10),
    },
    pickerText: {
        fontFamily: 'PlusJakartaSans-Light',
        color: '#FFFFFF',
        fontSize: rsF(12),
        marginTop: 15,
        textAlign: 'center',
        letterSpacing: rsW(-12 * 0.02),
    },
    selectedVideoInfo: {
        alignItems: 'center',
    },
    changeText: {
        fontFamily: 'PlusJakartaSans-Bold',
        color: '#D4AF37',
        fontSize: rsF(12),
        marginTop: 10,
        textAlign: 'center',
    },
    changeSubText: {
        fontFamily: 'PlusJakartaSans-Regular',
        color: 'rgba(255,255,255,0.5)',
        fontSize: rsF(10),
        marginTop: 4,
        textDecorationLine: 'underline',
    },
    uploadButton: {
        width: '100%',
        height: rsH(48),
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'rgba(255,255,255,0.5)',
        backgroundColor: 'rgba(255,255,255,0.05)',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: rsH(10),
        overflow: 'hidden',
    },
    disabledButton: {
        opacity: 0.5,
    },
    uploadButtonText: {
        fontFamily: 'PlusJakartaSans-Light',
        color: '#FFFFFF',
        fontSize: rsF(18),
        letterSpacing: rsW(-18 * 0.02),
    },
    loadingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
});
