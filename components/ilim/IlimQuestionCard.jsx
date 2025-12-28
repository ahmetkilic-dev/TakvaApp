import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const FONT_FAMILY = 'Plus Jakarta Sans';

const IlimQuestionCard = memo(({ question }) => {
  if (!question) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question}</Text>
    </View>
  );
});

IlimQuestionCard.displayName = 'IlimQuestionCard';

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  questionText: {
    fontFamily: FONT_FAMILY,
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
    lineHeight: 24,
    textAlign: 'left',
  },
});

export default IlimQuestionCard;

