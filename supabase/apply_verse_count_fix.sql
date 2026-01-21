-- FORCE UPDATE of the Daily Verse Count Logic
-- 1. Redefine the function to ensure it uses the metadata table.
CREATE OR REPLACE FUNCTION tr_update_daily_verse_count()
RETURNS TRIGGER AS $$
DECLARE
    v_verse_count integer;
BEGIN
    -- Get the verse count for the page being read
    SELECT verse_count INTO v_verse_count
    FROM public.quran_page_metadata
    WHERE page_number = NEW.page_number;

    -- If no metadata found, default to 1 (legacy behavior), otherwise use the count.
    v_verse_count := COALESCE(v_verse_count, 1);

    -- Debug Log (visible in Supabase Logs)
    RAISE NOTICE 'Updating daily verses for User % Page % Count %', NEW.user_id, NEW.page_number, v_verse_count;

    INSERT INTO public.daily_user_stats (user_id, date_key, verses_read_today)
    VALUES (NEW.user_id, CURRENT_DATE, v_verse_count)
    ON CONFLICT (user_id, date_key) DO UPDATE SET
        verses_read_today = daily_user_stats.verses_read_today + v_verse_count,
        updated_at = now();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Verify Trigger Exists (Recreate to be safe)
DROP TRIGGER IF EXISTS tr_on_quran_page_read_daily ON public.user_quran_pages;
CREATE TRIGGER tr_on_quran_page_read_daily
AFTER INSERT ON public.user_quran_pages
FOR EACH ROW EXECUTE FUNCTION tr_update_daily_verse_count();
