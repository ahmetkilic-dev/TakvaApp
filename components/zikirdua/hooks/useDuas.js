import { useMemo } from 'react';
import prayData from '../../../constants/prayData';

/**
 * Dua hook'u
 * Günlük tek bir dua dönmesini sağlar (Hadis sistemi gibi)
 * constants/prayData.js'den veri çeker
 */
export const useDuas = () => {
  // Günün duasını seç (Hadis kartındaki mantığın aynısı)
  const currentDua = useMemo(() => {
    if (!prayData || prayData.length === 0) return null;

    const startOfYear = new Date(new Date().getFullYear(), 0, 0);
    const diff = new Date() - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Yılın gününe göre mod al
    return prayData[dayOfYear % prayData.length];
  }, []);

  return {
    currentDua,
    loading: false,
    error: null,
    totalDuas: prayData.length,
  };
};
