import { useState, useEffect, useCallback } from 'react';
import { auth, db } from '../../../firebaseConfig';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

/**
 * Kuran okuma ilerlemesi hook'u
 * Firebase'de kullanıcının son okuduğu yer ve ilerlemesini saklar/yükler
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

      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        const readingProgress = data.readingProgress || null;
        setProgress(readingProgress);
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
      const userDocRef = doc(db, 'users', userId);
      await setDoc(
        userDocRef,
        {
          readingProgress: {
            ...progressData,
            lastUpdated: serverTimestamp(),
          },
        },
        { merge: true }
      );
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

