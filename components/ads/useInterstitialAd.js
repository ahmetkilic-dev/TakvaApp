import { useEffect, useState, useCallback } from 'react';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import { useIAP } from '../../contexts/IAPContext';

// Kullanıcının verdiği Gerçek Interstitial ID (Ekran Görüntüsünden)
const PRODUCTION_INTERSTITIAL_ID = 'ca-app-pub-5371686714825436/6244596600';

const adUnitId = __DEV__ ? TestIds.INTERSTITIAL : PRODUCTION_INTERSTITIAL_ID;

let interstitial = null;

export const useInterstitialAd = () => {
    const { currentSubscription } = useIAP();
    const [loaded, setLoaded] = useState(false);

    // Reklamı yükle
    const loadAd = useCallback(() => {
        // Abone ise hiç yükleme yapma
        if (currentSubscription) return;

        if (!interstitial) {
            interstitial = InterstitialAd.createForAdRequest(adUnitId, {
                requestNonPersonalizedAdsOnly: true,
            });
        }

        const unsubscribeLoaded = interstitial.addAdEventListener(AdEventType.LOADED, () => {
            setLoaded(true);
        });

        const unsubscribeClosed = interstitial.addAdEventListener(AdEventType.CLOSED, () => {
            setLoaded(false);
            interstitial = null; // Reset instance to reload fresh ad next time
        });

        interstitial.load();

        return () => {
            unsubscribeLoaded();
            unsubscribeClosed();
        };
    }, [currentSubscription]);

    // Reklamı Göster
    const showAd = useCallback(() => {
        // Abone ise gösterme
        if (currentSubscription) return;

        if (loaded && interstitial) {
            interstitial.show();
        } else {
            console.log('Interstitial Ad not ready');
            // Ad not ready, maybe try to load for next time?
            loadAd();
        }
    }, [loaded, currentSubscription, loadAd]);

    useEffect(() => {
        // Component mount olduğunda otomatik yükle (eğer abone değilse)
        if (!currentSubscription && !loaded) {
            loadAd();
        }
    }, [currentSubscription, loaded, loadAd]);

    return { showAd, isLoaded: loaded };
};
