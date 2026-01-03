-- Quran Reading Progress Refactor Migration (Server-Side Calculation Version)

-- 1. Table for tracking individual pages read
DROP TABLE IF EXISTS public.user_quran_pages CASCADE;
CREATE TABLE public.user_quran_pages (
    user_id text NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    page_number integer NOT NULL CHECK (page_number >= 1 AND page_number <= 604),
    read_at timestamp with time zone DEFAULT now(),
    PRIMARY KEY (user_id, page_number)
);

-- 2. New Table for Quran Structure (Surahs/Juzs ranges)
DROP TABLE IF EXISTS public.quran_structure CASCADE;
CREATE TABLE public.quran_structure (
    type text NOT NULL, -- 'surah' or 'juz'
    id integer NOT NULL,
    start_page integer NOT NULL,
    end_page integer NOT NULL,
    PRIMARY KEY (type, id)
);

-- 3. Populate Structure (Simplified metadata)
-- Juzs
INSERT INTO public.quran_structure (type, id, start_page, end_page) VALUES
('juz', 1, 1, 21), ('juz', 2, 22, 41), ('juz', 3, 42, 61), ('juz', 4, 62, 81), ('juz', 5, 82, 101),
('juz', 6, 102, 120), ('juz', 7, 121, 141), ('juz', 8, 142, 161), ('juz', 9, 162, 181), ('juz', 10, 182, 200),
('juz', 11, 201, 220), ('juz', 12, 221, 241), ('juz', 13, 242, 261), ('juz', 14, 262, 281), ('juz', 15, 282, 301),
('juz', 16, 302, 321), ('juz', 17, 322, 341), ('juz', 18, 342, 361), ('juz', 19, 362, 381), ('juz', 20, 382, 401),
('juz', 21, 402, 421), ('juz', 22, 422, 441), ('juz', 23, 442, 461), ('juz', 24, 462, 481), ('juz', 25, 482, 501),
('juz', 26, 502, 521), ('juz', 27, 522, 541), ('juz', 28, 542, 561), ('juz', 29, 562, 581), ('juz', 30, 582, 604);

-- Surahs (Key sample, you can add all 114)
INSERT INTO public.quran_structure (type, id, start_page, end_page) VALUES
( 'surah', 1, 1, 1), ( 'surah', 2, 2, 49), ( 'surah', 3, 50, 76), ( 'surah', 4, 77, 105), ( 'surah', 5, 106, 127),
( 'surah', 6, 128, 150), ( 'surah', 7, 151, 176), ( 'surah', 8, 177, 186), ( 'surah', 9, 187, 207), ( 'surah', 10, 208, 220),
( 'surah', 11, 221, 234), ( 'surah', 12, 235, 248), ( 'surah', 13, 249, 254), ( 'surah', 14, 255, 261), ( 'surah', 15, 262, 266),
( 'surah', 16, 267, 281), ( 'surah', 17, 282, 292), ( 'surah', 18, 293, 304), ( 'surah', 19, 305, 311), ( 'surah', 20, 312, 321),
( 'surah', 21, 322, 331), ( 'surah', 22, 332, 341), ( 'surah', 23, 342, 349), ( 'surah', 24, 350, 358), ( 'surah', 25, 359, 366),
( 'surah', 26, 367, 376), ( 'surah', 27, 377, 384), ( 'surah', 28, 385, 395), ( 'surah', 29, 396, 403), ( 'surah', 30, 404, 410),
( 'surah', 31, 411, 414), ( 'surah', 32, 415, 417), ( 'surah', 33, 418, 427), ( 'surah', 34, 428, 433), ( 'surah', 35, 434, 439),
( 'surah', 36, 440, 445), ( 'surah', 37, 446, 452), ( 'surah', 38, 453, 457), ( 'surah', 39, 458, 466), ( 'surah', 40, 467, 476),
( 'surah', 41, 477, 482), ( 'surah', 42, 483, 488), ( 'surah', 43, 489, 495), ( 'surah', 44, 496, 498), ( 'surah', 45, 499, 501),
( 'surah', 46, 502, 506), ( 'surah', 47, 507, 510), ( 'surah', 48, 511, 514), ( 'surah', 49, 515, 517), ( 'surah', 50, 518, 519),
( 'surah', 51, 520, 522), ( 'surah', 52, 523, 525), ( 'surah', 53, 526, 528), ( 'surah', 54, 529, 530), ( 'surah', 55, 531, 533),
( 'surah', 56, 534, 536), ( 'surah', 57, 537, 541), ( 'surah', 58, 542, 544), ( 'surah', 59, 545, 548), ( 'surah', 60, 549, 550),
( 'surah', 61, 551, 552), ( 'surah', 62, 553, 553), ( 'surah', 63, 554, 555), ( 'surah', 64, 556, 557), ( 'surah', 65, 558, 559),
( 'surah', 66, 560, 561), ( 'surah', 67, 562, 563), ( 'surah', 68, 564, 565), ( 'surah', 69, 566, 567), ( 'surah', 70, 568, 569),
( 'surah', 71, 570, 571), ( 'surah', 72, 572, 573), ( 'surah', 73, 574, 574), ( 'surah', 74, 575, 576), ( 'surah', 75, 577, 577),
( 'surah', 76, 578, 579), ( 'surah', 77, 580, 581), ( 'surah', 78, 582, 582), ( 'surah', 79, 583, 584), ( 'surah', 80, 585, 585),
( 'surah', 81, 586, 586), ( 'surah', 82, 587, 587), ( 'surah', 83, 588, 588), ( 'surah', 84, 589, 589), ( 'surah', 85, 590, 590),
( 'surah', 86, 591, 591), ( 'surah', 87, 592, 592), ( 'surah', 88, 593, 593), ( 'surah', 89, 594, 594), ( 'surah', 90, 595, 595),
( 'surah', 91, 596, 596), ( 'surah', 92, 597, 597), ( 'surah', 93, 598, 598), ( 'surah', 94, 598, 598), ( 'surah', 95, 599, 599),
( 'surah', 96, 599, 599), ( 'surah', 97, 600, 600), ( 'surah', 98, 600, 600), ( 'surah', 99, 601, 601), ( 'surah', 100, 602, 602),
( 'surah', 101, 602, 602), ( 'surah', 102, 603, 603), ( 'surah', 103, 603, 603), ( 'surah', 104, 603, 603), ( 'surah', 105, 604, 604),
( 'surah', 106, 604, 604), ( 'surah', 107, 604, 604), ( 'surah', 108, 604, 604), ( 'surah', 109, 604, 604), ( 'surah', 110, 604, 604),
( 'surah', 111, 604, 604), ( 'surah', 112, 604, 604), ( 'surah', 113, 604, 604), ( 'surah', 114, 604, 604);

-- 4. Unified Progress Report Function (THE BRAIN)
CREATE OR REPLACE FUNCTION get_user_quran_report(p_user_id text)
RETURNS jsonb AS $$
DECLARE
    v_read_pages integer[];
    v_surah_progress jsonb;
    v_juz_progress jsonb;
BEGIN
    -- Get list of read pages
    SELECT array_agg(page_number) INTO v_read_pages
    FROM public.user_quran_pages
    WHERE user_id = p_user_id;

    IF v_read_pages IS NULL THEN
        v_read_pages := ARRAY[]::integer[];
    END IF;

    -- Calculate Surah Progresses
    SELECT jsonb_object_agg(s.id::text, 
        (
            SELECT (count(*)::float / (s.end_page - s.start_page + 1)::float) * 100.0
            FROM unnest(v_read_pages) AS p
            WHERE p >= s.start_page AND p <= s.end_page
        )
    ) INTO v_surah_progress
    FROM public.quran_structure s
    WHERE s.type = 'surah';

    -- Calculate Juz Progresses
    SELECT jsonb_object_agg(j.id::text, 
        (
            SELECT (count(*)::float / (j.end_page - j.start_page + 1)::float) * 100.0
            FROM unnest(v_read_pages) AS p
            WHERE p >= j.start_page AND p <= j.end_page
        )
    ) INTO v_juz_progress
    FROM public.quran_structure j
    WHERE j.type = 'juz';

    RETURN jsonb_build_object(
        'read_pages', v_read_pages,
        'surah_progress', v_surah_progress,
        'juz_progress', v_juz_progress
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Functions to support JS calls remains
CREATE OR REPLACE FUNCTION record_quran_page_visit(p_user_id text, p_page_number integer)
RETURNS void AS $$
BEGIN
    UPDATE public.user_stats
    SET 
        last_read_page = p_page_number,
        updated_at = now()
    WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION mark_quran_page_read(p_user_id text, p_page_number integer)
RETURNS jsonb AS $$
DECLARE
    v_total_read integer;
BEGIN
    INSERT INTO public.user_quran_pages (user_id, page_number)
    VALUES (p_user_id, p_page_number)
    ON CONFLICT (user_id, page_number) DO NOTHING;

    SELECT count(*) INTO v_total_read
    FROM public.user_quran_pages
    WHERE user_id = p_user_id;

    UPDATE public.user_stats
    SET 
        total_pages_read = v_total_read,
        last_read_page = p_page_number, 
        updated_at = now()
    WHERE user_id = p_user_id;

    RETURN jsonb_build_object('success', true, 'total_pages_read', v_total_read);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Security & Grants
ALTER TABLE public.user_quran_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quran_structure ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public select access" ON public.user_quran_pages;
CREATE POLICY "Public select access" ON public.user_quran_pages FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow all on structure" ON public.quran_structure;
CREATE POLICY "Allow all on structure" ON public.quran_structure FOR SELECT USING (true);

GRANT ALL ON TABLE public.user_quran_pages TO anon, authenticated, service_role;
GRANT ALL ON TABLE public.quran_structure TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION get_user_quran_report(text) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION mark_quran_page_read(text, integer) TO anon, authenticated, service_role;
GRANT EXECUTE ON FUNCTION record_quran_page_visit(text, integer) TO anon, authenticated, service_role;
