import { View, Text, ScrollView, Dimensions } from 'react-native';
import { useDuas } from './hooks/useDuas';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const horizontalPadding = Math.max(20, SCREEN_WIDTH * 0.05);
const fontFamily = 'Plus Jakarta Sans';

export default function DuaCard() {
  const { currentDua, loading } = useDuas();

  if (loading || !currentDua) {
    return null;
  }

  return (
    <View style={{ paddingBottom: 40 }}>
      {/* Title Section - Full Width Rectangle */}
      <View
        style={{
          height: 45,
          backgroundColor: '#1C1C1C',
          borderWidth: 3,
          borderColor: '#186853',
          marginHorizontal: -horizontalPadding, // To span full width
          width: SCREEN_WIDTH,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <Text
          style={{
            fontFamily,
            fontSize: 20,
            fontWeight: '600',
            color: '#FFFFFF',
          }}
        >
          {currentDua.title}
        </Text>
      </View>

      {/* Dua Section */}
      <View style={{ marginBottom: 24 }}>
        <Text
          style={{
            fontFamily,
            fontSize: 18,
            fontWeight: '600',
            color: '#FFFFFF',
            marginBottom: 12,
          }}
        >
          Dua
        </Text>
        <Text
          style={{
            fontFamily: 'Scheherazade New',
            fontSize: 24,
            fontWeight: '400',
            color: 'rgba(255, 186, 74, 0.9)',
            lineHeight: 40,
            textAlign: 'right',
            marginBottom: 16,
          }}
        >
          {currentDua.arabic}
        </Text>
      </View>

      {/* Divider */}
      <View
        style={{
          height: 0.5,
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          marginBottom: 24,
        }}
      />

      {/* Meali Section */}
      <View style={{ marginBottom: 24 }}>
        <Text
          style={{
            fontFamily,
            fontSize: 18,
            fontWeight: '600',
            color: '#FFFFFF',
            marginBottom: 12,
          }}
        >
          Meali
        </Text>
        <Text
          style={{
            fontFamily,
            fontSize: 16,
            fontWeight: '300',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: 22,
          }}
        >
          {currentDua.meaning}
        </Text>
      </View>

      {/* Divider */}
      <View
        style={{
          height: 0.5,
          backgroundColor: 'rgba(255, 255, 255, 0.25)',
          marginBottom: 24,
        }}
      />

      {/* Açıklama Section */}
      <View style={{ marginBottom: 40 }}>
        <Text
          style={{
            fontFamily,
            fontSize: 18,
            fontWeight: '600',
            color: '#FFFFFF',
            marginBottom: 12,
          }}
        >
          Açıklama
        </Text>
        <Text
          style={{
            fontFamily,
            fontSize: 16,
            fontWeight: '300',
            color: 'rgba(255, 255, 255, 0.6)',
            lineHeight: 24,
          }}
        >
          {currentDua.explanation}
        </Text>
      </View>
    </View>
  );
}
