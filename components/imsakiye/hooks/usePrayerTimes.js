import { PrayerTimesAPI } from '../../../utils/prayerTimesApi';

// ... (other imports)

export const usePrayerTimes = () => {
  const { location: userLocation, city: userCity, hasPermission, isLoading: locationLoading } = useLocation();
  const [prayerTimesList, setPrayerTimesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const today = useMemo(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  }, []);

  useEffect(() => {
    if (locationLoading) return;

    const fetchMonthlyPrayerTimes = async () => {
      if (!hasPermission || !userLocation) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await PrayerTimesAPI.fetchMonthlyTimes(userLocation, hasPermission);

        // Geçmiş günleri filtrele
        const filteredData = data.filter(item => {
          const itemDate = new Date(item.date);
          itemDate.setHours(0, 0, 0, 0);
          return itemDate >= today;
        });

        setPrayerTimesList(filteredData);
        setLoading(false);
      } catch (error) {
        setError('Namaz vakitleri alınamadı');
        setLoading(false);
      }
    };

    fetchMonthlyPrayerTimes();
  }, [userLocation, hasPermission, userCity, locationLoading, today]); // HomeHeader ile BİREBİR aynı dependency array

  return {
    prayerTimesList,
    loading,
    error,
    hasPermission,
    userLocation,
    locationLoading,
    today,
  };
};
