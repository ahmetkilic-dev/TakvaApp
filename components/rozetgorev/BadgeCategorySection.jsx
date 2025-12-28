import React from 'react';
import { View, Text } from 'react-native';
import TaskCard from './TaskCard';

const fontFamily = 'Plus Jakarta Sans';

const badgeIcons = {
    kuran: {
        1: require('../../assets/İstatistikler/kuran1.png'),
        2: require('../../assets/İstatistikler/kuran2.png'),
        3: require('../../assets/İstatistikler/kuran3.png'),
        4: require('../../assets/İstatistikler/kuran4.png'),
        5: require('../../assets/İstatistikler/kuran5.png'),
        6: require('../../assets/İstatistikler/kuran6.png'),
        7: require('../../assets/İstatistikler/kuran7.png'),
    },
    namaz: {
        1: require('../../assets/İstatistikler/namaz1.png'),
        2: require('../../assets/İstatistikler/namaz2.png'),
        3: require('../../assets/İstatistikler/namaz3.png'),
        4: require('../../assets/İstatistikler/namaz4.png'),
        5: require('../../assets/İstatistikler/namaz5.png'),
        6: require('../../assets/İstatistikler/namaz6.png'),
        7: require('../../assets/İstatistikler/namaz7.png'),
    },
    zksl: {
        1: require('../../assets/İstatistikler/zksl1.png'),
        2: require('../../assets/İstatistikler/zksl2.png'),
        3: require('../../assets/İstatistikler/zksl3.png'),
        4: require('../../assets/İstatistikler/zksl4.png'),
        5: require('../../assets/İstatistikler/zksl5.png'),
        6: require('../../assets/İstatistikler/zksl6.png'),
        7: require('../../assets/İstatistikler/zksl7.png'),
    },
    ilim: {
        1: require('../../assets/İstatistikler/ilim1.png'),
        2: require('../../assets/İstatistikler/ilim2.png'),
        3: require('../../assets/İstatistikler/ilim3.png'),
        4: require('../../assets/İstatistikler/ilim4.png'),
        5: require('../../assets/İstatistikler/ilim5.png'),
        6: require('../../assets/İstatistikler/ilim6.png'),
        7: require('../../assets/İstatistikler/ilim7.png'),
    },
    uygulama: {
        1: require('../../assets/İstatistikler/uygulama1.png'),
        2: require('../../assets/İstatistikler/uygulama2.png'),
        3: require('../../assets/İstatistikler/uygulama3.png'),
        4: require('../../assets/İstatistikler/uygulama4.png'),
        5: require('../../assets/İstatistikler/uygulama5.png'),
        6: require('../../assets/İstatistikler/uygulama6.png'),
        7: require('../../assets/İstatistikler/uygulama7.png'),
    },
};

export const BadgeCategorySection = ({ stats, onTaskPress }) => {
    const badgeCategories = [
        {
            category: 'Kur\'an Görevleri',
            iconKey: 'kuran',
            tasks: [
                { text: 'Toplam 50 ayet oku.', label: 'Adım', icon: 1, target: 50, progress: stats.totalVerses, route: '/(app)/(services)/quran' },
                { text: 'Toplam 250 ayet oku.', label: 'Süreç', icon: 2, target: 250, progress: stats.totalVerses, route: '/(app)/(services)/quran' },
                { text: 'Toplam 1.000 ayet oku.', label: 'İlerleme', icon: 3, target: 1000, progress: stats.totalVerses, route: '/(app)/(services)/quran' },
                { text: 'Toplam 15 cüz tamamla.', label: 'Cüz', icon: 4, target: 15, progress: stats.totalJuzs, route: '/(app)/(services)/quran' },
                { text: '80 farklı sureyi bitir.', label: 'Sure', icon: 5, target: 80, progress: stats.totalSurahs, route: '/(app)/(services)/quran' },
                { text: 'Toplam 5.000 ayet oku.', label: 'Nur', icon: 6, target: 5000, progress: stats.totalVerses, route: '/(app)/(services)/quran' },
                { text: 'Kur’ân’ı baştan sona hatim et.', label: 'Hikmet', icon: 7, target: 1, progress: stats.totalKhatims, route: '/(app)/(services)/quran' },
            ],
        },
        {
            category: 'Namaz Görevleri',
            iconKey: 'namaz',
            tasks: [
                { text: 'Bir gün boyunca tüm vakitleri kıl ve işaretle.', label: 'Vakit', icon: 1, target: 5, progress: Math.min(5, stats.totalPrayers), route: '/(app)/(services)/namazdurumu' }, // This logic needs special handling for "streak" or "all in one day"
                { text: '7 gün boyunca hiçbir vakti boş bırakma.', label: 'Düzen', icon: 2, target: 35, progress: stats.prayerStreak >= 35 ? 35 : stats.prayerStreak, route: '/(app)/(services)/namazdurumu' },
                { text: '30 gün boyunca günlük namazlarını işaretle.', label: 'İstikrar', icon: 3, target: 150, progress: stats.prayerStreak >= 150 ? 150 : stats.prayerStreak, route: '/(app)/(services)/namazdurumu' },
                { text: 'Toplam 100 vakit namaz kıl ve işaretle.', label: 'Huzur', icon: 4, target: 100, progress: stats.totalPrayers, route: '/(app)/(services)/namazdurumu' },
                { text: 'Yıl içinde en az 200 vakit işaretle.', label: 'Sabır', icon: 5, target: 200, progress: stats.totalPrayers, route: '/(app)/(services)/namazdurumu' },
                { text: 'Toplam 1.000 namaz vakti işaretle.', label: 'Sükûnet', icon: 6, target: 1000, progress: stats.totalPrayers, route: '/(app)/(services)/namazdurumu' },
                { text: 'Toplam 2.500 vakit namaz kıl ve işaretle.', label: 'İhsan', icon: 7, target: 2500, progress: stats.totalPrayers, route: '/(app)/(services)/namazdurumu' },
            ],
        },
        {
            category: 'Zikir & Salavat Görevleri',
            iconKey: 'zksl',
            tasks: [
                { text: 'Toplam 100 zikir veya salavat yap.', label: 'Niyet', icon: 1, target: 100, progress: stats.dhikrCount, route: '/(app)/(services)/dhikr' },
                { text: 'Toplam 500 zikir veya salavat yap.', label: 'Adanış', icon: 2, target: 500, progress: stats.dhikrCount, route: '/(app)/(services)/dhikr' },
                { text: 'Toplam 1.000 zikir veya salavat yap.', label: 'Teskin', icon: 3, target: 1000, progress: stats.dhikrCount, route: '/(app)/(services)/dhikr' },
                { text: 'Toplam 5.000 zikir veya salavat yap.', label: 'Sabr', icon: 4, target: 5000, progress: stats.dhikrCount, route: '/(app)/(services)/dhikr' },
                { text: 'Toplam 10.000 zikir veya salavat yap.', label: 'Sevda', icon: 5, target: 10000, progress: stats.dhikrCount, route: '/(app)/(services)/dhikr' },
                { text: 'Toplam 25.000 zikir veya salavat yap.', label: 'Rahmet', icon: 6, target: 25000, progress: stats.dhikrCount, route: '/(app)/(services)/dhikr' },
                { text: 'Toplam 50.000 zikir veya salavat yap.', label: 'Feyz', icon: 7, target: 50000, progress: stats.dhikrCount, route: '/(app)/(services)/dhikr' },
            ],
        },
        {
            category: 'İlim Görevleri',
            iconKey: 'ilim',
            tasks: [
                { text: '5 soruyu doğru cevapla.', label: 'Kıvılcım', icon: 1, target: 5, progress: stats.quizCount, route: '/(app)/(services)/ilim' },
                { text: '15 soruyu doğru cevapla.', label: 'Araştırma', icon: 2, target: 15, progress: stats.quizCount, route: '/(app)/(services)/ilim' },
                { text: '30 soruyu doğru cevapla.', label: 'Tahkik', icon: 3, target: 30, progress: stats.quizCount, route: '/(app)/(services)/ilim' },
                { text: '50 soruyu doğru cevapla.', label: 'Marifet', icon: 4, target: 50, progress: stats.quizCount, route: '/(app)/(services)/ilim' },
                { text: '100 soruyu doğru cevapla.', label: 'Hikmet', icon: 5, target: 100, progress: stats.quizCount, route: '/(app)/(services)/ilim' },
                { text: '200 soruyu doğru cevapla.', label: 'İdrak', icon: 6, target: 200, progress: stats.quizCount, route: '/(app)/(services)/ilim' },
                { text: '500 soruyu doğru cevapla.', label: 'İrfan', icon: 7, target: 500, progress: stats.quizCount, route: '/(app)/(services)/ilim' },
            ],
        },
        {
            category: 'Uygulama Görevleri',
            iconKey: 'uygulama',
            tasks: [
                { text: 'Kelam’daki bir içeriği ilk kez paylaş.', label: 'Davet', icon: 1, target: 1, progress: stats.shares > 0 ? 1 : 0, route: '/(app)/(tabs)/kelam' },
                { text: 'Toplam 10 içerik paylaş.', label: 'Tebliğ', icon: 2, target: 10, progress: stats.shares, route: '/(app)/(tabs)/kelam' },
                { text: 'Takva’nın resmi sosyal medya hesaplarını takip et', label: 'Destek', icon: 3, target: 1, progress: stats.follows.includes('takva_social') ? 1 : 0, route: '/(app)/(services)/social' },
                { text: '10 içerik üreticisini takip et.', label: 'Cemiyet', icon: 4, target: 10, progress: stats.follows.length, route: '/(app)/(tabs)/kelam' },
                { text: '3 gün üst üste uygulamaya giriş yap.', label: 'Süreklilik', icon: 5, target: 3, progress: stats.loginStreak, route: '/' },
                { text: '30 gün boyunca düzenli giriş yap.', label: 'Sadakat', icon: 6, target: 30, progress: stats.loginStreak, route: '/' },
                { text: 'Uygulamaya mağazada puan ver / yorum yap.', label: 'Minnet', icon: 7, target: 1, progress: stats.rated ? 1 : 0, route: '/' },
            ],
        },
    ];

    return (
        <View style={{ marginBottom: 40 }}>
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
                <View key={categoryIndex} style={{ marginBottom: 32 }}>
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
                            onPress={() => onTaskPress(task.route)}
                        />
                    ))}
                </View>
            ))}
        </View>
    );
};

export default BadgeCategorySection;
