import { View, Text, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenBackground from '../../../components/common/ScreenBackground';
import { useTasks } from '../../../components/rozetgorev/hooks/useTasks';
import DailyTaskSection from '../../../components/rozetgorev/DailyTaskSection';
import BadgeCategorySection from '../../../components/rozetgorev/BadgeCategorySection';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const horizontalPadding = 20;

export default function TasksScreen() {
  const { tasksData, navigateToTask } = useTasks();

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
