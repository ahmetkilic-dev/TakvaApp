import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import KuranHeader from './KuranHeader';
import SuraTitle from './SuraTitle';
import PageNavigation from './PageNavigation';
import VerseContent from './VerseContent';
import { usePageVerses } from './hooks/useQuran';
import { usePageTimer } from './hooks/usePageTimer';
import { useUserStats } from '../../contexts/UserStatsContext';

const TOTAL_PAGES = 604;

export default function QuranPageContainer() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useUserStats();

  // Initialize from params, fallback to 1
  const initialPage = params?.number ? parseInt(params.number, 10) : 1;
  const [currentPage, setCurrentPage] = useState(isNaN(initialPage) ? 1 : initialPage);
  const [activeTab, setActiveTab] = useState('Kur\'an');

  // Time-based reading progress logic
  usePageTimer(currentPage, user);

  // Sync state with URL params
  useEffect(() => {
    if (params?.number) {
      const p = parseInt(params.number, 10);
      if (!isNaN(p) && p !== currentPage) {
        setCurrentPage(p);
      }
    }
  }, [params?.number]);

  const { verses, loading, error } = usePageVerses(currentPage);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    router.setParams({ number: pageNum.toString() });
  };

  // Scroll reset is handled automatically by the "key" prop on ScrollView
  // When key changes, React unmounts the old one and mounts a new one at scroll y=0

  // Header bileşenlerini birleştir (useMemo ile optimize et)
  // VerseContent içinde render edilecek component
  const ListHeader = () => (
    <View>
      <SuraTitle title={`Sayfa ${currentPage}`} />

      <PageNavigation
        currentPage={currentPage}
        totalPages={TOTAL_PAGES}
        onPageChange={handlePageChange}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        showPageNumbers={true}
      />
    </View>
  );

  return (
    <SafeAreaView edges={['top']} className="flex-1">
      <KuranHeader />

      {/* ScrollView kaldırıldı, VerseContent içindeki FlatList/ScrollView tüm sayfayı yönetecek */}
      <VerseContent
        verses={verses}
        activeTab={activeTab}
        loading={loading}
        error={error}
        ListHeaderComponent={<ListHeader />}
      />
    </SafeAreaView>
  );
}
