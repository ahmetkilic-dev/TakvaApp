import { useState, useEffect, useMemo, useCallback } from 'react';

// 2026 Dini Günler ve Geceler (Görseldeki kesin listeye göre güncellendi)
const STATIC_RELIGIOUS_DAYS_2026 = [
  {
    id: 'mirac_2026',
    key: 'mirac',
    name: 'Miraç Kandili',
    description: 'Peygamberimizin göklere yükseldiği mübarek gece.',
    icon: 'rocket',
    type: 'kandil',
    gregorianDate: '15 Ocak 2026',
    hijriDate: '26 Receb 1447',
    dateObj: new Date(2026, 0, 15),
  },
  {
    id: 'berat_2026',
    key: 'berat',
    name: 'Berat Kandili',
    description: 'Günahların affı ve kaderin yazıldığı mübarek gece.',
    icon: 'moon',
    type: 'kandil',
    gregorianDate: '2 Şubat 2026',
    hijriDate: '14 Şaban 1447',
    dateObj: new Date(2026, 1, 2),
  },
  {
    id: 'ramazan_baslangic_2026',
    key: 'ramazan_baslangic',
    name: 'Ramazan-ı Şerif Başlangıcı',
    description: 'Oruç tutma ayının başladığı mübarek gün.',
    icon: 'calendar',
    type: 'ozel',
    gregorianDate: '19 Şubat 2026',
    hijriDate: '1 Ramazan 1447',
    dateObj: new Date(2026, 1, 19),
  },
  {
    id: 'kadir_2026',
    key: 'kadir',
    name: 'Kadir Gecesi',
    description: 'Bin aydan daha hayırlı olan mübarek gece.',
    icon: 'star',
    type: 'kandil',
    gregorianDate: '16 Mart 2026',
    hijriDate: '26 Ramazan 1447',
    dateObj: new Date(2026, 2, 16),
  },
  {
    id: 'ramazan_arefe_2026',
    key: 'arefe',
    name: 'Ramazan Bayramı Arefesi',
    description: "Ramazan Bayramı'ndan önceki mübarek gün.",
    icon: 'time',
    type: 'ozel',
    gregorianDate: '19 Mart 2026',
    hijriDate: '29 Ramazan 1447',
    dateObj: new Date(2026, 2, 19),
  },
  {
    id: 'ramazan_bayrami_1_2026',
    key: 'ramazan_bayrami',
    name: 'Ramazan Bayramı 1. Gün',
    description: 'Bayramın ilk günü, sevinç ve kutlama.',
    icon: 'sunny',
    type: 'bayram',
    gregorianDate: '20 Mart 2026',
    hijriDate: '1 Şevval 1447',
    dateObj: new Date(2026, 2, 20),
  },
  {
    id: 'ramazan_bayrami_2_2026',
    key: 'ramazan_bayrami',
    name: 'Ramazan Bayramı 2. Gün',
    description: 'Bayramın ikinci günü.',
    icon: 'sunny',
    type: 'bayram',
    gregorianDate: '21 Mart 2026',
    hijriDate: '2 Şevval 1447',
    dateObj: new Date(2026, 2, 21),
  },
  {
    id: 'ramazan_bayrami_3_2026',
    key: 'ramazan_bayrami',
    name: 'Ramazan Bayramı 3. Gün',
    description: 'Bayramın üçüncü günü.',
    icon: 'sunny',
    type: 'bayram',
    gregorianDate: '22 Mart 2026',
    hijriDate: '3 Şevval 1447',
    dateObj: new Date(2026, 2, 22),
  },
  {
    id: 'kurban_arefe_2026',
    key: 'arefe',
    name: 'Kurban Bayramı Arefesi',
    description: "Kurban Bayramı'ndan önceki mübarek gün.",
    icon: 'time',
    type: 'ozel',
    gregorianDate: '26 Mayıs 2026',
    hijriDate: '9 Zilhicce 1447',
    dateObj: new Date(2026, 4, 26),
  },
  {
    id: 'kurban_bayrami_1_2026',
    key: 'kurban_bayrami',
    name: 'Kurban Bayramı 1. Gün',
    description: 'Dört gün süren kurban kesme bayramı.',
    icon: 'gift',
    type: 'bayram',
    gregorianDate: '27 Mayıs 2026',
    hijriDate: '10 Zilhicce 1447',
    dateObj: new Date(2026, 4, 27),
  },
  {
    id: 'kurban_bayrami_2_2026',
    key: 'kurban_bayrami',
    name: 'Kurban Bayramı 2. Gün',
    description: 'Bayramın ikinci günü.',
    icon: 'gift',
    type: 'bayram',
    gregorianDate: '28 Mayıs 2026',
    hijriDate: '11 Zilhicce 1447',
    dateObj: new Date(2026, 4, 28),
  },
  {
    id: 'kurban_bayrami_3_2026',
    key: 'kurban_bayrami',
    name: 'Kurban Bayramı 3. Gün',
    description: 'Bayramın üçüncü günü.',
    icon: 'gift',
    type: 'bayram',
    gregorianDate: '29 Mayıs 2026',
    hijriDate: '12 Zilhicce 1447',
    dateObj: new Date(2026, 4, 29),
  },
  {
    id: 'kurban_bayrami_4_2026',
    key: 'kurban_bayrami',
    name: 'Kurban Bayramı 4. Gün',
    description: 'Bayramın dördüncü günü.',
    icon: 'gift',
    type: 'bayram',
    gregorianDate: '30 Mayıs 2026',
    hijriDate: '13 Zilhicce 1447',
    dateObj: new Date(2026, 4, 30),
  },
  {
    id: 'hicri_yilbasi_2026',
    key: 'hicri_yilbasi',
    name: 'Hicri Yılbaşı',
    description: 'Yeni Hicri yılın ilk günü.',
    icon: 'calendar',
    type: 'ozel',
    gregorianDate: '16 Haziran 2026',
    hijriDate: '1 Muharrem 1448',
    dateObj: new Date(2026, 5, 16),
  },
  {
    id: 'asure_2026',
    key: 'asure',
    name: 'Aşure Günü',
    description: "Hz. Nuh'un gemiden inişi ve diğer mübarek olayların günü.",
    icon: 'water',
    type: 'ozel',
    gregorianDate: '25 Haziran 2026',
    hijriDate: '10 Muharrem 1448',
    dateObj: new Date(2026, 5, 25),
  },
  {
    id: 'mevlid_2026',
    key: 'mevlid',
    name: 'Mevlid Kandili',
    description: 'Peygamberimizin doğum günü mübarek gecesi.',
    icon: 'heart',
    type: 'kandil',
    gregorianDate: '24 Ağustos 2026',
    hijriDate: '11 Rebiülevvel 1448',
    dateObj: new Date(2026, 7, 24),
  },
  {
    id: 'uc_aylar_2026',
    key: 'uc_aylar',
    name: 'Üç Ayların Başlangıcı',
    description: 'Mübarek üç ayların (Recep, Şaban, Ramazan) başlangıcı.',
    icon: 'sparkles',
    type: 'ozel',
    gregorianDate: '10 Aralık 2026',
    hijriDate: '1 Receb 1448',
    dateObj: new Date(2026, 11, 10),
  },
  {
    id: 'regaip_2026',
    key: 'regaip',
    name: 'Regaip Kandili',
    description: 'Recep ayının ilk Cuma gecesi, mübarek kandil.',
    icon: 'sparkles',
    type: 'kandil',
    gregorianDate: '10 Aralık 2026',
    hijriDate: '1 Receb 1448',
    dateObj: new Date(2026, 11, 10),
  },
];

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

export const useReligiousDays = () => {
  const [religiousDays, setReligiousDays] = useState([]);
  const [loading, setLoading] = useState(true);

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  const calculateDays = useCallback(() => {
    setLoading(true);

    const mappedDays = STATIC_RELIGIOUS_DAYS_2026.map(day => {
      const remainingDays = calculateRemainingDays(day.dateObj);
      return {
        ...day,
        remainingDays,
        gregorianDateObj: day.dateObj, // compat with old code
      };
    })
      .filter(day => day.remainingDays >= 0)
      .sort((a, b) => a.dateObj - b.dateObj);

    setReligiousDays(mappedDays);
    setLoading(false);
  }, []);

  useEffect(() => {
    calculateDays();
  }, [calculateDays]);

  const refresh = useCallback(() => {
    calculateDays();
  }, [calculateDays]);

  return {
    religiousDays,
    loading,
    error: null,
    refresh,
    today,
  };
};

export default useReligiousDays;
