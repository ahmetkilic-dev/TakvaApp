-- ⚠️ DANGER: THIS SCRIPT WIPES ALL USER DATA ⚠️
-- IT PRESERVES SYSTEM CONFIGURATION TABLES (badges, quran_structure, quran_page_metadata).

-- 1. Truncate User-Specific Data Tables (Cascades to dependents if foreign keys exist)
-- Used TRUNCATE for speed and efficiency. 'RESTART IDENTITY' resets auto-increment IDs.
-- 'CASCADE' ensures dependent rows in other tables (if strictly linked) are also removed.

TRUNCATE TABLE 
  public.daily_user_stats, 
  public.daily_stats,
  public.kaza_counters, 
  public.kelam_likes, 
  public.kelam_videos, 
  public.takva_analiz, 
  public.user_badges, 
  public.user_quran_pages, 
  public.user_stats,
  public.profiles,
  public.global_stats
  RESTART IDENTITY CASCADE;

-- 2. Delete from Authentication Table (If you want to remove the actual user accounts for login)
-- This usually cascades to 'public.profiles' if set up, but we truncated profiles above just in case.
-- Uncomment the line below if you want to wipe Auth Users too (Recommended for a full reset).
DELETE FROM auth.users;

-- ---------------------------------------------------------
-- 🛑 TABLES PRESERVED (NOT DELETED)
-- ---------------------------------------------------------
-- 1. public.badges 
--    (Reason: Contains badge definitions/rules, not user progress. User progress is in 'user_badges')
-- 2. public.quran_page_metadata 
--    (Reason: Contains verse counts per page, static Quran data)
-- 3. public.quran_structure 
--    (Reason: Contains Juz/Surah page ranges, static Quran data)
