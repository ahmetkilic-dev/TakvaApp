-- BU TETİKLEYİCİ (TRIGGER) İLE ANLIK GÜNCELLEME SAĞLANIYOR ⚡

CREATE OR REPLACE FUNCTION handle_daily_stats_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    old_daily_total INT := 0;
    new_daily_total INT := 0;
    delta INT := 0;
    
    -- Badge değişkenleri
    u_stats RECORD;
    badge_rec RECORD;
    badge_progress INT;
    badge_completed BOOLEAN;
    
    -- Helper
    nc_old jsonb;
    nc_new jsonb;
BEGIN
    -- Sadece namaz_completed değiştiyse çalışsın
    IF OLD.namaz_completed IS NOT DISTINCT FROM NEW.namaz_completed THEN
        RETURN NEW;
    END IF;

    nc_old := OLD.namaz_completed;
    nc_new := NEW.namaz_completed;

    -- 1. ESKİ GÜNLÜK TOPLAM
    IF COALESCE((nc_old->>'sabah')::boolean, false) THEN old_daily_total := old_daily_total + 1; END IF;
    IF COALESCE((nc_old->>'ogle')::boolean, false) THEN old_daily_total := old_daily_total + 1; END IF;
    IF COALESCE((nc_old->>'ikindi')::boolean, false) THEN old_daily_total := old_daily_total + 1; END IF;
    IF COALESCE((nc_old->>'aksam')::boolean, false) THEN old_daily_total := old_daily_total + 1; END IF;
    IF COALESCE((nc_old->>'yatsi')::boolean, false) THEN old_daily_total := old_daily_total + 1; END IF;

    -- 2. YENİ GÜNLÜK TOPLAM
    IF COALESCE((nc_new->>'sabah')::boolean, false) THEN new_daily_total := new_daily_total + 1; END IF;
    IF COALESCE((nc_new->>'ogle')::boolean, false) THEN new_daily_total := new_daily_total + 1; END IF;
    IF COALESCE((nc_new->>'ikindi')::boolean, false) THEN new_daily_total := new_daily_total + 1; END IF;
    IF COALESCE((nc_new->>'aksam')::boolean, false) THEN new_daily_total := new_daily_total + 1; END IF;
    IF COALESCE((nc_new->>'yatsi')::boolean, false) THEN new_daily_total := new_daily_total + 1; END IF;

    delta := new_daily_total - old_daily_total;

    -- Değişiklik yoksa çık
    IF delta = 0 THEN
        RETURN NEW;
    END IF;

    -- 3. USER_STATS GÜNCELLE (Delta kadar artır/azalt)
    UPDATE user_stats 
    SET 
        total_prayers = COALESCE(total_prayers, 0) + delta,
        year_prayers = COALESCE(year_prayers, 0) + delta -- Yıllık sayacı da anlık artır
    WHERE user_id = NEW.user_id
    RETURNING * INTO u_stats;

    -- 4. ANLIK ROZET KONTROLÜ (Sadece Total ve Yearly olanlar için anlık kontrol yeterli)
    -- Streak ve Cumulative Days için en güvenlisi Cron job'dır çünkü geçmiş günleri analiz etmek gerekir.
    -- Ancak toplam sayıya dayalı rozetleri hemen verebiliriz.
    
    FOR badge_rec IN SELECT * FROM badges WHERE category = 'namaz' AND rule_type IN ('total_count', 'yearly_total') LOOP
        
        badge_progress := 0;
        badge_completed := FALSE;

        IF badge_rec.rule_type = 'total_count' THEN
            badge_progress := u_stats.total_prayers;
            IF u_stats.total_prayers >= badge_rec.target_value THEN badge_completed := TRUE; END IF;
        
        ELSIF badge_rec.rule_type = 'yearly_total' THEN
            badge_progress := u_stats.year_prayers;
            IF u_stats.year_prayers >= badge_rec.target_value THEN badge_completed := TRUE; END IF;
        END IF;

        -- Rozeti Yaz
        INSERT INTO user_badges (user_id, badge_id, current_progress, is_completed, completed_at, updated_at)
        VALUES (NEW.user_id, badge_rec.id, badge_progress, badge_completed, CASE WHEN badge_completed THEN now() ELSE NULL END, now())
        ON CONFLICT (user_id, badge_id) DO UPDATE
        SET 
            current_progress = EXCLUDED.current_progress,
            is_completed = user_badges.is_completed OR EXCLUDED.is_completed, 
            completed_at = COALESCE(user_badges.completed_at, EXCLUDED.completed_at),
            updated_at = now();

    END LOOP;

    RETURN NEW;
END;
$$;

-- Trigger'ı Oluştur (Eğer varsa önce siler)
DROP TRIGGER IF EXISTS on_daily_stats_update ON daily_user_stats;

CREATE TRIGGER on_daily_stats_update
AFTER UPDATE ON daily_user_stats
FOR EACH ROW
EXECUTE FUNCTION handle_daily_stats_change();
