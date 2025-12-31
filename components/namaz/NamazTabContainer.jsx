import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ScreenBackground from '../common/ScreenBackground';
import KazaCounter from './KazaCounter';
import LearningGuides from './LearningGuides';

export default function NamazTabContainer() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleAbdestPress = () => {
    router.push('/(app)/(services)/abdest');
  };

  const handleNamazPress = () => {
    router.push('/(app)/(services)/namazrehber');
  };

  return (
    <ScreenBackground>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.backButton} />
          <Text style={styles.headerTitle}>NAMAZ</Text>
          <View style={styles.headerRight} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[styles.scrollContent, { paddingBottom: 0 }]}
        >
          {/* Kaza Namazlarım & Kaza Oruçlarım */}
          <KazaCounter />

          {/* Öğrenme Rehberleri */}
          <LearningGuides onAbdestPress={handleAbdestPress} onNamazPress={handleNamazPress} />
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 8,
  },
  backButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Cinzel-Black',
    color: '#FFFFFF',
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: -2,
    textShadowColor: 'rgba(255, 255, 255, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  headerRight: {
    width: 36,
  },
  scrollContent: {
    paddingBottom: 0,
  },
});


