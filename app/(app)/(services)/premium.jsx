import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

// Premium icon
const PremiumIcon = require('../../../assets/hizmetler/hoca.png');

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

// Responsive calculations
const horizontalPadding = 20;

const premiumFeatures = [
  {
    id: 'hocaai',
    title: 'Sınırsız HocaAI',
    description: 'Dini sorularına daha kapsamlı, hızlı ve sınırsız yanıt al.',
  },
  {
    id: 'quran',
    title: 'Gelişmiş Kur\'an Okuyucu',
    description: 'Kaldığın yerden devam etme ve ilerleme takibi.',
  },
  {
    id: 'badges',
    title: 'Özel Görevler & Rozetler',
    description: 'Sadece Premium kullanıcıların açabildiği özel rozetler.',
  },
  {
    id: 'adfree',
    title: 'Reklamsız Kullanım',
    description: 'İbadet ve öğrenme sürecinde sıfır dikkat dağıtıcı.',
  },
  {
    id: 'knowledge',
    title: 'Sınırsız İlim Testi',
    description: 'Dilediğin kadar soru çözerek ilmini artır.',
  },
];

const plans = [
  {
    id: 'annual',
    title: 'Yıllık Plan',
    price: '₺14,99',
    period: '/ ay',
    billing: '₺179,88 / yıl olarak faturalandırılır',
    topLabel: 'Avantajlı plan',
    bottomLabel: 'İlk kullanıcılarına özel',
    selected: false,
  },
  {
    id: 'monthly',
    title: 'Aylık Plan',
    price: '₺19,99',
    period: '/ ay',
    description: 'İstediğin zaman iptal edebilirsin.',
    topLabel: 'Esnek kullanım',
    selected: true,
  },
];

export default function PremiumScreen() {
  const router = useRouter();
  const [selectedPlan, setSelectedPlan] = useState('monthly');

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
              color: '#CF9B47',
              fontSize: 24,
              textAlign: 'center',
              letterSpacing: -1,
              // Drop shadow effect
              textShadowColor: 'rgba(255, 255, 255, 0.25)',
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 10,
            }}
          >
            TAKVA PREMIUM
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
          {/* Premium Features Section */}
          <View style={{ marginBottom: 32 }}>
            <Text
              style={{
                fontFamily,
                fontSize: 24,
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: 24,
              }}
            >
              Premium Özellikler
            </Text>

            {/* Features List */}
            {premiumFeatures.map((feature, index) => (
              <View key={feature.id} style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'flex-start' }}>
                {/* Premium Icon */}
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    borderWidth: 0.5,
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                    backgroundColor: '#182723',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 12,
                    marginTop: 2,
                  }}
                >
                  <Image
                    source={PremiumIcon}
                    style={{ width: 10.5, height: 10.5 }}
                    resizeMode="contain"
                  />
                </View>

                {/* Feature Content */}
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily,
                      fontSize: 18,
                      fontWeight: '700',
                      color: '#FFFFFF',
                      marginBottom: 4,
                    }}
                  >
                    {feature.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily,
                      fontSize: 14,
                      fontWeight: '300',
                      color: 'rgba(255, 255, 255, 0.8)',
                      lineHeight: 20,
                    }}
                  >
                    {feature.description}
                  </Text>
                </View>
              </View>
            ))}
          </View>

          {/* Subscription Plans Section */}
          <View style={{ marginBottom: 24, alignItems: 'center' }}>
            {plans.map((plan) => {
              // Responsive width calculation
              const maxWidth = 350;
              const boxWidth = Math.min(SCREEN_WIDTH - horizontalPadding * 2, maxWidth);
              
              // Yıllık plan için özel stil
              if (plan.id === 'annual') {
                return (
                  <TouchableOpacity
                    key={plan.id}
                    onPress={() => setSelectedPlan(plan.id)}
                    activeOpacity={0.8}
                    style={{ 
                      marginBottom: 16,
                      width: boxWidth,
                      position: 'relative',
                    }}
                  >
                    <LinearGradient
                      colors={['#0A2345', '#0C2F3B', '#0E3537', '#0F3B32']}
                      start={{ x: 1, y: 0 }}
                      end={{ x: 0, y: 0 }}
                      style={{
                        width: '100%',
                        minHeight: 107,
                        borderRadius: 12,
                        borderWidth: 0.5,
                        borderColor: selectedPlan === plan.id ? 'rgba(233, 204, 136, 0.5)' : 'rgba(233, 204, 136, 0.3)',
                        padding: 16,
                        paddingTop: plan.topLabel ? 0 : 16,
                        position: 'relative',
                      }}
                    >
                      {/* Top Label - Inside box, centered at top, zero margin */}
                      {plan.topLabel && (
                        <View
                          style={{
                            alignSelf: 'center',
                            width: 120,
                            height: 22,
                            backgroundColor: 'rgba(207, 155, 71, 0.35)',
                            borderTopWidth: 0,
                            borderRightWidth: 0.5,
                            borderBottomWidth: 0.5,
                            borderLeftWidth: 0.5,
                            borderTopColor: 'transparent',
                            borderRightColor: 'rgba(207, 155, 71, 0.5)',
                            borderBottomColor: 'rgba(207, 155, 71, 0.5)',
                            borderLeftColor: 'rgba(207, 155, 71, 0.5)',
                            borderTopLeftRadius: 0,
                            borderTopRightRadius: 0,
                            borderBottomRightRadius: 50,
                            borderBottomLeftRadius: 50,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 0,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily,
                              fontSize: 12,
                              fontWeight: '300',
                              color: 'rgba(255, 255, 255, 0.9)',
                              textAlign: 'center',
                            }}
                          >
                            {plan.topLabel}
                          </Text>
                        </View>
                      )}

                      <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                        <View style={{ flex: 1, marginRight: 12 }}>
                          {/* Title */}
                          <Text
                            style={{
                              fontFamily,
                              fontSize: 20,
                              fontWeight: '700',
                              color: '#FFFFFF',
                              marginBottom: 8,
                            }}
                          >
                            {plan.title}
                          </Text>
                          
                          {/* Price */}
                          <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 }}>
                            <Text
                              style={{
                                fontFamily,
                                fontSize: 14,
                                fontWeight: '300',
                                color: '#FFFFFF',
                              }}
                            >
                              {plan.price}
                            </Text>
                            <Text
                              style={{
                                fontFamily,
                                fontSize: 14,
                                fontWeight: '300',
                                color: 'rgba(255, 255, 255, 0.8)',
                              }}
                            >
                              {plan.period}
                            </Text>
                          </View>
                          
                          {/* Billing */}
                          {plan.billing && (
                            <Text
                              style={{
                                fontFamily,
                                fontSize: 14,
                                fontWeight: '300',
                                color: '#CF9B47',
                                marginBottom: 8,
                              }}
                            >
                              {plan.billing}
                            </Text>
                          )}
                        </View>

                        {/* Radio Button */}
                        <View
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: 12,
                            borderWidth: 1,
                            borderColor: '#FFFFFF',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0,
                          }}
                        >
                          {selectedPlan === plan.id && (
                            <View
                              style={{
                                width: 12,
                                height: 12,
                                borderRadius: 6,
                                backgroundColor: '#FFFFFF',
                              }}
                            />
                          )}
                        </View>
                      </View>
                      
                      {/* Moon Icon - Absolute positioned at bottom left */}
                      {plan.id === 'annual' && (
                        <Image
                          source={require('../../../assets/images/bg-intro-icon.png')}
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            width: 77.35,
                            height: 77.55,
                            opacity: 0.07,
                            transform: [{ rotate: '19.86deg' }],
                            // Drop shadow effect
                            shadowColor: '#FFFFFF',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.25,
                            shadowRadius: 10,
                            elevation: 10,
                          }}
                          resizeMode="contain"
                        />
                      )}
                      
                      {/* Bottom Label - Absolute positioned at bottom right */}
                      {plan.bottomLabel && (
                        <View
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            paddingHorizontal: 12,
                            paddingVertical: 4,
                            height: 22,
                            borderTopLeftRadius: 13,
                            borderBottomRightRadius: 11,
                            borderTopRightRadius: 11,
                            borderBottomLeftRadius: 11,
                            borderWidth: 0.5,
                            borderColor: 'rgba(255, 255, 255, 0.5)',
                          }}
                        >
                          <Text
                            style={{
                              fontFamily,
                              fontSize: 12,
                              fontWeight: '300',
                              color: 'rgba(255, 255, 255, 0.9)',
                              textAlign: 'center',
                            }}
                          >
                            {plan.bottomLabel}
                          </Text>
                        </View>
                      )}
                    </LinearGradient>
                  </TouchableOpacity>
                );
              }
              
              // Aylık plan için
              return (
                <TouchableOpacity
                  key={plan.id}
                  onPress={() => setSelectedPlan(plan.id)}
                  activeOpacity={0.8}
                  style={{ 
                    marginBottom: 16,
                    width: boxWidth,
                    position: 'relative',
                  }}
                >
                  <LinearGradient
                    colors={['#0A2345', '#0C2F3B', '#0E3537', '#0F3B32']}
                    start={{ x: 1, y: 0 }}
                    end={{ x: 0, y: 0 }}
                    style={{
                      width: '100%',
                      minHeight: 107,
                      borderRadius: 12,
                      borderWidth: 0.5,
                      borderColor: selectedPlan === plan.id ? 'rgba(233, 204, 136, 0.5)' : 'rgba(233, 204, 136, 0.3)',
                      padding: 16,
                      paddingTop: plan.topLabel ? 0 : 16,
                      position: 'relative',
                    }}
                  >
                    {/* Top Label - Inside box, centered at top, zero margin */}
                    {plan.topLabel && (
                      <View
                        style={{
                          alignSelf: 'center',
                          width: 120,
                          height: 22,
                          backgroundColor: 'rgba(207, 155, 71, 0.35)',
                          borderTopWidth: 0,
                          borderRightWidth: 0.5,
                          borderBottomWidth: 0.5,
                          borderLeftWidth: 0.5,
                          borderTopColor: 'transparent',
                          borderRightColor: 'rgba(207, 155, 71, 0.5)',
                          borderBottomColor: 'rgba(207, 155, 71, 0.5)',
                          borderLeftColor: 'rgba(207, 155, 71, 0.5)',
                          borderTopLeftRadius: 0,
                          borderTopRightRadius: 0,
                          borderBottomRightRadius: 50,
                          borderBottomLeftRadius: 50,
                          alignItems: 'center',
                          justifyContent: 'center',
                          marginBottom: 0,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily,
                            fontSize: 12,
                            fontWeight: '300',
                            color: 'rgba(255, 255, 255, 0.9)',
                            textAlign: 'center',
                          }}
                        >
                          {plan.topLabel}
                        </Text>
                      </View>
                    )}

                    <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                      <View style={{ flex: 1, marginRight: 12 }}>
                        <Text
                          style={{
                            fontFamily,
                            fontSize: 20,
                            fontWeight: '700',
                            color: '#FFFFFF',
                            marginBottom: 8,
                          }}
                        >
                          {plan.title}
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'baseline', marginBottom: 4 }}>
                          <Text
                            style={{
                              fontFamily,
                              fontSize: 14,
                              fontWeight: '300',
                              color: '#FFFFFF',
                            }}
                          >
                            {plan.price}
                          </Text>
                          <Text
                            style={{
                              fontFamily,
                              fontSize: 14,
                              fontWeight: '300',
                              color: 'rgba(255, 255, 255, 0.8)',
                            }}
                          >
                            {plan.period}
                          </Text>
                        </View>
                        {plan.description && (
                          <Text
                            style={{
                              fontFamily,
                              fontSize: 14,
                              fontWeight: '300',
                              color: 'rgba(255, 255, 255, 0.8)',
                              marginBottom: 8,
                            }}
                          >
                            {plan.description}
                          </Text>
                        )}
                      </View>

                      {/* Radio Button */}
                      <View
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 12,
                          borderWidth: 1,
                          borderColor: '#FFFFFF',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        {selectedPlan === plan.id && (
                          <View
                            style={{
                              width: 12,
                              height: 12,
                              borderRadius: 6,
                              backgroundColor: '#FFFFFF',
                            }}
                          />
                        )}
                      </View>
                    </View>
                    
                    {/* Moon Icon - Absolute positioned at bottom left */}
                    <Image
                      source={require('../../../assets/images/bg-intro-icon.png')}
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: 77.35,
                        height: 77.55,
                        opacity: 0.07,
                        transform: [{ rotate: '19.86deg' }],
                        // Drop shadow effect
                        shadowColor: '#FFFFFF',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.25,
                        shadowRadius: 10,
                        elevation: 10,
                      }}
                      resizeMode="contain"
                    />
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Payment Information */}
          <Text
            style={{
              fontFamily,
              fontSize: 14,
              fontWeight: '300',
              color: 'rgba(255, 255, 255, 0.8)',
              textAlign: 'center',
              marginBottom: 24,
              lineHeight: 20,
            }}
          >
            Ödemeler App Store / Google Play üzerinden yapılır.{'\n'}
            Abonelikler mağaza şartlarına tabidir.
          </Text>

          {/* Call to Action Button */}
          <View style={{ alignItems: 'center', marginBottom: 24 }}>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{
                width: Math.min(350, SCREEN_WIDTH - horizontalPadding * 2),
                height: 50,
                borderRadius: 12,
                borderWidth: 0.5,
                borderColor: 'rgba(207, 155, 71, 0.5)',
                backgroundColor: '#0D303A',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MaskedView
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}
                maskElement={
                  <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                    <Text
                      style={{
                        fontFamily,
                        fontSize: 18,
                        fontWeight: '700',
                        lineHeight: 18,
                        textAlign: 'center',
                        color: '#FFFFFF',
                      }}
                    >
                      Takva Premium'a Geç
                    </Text>
                  </View>
                }
              >
                <LinearGradient
                  colors={['#E9CC88', '#CF9B47']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                />
              </MaskedView>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}
