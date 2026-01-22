import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import GününAyetiHeader from './GununAyetiHeader';

const fontFamily = 'Plus Jakarta Sans';

export default function GununAyetiError({ error }) {
  return (
    <SafeAreaView edges={['top']} className="flex-1">
      <GününAyetiHeader />
      <View className="flex-1 items-center justify-center px-4">
        <Ionicons name="alert-circle-outline" size={64} color="#FF6B6B" />
        <Text style={{ fontFamily, color: '#FFFFFF', fontSize: 16, textAlign: 'center', marginTop: 16 }}>
          {error || 'Ayetler yüklenirken bir hata oluştu'}
        </Text>
        <Text style={{ fontFamily, color: 'rgba(255, 255, 255, 0.6)', fontSize: 14, textAlign: 'center', marginTop: 8 }}>
          Lütfen daha sonra tekrar deneyin.
        </Text>
      </View>
    </SafeAreaView>
  );
}

