import { useEffect, useState, useCallback, useRef } from 'react';
import { RewardedAd, RewardedAdEventType, TestIds, AdEventType } from 'react-native-google-mobile-ads';
import { useIAP } from '../../contexts/IAPContext';

// Kullanıcının verdiği İlim Reklam ID'si
const PRODUCTION_REWARDED_ID = 'ca-app-pub-5371686714825436/7480096154';

const adUnitId = __DEV__ ? TestIds.REWARDED : PRODUCTION_REWARDED_ID;

export const useRewardedAd = () => {
    const { currentSubscription } = useIAP();
    const [loaded, setLoaded] = useState(false);
    const rewardedAdRef = useRef(null);

    // Reklamı yükle
    const loadAd = useCallback(() => {
        // Abone ise yükleme yapma (opsiyonel, şimdilik herkes için yükleyelim mantık kopyala yapıştır olmasın)
        // if (currentSubscription) return;

        console.log('RewardedAd: Loading new ad...');
        const ad = RewardedAd.createForAdRequest(adUnitId, {
            requestNonPersonalizedAdsOnly: true,
        });

        rewardedAdRef.current = ad;

        const unsubscribeLoaded = ad.addAdEventListener(RewardedAdEventType.LOADED, () => {
            console.log('RewardedAd: LOADED!');
            setLoaded(true);
        });

        const unsubscribeEarned = ad.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
            console.log('RewardedAd: Reward Earned (Global Listener)', reward);
        });

        const unsubscribeError = ad.addAdEventListener(AdEventType.ERROR, (error) => {
            console.error('RewardedAd: Load Error:', error);
            setLoaded(false);
        });

        const unsubscribeClosed = ad.addAdEventListener(AdEventType.CLOSED, () => {
            console.log('RewardedAd: CLOSED');
            setLoaded(false);
            rewardedAdRef.current = null;
            // Kapandıktan sonra tekrar yükle ki bir sonraki ihtiyaçta hazır olsun
            // loadAd(); // Bunu burada doğrudan çağırmak yerine useEffect ile kontrol etmek daha güvenli olabilir ama manuel de ok.
        });

        try {
            ad.load();
        } catch (e) {
            console.error('RewardedAd: Load Exception:', e);
        }

        return () => {
            unsubscribeLoaded();
            unsubscribeEarned();
            unsubscribeClosed();
            unsubscribeError();
        };
    }, []);

    // Reklamı Göster
    const showAd = useCallback((onRewardEarned) => {
        const ad = rewardedAdRef.current;

        if (loaded && ad) {
            console.log('RewardedAd: Showing ad...');

            // Ödül kazanma olayını dinle (Tek seferlik)
            const unsubscribeValid = ad.addAdEventListener(
                RewardedAdEventType.EARNED_REWARD,
                (reward) => {
                    console.log('RewardedAd: User earned reward (Callback triggered):', reward);
                    if (onRewardEarned) {
                        onRewardEarned();
                    }
                },
            );

            ad.show();
            setLoaded(false); // Gösterildiği an "yüklü" statüsünden çıkar

            return () => {
                unsubscribeValid();
            };
        } else {
            console.log('Rewarded Ad not ready yet.');
            loadAd(); // Hazır değilse yüklemeyi tetikle
        }
    }, [loaded, loadAd]);

    // Initial Load
    useEffect(() => {
        // İlk açılışta yükle
        if (!rewardedAdRef.current) {
            loadAd();
        }

        // Cleanup
        return () => {
            // Unmount olurken bir şey yapmaya gerek yok, referans silinir.
        };
    }, [loadAd]);

    // Re-load logic: Eğer reklam kapandıysa (loaded=false) ve ref yoksa tekrar yükle
    useEffect(() => {
        if (!loaded && !rewardedAdRef.current) {
            const timeout = setTimeout(() => {
                loadAd();
            }, 1000); // 1 saniye bekle öyle yükle (aşırı yüklenmeyi önlemek için)
            return () => clearTimeout(timeout);
        }
    }, [loaded, loadAd]);

    return { showAd, isLoaded: loaded };
};
