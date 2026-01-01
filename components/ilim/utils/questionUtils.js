/**
 * Rastgele soru seçme ve kategori işleme utility fonksiyonları
 */

/**
 * Kategori mapping - ilimData.js'deki kategori key'lerinden görünen isimlere
 */
export const CATEGORY_MAPPING = {
  fikih: {
    name: 'Fıkıh Bilgisi',
    icon: require('../../../assets/ilim/fikih.png'),
  },
  kuran: {
    name: 'Kuran',
    icon: require('../../../assets/ilim/kuran.png'),
  },
  hadis: {
    name: 'Hadis',
    icon: require('../../../assets/ilim/hadis.png'),
  },
  ahlak: {
    name: 'Ahlak & Adap',
    icon: require('../../../assets/ilim/ahlakadap.png'),
  },
  siyer: {
    name: 'Siyer',
    icon: require('../../../assets/ilim/siyer.png'),
  },
  gunler: {
    name: 'Dini Günler',
    icon: require('../../../assets/ilim/dinigun.png'),
  },
  kavramlar: {
    name: 'Dini Kavramlar',
    icon: require('../../../assets/ilim/dinikavramlar.png'),
  },
  esma: {
    name: 'Esmaü\'l-Hüsna',
    icon: require('../../../assets/ilim/esmaul.png'),
  },
};

/**
 * Tüm soruları tek bir dizide birleştirir
 */
export const getAllQuestions = (ilimData) => {
  if (!ilimData) return [];

  const allQuestions = [];
  const categories = Object.keys(ilimData);

  categories.forEach((categoryKey) => {
    if (ilimData[categoryKey] && Array.isArray(ilimData[categoryKey].questions)) {
      const questions = ilimData[categoryKey].questions.map((q) => ({
        ...q,
        category: categoryKey,
      }));
      allQuestions.push(...questions);
    }
  });

  return allQuestions;
};

/**
 * Rastgele bir soru seçer (çözülmemiş sorulardan)
 * Eğer tüm sorular çözülmüşse, answeredQuestionIds'i sıfırlayıp yeniden başlatır
 */
export const getRandomQuestion = (ilimData, answeredQuestionIds = []) => {
  const allQuestions = getAllQuestions(ilimData);

  // Eğer hiç soru yoksa null döndür
  if (!allQuestions || allQuestions.length === 0) {
    return null;
  }

  // Çözülmemiş soruları filtrele
  const unansweredQuestions = allQuestions.filter(
    (q) => !answeredQuestionIds.includes(q.id)
  );

  // Eğer çözülmemiş soru varsa onlardan seç
  if (unansweredQuestions.length > 0) {
    const randomIndex = Math.floor(Math.random() * unansweredQuestions.length);
    return unansweredQuestions[randomIndex];
  }

  // Tüm sorular çözülmüşse, tüm sorulardan seç (yeniden başlat)
  // Bu durumda kullanıcı tüm soruları çözmüş demektir, tekrar başlat
  if (allQuestions.length > 0) {
    const randomIndex = Math.floor(Math.random() * allQuestions.length);
    return allQuestions[randomIndex];
  }

  return null;
};

/**
 * ID'ye göre soru bulur
 */
export const getQuestionById = (ilimData, questionId) => {
  if (!ilimData || !questionId) return null;

  const allQuestions = getAllQuestions(ilimData);
  return allQuestions.find((q) => q.id === questionId) || null;
};

/**
 * Kategori bilgisine göre kategori adını ve ikonunu döndürür
 */
export const getCategoryInfo = (categoryKey) => {
  return CATEGORY_MAPPING[categoryKey] || {
    name: 'Bilinmeyen Kategori',
    icon: require('../../../assets/ilim/fikih.png'), // Fallback icon
  };
};

/**
 * Soru formatını uygun şekilde dönüştürür (options -> answers formatına)
 */
export const formatQuestionForDisplay = (question) => {
  if (!question) return null;

  const categoryInfo = getCategoryInfo(question.category);

  // Options'ı answers formatına çevir (A, B, C, D)
  const answers = question.options.map((option, index) => ({
    id: String.fromCharCode(65 + index), // A, B, C, D
    text: option,
  }));

  // correctAnswer'ı bul (options array'indeki index'e göre)
  // correctAnswer hem string değer ("4") hem de answer text ("Teyemmüm") olabilir
  let correctAnswerId = null;
  const correctAnswerIndex = question.options.findIndex(
    (opt) => opt === question.correctAnswer || opt.toString() === question.correctAnswer?.toString()
  );

  if (correctAnswerIndex >= 0) {
    correctAnswerId = String.fromCharCode(65 + correctAnswerIndex); // A, B, C, D
  } else {
    // Fallback: İlk şıkı doğru kabul et (hata durumu)
    correctAnswerId = 'A';
  }

  return {
    id: question.id,
    category: question.category,
    categoryName: categoryInfo.name,
    categoryIcon: categoryInfo.icon,
    question: question.question,
    answers,
    correctAnswer: correctAnswerId,
    points: question.points || 10,
    explanation: question.explanation,
  };
};

