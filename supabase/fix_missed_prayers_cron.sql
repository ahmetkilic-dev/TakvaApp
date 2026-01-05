-- ==========================================
-- FIX MISSED PRAYERS CRON & FUNCTION (V4 - User Requested Revert)
-- ==========================================

-- 1. DROP LEGACY/INCORRECT FUNCTIONS
DROP FUNCTION IF EXISTS process_missed_prayers_for_date(date);
DROP FUNCTION IF EXISTS process_missed_prayers_and_badges(date);

-- 2. CREATE CORRECT FUNCTION (Robust Type Casting)
CREATE OR REPLACE FUNCTION process_missed_prayers_and_badges(target_date DATE)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    u_record RECORD;
    missed_count INT;
    daily_total INT; 
    is_perfect_day BOOLEAN;
    is_new_year BOOLEAN;
    nc jsonb;
    user_streak INT;
    user_total INT;
    user_full_days INT;
    user_year_total INT;
    badge_rec RECORD;
    badge_progress INT;
    badge_completed BOOLEAN;
    
    -- Missed flags (0 or 1)
    m_sabah INT; m_ogle INT; m_ikindi INT; m_aksam INT; m_yatsi INT; m_vitir INT;
BEGIN
    -- Yılbaşı Kontrolü
    is_new_year := (EXTRACT(MONTH FROM target_date) = 1 AND EXTRACT(DAY FROM target_date) = 1);

    FOR u_record IN 
        SELECT 
            p.id as user_id, 
            d.namaz_completed,
            us.prayer_streak,
            us.total_prayers,
            us.total_full_prayer_days,
            us.year_prayers
        FROM profiles p
        LEFT JOIN daily_user_stats d ON p.id = d.user_id AND d.date_key = target_date
        LEFT JOIN user_stats us ON p.id = us.user_id
    LOOP
        nc := u_record.namaz_completed;
        
        -- Günlük Toplam hesapla
        daily_total := 0;
        IF COALESCE((nc->>'sabah')::boolean, false) THEN daily_total := daily_total + 1; END IF;
        IF COALESCE((nc->>'ogle')::boolean, false) THEN daily_total := daily_total + 1; END IF;
        IF COALESCE((nc->>'ikindi')::boolean, false) THEN daily_total := daily_total + 1; END IF;
        IF COALESCE((nc->>'aksam')::boolean, false) THEN daily_total := daily_total + 1; END IF;
        IF COALESCE((nc->>'yatsi')::boolean, false) THEN daily_total := daily_total + 1; END IF;
        
        missed_count := 5 - daily_total;
        is_perfect_day := (missed_count = 0);

        -- Kaza Hesaplama (0 = kılındı/borç yok, 1 = kılınmadı/borç var)
        m_sabah := CASE WHEN COALESCE((nc->>'sabah')::boolean, false) THEN 0 ELSE 1 END;
        m_ogle := CASE WHEN COALESCE((nc->>'ogle')::boolean, false) THEN 0 ELSE 1 END;
        m_ikindi := CASE WHEN COALESCE((nc->>'ikindi')::boolean, false) THEN 0 ELSE 1 END;
        m_aksam := CASE WHEN COALESCE((nc->>'aksam')::boolean, false) THEN 0 ELSE 1 END;
        m_yatsi := CASE WHEN COALESCE((nc->>'yatsi')::boolean, false) THEN 0 ELSE 1 END;
        m_vitir := m_yatsi; -- Vitir yatsı ile aynı varsayılıyor

        -- Kaza Ekleme
        IF missed_count > 0 THEN
            INSERT INTO kaza_counters (user_id, namaz_counts, updated_at)
            VALUES (
                u_record.user_id, 
                jsonb_build_object(
                    'sabah', m_sabah, 
                    'ogle', m_ogle, 
                    'ikindi', m_ikindi, 
                    'aksam', m_aksam, 
                    'yatsi', m_yatsi, 
                    'vitir', m_vitir
                ), 
                now()
            )
            ON CONFLICT (user_id) DO UPDATE
            SET namaz_counts = jsonb_build_object(
                'sabah', COALESCE((kaza_counters.namaz_counts->>'sabah')::int, 0) + m_sabah,
                'ogle', COALESCE((kaza_counters.namaz_counts->>'ogle')::int, 0) + m_ogle,
                'ikindi', COALESCE((kaza_counters.namaz_counts->>'ikindi')::int, 0) + m_ikindi,
                'aksam', COALESCE((kaza_counters.namaz_counts->>'aksam')::int, 0) + m_aksam,
                'yatsi', COALESCE((kaza_counters.namaz_counts->>'yatsi')::int, 0) + m_yatsi,
                'vitir', COALESCE((kaza_counters.namaz_counts->>'vitir')::int, 0) + m_vitir
            ), 
            updated_at = now();
        END IF;

        -- İstatistik Güncelle
        IF is_perfect_day THEN
            user_streak := COALESCE(u_record.prayer_streak, 0) + 1;
            user_full_days := COALESCE(u_record.total_full_prayer_days, 0) + 1;
        ELSE
            user_streak := 0;
            user_full_days := COALESCE(u_record.total_full_prayer_days, 0); 
        END IF;
        
        user_total := COALESCE(u_record.total_prayers, 0) + daily_total;

        -- Yıllık Döngü
        IF is_new_year THEN
            user_year_total := 0 + daily_total; 
        ELSE
            user_year_total := COALESCE(u_record.year_prayers, 0) + daily_total; 
        END IF;

        UPDATE user_stats SET 
            prayer_streak = user_streak,
            total_full_prayer_days = user_full_days,
            total_prayers = user_total,
            year_prayers = user_year_total
        WHERE user_id = u_record.user_id;

        -- Rozet Kontrol (Namaz Kategorisi)
        FOR badge_rec IN SELECT * FROM badges WHERE category = 'namaz' LOOP
            badge_progress := 0;
            badge_completed := FALSE;

            IF badge_rec.rule_type = 'streak' THEN
                badge_progress := user_streak;
                IF user_streak >= badge_rec.target_value THEN badge_completed := TRUE; END IF;
            ELSIF badge_rec.rule_type = 'cumulative_days' THEN
                badge_progress := user_full_days;
                IF user_full_days >= badge_rec.target_value THEN badge_completed := TRUE; END IF;
            ELSIF badge_rec.rule_type = 'total_count' THEN
                badge_progress := user_total;
                IF user_total >= badge_rec.target_value THEN badge_completed := TRUE; END IF;
            ELSIF badge_rec.rule_type = 'yearly_total' THEN
                badge_progress := user_year_total;
                IF user_year_total >= badge_rec.target_value THEN badge_completed := TRUE; END IF;
            END IF;

            INSERT INTO user_badges (user_id, badge_id, current_progress, is_completed, completed_at, updated_at)
            VALUES (u_record.user_id, badge_rec.id, badge_progress, badge_completed, CASE WHEN badge_completed THEN now() ELSE NULL END, now())
            ON CONFLICT (user_id, badge_id) DO UPDATE
            SET 
                current_progress = EXCLUDED.current_progress,
                is_completed = user_badges.is_completed OR EXCLUDED.is_completed,
                completed_at = COALESCE(user_badges.completed_at, EXCLUDED.completed_at),
                updated_at = now();
        END LOOP;
    END LOOP;
END;
$$;

-- 3. UPDATE SCHEDULE AND CLEANUP
DO $$
BEGIN
    PERFORM cron.unschedule('daily-missed-prayers');
EXCEPTION WHEN OTHERS THEN
    NULL;
END $$;

-- Schedule new job: UTC 00:01 (Turkey 03:01)
-- Parametre: current_date - 1 (Çünkü ertesi güne geçtiğimiz için düne ait işlemi yapmalıyız)
SELECT cron.schedule('daily-missed-prayers', '1 0 * * *', $$select process_missed_prayers_and_badges(current_date - 1)$$);
