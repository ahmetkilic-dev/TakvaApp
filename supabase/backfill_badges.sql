-- ==========================================
-- TAKVA APP - BADGE SYSTEM BACKFILL (TEK SEFERLİK)
-- Mevcut kullanıcıların istatistiklerini yeni rozet sistemine aktarır.
-- ==========================================

DO $$
DECLARE
    u_rec RECORD;
    badge_rec RECORD;
    progress BIGINT;
    completed BOOLEAN;
    current_max BIGINT;
BEGIN
    -- Tüm kullanıcıları döngüye al
    FOR u_rec IN SELECT * FROM user_stats LOOP
        
        -- 1. ZIKIR & SALAVAT ROZETLERİNİ SENKRONİZE ET
        -- Zikir veya Salavat'tan hangisi büyükse onu baz al
        current_max := GREATEST(COALESCE(u_rec.total_dhikr, 0), COALESCE(u_rec.total_salavat, 0));
        
        FOR badge_rec IN SELECT * FROM badges WHERE category = 'zksl' LOOP
             progress := current_max;
             completed := (current_max >= badge_rec.target_value);
             
             INSERT INTO user_badges (user_id, badge_id, current_progress, is_completed, completed_at, updated_at)
             VALUES (u_rec.user_id, badge_rec.id, progress, completed, CASE WHEN completed THEN now() ELSE NULL END, now())
             ON CONFLICT (user_id, badge_id) DO UPDATE
             SET current_progress = EXCLUDED.current_progress,
                 is_completed = user_badges.is_completed OR EXCLUDED.is_completed,
                 updated_at = now();
        END LOOP;


        -- 2. NAMAZ ROZETLERİNİ SENKRONİZE ET (Sadece Sayısal Olanlar)
        -- Streak ve Cumulative (30 gün) verileri zaten Cron ile hesaplandığı için, 
        -- buraya sadece toplam sayıları aktarıyoruz. (Streak'i manuel hesaplamak zor çünkü geçmiş gün verisi lazım)
        FOR badge_rec IN SELECT * FROM badges WHERE category = 'namaz' AND rule_type IN ('total_count', 'yearly_total') LOOP
             progress := 0;
             IF badge_rec.rule_type = 'total_count' THEN progress := u_rec.total_prayers; END IF;
             IF badge_rec.rule_type = 'yearly_total' THEN progress := u_rec.year_prayers; END IF;
             
             completed := (progress >= badge_rec.target_value);

             INSERT INTO user_badges (user_id, badge_id, current_progress, is_completed, completed_at, updated_at)
             VALUES (u_rec.user_id, badge_rec.id, progress, completed, CASE WHEN completed THEN now() ELSE NULL END, now())
             ON CONFLICT (user_id, badge_id) DO UPDATE
             SET current_progress = EXCLUDED.current_progress,
                 is_completed = user_badges.is_completed OR EXCLUDED.is_completed,
                 updated_at = now();
        END LOOP;

    END LOOP;
END;
$$;
