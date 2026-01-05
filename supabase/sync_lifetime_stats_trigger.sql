-- Trigger to sync lifetime totals in user_stats with daily activity changes
-- This allows the frontend to write ONLY to daily_user_stats while keeping badges working.

CREATE OR REPLACE FUNCTION tr_sync_lifetime_stats()
RETURNS TRIGGER AS $$
DECLARE
    v_salavat_diff INTEGER := 0;
    v_dhikr_diff INTEGER := 0;
    v_verses_diff INTEGER := 0;
BEGIN
    -- Handle INSERT (New day row)
    IF (TG_OP = 'INSERT') THEN
        v_salavat_diff := COALESCE(NEW.salavat_count_today, 0);
        v_dhikr_diff := COALESCE(NEW.dhikr_count, 0);
        v_verses_diff := COALESCE(NEW.verses_read_today, 0);
    -- Handle UPDATE (Existing day row)
    ELSIF (TG_OP = 'UPDATE') THEN
        v_salavat_diff := COALESCE(NEW.salavat_count_today, 0) - COALESCE(OLD.salavat_count_today, 0);
        v_dhikr_diff := COALESCE(NEW.dhikr_count, 0) - COALESCE(OLD.dhikr_count, 0);
        v_verses_diff := COALESCE(NEW.verses_read_today, 0) - COALESCE(OLD.verses_read_today, 0);
    END IF;

    -- Only update if there is a change
    IF v_salavat_diff <> 0 OR v_dhikr_diff <> 0 OR v_verses_diff <> 0 THEN
        -- Safely increment user_stats
        INSERT INTO public.user_stats (user_id, total_salavat, total_dhikr, quran_verses_read, updated_at)
        VALUES (NEW.user_id, v_salavat_diff, v_dhikr_diff, v_verses_diff, now())
        ON CONFLICT (user_id) DO UPDATE SET
            total_salavat = user_stats.total_salavat + v_salavat_diff,
            total_dhikr = user_stats.total_dhikr + v_dhikr_diff,
            quran_verses_read = user_stats.quran_verses_read + v_verses_diff,
            updated_at = now();
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bind the trigger
DROP TRIGGER IF EXISTS tr_on_daily_user_stats_change_sync_lifetime ON public.daily_user_stats;
CREATE TRIGGER tr_on_daily_user_stats_change_sync_lifetime
AFTER INSERT OR UPDATE ON public.daily_user_stats
FOR EACH ROW EXECUTE FUNCTION tr_sync_lifetime_stats();
