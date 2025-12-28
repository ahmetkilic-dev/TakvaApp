import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function NamazDurumuHeader() {
  const router = useRouter();

  return (
    <View className="flex-row items-center justify-between px-4 pt-2 pb-2">
      <TouchableOpacity
        onPress={() => router.back()}
        className="w-9 h-9 items-center justify-center"
        activeOpacity={0.7}
      >
        <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
      </TouchableOpacity>
      <Text
        style={{
          fontFamily: 'Cinzel-Black',
          color: '#FFFFFF',
          fontSize: 24,
          textAlign: 'center',
          letterSpacing: -2,
        }}
      >
        NAMAZ DURUMU
      </Text>
      <View className="w-9" />
    </View>
  );
}


