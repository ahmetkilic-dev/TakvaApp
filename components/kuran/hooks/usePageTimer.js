import { useEffect, useRef } from 'react';
import { supabase } from '../../../lib/supabase';
import { useUserStats } from '../../../contexts/UserStatsContext';

/**
 * Hook to track dwell time on a Quran page.
 * Marks page as read if user stays for 45 seconds.
 */
export const usePageTimer = (pageNumber, user) => {
    const { setStatsDirect } = useUserStats();
    const timerRef = useRef(null);
    const readStatusRef = useRef({}); // To avoid re-marking the same page in one session

    useEffect(() => {
        if (!pageNumber || !user?.uid) return;

        // 1. Record visit immediately (for "Last Read" location)
        // Optimistic update for UI
        setStatsDirect({ last_read_page: pageNumber });
        // Server update
        void supabase.rpc('record_quran_page_visit', {
            p_user_id: user.uid,
            p_page_number: pageNumber
        });

        // 2. Start 45s timer for "Mark as Read"
        if (readStatusRef.current[pageNumber]) return;

        if (timerRef.current) clearTimeout(timerRef.current);

        timerRef.current = setTimeout(async () => {
            console.log(`📖 Page ${pageNumber} read for 45s. Marking as read...`);
            try {
                const { data, error } = await supabase.rpc('mark_quran_page_read', {
                    p_user_id: user.uid,
                    p_page_number: pageNumber
                });

                if (error) {
                    console.error('❌ Error marking page as read:', error);
                } else {
                    console.log('✅ Page marked as read successfully:', data);
                    readStatusRef.current[pageNumber] = true;
                }
            } catch (err) {
                console.error('❌ RPC Exception:', err);
            }
        }, 45000); // 45 seconds

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [pageNumber, user?.uid, setStatsDirect]);

    return null;
};
