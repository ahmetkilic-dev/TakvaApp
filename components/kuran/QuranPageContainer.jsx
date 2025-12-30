import { View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import KuranHeader from './KuranHeader';
import SuraTitle from './SuraTitle';
import PageNavigation from './PageNavigation';
import VerseContent from './VerseContent';
import { usePageVerses } from './hooks/useQuran';
import { useReadingProgress } from './hooks/useReadingProgress';
import TaskService from '../../services/TaskService';

const TOTAL_PAGES = 604;

export default function QuranPageContainer() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState('Kur\'an');
  const { saveProgress } = useReadingProgress();

  // Her zaman page olarak işle
  const pageNumber = params.number ? parseInt(params.number, 10) : 1;
  const [currentPage, setCurrentPage] = useState(pageNumber);
  const lastTrackedPageRef = useRef(null);

  // params.number değiştiğinde currentPage'i güncelle
  useEffect(() => {
    if (params.number) {
      const newPage = parseInt(params.number, 10);
      if (newPage !== currentPage) {
        setCurrentPage(newPage);
      }
    }
  }, [params.number]);

  // Sadece sayfa verselerini çek
  const { verses, loading, error } = usePageVerses(currentPage);

  const handlePageChange = (pageNum) => {
    setCurrentPage(pageNum);
    router.setParams({ number: pageNum.toString(), type: 'page' });
    // İlerlemeyi kaydet
    if (saveProgress) {
      saveProgress({
        type: 'page',
        number: pageNum,
        progress: (pageNum / TOTAL_PAGES) * 100,
      });
    }
  };

  // Sayfa değiştiğinde ilerlemeyi kaydet
  useEffect(() => {
    if (saveProgress && currentPage) {
      saveProgress({
        type: 'page',
        number: currentPage,
        progress: (currentPage / TOTAL_PAGES) * 100,
      });
    }
  }, [currentPage, saveProgress]);

  // Günlük görev ilerlemesini güncelle (Ayet okuma)
  useEffect(() => {
    if (verses && verses.length > 0 && !loading && lastTrackedPageRef.current !== currentPage) {
      TaskService.incrementTaskProgress(2, verses.length);
      lastTrackedPageRef.current = currentPage;
    }
  }, [verses, loading, currentPage]);

  return (
    <SafeAreaView edges={['top']} className="flex-1">
      <KuranHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 0 }}
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
