import { View, Image, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Responsive calculations
const horizontalPadding = Math.max(20, SCREEN_WIDTH * 0.05);
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);

export default function ZikirDuaImage() {
  return (
    <View style={{ marginBottom: 32, alignItems: 'center' }}>
      <Image
        source={require('../../assets/images/zikir-dua.png')}
        style={{
          width: Math.min(300, contentWidth),
          height: Math.min(300 * (163 / 300), Math.min(300, contentWidth) * (163 / 300)),
          borderRadius: 25,
          borderWidth: 0.5,
          borderColor: 'rgba(255, 255, 255, 0.5)',
        }}
        resizeMode="cover"
      />
    </View>
  );
}

