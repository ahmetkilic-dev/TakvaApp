import { View, Text, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import ScreenBackground from '../../../components/common/ScreenBackground';
import { useTasks } from '../../../components/rozetgorev/hooks/useTasks';
import DailyTaskSection from '../../../components/rozetgorev/DailyTaskSection';
import BadgeCategorySection from '../../../components/rozetgorev/BadgeCategorySection';
import { useState } from 'react';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const horizontalPadding = 20;

export default function TasksScreen() {
  const insets = useSafeAreaInsets();
  const { tasksData, navigateToTask, refreshTasks } = useTasks();
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await Promise.all([
        refreshTasks ? refreshTasks() : Promise.resolve(),
        new Promise(resolve => setTimeout(resolve, 800))
      ]);
    } catch (e) {
      console.error(e);
    } finally {
      setRefreshing(false);
    }
  };

  const handleScrollEndDrag = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    if (offsetY < -80 && !refreshing) {
      handleRefresh();
    }
  };

  return (
    <ScreenBackground>
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        {/* Header - SABİT, ZİPLAMAZ */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
          paddingTop: 8,
          paddingBottom: 8
        }}>
          {/* Custom Refresh Spinner Overlay */}
          {refreshing && (
            <View style={{
              position: 'absolute',
              top: 60,
              left: 0,
              right: 0,
              zIndex: 100,
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
            }}>
              <ActivityIndicator size="small" color="#D4AF37" />
            </View>
          )}
          <View style={{ width: 36 }} />
          <Text
            style={{
              fontFamily: 'Cinzel-Black',
              color: '#FFFFFF',
              fontSize: 24,
              textAlign: 'center',
              letterSpacing: -2,
            }}
          >
            GÖREVLER
          </Text>
          <View style={{ width: 36 }} />
        </View>

        {/* Content - Scroll eder */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          contentContainerStyle={{
            paddingHorizontal: horizontalPadding,
            paddingTop: 24,
            paddingBottom: 0,
          }}
          scrollEventThrottle={16}
          onScrollEndDrag={handleScrollEndDrag}
        >
          {/* Daily Tasks Section */}
          <DailyTaskSection
            tasks={tasksData.daily || []}
            onTaskPress={navigateToTask}
          />

          {/* Badge Tasks Section */}
          <BadgeCategorySection
            stats={tasksData.stats}
            onTaskPress={navigateToTask}
          />
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}
