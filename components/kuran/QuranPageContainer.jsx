import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect, useRef } from 'react';
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
  const scrollViewRef = useRef(null);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    router.setParams({ number: pageNum.toString() });
  };

  // Reset scroll position when page changes
  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: false });
    }
  }, [currentPage]);

  return (
    <SafeAreaView edges={['top']} className="flex-1">
      <KuranHeader />
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 0 }}
      >
        <SuraTitle title={`Sayfa ${currentPage}`} />

        <PageNavigation
          currentPage={currentPage}
          totalPages={TOTAL_PAGES}
          onPageChange={handlePageChange}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          showPageNumbers={true}
        />

        <VerseContent
          verses={verses}
          activeTab={activeTab}
          loading={loading}
          error={error}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
