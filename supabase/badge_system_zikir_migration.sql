-- 1. ZİKİR VE SALAVAT ROZETLERİNİ TANIMLA
INSERT INTO public.badges (id, category, title, description, target_value, rule_type, icon_key) VALUES
('zksl_total_100', 'zksl', 'Niyet', 'Toplam 100 zikir veya salavat yap.', 100, 'max_count', '1'),
('zksl_total_500', 'zksl', 'Adanış', 'Toplam 500 zikir veya salavat yap.', 500, 'max_count', '2'),
('zksl_total_1000', 'zksl', 'Teskin', 'Toplam 1.000 zikir veya salavat yap.', 1000, 'max_count', '3'),
('zksl_total_5000', 'zksl', 'Sabr', 'Toplam 5.000 zikir veya salavat yap.', 5000, 'max_count', '4'),
('zksl_total_10000', 'zksl', 'Sevda', 'Toplam 10.000 zikir veya salavat yap.', 10000, 'max_count', '5'),
('zksl_total_25000', 'zksl', 'Rahmet', 'Toplam 25.000 zikir veya salavat yap.', 25000, 'max_count', '6'),
('zksl_total_50000', 'zksl', 'Feyz', 'Toplam 50.000 zikir veya salavat yap.', 50000, 'max_count', '7')
ON CONFLICT (id) DO NOTHING;

-- 2. USER_STATS DEĞİŞİKLİĞİ İÇİN TRIGGER (Zikir/Salavat Anlık Kontrolü)
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
    -- Sadece zikir veya salavat değiştiyse çalışsın (Optimizasyon)
    IF OLD.total_dhikr IS NOT DISTINCT FROM NEW.total_dhikr AND OLD.total_salavat IS NOT DISTINCT FROM NEW.total_salavat THEN
        RETURN NEW;
    END IF;

    -- Mantık: "Zikir veya Salavat" dediği için hangisi büyükse onu baz alıyoruz.
    current_max := GREATEST(COALESCE(NEW.total_dhikr, 0), COALESCE(NEW.total_salavat, 0));

    -- Zikir Rozetlerini Kontrol Et
    FOR badge_rec IN SELECT * FROM badges WHERE category = 'zksl' LOOP
        
        badge_progress := current_max;
        badge_completed := (current_max >= badge_rec.target_value);

        -- Rozeti Yaz
        INSERT INTO user_badges (user_id, badge_id, current_progress, is_completed, completed_at, updated_at)
        VALUES (NEW.user_id, badge_rec.id, badge_progress, badge_completed, CASE WHEN badge_completed THEN now() ELSE NULL END, now())
        ON CONFLICT (user_id, badge_id) DO UPDATE
        SET 
            current_progress = EXCLUDED.current_progress,
            is_completed = user_badges.is_completed OR EXCLUDED.is_completed, -- Kazanılmışsa geri alınmaz
            completed_at = COALESCE(user_badges.completed_at, EXCLUDED.completed_at),
            updated_at = now();
            
    END LOOP;

    RETURN NEW;
END;
$$;

-- Trigger'ı user_stats tablosuna bağla
DROP TRIGGER IF EXISTS on_user_stats_update ON user_stats;

CREATE TRIGGER on_user_stats_update
AFTER UPDATE ON user_stats
FOR EACH ROW
EXECUTE FUNCTION handle_user_stats_change();
