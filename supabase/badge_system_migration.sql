-- 1. YENI TABLOLAR
CREATE TABLE IF NOT EXISTS public.badges (
    id TEXT PRIMARY KEY, -- 'namaz_streak_7', 'namaz_total_100' vb.
    category TEXT NOT NULL, -- 'namaz', 'kuran', 'ilim'
    title TEXT NOT NULL,
    description TEXT,
    target_value INTEGER NOT NULL,
    rule_type TEXT NOT NULL, -- 'streak', 'total_count', 'cumulative_days'
    icon_key TEXT, -- 'namaz1', 'namaz2' vb. frontend mapping için
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

-- 2. USER_STATS GÜNCELLEME
-- 'total_full_prayer_days': Sadece tüm vakitlerin kılındığı gün sayısı (30 gün görevi için streak bozulsa da artar)
ALTER TABLE public.user_stats 
ADD COLUMN IF NOT EXISTS total_full_prayer_days INTEGER DEFAULT 0;


-- 3. BADGE TANIMLARI (Senin verdiğin kurallara göre)
INSERT INTO public.badges (id, category, title, description, target_value, rule_type, icon_key) VALUES
('namaz_streak_1', 'namaz', 'Vakit', 'Bir gün boyunca tüm vakitleri kıl.', 1, 'streak', '1'),
('namaz_streak_7', 'namaz', 'Düzen', '7 gün boyunca hiçbir vakti boş bırakma.', 7, 'streak', '2'),
('namaz_days_30', 'namaz', 'İstikrar', '30 gün boyunca günlük namazlarını işaretle.', 30, 'cumulative_days', '3'), -- Streak DEĞİL, Cumulative
('namaz_total_100', 'namaz', 'Huzur', 'Toplam 100 vakit namaz kıl.', 100, 'total_count', '4'),
('namaz_total_200', 'namaz', 'Sabır', 'Yıl içinde en az 200 vakit işaretle.', 200, 'total_count', '5'),
('namaz_total_1000', 'namaz', 'Sükûnet', 'Toplam 1.000 namaz vakti işaretle.', 1000, 'total_count', '6'),
('namaz_total_2500', 'namaz', 'İhsan', 'Toplam 2.500 vakit namaz kıl.', 2500, 'total_count', '7')
ON CONFLICT (id) DO NOTHING;


-- 4. GELİŞMİŞ CRON FONKSİYONU (Rozet Mantığı Dahil)
CREATE OR REPLACE FUNCTION process_missed_prayers_and_badges(target_date DATE)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    u_record RECORD;
    
    -- Namaz durumu değişkenleri
    missed_count INT;
    daily_total INT; -- O gün kılınan toplam namaz (0 ile 5 arası)
    is_perfect_day BOOLEAN;
    
    nc jsonb;
    
    -- Badge döngüsü için
    badge_rec RECORD;
    user_streak INT;
    user_total INT;
    user_full_days INT;
    
    badge_progress INT;
    badge_completed BOOLEAN;
BEGIN
    FOR u_record IN 
        SELECT 
            p.id as user_id, 
            d.namaz_completed,
            -- user_stats verilerini de çekelim (kilitleme yapmadan okuma)
            us.prayer_streak,
            us.total_prayers,
            us.total_full_prayer_days
        FROM profiles p
        LEFT JOIN daily_user_stats d ON p.id = d.user_id AND d.date_key = target_date
        LEFT JOIN user_stats us ON p.id = us.user_id
    LOOP
        nc := u_record.namaz_completed;
        
        -- Günlük Namaz Analizi
        -- Eğer kayıt yoksa (NULL) hepsi false kabul edilir.
        daily_total := 0;
        IF COALESCE((nc->>'sabah')::boolean, false) THEN daily_total := daily_total + 1; END IF;
        IF COALESCE((nc->>'ogle')::boolean, false) THEN daily_total := daily_total + 1; END IF;
        IF COALESCE((nc->>'ikindi')::boolean, false) THEN daily_total := daily_total + 1; END IF;
        IF COALESCE((nc->>'aksam')::boolean, false) THEN daily_total := daily_total + 1; END IF;
        IF COALESCE((nc->>'yatsi')::boolean, false) THEN daily_total := daily_total + 1; END IF;
        
        -- Vitir kaza için önemlidir ama '5 vakit tam' kontrolünde genelde farzlar sayılır. 
        -- Senin mantığına göre vitir, yatsıya bağlı kaza yazılıyor, biz burada 5 vakit üzerinden gidiyoruz.
        
        missed_count := 5 - daily_total;
        is_perfect_day := (missed_count = 0);

        -- == 1. KAZA ve İSTATİSTİK GÜNCELLEME ==
        
        -- Kaza Ekleme (Varsa)
        IF missed_count > 0 THEN
            INSERT INTO kaza_counters (user_id, namaz_counts, updated_at)
            VALUES (
                u_record.user_id,
                jsonb_build_object(
                    'sabah', CASE WHEN COALESCE((nc->>'sabah')::boolean, false) THEN 0 ELSE 1 END,
                    'ogle', CASE WHEN COALESCE((nc->>'ogle')::boolean, false) THEN 0 ELSE 1 END,
                    'ikindi', CASE WHEN COALESCE((nc->>'ikindi')::boolean, false) THEN 0 ELSE 1 END,
                    'aksam', CASE WHEN COALESCE((nc->>'aksam')::boolean, false) THEN 0 ELSE 1 END,
                    'yatsi', CASE WHEN COALESCE((nc->>'yatsi')::boolean, false) THEN 0 ELSE 1 END,
                    'vitir', CASE WHEN COALESCE((nc->>'yatsi')::boolean, false) THEN 0 ELSE 1 END -- Yatsı yoksa vitir de kaza
                ),
                now()
            )
            ON CONFLICT (user_id) DO UPDATE
            SET namaz_counts = jsonb_build_object(
                'sabah', COALESCE((kaza_counters.namaz_counts->>'sabah')::int, 0) + CASE WHEN COALESCE((nc->>'sabah')::boolean, false) THEN 0 ELSE 1 END,
                'ogle', COALESCE((kaza_counters.namaz_counts->>'ogle')::int, 0) + CASE WHEN COALESCE((nc->>'ogle')::boolean, false) THEN 0 ELSE 1 END,
                'ikindi', COALESCE((kaza_counters.namaz_counts->>'ikindi')::int, 0) + CASE WHEN COALESCE((nc->>'ikindi')::boolean, false) THEN 0 ELSE 1 END,
                'aksam', COALESCE((kaza_counters.namaz_counts->>'aksam')::int, 0) + CASE WHEN COALESCE((nc->>'aksam')::boolean, false) THEN 0 ELSE 1 END,
                'yatsi', COALESCE((kaza_counters.namaz_counts->>'yatsi')::int, 0) + CASE WHEN COALESCE((nc->>'yatsi')::boolean, false) THEN 0 ELSE 1 END,
                'vitir', COALESCE((kaza_counters.namaz_counts->>'vitir')::int, 0) + CASE WHEN COALESCE((nc->>'yatsi')::boolean, false) THEN 0 ELSE 1 END
            ),
            updated_at = now();
        END IF;

        -- User Stats Güncelleme (Streak ve Total Full Days)
        -- Bellekteki değerleri güncelleyelim ki aşağıda badge kontrolünde taze veri kullanalım
        IF is_perfect_day THEN
            user_streak := COALESCE(u_record.prayer_streak, 0) + 1;
            user_full_days := COALESCE(u_record.total_full_prayer_days, 0) + 1;
        ELSE
            user_streak := 0;
            user_full_days := COALESCE(u_record.total_full_prayer_days, 0); -- Artmaz ama SIFIRLANMAZ (Kalıcı)
        END IF;
        
        -- Toplam namaza bugünküleri ekle
        user_total := COALESCE(u_record.total_prayers, 0) + daily_total;

        -- Veritabanına yaz
        UPDATE user_stats SET 
            prayer_streak = user_streak,
            total_full_prayer_days = user_full_days,
            total_prayers = user_total
        WHERE user_id = u_record.user_id;


        -- == 2. ROZET (BADGE) KONTROLÜ ==
        -- Tüm namaz rozetlerini döngüye al
        FOR badge_rec IN SELECT * FROM badges WHERE category = 'namaz' LOOP
            
            badge_progress := 0;
            badge_completed := FALSE;

            -- Kural Tipi Kontrolü
            IF badge_rec.rule_type = 'streak' THEN
                -- Streak: Mevcut streak hedefe ulaştı mı?
                badge_progress := user_streak;
                IF user_streak >= badge_rec.target_value THEN badge_completed := TRUE; END IF;
            
            ELSIF badge_rec.rule_type = 'cumulative_days' THEN
                -- Cumulative: 'total_full_prayer_days' hedefe ulaştı mı? (Sıfırlanmaz)
                badge_progress := user_full_days;
                IF user_full_days >= badge_rec.target_value THEN badge_completed := TRUE; END IF;
            
            ELSIF badge_rec.rule_type = 'total_count' THEN
                -- Total: 'total_prayers' hedefe ulaştı mı?
                badge_progress := user_total;
                IF user_total >= badge_rec.target_value THEN badge_completed := TRUE; END IF;
            END IF;

            -- User Badges Tablosuna Yaz (Upsert)
            -- Eğer daha önce tamamlandıysa (is_completed=true), tekrar false yapma!
            INSERT INTO user_badges (user_id, badge_id, current_progress, is_completed, completed_at, updated_at)
            VALUES (
                u_record.user_id, 
                badge_rec.id, 
                badge_progress, 
                badge_completed, 
                CASE WHEN badge_completed THEN now() ELSE NULL END,
                now()
            )
            ON CONFLICT (user_id, badge_id) DO UPDATE
            SET 
                -- İlerleme her zaman güncellenir (Düşebilir de, streak bozulursa)
                current_progress = EXCLUDED.current_progress,
                -- Tamamlandıysa dokunma, tamamlanmadıysa yeni durumu yaz
                is_completed = user_badges.is_completed OR EXCLUDED.is_completed,
                -- Tarih sadece ilk tamamlandığında yazılır
                completed_at = COALESCE(user_badges.completed_at, EXCLUDED.completed_at),
                updated_at = now();
                
        END LOOP;

    END LOOP;
END;
$$;
