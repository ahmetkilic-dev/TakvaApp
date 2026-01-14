import React, { useMemo } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image, Linking, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';
import { useUserStats } from '../../../contexts/UserStatsContext';
import { Tiers } from '../../../contexts/IAPContext';

const PremiumIcon = require('../../../assets/hizmetler/hoca.png');
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';
const horizontalPadding = 20;

// Features Data (Premium.jsx ile aynı)
const featuresData = {
    [Tiers.PLUS]: [
        { id: 'adfree', title: 'Sadece Huzur (Reklamsız)', description: 'Araya giren reklamlar dikkatinizi dağıtmasın, ibadetin tadı kaçmasın.', icon: 'shield-outline' },
        { id: 'hocaai', title: 'Yol Arkadaşınız (Hoca AI)', description: 'Aklınıza takılan her soruda Hoca AI yanınızda, içiniz rahat olsun.', icon: 'people-outline' },
        { id: 'badges', title: 'Size Özel Görevler (Rozetler)', description: 'Rutinlerinize renk katacak haftalık görevleriniz hazır, motivasyonunuz taze kalsın.', icon: 'ribbon-outline' },
        { id: 'bookmark', title: 'Sayfanız Bizde (Kuran Ayraç)', description: 'Kuran okurken \'Nerede kalmıştım?\' derdi bitiyor, sayfanızı sizin için tutuyoruz.', icon: 'bookmark-outline' },
        { id: 'ilim', title: 'Yarı Yolda Kalmayın (İlim)', description: 'İlim yarışmasında cevaplarınız yanlış olsa bile ek haklarınızla öğrenmeye devam edin.', icon: 'school-outline' },
        { id: 'stats', title: 'Kendinizi Gözlemleyin (İstatistik)', description: 'Bu ay namaz ve zikirlerinizde nasıl bir yol katettiniz? Birlikte bakalım.', icon: 'pulse-outline' },
    ],
    [Tiers.PREMIUM]: [
        { id: 'adfree_prem', title: 'En Saf Deneyim (Reklamsız)', description: 'Uygulamayı hiçbir engel olmadan, en duru ve en akıcı haliyle yaşayın.' },
        { id: 'hocaai_prem', title: 'Sınırsız Rehberlik (Hoca AI)', description: 'Soru sınırı düşünmeden, dilediğiniz kadar sorun, ilmin derinliklerine inin.' },
        { id: 'badges_prem', title: 'Büyük Hedefler (Elit Rozetler)', description: 'Hatim ve sabah namazı serileri gibi özel hedeflerle şevkiniz hep canlı kalsın.', icon: 'ribbon-outline' },
        { id: 'tracking', title: 'Hatim Yolculuğunuz (Detaylı Takip)', description: 'Hatimlerinizi, cüzlerinizi ve ilerlemenizi sizin yerinize biz takip edelim.' },
        { id: 'ilim_prem', title: 'Engelsiz İlim (Sınırsız Can)', description: 'Can derdi olmadan, özgürce yarışın. Öğrenmenin önünde sınır olmasın.' },
        { id: 'analysis', title: 'Büyük Resim (Yıllık Analiz)', description: 'Geçmişten bugüne manevi yolculuğunuzu ve gelişiminizi bir bakışta görün.' },
    ],
};

const FeatureList = React.memo(({ features, activeTier }) => (
    <View style={{ marginBottom: 32 }}>
        <Text style={{ fontFamily, fontSize: 24, fontWeight: '700', color: '#FFFFFF', marginBottom: 24 }}>
            {activeTier === Tiers.PREMIUM ? 'Premium Özellikler' : 'Plus Özellikler'}
        </Text>
        {features.map((feature) => (
            <View key={feature.id} style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={{
                    width: 24, height: 24, borderRadius: 12, borderWidth: 0.5,
                    borderColor: 'rgba(255, 255, 255, 0.5)', backgroundColor: '#182723',
                    alignItems: 'center', justifyContent: 'center', marginRight: 12, marginTop: 2,
                }}>
                    <Image
                        source={PremiumIcon}
                        style={{ width: 10.5, height: 10.5, tintColor: activeTier === Tiers.PLUS ? '#FFFFFF' : '#CF9B47' }}
                        resizeMode="contain"
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontFamily, fontSize: 18, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 }}>
                        {feature.title}
                    </Text>
                    <Text style={{ fontFamily, fontSize: 14, fontWeight: '300', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 20 }}>
                        {feature.description}
                    </Text>
                </View>
            </View>
        ))}
    </View>
));

export default function AboneliklerimScreen() {
    const router = useRouter();
    const { subscription, refreshAll, user } = useUserStats();

    React.useEffect(() => {
        refreshAll();
    }, [user?.uid]);

    const handleManage = () => {
        const url = Platform.OS === 'ios'
            ? 'itms-apps://apps.apple.com/account/subscriptions'
            : `https://play.google.com/store/account/subscriptions?package=com.wezyapps.takvaapp`;
        Linking.openURL(url).catch(err => console.error("An error occurred", err));
    };

    const paymentInfo = useMemo(() => {
        const type = (subscription?.subscription_type || 'plus').toLowerCase();
        const plan = (subscription?.subscription_plan || 'monthly').toLowerCase();

        if (type === 'free') return null;

        let priceText = "Kayıtlı ödeme yönteminden bu tarihte tahsilat yapılacaktır.";
        if (type === 'plus') {
            priceText = plan === 'yearly'
                ? "Yıllık planın için toplam 299,99 ₺ (aylık 24,99 ₺'ye gelir) tahsil edilecektir."
                : "Kayıtlı ödeme yönteminden bu tarihte 29,99 ₺ tahsil edilecektir.";
        } else if (type === 'premium') {
            priceText = plan === 'yearly'
                ? "Yıllık planın için toplam 899,99 ₺ (aylık 74,99 ₺'ye gelir) tahsil edilecektir."
                : "Kayıtlı ödeme yönteminden bu tarihte 79,99 ₺ tahsil edilecektir.";
        }

        if (!subscription?.purchase_date) {
            return { dateStr: 'yakın bir', priceText };
        }

        try {
            const dateInput = subscription.purchase_date.replace(' ', 'T');
            const purchaseDate = new Date(dateInput);

            if (isNaN(purchaseDate.getTime())) {
                return { dateStr: 'yakın bir', priceText };
            }

            const renewalDate = new Date(purchaseDate);
            plan === 'yearly' ? renewalDate.setDate(renewalDate.getDate() + 365) : renewalDate.setDate(renewalDate.getDate() + 30);

            const d = String(renewalDate.getDate()).padStart(2, '0');
            const m = String(renewalDate.getMonth() + 1).padStart(2, '0');
            const y = renewalDate.getFullYear();
            const dateStr = `${d}.${m}.${y}`;

            return { dateStr, priceText };
        } catch (err) {
            return { dateStr: 'yakın bir', priceText };
        }
    }, [subscription]);

    const activeTier = subscription?.subscription_type === 'premium' ? Tiers.PREMIUM : Tiers.PLUS;
    const currentFeatures = featuresData[activeTier];

    return (
        <ScreenBackground>
            <SafeAreaView edges={['top']} className="flex-1">
                {/* Header */}
                <View className="flex-row items-center justify-between px-4 pt-2 pb-2">
                    <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 items-center justify-center">
                        <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={{ fontFamily: 'Cinzel-Black', color: '#FFFFFF', fontSize: 24, textAlign: 'center', letterSpacing: -1, textShadowColor: 'rgba(255, 255, 255, 0.25)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 10 }}>
                        ABONELİKLER
                    </Text>
                    <View className="w-9" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: horizontalPadding, paddingTop: 16, paddingBottom: 40 }}>
                    {/* Active Plan Box */}
                    <View style={{
                        width: '100%',
                        height: 64,
                        borderRadius: 18,
                        borderWidth: 0.5,
                        borderColor: 'rgba(255, 255, 255, 0.4)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        paddingHorizontal: 20,
                        marginBottom: 16
                    }}>
                        <Text style={{
                            fontFamily: 'Cinzel-Bold',
                            fontSize: 18,
                            color: activeTier === Tiers.PREMIUM ? '#CF9B47' : '#FFFFFF',
                            letterSpacing: 0.5
                        }}>
                            {activeTier === Tiers.PREMIUM ? 'TAKVA PREMIUM' : 'TAKVA PLUS'}
                        </Text>
                        <TouchableOpacity
                            onPress={handleManage}
                            style={{
                                paddingHorizontal: 16,
                                paddingVertical: 6,
                                borderRadius: 10,
                                borderWidth: 0.5,
                                borderColor: 'rgba(255, 255, 255, 0.4)',
                                backgroundColor: 'rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            <Text style={{ fontFamily, fontSize: 13, color: '#FFFFFF', fontWeight: '500' }}>Yönet</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Payment Info Box */}
                    <View style={{
                        width: '100%',
                        borderRadius: 18,
                        borderWidth: 0.5,
                        borderColor: 'rgba(255, 255, 255, 0.4)',
                        backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        padding: 20,
                        marginBottom: 40
                    }}>
                        <Text style={{
                            fontFamily,
                            fontSize: 20,
                            fontWeight: '700',
                            color: '#FFFFFF',
                            marginBottom: 8
                        }}>
                            Ödeme
                        </Text>
                        <View>
                            {paymentInfo ? (
                                <>
                                    <Text style={{ fontFamily, fontSize: 14, fontWeight: '300', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 20 }}>
                                        Aboneliğiniz <Text style={{ fontWeight: '700' }}>{paymentInfo.dateStr}</Text> tarihine kadar geçerlidir. {paymentInfo.priceText}
                                    </Text>

                                    {subscription?.original_transaction_id && (
                                        <Text style={{ fontFamily, fontSize: 12, fontWeight: '300', color: 'rgba(255, 255, 255, 0.5)', marginTop: 12 }}>
                                            Abonelik ID: {subscription.original_transaction_id}
                                        </Text>
                                    )}
                                </>
                            ) : (
                                <Text style={{ fontFamily, fontSize: 14, fontWeight: '300', color: '#CF9B47' }}>
                                    {subscription?.subscription_type === 'free' ? 'Aktif bir aboneliğiniz bulunmamaktadır.' : 'Abonelik bilgileriniz yükleniyor veya eksik (purchase_date yok)...'}
                                </Text>
                            )}
                        </View>
                    </View>

                    {/* Features List */}
                    <FeatureList features={currentFeatures} activeTier={activeTier} />

                    <Text style={{ fontFamily, fontSize: 12, fontWeight: '300', color: 'rgba(255, 255, 255, 0.4)', textAlign: 'center', marginTop: 12 }}>
                        Abonelikleriniz App Store / Google Play hesabınız üzerinden yönetilir. Takva hesabınızla ilişkilendirilmiş aboneliklerinizi buradan takip edebilirsiniz.
                    </Text>
                </ScrollView>
            </SafeAreaView>
        </ScreenBackground>
    );
}
