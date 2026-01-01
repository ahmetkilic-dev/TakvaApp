import { View, Text, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenBackground from '../../../components/common/ScreenBackground';
import { useTasks } from '../../../components/rozetgorev/hooks/useTasks';
import DailyTaskSection from '../../../components/rozetgorev/DailyTaskSection';
import BadgeCategorySection from '../../../components/rozetgorev/BadgeCategorySection';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const horizontalPadding = 20;

export default function TasksScreen() {
  const { tasksData, loading, navigateToTask } = useTasks();

  if (loading) {
    return (
      <ScreenBackground>
        <SafeAreaView className="flex-1 justify-center items-center">
          <ActivityIndicator color="white" size="large" />
        </SafeAreaView>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header - Styled to match original Tasks UI */}
        <View className="flex-row items-center justify-between px-4 pt-2 pb-2">
          <View className="w-9" />
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
          <View className="w-9" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: horizontalPadding,
            paddingTop: 24,
            paddingBottom: 0,
          }}
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
