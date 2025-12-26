import { View, Text } from 'react-native';
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const horizontalPadding = Math.max(20, SCREEN_WIDTH * 0.05);
const fontFamily = 'Plus Jakarta Sans';

export default function SuraTitle({ title }) {
  return (
    <View style={{ paddingHorizontal: horizontalPadding, paddingTop: 24, paddingBottom: 16 }}>
      <Text
        style={{
          fontFamily,
          fontSize: 20,
          fontWeight: '700',
          color: '#FFFFFF',
          textAlign: 'center',
          letterSpacing: 2,
        }}
      >
        {title}
      </Text>
    </View>
  );
}

