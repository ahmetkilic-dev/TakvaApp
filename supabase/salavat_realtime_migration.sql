-- Realtime Salavat Aggregation (Reads directly from user activity - Single Source of Truth)

-- 1. Optimized Aggregation Function
CREATE OR REPLACE FUNCTION get_realtime_salavat_counts(query_date date, p_user_id text)
RETURNS jsonb AS $$
DECLARE
  global_total_count bigint;
  global_today_count bigint;
  user_total_count bigint;
BEGIN
  -- 1. Global Total: Sum of ALL salavats from ALL time (from daily_user_stats)
  SELECT COALESCE(SUM(salavat_count_today), 0) INTO global_total_count 
  FROM public.daily_user_stats;

  -- 2. Global Today: Sum of ALL salavats for TODAY (from daily_user_stats)
  SELECT COALESCE(SUM(salavat_count_today), 0) INTO global_today_count 
  FROM public.daily_user_stats 
  WHERE date_key = query_date;
  
  -- 3. User Total: Sum of THIS USER'S salavats from ALL time (from daily_user_stats)
  IF p_user_id IS NOT NULL THEN
      SELECT COALESCE(SUM(salavat_count_today), 0) INTO user_total_count
      FROM public.daily_user_stats
      WHERE user_id = p_user_id;
  ELSE
      user_total_count := 0;
  END IF;

  RETURN jsonb_build_object(
    'global_total', global_total_count,
    'global_today', global_today_count,
    'user_total', user_total_count
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execution rights
GRANT EXECUTE ON FUNCTION get_realtime_salavat_counts(date, text) TO anon, authenticated, service_role;
