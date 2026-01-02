import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE = 'https://api.aladhan.com/v1';

export const PrayerTimesAPI = {
    /**
     * Günlük namaz vakitlerini getir
     * @param {Object} location - { latitude, longitude }
     * @param {string} city - Şehir adı (görüntüleme için)
     * @param {boolean} hasPermission - Konum izni var mı
     */
    async fetchDailyTimes(location, city, hasPermission) {
        const now = new Date();
        const dateStr = `${now.getDate()}-${now.getMonth() + 1}-${now.getFullYear()}`;

        let finalUrl;
        let cacheKey;
        let displayCity;

        if (hasPermission && location) {
            const lat = location.latitude.toFixed(2);
            const lon = location.longitude.toFixed(2);
            cacheKey = `@prayer_times_${dateStr}_${lat}_${lon}`;
            finalUrl = `${API_BASE}/timings/${dateStr}?latitude=${location.latitude}&longitude=${location.longitude}&method=13`;
            displayCity = city || 'Türkiye';
        } else {
            cacheKey = `@prayer_times_${dateStr}_istanbul`;
            finalUrl = `${API_BASE}/timings/${dateStr}?city=Istanbul&country=Turkey&method=13`;
            displayCity = 'İstanbul';
        }

        // 1. Cache kontrolü
        const cached = await AsyncStorage.getItem(cacheKey);
        if (cached) {
            return {
                data: JSON.parse(cached),
                displayCity,
                fromCache: true
            };
        }

        // 2. API çağrısı
        try {
            const response = await fetch(finalUrl);
            const result = await response.json();

            if (result.data && result.data.timings) {
                const t = result.data.timings;
                const mapping = [
                    { label: 'İmsak', time: t.Fajr },
                    { label: 'Güneş', time: t.Sunrise },
                    { label: 'Öğle', time: t.Dhuhr },
                    { label: 'İkindi', time: t.Asr },
                    { label: 'Akşam', time: t.Maghrib },
                    { label: 'Yatsı', time: t.Isha }
                ];

                // Cache'e kaydet
                await AsyncStorage.setItem(cacheKey, JSON.stringify(mapping));

                return {
                    data: mapping,
                    displayCity,
                    fromCache: false
                };
            }

            throw new Error('Veri formatı hatalı');
        } catch (error) {
            // Fallback data
            const fallback = [
                { label: 'İmsak', time: '06:43' }, { label: 'Güneş', time: '08:15' },
                { label: 'Öğle', time: '13:06' }, { label: 'İkindi', time: '15:24' },
                { label: 'Akşam', time: '17:44' }, { label: 'Yatsı', time: '19:10' }
            ];
            return {
                data: fallback,
                displayCity: 'İstanbul',
                fromCache: false,
                error: true
            };
        }
    },

    /**
     * Aylık namaz vakitlerini getir
     */
    async fetchMonthlyTimes(location, hasPermission) {
        if (!hasPermission || !location) {
            throw new Error('Konum izni gerekli');
        }

        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();
        const monthKey = `@prayer_month_${currentMonth}_${currentYear}_${location.latitude.toFixed(1)}`;

        // Aylık cache kontrolü
        const cached = await AsyncStorage.getItem(monthKey);
        if (cached) {
            return JSON.parse(cached);
        }

        const finalUrl = `${API_BASE}/calendar?month=${currentMonth}&year=${currentYear}&latitude=${location.latitude}&longitude=${location.longitude}&method=13`;

        const response = await fetch(finalUrl);
        const result = await response.json();

        if (!response.ok || result.code !== 200) {
            throw new Error('Namaz vakitleri alınamadı');
        }

        if (result && result.data && Array.isArray(result.data)) {
            const formattedData = result.data.map((day) => {
                const dateStr = day.date.gregorian.date;
                const [dayPart, monthPart, yearPart] = dateStr.split('-');
                const date = new Date(parseInt(yearPart), parseInt(monthPart) - 1, parseInt(dayPart));

                return {
                    date,
                    dateStr,
                    times: {
                        imsak: day.timings.Fajr.split(' ')[0],
                        gunes: day.timings.Sunrise.split(' ')[0],
                        ogle: day.timings.Dhuhr.split(' ')[0],
                        ikindi: day.timings.Asr.split(' ')[0],
                        aksam: day.timings.Maghrib.split(' ')[0],
                        yatsi: day.timings.Isha.split(' ')[0],
                    },
                };
            });

            // Aylık veriyi cache'le
            await AsyncStorage.setItem(monthKey, JSON.stringify(formattedData));
            return formattedData;
        }

        throw new Error('Veri parsing hatası');
    }
};
