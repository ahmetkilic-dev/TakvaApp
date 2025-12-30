import { View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions, Platform, FlatList, KeyboardAvoidingView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';
import { useState, useRef, useEffect } from 'react';
import { Image } from 'react-native';
import { askHoca } from '../../../services/geminiService';
import { useUserStats } from '../../../contexts/UserStatsContext';

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
  const { incrementTask } = useUserStats();
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  const handleSend = async (text = inputText) => {
    const question = text.trim();
    if (!question) return;

    // Kullanıcı mesajını ekle
    const userMessage = { id: Date.now().toString(), text: question, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    // Otomatik kaydır
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);

    // API'ye sor
    const answer = await askHoca(question);

    // Hata kontrolü
    let finalAnswer = answer;
    if (answer?.includes('current quota') || answer?.includes('RESOURCE_EXHAUSTED') || answer?.includes('429')) {
      finalAnswer = "Şu an çok yoğunum, biraz dinlenmem lazım. (API Kotası Doldu) 😔 Daha sonra tekrar dener misin?";
    }

    // Cevabı ekle
    const botMessage = { id: (Date.now() + 1).toString(), text: finalAnswer, sender: 'bot' };
    setMessages(prev => [...prev, botMessage]);
    setLoading(false);

    // 7. Günlük görev ilerlemesini CONTEXT üzerinden güncelle
    await incrementTask(7, 1);

    // Otomatik kaydır
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderMessage = ({ item }) => {
    const isUser = item.sender === 'user';
    return (
      <View style={{
        alignSelf: isUser ? 'flex-end' : 'flex-start',
        maxWidth: '80%',
        marginVertical: 4,
        padding: 12,
        borderRadius: 16,
        borderBottomRightRadius: isUser ? 2 : 16,
        borderBottomLeftRadius: isUser ? 16 : 2,
        backgroundColor: isUser ? '#4E7060' : 'rgba(24, 39, 35, 0.8)',
        borderWidth: isUser ? 0 : 0.5,
        borderColor: 'rgba(255, 255, 255, 0.2)'
      }}>
        <Text style={{ fontFamily, color: '#FFFFFF', fontSize: 14, lineHeight: 20 }}>
          {item.text}
        </Text>
      </View>
    );
  };

  const renderWelcomeScreen = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: horizontalPadding,
        paddingTop: 24,
        paddingBottom: 0,
        flexGrow: 1
      }}
    >
      {/* Profile Section */}
      <View style={{ alignItems: 'center', marginBottom: 32 }}>
        <Text style={{ fontFamily, fontSize: 20, fontWeight: '700', color: '#FFFFFF', marginBottom: 8 }}>
          Hoca AI
        </Text>
        <Text style={{ fontFamily, fontSize: 10, fontWeight: '400', color: 'rgba(255, 255, 255, 0.6)', marginBottom: 16 }}>
          Doğru bilgiye kolayca ulaş
        </Text>

        <View style={{
          width: 70, height: 70, borderRadius: 35, borderWidth: 1.5,
          borderColor: 'rgba(255, 255, 255, 0.5)', overflow: 'hidden',
          backgroundColor: '#24322E', marginTop: 55,
        }}>
          <Image source={hocaImage} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
        </View>
      </View>

      {/* Suggested Questions */}
      <View style={{ marginBottom: 32, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center', maxWidth: contentWidth }}>
          {suggestedQuestions.map((question, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSend(question)}
              style={{
                minHeight: 24, paddingHorizontal: 16, paddingVertical: 4,
                borderRadius: 20, borderWidth: 0.5, borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: 'rgba(24, 39, 35, 0.5)', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <Text style={{ fontFamily, fontSize: 10, fontWeight: '400', color: '#FFFFFF', textAlign: 'center' }}>
                {question}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </ScrollView>
  );

  return (
    <ScreenBackground>
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-2 pb-2">
          <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 items-center justify-center">
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Cinzel-Black', color: '#FFFFFF', fontSize: 24, textAlign: 'center', letterSpacing: -2 }}>
            HOCA
          </Text>
          <View className="w-9" />
        </View>

        {/* Content */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        >
          {messages.length === 0 ? renderWelcomeScreen() : (
            <FlatList
              ref={flatListRef}
              data={messages}
              keyExtractor={item => item.id}
              renderItem={renderMessage}
              contentContainerStyle={{ paddingHorizontal: horizontalPadding, paddingVertical: 16 }}
              showsVerticalScrollIndicator={false}
              onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
            />
          )}

          {loading && messages.length > 0 && (
            <View style={{ padding: 10, alignItems: 'center' }}>
              <ActivityIndicator size="small" color="#FFFFFF" />
            </View>
          )}

          {/* Input Area */}
          <View style={{ paddingBottom: Platform.OS === 'ios' ? 10 : 10, paddingTop: 10, paddingRight: horizontalPadding }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <View style={{
                flex: 1, flexDirection: 'row', alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
                borderWidth: 0.5,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                paddingLeft: 16, paddingRight: 8, height: 44,
              }}>
                <TextInput
                  style={{ flex: 1, fontFamily, fontSize: 14, fontWeight: '300', color: 'rgba(255, 255, 255, 0.9)', paddingVertical: 0 }}
                  placeholder="Hocaya sor..."
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={inputText}
                  onChangeText={setInputText}
                  multiline={false}
                  onSubmitEditing={() => handleSend()}
                  returnKeyType="send"
                />
              </View>

              <TouchableOpacity
                onPress={() => handleSend()}
                disabled={loading || !inputText.trim()}
                style={{
                  width: 44, height: 44, borderRadius: 22,
                  backgroundColor: loading || !inputText.trim() ? 'rgba(214, 214, 214, 0.1)' : 'rgba(255, 255, 255, 0.2)',
                  alignItems: 'center', justifyContent: 'center'
                }}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Ionicons name="send" size={20} color={inputText.trim() ? "#FFFFFF" : "rgba(255, 255, 255, 0.3)"} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScreenBackground>
  );
}
