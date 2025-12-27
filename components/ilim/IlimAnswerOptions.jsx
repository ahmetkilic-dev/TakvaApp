import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FONT_FAMILY = 'Plus Jakarta Sans';

const IlimAnswerOptions = memo(({ answers, selectedAnswer, correctAnswer, onSelectAnswer }) => {
  if (!answers || answers.length === 0) return null;

  // Cevap seçilmiş mi kontrol et
  const isAnswerSelected = selectedAnswer !== null;

  return (
    <View style={styles.container}>
      {answers.map((answer, index) => {
        const isSelected = selectedAnswer === answer.id;
        const isCorrect = answer.id === correctAnswer;
        const isWrong = isSelected && !isCorrect;
        const showCorrect = isAnswerSelected && isCorrect; // Doğru cevabı göster

        return (
          <TouchableOpacity
            key={answer.id}
            onPress={() => {
              if (!isAnswerSelected) {
                onSelectAnswer(answer.id);
              }
            }}
            activeOpacity={isAnswerSelected ? 1 : 0.7}
            disabled={isAnswerSelected}
            style={[
              styles.answerButton,
              isSelected && !isAnswerSelected && styles.answerButtonSelected,
              showCorrect && styles.answerButtonCorrect,
              isWrong && styles.answerButtonWrong,
            ]}
          >
            <Text style={[
              styles.answerText,
              showCorrect && styles.answerTextCorrect,
              isWrong && styles.answerTextWrong,
            ]}>
              {answer.id}) {answer.text}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

IlimAnswerOptions.displayName = 'IlimAnswerOptions';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  answerButton: {
    width: '100%',
    minHeight: 45,
    borderRadius: 15,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    backgroundColor: '#182723',
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginBottom: 12,
  },
  answerButtonSelected: {
    borderColor: 'rgba(255, 255, 255, 0.75)',
  },
  answerButtonCorrect: {
    borderWidth: 2,
    borderColor: '#4CAF50',
    backgroundColor: 'rgba(76, 175, 80, 0.2)',
  },
  answerButtonWrong: {
    borderWidth: 2,
    borderColor: '#F44336',
    backgroundColor: 'rgba(244, 67, 54, 0.2)',
  },
  answerText: {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'left',
    lineHeight: 20,
  },
  answerTextCorrect: {
    color: '#4CAF50',
  },
  answerTextWrong: {
    color: '#F44336',
  },
});

export default IlimAnswerOptions;

