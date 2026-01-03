-- 1. YENI KOLON EKLEME: Yıllık Sayaç
ALTER TABLE public.user_stats 
ADD COLUMN IF NOT EXISTS year_prayers INTEGER DEFAULT 0;

-- Mevcut toplamları bu yılın toplamı gibi varsayalım (Başlangıç için)
UPDATE public.user_stats SET year_prayers = total_prayers WHERE year_prayers = 0;

-- 2. ROZET KURALINI GÜNCELLEME
-- 5. Görev (200 Vakit) artık 'yearly_total' tipinde olacak
UPDATE public.badges 
SET rule_type = 'yearly_total', description = 'Yıl içinde en az 200 vakit işaretle (Her yıl sıfırlanır).'
WHERE id = 'namaz_total_200';

-- 3. CRON FONKSİYONUNU GÜNCELLEME
CREATE OR REPLACE FUNCTION process_missed_prayers_and_badges(target_date DATE)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    u_record RECORD;
    
    -- Namaz durumu değişkenleri
    missed_count INT;
    daily_total INT; 
    is_perfect_day BOOLEAN;
    is_new_year BOOLEAN;
    
    nc jsonb;
    
    -- İstatistikler
    user_streak INT;
    user_total INT;
    user_full_days INT;
    user_year_total INT;
    
    -- Badge döngüsü için
    badge_rec RECORD;
    badge_progress INT;
    badge_completed BOOLEAN;
BEGIN
    -- Yılbaşı Kontrolü (1 Ocak mı?)
    is_new_year := (EXTRACT(MONTH FROM target_date) = 1 AND EXTRACT(DAY FROM target_date) = 1);

    FOR u_record IN 
        SELECT 
            p.id as user_id, 
            d.namaz_completed,
            -- user_stats verileri
            us.prayer_streak,
            us.total_prayers,
            us.total_full_prayer_days,
            us.year_prayers
        FROM profiles p
        LEFT JOIN daily_user_stats d ON p.id = d.user_id AND d.date_key = target_date
        LEFT JOIN user_stats us ON p.id = us.user_id
    LOOP
        nc := u_record.namaz_completed;
        
        -- Günlük Toplam Hesapla
        daily_total := 0;
        IF COALESCE((nc->>'sabah')::boolean, false) THEN daily_total := daily_total + 1; END IF;
        IF COALESCE((nc->>'ogle')::boolean, false) THEN daily_total := daily_total + 1; END IF;
        IF COALESCE((nc->>'ikindi')::boolean, false) THEN daily_total := daily_total + 1; END IF;
        IF COALESCE((nc->>'aksam')::boolean, false) THEN daily_total := daily_total + 1; END IF;
        IF COALESCE((nc->>'yatsi')::boolean, false) THEN daily_total := daily_total + 1; END IF;
        
        missed_count := 5 - daily_total;
        is_perfect_day := (missed_count = 0);

        -- == 1. KAZA ve İSTATİSTİK GÜNCELLEME ==
        -- (Kaza ekleme kodu aynı - kısaltıldı)
        IF missed_count > 0 THEN
            INSERT INTO kaza_counters (user_id, namaz_counts, updated_at)
            VALUES (u_record.user_id, jsonb_build_object('sabah', CASE WHEN COALESCE((nc->>'sabah')::boolean, false) THEN 0 ELSE 1 END, 'ogle', CASE WHEN COALESCE((nc->>'ogle')::boolean, false) THEN 0 ELSE 1 END, 'ikindi', CASE WHEN COALESCE((nc->>'ikindi')::boolean, false) THEN 0 ELSE 1 END, 'aksam', CASE WHEN COALESCE((nc->>'aksam')::boolean, false) THEN 0 ELSE 1 END, 'yatsi', CASE WHEN COALESCE((nc->>'yatsi')::boolean, false) THEN 0 ELSE 1 END, 'vitir', CASE WHEN COALESCE((nc->>'yatsi')::boolean, false) THEN 0 ELSE 1 END), now())
            ON CONFLICT (user_id) DO UPDATE
            SET namaz_counts = jsonb_build_object('sabah', COALESCE((kaza_counters.namaz_counts->>'sabah')::int, 0) + CASE WHEN COALESCE((nc->>'sabah')::boolean, false) THEN 0 ELSE 1 END, 'ogle', COALESCE((kaza_counters.namaz_counts->>'ogle')::int, 0) + CASE WHEN COALESCE((nc->>'ogle')::boolean, false) THEN 0 ELSE 1 END, 'ikindi', COALESCE((kaza_counters.namaz_counts->>'ikindi')::int, 0) + CASE WHEN COALESCE((nc->>'ikindi')::boolean, false) THEN 0 ELSE 1 END, 'aksam', COALESCE((kaza_counters.namaz_counts->>'aksam')::int, 0) + CASE WHEN COALESCE((nc->>'aksam')::boolean, false) THEN 0 ELSE 1 END, 'yatsi', COALESCE((kaza_counters.namaz_counts->>'yatsi')::int, 0) + CASE WHEN COALESCE((nc->>'yatsi')::boolean, false) THEN 0 ELSE 1 END, 'vitir', COALESCE((kaza_counters.namaz_counts->>'vitir')::int, 0) + CASE WHEN COALESCE((nc->>'yatsi')::boolean, false) THEN 0 ELSE 1 END), updated_at = now();
        END IF;

        -- İstatistikleri Hesapla
        IF is_perfect_day THEN
            user_streak := COALESCE(u_record.prayer_streak, 0) + 1;
            user_full_days := COALESCE(u_record.total_full_prayer_days, 0) + 1;
        ELSE
            user_streak := 0;
            user_full_days := COALESCE(u_record.total_full_prayer_days, 0); 
        END IF;
        
        user_total := COALESCE(u_record.total_prayers, 0) + daily_total;

        -- YILLIK SAYAÇ MANTIĞI 📅
        IF is_new_year THEN
            user_year_total := 0 + daily_total; -- Yılbaşında sıfırla ve bugünü ekle
        ELSE
            user_year_total := COALESCE(u_record.year_prayers, 0) + daily_total; -- Normal devam
        END IF;

        -- Veritabanına yaz
        UPDATE user_stats SET 
            prayer_streak = user_streak,
            total_full_prayer_days = user_full_days,
            total_prayers = user_total,
            year_prayers = user_year_total
        WHERE user_id = u_record.user_id;


        -- == 2. ROZET (BADGE) KONTROLÜ ==
        FOR badge_rec IN SELECT * FROM badges WHERE category = 'namaz' LOOP
            
            badge_progress := 0;
            badge_completed := FALSE;

            -- Kural Tipi Kontrolü
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
                -- Yeni Kural: Yıllık Sayaç
                badge_progress := user_year_total;
                IF user_year_total >= badge_rec.target_value THEN badge_completed := TRUE; END IF;
            END IF;

            -- User Badges Upsert
            -- is_completed mantığı: Eski değer TRUE ise asla FALSE olmaz. (OR logic)
            -- Progress: Her zaman güncel değeri (badge_progress) yazar. Yılbaşında badge_progress 0 olduğu için burası da 0 olur.
            INSERT INTO user_badges (user_id, badge_id, current_progress, is_completed, completed_at, updated_at)
            VALUES (u_record.user_id, badge_rec.id, badge_progress, badge_completed, CASE WHEN badge_completed THEN now() ELSE NULL END, now())
            ON CONFLICT (user_id, badge_id) DO UPDATE
            SET 
                current_progress = EXCLUDED.current_progress, -- Resetlenirse burası da resetlenir
                is_completed = user_badges.is_completed OR EXCLUDED.is_completed, -- Kazanılmışsa silinmez
                completed_at = COALESCE(user_badges.completed_at, EXCLUDED.completed_at),
                updated_at = now();
                
        END LOOP;

    END LOOP;
END;
$$;
