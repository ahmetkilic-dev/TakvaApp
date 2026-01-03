-- Daily Tasks Migration (Server-Side)

-- 1. Add missing columns to daily_user_stats
ALTER TABLE public.daily_user_stats 
ADD COLUMN IF NOT EXISTS verses_read_today INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS salavat_count_today INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS watched_kelam BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS asked_hoca_ai BOOLEAN DEFAULT false;

-- 2. Trigger to increment daily verse count when a page is read
CREATE OR REPLACE FUNCTION tr_update_daily_verse_count()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.daily_user_stats (user_id, date_key, verses_read_today)
    VALUES (NEW.user_id, CURRENT_DATE, 1)
    ON CONFLICT (user_id, date_key) DO UPDATE SET
        verses_read_today = daily_user_stats.verses_read_today + 1,
        updated_at = now();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS tr_on_quran_page_read_daily ON public.user_quran_pages;
CREATE TRIGGER tr_on_quran_page_read_daily
AFTER INSERT ON public.user_quran_pages
FOR EACH ROW EXECUTE FUNCTION tr_update_daily_verse_count();

-- 3. Function to record daily generic activities
CREATE OR REPLACE FUNCTION record_daily_activity(p_user_id text, p_activity_type text)
RETURNS void AS $$
BEGIN
    INSERT INTO public.daily_user_stats (user_id, date_key, updated_at)
    VALUES (p_user_id, CURRENT_DATE, now())
    ON CONFLICT (user_id, date_key) DO UPDATE SET
        watched_kelam = CASE WHEN p_activity_type = 'kelam' THEN true ELSE daily_user_stats.watched_kelam END,
        asked_hoca_ai = CASE WHEN p_activity_type = 'hoca_ai' THEN true ELSE daily_user_stats.asked_hoca_ai END,
        salavat_count_today = CASE WHEN p_activity_type = 'salavat' THEN daily_user_stats.salavat_count_today + 1 ELSE daily_user_stats.salavat_count_today END,
        updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Centralized Daily Tasks Report
CREATE OR REPLACE FUNCTION get_daily_tasks(p_user_id text)
RETURNS jsonb AS $$
DECLARE
    v_stats RECORD;
    v_tasks jsonb;
BEGIN
    -- Get or create daily stats for today
    SELECT * INTO v_stats
    FROM public.daily_user_stats
    WHERE user_id = p_user_id AND date_key = CURRENT_DATE;

    -- Define tasks array matching the TaskService template structure
    v_tasks := jsonb_build_array(
        jsonb_build_object(
            'id', 1, 
            'text', 'Günün ayetini oku.', 
            'progress', CASE WHEN COALESCE(v_stats.verse_revealed, false) THEN 1 ELSE 0 END, 
            'target', 1, 
            'route', '/(app)/(services)/quran'
        ),
        jsonb_build_object(
            'id', 2, 
            'text', 'Bugün en az 20 ayet oku.', 
            'progress', LEAST(COALESCE(v_stats.verses_read_today, 0), 20), 
            'target', 20, 
            'route', '/(app)/(services)/quran'
        ),
        jsonb_build_object(
            'id', 3, 
            'text', 'Bugün 100 zikir yap.', 
            'progress', LEAST(COALESCE(v_stats.dhikr_count, 0), 100), 
            'target', 100, 
            'route', '/(app)/(services)/dhikr'
        ),
        jsonb_build_object(
            'id', 4, 
            'text', 'Bugün bir salavat getir.', 
            'progress', LEAST(COALESCE(v_stats.salavat_count_today, 0), 1), 
            'target', 1, 
            'route', '/(app)/(tabs)/home'
        ),
        jsonb_build_object(
            'id', 5, 
            'text', 'Bugün bir namaz vaktini işaretle.', 
            'progress', CASE WHEN (
                COALESCE((v_stats.namaz_completed->>'sabah')::boolean, false) OR 
                COALESCE((v_stats.namaz_completed->>'ogle')::boolean, false) OR 
                COALESCE((v_stats.namaz_completed->>'ikindi')::boolean, false) OR 
                COALESCE((v_stats.namaz_completed->>'aksam')::boolean, false) OR 
                COALESCE((v_stats.namaz_completed->>'yatsi')::boolean, false)
            ) THEN 1 ELSE 0 END, 
            'target', 1, 
            'route', '/(app)/(services)/namazdurumu'
        ),
        jsonb_build_object(
            'id', 6, 
            'text', 'bu Kelam''dan bir içerik izle.', 
            'progress', CASE WHEN COALESCE(v_stats.watched_kelam, false) THEN 1 ELSE 0 END, 
            'target', 1, 
            'route', '/(app)/(tabs)/kelam'
        ),
        jsonb_build_object(
            'id', 7, 
            'text', 'Bugün Hoca AI''ye bir soru sor.', 
            'progress', CASE WHEN COALESCE(v_stats.asked_hoca_ai, false) THEN 1 ELSE 0 END, 
            'target', 1, 
            'route', '/(app)/(services)/hoca-ai'
        )
    );

    RETURN v_tasks;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grants
GRANT EXECUTE ON FUNCTION get_daily_tasks(text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION record_daily_activity(text, text) TO anon, authenticated, service_role;
