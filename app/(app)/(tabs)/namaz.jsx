import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';
import KazaCounter from '../../../components/namaz/KazaCounter';
import LearningGuides from '../../../components/namaz/LearningGuides';

export default function NamazScreen() {
  const router = useRouter();
  const fontStyle = { fontFamily: 'Plus Jakarta Sans' };

  const handleAbdestPress = () => {
    // Abdest rehberine yönlendir
    router.push('/(app)/(services)/abdest');
  };

  const handleNamazPress = () => {
    // Namaz rehberine yönlendir
    router.push('/(app)/(services)/namazrehber');
  };

  return (
    <ScreenBackground>
      <SafeAreaView edges={['top']} style={styles.safeArea}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>NAMAZ</Text>
          <View style={styles.headerRight} />
        </View>

        <ScrollView 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* Kaza Namazlarım & Kaza Oruçlarım */}
          <KazaCounter />

          {/* Öğrenme Rehberleri */}
          <LearningGuides 
            onAbdestPress={handleAbdestPress}
            onNamazPress={handleNamazPress}
          />
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
    paddingVertical: 6,
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
    width: 40,
  },
  scrollContent: {
    paddingBottom: 120,
  },
});
