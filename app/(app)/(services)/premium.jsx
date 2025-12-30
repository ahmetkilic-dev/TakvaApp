import React, { useState, useMemo, useCallback } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

// Premium icon section uses this
const PremiumIcon = require('../../../assets/hizmetler/hoca.png');

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';
const horizontalPadding = 20;

// Data for Tabs
const Tiers = {
  PLUS: 'plus',
  PREMIUM: 'premium',
};

// Features Data (Moved outside component to prevent recreation)
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
    { id: 'badges_prem', title: 'Büyük Hedefler (Elit Rozetler)', description: 'Hatim ve sabah namazı serileri gibi özel hedeflerle şevkiniz hep canlı kalsın.' },
    { id: 'tracking', title: 'Hatim Yolculuğunuz (Detaylı Takip)', description: 'Hatimlerinizi, cüzlerinizi ve ilerlemenizi sizin yerinize biz takip edelim.' },
    { id: 'ilim_prem', title: 'Engelsiz İlim (Sınırsız Can)', description: 'Can derdi olmadan, özgürce yarışın. Öğrenmenin önünde sınır olmasın.' },
    { id: 'analysis', title: 'Büyük Resim (Yıllık Analiz)', description: 'Geçmişten bugüne manevi yolculuğunuzu ve gelişiminizi bir bakışta görün.' },
  ],
};

// Plans Data
const plansData = {
  [Tiers.PLUS]: [
    { id: 'annual', title: 'Yıllık Plan', price: '₺24,99', period: '/ ay', billing: '₺299,88 / yıl olarak faturalandırılır', topLabel: 'Avantajlı plan', bottomLabel: 'İlk kullanıcılarına özel' },
    { id: 'monthly', title: 'Aylık Plan', price: '₺29,99', period: '/ ay', description: 'İstediğin zaman iptal edebilirsin.', topLabel: 'Esnek kullanım' },
  ],
  [Tiers.PREMIUM]: [
    { id: 'annual', title: 'Yıllık Plan', price: '₺74,99', period: '/ ay', billing: '₺899,88 / yıl olarak faturalandırılır', topLabel: 'Avantajlı plan', bottomLabel: 'İlk kullanıcılarına özel' },
    { id: 'monthly', title: 'Aylık Plan', price: '₺79,99', period: '/ ay', description: 'İstediğin zaman iptal edebilirsin.', topLabel: 'Esnek kullanım' },
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

const PlanList = React.memo(({ plans, selectedPlan, onSelectPlan, activeTier }) => (
  <View style={{ marginBottom: 24, alignItems: 'center' }}>
    {plans.map((plan) => {
      const maxWidth = 350;
      const boxWidth = Math.min(SCREEN_WIDTH - horizontalPadding * 2, maxWidth);
      const isSelected = selectedPlan === plan.id;
      const isAnnual = plan.id === 'annual';

      return (
        <TouchableOpacity
          key={plan.id}
          onPress={() => onSelectPlan(plan.id)}
          activeOpacity={0.8}
          style={{ marginBottom: 16, width: boxWidth, position: 'relative' }}
        >
          <LinearGradient
            colors={['#0A2345', '#0C2F3B', '#0E3537', '#0F3B32']}
            start={{ x: 1, y: 0 }}
            end={{ x: 0, y: 0 }}
            style={{
              width: '100%', minHeight: 107, borderRadius: 12, borderWidth: 0.5,
              borderColor: isSelected ? (activeTier === Tiers.PREMIUM ? 'rgba(233, 204, 136, 0.5)' : '#FFFFFF') : 'rgba(255, 255, 255, 0.2)',
              padding: 16, paddingTop: plan.topLabel ? 0 : 16, position: 'relative',
            }}
          >
            {plan.topLabel && (
              <View style={{
                alignSelf: 'center', width: 120, height: 22,
                backgroundColor: activeTier === Tiers.PREMIUM ? 'rgba(207, 155, 71, 0.35)' : 'rgba(255, 255, 255, 0.2)',
                borderRightWidth: 0.5, borderBottomWidth: 0.5, borderLeftWidth: 0.5,
                borderRightColor: activeTier === Tiers.PREMIUM ? 'rgba(207, 155, 71, 0.5)' : 'rgba(255,255,255,0.3)',
                borderBottomColor: activeTier === Tiers.PREMIUM ? 'rgba(207, 155, 71, 0.5)' : 'rgba(255,255,255,0.3)',
                borderLeftColor: activeTier === Tiers.PREMIUM ? 'rgba(207, 155, 71, 0.5)' : 'rgba(255,255,255,0.3)',
                borderBottomRightRadius: 50, borderBottomLeftRadius: 50, alignItems: 'center', justifyContent: 'center',
              }}>
                <Text style={{ fontFamily, fontSize: 12, fontWeight: '300', color: 'rgba(255, 255, 255, 0.9)', textAlign: 'center' }}>
                  {plan.topLabel}
                </Text>
              </View>
            )}

            <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <View style={{ flex: 1, marginRight: 12 }}>
                <Text style={{ fontFamily, fontSize: 20, fontWeight: '700', color: '#FFFFFF', marginBottom: 8 }}>
                  {plan.title}
                </Text>
                <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 }}>
                  <Text style={{ fontFamily, fontSize: 14, fontWeight: '300', color: '#FFFFFF' }}>{plan.price}</Text>
                  <Text style={{ fontFamily, fontSize: 14, fontWeight: '300', color: 'rgba(255, 255, 255, 0.8)' }}>{plan.period}</Text>
                </View>
                {plan.billing && <Text style={{ fontFamily, fontSize: 14, fontWeight: '300', color: activeTier === Tiers.PREMIUM ? '#CF9B47' : '#B0B0B0', marginBottom: 8 }}>{plan.billing}</Text>}
                {plan.description && <Text style={{ fontFamily, fontSize: 14, fontWeight: '300', color: 'rgba(255, 255, 255, 0.8)', marginBottom: 8 }}>{plan.description}</Text>}
              </View>
              <View style={{ width: 24, height: 24, borderRadius: 12, borderWidth: 1, borderColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                {isSelected && <View style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: '#FFFFFF' }} />}
              </View>
            </View>

            {isAnnual && (
              <Image source={require('../../../assets/images/bg-intro-icon.png')} style={{ position: 'absolute', bottom: 0, left: 0, width: 77.35, height: 77.55, opacity: 0.07, transform: [{ rotate: '19.86deg' }], shadowColor: '#FFFFFF', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 10, elevation: 10 }} resizeMode="contain" />
            )}

            {plan.bottomLabel && (
              <View style={{ position: 'absolute', bottom: 0, right: 0, backgroundColor: 'rgba(255, 255, 255, 0.2)', paddingHorizontal: 12, paddingVertical: 4, height: 22, borderTopLeftRadius: 13, borderBottomRightRadius: 11, borderTopRightRadius: 11, borderBottomLeftRadius: 11, borderWidth: 0.5, borderColor: 'rgba(255, 255, 255, 0.5)' }}>
                <Text style={{ fontFamily, fontSize: 12, fontWeight: '300', color: 'rgba(255, 255, 255, 0.9)', textAlign: 'center' }}>{plan.bottomLabel}</Text>
              </View>
            )}
          </LinearGradient>
        </TouchableOpacity>
      );
    })}
  </View>
));

export default function PremiumScreen() {
  const router = useRouter();
  const [activeTier, setActiveTier] = useState(Tiers.PREMIUM);
  const [selectedPlan, setSelectedPlan] = useState('monthly');

  const currentPlans = useMemo(() => plansData[activeTier], [activeTier]);
  const currentFeatures = useMemo(() => featuresData[activeTier], [activeTier]);

  return (
    <ScreenBackground>
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-2 pb-2">
          <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 items-center justify-center">
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Cinzel-Black', color: activeTier === Tiers.PREMIUM ? '#CF9B47' : '#FFFFFF', fontSize: 24, textAlign: 'center', letterSpacing: -1, textShadowColor: 'rgba(255, 255, 255, 0.25)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 10 }}>
            {activeTier === Tiers.PREMIUM ? 'TAKVA PREMIUM' : 'TAKVA PLUS'}
          </Text>
          <View className="w-9" />
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: horizontalPadding, paddingTop: 16, paddingBottom: 40 }}>
          {/* Tab Switcher */}
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <View style={{ width: Math.min(360, SCREEN_WIDTH - 32), height: 46, borderRadius: 23, backgroundColor: 'rgba(217, 217, 217, 0.2)', borderWidth: 0.5, borderColor: 'rgba(255, 255, 255, 0.5)', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 4 }}>
              <TouchableOpacity onPress={() => setActiveTier(Tiers.PLUS)} style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: activeTier === Tiers.PLUS ? '#182723' : 'transparent', marginRight: 4 }}>
                <Text style={{ fontFamily: 'Cinzel-Bold', color: '#E2E8F0', fontSize: 16, opacity: activeTier === Tiers.PLUS ? 1 : 0.6 }}>TAKVA PLUS</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveTier(Tiers.PREMIUM)} style={{ flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center', borderRadius: 20, backgroundColor: activeTier === Tiers.PREMIUM ? '#182723' : 'transparent' }}>
                <Text style={{ fontFamily: 'Cinzel-Bold', color: '#CF9B47', fontSize: 16, opacity: activeTier === Tiers.PREMIUM ? 1 : 0.6 }}>TAKVA PREMIUM</Text>
              </TouchableOpacity>
            </View>
          </View>

          <FeatureList features={currentFeatures} activeTier={activeTier} />

          <PlanList plans={currentPlans} selectedPlan={selectedPlan} onSelectPlan={setSelectedPlan} activeTier={activeTier} />

          <Text style={{ fontFamily, fontSize: 14, fontWeight: '300', color: 'rgba(255, 255, 255, 0.8)', textAlign: 'center', marginBottom: 24, lineHeight: 20 }}>
            Ödemeler App Store / Google Play üzerinden yapılır.{'\n'}
            Abonelikler mağaza şartlarına tabidir.
          </Text>

          {/* Call to Action Button */}
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <TouchableOpacity activeOpacity={0.8} style={{ width: Math.min(350, SCREEN_WIDTH - horizontalPadding * 2), height: 50, borderRadius: 12, borderWidth: 0.5, borderColor: activeTier === Tiers.PREMIUM ? 'rgba(207, 155, 71, 0.5)' : 'rgba(255,255,255,0.3)', backgroundColor: '#0D303A', alignItems: 'center', justifyContent: 'center' }}>
              <MaskedView style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }} maskElement={<View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}><Text style={{ fontFamily, fontSize: 18, fontWeight: '700', lineHeight: 18, textAlign: 'center', color: '#FFFFFF' }}>{activeTier === Tiers.PREMIUM ? "Takva Premium'a Geç" : "Takva Plus'a Geç"}</Text></View>}>
                <LinearGradient colors={activeTier === Tiers.PREMIUM ? ['#E9CC88', '#CF9B47'] : ['#FFFFFF', '#E0E0E0']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: '100%', height: '100%' }} />
              </MaskedView>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}
