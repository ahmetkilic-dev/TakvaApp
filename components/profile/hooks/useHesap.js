import { useState, useCallback, useEffect } from 'react';
import { auth } from '../../../firebaseConfig';
import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword,
    updateEmail as updateFirebaseEmail,
    deleteUser
} from 'firebase/auth';
import { supabase } from '../../../lib/supabase';

export const useHesap = () => {
    const [user, setUser] = useState(auth.currentUser);
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState(null);

    const fetchProfile = useCallback(async () => {
        if (!user) return;
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user.uid)
                .single();

            if (data) setProfile(data);
        } catch (error) {
            console.error('Error fetching profile:', error);
        }
    }, [user]);

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    const checkUniqueness = async (column, value) => {
        const { data, error } = await supabase
            .from('profiles')
            .select('id')
            .eq(column, value)
            .neq('id', user.uid); // Kendi id'si hariç

        if (error) return true;
        return !(data && data.length > 0);
    };

    const updatePhone = async (newPhone) => {
        setLoading(true);
        try {
            const isUnique = await checkUniqueness('phone', newPhone);
            if (!isUnique) throw new Error('Bu telefon numarası zaten kullanımda.');

            const { error } = await supabase
                .from('profiles')
                .update({ phone: newPhone, updated_at: new Date().toISOString() })
                .eq('id', user.uid);

            if (error) throw error;
            await fetchProfile();
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const updateEmail = async (newEmail) => {
        setLoading(true);
        try {
            const isUnique = await checkUniqueness('email', newEmail);
            if (!isUnique) throw new Error('Bu e-posta adresi zaten kullanımda.');

            // Firebase update
            await updateFirebaseEmail(user, newEmail);

            // Supabase update
            const { error } = await supabase
                .from('profiles')
                .update({ email: newEmail, updated_at: new Date().toISOString() })
                .eq('id', user.uid);

            if (error) throw error;
            await fetchProfile();
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const updateBirthDate = async (newDate) => {
        setLoading(true);
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ birth_date: newDate, updated_at: new Date().toISOString() })
                .eq('id', user.uid);

            if (error) throw error;
            await fetchProfile();
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const changePassword = async (currentPassword, newPassword) => {
        setLoading(true);
        try {
            const credential = EmailAuthProvider.credential(user.email, currentPassword);
            await reauthenticateWithCredential(user, credential);
            await updatePassword(user, newPassword);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    const deleteAccount = async (password) => {
        setLoading(true);
        try {
            const credential = EmailAuthProvider.credential(user.email, password);
            await reauthenticateWithCredential(user, credential);

            const uid = user.uid;

            // 1. Delete from all related tables in order
            await supabase.from('daily_user_stats').delete().eq('user_id', uid);
            await supabase.from('namaz_durumu').delete().eq('user_id', uid);
            await supabase.from('kaza_counters').delete().eq('user_id', uid);
            await supabase.from('user_stats').delete().eq('user_id', uid);
            await supabase.from('profiles').delete().eq('id', uid);

            // 2. Delete from Firebase Auth
            await deleteUser(user);

            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        profile,
        loading,
        updatePhone,
        updateEmail,
        updateBirthDate,
        changePassword,
        deleteAccount,
        refreshProfile: fetchProfile
    };
};
