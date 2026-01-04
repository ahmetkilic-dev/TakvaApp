import React from 'react';
import { View, Text, InteractionManager } from 'react-native';
import TaskCard from './TaskCard';
import { useUserBadges } from './hooks/useUserBadges';
import { useUserStats } from '../../contexts/UserStatsContext';
import { canUnlockBadge, BADGE_TIERS } from '../../constants/badgeTiers';

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

import { BADGE_DEFINITIONS } from '../../constants/badgeDefinitions';

export const BadgeCategorySection = ({ stats, onTaskPress }) => {
    const { userBadges, loading: badgesLoading } = useUserBadges();
    const { profile } = useUserStats();
    const userTier = profile?.premium_state || 'free';


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

                    {category.tasks.map((task, taskIndex) => {
                        const requiredTier = BADGE_TIERS[task.id] || 'free';
                        const isLocked = !canUnlockBadge(userTier, task.id);
                        return (
                            <TaskCard
                                key={`${categoryIndex}-${taskIndex}`}
                                text={task.text}
                                label={task.label}
                                icon={BADGE_ICONS[category.iconKey][task.icon]}
                                progress={getBadgeProgress(userBadges, task.id, 0)}
                                target={task.target}
                                onPress={() => onTaskPress(task.route)}
                                isLocked={isLocked}
                                requiredTier={requiredTier}
                            />
                        );
                    })}
                </View>
            ))}
        </View>
    );
};

export default React.memo(BadgeCategorySection);

