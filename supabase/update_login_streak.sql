-- Login Streak Tracking Function
-- Çağrılma: Her uygulama açılışında
-- Görev: Günlük giriş serisini takip et, rozetleri güncelle

CREATE OR REPLACE FUNCTION update_login_streak(p_user_id TEXT)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    v_last_login DATE;
    v_current_streak INT;
    v_today DATE := CURRENT_DATE;
BEGIN
    -- Mevcut streak ve son giriş tarihini al
    SELECT last_login, login_streak 
    INTO v_last_login, v_current_streak
    FROM user_stats
    WHERE user_id = p_user_id;

    -- Eğer hiç giriş yapılmamışsa
    IF v_last_login IS NULL THEN
        UPDATE user_stats
        SET login_streak = 1, 
            last_login = v_today,
            updated_at = now()
        WHERE user_id = p_user_id;
        
        -- Rozetleri güncelle
        PERFORM update_app_badges(p_user_id);
        RETURN;
    END IF;

    -- Bugün zaten giriş yapılmışsa, hiçbir şey yapma
    IF v_last_login = v_today THEN
        RETURN;
    END IF;

    -- Dün giriş yapılmışsa, streak'i artır
    IF v_last_login = v_today - INTERVAL '1 day' THEN
        UPDATE user_stats
        SET login_streak = COALESCE(login_streak, 0) + 1,
            last_login = v_today,
            updated_at = now()
        WHERE user_id = p_user_id;
    ELSE
        -- Streak kırıldı, 1'e sıfırla
        UPDATE user_stats
        SET login_streak = 1, 
            last_login = v_today,
            updated_at = now()
        WHERE user_id = p_user_id;
    END IF;

    -- Rozetleri güncelle
    PERFORM update_app_badges(p_user_id);
END;
$$;
