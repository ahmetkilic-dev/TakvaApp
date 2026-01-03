import { usePrayerTimes as usePrayerTimesContext } from '../../../contexts/PrayerTimesContext';

/**
 * İmsakiye ekranı için aylık namaz vakitlerini sağlar
 * Artık global PrayerTimesContext'ten okur - API çağrısı yapmaz!
 */
export const usePrayerTimes = () => {
  const { monthlyTimes, loading, displayCity } = usePrayerTimesContext();

  return {
    prayerTimesList: monthlyTimes,
    loading,
    error: null,
    hasPermission: true, // Context zaten konum iznini yönetiyor
    userLocation: null, // Artık gerekli değil
    locationLoading: loading,
    today: new Date(),
  };
};

