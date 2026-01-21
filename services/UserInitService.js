import { supabase } from '../lib/supabase';
import { UserStatsService } from './UserStatsService';

export const UserInitService = {
    /**
     * Kullanıcı için gerekli tüm tabloların varlığını kontrol et ve oluştur
     * @param {string} userId 
     */
    async initializeUser(userId) {
        if (!userId) return;

        try {
            // Paralel kontrol yap
            const [profileRes, kazaRes, statsRes] = await Promise.all([
                supabase.from('profiles').select('id').eq('id', userId).maybeSingle(),
                supabase.from('kaza_counters').select('user_id').eq('user_id', userId).maybeSingle(),
                supabase.from('user_stats').select('user_id').eq('user_id', userId).maybeSingle()
            ]);

            const promises = [];

            // Profil oluşturma işi artık sadece Kayıt/Giriş ekranlarının sorumluluğunda.
            // Burada otomatik oluşturursak NULL satırlara sebep oluyor.
            /*
            if (!profileRes.data) {
                promises.push(supabase.from('profiles').insert({ id: userId }));
            }
            */

            // Kaza sayacı yoksa oluştur
            if (!kazaRes.data) {
                promises.push(supabase.from('kaza_counters').insert({
                    user_id: userId,
                    namaz_counts: { sabah: 0, ogle: 0, ikindi: 0, aksam: 0, yatsi: 0, vitir: 0 },
                    oruc_counts: { oruc: 0 }
                }));
            }

            // İstatistik tablosu yoksa oluştur
            if (!statsRes.data) {
                promises.push(supabase.from('user_stats').insert({ user_id: userId }));
            }

            if (promises.length > 0) {
                await Promise.all(promises);
            }

            // ✅ Login streak'i güncelle (Her uygulama açılışında)
            await UserStatsService.updateLoginStreak(userId);
        } catch (error) {
            // Hata durumunda (internet yoksa vs) sessiz kal veya retry mekanizması ekle
            // console.error('User Init Error:', error);
        }
    }
};

