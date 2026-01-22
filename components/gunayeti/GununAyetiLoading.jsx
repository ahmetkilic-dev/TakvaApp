import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GününAyetiHeader from './GununAyetiHeader';

const fontFamily = 'Plus Jakarta Sans';

export default function GunuAyetiLoading() {
  return (
    <SafeAreaView edges={['top']} className="flex-1">
      <GününAyetiHeader />
      <View className="flex-1 items-center justify-center px-4">
        <ActivityIndicator size="large" color="#FFBA4A" />
        <Text style={{ fontFamily, color: '#FFFFFF', marginTop: 16, fontSize: 14 }}>
          Ayetler yükleniyor...
        </Text>
      </View>
    </SafeAreaView>
  );
}

