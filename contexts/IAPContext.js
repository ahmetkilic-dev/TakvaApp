import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { Alert, NativeModules, Platform } from 'react-native';
import * as RNIap from 'react-native-iap';
import { auth } from '../firebaseConfig'; // Firebase Auth
import { supabase } from '../lib/supabase'; // Supabase DB

const IAPContext = createContext();

export const useIAP = () => {
    const context = useContext(IAPContext);
    if (!context) {
        throw new Error('useIAP must be used within an IAPProvider');
    }
    return context;
};

export const PRODUCT_IDS = {
    'plus_monthly': 'com.wezyapps.takvaapp.plus.monthly',
    'plus_yearly': 'com.wezyapps.takvaapp.plus.yearly',
    'premium_monthly': 'com.wezyapps.takvaapp.premium.monthly',
    'premium_yearly': 'com.wezyapps.takvaapp.premium.yearly',
};

export const Tiers = {
    PLUS: 'plus',
    PREMIUM: 'premium',
};

export const IAPProvider = ({ children }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [connected, setConnected] = useState(false);

    // Mutex Lock
    const iapLock = useRef(false);

    const acquireLock = () => {
        if (iapLock.current) return false;
        iapLock.current = true;
        return true;
    };
    const releaseLock = () => {
        iapLock.current = false;
    };

    // --- RELOAD APP HELPER ---
    const reloadApp = async () => {
        console.log('App reloading...');
        try {
            // 1. Try Expo Updates (Production)
            try {
                const Updates = require('expo-updates');
                await Updates.reloadAsync();
                return;
            } catch (e) { /* Module missing or dev client */ }

            // 2. Try DevSettings (Development)
            if (__DEV__ && NativeModules.DevSettings) {
                NativeModules.DevSettings.reload();
            } else {
                Alert.alert("Güncelleme Gerekli", "Lütfen aboneliğin aktif olması için uygulamayı tamamen kapatıp tekrar açın.");
            }
        } catch (error) {
            console.error('Reload Error:', error);
        }
    };

    // --- SUCCESS HANDLER ---
    // Veritabanı güncellendiğinde çağrılır. Kullanıcıyı bilgilendirir ve reload atar.
    const handleSuccess = async (tierName) => {
        Alert.alert(
            'Teşekkürler!',
            `Aboneliğiniz (${tierName}) başarıyla tanımlandı. Uygulama yenileniyor...`,
            [{ text: 'Tamam', onPress: () => reloadApp() }]
        );
    };


    // --- SUPABASE UPDATE ---
    const upsertSubscription = async (purchase) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                console.log('Update atlandı: Kullanıcı yok.');
                return false;
            }

            // Product ID'den type ve plan ayırma
            let type = null;
            let plan = null;

            if (purchase.productId.includes('plus')) type = 'plus';
            else if (purchase.productId.includes('premium')) type = 'premium';

            if (purchase.productId.includes('monthly')) plan = 'monthly';
            else if (purchase.productId.includes('yearly')) plan = 'yearly';

            if (!type) return false;

            // Güvenli tarih parse etme
            let newPurchaseDate;
            const newPurchaseDateStr = (() => {
                let date;
                const ts = purchase.transactionDate || purchase.purchaseTime || purchase.transactionDateMs;

                if (!ts) date = new Date();
                else {
                    date = new Date(ts);
                    if (isNaN(date.getTime())) date = new Date();
                }

                // Türkiye saati (UTC+3) düzenlemesi
                const trDate = new Date(date.getTime() + (3 * 60 * 60 * 1000));
                newPurchaseDate = trDate;
                return trDate.toISOString();
            })();

            // ÖNCE MEVCUT VERİYİ KONTROL ET
            const { data: existingData } = await supabase
                .from('subscription')
                .select('purchase_date')
                .eq('id', user.uid)
                .single();

            if (existingData && existingData.purchase_date) {
                const existingDate = new Date(existingData.purchase_date);
                // Eğer yeni gelen satın alma tarihi, veritabanındaki tarihten eskiyse GÜNCELLEME YAPMA
                if (newPurchaseDate < existingDate) {
                    console.log('Eski satın alma verisi, güncelleme atlandı.',
                        `Mevcut: ${existingData.purchase_date}, Yeni: ${newPurchaseDateStr}`);
                    return false;
                }
            }

            console.log(`Supabase upsert: ${type} - ${plan} (${user.uid})`);

            const { error } = await supabase
                .from('subscription')
                .upsert({
                    id: user.uid,
                    email: user.email,
                    subscription_type: type,
                    subscription_plan: plan,
                    purchase_date: newPurchaseDateStr,
                });

            if (error) {
                console.error('Upsert Hatası:', error.message);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Supabase Kritik Hata:', error);
            return false;
        }
    };

    // --- FREE ÇEKME (Süre Dolunca) ---
    const setSubscriptionToFree = async () => {
        try {
            const user = auth.currentUser;
            if (!user) return;

            console.log(`Abonelik Free'ye çekiliyor (${user.uid})`);

            const { error } = await supabase
                .from('subscription')
                .upsert({
                    id: user.uid,
                    email: user.email,
                    subscription_type: 'free',
                    subscription_plan: null, // Boş
                    purchase_date: new Date().toISOString(), // Son güncelleme tarihi olarak kalsın
                });

            if (error) {
                console.error('Free Update Hatası:', error.message);
            }
        } catch (error) {
            console.error('Kritik Hata:', error);
        }
    };

    // --- RESTORE / CHECK LOGIC ---
    const checkCurrentPurchases = async (isSilent = false) => {
        if (!acquireLock()) {
            if (!isSilent) Alert.alert('İşlem Sürüyor', 'Lütfen bekleyin...');
            return;
        }

        if (!isSilent) setIsProcessing(true);

        try {
            if (!connected) {
                try {
                    await RNIap.initConnection();
                    setConnected(true);
                } catch (e) {
                    console.warn('Connection error:', e);
                    throw e;
                }
            }

            const purchases = await RNIap.getAvailablePurchases();

            if (purchases && purchases.length > 0) {
                // Tarihe göre sırala (En yeni en üstte)
                const sortedResults = purchases.sort((a, b) => {
                    const getDate = (p) => p.transactionDate || p.purchaseTime || p.transactionDateMs || 0;
                    return getDate(b) - getDate(a);
                });

                const latestPurchase = sortedResults[0];

                // Debug: İlk objenin anahtarlarını görelim (Sadece bir kere)
                if (latestPurchase) {
                    console.log('Latest Purchase Keys:', Object.keys(latestPurchase));
                    console.log('Selected Latest:', latestPurchase.productId,
                        new Date(latestPurchase.transactionDate || latestPurchase.purchaseTime || latestPurchase.transactionDateMs || 0).toISOString());
                }

                if (latestPurchase) {
                    // --- SÜRE KONTROLÜ ---
                    const purchaseDate = new Date(latestPurchase.transactionDate || latestPurchase.purchaseTime || latestPurchase.transactionDateMs || 0);
                    const now = new Date();
                    const diffTime = Math.abs(now - purchaseDate);
                    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                    let isExpired = false;
                    const isMonthly = latestPurchase.productId.includes('monthly');
                    const isYearly = latestPurchase.productId.includes('yearly');

                    if (isMonthly && diffDays > 32) isExpired = true;
                    if (isYearly && diffDays > 370) isExpired = true;

                    if (isExpired) {
                        console.log(`Abonelik süresi doldu (${diffDays} gün). Free'ye düşürülüyor...`);
                        await setSubscriptionToFree();
                    } else {
                        const success = await upsertSubscription(latestPurchase);

                        // Eğer veritabanı güncellendiyse (veya zaten güncelse)
                        // Kullanıcıya bir geri bildirim verelim (sadece sesli modda)
                        if (success) {
                            let type = latestPurchase.productId.includes('premium') ? 'premium' :
                                latestPurchase.productId.includes('plus') ? 'plus' : null;

                            if (type) {
                                if (!isSilent) {
                                    handleSuccess(type);
                                } else {
                                    console.log('Silent restore success:', type);
                                }
                            }
                        }
                    }
                }
            } else {
                if (!isSilent) Alert.alert('Bilgi', 'Geçmiş satın alım bulunamadı.');
            }
        } catch (e) {
            console.warn('Geçmiş hatası:', e.message);
            if (!isSilent) Alert.alert('Hata', 'İşlem hatası.');
        } finally {
            if (!isSilent) setIsProcessing(false);
            releaseLock();
        }
    };

    // --- INIT ---
    useEffect(() => {
        let isMounted = true;
        let purchaseUpdateSubscription = null;
        let purchaseErrorSubscription = null;

        const init = async () => {
            if (!acquireLock()) { setTimeout(init, 1000); return; }

            try {
                await RNIap.initConnection();
                if (!isMounted) { releaseLock(); return; }
                setConnected(true);

                // Purchase Update Listener
                purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(async (purchase) => {
                    console.log('Purchase Updated:', purchase);

                    const receipt = purchase.transactionReceipt || purchase.purchaseToken;
                    if (receipt) {
                        setIsProcessing(true);

                        let type = purchase.productId.includes('premium') ? 'premium' :
                            purchase.productId.includes('plus') ? 'plus' : null;

                        if (type) {
                            const success = await upsertSubscription(purchase);
                            if (success) {
                                try {
                                    await RNIap.finishTransaction({ purchase, isConsumable: false });
                                    handleSuccess(type === 'plus' ? 'Takva Plus' : 'Takva Premium');
                                } catch (ackErr) {
                                    console.warn('Finish transaction error:', ackErr);
                                }
                            }
                        }
                        setIsProcessing(false);
                    }
                });

                // Purchase Error Listener
                purchaseErrorSubscription = RNIap.purchaseErrorListener((error) => {
                    if (error.code === 'E_USER_CANCELLED') {
                        console.log('User cancelled purchase');
                    } else {
                        console.warn('Purchase error:', error);
                    }
                    setIsProcessing(false);
                });

                releaseLock();

                // App Launch Auto-Check
                setTimeout(() => {
                    checkCurrentPurchases(true);
                }, 1000);

            } catch (e) {
                console.error('Init Hatası:', e);
                setConnected(true);
                releaseLock();
                setTimeout(() => checkCurrentPurchases(true), 1500);
            }
        };

        init();

        return () => {
            isMounted = false;
            if (purchaseUpdateSubscription) {
                purchaseUpdateSubscription.remove();
            }
            if (purchaseErrorSubscription) {
                purchaseErrorSubscription.remove();
            }
            RNIap.endConnection();
        };
    }, []);

    // --- BUY ---
    const requestPurchase = useCallback(async (productId) => {
        if (iapLock.current) {
            Alert.alert('Bekleyiniz', 'İşlem sürüyor...');
            return;
        }

        acquireLock();
        setIsProcessing(true);

        const failSafeTimer = setTimeout(() => {
            if (iapLock.current) {
                setIsProcessing(false);
                releaseLock();
                Alert.alert('Zaman Aşımı', 'Yanıt alınamadı. Lütfen tekrar deneyin.');
            }
        }, 20000); // 20sn

        try {
            const products = await RNIap.getSubscriptions({ skus: [productId] });

            if (products && products.length > 0) {
                await RNIap.requestSubscription({ sku: productId });

                // Listener'ın araya girmesine izin vermek için lock'ı kısa süreliğine açıp
                // tekrar check'e yönlendirmek lazım.
                setTimeout(() => {
                    clearTimeout(failSafeTimer);
                    setIsProcessing(false);
                    releaseLock();

                    // Şimdi Restore Logic'i manuel olarak (sesli) çağır
                    console.log('Buy Flow bitti, Restore check tetikleniyor...');
                    checkCurrentPurchases(false);
                }, 3000);

            } else {
                Alert.alert('Hata', 'Ürün mağazada bulunamadı.');
                clearTimeout(failSafeTimer);
                setIsProcessing(false);
                releaseLock();
            }
        } catch (e) {
            console.error('Buy Hatası:', e);
            if (e.code === 'E_USER_CANCELLED') {
                Alert.alert('İptal', 'Satın alma iptal edildi.');
            } else {
                Alert.alert('Hata', 'Satın alma başlatılamadı.');
            }

            clearTimeout(failSafeTimer);
            setIsProcessing(false);
            releaseLock();
        }
    }, [connected]);

    const value = {
        isProcessing,
        requestPurchase,
        restorePurchases: () => checkCurrentPurchases(false),
    };

    return <IAPContext.Provider value={value}>{children}</IAPContext.Provider>;
};
