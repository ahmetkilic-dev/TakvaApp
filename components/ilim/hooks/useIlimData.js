import { useState, useEffect, useCallback } from 'react';
import { auth } from '../../../firebaseConfig';
import { supabase } from '../../../lib/supabase';
import { onAuthStateChanged } from 'firebase/auth';
import { useDayChangeContext } from '../../../contexts/DayChangeContext';

/**
 * İlim modülü için Supabase hook'u
 * Kullanıcı bazlı puan, istatistik ve ilerleme yönetimi
 */
export const useIlimData = () => {
  const { isDayChanged } = useDayChangeContext();
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
  const [quizCount, setQuizCount] = useState(0); // Toplam doğru cevap sayısı

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

  // Günlük puan reset kontrolü - isDayChanged ile
  useEffect(() => {
    if (user && isDayChanged) {
      console.log('📚 Gün değişti! İlim günlük puanı sıfırlanıyor...');
      const resetDate = new Date().toISOString();
      const resetIlimDaily = async () => {
        try {
          await supabase.from('user_stats').upsert({
            user_id: user.uid,
            ilim_last_daily_reset: resetDate,
            ilim_daily_points: 0,
            updated_at: resetDate
          });
          setLastDailyReset(new Date(resetDate));
          setDailyPoints(0);
        } catch (err) {
          console.error('İlim günlük puan sıfırlama hatası:', err);
        }
      };
      resetIlimDaily();
    }
  }, [user, isDayChanged]);

  /**
   * Kullanıcı verilerini Supabase'den yükle
   */
  const loadUserData = useCallback(async (userId) => {
    try {
      setLoading(true);
      setError(null);

      const { data: stats, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (stats) {
        setTotalPoints(stats.ilim_total_points || 0);
        setDailyPoints(stats.ilim_daily_points || 0);
        setCategoryStats(stats.ilim_category_stats || {});
        setLastDailyReset(stats.ilim_last_daily_reset ? new Date(stats.ilim_last_daily_reset) : null);
        setAnsweredQuestions(stats.ilim_answered_questions || []);
        setCurrentQuestionId(stats.ilim_current_question_id || null);
        setQuizCount(stats.quiz_count || 0);
      } else {
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
      const now = new Date().toISOString();
      await supabase.from('user_stats').upsert({
        user_id: userId,
        ilim_total_points: 0,
        ilim_daily_points: 0,
        ilim_category_stats: {},
        ilim_last_daily_reset: now,
        ilim_answered_questions: [],
        ilim_current_question_id: null,
        quiz_count: 0,
        updated_at: now
      });

      setTotalPoints(0);
      setDailyPoints(0);
      setCategoryStats({});
      setLastDailyReset(new Date(now));
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

        await supabase.from('user_stats').upsert({
          user_id: user.uid,
          ilim_total_points: newTotalPoints,
          ilim_daily_points: newDailyPoints,
          ilim_category_stats: { ...categoryStats, [categoryKey]: updatedCategoryStats[categoryKey] },
          quiz_count: newQuizCount,
          updated_at: new Date().toISOString()
        });

        setTotalPoints(newTotalPoints);
        setDailyPoints(newDailyPoints);
        setCategoryStats(updatedCategoryStats);
        setQuizCount(newQuizCount);
      } else {
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
      setError(err.message);
    }
  }, [user, totalPoints, dailyPoints, categoryStats]);

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

