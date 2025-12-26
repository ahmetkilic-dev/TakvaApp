import { View, Text, TouchableOpacity } from 'react-native';
import { useDuas } from './hooks/useDuas';

const fontFamily = 'Plus Jakarta Sans';

export default function DuaCard() {
  const { currentDua, getRandomDua } = useDuas();

  if (!currentDua) {
    return null;
  }

  return (
    <>
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
            fontFamily: 'Noto Sans Arabic',
            fontSize: 20,
            fontWeight: '300',
            color: '#FFBA4A',
            lineHeight: 37,
            letterSpacing: 0.4,
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
            color: '#FFFFFF',
            lineHeight: 24,
          }}
        >
          {currentDua.turkish}
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

      {/* Bottom Action Bar */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: 24,
      }}>
        <TouchableOpacity
          onPress={getRandomDua}
          style={{
            width: 95,
            height: 38,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#8CD7C0',
            backgroundColor: '#1C1C1C',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontFamily,
              fontSize: 14,
              fontWeight: '300',
              color: '#FFFFFF',
            }}
          >
            Yeni dua
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

