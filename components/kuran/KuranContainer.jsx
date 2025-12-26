import { View, Text, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useCallback, useMemo } from 'react';
import { Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import KuranHeader from './KuranHeader';
import KuranYolculuğu from './KuranYolculuğu';
import OkumayaDevamEt from './OkumayaDevamEt';
import TabNavigation from './TabNavigation';
import SureListItem from './SureListItem';
import CuzListItem from './CuzListItem';
import SayfaListItem from './SayfaListItem';
import { useSurahs, useJuzs, usePages } from './hooks/useQuran';
import { getSurahStartPage, getJuzStartPage } from './hooks/useSurahPageMapping';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const horizontalPadding = Math.max(20, SCREEN_WIDTH * 0.05);
const fontFamily = 'Plus Jakarta Sans';

export default function KuranContainer() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('Sure');
  const { surahs } = useSurahs();
  const { juzs } = useJuzs();
  const { pages } = usePages();

  // Memoize handlers
  const handleSurahPress = useCallback((surah) => {
    const pageNumber = getSurahStartPage(surah.number);
    router.push({
      pathname: '/(app)/(services)/quran-page',
      params: { type: 'page', number: pageNumber.toString() },
    });
  }, [router]);

  const handleJuzPress = useCallback((juz) => {
    const pageNumber = getJuzStartPage(juz.number);
    router.push({
      pathname: '/(app)/(services)/quran-page',
      params: { type: 'page', number: pageNumber.toString() },
    });
  }, [router]);

  const handlePagePress = useCallback((page) => {
    router.push({
      pathname: '/(app)/(services)/quran-page',
      params: { type: 'page', number: page.number.toString() },
    });
  }, [router]);

  // Render functions for FlatList
  const renderSurah = useCallback(({ item }) => (
    <View style={{ paddingHorizontal: horizontalPadding }}>
      <SureListItem surah={item} onPress={() => handleSurahPress(item)} />
    </View>
  ), [handleSurahPress]);

  const renderJuz = useCallback(({ item }) => (
    <View style={{ paddingHorizontal: horizontalPadding }}>
      <CuzListItem juz={item} onPress={() => handleJuzPress(item)} />
    </View>
  ), [handleJuzPress]);

  const renderPage = useCallback(({ item }) => (
    <View style={{ paddingHorizontal: horizontalPadding }}>
      <SayfaListItem page={item} onPress={() => handlePagePress(item)} />
    </View>
  ), [handlePagePress]);

  // Key extractors
  const keyExtractor = useCallback((item) => item.number.toString(), []);

  // Get current data based on active tab
  const currentData = useMemo(() => {
    switch (activeTab) {
      case 'Sure': return surahs;
      case 'Cüz': return juzs;
      case 'Sayfa': return pages;
      default: return surahs;
    }
  }, [activeTab, surahs, juzs, pages]);

  // Get current render function
  const currentRenderItem = useMemo(() => {
    switch (activeTab) {
      case 'Sure': return renderSurah;
      case 'Cüz': return renderJuz;
      case 'Sayfa': return renderPage;
      default: return renderSurah;
    }
  }, [activeTab, renderSurah, renderJuz, renderPage]);

  // Header component for FlatList
  const ListHeader = useMemo(() => (
    <View>
      <KuranYolculuğu />
      <OkumayaDevamEt />
      
      {/* Kuran Section Header */}
      <View style={{ paddingHorizontal: horizontalPadding, marginBottom: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontFamily, fontSize: 16, fontWeight: '700', color: '#FFFFFF' }}>
            Kuran
          </Text>
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
        </View>
      </View>
    </View>
  ), [activeTab]);

  return (
    <SafeAreaView edges={['top']} className="flex-1">
      <KuranHeader />
      <FlatList
        data={currentData}
        renderItem={currentRenderItem}
        keyExtractor={keyExtractor}
        ListHeaderComponent={ListHeader}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
        initialNumToRender={15}
        maxToRenderPerBatch={20}
        windowSize={10}
        removeClippedSubviews={true}
        getItemLayout={(data, index) => ({
          length: 74, // 62 height + 12 margin
          offset: 74 * index,
          index,
        })}
      />
    </SafeAreaView>
  );
}
