import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useUserStats } from '../../../contexts/UserStatsContext';

export const useManeviAnaliz = () => {
    const { user } = useUserStats();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        daily: { ayet: 0, namaz: 0, zikir: 0, salavat: 0, ilim: 0, gorev: 0 },
        weekly: { ayet: 0, namaz: 0, zikir: 0, salavat: 0, ilim: 0, gorev: 0 },
        monthly: { ayet: 0, namaz: 0, zikir: 0, salavat: 0, ilim: 0, gorev: 0 },
        yearly: { ayet: 0, namaz: 0, zikir: 0, salavat: 0, ilim: 0, gorev: 0 }
    });

    const fetchStats = useCallback(async () => {
        if (!user) return;
        setLoading(true);
        try {
            console.log("Manevi Analiz Fetching for:", user.uid);

            // 1. Trigger Server-Side Calculation (RPC)
            const { error: rpcError } = await supabase
                .rpc('recalculate_takva_analiz', { p_user_id: user.uid });

            if (rpcError) {
                console.error("RPC Error:", rpcError);
                throw rpcError;
            }

            // 2. Fetch Calculated Data from takva_analiz table
            const { data, error } = await supabase
                .from('takva_analiz')
                .select('daily, weekly, monthly, yearly')
                .eq('user_id', user.uid)
                .single();

            if (error && error.code !== 'PGRST116') {
                console.error("Table Fetch Error:", error);
                throw error;
            }

            console.log("Takva Analiz Data:", data);

            if (data) {
                setStats({
                    daily: data.daily || { ayet: 0, namaz: 0, zikir: 0, salavat: 0, ilim: 0, gorev: 0 },
                    weekly: data.weekly || { ayet: 0, namaz: 0, zikir: 0, salavat: 0, ilim: 0, gorev: 0 },
                    monthly: data.monthly || { ayet: 0, namaz: 0, zikir: 0, salavat: 0, ilim: 0, gorev: 0 },
                    yearly: data.yearly || { ayet: 0, namaz: 0, zikir: 0, salavat: 0, ilim: 0, gorev: 0 }
                });
            }

        } catch (err) {
            console.error('Error fetching manevi analiz DETAILS:', err);
        } finally {
            setLoading(false);
        }
    }, [user]);

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    return { stats, loading, refetch: fetchStats };
};
