-- ⚠️ WRNING: BU SCRIPT TÜM KULLANICILARI VE KULLANICI VERİLERİNİ SİLER ⚠️
-- Bu işlem geri alınamaz.

-- 1. Önce public şemasındaki kullanıcı verilerini temizle
TRUNCATE TABLE 
    public.profiles,
    public.user_stats,
    public.daily_user_stats,
    public.takva_analiz,
    public.user_badges,
    public.kaza_counters,
    public.kelam_likes,
    public.user_quran_pages
RESTART IDENTITY CASCADE;

-- 2. Auth şemasındaki kullanıcıları sil (Bu işlem bağlı tablolarda ON DELETE CASCADE varsa onları da tetikler)
-- Eğer yukarıdaki truncate yetmezse, auth.users'dan silmek en garantisidir.
DELETE FROM auth.users;

-- İsteğe bağlı: Badge tanımları, Kuran yapısı vb. sistem tabloları silinmedi. 
-- Sadece kullanıcıya özgü veriler silindi.
