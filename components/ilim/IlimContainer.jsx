import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import ScreenBackground from '../common/ScreenBackground';
import { useIlimData } from './hooks/useIlimData';

import IlimHeader from './IlimHeader';
import IlimPointsCard from './IlimPointsCard';
import IlimProgressBar from './IlimProgressBar';
import IlimCategoryIcon from './IlimCategoryIcon';
import IlimQuestionCard from './IlimQuestionCard';
import IlimAnswerOptions from './IlimAnswerOptions';
import IlimPauseModal from './IlimPauseModal';
import IlimStatisticsModal from './IlimStatisticsModal';
import * as questionUtils from './utils/questionUtils';

const { getRandomQuestion, getQuestionById, formatQuestionForDisplay, getAllQuestions } = questionUtils;


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const FONT_FAMILY = 'Plus Jakarta Sans';
const horizontalPadding = 20;

// ilimData.js'i import et
// NOT: ilimData.js dosyası export default ile export edilmelidir
let ilimDataRaw = null;
try {
  ilimDataRaw = require('../../constants/ilimData.js');
} catch (error) {
  // Dosya bulunamadı veya hatalı
}

export default function IlimContainer() {
  const {
    loading: ilimLoading,
    totalPoints,
    dailyPoints,
    addPoints,
    getAllCategoryStats,
    answeredQuestions,
    currentQuestionId,
    markQuestionAsAnswered,
    saveCurrentQuestionId,
  } = useIlimData();

  const scrollViewRef = useRef(null);


  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [isStatisticsModalVisible, setIsStatisticsModalVisible] = useState(false);
  const [questionLoading, setQuestionLoading] = useState(true);

  // ilimData'yı işle - export default veya named export olabilir
  const ilimData = useMemo(() => {
    if (!ilimDataRaw) {
      return null;
    }

    // Export default ise
    if (ilimDataRaw.default && typeof ilimDataRaw.default === 'object') {
      return ilimDataRaw.default;
    }

    // Eğer direkt obje ise ve boş değilse
    if (typeof ilimDataRaw === 'object' && Object.keys(ilimDataRaw).length > 0) {
      return ilimDataRaw;
    }

    // Hiçbiri değilse null döndür
    return null;
  }, []);

  // Toplam soru sayısını hesapla (1600 soru)
  const totalQuestionsCount = useMemo(() => {
    if (!ilimData) return 1600; // Fallback değer

    try {
      const { getAllQuestions } = require('./utils/questionUtils');
      const allQuestions = getAllQuestions(ilimData);
      return allQuestions ? allQuestions.length : 1600;
    } catch (error) {
      return 1600; // Fallback değer
    }
  }, [ilimData]);

  // Progress hesapla: cevaplanan soru sayısı / toplam soru sayısı * 100
  const progress = useMemo(() => {
    if (!answeredQuestions || answeredQuestions.length === 0) {
      return 0;
    }

    const answeredCount = answeredQuestions.length;
    const progressPercentage = (answeredCount / totalQuestionsCount) * 100;

    // 0-100 arası sınırla ve 2 ondalık basamağa yuvarla
    return Math.min(100, Math.max(0, Math.round(progressPercentage * 100) / 100));
  }, [answeredQuestions, totalQuestionsCount]);

  // Rastgele soru yükle (çözülmemiş sorulardan)
  const loadRandomQuestion = useCallback(() => {
    if (!ilimData) {
      setQuestionLoading(false);
      // ilimData null ise sessizce return et
      // ilimData.js henüz export edilmemiş olabilir
      return;
    }

    try {
      setQuestionLoading(true);
      const allQuestions = getAllQuestions(ilimData);

      // Eğer hiç soru yoksa sessizce return et
      if (!allQuestions || allQuestions.length === 0) {
        setQuestionLoading(false);
        return;
      }

      const randomQuestion = getRandomQuestion(ilimData, answeredQuestions || []);

      if (randomQuestion) {
        const formattedQuestion = formatQuestionForDisplay(randomQuestion);

        // Formatlama hatası kontrolü
        if (!formattedQuestion) {
          setQuestionLoading(false);
          return;
        }

        setCurrentQuestion(formattedQuestion);
        setSelectedAnswer(null);
        setShowExplanation(false);

        // Mevcut soru ID'sini kaydet
        if (saveCurrentQuestionId) {
          saveCurrentQuestionId(randomQuestion.id);
        }
      } else {
        // Bu durum normalde olmamalı çünkü getRandomQuestion tüm sorular çözülse bile soru döndürür
        setQuestionLoading(false);
      }
    } catch (error) {
      // Hata durumunda sessizce return et
      setQuestionLoading(false);
    } finally {
      setQuestionLoading(false);
    }
  }, [ilimData, answeredQuestions, saveCurrentQuestionId]);

  // İlk yüklemede soru seç - eğer mevcut soru varsa onu yükle, yoksa rastgele seç
  useEffect(() => {
    if (!ilimLoading && ilimData && !currentQuestion) {
      // Eğer mevcut soru ID'si varsa ve hala çözülmemişse, o soruyu yükle
      if (currentQuestionId && !answeredQuestions?.includes(currentQuestionId)) {
        try {
          setQuestionLoading(true);
          const existingQuestion = getQuestionById(ilimData, currentQuestionId);

          if (existingQuestion) {
            const formattedQuestion = formatQuestionForDisplay(existingQuestion);
            setCurrentQuestion(formattedQuestion);
            setSelectedAnswer(null);
            setQuestionLoading(false);
          } else {
            // Mevcut soru bulunamadıysa yeni soru seç
            loadRandomQuestion();
          }
        } catch (error) {
          // Hata durumunda yeni soru seç
          loadRandomQuestion();
        }
      } else {
        // Mevcut soru yoksa veya çözülmüşse yeni soru seç
        loadRandomQuestion();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ilimLoading, ilimData]);

  // Cevap seçildiğinde
  const handleAnswerSelect = useCallback((answerId) => {
    if (!currentQuestion || selectedAnswer !== null) return; // Zaten cevap verilmişse tekrar seçilemez

    setSelectedAnswer(answerId);

    const isCorrect = answerId === currentQuestion.correctAnswer;

    // Toplam soru sayısını al (tüm sorular çözüldüğünde yeniden başlatmak için)
    let allQuestionsCount = 0;
    try {
      const { getAllQuestions } = require('./utils/questionUtils');
      const allQuestions = getAllQuestions(ilimData);
      allQuestionsCount = allQuestions ? allQuestions.length : 0;
    } catch (error) {
      // Hata durumunda 0 kullan
      allQuestionsCount = 0;
    }

    // Soruyu çözülen sorular listesine ekle (tüm sorular çözüldüyse otomatik sıfırlanır)
    if (markQuestionAsAnswered && currentQuestion.id) {
      markQuestionAsAnswered(currentQuestion.id, allQuestionsCount);
    }

    // Puan ekle
    if (isCorrect) {
      addPoints(currentQuestion.points, currentQuestion.category, true);
    } else {
      addPoints(0, currentQuestion.category, false);
    }

    // 3 saniye sonra yeni soru yükle ve açıklamayı kapat
    setShowExplanation(true);

    setTimeout(() => {
      setSelectedAnswer(null);
      setShowExplanation(false);
      loadRandomQuestion();
    }, 4000);


  }, [currentQuestion, selectedAnswer, addPoints, loadRandomQuestion, markQuestionAsAnswered, ilimData]);

  // Açıklama gösterilince otomatik aşağı kaydır
  useEffect(() => {
    if (showExplanation && scrollViewRef.current) {
      const timer = setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [showExplanation]);


  // İstatistikleri al - modal için formatla
  const categoryStatsForModal = useMemo(() => {
    const stats = getAllCategoryStats();
    const statsMap = {};
    stats.forEach((stat) => {
      statsMap[stat.categoryKey] = {
        score: stat.score,
        correct: stat.correct,
        incorrect: stat.incorrect,
      };
    });
    return statsMap;
  }, [getAllCategoryStats]);

  // Loading durumu - Sadece başlangıçta veya soru yoksa tam ekran loader göster
  if (ilimLoading || (questionLoading && !currentQuestion) || !currentQuestion) {
    return (
      <ScreenBackground>
        <SafeAreaView edges={['top']} style={styles.safeArea}>
          <IlimHeader />
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FFFFFF" />
          </View>
        </SafeAreaView>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        <IlimHeader />

        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, showExplanation && { paddingTop: 10 }]}
        >
          {/* Title Section */}
          {!showExplanation && (
            <View style={styles.titleSection}>
              <Text style={styles.titleText}>
                İlim Yolculuğu
              </Text>
              <Text style={styles.subtitle}>
                Bilgini ölç, ilmini artır.
              </Text>
            </View>
          )}

          {/* White Box Container */}
          <View style={[styles.whiteBox, showExplanation && { padding: 16, marginTop: 10 }]}>

            {/* Points Card */}
            <View style={styles.pointsCardContainer}>
              <IlimPointsCard
                dailyPoints={dailyPoints}
                totalPoints={totalPoints}
              />
            </View>

            {/* Progress Bar */}
            <View style={styles.progressBarContainer}>
              <IlimProgressBar progress={progress} />
            </View>

            {/* Pause Button */}
            {!showExplanation && (
              <View style={styles.pauseButtonContainer}>
                <TouchableOpacity
                  onPress={() => setIsModalVisible(true)}
                  style={styles.pauseButton}
                >
                  <Ionicons name="pause" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            )}

            {/* Category Section */}
            <View style={[styles.categorySection, showExplanation && { marginBottom: 12 }]}>

              <IlimCategoryIcon
                categoryKey={currentQuestion.category}
                categoryName={currentQuestion.categoryName}
              />
            </View>

            {/* Question Section */}
            <View style={styles.questionSection}>
              <IlimQuestionCard question={currentQuestion.question} />
            </View>

            {/* Answer Options */}
            <View style={styles.answersSection}>
              <IlimAnswerOptions
                answers={currentQuestion.answers}
                selectedAnswer={selectedAnswer}
                correctAnswer={currentQuestion.correctAnswer}
                onSelectAnswer={handleAnswerSelect}
              />
            </View>

            {/* Explanation Section */}
            {showExplanation && currentQuestion.explanation && (
              <View style={styles.explanationSection}>
                <View style={styles.explanationHeader}>
                  <View style={styles.explanationIconBadge}>
                    <Ionicons name="book-outline" size={14} color="#D4AF37" />
                  </View>
                  <Text style={styles.explanationTitle}>Biliyor muydunuz?</Text>
                </View>
                <Text style={styles.explanationText}>
                  {currentQuestion.explanation}
                </Text>
              </View>
            )}

          </View>

        </ScrollView>
      </SafeAreaView>

      {/* Pause Modal */}
      <IlimPauseModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onStatistics={() => {
          setIsModalVisible(false);
          setIsStatisticsModalVisible(true);
        }}
      />

      {/* Statistics Modal */}
      <IlimStatisticsModal
        visible={isStatisticsModalVisible}
        onClose={() => setIsStatisticsModalVisible(false)}
        categoryStats={categoryStatsForModal}
      />
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: horizontalPadding,
    paddingTop: 24,
    paddingBottom: 0,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  titleText: {
    fontFamily: FONT_FAMILY,
    fontSize: 21,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontFamily: FONT_FAMILY,
    fontSize: 13,
    fontWeight: '400',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  whiteBox: {
    width: '100%',
    maxWidth: Math.min(SCREEN_WIDTH - horizontalPadding * 2, 380),
    alignSelf: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 20,
    padding: 24,
    marginBottom: 20,
  },
  pointsCardContainer: {
    marginBottom: 16,
  },
  progressBarContainer: {
    marginBottom: 12,
  },
  pauseButtonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 24,
  },
  pauseButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  categorySection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  questionSection: {
    marginBottom: 24,
  },
  answersSection: {
    width: '100%',
  },
  explanationSection: {
    marginTop: 20,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  explanationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  explanationIconBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(214, 175, 55, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  explanationTitle: {
    fontFamily: FONT_FAMILY,
    fontSize: 13,
    fontWeight: '700',
    color: '#D4AF37',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  explanationText: {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    lineHeight: 22,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '400',
  },

});


