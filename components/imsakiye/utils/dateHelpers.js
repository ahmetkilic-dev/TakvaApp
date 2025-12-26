// Tarih helper fonksiyonları
export const getHijriDate = (date) => {
  try {
    return new Intl.DateTimeFormat('tr-TR-u-ca-islamic-umalqura', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(date).replace('Ah', '').trim();
  } catch (e) {
    return '';
  }
};

export const getTurkishDayName = (date) => {
  const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
  return days[date.getDay()];
};

export const getGregorianDate = (date) => {
  return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
};

export const formatPrayerDate = (date) => {
  const hijriDate = getHijriDate(date);
  const gregorianDate = getGregorianDate(date);
  const dayName = getTurkishDayName(date);
  return `${hijriDate} / ${gregorianDate} ${dayName}`;
};

export const isPastDay = (dateObj, today) => {
  const checkDate = new Date(dateObj);
  checkDate.setHours(0, 0, 0, 0);
  const checkToday = new Date(today);
  checkToday.setHours(0, 0, 0, 0);
  return checkDate < checkToday;
};

