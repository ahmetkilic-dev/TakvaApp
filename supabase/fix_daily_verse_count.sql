-- Fix Daily Verse Count Logic
-- Instead of adding +1 per page, legitimate verse counts from quran_page_metadata will be used.

CREATE OR REPLACE FUNCTION tr_update_daily_verse_count()
RETURNS TRIGGER AS $$
DECLARE
    v_verse_count integer;
BEGIN
    -- Get the verse count for the page being read
    SELECT verse_count INTO v_verse_count
    FROM public.quran_page_metadata
    WHERE page_number = NEW.page_number;

    -- Default to 0 if not found (though metadata should exist)
    -- Optionally default to 1 if you prefer "at least something" but 0 is technically correct for "unknown".
    v_verse_count := COALESCE(v_verse_count, 0);

    INSERT INTO public.daily_user_stats (user_id, date_key, verses_read_today)
    VALUES (NEW.user_id, CURRENT_DATE, v_verse_count)
    ON CONFLICT (user_id, date_key) DO UPDATE SET
        verses_read_today = daily_user_stats.verses_read_today + v_verse_count,
        updated_at = now();
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
