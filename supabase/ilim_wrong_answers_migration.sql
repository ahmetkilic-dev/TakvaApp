-- Add wrong_answer_count column to daily_user_stats
ALTER TABLE public.daily_user_stats 
ADD COLUMN IF NOT EXISTS wrong_answer_count integer DEFAULT 0;

-- Update record_ilim_answer function to track wrong answers
CREATE OR REPLACE FUNCTION record_ilim_answer(
    p_user_id text,
    p_category_key text,
    p_is_correct boolean,
    p_points integer
)
RETURNS void AS $$
DECLARE
    v_stats jsonb;
    v_cat_stats jsonb;
    v_correct int;
    v_incorrect int;
    v_total_points int;
    v_score numeric;
BEGIN
    -- 1. Get existing category stats
    SELECT COALESCE(ilim_category_stats, '{}'::jsonb) INTO v_stats
    FROM public.user_stats
    WHERE user_id = p_user_id;

    -- 2. fetch or initialize category stats
    v_cat_stats := COALESCE(v_stats->p_category_key, '{"correct": 0, "incorrect": 0, "totalPoints": 0, "score": 0}'::jsonb);
    
    -- Extract values
    v_correct := (v_cat_stats->>'correct')::int;
    v_incorrect := (v_cat_stats->>'incorrect')::int;
    v_total_points := (v_cat_stats->>'totalPoints')::int;

    -- Update local variables
    IF p_is_correct THEN
        v_correct := v_correct + 1;
        v_total_points := v_total_points + p_points;
    ELSE
        v_incorrect := v_incorrect + 1;
    END IF;

    -- Calculate Score (0-10)
    v_score := ROUND(((v_correct::numeric / NULLIF((v_correct + v_incorrect), 0)::numeric) * 10), 1);
    v_score := COALESCE(v_score, 0);

    -- Update category object
    v_cat_stats := jsonb_build_object(
        'correct', v_correct,
        'incorrect', v_incorrect,
        'totalPoints', v_total_points,
        'score', v_score
    );

    -- Put back into main stats object
    v_stats := v_stats || jsonb_build_object(p_category_key, v_cat_stats);

    -- 3. Update USER_STATS (Totals)
    UPDATE public.user_stats SET
        ilim_total_points = ilim_total_points + CASE WHEN p_is_correct THEN p_points ELSE 0 END,
        quiz_count = quiz_count + CASE WHEN p_is_correct THEN 1 ELSE 0 END,
        ilim_category_stats = v_stats,
        updated_at = now()
    WHERE user_id = p_user_id;

    -- 4. Update DAILY_USER_STATS (Daily points + Wrong answer count)
    INSERT INTO public.daily_user_stats (user_id, date_key, ilim_points, question_count, wrong_answer_count, updated_at)
    VALUES (
        p_user_id, 
        CURRENT_DATE, 
        CASE WHEN p_is_correct THEN p_points ELSE 0 END, 
        1, -- question_count (increment by 1 for new insert)
        CASE WHEN p_is_correct THEN 0 ELSE 1 END, -- wrong_answer_count
        now()
    )
    ON CONFLICT (user_id, date_key) DO UPDATE SET
        ilim_points = daily_user_stats.ilim_points + CASE WHEN p_is_correct THEN p_points ELSE 0 END,
        question_count = daily_user_stats.question_count + 1,
        wrong_answer_count = daily_user_stats.wrong_answer_count + CASE WHEN p_is_correct THEN 0 ELSE 1 END,
        updated_at = now();

END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
