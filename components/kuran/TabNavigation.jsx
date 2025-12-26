import { View, Text, TouchableOpacity } from 'react-native';

const fontFamily = 'Plus Jakarta Sans';

export default function TabNavigation({ activeTab, onTabChange }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        gap: 9.2,
        padding: 3.45,
        borderRadius: 11.5,
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
      }}
    >
      {['Sure', 'Cüz', 'Sayfa'].map((tab) => (
        <TouchableOpacity
          key={tab}
          onPress={() => onTabChange(tab)}
          style={{
            paddingHorizontal: 9.2,
            height: 24.15,
            borderRadius: 11.5,
            backgroundColor: activeTab === tab ? '#143E33' : 'transparent',
            borderWidth: 0.5,
            borderColor: 'rgba(255, 255, 255, 0.5)',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: activeTab === tab ? 1 : 0.1,
          }}
        >
          <Text
            style={{
              fontFamily,
              fontSize: 11.5,
              fontWeight: '400',
              color: '#FFFFFF',
              lineHeight: 11.5,
            }}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

