-- ==========================================
-- TAKVA APP - MASTER BADGE SYSTEM MIGRATION
-- (Schema, Data, Cron Logic, Real-Time Triggers)
-- ==========================================

-- 1. TABLOLARIN OLUŞTURULMASI
CREATE TABLE IF NOT EXISTS public.badges (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    target_value INTEGER NOT NULL,
    rule_type TEXT NOT NULL, -- 'streak', 'cumulative_days', 'total_count', 'yearly_total', 'max_count'
    icon_key TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.user_badges (
    user_id TEXT NOT NULL REFERENCES public.profiles(id),
    badge_id TEXT NOT NULL REFERENCES public.badges(id),
    is_completed BOOLEAN DEFAULT FALSE,
    current_progress INTEGER DEFAULT 0,
    completed_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    PRIMARY KEY (user_id, badge_id)
);

-- 2. USER_STATS TABLOSUNA GEREKLİ KOLONLARIN EKLENMESİ
ALTER TABLE public.user_stats 
ADD COLUMN IF NOT EXISTS total_full_prayer_days INTEGER DEFAULT 0;

ALTER TABLE public.user_stats 
ADD COLUMN IF NOT EXISTS year_prayers INTEGER DEFAULT 0;
-- Mevcut toplamları başlangıç için yıla eşitle (Sıfırdan başlamasın isteyenler için)
UPDATE public.user_stats SET year_prayers = total_prayers WHERE year_prayers = 0;


-- 3. ROZET TANIMLARI (NAMAZ + ZİKİR)
INSERT INTO public.badges (id, category, title, description, target_value, rule_type, icon_key) VALUES
-- Namaz
('namaz_streak_1', 'namaz', 'Vakit', 'Bir gün boyunca tüm vakitleri kıl.', 1, 'streak', '1'),
('namaz_streak_7', 'namaz', 'Düzen', '7 gün boyunca hiçbir vakti boş bırakma.', 7, 'streak', '2'),
('namaz_days_30', 'namaz', 'İstikrar', '30 gün boyunca günlük namazlarını işaretle.', 30, 'cumulative_days', '3'),
('namaz_total_100', 'namaz', 'Huzur', 'Toplam 100 vakit namaz kıl.', 100, 'total_count', '4'),
('namaz_total_200', 'namaz', 'Sabır', 'Yıl içinde en az 200 vakit işaretle (Yıllık).', 200, 'yearly_total', '5'),
('namaz_total_1000', 'namaz', 'Sükûnet', 'Toplam 1.000 namaz vakti işaretle.', 1000, 'total_count', '6'),
('namaz_total_2500', 'namaz', 'İhsan', 'Toplam 2.500 vakit namaz kıl.', 2500, 'total_count', '7'),
-- Zikir & Salavat
('zksl_total_100', 'zksl', 'Niyet', 'Toplam 100 zikir veya salavat yap.', 100, 'max_count', '1'),
('zksl_total_500', 'zksl', 'Adanış', 'Toplam 500 zikir veya salavat yap.', 500, 'max_count', '2'),
('zksl_total_1000', 'zksl', 'Teskin', 'Toplam 1.000 zikir veya salavat yap.', 1000, 'max_count', '3'),
('zksl_total_5000', 'zksl', 'Sabr', 'Toplam 5.000 zikir veya salavat yap.', 5000, 'max_count', '4'),
('zksl_total_10000', 'zksl', 'Sevda', 'Toplam 10.000 zikir veya salavat yap.', 10000, 'max_count', '5'),
('zksl_total_25000', 'zksl', 'Rahmet', 'Toplam 25.000 zikir veya salavat yap.', 25000, 'max_count', '6'),
('zksl_total_50000', 'zksl', 'Feyz', 'Toplam 50.000 zikir veya salavat yap.', 50000, 'max_count', '7')
ON CONFLICT (id) DO UPDATE 
SET 
    rule_type = EXCLUDED.rule_type,
    description = EXCLUDED.description,
    target_value = EXCLUDED.target_value;


-- 4. GECE 00:01'DE ÇALIŞACAK CRON FONKSİYONU (Streak, Kaza, Yıllık Reset)
-- Bu fonksiyon hem kazaları, hem streakleri, hem de yıllık döngüyü yönetir.
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
        
        -- Günlük Toplam
        daily_total := 0;
        IF COALESCE((nc->>'sabah')::boolean, false) THEN daily_total := daily_total + 1; END IF;
        IF COALESCE((nc->>'ogle')::boolean, false) THEN daily_total := daily_total + 1; END IF;
        IF COALESCE((nc->>'ikindi')::boolean, false) THEN daily_total := daily_total + 1; END IF;
        IF COALESCE((nc->>'aksam')::boolean, false) THEN daily_total := daily_total + 1; END IF;
        IF COALESCE((nc->>'yatsi')::boolean, false) THEN daily_total := daily_total + 1; END IF;
        
        missed_count := 5 - daily_total;
        is_perfect_day := (missed_count = 0);

        -- Kaza Ekleme
        IF missed_count > 0 THEN
            INSERT INTO kaza_counters (user_id, namaz_counts, updated_at)
            VALUES (u_record.user_id, jsonb_build_object('sabah', CASE WHEN COALESCE((nc->>'sabah')::boolean, false) THEN 0 ELSE 1 END, 'ogle', CASE WHEN COALESCE((nc->>'ogle')::boolean, false) THEN 0 ELSE 1 END, 'ikindi', CASE WHEN COALESCE((nc->>'ikindi')::boolean, false) THEN 0 ELSE 1 END, 'aksam', CASE WHEN COALESCE((nc->>'aksam')::boolean, false) THEN 0 ELSE 1 END, 'yatsi', CASE WHEN COALESCE((nc->>'yatsi')::boolean, false) THEN 0 ELSE 1 END, 'vitir', CASE WHEN COALESCE((nc->>'yatsi')::boolean, false) THEN 0 ELSE 1 END), now())
            ON CONFLICT (user_id) DO UPDATE
            SET namaz_counts = jsonb_build_object('sabah', COALESCE((kaza_counters.namaz_counts->>'sabah')::int, 0) + CASE WHEN COALESCE((nc->>'sabah')::boolean, false) THEN 0 ELSE 1 END, 'ogle', COALESCE((kaza_counters.namaz_counts->>'ogle')::int, 0) + CASE WHEN COALESCE((nc->>'ogle')::boolean, false) THEN 0 ELSE 1 END, 'ikindi', COALESCE((kaza_counters.namaz_counts->>'ikindi')::int, 0) + CASE WHEN COALESCE((nc->>'ikindi')::boolean, false) THEN 0 ELSE 1 END, 'aksam', COALESCE((kaza_counters.namaz_counts->>'aksam')::int, 0) + CASE WHEN COALESCE((nc->>'aksam')::boolean, false) THEN 0 ELSE 1 END, 'yatsi', COALESCE((kaza_counters.namaz_counts->>'yatsi')::int, 0) + CASE WHEN COALESCE((nc->>'yatsi')::boolean, false) THEN 0 ELSE 1 END, 'vitir', COALESCE((kaza_counters.namaz_counts->>'vitir')::int, 0) + CASE WHEN COALESCE((nc->>'yatsi')::boolean, false) THEN 0 ELSE 1 END), updated_at = now();
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


-- 5. NAMAZ İÇİN ANLIK TETİKLEYİCİ (TRIGGER)
-- Kullanıcı bir namazı işaretlediği an (Cron'u beklemeden) istatistikleri ve sayısal rozetleri günceller.
CREATE OR REPLACE FUNCTION handle_daily_stats_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    delta INT := 0;
    nc_old jsonb; nc_new jsonb;
    old_daily_total INT := 0; new_daily_total INT := 0;
    u_stats RECORD;
    badge_rec RECORD;
    badge_progress INT;
    badge_completed BOOLEAN;
BEGIN
    IF OLD.namaz_completed IS NOT DISTINCT FROM NEW.namaz_completed THEN RETURN NEW; END IF;

    nc_old := OLD.namaz_completed; nc_new := NEW.namaz_completed;
    -- Old Total
    IF COALESCE((nc_old->>'sabah')::boolean, false) THEN old_daily_total := old_daily_total + 1; END IF;
    IF COALESCE((nc_old->>'ogle')::boolean, false) THEN old_daily_total := old_daily_total + 1; END IF;
    IF COALESCE((nc_old->>'ikindi')::boolean, false) THEN old_daily_total := old_daily_total + 1; END IF;
    IF COALESCE((nc_old->>'aksam')::boolean, false) THEN old_daily_total := old_daily_total + 1; END IF;
    IF COALESCE((nc_old->>'yatsi')::boolean, false) THEN old_daily_total := old_daily_total + 1; END IF;
    -- New Total
    IF COALESCE((nc_new->>'sabah')::boolean, false) THEN new_daily_total := new_daily_total + 1; END IF;
    IF COALESCE((nc_new->>'ogle')::boolean, false) THEN new_daily_total := new_daily_total + 1; END IF;
    IF COALESCE((nc_new->>'ikindi')::boolean, false) THEN new_daily_total := new_daily_total + 1; END IF;
    IF COALESCE((nc_new->>'aksam')::boolean, false) THEN new_daily_total := new_daily_total + 1; END IF;
    IF COALESCE((nc_new->>'yatsi')::boolean, false) THEN new_daily_total := new_daily_total + 1; END IF;

    delta := new_daily_total - old_daily_total;
    IF delta = 0 THEN RETURN NEW; END IF;

    -- User Stats Güncelle
    UPDATE user_stats 
    SET 
        total_prayers = COALESCE(total_prayers, 0) + delta,
        year_prayers = COALESCE(year_prayers, 0) + delta
    WHERE user_id = NEW.user_id
    RETURNING * INTO u_stats;

    -- Anlık Rozet Kontrolü (Sadece Sayısal Olanlar)
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

DROP TRIGGER IF EXISTS on_daily_stats_update ON daily_user_stats;
CREATE TRIGGER on_daily_stats_update AFTER UPDATE ON daily_user_stats FOR EACH ROW EXECUTE FUNCTION handle_daily_stats_change();


-- 6. ZİKİR VE SALAVAT İÇİN ANLIK TETİKLEYİCİ (TRIGGER)
CREATE OR REPLACE FUNCTION handle_user_stats_change()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    badge_rec RECORD;
    badge_progress BIGINT;
    badge_completed BOOLEAN;
    current_max BIGINT;
BEGIN
    IF OLD.total_dhikr IS NOT DISTINCT FROM NEW.total_dhikr AND OLD.total_salavat IS NOT DISTINCT FROM NEW.total_salavat THEN
        RETURN NEW;
    END IF;

    current_max := GREATEST(COALESCE(NEW.total_dhikr, 0), COALESCE(NEW.total_salavat, 0));

    FOR badge_rec IN SELECT * FROM badges WHERE category = 'zksl' LOOP
        badge_progress := current_max;
        badge_completed := (current_max >= badge_rec.target_value);

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

DROP TRIGGER IF EXISTS on_user_stats_update ON user_stats;
CREATE TRIGGER on_user_stats_update AFTER UPDATE ON user_stats FOR EACH ROW EXECUTE FUNCTION handle_user_stats_change();
