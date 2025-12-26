import { useState, useEffect, useCallback } from 'react';

// Al Quran Cloud API - Arapça ve Türkçe çeviri
const API_BASE_ARABIC = 'https://api.alquran.cloud/v1/quran/quran-uthmani';
const API_BASE_TURKISH = 'https://api.alquran.cloud/v1/quran/tr.yazir'; // Türkçe çeviri (Yazır)

/**
 * Kuran ayetleri hook'u
 * Tüm ayetleri çeker ve rastgele ayet getirme fonksiyonu sağlar
 * Production-ready, optimize edilmiş
 */
export const useVerses = () => {
  const [allVerses, setAllVerses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentVerse, setCurrentVerse] = useState(null);
  const [usedIndices, setUsedIndices] = useState(new Set());

  // Tüm ayetleri çek (Arapça + Türkçe)
  useEffect(() => {
    const fetchAllVerses = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log('📖 Ayetler yükleniyor...');
        
        // Arapça ve Türkçe metinleri paralel çek
        const [arabicResponse, turkishResponse] = await Promise.all([
          fetch(API_BASE_ARABIC),
          fetch(API_BASE_TURKISH),
        ]);

        const arabicResult = await arabicResponse.json();
        const turkishResult = await turkishResponse.json();

        if (
          arabicResult.code === 200 && arabicResult.data && arabicResult.data.surahs &&
          turkishResult.code === 200 && turkishResult.data && turkishResult.data.surahs
        ) {
          const verses = [];
          const arabicSurahs = arabicResult.data.surahs;
          const turkishSurahs = turkishResult.data.surahs;

          // Her sure için ayetleri birleştir
          arabicSurahs.forEach((arabicSurah, surahIndex) => {
            const turkishSurah = turkishSurahs[surahIndex];
            
            if (arabicSurah.ayahs && turkishSurah.ayahs && 
                Array.isArray(arabicSurah.ayahs) && Array.isArray(turkishSurah.ayahs)) {
              
              // Ayetleri eşleştir (numberInSurah'e göre)
              arabicSurah.ayahs.forEach((arabicAyah) => {
                // Türkçe çeviriyi numberInSurah'e göre bul
                const turkishAyah = turkishSurah.ayahs.find(
                  ayah => ayah.numberInSurah === arabicAyah.numberInSurah
                );
                
                if (turkishAyah && arabicAyah.text && turkishAyah.text) {
                  // Türkçe sure ismi için englishName kullan (Hucurat, Bakara gibi)
                  const surahNameTR = arabicSurah.englishName || turkishSurah.englishName || arabicSurah.name;
                  
                  // Arapça ve Türkçe metinleri al
                  const arabicText = arabicAyah.text.trim();
                  const turkishText = turkishAyah.text.trim();
                  
                  verses.push({
                    id: `${arabicSurah.number}-${arabicAyah.numberInSurah}`,
                    arabic: arabicText, // Arapça metin (en üstte gösterilecek)
                    turkish: turkishText, // Türkçe meali (altında gösterilecek)
                    surahNumber: arabicSurah.number,
                    surahName: surahNameTR,
                    surahNameEnglish: arabicSurah.englishName,
                    ayahNumber: arabicAyah.numberInSurah,
                    reference: `${surahNameTR} ${arabicAyah.numberInSurah}.Ayet`, // Örnek: "Hucurat 13.Ayet" (boşluksuz)
                  });
                }
              });
            }
          });

          if (verses.length > 0) {
            setAllVerses(verses);
            // İlk rastgele ayeti seç
            const randomIndex = Math.floor(Math.random() * verses.length);
            setCurrentVerse(verses[randomIndex]);
            setUsedIndices(new Set([randomIndex]));
            console.log(`✅ ${verses.length} ayet yüklendi`);
          } else {
            setError('Ayetler bulunamadı');
          }
        } else {
          setError('Ayetler yüklenemedi');
        }
      } catch (err) {
        console.error('📖 Ayet çekme hatası:', err);
        setError('Ayetler yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchAllVerses();
  }, []);

  // Rastgele yeni ayet getir
  const getRandomVerse = useCallback(() => {
    if (allVerses.length === 0) {
      console.warn('📖 Ayetler henüz yüklenmedi');
      return null;
    }

    let randomIndex;
    let attempts = 0;
    const maxAttempts = 100;

    // Kullanılmayan bir index bul
    do {
      randomIndex = Math.floor(Math.random() * allVerses.length);
      attempts++;
      
      // Eğer tüm ayetler kullanıldıysa, set'i sıfırla ve yeniden başla
      if (usedIndices.size >= allVerses.length) {
        setUsedIndices(new Set());
        randomIndex = Math.floor(Math.random() * allVerses.length);
        break;
      }
    } while (usedIndices.has(randomIndex) && attempts < maxAttempts);

    const newVerse = allVerses[randomIndex];
    setCurrentVerse(newVerse);
    setUsedIndices(prev => new Set([...prev, randomIndex]));
    
    console.log(`📖 Yeni ayet seçildi: ${newVerse.reference}`);
    return newVerse;
  }, [allVerses, usedIndices]);

  return {
    allVerses,
    currentVerse,
    loading,
    error,
    getRandomVerse,
    totalVerses: allVerses.length,
  };
};

