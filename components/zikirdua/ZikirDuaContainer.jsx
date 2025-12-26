import { ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ZikirDuaHeader from './ZikirDuaHeader';
import ZikirDuaImage from './ZikirDuaImage';
import ZikirCounter from './ZikirCounter';
import DuaCard from './DuaCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Responsive calculations
const horizontalPadding = Math.max(20, SCREEN_WIDTH * 0.05);

export default function ZikirDuaContainer() {
  return (
    <SafeAreaView edges={['top']} className="flex-1">
      <ZikirDuaHeader />
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: horizontalPadding,
          paddingTop: 24,
          paddingBottom: 0,
        }}
      >
        <ZikirDuaImage />
        <ZikirCounter />
        <DuaCard />
      </ScrollView>
    </SafeAreaView>
  );
}

