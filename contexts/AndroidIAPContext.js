import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { Alert, NativeModules, Platform } from 'react-native';
import * as RNIap from 'react-native-iap'; // Import everything to check availability
import { auth } from '../firebaseConfig'; // Firebase Auth
import { supabase } from '../lib/supabase'; // Supabase DB

const AndroidIAPContext = createContext();

export const useAndroidIAP = () => {
    const context = useContext(AndroidIAPContext);
    if (!context) {
        throw new Error('useAndroidIAP must be used within an AndroidIAPProvider');
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

export const AndroidIAPProvider = ({ children }) => {
    const [isProcessing, setIsProcessing] = useState(false);
    const [connected, setConnected] = useState(false);
    const [currentSubscription, setCurrentSubscription] = useState(null);

    // Locks and Refs
    const iapLock = useRef(false);
    const isIAPInitialized = useRef(false);
    const purchaseUpdateSubscription = useRef(null);
    const purchaseErrorSubscription = useRef(null);

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
        try {
            try {
                const Updates = require('expo-updates');
                await Updates.reloadAsync();
                return;
            } catch (e) { /* Module missing */ }

            if (__DEV__ && NativeModules.DevSettings) {
                NativeModules.DevSettings.reload();
            } else {
                Alert.alert("Güncelleme Gerekli", "Lütfen aboneliğin aktif olması için uygulamayı tamamen kapatıp tekrar açın.");
            }
        } catch (error) {
            console.log("Reload error:", error);
        }
    };

    // --- SUCCESS HANDLER ---
    const handleSuccess = async (tierName) => {
        Alert.alert(
            'Teşekkürler!',
            `Aboneliğiniz (${tierName}) başarıyla tanımlandı. Uygulama yenileniyor...`,
            [{ text: 'Tamam', onPress: () => reloadApp() }]
        );
    };

    // --- SUPABASE UPDATE ---
    const upsertSubscription = async (purchase, isSilent = false) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                if (!isSilent) Alert.alert("Hata", "Kullanıcı oturumu bulunamadı.");
                return false;
            }

            let type = null;
            let plan = null;

            if (purchase.productId.includes('plus')) type = 'plus';
            else if (purchase.productId.includes('premium')) type = 'premium';

            if (purchase.productId.includes('monthly')) plan = 'monthly';
            else if (purchase.productId.includes('yearly')) plan = 'yearly';

            if (!type) {
                console.log("DEBUG: Unknown product type:", purchase.productId);
                return false;
            }

            let newPurchaseDate;
            const newPurchaseDateStr = (() => {
                let date;
                // Android purchaseTime genelde string veya number gelir.
                const ts = purchase.transactionDate || purchase.purchaseTime || purchase.transactionDateMs;
                console.log("DEBUG: Transaction Timestamp:", ts);

                if (!ts) {
                    date = new Date();
                } else {
                    date = new Date(Number(ts));
                    if (isNaN(date.getTime())) {
                        console.log("DEBUG: Invalid date format, using now.");
                        date = new Date();
                    }
                }
                // +3 Saat (TR Saati) - Gerekli mi tartışılır ama mevcut yapı böyle.
                const trDate = new Date(date.getTime() + (3 * 60 * 60 * 1000));
                newPurchaseDate = trDate;
                return trDate.toISOString();
            })();

            const transactionId = purchase.orderId || purchase.transactionId;
            console.log("DEBUG: Transaction ID:", transactionId);

            // 1. Transaction ID Kontrolü (Başka kullanıcı kullanmış mı?)
            if (transactionId) {
                const { data: ownerData, error: ownerError } = await supabase
                    .from('subscription')
                    .select('id, email')
                    .eq('original_transaction_id', transactionId)
                    .maybeSingle(); // single() yerine maybeSingle() daha güvenli

                if (ownerError) {
                    console.log("DEBUG: Owner Check Error:", ownerError);
                }

                if (ownerData && ownerData.id !== user.uid) {
                    if (!isSilent) Alert.alert('Hata', `Bu Google Play hesabı başka bir kullanıcıya (${ownerData.email}) tanımlı.`);
                    console.log("DEBUG: Transaction belongs to another user:", ownerData.email);
                    return false;
                }
            }

            // 2. Veritabanına Yaz
            const { error } = await supabase
                .from('subscription')
                .upsert({
                    id: user.uid,
                    email: user.email,
                    subscription_type: type,
                    subscription_plan: plan,
                    purchase_date: newPurchaseDateStr,
                    original_transaction_id: transactionId,
                });

            if (error) {
                console.error('Upsert Error Object:', error);
                if (!isSilent) Alert.alert("Veritabanı Hatası", `Kayıt başarısız: ${error.message}`);
                return false;
            }

            return true;
        } catch (error) {
            console.error('Upsert Exception:', error);
            if (!isSilent) Alert.alert("Beklenmedik Hata", `İşlem hatası: ${error.message}`);
            return false;
        }
    };

    const setSubscriptionToFree = async () => {
        try {
            const user = auth.currentUser;
            if (!user) return;
            await supabase.from('subscription').upsert({
                id: user.uid, email: user.email, subscription_type: 'free', subscription_plan: null, purchase_date: new Date().toISOString(),
            });
        } catch (error) { console.log('Set Free Error:', error); }
    };

    const fetchSubscriptionFromDB = async () => {
        try {
            const user = auth.currentUser;
            if (!user) { setCurrentSubscription(null); return; }
            const { data } = await supabase.from('subscription').select('*').eq('id', user.uid).single();
            if (data && data.subscription_type && data.subscription_type !== 'free') {
                setCurrentSubscription({ tier: data.subscription_type, plan: data.subscription_plan });
            } else {
                setCurrentSubscription(null);
            }
        } catch (e) { console.log('DB Fetch Error:', e); }
    };

    // --- LAZY INITIALIZATION ---
    // Bu fonksiyon sadece satın alma veya restore işlemi başladığında çağrılır.
    const ensureConnection = async () => {
        if (connected && isIAPInitialized.current) return true;

        try {
            console.log("Initializing IAP Connection (Lazy)...");

            // Log'a göre initConnection var
            await RNIap.initConnection();
            setConnected(true);
            isIAPInitialized.current = true;

            // Log'a göre flushFailedPurchasesCachedAsPendingAndroid YOK.
            // Bu adımı atlıyoruz.
            console.log("Skipping flushPending as it is not available.");

            // Listeners
            if (purchaseUpdateSubscription.current) purchaseUpdateSubscription.current.remove();
            if (purchaseErrorSubscription.current) purchaseErrorSubscription.current.remove();

            purchaseUpdateSubscription.current = RNIap.purchaseUpdatedListener(async (purchase) => {
                console.log("DEBUG: purchaseUpdatedListener fired:", JSON.stringify(purchase));

                // Strict 'receipt' check removed to allow processing based on purchase token availability (common in Android)
                if (purchase) {
                    setIsProcessing(true);
                    try {
                        console.log("DEBUG: Processing purchase entitlement...");

                        // 1. Önce Veritabanına Yaz (Hak Sahipliği)
                        const success = await upsertSubscription(purchase, true);

                        if (success) {
                            console.log("DEBUG: Supabase update success. Grants verified.");

                            // 2. Google Play'e "Tamamdır" de
                            if (RNIap.finishTransaction) {
                                await RNIap.finishTransaction({ purchase, isConsumable: false });
                                console.log("DEBUG: Transaction finished in Google Play.");
                            }

                            // 3. Kullanıcıya Müjdeyi Ver ve Uygulamayı Yenile
                            let type = purchase.productId.includes('plus') ? 'Takva Plus' : 'Takva Premium';
                            handleSuccess(type);

                            // Ekstra güvenlik: State'i güncelle
                            fetchSubscriptionFromDB();
                        } else {
                            console.error("DEBUG: Supabase upsert failed! WILL NOT FINISH TRANSACTION.");
                        }
                    } catch (ackErr) { console.log('Ack Error', ackErr); }
                    setIsProcessing(false);
                    releaseLock();
                }
            });

            purchaseErrorSubscription.current = RNIap.purchaseErrorListener((error) => {
                console.log('Purchase Error Listener:', error);

                // Zaten sahip olunan ürün hatası gelirse, otomatik olarak restore etmeyi dene
                if (error.responseCode === 7 || error.code === 'E_ALREADY_OWNED') {
                    console.log("DEBUG: Item already owned. Triggering silent restore.");
                    checkCurrentPurchases(true); // Sessiz restore
                }

                setIsProcessing(false);
                releaseLock();
            });

            return true;
        } catch (e) {
            console.error("DEBUG IAP Connection Error:", e);
            return false;
        }
    };

    // --- INITIAL MOUNT ---
    useEffect(() => {
        if (Platform.OS === 'android') {
            ensureConnection();
        }
    }, []);

    // --- RESTORE ---
    const checkCurrentPurchases = async (isSilent = false) => {
        // ... (remaining code unchanged)
        // Önce bağlantıyı garanti et
        const isConnected = await ensureConnection();
        if (!isConnected) {
            if (!isSilent) Alert.alert('Hata', 'Google Play bağlantısı kurulamadı.');
            return;
        }

        if (!acquireLock()) {
            if (!isSilent) Alert.alert('İşlem Sürüyor', 'Lütfen bekleyin...');
            return;
        }

        if (!isSilent) setIsProcessing(true);

        try {
            const purchases = await RNIap.getAvailablePurchases();
            if (purchases && purchases.length > 0) {
                const sortedResults = purchases.sort((a, b) => {
                    const getDate = (p) => p.transactionDate || p.purchaseTime || p.transactionDateMs || 0;
                    return Number(getDate(b)) - Number(getDate(a));
                });
                const latestPurchase = sortedResults[0];

                if (latestPurchase) {
                    // Basit süre kontrolü
                    const purchaseDate = new Date(Number(latestPurchase.transactionDate || latestPurchase.purchaseTime || latestPurchase.transactionDateMs || 0));
                    const now = new Date();
                    const diffDays = Math.ceil(Math.abs(now - purchaseDate) / (1000 * 60 * 60 * 24));

                    let isExpired = false;
                    if (latestPurchase.productId.includes('monthly') && diffDays > 32) isExpired = true;
                    if (latestPurchase.productId.includes('yearly') && diffDays > 370) isExpired = true;

                    if (isExpired) {
                        await setSubscriptionToFree();
                        if (!isSilent) Alert.alert('Bilgi', 'Abonelik süresi dolmuş.');
                    } else {
                        const success = await upsertSubscription(latestPurchase, isSilent);
                        if (success) {
                            let type = latestPurchase.productId.includes('premium') ? 'premium' : latestPurchase.productId.includes('plus') ? 'plus' : null;
                            if (type && !isSilent) handleSuccess(type === 'plus' ? 'Takva Plus' : 'Takva Premium');
                            fetchSubscriptionFromDB();
                        } else {
                            fetchSubscriptionFromDB();
                            if (!isSilent) Alert.alert('Bilgi', 'Aboneliğiniz zaten aktif.');
                        }
                    }
                }
            } else {
                if (!isSilent) Alert.alert('Bilgi', 'Google Play üzerinde aktif abonelik bulunamadı.');
            }
        } catch (e) {
            if (!isSilent) Alert.alert('Hata', 'Geri yükleme hatası.');
            console.log(e);
        } finally {
            if (!isSilent) setIsProcessing(false);
            releaseLock();
        }
    };

    // --- AUTH LISTENER ---
    useEffect(() => {
        // Platform check
        if (Platform.OS !== 'android') return;

        // Auth Listener: Abonelik bilgisini sadece kullanıcı giriş yaptığında çek.
        const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
            if (user) {
                await fetchSubscriptionFromDB();
            } else {
                setCurrentSubscription(null);
            }
        });

        return () => {
            unsubscribeAuth();
            if (purchaseUpdateSubscription.current) purchaseUpdateSubscription.current.remove();
            if (purchaseErrorSubscription.current) purchaseErrorSubscription.current.remove();
            if (connected) RNIap.endConnection();
        };
    }, []);

    // --- BUY ---
    const requestPurchase = useCallback(async (productId) => {
        if (Platform.OS !== 'android') return;

        // Önce bağlantıyı garanti et
        const isConnected = await ensureConnection();
        if (!isConnected) {
            Alert.alert('DEBUG HATA', 'Google Play bağlantısı kurulamadı. İnternet bağlantınızı kontrol edin. (ensureConnection failed)');
            return;
        }

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
                Alert.alert('Zaman Aşımı', 'Ödeme işlemi çok uzun sürdü. Google Play yanıt vermedi.');
            }
        }, 180000); // 3 Dakika

        try {
            console.log('DEBUG: Getting subscriptions for', productId);

            // Log'a göre elimizde "fetchProducts" var. "getSubscriptions" YOK.
            // getSubscriptions yoksa, RNIap v10+ öncesi veya Native Module yapısı farklı olabilir.
            // Logda görünen yöntem: fetchProducts

            let products = [];
            try {
                // 1. ADIM: "subs" tipiyle ürünü çek (Bu çok önemli, yoksa offer gelmez)
                products = await RNIap.fetchProducts({ skus: [productId], type: 'subs' });
            } catch (err) {
                console.error("DEBUG: fetchProducts error:", err);
                Alert.alert("Ürün Hatası", "Google Play'den ürün bilgisi alınamadı.");
                throw err;
            }

            console.log('DEBUG: Products result:', JSON.stringify(products));

            if (products && products.length > 0) {
                const product = products[0];

                // 2. ADIM: Offer (Teklif) Token'ı bul
                // Android, aboneliklerde mutlaka bir "offerToken" ister.
                // Genelde ilk offer "Base Plan" dır.
                const offerToken = product.subscriptionOfferDetailsAndroid?.[0]?.offerToken ||
                    product.subscriptionOfferDetails?.[0]?.offerToken ||
                    product.subscriptionOfferDetails?.[0]?.offerToken; // Fallback attempts

                if (!offerToken) {
                    // Belki de bu bir abonelik değildir? (inapp)
                    // Ama bizim productID'lerimiz "monthly/yearly" olduğu için aboneliktir.
                    console.log("DEBUG: No offerToken found. Trying standard purchase as fallback.");
                    await RNIap.requestPurchase({ skus: [productId] });
                } else {
                    console.log("DEBUG: Found offerToken:", offerToken);
                    // 3. ADIM: Doğru formatta satın alma isteği gönder (RNIap v14+)
                    const purchaseParams = {
                        type: 'subs',
                        request: {
                            android: {
                                skus: [productId],
                                subscriptionOffers: [{
                                    sku: productId,
                                    offerToken: offerToken
                                }]
                            }
                        }
                    };

                    console.log("DEBUG: Requesting purchase with:", JSON.stringify(purchaseParams));
                    await RNIap.requestPurchase(purchaseParams);
                }

                // Listener sonucu bekleniyor...
                setTimeout(() => {
                    clearTimeout(failSafeTimer);
                    setIsProcessing(false);
                    releaseLock();
                }, 3000);

            } else {
                Alert.alert('DEBUG HATA', `Ürün Google Play üzerinde bulunamadı.\nAranan ID: ${productId}\nLütfen Play Console'da ürünün aktif olduğunu ve test kullanıcısı olarak eklendiğinizi kontrol edin.`);
                clearTimeout(failSafeTimer);
                setIsProcessing(false);
                releaseLock();
            }
        } catch (e) {
            if (e.code === 'E_USER_CANCELLED') {
                // Cancelled
            } else {
                console.error("DEBUG Purchase Error: ", e);
                Alert.alert('DEBUG SATIN ALMA HATASI', `Kod: ${e.code}\nMesaj: ${e.message}`);
            }
            clearTimeout(failSafeTimer);
            setIsProcessing(false);
            releaseLock();
        }
    }, [connected]);

    const value = {
        isProcessing,
        currentSubscription,
        requestPurchase,
        restorePurchases: () => checkCurrentPurchases(false),
    };

    return <AndroidIAPContext.Provider value={value}>{children}</AndroidIAPContext.Provider>;
};
