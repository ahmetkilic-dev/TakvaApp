import { View, Text } from 'react-native';

const fontFamily = 'Plus Jakarta Sans';

export default function VerseContent({ verse }) {
  if (!verse) {
    return null;
  }

  return (
    <>
      {/* Arabic Text */}
      <View style={{ marginBottom: 16 }}>
        <Text
          style={{
            fontFamily: 'Noto Sans Arabic',
            fontSize: 20,
            fontWeight: '300',
            color: '#FFBA4A',
            lineHeight: 37,
            letterSpacing: 0.4,
            textAlign: 'right',
          }}
        >
          {verse.arabic}
        </Text>
      </View>

      {/* Divider */}
      <View
        style={{
          width: '100%',
          height: 0.5,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          marginBottom: 24,
        }}
      />

      {/* Turkish Translation */}
      <View style={{ marginBottom: 24 }}>
        <Text
          style={{
            fontFamily,
            fontSize: 16,
            fontWeight: '300',
            color: '#FFFFFF',
            lineHeight: 24,
            letterSpacing: 0.32,
          }}
        >
          {verse.turkish}
        </Text>
      </View>

      {/* Verse Reference - Örnek: Hucurat 13. Ayet */}
      <View style={{ alignItems: 'flex-end', marginBottom: 24 }}>
        <Text
          style={{
            fontFamily,
            fontSize: 14,
            fontWeight: '700',
            color: 'rgba(255, 186, 74, 0.7)',
            textAlign: 'right',
          }}
        >
          {verse.reference}
        </Text>
      </View>
    </>
  );
}

