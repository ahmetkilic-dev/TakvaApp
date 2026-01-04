import React from 'react';
import { View, Text, InteractionManager } from 'react-native';
import TaskCard from './TaskCard';
import { useUserBadges } from './hooks/useUserBadges';

const fontFamily = 'Plus Jakarta Sans';

// ✅ STATIC: Component dışında, sadece bir kere yüklenir
const BADGE_ICONS = {
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

// 1. STATİK ROZET TANIMLARI (Bileşen dışında, her render'da baştan oluşmaz)
const BADGE_DEFINITIONS = [
    {
        category: "Kur'an Görevleri",
        iconKey: 'kuran',
        tasks: [
            { id: 'quran_verses_50', text: 'Toplam 50 ayet oku.', label: 'Adım', icon: 1, target: 50, route: '/(app)/(services)/quran' },
            { id: 'quran_verses_250', text: 'Toplam 250 ayet oku.', label: 'Süreç', icon: 2, target: 250, route: '/(app)/(services)/quran' },
            { id: 'quran_verses_1000', text: 'Toplam 1.000 ayet oku.', label: 'İlerleme', icon: 3, target: 1000, route: '/(app)/(services)/quran' },
            { id: 'quran_juzs_15', text: 'Toplam 15 cüz tamamla.', label: 'Cüz', icon: 4, target: 15, route: '/(app)/(services)/quran' },
            { id: 'quran_surahs_80', text: '80 farklı sureyi bitir.', label: 'Sure', icon: 5, target: 80, route: '/(app)/(services)/quran' },
            { id: 'quran_verses_5000', text: 'Toplam 5.000 ayet oku.', label: 'Nur', icon: 6, target: 5000, route: '/(app)/(services)/quran' },
            { id: 'quran_khatim_1', text: 'Kur’ân’ı baştan sona hatim et.', label: 'Hikmet', icon: 7, target: 1, route: '/(app)/(services)/quran' },
        ],
    },
    {
        category: 'Namaz Görevleri',
        iconKey: 'namaz',
        tasks: [
            { id: 'namaz_streak_1', text: 'Bir gün boyunca tüm vakitleri kıl ve işaretle.', label: 'Vakit', icon: 1, target: 1, route: '/(app)/(services)/namazdurumu' },
            { id: 'namaz_streak_7', text: '7 gün boyunca hiçbir vakti boş bırakma.', label: 'Düzen', icon: 2, target: 7, route: '/(app)/(services)/namazdurumu' },
            { id: 'namaz_days_30', text: '30 gün boyunca günlük namazlarını işaretle.', label: 'İstikrar', icon: 3, target: 30, route: '/(app)/(services)/namazdurumu' },
            { id: 'namaz_total_100', text: 'Toplam 100 vakit namaz kıl ve işaretle.', label: 'Huzur', icon: 4, target: 100, route: '/(app)/(services)/namazdurumu' },
            { id: 'namaz_total_200', text: 'Yıl içinde en az 200 vakit işaretle.', label: 'Sabır', icon: 5, target: 200, route: '/(app)/(services)/namazdurumu' },
            { id: 'namaz_total_1000', text: 'Toplam 1.000 namaz vakti işaretle.', label: 'Sükûnet', icon: 6, target: 1000, route: '/(app)/(services)/namazdurumu' },
            { id: 'namaz_total_2500', text: 'Toplam 2.500 vakit namaz kıl ve işaretle.', label: 'İhsan', icon: 7, target: 2500, route: '/(app)/(services)/namazdurumu' },
        ],
    },
    {
        category: 'Zikir & Salavat Görevleri',
        iconKey: 'zksl',
        tasks: [
            { id: 'zksl_total_100', text: 'Toplam 100 zikir veya salavat yap.', label: 'Niyet', icon: 1, target: 100, route: '/(app)/(services)/dhikr' },
            { id: 'zksl_total_500', text: 'Toplam 500 zikir veya salavat yap.', label: 'Adanış', icon: 2, target: 500, route: '/(app)/(services)/dhikr' },
            { id: 'zksl_total_1000', text: 'Toplam 1.000 zikir veya salavat yap.', label: 'Teskin', icon: 3, target: 1000, route: '/(app)/(services)/dhikr' },
            { id: 'zksl_total_5000', text: 'Toplam 5.000 zikir veya salavat yap.', label: 'Sabr', icon: 4, target: 5000, route: '/(app)/(services)/dhikr' },
            { id: 'zksl_total_10000', text: 'Toplam 10.000 zikir veya salavat yap.', label: 'Sevda', icon: 5, target: 10000, route: '/(app)/(services)/dhikr' },
            { id: 'zksl_total_25000', text: 'Toplam 25.000 zikir veya salavat yap.', label: 'Rahmet', icon: 6, target: 25000, route: '/(app)/(services)/dhikr' },
            { id: 'zksl_total_50000', text: 'Toplam 50.000 zikir veya salavat yap.', label: 'Feyz', icon: 7, target: 50000, route: '/(app)/(services)/dhikr' },
        ],
    },
    {
        category: 'İlim Görevleri',
        iconKey: 'ilim',
        tasks: [
            { id: 'ilim_total_5', text: '5 soruyu doğru cevapla.', label: 'Kıvılcım', icon: 1, target: 5, route: '/(app)/(services)/ilim' },
            { id: 'ilim_total_15', text: '15 soruyu doğru cevapla.', label: 'Araştırma', icon: 2, target: 15, route: '/(app)/(services)/ilim' },
            { id: 'ilim_total_30', text: '30 soruyu doğru cevapla.', label: 'Tahkik', icon: 3, target: 30, route: '/(app)/(services)/ilim' },
            { id: 'ilim_total_50', text: '50 soruyu doğru cevapla.', label: 'Marifet', icon: 4, target: 50, route: '/(app)/(services)/ilim' },
            { id: 'ilim_total_100', text: '100 soruyu doğru cevapla.', label: 'Hikmet', icon: 5, target: 100, route: '/(app)/(services)/ilim' },
            { id: 'ilim_total_200', text: '200 soruyu doğru cevapla.', label: 'İdrak', icon: 6, target: 200, route: '/(app)/(services)/ilim' },
            { id: 'ilim_total_500', text: '500 soruyu doğru cevapla.', label: 'İrfan', icon: 7, target: 500, route: '/(app)/(services)/ilim' },
        ],
    },
    {
        category: 'Uygulama Görevleri',
        iconKey: 'uygulama',
        tasks: [
            { id: 'app_share_1', text: 'Kelam’daki bir içeriği ilk kez paylaş.', label: 'Davet', icon: 1, target: 1, route: '/(app)/(tabs)/kelam' },
            { id: 'app_share_10', text: 'Toplam 10 içerik paylaş.', label: 'Tebliğ', icon: 2, target: 10, route: '/(app)/(tabs)/kelam' },
            { id: 'app_social_1', text: 'Takva’nın resmi sosyal medya hesaplarını takip et', label: 'Destek', icon: 3, target: 1, route: '/(app)/(services)/social' },
            { id: 'app_follow_10', text: '10 içerik üreticisini takip et.', label: 'Cemiyet', icon: 4, target: 10, route: '/(app)/(tabs)/kelam' },
            { id: 'app_entry_3', text: '3 gün üst üste uygulamaya giriş yap.', label: 'Süreklilik', icon: 5, target: 3, route: '/' },
            { id: 'app_entry_30', text: '30 gün boyunca düzenli giriş yap.', label: 'Sadakat', icon: 6, target: 30, route: '/' },
            { id: 'app_rating_1', text: 'Uygulamaya mağazada puan ver / yorum yap.', label: 'Minnet', icon: 7, target: 1, route: '/' },
        ],
    },
];

export const BadgeCategorySection = ({ stats, onTaskPress }) => {
    const { userBadges, loading: badgesLoading } = useUserBadges();

    // Lazy Load: İlk başta sadece 2 kategori göster, kalanı sonra yükle
    const [renderedCount, setRenderedCount] = React.useState(2);

    React.useEffect(() => {
        const task = InteractionManager.runAfterInteractions(() => {
            setRenderedCount(BADGE_DEFINITIONS.length);
        });
        return () => task.cancel();
    }, []);

    const visibleCategories = React.useMemo(() =>
        BADGE_DEFINITIONS.slice(0, renderedCount),
        [renderedCount]
    );

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
            {visibleCategories.map((category, categoryIndex) => (
                <View key={categoryIndex} style={{ marginBottom: categoryIndex === visibleCategories.length - 1 ? 0 : 32 }}>
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
                            icon={BADGE_ICONS[category.iconKey][task.icon]}
                            progress={getBadgeProgress(userBadges, task.id, 0)}
                            target={task.target}
                            onPress={() => onTaskPress(task.route)}
                        />
                    ))}
                </View>
            ))}
        </View>
    );
};

export default React.memo(BadgeCategorySection);

