-- Insert App Category Badge Definitions
-- Bu rozetler badgeDefinitions.js ile eşleşmeli

INSERT INTO badges (id, category, title, description, target_value, rule_type, icon_key) VALUES
('app_share_1', 'uygulama', 'Davet', 'Kelam''daki bir içeriği ilk kez paylaş.', 1, 'share_count', 'uygulama'),
('app_share_10', 'uygulama', 'Tebliğ', 'Toplam 10 içerik paylaş.', 10, 'share_count', 'uygulama'),
('app_social_1', 'uygulama', 'Destek', 'Takva''nın resmi sosyal medya hesaplarını takip et', 1, 'social_visit', 'uygulama'),
('app_follow_10', 'uygulama', 'Cemiyet', '10 içerik üreticisini takip et.', 10, 'follow_count', 'uygulama'),
('app_rating_1', 'uygulama', 'Minnet', 'Uygulamaya mağazada puan ver / yorum yap.', 1, 'rating', 'uygulama'),
('app_entry_3', 'uygulama', 'Süreklilik', '30 gün boyunca düzenli giriş yap.', 30, 'login_streak', 'uygulama'),
('app_entry_30', 'uygulama', 'Sadakat', '1 yıl boyunca düzenli giriş yap.', 365, 'login_streak', 'uygulama')
ON CONFLICT (id) DO UPDATE
SET 
    category = EXCLUDED.category,
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    target_value = EXCLUDED.target_value,
    rule_type = EXCLUDED.rule_type,
    icon_key = EXCLUDED.icon_key;
