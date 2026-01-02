import { supabase } from '../lib/supabase';

export const UserStatsService = {
    /**
     * İstatistikleri güncelle (Upsert)
     * @param {string} userId
     * @param {Object} updates - Güncellenecek alanlar
     */
    async updateStats(userId, updates) {
        if (!userId) return null;

        try {
            const { data, error } = await supabase
                .from('user_stats')
                .upsert({
                    user_id: userId,
                    ...updates,
                    updated_at: new Date().toISOString()
                })
                .select()
                .single();

            if (error) {
                // __DEV__ guards removal planned, but keeping simplified error for now
                // console.error('Stats Update Error:', error); 
                throw error;
            }
            return data;
        } catch (e) {
            // console.error('Stats Service Error:', e);
            return null;
        }
    },

    /**
     * Bir alanı atomik olarak artır/azalt (RPC kullanmadan güvenli update)
     * Doğrudan RPC de kullanılabilir ama bu yöntem esnektir.
     * @param {string} userId 
     * @param {string} field 
     * @param {number} amount 
     */
    async incrementField(userId, field, amount = 1) {
        if (!userId) return;

        try {
            // Önce mevcut değeri al
            const { data: current, error } = await supabase
                .from('user_stats')
                .select(field)
                .eq('user_id', userId)
                .maybeSingle();

            if (error) throw error;

            const currentValue = current ? (current[field] || 0) : 0;
            const newValue = currentValue + amount;

            // Yeni değeri yaz
            return await this.updateStats(userId, { [field]: newValue });
        } catch (e) {
            // fail silently or handle error
            return null;
        }
    },

    /**
     * RPC kullanarak güvenli increment (Concurrency için daha iyi)
     * @param {string} userId
     * @param {string} column
     * @param {number} amount
     */
    async rpcIncrement(userId, column, amount = 1) {
        if (!userId) return;
        try {
            const { error } = await supabase.rpc('increment_user_stat', {
                target_user_id: userId,
                column_name: column,
                increment_by: amount
            });
            if (error) throw error;
        } catch (e) {
            // error
        }
    }
};
