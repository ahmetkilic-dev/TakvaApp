import React from 'react';
import { View, Text } from 'react-native';
import TaskCard from './TaskCard';
import { useUserBadges } from './hooks/useUserBadges';

const fontFamily = 'Plus Jakarta Sans';

const badgeIcons = {
    kuran: {
        1: require('../../assets/statistics/kuran1.png'),
        2: require('../../assets/statistics/kuran2.png'),
        3: require('../../assets/statistics/kuran3.png'),
        4: require('../../assets/statistics/kuran4.png'),
        5: require('../../assets/statistics/kuran5.png'),
        6: require('../../assets/statistics/kuran6.png'),
        7: require('../../assets/statistics/kuran7.png'),
    },
    namaz: {
        1: require('../../assets/statistics/namaz1.png'),
        2: require('../../assets/statistics/namaz2.png'),
        3: require('../../assets/statistics/namaz3.png'),
        4: require('../../assets/statistics/namaz4.png'),
        5: require('../../assets/statistics/namaz5.png'),
        6: require('../../assets/statistics/namaz6.png'),
        7: require('../../assets/statistics/namaz7.png'),
    },
    zksl: {
        1: require('../../assets/statistics/zksl1.png'),
        2: require('../../assets/statistics/zksl2.png'),
        3: require('../../assets/statistics/zksl3.png'),
        4: require('../../assets/statistics/zksl4.png'),
        5: require('../../assets/statistics/zksl5.png'),
        6: require('../../assets/statistics/zksl6.png'),
        7: require('../../assets/statistics/zksl7.png'),
    },
    ilim: {
        1: require('../../assets/statistics/ilim1.png'),
        2: require('../../assets/statistics/ilim2.png'),
        3: require('../../assets/statistics/ilim3.png'),
        4: require('../../assets/statistics/ilim4.png'),
        5: require('../../assets/statistics/ilim5.png'),
        6: require('../../assets/statistics/ilim6.png'),
        7: require('../../assets/statistics/ilim7.png'),
    },
    uygulama: {
        1: require('../../assets/statistics/uygulama1.png'),
        2: require('../../assets/statistics/uygulama2.png'),
        3: require('../../assets/statistics/uygulama3.png'),
        4: require('../../assets/statistics/uygulama4.png'),
        5: require('../../assets/statistics/uygulama5.png'),
        6: require('../../assets/statistics/uygulama6.png'),
        7: require('../../assets/statistics/uygulama7.png'),
    },
};

// Yardımcı fonksiyon: Backend'den gelen progress verisini al, yoksa 0 döndür
const getBadgeProgress = (badgesMap, badgeId, fallback = 0) => {
    if (badgesMap && badgesMap[badgeId]) {
        // Eğer tamamlandıysa hedef değeri göster (ki %100 olsun), yoksa current_progress
        // Ancak kullanıcının isteği: Tamamlandıktan sonra bile düşmesin (ör: 30/1 olduğunda 30 kalsın).
        // SQL tarafı zaten current_progress'i koruyor. is_completed true olsa da koruyor.
        // Ama biz UI'da max(current, target) gösterimi yapabiliriz tamamlandıysa.
        // Şimdilik direkt current_progress verelim, çünkü SQL zaten mantığı yönetiyor.
        return badgesMap[badgeId].current_progress;
    }
    return fallback;
};

// Yardımcı fonksiyon: Tamamlandı mı?
const isBadgeCompleted = (badgesMap, badgeId) => {
    return badgesMap && badgesMap[badgeId] && badgesMap[badgeId].is_completed;
};

export const BadgeCategorySection = ({ stats, onTaskPress }) => {
    const { userBadges, loading: badgesLoading } = useUserBadges();

    const badgeCategories = [
        {
            category: 'Kur\'an Görevleri',
            iconKey: 'kuran',
            tasks: [
                { text: 'Toplam 50 ayet oku.', label: 'Adım', icon: 1, target: 50, progress: 0, route: '/(app)/(services)/quran' },
                { text: 'Toplam 250 ayet oku.', label: 'Süreç', icon: 2, target: 250, progress: 0, route: '/(app)/(services)/quran' },
                { text: 'Toplam 1.000 ayet oku.', label: 'İlerleme', icon: 3, target: 1000, progress: 0, route: '/(app)/(services)/quran' },
                { text: 'Toplam 15 cüz tamamla.', label: 'Cüz', icon: 4, target: 15, progress: 0, route: '/(app)/(services)/quran' },
                { text: '80 farklı sureyi bitir.', label: 'Sure', icon: 5, target: 80, progress: 0, route: '/(app)/(services)/quran' },
                { text: 'Toplam 5.000 ayet oku.', label: 'Nur', icon: 6, target: 5000, progress: 0, route: '/(app)/(services)/quran' },
                { text: 'Kur’ân’ı baştan sona hatim et.', label: 'Hikmet', icon: 7, target: 1, progress: 0, route: '/(app)/(services)/quran' },
            ],
        },
        {
            category: 'Namaz Görevleri',
            iconKey: 'namaz',
            // ARTIK PROGRESS backend'den (userBadges) geliyor!
            tasks: [
                {
                    text: 'Bir gün boyunca tüm vakitleri kıl ve işaretle.',
                    label: 'Vakit', icon: 1, target: 1,
                    progress: getBadgeProgress(userBadges, 'namaz_streak_1', 0),
                    completed: isBadgeCompleted(userBadges, 'namaz_streak_1'),
                    route: '/(app)/(services)/namazdurumu'
                },
                {
                    text: '7 gün boyunca hiçbir vakti boş bırakma.',
                    label: 'Düzen', icon: 2, target: 7,
                    progress: getBadgeProgress(userBadges, 'namaz_streak_7', 0),
                    completed: isBadgeCompleted(userBadges, 'namaz_streak_7'),
                    route: '/(app)/(services)/namazdurumu'
                },
                {
                    text: '30 gün boyunca günlük namazlarını işaretle.',
                    label: 'İstikrar', icon: 3, target: 30,
                    progress: getBadgeProgress(userBadges, 'namaz_days_30', 0),
                    completed: isBadgeCompleted(userBadges, 'namaz_days_30'),
                    route: '/(app)/(services)/namazdurumu'
                },
                {
                    text: 'Toplam 100 vakit namaz kıl ve işaretle.',
                    label: 'Huzur', icon: 4, target: 100,
                    progress: getBadgeProgress(userBadges, 'namaz_total_100', 0),
                    completed: isBadgeCompleted(userBadges, 'namaz_total_100'),
                    route: '/(app)/(services)/namazdurumu'
                },
                {
                    text: 'Yıl içinde en az 200 vakit işaretle.',
                    label: 'Sabır', icon: 5, target: 200,
                    progress: getBadgeProgress(userBadges, 'namaz_total_200', 0),
                    completed: isBadgeCompleted(userBadges, 'namaz_total_200'),
                    route: '/(app)/(services)/namazdurumu'
                },
                {
                    text: 'Toplam 1.000 namaz vakti işaretle.',
                    label: 'Sükûnet', icon: 6, target: 1000,
                    progress: getBadgeProgress(userBadges, 'namaz_total_1000', 0),
                    completed: isBadgeCompleted(userBadges, 'namaz_total_1000'),
                    route: '/(app)/(services)/namazdurumu'
                },
                {
                    text: 'Toplam 2.500 vakit namaz kıl ve işaretle.',
                    label: 'İhsan', icon: 7, target: 2500,
                    progress: getBadgeProgress(userBadges, 'namaz_total_2500', 0),
                    completed: isBadgeCompleted(userBadges, 'namaz_total_2500'),
                    route: '/(app)/(services)/namazdurumu'
                },
            ],
        },
        {
            category: 'Zikir & Salavat Görevleri',
            iconKey: 'zksl',
            // ARTIK PROGRESS backend'den (userBadges) geliyor!
            tasks: [
                {
                    text: 'Toplam 100 zikir veya salavat yap.',
                    label: 'Niyet', icon: 1, target: 100,
                    progress: getBadgeProgress(userBadges, 'zksl_total_100', 0),
                    completed: isBadgeCompleted(userBadges, 'zksl_total_100'),
                    route: '/(app)/(services)/dhikr'
                },
                {
                    text: 'Toplam 500 zikir veya salavat yap.',
                    label: 'Adanış', icon: 2, target: 500,
                    progress: getBadgeProgress(userBadges, 'zksl_total_500', 0),
                    completed: isBadgeCompleted(userBadges, 'zksl_total_500'),
                    route: '/(app)/(services)/dhikr'
                },
                {
                    text: 'Toplam 1.000 zikir veya salavat yap.',
                    label: 'Teskin', icon: 3, target: 1000,
                    progress: getBadgeProgress(userBadges, 'zksl_total_1000', 0),
                    completed: isBadgeCompleted(userBadges, 'zksl_total_1000'),
                    route: '/(app)/(services)/dhikr'
                },
                {
                    text: 'Toplam 5.000 zikir veya salavat yap.',
                    label: 'Sabr', icon: 4, target: 5000,
                    progress: getBadgeProgress(userBadges, 'zksl_total_5000', 0),
                    completed: isBadgeCompleted(userBadges, 'zksl_total_5000'),
                    route: '/(app)/(services)/dhikr'
                },
                {
                    text: 'Toplam 10.000 zikir veya salavat yap.',
                    label: 'Sevda', icon: 5, target: 10000,
                    progress: getBadgeProgress(userBadges, 'zksl_total_10000', 0),
                    completed: isBadgeCompleted(userBadges, 'zksl_total_10000'),
                    route: '/(app)/(services)/dhikr'
                },
                {
                    text: 'Toplam 25.000 zikir veya salavat yap.',
                    label: 'Rahmet', icon: 6, target: 25000,
                    progress: getBadgeProgress(userBadges, 'zksl_total_25000', 0),
                    completed: isBadgeCompleted(userBadges, 'zksl_total_25000'),
                    route: '/(app)/(services)/dhikr'
                },
                {
                    text: 'Toplam 50.000 zikir veya salavat yap.',
                    label: 'Feyz', icon: 7, target: 50000,
                    progress: getBadgeProgress(userBadges, 'zksl_total_50000', 0),
                    completed: isBadgeCompleted(userBadges, 'zksl_total_50000'),
                    route: '/(app)/(services)/dhikr'
                },
            ],
        },
        {
            category: 'İlim Görevleri',
            iconKey: 'ilim',
            // ARTIK PROGRESS backend'den (userBadges) geliyor!
            tasks: [
                {
                    text: '5 soruyu doğru cevapla.',
                    label: 'Kıvılcım', icon: 1, target: 5,
                    progress: getBadgeProgress(userBadges, 'ilim_total_5', 0),
                    completed: isBadgeCompleted(userBadges, 'ilim_total_5'),
                    route: '/(app)/(services)/ilim'
                },
                {
                    text: '15 soruyu doğru cevapla.',
                    label: 'Araştırma', icon: 2, target: 15,
                    progress: getBadgeProgress(userBadges, 'ilim_total_15', 0),
                    completed: isBadgeCompleted(userBadges, 'ilim_total_15'),
                    route: '/(app)/(services)/ilim'
                },
                {
                    text: '30 soruyu doğru cevapla.',
                    label: 'Tahkik', icon: 3, target: 30,
                    progress: getBadgeProgress(userBadges, 'ilim_total_30', 0),
                    completed: isBadgeCompleted(userBadges, 'ilim_total_30'),
                    route: '/(app)/(services)/ilim'
                },
                {
                    text: '50 soruyu doğru cevapla.',
                    label: 'Marifet', icon: 4, target: 50,
                    progress: getBadgeProgress(userBadges, 'ilim_total_50', 0),
                    completed: isBadgeCompleted(userBadges, 'ilim_total_50'),
                    route: '/(app)/(services)/ilim'
                },
                {
                    text: '100 soruyu doğru cevapla.',
                    label: 'Hikmet', icon: 5, target: 100,
                    progress: getBadgeProgress(userBadges, 'ilim_total_100', 0),
                    completed: isBadgeCompleted(userBadges, 'ilim_total_100'),
                    route: '/(app)/(services)/ilim'
                },
                {
                    text: '200 soruyu doğru cevapla.',
                    label: 'İdrak', icon: 6, target: 200,
                    progress: getBadgeProgress(userBadges, 'ilim_total_200', 0),
                    completed: isBadgeCompleted(userBadges, 'ilim_total_200'),
                    route: '/(app)/(services)/ilim'
                },
                {
                    text: '500 soruyu doğru cevapla.',
                    label: 'İrfan', icon: 7, target: 500,
                    progress: getBadgeProgress(userBadges, 'ilim_total_500', 0),
                    completed: isBadgeCompleted(userBadges, 'ilim_total_500'),
                    route: '/(app)/(services)/ilim'
                },
            ],
        },
        {
            category: 'Uygulama Görevleri',
            iconKey: 'uygulama',
            tasks: [
                { text: 'Kelam’daki bir içeriği ilk kez paylaş.', label: 'Davet', icon: 1, target: 1, progress: 0, route: '/(app)/(tabs)/kelam' },
                { text: 'Toplam 10 içerik paylaş.', label: 'Tebliğ', icon: 2, target: 10, progress: 0, route: '/(app)/(tabs)/kelam' },
                { text: 'Takva’nın resmi sosyal medya hesaplarını takip et', label: 'Destek', icon: 3, target: 1, progress: 0, route: '/(app)/(services)/social' },
                { text: '10 içerik üreticisini takip et.', label: 'Cemiyet', icon: 4, target: 10, progress: 0, route: '/(app)/(tabs)/kelam' },
                { text: '3 gün üst üste uygulamaya giriş yap.', label: 'Süreklilik', icon: 5, target: 3, progress: 0, route: '/' },
                { text: '30 gün boyunca düzenli giriş yap.', label: 'Sadakat', icon: 6, target: 30, progress: 0, route: '/' },
                { text: 'Uygulamaya mağazada puan ver / yorum yap.', label: 'Minnet', icon: 7, target: 1, progress: 0, route: '/' },
            ],
        },
    ];

    return (
        <View style={{ marginBottom: 0 }}>
            {/* Başlık ve Açıklama */}
            <Text
                style={{
                    fontFamily,
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#FFFFFF',
                    marginBottom: 8,
                    textAlign: 'center',
                }}
            >
                Rozet Görevleri
            </Text>
            <Text
                style={{
                    fontFamily,
                    fontSize: 10,
                    fontWeight: '400',
                    color: 'rgba(255, 255, 255, 0.6)',
                    marginBottom: 24,
                    lineHeight: 14,
                    textAlign: 'center',
                }}
            >
                Uzun vadeli hedefleri tamamlayarak rozetler kazan.
            </Text>

            {/* Kategoriler */}
            {badgeCategories.map((category, categoryIndex) => (
                <View key={categoryIndex} style={{ marginBottom: categoryIndex === badgeCategories.length - 1 ? 0 : 32 }}>
                    <Text
                        style={{
                            fontFamily,
                            fontSize: 16,
                            fontWeight: '700',
                            color: '#FFFFFF',
                            marginBottom: 16,
                            textAlign: 'left',
                        }}
                    >
                        {category.category}
                    </Text>

                    {category.tasks.map((task, taskIndex) => (
                        <TaskCard
                            key={`${categoryIndex}-${taskIndex}`}
                            text={task.text}
                            label={task.label}
                            icon={badgeIcons[category.iconKey][task.icon]}
                            progress={task.progress}
                            target={task.target}
                            isCompleted={task.completed} // Yeni prop: Direkt tamamlandı mı?
                            onPress={() => onTaskPress(task.route)}
                        />
                    ))}
                </View>
            ))}
        </View>
    );
};

export default React.memo(BadgeCategorySection);
