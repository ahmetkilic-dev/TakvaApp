-- App Category Badge Update Function
-- Çağrılma: Paylaşım, takip, login streak değişikliklerinde
-- Görev: Uygulama kategorisi rozetlerinin progress'ini güncelle

CREATE OR REPLACE FUNCTION update_app_badges(p_user_id TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_stats RECORD;
    v_profile RECORD;
    badge_rec RECORD;
    badge_progress INT;
    badge_completed BOOLEAN;
    v_following_count INT;
BEGIN
    -- Kullanıcı istatistiklerini ve profilini al
    SELECT * INTO v_stats FROM user_stats WHERE user_id = p_user_id;
    SELECT * INTO v_profile FROM profiles WHERE id = p_user_id;

    -- Following sayısını hesapla
    v_following_count := jsonb_array_length(COALESCE(v_profile.following, '[]'::jsonb));

    -- Tüm "uygulama" kategorisi rozetlerini döngüye al
    FOR badge_rec IN 
        SELECT * FROM badges WHERE category = 'uygulama'
    LOOP
        badge_progress := 0;
        badge_completed := FALSE;

        -- Paylaşım görevleri (app_share_1, app_share_10)
        IF badge_rec.id IN ('app_share_1', 'app_share_10') THEN
            badge_progress := COALESCE(v_stats.shares, 0);
            IF badge_progress >= badge_rec.target_value THEN
                badge_completed := TRUE;
            END IF;

        -- Takip görevi (app_follow_10)
        ELSIF badge_rec.id = 'app_follow_10' THEN
            badge_progress := v_following_count;
            IF badge_progress >= badge_rec.target_value THEN
                badge_completed := TRUE;
            END IF;

        -- Login streak görevleri (app_entry_3 = 30 gün, app_entry_30 = 365 gün)
        ELSIF badge_rec.id IN ('app_entry_3', 'app_entry_30') THEN
            badge_progress := COALESCE(v_stats.login_streak, 0);
            IF badge_progress >= badge_rec.target_value THEN
                badge_completed := TRUE;
            END IF;

        -- Sosyal medya görevi (app_social_1)
        ELSIF badge_rec.id = 'app_social_1' THEN
            badge_progress := CASE WHEN COALESCE(v_stats.followed_social, FALSE) THEN 1 ELSE 0 END;
            badge_completed := COALESCE(v_stats.followed_social, FALSE);

        -- Puan verme görevi (app_rating_1) - şimdilik pasif
        ELSIF badge_rec.id = 'app_rating_1' THEN
            badge_progress := CASE WHEN COALESCE(v_stats.rated, FALSE) THEN 1 ELSE 0 END;
            badge_completed := COALESCE(v_stats.rated, FALSE);
        END IF;

        -- Rozeti ekle veya güncelle
        INSERT INTO user_badges (user_id, badge_id, current_progress, is_completed, completed_at, updated_at)
        VALUES (
            p_user_id, 
            badge_rec.id, 
            badge_progress, 
            badge_completed,
            CASE WHEN badge_completed THEN now() ELSE NULL END,
            now()
        )
        ON CONFLICT (user_id, badge_id) DO UPDATE
        SET 
            current_progress = EXCLUDED.current_progress,
            is_completed = user_badges.is_completed OR EXCLUDED.is_completed,
            completed_at = COALESCE(user_badges.completed_at, EXCLUDED.completed_at),
            updated_at = now();
    END LOOP;
END;
$$;
