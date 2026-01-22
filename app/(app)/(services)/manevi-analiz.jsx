import React from 'react';
import { View, Text, ScrollView, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import ScreenBackground from '../../../components/common/ScreenBackground';
import { useUserStats } from '../../../contexts/UserStatsContext';
import { Image } from 'expo-image';
import { useManeviAnaliz } from '../../../components/profile/hooks/useManeviAnaliz';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const horizontalPadding = 20;
const gap = 12;
const itemWidth = (SCREEN_WIDTH - (horizontalPadding * 2) - (gap * 2)) / 3;

const fontFamily = 'Plus Jakarta Sans';
// Reusable Metric Card
const MetricCard = ({ title, value, variant = 'default' }) => {
    // default: user provided specs, gold: brownish gold for yearly
    const bgStyle = variant === 'gold'
        ? { backgroundColor: '#CF9B4759', borderColor: '#85858580' }
        : { backgroundColor: '#D9D9D94D', borderColor: '#85858580' };

    return (
        <View style={{
            width: itemWidth,
            height: 65,
            borderRadius: 18,
            borderWidth: 0.5,
            ...bgStyle,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: gap
        }}>
            <Text style={{
                fontFamily,
                fontSize: 11,
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: 4
            }}>
                {title}
            </Text>
            <Text style={{
                fontFamily,
                fontSize: 18,
                fontWeight: '700',
                color: '#FFFFFF'
            }}>
                {value}
            </Text>
        </View>
    );
};

// Reusable Section
const AnalysisSection = ({ title, data, variant = 'default' }) => {
    const metrics = [
        { key: 'ayet', label: 'Ayet' },
        { key: 'namaz', label: 'Namaz' },
        { key: 'zikir', label: 'Zikir' },
        { key: 'salavat', label: 'Salavat' },
        { key: 'ilim', label: 'İlim' },
        { key: 'gorev', label: 'Görev' },
    ];

    return (
        <View style={{ marginBottom: 24 }}>
            <Text style={{
                fontFamily,
                fontSize: 16,
                fontWeight: '600',
                color: '#FFFFFF',
                marginBottom: 12
            }}>
                {title}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {metrics.map((m) => (
                    <MetricCard
                        key={m.key}
                        title={m.label}
                        value={data[m.key]}
                        variant={variant}
                    />
                ))}
            </View>
        </View>
    );
};

// Locked Metric Card
const LockedMetricCard = ({ required }) => {
    const router = useRouter();
    const bgStyle = required === 'plus'
        ? { backgroundColor: '#FFFFFF33', borderColor: '#85858580' } // #FFFFFF33 is ~20% white
        : { backgroundColor: '#CF9B4759', borderColor: '#85858580' }; // Goldish

    const label = required === 'plus' ? 'Plus' : 'Premium';

    return (
        <TouchableOpacity
            onPress={() => router.push('/(app)/(services)/premium')}
            style={{
                width: itemWidth,
                height: 65,
                borderRadius: 18,
                borderWidth: 0.5,
                ...bgStyle,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: gap
            }}
        >
            <Ionicons name="lock-closed-outline" size={20} color="rgba(255,255,255,0.8)" style={{ marginBottom: 2 }} />
            <Text style={{
                fontFamily,
                fontSize: 16,
                fontWeight: '400',
                color: '#FFFFFF'
            }}>
                {label}
            </Text>
        </TouchableOpacity>
    );
};

// Locked Section Component
const LockedAnalysisSection = ({ title, required }) => {
    // Render 6 locked cards to mimic the grid
    const placeholders = Array(6).fill(0);

    return (
        <View style={{ marginBottom: 24 }}>
            <Text style={{
                fontFamily,
                fontSize: 16,
                fontWeight: '600',
                color: '#FFFFFF',
                marginBottom: 12
            }}>
                {title}
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
                {placeholders.map((_, i) => (
                    <LockedMetricCard key={i} required={required} />
                ))}
            </View>
        </View>
    );
};

const Divider = () => (
    <View style={{ width: 350, height: 0.5, backgroundColor: '#D9D9D980', alignSelf: 'center', marginBottom: 24 }} />
);

export default function ManeviAnalizScreen() {
    const router = useRouter();
    const { stats, loading } = useManeviAnaliz();
    const { isPlusOrAbove, isPremium } = useUserStats();

    const canSeePlus = isPlusOrAbove();
    const canSeePremium = isPremium();

    if (loading) {
        return (
            <ScreenBackground>
                <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size="large" color="#FFFFFF" />
                </SafeAreaView>
            </ScreenBackground>
        );
    }

    return (
        <ScreenBackground>
            <SafeAreaView edges={['top']} style={{ flex: 1 }}>
                {/* Header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 }}>
                    <TouchableOpacity onPress={() => router.back()} style={{ width: 40 }}>
                        <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={{
                        fontFamily: 'Cinzel-Black',
                        fontSize: 24,
                        color: '#FFFFFF',
                        letterSpacing: -0.48,
                        textAlign: 'center',
                        textShadowColor: 'rgba(255, 255, 255, 0.4)',
                        textShadowOffset: { width: 0, height: 2 },
                        textShadowRadius: 10
                    }}>
                        TAKVA ANALİZ
                    </Text>
                    <View style={{ width: 40, alignItems: 'center' }}>
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={{ paddingHorizontal: horizontalPadding, paddingBottom: 40 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Sub-header / Description */}
                    <View style={{ alignItems: 'center', marginTop: 10, marginBottom: 30 }}>
                        <Text style={{
                            fontFamily,
                            fontSize: 16,
                            fontWeight: '700',
                            lineHeight: 16,
                            color: '#FFFFFF',
                            textAlign: 'center',
                            marginBottom: 4
                        }}>
                            Manevi Tekâmül Karnesi
                        </Text>
                        <Text style={{
                            fontFamily,
                            fontSize: 10,
                            fontWeight: '400',
                            lineHeight: 10,
                            color: '#FFFFFF99',
                            textAlign: 'center',
                            width: 256,
                            alignSelf: 'center'
                        }}>
                            İbadetlerindeki sürekliliği, ilim yolundaki ilerlemeni ve zikir disiplinini tek bir noktadan takip et.
                        </Text>
                    </View>

                    {/* Günlük - Always Visible */}
                    <AnalysisSection title="Günlük İbadet Özeti" data={stats.daily} />

                    <Divider />

                    {/* Haftalık - Plus Required */}
                    {canSeePlus ? (
                        <AnalysisSection title="Haftalık Disiplin Çizelgesi" data={stats.weekly} />
                    ) : (
                        <LockedAnalysisSection title="Haftalık Disiplin Çizelgesi" required="plus" />
                    )}

                    <Divider />

                    {/* Aylık - Plus Required */}
                    {canSeePlus ? (
                        <AnalysisSection title="Aylık Gelişim Raporu" data={stats.monthly} />
                    ) : (
                        <LockedAnalysisSection title="Aylık Gelişim Raporu" required="plus" />
                    )}

                    <Divider />

                    {/* Yıllık - Premium Required */}
                    {canSeePremium ? (
                        <AnalysisSection title="Yıllık Kümülatif Analiz" data={stats.yearly} variant="gold" />
                    ) : (
                        <LockedAnalysisSection title="Yıllık Kümülatif Analiz" required="premium" />
                    )}

                </ScrollView>
            </SafeAreaView>
        </ScreenBackground>
    );
}
