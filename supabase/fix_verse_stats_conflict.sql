-- Fix: Separate Daily Verse Reveals (Swipes) from Kur'an Reading Progress
-- The user wants 'total_verses' to only hold the count of Daily Verse reveals from the home screen.

-- 1. Add new column for actual Kur'an reading statistics
ALTER TABLE public.user_stats 
ADD COLUMN IF NOT EXISTS quran_verses_read INTEGER DEFAULT 0;

-- 2. Update the recalculation function to use the new column
CREATE OR REPLACE FUNCTION recalculate_quran_stats(p_user_id text)
RETURNS void AS $$
DECLARE
    v_total_verses_read integer;
    v_completed_surahs integer;
    v_completed_juzs integer;
    v_total_read_pages integer;
    v_badge_rec RECORD;
    v_progress integer;
    v_completed boolean;
BEGIN
    -- A. Calculate Total Verses Read from pages (Actual Quran Reader)
    SELECT COALESCE(SUM(m.verse_count), 0) INTO v_total_verses_read
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

    -- E. Update User Stats - CRITICAL FIX: total_verses is NOT touched here anymore!
    UPDATE public.user_stats
    SET 
        quran_verses_read = COALESCE(v_total_verses_read, 0), -- New dedicated column
        total_surahs = COALESCE(v_completed_surahs, 0),
        total_juzs = COALESCE(v_completed_juzs, 0),
        total_pages_read = COALESCE(v_total_read_pages, 0),
        total_khatims = CASE WHEN COALESCE(v_total_read_pages, 0) >= 604 THEN 1 ELSE 0 END,
        updated_at = now()
    WHERE user_id = p_user_id;

    -- F. Update Quran Badges - Point them to v_total_verses_read (Actual Reading)
    FOR v_badge_rec IN SELECT * FROM public.badges WHERE category = 'kuran' LOOP
        v_progress := 0;
        v_completed := false;

        CASE v_badge_rec.id
            WHEN 'quran_verses_50' THEN v_progress := v_total_verses_read;
            WHEN 'quran_verses_250' THEN v_progress := v_total_verses_read;
            WHEN 'quran_verses_1000' THEN v_progress := v_total_verses_read;
            WHEN 'quran_verses_5000' THEN v_progress := v_total_verses_read;
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
