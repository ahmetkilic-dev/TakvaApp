import { useState, useEffect, useMemo, useCallback } from 'react';

// Aladhan API for Hijri calendar
const API_BASE = 'https://api.aladhan.com/v1';

// Islamic month names in Turkish
const HIJRI_MONTHS = {
  1: 'Muharrem',
  2: 'Safer',
  3: 'Rebiülevvel',
  4: 'Rebiülahir',
  5: 'Cemaziyelevvel',
  6: 'Cemaziyelahir',
  7: 'Recep',
  8: 'Şaban',
  9: 'Ramazan',
  10: 'Şevval',
  11: 'Zilkade',
  12: 'Zilhicce',
};

// Gregorian month names in Turkish
const GREGORIAN_MONTHS = [
  'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
  'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
];

// Religious days definitions with their Hijri dates
const RELIGIOUS_DAYS_DEFINITIONS = [
  {
    key: 'mevlid',
    name: 'Mevlid Kandili',
    description: 'Peygamberimizin doğum\ngünü mübarek gecesi.',
    hijriMonth: 3, // Rebiülevvel
    hijriDay: 12,
    icon: 'heart',
    type: 'kandil',
  },
  {
    key: 'regaip',
    name: 'Regaip Kandili',
    description: 'Recep ayının ilk Cuma\ngecesi, mübarek kandil.',
    hijriMonth: 7, // Recep
    hijriDay: null, // First Friday night (calculated)
    icon: 'sparkles',
    type: 'kandil',
    isRegaip: true,
  },
  {
    key: 'mirac',
    name: 'Miraç Kandili',
    description: 'Peygamberimizin göklere\nyükseldiği mübarek gece.',
    hijriMonth: 7, // Recep
    hijriDay: 27,
    icon: 'rocket',
    type: 'kandil',
  },
  {
    key: 'berat',
    name: 'Berat Kandili',
    description: 'Günahların affı ve kaderin\nyazıldığı mübarek gece.',
    hijriMonth: 8, // Şaban
    hijriDay: 15,
    icon: 'moon',
    type: 'kandil',
  },
  {
    key: 'ramazan_baslangic',
    name: 'Ramazan Başlangıcı',
    description: 'Oruç tutma ayının başladığı\nmübarek gün.',
    hijriMonth: 9, // Ramazan
    hijriDay: 1,
    icon: 'calendar',
    type: 'ozel',
  },
  {
    key: 'kadir',
    name: 'Kadir Gecesi',
    description: 'Bin aydan daha hayırlı olan\nmübarek gece.',
    hijriMonth: 9, // Ramazan
    hijriDay: 27,
    icon: 'star',
    type: 'kandil',
  },
  {
    key: 'ramazan_bayrami',
    name: 'Ramazan Bayramı',
    description: 'Üç gün süren sevinç ve\nkutlama günleri.',
    hijriMonth: 10, // Şevval
    hijriDay: 1,
    icon: 'sunny',
    type: 'bayram',
    duration: 3,
  },
  {
    key: 'arefe_kurban',
    name: 'Arefe Günü',
    description: "Kurban Bayramı'ndan önceki\nmübarek gün.",
    hijriMonth: 12, // Zilhicce
    hijriDay: 9,
    icon: 'time',
    type: 'ozel',
  },
  {
    key: 'kurban_bayrami',
    name: 'Kurban Bayramı',
    description: 'Dört gün süren kurban\nkesme bayramı.',
    hijriMonth: 12, // Zilhicce
    hijriDay: 10,
    icon: 'gift',
    type: 'bayram',
    duration: 4,
  },
  {
    key: 'asure',
    name: 'Aşure Günü',
    description: "Hz. Nuh'un gemiden inişi,\nHz. Musa'nın kurtuluşu günü.",
    hijriMonth: 1, // Muharrem
    hijriDay: 10,
    icon: 'water',
    type: 'ozel',
  },
];

// Cache for API responses
const apiCache = new Map();
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Fetch with caching
 */
const fetchWithCache = async (url) => {
  const cached = apiCache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }

  const response = await fetch(url);
  const data = await response.json();
  
  apiCache.set(url, { data, timestamp: Date.now() });
  return data;
};

/**
 * Convert Hijri date to Gregorian using Aladhan API
 */
const hijriToGregorian = async (hijriDay, hijriMonth, hijriYear) => {
  try {
    const url = `${API_BASE}/hToG/${hijriDay}-${hijriMonth}-${hijriYear}`;
    const result = await fetchWithCache(url);
    
    if (result.code === 200 && result.data) {
      const { day, month, year } = result.data.gregorian;
      return new Date(parseInt(year), parseInt(month.number) - 1, parseInt(day));
    }
    return null;
  } catch (error) {
    console.error('Hijri to Gregorian conversion error:', error);
    return null;
  }
};

/**
 * Get current Hijri date
 */
const getCurrentHijriDate = async () => {
  try {
    const now = new Date();
    const dateStr = `${String(now.getDate()).padStart(2, '0')}-${String(now.getMonth() + 1).padStart(2, '0')}-${now.getFullYear()}`;
    const url = `${API_BASE}/gToH/${dateStr}`;
    const result = await fetchWithCache(url);
    
    if (result.code === 200 && result.data && result.data.hijri) {
      return {
        day: parseInt(result.data.hijri.day),
        month: parseInt(result.data.hijri.month.number),
        year: parseInt(result.data.hijri.year),
      };
    }
    return null;
  } catch (error) {
    console.error('Get current Hijri date error:', error);
    return null;
  }
};

/**
 * Calculate Regaip Kandili (First Thursday night of Rajab/Recep)
 */
const calculateRegaipDate = async (hijriYear) => {
  try {
    // Get the first day of Recep
    const firstOfRajab = await hijriToGregorian(1, 7, hijriYear);
    if (!firstOfRajab) return null;

    // Find the first Friday (Regaip is the night before, Thursday night)
    // In Islamic tradition, the night belongs to the next day
    // So Regaip is Thursday evening = Friday's night in Hijri
    let current = new Date(firstOfRajab);
    
    // Find first Friday of Rajab
    while (current.getDay() !== 5) { // 5 = Friday
      current.setDate(current.getDate() + 1);
    }
    
    // Regaip is the night before (Thursday evening)
    current.setDate(current.getDate() - 1);
    
    return current;
  } catch (error) {
    console.error('Calculate Regaip date error:', error);
    return null;
  }
};

/**
 * Format Gregorian date to Turkish string
 */
const formatGregorianDate = (date) => {
  if (!date) return '';
  const day = date.getDate();
  const month = GREGORIAN_MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

/**
 * Format Hijri date to Turkish string
 */
const formatHijriDate = (day, month, year) => {
  return `${day} ${HIJRI_MONTHS[month]} ${year}`;
};

/**
 * Calculate remaining days from today
 */
const calculateRemainingDays = (targetDate) => {
  if (!targetDate) return -1;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);
  const diffTime = target.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Main hook for fetching and managing religious days
 */
export const useReligiousDays = () => {
  const [religiousDays, setReligiousDays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentHijriDate, setCurrentHijriDate] = useState(null);

  // Memoize today's date (reset at midnight)
  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  // Calculate one year from now
  const oneYearLater = useMemo(() => {
    const date = new Date(today);
    date.setFullYear(date.getFullYear() + 1);
    return date;
  }, [today]);

  const fetchReligiousDays = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('📅 Dini günler yükleniyor...');

      // Get current Hijri date
      const hijri = await getCurrentHijriDate();
      if (!hijri) {
        throw new Error('Hicri takvim bilgisi alınamadı');
      }
      
      setCurrentHijriDate(hijri);
      console.log('📅 Şu anki Hicri tarih:', hijri);

      // We need to check both current and next Hijri year
      const hijriYears = [hijri.year, hijri.year + 1];
      
      const allDays = [];
      const processedKeys = new Set();

      // Process all religious days for both years
      for (const hijriYear of hijriYears) {
        for (const dayDef of RELIGIOUS_DAYS_DEFINITIONS) {
          const uniqueKey = `${dayDef.key}-${hijriYear}`;
          
          if (processedKeys.has(uniqueKey)) continue;

          let gregorianDate;
          let hijriDay = dayDef.hijriDay;
          let hijriMonth = dayDef.hijriMonth;

          // Special handling for Regaip (calculated date)
          if (dayDef.isRegaip) {
            gregorianDate = await calculateRegaipDate(hijriYear);
            if (gregorianDate) {
              // Get the Hijri date for the calculated Gregorian date
              const dateStr = `${String(gregorianDate.getDate()).padStart(2, '0')}-${String(gregorianDate.getMonth() + 1).padStart(2, '0')}-${gregorianDate.getFullYear()}`;
              try {
                const hijriResult = await fetchWithCache(`${API_BASE}/gToH/${dateStr}`);
                if (hijriResult.code === 200 && hijriResult.data && hijriResult.data.hijri) {
                  hijriDay = parseInt(hijriResult.data.hijri.day);
                  hijriMonth = parseInt(hijriResult.data.hijri.month.number);
                }
              } catch (e) {
                console.warn('Regaip Hijri date fetch failed:', e);
              }
            }
          } else {
            gregorianDate = await hijriToGregorian(dayDef.hijriDay, dayDef.hijriMonth, hijriYear);
          }

          if (!gregorianDate) continue;

          const remainingDays = calculateRemainingDays(gregorianDate);
          
          // Only include days that are in the future and within one year
          if (remainingDays >= 0 && gregorianDate <= oneYearLater) {
            processedKeys.add(uniqueKey);
            
            allDays.push({
              id: uniqueKey,
              key: dayDef.key,
              name: dayDef.name,
              description: dayDef.description,
              icon: dayDef.icon,
              type: dayDef.type,
              duration: dayDef.duration,
              hijriDate: formatHijriDate(hijriDay, hijriMonth, hijriYear),
              gregorianDate: formatGregorianDate(gregorianDate),
              gregorianDateObj: gregorianDate,
              remainingDays,
              hijriYear,
            });
          }
        }
      }

      // Sort by date (closest first)
      allDays.sort((a, b) => a.gregorianDateObj - b.gregorianDateObj);

      console.log('📅 Dini günler yüklendi:', allDays.length, 'gün');
      setReligiousDays(allDays);
    } catch (err) {
      console.error('📅 Dini günler yükleme hatası:', err);
      setError(err.message || 'Dini günler yüklenemedi');
    } finally {
      setLoading(false);
    }
  }, [today, oneYearLater]);

  // Fetch on mount
  useEffect(() => {
    fetchReligiousDays();
  }, [fetchReligiousDays]);

  // Refresh function for pull-to-refresh
  const refresh = useCallback(() => {
    // Clear cache for fresh data
    apiCache.clear();
    return fetchReligiousDays();
  }, [fetchReligiousDays]);

  return {
    religiousDays,
    loading,
    error,
    currentHijriDate,
    refresh,
    today,
  };
};

export default useReligiousDays;
