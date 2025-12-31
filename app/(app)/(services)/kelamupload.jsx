import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, TextInput, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { useUserStats } from '../../../contexts/UserStatsContext';
import KelamService from '../../../services/KelamService';
import { R2UploadService } from '../../../services/R2UploadService';
import { Video } from 'react-native-compressor';

export default function KelamUploadScreen() {
    const router = useRouter();
    const { user, profile } = useUserStats();

    const [title, setTitle] = useState('');
    const [videoUri, setVideoUri] = useState(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStep, setUploadStep] = useState(''); // 'compressing', 'uploading', ''

    const pickVideo = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['videos'],
            allowsEditing: true,
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
        try {
            const creatorId = profile?.id || user?.uid;

            if (!creatorId) {
                throw new Error('Kullanıcı kimliği bulunamadı.');
            }

            // 1. Video Sıkıştırma (720p Zorlama)
            setUploadStep('compressing');
            console.log('[Compressor] Sıkıştırma başlatılıyor...', videoUri);

            const compressedUri = await Video.compress(
                videoUri,
                {
                    compressionMethod: 'auto',
                    maxWidth: 720,
                    minimumBitrate: 1500000,
                    input: 'uri',
                },
                (progress) => {
                    console.log(`[Compressor] İlerleme: %${(progress * 100).toFixed(0)}`);
                }
            );

            console.log('[Compressor] Sıkıştırma bitti:', compressedUri);

            // 1.1 Önizleme Fotoğrafı (Thumbnail)
            setUploadStep('thumbnailing');
            console.log('[Compressor] Thumbnail oluşturuluyor...');
            let thumbnailUri = null;
            try {
                const thumbnailResult = await Video.getVideoThumbnail(videoUri, {
                    quality: 0.5,
                });
                thumbnailUri = thumbnailResult.path;
                console.log('[Compressor] Thumbnail oluşturuldu:', thumbnailUri);
            } catch (err) {
                console.error('[Compressor] Thumbnail hatası:', err);
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
                thumbUrl = await R2UploadService.uploadFile(thumbnailUri, thumbFileName, 'image/jpeg');
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
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Video Yükle</Text>
                <View style={{ width: 28 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                <TouchableOpacity
                    style={styles.pickerArea}
                    onPress={pickVideo}
                    disabled={isUploading}
                >
                    {videoUri ? (
                        <View style={styles.selectedVideoInfo}>
                            <Ionicons name="videocam" size={48} color="#D4AF37" />
                            <Text style={styles.videoUriText} numberOfLines={1}>{videoUri.split('/').pop()}</Text>
                            <Text style={styles.changeText}>Videoyu Değiştir</Text>
                        </View>
                    ) : (
                        <>
                            <Ionicons name="cloud-upload-outline" size={64} color="rgba(255,255,255,0.3)" />
                            <Text style={styles.pickerText}>Video Seçmek İçin Dokun</Text>
                            <Text style={styles.limitText}>Max 60 saniye, 720p önerilir.</Text>
                        </>
                    )}
                </TouchableOpacity>

                <View style={styles.inputGroup}>
                    <Text style={styles.inputLabel}>Başlık</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Videonuz için etkileyici bir başlık..."
                        placeholderTextColor="rgba(255,255,255,0.3)"
                        value={title}
                        onChangeText={setTitle}
                        multiline
                        maxLength={100}
                    />
                </View>

                <TouchableOpacity
                    style={[styles.uploadButton, (!videoUri || !title) && styles.disabledButton]}
                    onPress={handleUpload}
                    disabled={isUploading || !videoUri || !title}
                >
                    {isUploading ? (
                        <View style={styles.loadingRow}>
                            <ActivityIndicator color="#04100D" size="small" />
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
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#04100D',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 60,
    },
    headerTitle: {
        fontFamily: 'Plus Jakarta Sans',
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
    },
    backButton: {
        padding: 5,
    },
    content: {
        padding: 20,
    },
    pickerArea: {
        width: '100%',
        aspectRatio: 9 / 12,
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'rgba(255,255,255,0.1)',
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 24,
    },
    pickerText: {
        fontFamily: 'Plus Jakarta Sans',
        color: '#FFFFFF',
        fontSize: 16,
        marginTop: 12,
    },
    limitText: {
        fontFamily: 'Plus Jakarta Sans',
        color: 'rgba(255,255,255,0.3)',
        fontSize: 12,
        marginTop: 4,
    },
    selectedVideoInfo: {
        alignItems: 'center',
    },
    videoUriText: {
        fontFamily: 'Plus Jakarta Sans',
        color: '#D4AF37',
        fontSize: 14,
        marginTop: 10,
        width: 200,
        textAlign: 'center',
    },
    changeText: {
        fontFamily: 'Plus Jakarta Sans',
        color: 'rgba(255,255,255,0.5)',
        fontSize: 12,
        marginTop: 8,
        textDecorationLine: 'underline',
    },
    inputGroup: {
        marginBottom: 32,
    },
    inputLabel: {
        fontFamily: 'Plus Jakarta Sans',
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
        marginBottom: 8,
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        borderRadius: 10,
        padding: 15,
        color: '#FFFFFF',
        fontFamily: 'Plus Jakarta Sans',
        fontSize: 16,
        textAlignVertical: 'top',
        minHeight: 80,
    },
    uploadButton: {
        backgroundColor: '#D4AF37',
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#D4AF37',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    disabledButton: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        shadowOpacity: 0,
        elevation: 0,
    },
    uploadButtonText: {
        fontFamily: 'Plus Jakarta Sans',
        color: '#04100D',
        fontSize: 16,
        fontWeight: 'bold',
    },
    loadingRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
});
