import React, { createContext, useContext, useState, useEffect, useRef, useMemo } from 'react';
import { AppState } from 'react-native';
import { useLocation } from './LocationContext';
import { PrayerTimesAPI } from '../utils/prayerTimesApi';

const PrayerTimesContext = createContext(null);

const createDateFromTime = (timeStr) => {
    if (!timeStr) return null;
    const cleanTime = timeStr.split(' ')[0];
    const now = new Date();
    const [hours, minutes] = cleanTime.split(':').map(Number);
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
    // console.log(`Debug Time: ${cleanTime} -> ${date.toLocaleTimeString()} vs Now: ${now.toLocaleTimeString()}`);
    return date;
};

const toDayKey = (date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

export function PrayerTimesProvider({ children }) {
    const { location: userLocation, city: userCity, hasPermission, isLoading: locationLoading } = useLocation();

    const [dailyTimes, setDailyTimes] = useState([]);
    const [monthlyTimes, setMonthlyTimes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [displayCity, setDisplayCity] = useState('Konum alınıyor...');

    const appState = useRef(AppState.currentState);
    const lastFetchDate = useRef(null);

    const todayKey = useMemo(() => toDayKey(new Date()), []);

    // Günlük vakitleri çek
    const fetchDailyTimes = async () => {
        try {
            const { data, displayCity: city } = await PrayerTimesAPI.fetchDailyTimes(
                userLocation,
                userCity,
                hasPermission
            );

            setDailyTimes(data);
            setDisplayCity(city);
            lastFetchDate.current = toDayKey(new Date());
        } catch (error) {
            console.error('🕌 PrayerTimesContext: Günlük vakitler alınamadı', error);
        }
    };

    // Aylık vakitleri çek
    const fetchMonthlyTimes = async () => {
        if (!hasPermission || !userLocation) {
            return;
        }

        try {
            const data = await PrayerTimesAPI.fetchMonthlyTimes(userLocation, hasPermission);

            // Verileri işle: Tarih string'ini Date objesine çevir ve geçmiş günleri filtrele
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const processedData = data
                .map(item => ({
                    ...item,
                    date: new Date(item.date)
                }))
                .filter(item => {
                    const itemDate = new Date(item.date);
                    itemDate.setHours(0, 0, 0, 0);
                    return itemDate >= today;
                });

            setMonthlyTimes(processedData);
        } catch (error) {
            console.error('🕌 PrayerTimesContext: Aylık vakitler alınamadı', error);
        }
    };

    // İlk yükleme - uygulama açılışında
    useEffect(() => {
        let mounted = true;

        const initialize = async () => {
            if (locationLoading) return;

            setLoading(true);

            // Paralel olarak hem günlük hem aylık vakitleri çek
            await Promise.all([
                fetchDailyTimes(),
                fetchMonthlyTimes()
            ]);

            if (mounted) {
                setLoading(false);
            }
        };

        initialize();

        return () => {
            mounted = false;
        };
    }, [userLocation, hasPermission, locationLoading]);

    // Gün değişimi kontrolü - gece yarısında otomatik yenileme
    useEffect(() => {
        const checkDayChange = () => {
            const currentDay = toDayKey(new Date());
            if (lastFetchDate.current && lastFetchDate.current !== currentDay) {

                fetchDailyTimes();
                fetchMonthlyTimes();
            }
        };

        // Her dakika kontrol et (performans için her saniye değil)
        const interval = setInterval(checkDayChange, 60 * 1000);

        return () => clearInterval(interval);
    }, [userLocation, hasPermission]);

    // Uygulama arka plandan döndüğünde kontrol et
    useEffect(() => {
        const subscription = AppState.addEventListener('change', async (nextAppState) => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                const currentDay = toDayKey(new Date());
                if (lastFetchDate.current && lastFetchDate.current !== currentDay) {

                    await fetchDailyTimes();
                    await fetchMonthlyTimes();
                }
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, [userLocation, hasPermission]);

    // Namaz Durumu için gerekli hesaplamalar
    const arrived = useMemo(() => {
        if (!dailyTimes || dailyTimes.length === 0) {
            return { sabah: false, ogle: false, ikindi: false, aksam: false, yatsi: false };
        }

        const now = new Date();

        // dailyTimes formatı: [{ label: 'İmsak', time: '06:43' }, ...]
        // Namaz Durumu için sadece 5 vakit lazım (İmsak ve Güneş hariç)
        const prayerMap = {};
        dailyTimes.forEach(prayer => {
            const label = prayer.label.toLocaleLowerCase('tr-TR');
            if (label.includes('öğle') || label.includes('ogle')) prayerMap.ogle = prayer.time;
            else if (label.includes('ikindi')) prayerMap.ikindi = prayer.time;
            else if (label.includes('akşam') || label.includes('aksam')) prayerMap.aksam = prayer.time;
            else if (label.includes('yatsı') || label.includes('yatsi')) prayerMap.yatsi = prayer.time;
            else if (label.includes('imsak') || label.includes('sabah')) prayerMap.sabah = prayer.time;
        });

        return {
            sabah: createDateFromTime(prayerMap.sabah) <= now,
            ogle: createDateFromTime(prayerMap.ogle) <= now,
            ikindi: createDateFromTime(prayerMap.ikindi) <= now,
            aksam: createDateFromTime(prayerMap.aksam) <= now,
            yatsi: createDateFromTime(prayerMap.yatsi) <= now,
        };
    }, [dailyTimes]);

    // Şu anki vakit
    const currentPrayerKey = useMemo(() => {
        if (!dailyTimes || dailyTimes.length === 0) return null;

        const now = new Date();
        const prayerMap = {};

        dailyTimes.forEach(prayer => {
            const label = prayer.label.toLocaleLowerCase('tr-TR');
            if (label.includes('öğle') || label.includes('ogle')) prayerMap.ogle = prayer.time;
            else if (label.includes('ikindi')) prayerMap.ikindi = prayer.time;
            else if (label.includes('akşam') || label.includes('aksam')) prayerMap.aksam = prayer.time;
            else if (label.includes('yatsı') || label.includes('yatsi')) prayerMap.yatsi = prayer.time;
            else if (label.includes('imsak') || label.includes('sabah')) prayerMap.sabah = prayer.time;
        });

        const keys = ['yatsi', 'aksam', 'ikindi', 'ogle', 'sabah'];

        for (const key of keys) {
            if (prayerMap[key] && createDateFromTime(prayerMap[key]) <= now) {
                return key;
            }
        }

        return null;
    }, [dailyTimes]);

    const value = useMemo(() => ({
        // Günlük vakitler (Home, Namaz Durumu, Hatırlatıcı için)
        dailyTimes,
        todayKey,
        arrived,
        currentPrayerKey,

        // Aylık vakitler (İmsakiye için)
        monthlyTimes,

        // Ortak
        loading,
        displayCity,

        // Manuel yenileme
        refreshPrayerTimes: async () => {
            await fetchDailyTimes();
            await fetchMonthlyTimes();
        }
    }), [dailyTimes, monthlyTimes, todayKey, arrived, currentPrayerKey, loading, displayCity]);

    return (
        <PrayerTimesContext.Provider value={value}>
            {children}
        </PrayerTimesContext.Provider>
    );
}

export function usePrayerTimes() {
    const context = useContext(PrayerTimesContext);
    if (!context) {
        throw new Error('usePrayerTimes must be used within a PrayerTimesProvider');
    }
    return context;
}
