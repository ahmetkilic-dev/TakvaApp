-- 1. İLİM ROZETLERİNİ TANIMLA
INSERT INTO public.badges (id, category, title, description, target_value, rule_type, icon_key) VALUES
('ilim_total_5', 'ilim', 'Kıvılcım', '5 soruyu doğru cevapla.', 5, 'total_count', '1'),
('ilim_total_15', 'ilim', 'Araştırma', '15 soruyu doğru cevapla.', 15, 'total_count', '2'),
('ilim_total_30', 'ilim', 'Tahkik', '30 soruyu doğru cevapla.', 30, 'total_count', '3'),
('ilim_total_50', 'ilim', 'Marifet', '50 soruyu doğru cevapla.', 50, 'total_count', '4'),
('ilim_total_100', 'ilim', 'Hikmet', '100 soruyu doğru cevapla.', 100, 'total_count', '5'),
('ilim_total_200', 'ilim', 'İdrak', '200 soruyu doğru cevapla.', 200, 'total_count', '6'),
('ilim_total_500', 'ilim', 'İrfan', '500 soruyu doğru cevapla.', 500, 'total_count', '7')
ON CONFLICT (id) DO NOTHING;

-- 2. TRIGGER FONKSİYONUNU GÜNCELLE (Zikir + İlim Dahil)
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
    -- 1. ZİKİR ROZETLERİ (Değişiklik varsa)
    IF OLD.total_dhikr IS DISTINCT FROM NEW.total_dhikr OR OLD.total_salavat IS DISTINCT FROM NEW.total_salavat THEN
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
                updated_at = now();
        END LOOP;
    END IF;

    -- 2. İLİM ROZETLERİ (Değişiklik varsa)
    IF OLD.quiz_count IS DISTINCT FROM NEW.quiz_count THEN
        FOR badge_rec IN SELECT * FROM badges WHERE category = 'ilim' LOOP
            badge_progress := COALESCE(NEW.quiz_count, 0);
            badge_completed := (badge_progress >= badge_rec.target_value);

            INSERT INTO user_badges (user_id, badge_id, current_progress, is_completed, completed_at, updated_at)
            VALUES (NEW.user_id, badge_rec.id, badge_progress, badge_completed, CASE WHEN badge_completed THEN now() ELSE NULL END, now())
            ON CONFLICT (user_id, badge_id) DO UPDATE
            SET 
                current_progress = EXCLUDED.current_progress,
                is_completed = user_badges.is_completed OR EXCLUDED.is_completed,
                updated_at = now();
        END LOOP;
    END IF;

    RETURN NEW;
END;
$$;
