import { useState, useEffect, useCallback } from 'react';

// Al Quran Cloud API - Tek bir ayeti hem Arapça hem de Türkçe mealiyle getirmek için
const GET_AYAH_URL = (index) => `https://api.alquran.cloud/v1/ayah/${index}/editions/quran-uthmani,tr.yazir`;

const TOTAL_AYHS = 6236; // Kuran'daki toplam ayet sayısı

/**
 * Kuran ayetleri hook'u - OPTİMİZE EDİLDİ
 * Sadece ihtiyaç duyulan ayeti çeker, tüm Kuran'ı yüklemez.
 */
export const useVerses = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentVerse, setCurrentVerse] = useState(null);

  // Rastgele bir ayet getir (API'den tekil çekim)
  const fetchSingleRandomVerse = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // 1 ile 6236 arasında rastgele bir ayet indexi
      const randomIndex = Math.floor(Math.random() * TOTAL_AYHS) + 1;

      console.log(`📖 Ayet çekiliyor (Index: ${randomIndex})...`);

      const response = await fetch(GET_AYAH_URL(randomIndex));
      const result = await response.json();

      if (result.code === 200 && result.data && Array.isArray(result.data)) {
        // [0] Arapça, [1] Türkçe (tr.yazir)
        const arabicData = result.data[0];
        const turkishData = result.data[1];

        const surahNameTR = arabicData.surah.englishName || turkishData.surah.englishName || arabicData.surah.name;

        const mappedVerse = {
          id: `${arabicData.surah.number}-${arabicData.numberInSurah}`,
          arabic: arabicData.text.trim(),
          turkish: turkishData.text.trim(),
          surahNumber: arabicData.surah.number,
          surahName: surahNameTR,
          surahNameEnglish: arabicData.surah.englishName,
          ayahNumber: arabicData.numberInSurah,
          reference: `${surahNameTR} ${arabicData.numberInSurah}.Ayet`,
        };

        setCurrentVerse(mappedVerse);
        console.log(`✅ Ayet yüklendi: ${mappedVerse.reference}`);
        return mappedVerse;
      } else {
        throw new Error('API verisi eksik veya hatalı');
      }
    } catch (err) {
      console.error('📖 Ayet çekme hatası:', err);
      setError('Ayet yüklenirken bir hata oluştu');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Not: Artık mount anında otomatik çekmiyoruz, getRandomVerse çağrıldığında çekilecek
  // Bu sayede eğer ayet zaten gösterilmişse boşuna API isteği atmıyoruz.

  return {
    currentVerse,
    loading,
    error,
    getRandomVerse: fetchSingleRandomVerse,
    totalVerses: TOTAL_AYHS,
  };
};



