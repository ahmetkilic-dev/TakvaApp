import { useState, useEffect, useCallback, useMemo } from 'react';
import { auth } from '../../../firebaseConfig';
import { supabase } from '../../../lib/supabase';
import { onAuthStateChanged } from 'firebase/auth';
import { useDayChangeContext } from '../../../contexts/DayChangeContext';

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
  const { getToday, isDayChanged } = useDayChangeContext(); // isDayChanged is just a signal now, not used for local reset
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Kullanıcı verileri
  const [totalPoints, setTotalPoints] = useState(0);
  const [dailyPoints, setDailyPoints] = useState(0);
  const [categoryStats, setCategoryStats] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [currentQuestionId, setCurrentQuestionId] = useState(null);
  const [quizCount, setQuizCount] = useState(0);

  const today = useMemo(() => (getToday ? getToday() : new Date()), [getToday]);
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
  const loadUserData = useCallback(async (userId) => {
    try {
      setLoading(true);
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
        .select('ilim_points')
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

      // Set Daily Points from the daily table
      if (dailyStats) {
        setDailyPoints(dailyStats.ilim_points || 0);
      } else {
        setDailyPoints(0); // No record for today = 0 points
      }

    } catch (err) {
      console.error('Error loading ilim data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
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
   * Doğru cevap verildiğinde puan ekle
   */
  const addPoints = useCallback(async (points, categoryKey, isCorrect) => {
    if (!user) return;

    try {
      if (isCorrect) {
        const newTotalPoints = totalPoints + points;
        const newDailyPoints = dailyPoints + points;
        const newQuizCount = quizCount + 1;
        const updatedCategoryStats = { ...categoryStats };

        if (!updatedCategoryStats[categoryKey]) {
          updatedCategoryStats[categoryKey] = { correct: 0, incorrect: 0, totalPoints: 0 };
        }
        updatedCategoryStats[categoryKey].correct += 1;
        updatedCategoryStats[categoryKey].totalPoints += points;

        // 1. Update TOTAL stats in user_stats
        // Note: We don't update ilim_daily_points here anymore
        await supabase.from('user_stats').upsert({
          user_id: user.uid,
          ilim_total_points: newTotalPoints,
          ilim_category_stats: { ...categoryStats, [categoryKey]: updatedCategoryStats[categoryKey] },
          quiz_count: newQuizCount,
          updated_at: new Date().toISOString()
        });

        // 2. Update DAILY stats in daily_user_stats (keying by todayKey)
        // This ensures auto-reset on new day
        await supabase.from('daily_user_stats').upsert({
          user_id: user.uid,
          date_key: todayKey,
          ilim_points: newDailyPoints,
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id, date_key' }); // Ensure we strictly update today's row

        setTotalPoints(newTotalPoints);
        setDailyPoints(newDailyPoints);
        setCategoryStats(updatedCategoryStats);
        setQuizCount(newQuizCount);
      } else {
        // Incorrect answer logic remains same (only category stats update)
        const updatedCategoryStats = { ...categoryStats };
        if (!updatedCategoryStats[categoryKey]) {
          updatedCategoryStats[categoryKey] = { correct: 0, incorrect: 0, totalPoints: 0 };
        }
        updatedCategoryStats[categoryKey].incorrect += 1;

        await supabase.from('user_stats').upsert({
          user_id: user.uid,
          ilim_category_stats: { ...categoryStats, [categoryKey]: updatedCategoryStats[categoryKey] },
          updated_at: new Date().toISOString()
        });

        setCategoryStats(updatedCategoryStats);
      }
    } catch (err) {
      console.error('Error adding points:', err);
      setError(err.message);
    }
  }, [user, totalPoints, dailyPoints, categoryStats, quizCount, todayKey]);

  const getCategoryScore = useCallback((categoryKey) => {
    const stats = categoryStats[categoryKey];
    if (!stats) return 0;
    const total = stats.correct + stats.incorrect;
    if (total === 0) return 0;
    const percentage = (stats.correct / total) * 100;
    return Math.round((percentage / 10) * 10) / 10;
  }, [categoryStats]);

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

  return {
    user,
    loading,
    error,
    totalPoints,
    dailyPoints,
    quizCount,
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

