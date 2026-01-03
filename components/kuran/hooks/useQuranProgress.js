import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../../lib/supabase';
import { useUserStats } from '../../../contexts/UserStatsContext';

export const useQuranProgress = () => {
    const { user } = useUserStats();
    const [report, setReport] = useState({
        read_pages: [],
        surah_progress: {},
        juz_progress: {}
    });
    const [loading, setLoading] = useState(true);

    const fetchProgressReport = useCallback(async () => {
        if (!user?.uid) return;
        try {
            setLoading(true);
            const { data, error } = await supabase.rpc('get_user_quran_report', {
                p_user_id: user.uid
            });

            if (!error && data) {
                setReport(data);
            }
        } catch (error) {
            console.error('Error fetching quran report:', error);
        } finally {
            setLoading(false);
        }
    }, [user?.uid]);

    useEffect(() => {
        fetchProgressReport();
    }, [fetchProgressReport]);

    // Real-time update trigger (direct subscription to table)
    useEffect(() => {
        if (!user?.uid) return;

        const channel = supabase
            .channel(`quran_report:${user.uid}`)
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'user_quran_pages', filter: `user_id=eq.${user.uid}` },
                () => {
                    console.log('🔄 Quran Report Refreshing...');
                    fetchProgressReport();
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [user?.uid, fetchProgressReport]);

    const getJuzProgress = useCallback((juzId) => {
        return report.juz_progress[juzId.toString()] || 0;
    }, [report.juz_progress]);

    const getSurahProgress = useCallback((surahId) => {
        return report.surah_progress[surahId.toString()] || 0;
    }, [report.surah_progress]);

    const isPageRead = useCallback((pageNum) => {
        return report.read_pages.includes(pageNum);
    }, [report.read_pages]);

    return {
        readPages: new Set(report.read_pages),
        loading,
        getJuzProgress,
        getSurahProgress,
        isPageRead,
        refresh: fetchProgressReport
    };
};
