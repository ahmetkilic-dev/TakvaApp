import { View, Text, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ImsakiyeHeader from './ImsakiyeHeader';

const fontFamily = 'Plus Jakarta Sans';

export default function ImsakiyeLoading() {
  return (
    <SafeAreaView edges={['top']} className="flex-1">
      <ImsakiyeHeader />
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#FFBA4A" />
        <Text style={{ fontFamily, color: '#FFFFFF', marginTop: 16, fontSize: 14 }}>
          Namaz vakitleri yükleniyor...
        </Text>
      </View>
    </SafeAreaView>
  );
}

