import { View, Text } from 'react-native';
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const horizontalPadding = Math.max(20, SCREEN_WIDTH * 0.05);
const fontFamily = 'Plus Jakarta Sans';

export default function KuranYolculugu() {
  return (
    <View style={{ paddingHorizontal: horizontalPadding, paddingTop: 22, paddingBottom: 16 }}>
      <Text
        style={{
          fontFamily,
          fontSize: 16 * 1.3,
          fontWeight: '700',
          color: '#FFFFFF',
          marginBottom: 8,
          textAlign: 'center',
        }}
      >
        Kuran Yolculuğun
      </Text>
      <Text
        style={{
          fontFamily,
          fontSize: 10 * 1.3,
          fontWeight: '400',
          color: 'rgba(255, 255, 255, 0.6)',
          textAlign: 'center',
          lineHeight: 14 * 1.3,
        }}
      >
        Kur'ân-ı Kerim'i okuyabilir, meallerini inceleyebilir ve aradığın ayeti kolayca bulabilirsin.
      </Text>
    </View>
  );
}

