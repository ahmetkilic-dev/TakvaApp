import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, StatusBar } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import KelamService from '../../../../services/KelamService';
import { KelamFeed } from '../../../../components/kelam/KelamFeed';
import { useUserStats } from '../../../../contexts/UserStatsContext';
import { supabase } from '../../../../lib/supabase';

export default function KelamDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const { user } = useUserStats();

    const [video, setVideo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            fetchVideo();
        }
    }, [id]);

    const fetchVideo = async () => {
        try {
            setLoading(true);
            const data = await KelamService.getVideoById(id, user?.uid);
            if (data) {
                setVideo(data);
            } else {
                setError('Kelam bulunamadı veya silinmiş.');
            }
        } catch (err) {
            console.error('Kelam fetch error:', err);
            setError('Bir hata oluştu.');
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async (v) => {
        if (!user) return;
        // Tekil video olduğu için listeyi güncelleme basit
        const success = await KelamService.toggleLike(v.id, user.uid, v.isLiked);
        if (success) {
            setVideo(prev => ({
                ...prev,
                isLiked: !prev.isLiked,
                likes_count: prev.isLiked ? (prev.likes_count || 0) - 1 : (prev.likes_count || 0) + 1
            }));
        }
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator size="large" color="#D4AF37" />
                <Text style={styles.text}>Yükleniyor...</Text>
            </View>
        );
    }

    if (error || !video) {
        return (
            <View style={styles.centerContainer}>
                <Ionicons name="alert-circle-outline" size={50} color="rgba(255,255,255,0.5)" />
                <Text style={styles.text}>{error || 'Video bulunamadı'}</Text>
                <TouchableOpacity onPress={() => router.replace('/(app)/(tabs)/kelam')} style={styles.button}>
                    <Text style={styles.buttonText}>Akışa Dön</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

            {/* Back Button Overlay */}
            <SafeAreaView style={styles.backButtonContainer}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={30} color="white" />
                </TouchableOpacity>
            </SafeAreaView>

            <KelamFeed
                videos={[video]}
                onLike={handleLike}
                initialIndex={0}
            // Tekil video olduğu için refresh/load more gerekmez, ama loop için feed kullanıyoruz
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    centerContainer: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        marginTop: 10,
        fontFamily: 'Plus Jakarta Sans',
    },
    button: {
        marginTop: 20,
        backgroundColor: '#D4AF37',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 8,
    },
    buttonText: {
        color: '#000',
        fontWeight: 'bold',
    },
    backButtonContainer: {
        position: 'absolute',
        top: 0,
        left: 20,
        zIndex: 50,
    },
    backButton: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 20,
    }
});
