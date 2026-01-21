import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { useIAP } from '../../contexts/IAPContext';

// Kullanıcının verdiği Gerçek Ad Unit ID
const PRODUCTION_AD_UNIT_ID = 'ca-app-pub-5371686714825436/6975781855';

const AdBanner = () => {
    const { currentSubscription } = useIAP();
    const [adError, setAdError] = useState(false);

    // Abonelik varsa reklam gösterme
    if (currentSubscription) return null;

    // Geliştirme ortamında Test ID, Prodüksiyonda Gerçek ID kullan
    const adUnitId = __DEV__ ? TestIds.BANNER : PRODUCTION_AD_UNIT_ID;

    if (adError) return null;

    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', width: '100%', paddingVertical: 10 }}>
            <BannerAd
                unitId={adUnitId}
                size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
                requestOptions={{
                    requestNonPersonalizedAdsOnly: true,
                }}
                onAdFailedToLoad={(error) => {
                    console.log('AdMob Banner Error:', error);
                    setAdError(true);
                }}
            />
        </View>
    );
};

export default AdBanner;
