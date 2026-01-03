import { useState, useEffect, useCallback } from 'react';

import { dailyQuranData } from '../../../constants/dailyQuranData';

/**
 * Kuran ayetleri hook'u - LOCAL DATA OPTIMIZED
 * API yerine yerel JSON dosyasından anında veri çeker.
 */
export const useVerses = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentVerse, setCurrentVerse] = useState(null);

  // Rastgele bir ayet getir (Yerel Veri)
  const fetchSingleRandomVerse = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      // Yapay bir gecikme ekle (yumuşak geçiş için)
      await new Promise(resolve => setTimeout(resolve, 300));

      const totalVerses = dailyQuranData.length;
      if (totalVerses === 0) throw new Error('Ayet verisi bulunamadı');

      const randomIndex = Math.floor(Math.random() * totalVerses);
      const data = dailyQuranData[randomIndex];

      console.log(`📖 Yerel Veriden Ayet Seçildi: ${data.sure_ad} ${data.ayet_no}`);

      const mappedVerse = {
        id: `${data.id}`,
        arabic: data.arapca.trim(),
        turkish: data.meal.trim(),
        surahNumber: 0, // Veride yok, kritik değil
        surahName: data.sure_ad,
        surahNameEnglish: data.sure_ad, // Veride yok
        ayahNumber: data.ayet_no,
        reference: `${data.sure_ad} ${data.ayet_no}. Ayet`,
        kategori: data.kategori
      };

      setCurrentVerse(mappedVerse);
      return mappedVerse;

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
    totalVerses: dailyQuranData.length,
  };
};



