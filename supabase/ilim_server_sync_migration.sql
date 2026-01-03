-- record_ilim_answer: Ilim (Bilgi Yarışması) istatistiklerini sunucu tarafında hesaplar ve kaydeder.
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
    -- 1. Mevcut kategori istatistiklerini al
    SELECT COALESCE(ilim_category_stats, '{}'::jsonb) INTO v_stats
    FROM public.user_stats
    WHERE user_id = p_user_id;

    -- 2. İlgili kategorinin verisini çek veya başlat
    v_cat_stats := COALESCE(v_stats->p_category_key, '{"correct": 0, "incorrect": 0, "totalPoints": 0, "score": 0}'::jsonb);
    
    -- Değerleri çıkar
    v_correct := (v_cat_stats->>'correct')::int;
    v_incorrect := (v_cat_stats->>'incorrect')::int;
    v_total_points := (v_cat_stats->>'totalPoints')::int;

    -- Güncelle
    IF p_is_correct THEN
        v_correct := v_correct + 1;
        v_total_points := v_total_points + p_points;
    ELSE
        v_incorrect := v_incorrect + 1;
    END IF;

    -- Puan (Score) hesapla (0-10 arası)
    -- Formül: (Doğru / (Doğru + Yanlış)) * 10
    v_score := ROUND(((v_correct::numeric / (v_correct + v_incorrect)::numeric) * 10), 1);

    -- Kategoriyi güncelle
    v_cat_stats := jsonb_build_object(
        'correct', v_correct,
        'incorrect', v_incorrect,
        'totalPoints', v_total_points,
        'score', v_score
    );

    -- Ana istatistik objesine yerleştir
    v_stats := v_stats || jsonb_build_object(p_category_key, v_cat_stats);

    -- 3. USER_STATS güncelle (Toplamlar)
    UPDATE public.user_stats SET
        ilim_total_points = ilim_total_points + CASE WHEN p_is_correct THEN p_points ELSE 0 END,
        quiz_count = quiz_count + CASE WHEN p_is_correct THEN 1 ELSE 0 END,
        ilim_category_stats = v_stats,
        updated_at = now()
    WHERE user_id = p_user_id;

    -- 4. DAILY_USER_STATS güncelle (Bugünkü puan)
    INSERT INTO public.daily_user_stats (user_id, date_key, ilim_points, updated_at)
    VALUES (p_user_id, CURRENT_DATE, CASE WHEN p_is_correct THEN p_points ELSE 0 END, now())
    ON CONFLICT (user_id, date_key) DO UPDATE SET
        ilim_points = daily_user_stats.ilim_points + CASE WHEN p_is_correct THEN p_points ELSE 0 END,
        updated_at = now();

END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
