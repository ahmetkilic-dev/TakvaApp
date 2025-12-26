import { useState, useEffect, useCallback } from 'react';
import { auth, db } from '../../../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

/**
 * Zikir sayısı hook'u
 * Firebase'de kullanıcı bazlı zikir sayısını saklar ve yükler
 * Production-ready, optimize edilmiş
 */
export const useDhikrCount = () => {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Firebase auth state dinle
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return unsubscribe;
  }, []);

  // Firebase'den zikir sayısını yükle
  const loadCount = useCallback(async (userId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        const dhikrCount = data.dhikrCount || 0;
        setCount(dhikrCount);
      } else {
        // Kullanıcı dokümanı yoksa sıfırla
        setCount(0);
        await setDoc(userDocRef, { dhikrCount: 0 }, { merge: true });
      }
    } catch (err) {
      console.error('Zikir sayısı yükleme hatası:', err);
      setError(err);
      setCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Zikir sayısını artır
  const incrementCount = useCallback(async (userId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      // Optimistic update - önce UI'ı güncelle
      setCount(prev => prev + 1);
      // Sonra Firebase'i güncelle
      const userDoc = await getDoc(userDocRef);
      const currentCount = userDoc.exists() ? (userDoc.data().dhikrCount || 0) : 0;
      await setDoc(userDocRef, { dhikrCount: currentCount + 1 }, { merge: true });
    } catch (err) {
      console.error('Zikir sayısı artırma hatası:', err);
      setError(err);
      // Hata durumunda optimistic update'i geri al
      setCount(prev => Math.max(0, prev - 1));
    }
  }, []);

  // Kullanıcı değiştiğinde sayıyı yükle
  useEffect(() => {
    if (user?.uid) {
      setLoading(true);
      loadCount(user.uid);
    } else {
      setLoading(false);
      setCount(0);
    }
  }, [user?.uid, loadCount]);

  return {
    count,
    loading,
    error,
    incrementCount: user?.uid ? () => incrementCount(user.uid) : null,
  };
};

