import { useState, useEffect, useCallback } from 'react';
import { auth } from '../../../firebaseConfig';
import { supabase } from '../../../lib/supabase';
import { onAuthStateChanged } from 'firebase/auth';

/**
 * Kuran okuma ilerlemesi hook'u
 * Supabase'de kullanıcının son okuduğu yer ve ilerlemesini saklar/yükler
 */
export const useReadingProgress = () => {
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  // İlerleme yükle
  const loadProgress = useCallback(async (userId) => {
    try {
      setLoading(true);
      setError(null);

      const { data: stats, error } = await supabase
        .from('user_stats')
        .select('reading_progress')
        .eq('user_id', userId)
        .single();

      if (stats) {
        setProgress(stats.reading_progress || null);
      } else {
        setProgress(null);
      }
    } catch (err) {
      console.error('İlerleme yükleme hatası:', err);
      setError(err.message);
      setProgress(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // İlerleme kaydet
  const saveProgress = useCallback(async (userId, progressData) => {
    try {
      await supabase.from('user_stats').upsert({
        user_id: userId,
        reading_progress: {
          ...progressData,
          last_updated: new Date().toISOString(),
        },
        updated_at: new Date().toISOString()
      });
      setProgress(progressData);
    } catch (err) {
      console.error('İlerleme kaydetme hatası:', err);
      setError(err.message);
    }
  }, []);

  // Kullanıcı için saveProgress wrapper'ı
  const saveProgressForUser = useCallback((progressData) => {
    if (user?.uid) {
      saveProgress(user.uid, progressData);
    }
  }, [user?.uid, saveProgress]);

  useEffect(() => {
    if (user?.uid) {
      loadProgress(user.uid);
    } else {
      setLoading(false);
      setProgress(null);
    }
  }, [user?.uid, loadProgress]);

  return {
    progress,
    loading,
    error,
    saveProgress: saveProgressForUser,
    user,
  };
};

