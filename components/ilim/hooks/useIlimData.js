import { useState, useEffect, useCallback } from 'react';
import { auth, db } from '../../../firebaseConfig';
import { doc, getDoc, setDoc, serverTimestamp, updateDoc, increment } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

/**
 * İlim modülü için Firebase hook'u
 * Kullanıcı bazlı puan, istatistik ve ilerleme yönetimi
 */
export const useIlimData = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Kullanıcı verileri
  const [totalPoints, setTotalPoints] = useState(0);
  const [dailyPoints, setDailyPoints] = useState(0);
  const [categoryStats, setCategoryStats] = useState({});
  const [lastDailyReset, setLastDailyReset] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);

  // Auth state dinle
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        loadUserData(firebaseUser.uid);
      } else {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  // Günlük puan reset kontrolü
  useEffect(() => {
    if (user) {
      checkDailyReset();
    }
  }, [user]);

  /**
   * Günlük puanı resetle (gece yarısı kontrolü)
   */
  const checkDailyReset = useCallback(() => {
    if (!user) return;
    
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    if (!lastDailyReset || new Date(lastDailyReset).getTime() < today.getTime()) {
      setDailyPoints(0);
      saveDailyReset(user.uid, today);
    }
  }, [user, lastDailyReset]);

  /**
   * Kullanıcı verilerini Firebase'den yükle
   */
  const loadUserData = useCallback(async (userId) => {
    try {
      setLoading(true);
      setError(null);

      const userDocRef = doc(db, 'users', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        const ilimData = data.ilim || {};
        
        setTotalPoints(ilimData.totalPoints || 0);
        setDailyPoints(ilimData.dailyPoints || 0);
        setCategoryStats(ilimData.categoryStats || {});
        setLastDailyReset(ilimData.lastDailyReset?.toDate() || null);
        setAnsweredQuestions(ilimData.answeredQuestions || []);
        setCurrentQuestionId(ilimData.currentQuestionId || null);
      } else {
        // Kullanıcı dokümanı yoksa başlat
        await initializeUserData(userId);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Kullanıcı verilerini başlat
   */
  const initializeUserData = useCallback(async (userId) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      await setDoc(
        userDocRef,
        {
          ilim: {
            totalPoints: 0,
            dailyPoints: 0,
            categoryStats: {},
            lastDailyReset: serverTimestamp(),
            answeredQuestions: [],
            currentQuestionId: null,
          },
        },
        { merge: true }
      );
      
      setTotalPoints(0);
      setDailyPoints(0);
      setCategoryStats({});
      setLastDailyReset(new Date());
      setAnsweredQuestions([]);
      setCurrentQuestionId(null);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  /**
   * Günlük reset zamanını kaydet
   */
  const saveDailyReset = useCallback(async (userId, resetDate) => {
    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        'ilim.lastDailyReset': resetDate,
        'ilim.dailyPoints': 0,
      });
      setLastDailyReset(resetDate);
      setDailyPoints(0);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  /**
   * Doğru cevap verildiğinde puan ekle
   */
  const addPoints = useCallback(async (points, categoryKey, isCorrect) => {
    if (!user) return;

    try {
      const userDocRef = doc(db, 'users', user.uid);
      
      // Günlük reset kontrolü
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      
      let currentDailyPoints = dailyPoints;
      if (!lastDailyReset || new Date(lastDailyReset).getTime() < today.getTime()) {
        currentDailyPoints = 0;
        await saveDailyReset(user.uid, today);
      }

      // Puan hesapla (sadece doğru cevap verildiğinde)
      if (isCorrect) {
        const newTotalPoints = totalPoints + points;
        const newDailyPoints = currentDailyPoints + points;

        // Kategori istatistiklerini güncelle
        const updatedCategoryStats = { ...categoryStats };
        if (!updatedCategoryStats[categoryKey]) {
          updatedCategoryStats[categoryKey] = {
            correct: 0,
            incorrect: 0,
            totalPoints: 0,
          };
        }

        updatedCategoryStats[categoryKey].correct += 1;
        updatedCategoryStats[categoryKey].totalPoints += points;

        // Firebase'e kaydet
        await updateDoc(userDocRef, {
          'ilim.totalPoints': newTotalPoints,
          'ilim.dailyPoints': newDailyPoints,
          [`ilim.categoryStats.${categoryKey}`]: updatedCategoryStats[categoryKey],
        });

        setTotalPoints(newTotalPoints);
        setDailyPoints(newDailyPoints);
        setCategoryStats(updatedCategoryStats);
      } else {
        // Yanlış cevap - sadece istatistik güncelle
        const updatedCategoryStats = { ...categoryStats };
        if (!updatedCategoryStats[categoryKey]) {
          updatedCategoryStats[categoryKey] = {
            correct: 0,
            incorrect: 0,
            totalPoints: 0,
          };
        }

        updatedCategoryStats[categoryKey].incorrect += 1;

        await updateDoc(userDocRef, {
          [`ilim.categoryStats.${categoryKey}`]: updatedCategoryStats[categoryKey],
        });

        setCategoryStats(updatedCategoryStats);
      }
    } catch (err) {
      setError(err.message);
    }
  }, [user, totalPoints, dailyPoints, categoryStats, lastDailyReset, saveDailyReset]);

  /**
   * Kategori bazlı 10 üzerinden puan hesapla
   */
  const getCategoryScore = useCallback((categoryKey) => {
    const stats = categoryStats[categoryKey];
    if (!stats) return 0;

    const total = stats.correct + stats.incorrect;
    if (total === 0) return 0;

    // Doğru yanıt yüzdesi * 10
    const percentage = (stats.correct / total) * 100;
    return Math.round((percentage / 10) * 10) / 10; // 0-10 arası, 1 ondalık basamak
  }, [categoryStats]);

  /**
   * Tüm kategorilerin istatistiklerini getir
   */
  const getAllCategoryStats = useCallback(() => {
    const categories = ['fikih', 'kuran', 'hadis', 'ahlak', 'siyer', 'gunler', 'kavramlar', 'esma'];
    
    return categories.map((categoryKey) => {
      const stats = categoryStats[categoryKey] || { correct: 0, incorrect: 0, totalPoints: 0 };
      const score = getCategoryScore(categoryKey);
      
      return {
        categoryKey,
        score,
        correct: stats.correct || 0,
        incorrect: stats.incorrect || 0,
        total: (stats.correct || 0) + (stats.incorrect || 0),
      };
    });
  }, [categoryStats, getCategoryScore]);

  /**
   * Çözülen soruyu kaydet
   * Eğer tüm sorular çözülmüşse, answeredQuestions'ı sıfırlayıp yeniden başlatır
   */
  const markQuestionAsAnswered = useCallback(async (questionId, totalQuestionCount = null) => {
    if (!user || !questionId) return;

    try {
      const userDocRef = doc(db, 'users', user.uid);
      
      // Eğer soru zaten çözülmüşse ekleme
      if (answeredQuestions.includes(questionId)) {
        return;
      }

      const updatedAnsweredQuestions = [...answeredQuestions, questionId];
      
      // Eğer toplam soru sayısı verildiyse ve tüm sorular çözüldüyse, yeniden başlat
      // Not: totalQuestionCount kontrolü yapıyoruz, eğer tüm sorular çözüldüyse answeredQuestions'ı temizle
      // Böylece kullanıcı sayfaya tekrar girebilir ve sorular tekrar gösterilir
      let finalAnsweredQuestions = updatedAnsweredQuestions;
      if (totalQuestionCount && totalQuestionCount > 0 && updatedAnsweredQuestions.length >= totalQuestionCount) {
        // Tüm sorular çözülmüş, yeniden başlat (answeredQuestions'ı temizle)
        // Kullanıcı sayfaya tekrar girebilir ve sorular tekrar gösterilir
        finalAnsweredQuestions = [];
      }
      
      await updateDoc(userDocRef, {
        'ilim.answeredQuestions': finalAnsweredQuestions,
      });

      setAnsweredQuestions(finalAnsweredQuestions);
    } catch (err) {
      setError(err.message);
    }
  }, [user, answeredQuestions]);

  /**
   * Mevcut soru ID'sini kaydet
   */
  const saveCurrentQuestionId = useCallback(async (questionId) => {
    if (!user) return;

    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, {
        'ilim.currentQuestionId': questionId,
      });

      setCurrentQuestionId(questionId);
    } catch (err) {
      setError(err.message);
    }
  }, [user]);

  return {
    user,
    loading,
    error,
    totalPoints,
    dailyPoints,
    categoryStats,
    answeredQuestions,
    currentQuestionId,
    addPoints,
    getCategoryScore,
    getAllCategoryStats,
    markQuestionAsAnswered,
    saveCurrentQuestionId,
    reloadData: () => user && loadUserData(user.uid),
  };
};

