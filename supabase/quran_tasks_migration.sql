-- Quran Tasks & Badges Migration (V2 - Fixed Order)

-- 1. Insert Quran Badges
INSERT INTO public.badges (id, category, title, description, target_value, rule_type, icon_key) VALUES
('quran_verses_50', 'kuran', 'Adım', 'Toplam 50 ayet oku.', 50, 'total_count', '1'),
('quran_verses_250', 'kuran', 'Süreç', 'Toplam 250 ayet oku.', 250, 'total_count', '2'),
('quran_verses_1000', 'kuran', 'İlerleme', 'Toplam 1.000 ayet oku.', 1000, 'total_count', '3'),
('quran_juzs_15', 'kuran', 'Cüz', 'Toplam 15 cüz tamamla.', 15, 'total_count', '4'),
('quran_surahs_80', 'kuran', 'Sure', '80 farklı sureyi bitir.', 80, 'total_count', '5'),
('quran_verses_5000', 'kuran', 'Nur', 'Toplam 5.000 ayet oku.', 5000, 'total_count', '6'),
('quran_khatim_1', 'kuran', 'Hikmet', 'Kur’ân’ı baştan sona hatim et.', 1, 'total_count', '7')
ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title, 
    description = EXCLUDED.description, 
    target_value = EXCLUDED.target_value;

-- 2. Create Page-Verse Mapping table
DROP TABLE IF EXISTS public.quran_page_metadata CASCADE;
CREATE TABLE public.quran_page_metadata (
    page_number INTEGER PRIMARY KEY,
    verse_count INTEGER NOT NULL
);

-- 3. Populate Page Metadata
DO $$
BEGIN
    FOR i IN 1..604 LOOP
        INSERT INTO public.quran_page_metadata (page_number, verse_count) VALUES (i, 11) ON CONFLICT DO NOTHING;
    END LOOP;
END $$;

UPDATE public.quran_page_metadata SET verse_count = 7 WHERE page_number = 1;
UPDATE public.quran_page_metadata SET verse_count = 5 WHERE page_number = 2;
UPDATE public.quran_page_metadata SET verse_count = 12 WHERE page_number = 604;

-- 4. CORE RECALCULATION FUNCTION
CREATE OR REPLACE FUNCTION recalculate_quran_stats(p_user_id text)
RETURNS void AS $$
DECLARE
    v_total_verses integer;
    v_completed_surahs integer;
    v_completed_juzs integer;
    v_total_read_pages integer;
    v_badge_rec RECORD;
    v_progress integer;
    v_completed boolean;
BEGIN
    -- A. Calculate Total Verses Read
    SELECT COALESCE(SUM(m.verse_count), 0) INTO v_total_verses
    FROM public.user_quran_pages u
    JOIN public.quran_page_metadata m ON u.page_number = m.page_number
    WHERE u.user_id = p_user_id;

    -- B. Calculate Completed Surahs
    SELECT count(*) INTO v_completed_surahs
    FROM (
        SELECT s.id
        FROM public.quran_structure s
        WHERE s.type = 'surah'
        AND NOT EXISTS (
            SELECT 1 
            FROM generate_series(s.start_page, s.end_page) p
            WHERE p NOT IN (SELECT page_number FROM public.user_quran_pages WHERE user_id = p_user_id)
        )
    ) as completed_surah_list;

    -- C. Calculate Completed Juzs
    SELECT count(*) INTO v_completed_juzs
    FROM (
        SELECT j.id
        FROM public.quran_structure j
        WHERE j.type = 'juz'
        AND NOT EXISTS (
            SELECT 1 
            FROM generate_series(j.start_page, j.end_page) p
            WHERE p NOT IN (SELECT page_number FROM public.user_quran_pages WHERE user_id = p_user_id)
        )
    ) as completed_juz_list;

    -- D. Total Read Pages
    SELECT count(*) INTO v_total_read_pages
    FROM public.user_quran_pages
    WHERE user_id = p_user_id;

    -- E. Update User Stats
    UPDATE public.user_stats
    SET 
        total_verses = COALESCE(v_total_verses, 0),
        total_surahs = COALESCE(v_completed_surahs, 0),
        total_juzs = COALESCE(v_completed_juzs, 0),
        total_pages_read = COALESCE(v_total_read_pages, 0),
        total_khatims = CASE WHEN COALESCE(v_total_read_pages, 0) >= 604 THEN 1 ELSE 0 END,
        updated_at = now()
    WHERE user_id = p_user_id;

    -- F. Update Quran Badges
    FOR v_badge_rec IN SELECT * FROM public.badges WHERE category = 'kuran' LOOP
        v_progress := 0;
        v_completed := false;

        CASE v_badge_rec.id
            WHEN 'quran_verses_50' THEN v_progress := v_total_verses;
            WHEN 'quran_verses_250' THEN v_progress := v_total_verses;
            WHEN 'quran_verses_1000' THEN v_progress := v_total_verses;
            WHEN 'quran_verses_5000' THEN v_progress := v_total_verses;
            WHEN 'quran_juzs_15' THEN v_progress := v_completed_juzs;
            WHEN 'quran_surahs_80' THEN v_progress := v_completed_surahs;
            WHEN 'quran_khatim_1' THEN v_progress := CASE WHEN v_total_read_pages >= 604 THEN 1 ELSE 0 END;
            ELSE v_progress := 0;
        END CASE;

        v_progress := COALESCE(v_progress, 0);

        IF v_progress >= v_badge_rec.target_value THEN
            v_completed := true;
        END IF;

        INSERT INTO public.user_badges (user_id, badge_id, current_progress, is_completed, completed_at, updated_at)
        VALUES (p_user_id, v_badge_rec.id, v_progress, v_completed, 
                CASE WHEN v_completed THEN now() ELSE NULL END, now())
        ON CONFLICT (user_id, badge_id) DO UPDATE SET
            current_progress = EXCLUDED.current_progress,
            is_completed = user_badges.is_completed OR EXCLUDED.is_completed,
            completed_at = COALESCE(user_badges.completed_at, EXCLUDED.completed_at),
            updated_at = now();
    END LOOP;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 5. TRIGGER FUNCTION
CREATE OR REPLACE FUNCTION tr_handle_quran_page_read()
RETURNS TRIGGER AS $$
BEGIN
    PERFORM recalculate_quran_stats(NEW.user_id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. SETUP TRIGGER
DROP TRIGGER IF EXISTS tr_on_quran_page_read ON public.user_quran_pages;
CREATE TRIGGER tr_on_quran_page_read
AFTER INSERT ON public.user_quran_pages
FOR EACH ROW EXECUTE FUNCTION tr_handle_quran_page_read();

-- 7. INITIAL CALCULATION (Last Step)
DO $$
DECLARE
    u_rec RECORD;
BEGIN
    FOR u_rec IN SELECT DISTINCT user_id FROM public.user_quran_pages LOOP
        PERFORM recalculate_quran_stats(u_rec.user_id);
    END LOOP;
END $$;

-- Grants
GRANT EXECUTE ON FUNCTION recalculate_quran_stats(text) TO anon, authenticated, service_role;
