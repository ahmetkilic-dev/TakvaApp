import { useState, useEffect, useCallback, useMemo } from 'react';
import { auth } from '../firebaseConfig';
import { supabase } from '../lib/supabase';
import { onAuthStateChanged } from 'firebase/auth';

/**
 * Gün değişimi kontrolü hook'u
 * Supabase hesap bazlı gün kontrolü yapar
 * 
 * @returns {Object} { isDayChanged, daysPassed, isLoading, updateLastActiveDate }
 */
export const useDayChange = () => {
  const [user, setUser] = useState(null);
  const [lastActiveDate, setLastActiveDate] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  const getToday = useCallback(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const fetchLastActiveDate = useCallback(async (userId) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('last_active_date')
        .eq('id', userId)
        .single();

      if (profile && profile.last_active_date) {
        const lastDate = new Date(profile.last_active_date);
        lastDate.setHours(0, 0, 0, 0);
        setLastActiveDate(lastDate);
      } else {
        const todayDate = getToday();
        await updateLastActiveDate(userId);
        setLastActiveDate(todayDate);
      }
    } catch (err) {
      console.error('🔴 Gün kontrolü hatası (fetchLastActiveDate):', err);
      setError(err);
      setLastActiveDate(getToday());
    } finally {
      setIsLoading(false);
    }
  }, [getToday]);

  const updateLastActiveDate = useCallback(async (userId) => {
    if (!userId) return;

    try {
      const now = new Date();
      const dateStr = now.toISOString().split('T')[0]; // YYYY-MM-DD

      await supabase.from('profiles').upsert({
        id: userId,
        last_active_date: dateStr,
        last_active_date_updated: new Date().toISOString()
      });

      const normalizedNow = new Date(dateStr);
      normalizedNow.setHours(0, 0, 0, 0);
      setLastActiveDate(normalizedNow);
      console.log('✅ Son aktif tarih güncellendi:', dateStr);
    } catch (err) {
      console.error('🔴 Son aktif tarih güncelleme hatası:', err);
      setError(err);
    }
  }, []);

  useEffect(() => {
    if (user?.uid) {
      setIsLoading(true);
      fetchLastActiveDate(user.uid);
    } else {
      setIsLoading(false);
      setLastActiveDate(null);
    }
  }, [user?.uid, fetchLastActiveDate]);

  const isDayChanged = useMemo(() => {
    if (!lastActiveDate || isLoading) return false;
    const lastDate = new Date(lastActiveDate);
    lastDate.setHours(0, 0, 0, 0);
    const todayDate = getToday();
    return lastDate.getTime() !== todayDate.getTime();
  }, [lastActiveDate, isLoading, getToday]);

  const daysPassed = useMemo(() => {
    if (!lastActiveDate || isLoading || !isDayChanged) return 0;
    const lastDate = new Date(lastActiveDate);
    lastDate.setHours(0, 0, 0, 0);
    const todayDate = getToday();
    const diffTime = todayDate.getTime() - lastDate.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.max(0, diffDays);
  }, [lastActiveDate, isLoading, isDayChanged, getToday]);

  useEffect(() => {
    if (isDayChanged && user?.uid && !isLoading) {
      updateLastActiveDate(user.uid);
    }
  }, [isDayChanged, user?.uid, isLoading, updateLastActiveDate]);

  return {
    isDayChanged,
    daysPassed,
    isLoading,
    error,
    lastActiveDate,
    getToday,
    user,
    updateLastActiveDate: () => user?.uid && updateLastActiveDate(user.uid),
  };
};

