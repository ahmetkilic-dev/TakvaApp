import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { useSegments } from 'expo-router';
import BottomNavBar from '../../components/common/BottomNavBar';

export default function AppLayout() {
  // const segments = useSegments();
  // const isHocaAiScreen = segments?.[1] === '(services)' && segments?.[2] === 'hoca-ai';

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Stack screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#04100D' },
          animation: 'fade', // Main tabs fade
        }}>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(services)" />
        </Stack>
      </View>

      <BottomNavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
});