import { View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';
import { useState } from 'react';
import { Image } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

// Responsive calculations
const horizontalPadding = 20;
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);

// Profile image
const hocaImage = require('../../../assets/images/Hoca.png');

// Suggested questions
const suggestedQuestions = [
  'Zekât kimlere verilir?',
  'Abdest nasıl alınır?',
  'Peygamber Efendimizin sünnetleri nelerdir?',
  'Tesettür farz mı?',
  'Kader nedir?',
  'Sadaka ile zekât arasındaki fark nedir?',
];

export default function HocaAIScreen() {
  const router = useRouter();
  const [inputText, setInputText] = useState('');

  return (
    <ScreenBackground>
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-2 pb-2">
          <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 items-center justify-center">
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
            HOCA
          </Text>
          <View className="w-9" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: horizontalPadding,
            paddingTop: 24,
            paddingBottom: 100,
          }}
        >
          {/* Profile Section */}
          <View style={{ alignItems: 'center', marginBottom: 32 }}>
            <Text
              style={{
                fontFamily,
                fontSize: 20,
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: 8,
              }}
            >
              Hoca Al
            </Text>
            <Text
              style={{
                fontFamily,
                fontSize: 10,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: 16,
              }}
            >
              Doğru bilgiye kolayca ulaş
            </Text>

            {/* Profile Image */}
            <View
              style={{
                width: 70,
                height: 70,
                borderRadius: 35,
                borderWidth: 1.5,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                overflow: 'hidden',
                backgroundColor: '#24322E',
              }}
            >
              <Image
                source={hocaImage}
                style={{
                  width: '100%',
                  height: '100%',
                }}
                resizeMode="cover"
              />
            </View>
          </View>

          {/* Suggested Questions */}
          <View style={{ marginBottom: 32, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', maxWidth: contentWidth }}>
              {suggestedQuestions.map((question, index) => {
                // Calculate width: try to fit text with padding, but don't exceed max width
                const maxWidthPerButton = (contentWidth - 12) / 2; // Two columns with 12px gap
                const textWidth = question.length * 6; // Approximate character width
                const padding = 32; // 16px on each side
                const calculatedWidth = Math.min(textWidth + padding, maxWidthPerButton);
                
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      minHeight: 24,
                      paddingHorizontal: 16,
                      paddingVertical: 4,
                      borderRadius: 20,
                      borderWidth: 0.5,
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      backgroundColor: 'rgba(24, 39, 35, 0.5)',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: calculatedWidth,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily,
                        fontSize: 10,
                        fontWeight: '400',
                        color: '#FFFFFF',
                        textAlign: 'center',
                      }}
                      numberOfLines={2}
                    >
                      {question}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

        </ScrollView>

        {/* Separator Line - Full width, no padding */}
        <View
          style={{
            width: SCREEN_WIDTH,
            height: 0.5,
            backgroundColor: 'rgba(217, 217, 217, 0.5)',
            marginBottom: 16,
          }}
        />

        {/* Input Field - Fixed at bottom, left aligned */}
        <View style={{ paddingBottom: Platform.OS === 'ios' ? 40 : 20, paddingTop: 0, paddingRight: horizontalPadding }}>
          {/* Input Container with Send Button Outside */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {/* Input Field - Left aligned, rounded only on right, extends to right */}
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
                borderWidth: 0.5,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                paddingLeft: 16,
                paddingRight: 8,
                height: 38,
              }}
            >
              <TextInput
                style={{
                  flex: 1,
                  fontFamily,
                  fontSize: 14,
                  fontWeight: '300',
                  color: 'rgba(255, 255, 255, 0.6)',
                  paddingVertical: 0,
                }}
                placeholder="Hocaya sor"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                value={inputText}
                onChangeText={setInputText}
                multiline={false}
              />
              
              {/* Microphone Icon - No circle background, inside input */}
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 8,
                  padding: 4,
                }}
              >
                <Ionicons name="mic-outline" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Send Icon - Outside input, aligned to far right */}
            <TouchableOpacity
              style={{
                width: 38,
                height: 38,
                borderRadius: 19,
                backgroundColor: 'rgba(214, 214, 214, 0.2)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="send" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ScreenBackground>
  );
}
