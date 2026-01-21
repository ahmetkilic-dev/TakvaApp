import { useState, useEffect, useCallback, useMemo } from 'react';
import { auth } from '../../../firebaseConfig';
import { supabase } from '../../../lib/supabase';
import { onAuthStateChanged } from 'firebase/auth';
import { useDayChangeContext } from '../../../contexts/DayChangeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const pad2 = (n) => String(n).padStart(2, '0');
const toDayKeyLocal = (date) => {
  const y = date.getFullYear();
  const m = pad2(date.getMonth() + 1);
  const d = pad2(date.getDate());
  return `${y}-${m}-${d}`;
};

/**
 * İlim modülü için Supabase hook'u
 * Kullanıcı bazlı puan, istatistik ve ilerleme yönetimi
 */
export const useIlimData = () => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Kullanıcı verileri
  const [totalPoints, setTotalPoints] = useState(0);
  const [dailyPoints, setDailyPoints] = useState(0);
  const [dailyQuestionCount, setDailyQuestionCount] = useState(0);
  const [dailyWrongCount, setDailyWrongCount] = useState(0);
  const [categoryStats, setCategoryStats] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [quizCount, setQuizCount] = useState(0);

  const today = useMemo(() => new Date(), []);
  const todayKey = useMemo(() => toDayKeyLocal(today), [today]);

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

  /**
   * Kullanıcı verilerini Supabase'den yükle
   */
  const loadUserData = useCallback(async (userId, silent = false) => {
    try {
      if (!silent) setLoading(true);
      setError(null);

      // 1. Fetch persistent stats (Total points, Category stats, etc.)
      const { data: mainStats } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', userId)
        .single();

      // 2. Fetch DAILY stats (Daily points for TODAY)
      const { data: dailyStats } = await supabase
        .from('daily_user_stats')
        .select('ilim_points, question_count, wrong_answer_count')
        .eq('user_id', userId)
        .eq('date_key', todayKey) // Only fetch for today
        .maybeSingle();

      if (mainStats) {
        setTotalPoints(mainStats.ilim_total_points || 0);
        setCategoryStats(mainStats.ilim_category_stats || {});
        setAnsweredQuestions(mainStats.ilim_answered_questions || []);
        setCurrentQuestionId(mainStats.ilim_current_question_id || null);
        setQuizCount(mainStats.quiz_count || 0);
      } else {
        // Initialize if user_stats doesn't exist
        await initializeUserData(userId);
      }

      if (dailyStats) {
        setDailyPoints(dailyStats.ilim_points || 0);
        setDailyQuestionCount(dailyStats.question_count || 0);
        setDailyWrongCount(dailyStats.wrong_answer_count || 0);
      } else {
        setDailyPoints(0); // No record for today = 0 points
        setDailyQuestionCount(0);
        setDailyWrongCount(0);
      }

    } catch (err) {
      console.error('Error loading ilim data:', err);
      setError(err.message);
    } finally {
      if (!silent) setLoading(false);
    }
  }, [todayKey]);

  /**
   * Kullanıcı verilerini başlat (user_stats)
   */
  const initializeUserData = useCallback(async (userId) => {
    try {
      const now = new Date().toISOString();
      await supabase.from('user_stats').upsert({
        user_id: userId,
        ilim_total_points: 0,
        ilim_category_stats: {},
        ilim_answered_questions: [],
        ilim_current_question_id: null,
        quiz_count: 0,
        updated_at: now
      });

      setTotalPoints(0);
      setCategoryStats({});
      setAnsweredQuestions([]);
      setCurrentQuestionId(null);
      setQuizCount(0);
    } catch (err) {
      setError(err.message);
    }
  }, []);

  /**
   * Doğru cevap verildiğinde puan ekle - ARTIK SUNUCU TARAFLI
   */
  const addPoints = useCallback(async (points, categoryKey, isCorrect) => {
    if (!user) return;

    // OPTIMISTIC UPDATE: Anında ekranı güncelle (Server cevabını bekleme)
    if (isCorrect) {
      setDailyPoints(prev => prev + points);
      setTotalPoints(prev => prev + points);
      setDailyQuestionCount(prev => prev + 1);
      // Kategori istatistiklerini de basitçe güncelle
      setCategoryStats(prev => {
        const cat = prev[categoryKey] || { correct: 0, incorrect: 0, score: 0 };
        return {
          ...prev,
          [categoryKey]: {
            ...cat,
            correct: (cat.correct || 0) + 1,
            score: (cat.score || 0) + points
          }
        };
      });
    } else {
      // Yanlış cevap: Kalbi anında düşür
      setDailyWrongCount(prev => prev + 1);
      setDailyQuestionCount(prev => prev + 1);
      setCategoryStats(prev => {
        const cat = prev[categoryKey] || { correct: 0, incorrect: 0, score: 0 };
        return {
          ...prev,
          [categoryKey]: {
            ...cat,
            incorrect: (cat.incorrect || 0) + 1
          }
        };
      });
    }

    try {
      const { error } = await supabase.rpc('record_ilim_answer', {
        p_user_id: user.uid,
        p_category_key: categoryKey,
        p_is_correct: isCorrect,
        p_points: points
      });

      if (error) throw error;

      // REMOVED: await loadUserData(user.uid, true);
      // NEDEN KALDIRILDI?
      // Çünkü sunucu, biz RPC çağrısını yaptıktan hemen sonra veriyi döndürüyor olabilir AMA
      // bazen işlem gecikirse "eski (stale)" veriyi gönderip bizim optimistic update'i eziyordu.
      // Bu yüzden local state'e güveniyoruz. Sayfa yenilenince zaten serverdan çekecek.

    } catch (err) {
      console.error('Error recording ilim answer:', err);
      setError(err.message);
    }
  }, [user]);

  const getAllCategoryStats = useCallback(() => {
    const categories = ['fikih', 'kuran', 'hadis', 'ahlak', 'siyer', 'gunler', 'kavramlar', 'esma'];
    return categories.map((categoryKey) => {
      const stats = categoryStats[categoryKey] || { correct: 0, incorrect: 0, totalPoints: 0, score: 0 };
      return {
        categoryKey,
        score: stats.score || 0, // Artık sunucudan hazır geliyor
        correct: stats.correct || 0,
        incorrect: stats.incorrect || 0,
        total: (stats.correct || 0) + (stats.incorrect || 0),
      };
    });
  }, [categoryStats]);

  const markQuestionAsAnswered = useCallback(async (questionId, totalQuestionCount = null) => {
    if (!user || !questionId) return;

    try {
      if (answeredQuestions.includes(questionId)) return;

      let finalAnsweredQuestions = [...answeredQuestions, questionId];
      if (totalQuestionCount && totalQuestionCount > 0 && finalAnsweredQuestions.length >= totalQuestionCount) {
        finalAnsweredQuestions = [];
      }

      await supabase.from('user_stats').upsert({
        user_id: user.uid,
        ilim_answered_questions: finalAnsweredQuestions,
        updated_at: new Date().toISOString()
      });

      setAnsweredQuestions(finalAnsweredQuestions);
    } catch (err) {
      setError(err.message);
    }
  }, [user, answeredQuestions]);

  const saveCurrentQuestionId = useCallback(async (questionId) => {
    if (!user) return;

    try {
      await supabase.from('user_stats').upsert({
        user_id: user.uid,
        ilim_current_question_id: questionId,
        updated_at: new Date().toISOString()
      });

      setCurrentQuestionId(questionId);
    } catch (err) {
      setError(err.message);
    }
  }, [user]);
  // Günlük limit kontrolü (Server state'e göre)
  const checkDailyLimit = useCallback((tier) => {
    // Premium sınırsız
    if (tier === 'premium') return { allowed: true, limit: Infinity, used: dailyWrongCount };

    // Plus: 10 yanlış, Free: 3 yanlış
    const limit = tier === 'plus' ? 10 : 3;
    const used = dailyWrongCount;

    return { allowed: used < limit, limit, used };
  }, [dailyWrongCount]);

  // Reklam izleyince can kazandır (Yanlış sayısını 1 azalt)
  const rewardLife = useCallback(async () => {
    if (!user) return;

    const newCount = Math.max(0, dailyWrongCount - 1);

    // OPTIMISTIC UPDATE
    setDailyWrongCount(newCount);

    try {
      await supabase
        .from('daily_user_stats')
        .update({ wrong_answer_count: newCount })
        .eq('user_id', user.uid)
        .eq('date_key', todayKey);
    } catch (e) {
      console.error('Error rewarding life:', e);
    }
  }, [user, dailyWrongCount, todayKey]);

  return {
    user,
    loading,
    error,
    totalPoints,
    dailyPoints,
    dailyWrongCount,
    quizCount,
    categoryStats,
    answeredQuestions,
    currentQuestionId,
    addPoints,
    getAllCategoryStats,
    markQuestionAsAnswered,
    saveCurrentQuestionId,
    reloadData: () => user && loadUserData(user.uid),
    reloadData: () => user && loadUserData(user.uid),
    checkDailyLimit,
    rewardLife
  };
};

