import { View, Text, ScrollView, TouchableOpacity, TextInput, Dimensions, Platform, FlatList, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';
import { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Image } from 'react-native';
import { askHoca } from '../../../services/geminiService';
import { useUserStats } from '../../../contexts/UserStatsContext';
import hocaData from '../../../constants/hocaData';
import React from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';
const horizontalPadding = 20;

// Profile image
const hocaImage = require('../../../assets/images/Hoca.png');

// Suggested questions (Original)
const suggestedQuestions = [
  'Zekât kimlere verilir?',
  'Abdest nasıl alınır?',
  'Peygamber Efendimizin sünnetleri nelerdir?',
  'Tesettür farz mı?',
  'Kader nedir?',
  'Sadaka ile zekât arasındaki fark nedir?',
];

// Categories will be extracted from hocaData.js
const uniqueCategories = [...new Set(hocaData.map(item => item.category))];
const hocaCategories = uniqueCategories.map(cat => ({ title: cat }));

const MandalaPattern = () => (
  <View style={{ position: 'absolute', top: -140, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
    {/* Mandala Layers using circular patterns or Icons */}
    <View style={{ opacity: 0.15 }}>
      <Ionicons name="sunny-outline" size={300} color="#CF9B47" style={{ opacity: 0.8 }} />
      <View style={{ position: 'absolute', top: 50, left: 50, width: 200, height: 200, borderRadius: 100, borderStyle: 'dotted', borderWidth: 2, borderColor: '#CF9B47', opacity: 0.5 }} />
      <View style={{ position: 'absolute', top: 25, left: 25, width: 250, height: 250, borderRadius: 125, borderStyle: 'dashed', borderWidth: 1, borderColor: '#CF9B47', opacity: 0.3 }} />
    </View>
  </View>
);

// Memoized Message Item
const MessageItem = React.memo(({ item }) => {
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
});

export default function HocaAIScreen() {
  const router = useRouter();
  const { user, isPlusOrAbove } = useUserStats();
  const [activeTab, setActiveTab] = useState('HOCA'); // Default to HOCA to avoid immediate paywall for free users
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef(null);

  const handleSend = async (text = inputText) => {
    const question = text.trim();
    if (!question) return;

    // AI sekmesine geç
    if (activeTab !== 'HOCA_AI') setActiveTab('HOCA_AI');

    // Kullanıcı mesajını ekle
    const userMessage = { id: Date.now().toString(), text: question, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setLoading(true);

    // Otomatik kaydır
    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);

    const answer = await askHoca(question);

    let finalAnswer = answer;
    if (answer?.includes('current quota') || answer?.includes('RESOURCE_EXHAUSTED') || answer?.includes('429')) {
      finalAnswer = "Şu an çok yoğunum, biraz dinlenmem lazım. (API Kotası Doldu) 😔 Daha sonra tekrar dener misin?";
    }

    const botMessage = { id: (Date.now() + 1).toString(), text: finalAnswer, sender: 'bot' };
    setMessages(prev => [...prev, botMessage]);
    setLoading(false);

    setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
  };

  const renderHocaTab = () => (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: horizontalPadding,
        paddingTop: 24,
        paddingBottom: 40,
        alignItems: 'center'
      }}
    >
      {/* Profile Section (Matched with AI Tab) */}
      <View style={{ alignItems: 'center', marginBottom: 32, width: '100%' }}>
        <Text style={{ fontFamily, fontSize: 20, fontWeight: '700', color: '#FFFFFF', marginBottom: 8 }}>
          Hoca
        </Text>
        <Text style={{ fontFamily, fontSize: 10, fontWeight: '400', color: 'rgba(255, 255, 255, 0.6)', marginBottom: 16 }}>
          Doğru bilgiye kolayca ulaş
        </Text>

        <View style={{
          width: 70, height: 70, borderRadius: 35, borderWidth: 1.5,
          borderColor: 'rgba(255, 255, 255, 0.5)', overflow: 'hidden',
          backgroundColor: '#24322E', marginTop: 55,
        }}>
          {/* Mandala Pattern Overlay (Behind Avatar) */}
          <View style={{ position: 'absolute', top: -95, left: -95, opacity: 0.1, zIndex: -1 }}>
            <Ionicons name="sunny-outline" size={260} color="#CF9B47" />
          </View>
          <Image source={hocaImage} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
        </View>
      </View>

      {/* Category Cloud */}
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10, justifyContent: 'center' }}>
        {hocaCategories.map((cat, idx) => (
          <TouchableOpacity
            key={idx}
            onPress={() => router.push({
              pathname: '/(app)/(services)/hoca-sorular',
              params: { category: cat.title }
            })}
            style={{
              paddingHorizontal: 16, paddingVertical: 8,
              borderRadius: 20, borderWidth: 0.5, borderColor: 'rgba(255, 255, 255, 0.4)',
              backgroundColor: 'rgba(24, 39, 35, 0.5)'
            }}
          >
            <Text style={{ fontFamily, fontSize: 11, fontWeight: '400', color: '#FFFFFF' }}>
              {cat.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );

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
      {/* Profile Section (Original) */}
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

      {/* Suggested Questions (Matched Style with Hoca Categories) */}
      <View style={{ marginBottom: 32, alignItems: 'center' }}>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          {suggestedQuestions.map((question, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSend(question)}
              style={{
                paddingHorizontal: 16, paddingVertical: 8,
                borderRadius: 20, borderWidth: 0.5, borderColor: 'rgba(255, 255, 255, 0.4)',
                backgroundColor: 'rgba(24, 39, 35, 0.5)', alignItems: 'center', justifyContent: 'center'
              }}
            >
              <Text style={{ fontFamily, fontSize: 11, fontWeight: '400', color: '#FFFFFF', textAlign: 'center' }}>
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
        {/* Header (Original Style) */}
        <View className="flex-row items-center justify-between px-4 pt-2 pb-1">
          <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 items-center justify-center">
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={{ fontFamily: 'Cinzel-Black', color: '#FFFFFF', fontSize: 24, textAlign: 'center', letterSpacing: -2 }}>
            HOCA
          </Text>
          <View className="w-9" />
        </View>

        {/* Switcher (Figma 158x32px) */}
        <View style={{ alignItems: 'center', marginBottom: 10, marginTop: 5 }}>
          <View style={{
            width: 158, height: 32, borderRadius: 16,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderWidth: 0.5, borderColor: 'rgba(255, 255, 255, 0.5)',
            flexDirection: 'row', alignItems: 'center', padding: 2
          }}>
            <TouchableOpacity
              onPress={() => setActiveTab('HOCA')}
              style={{
                flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center',
                borderRadius: 14, backgroundColor: activeTab === 'HOCA' ? '#FFFFFF' : 'transparent'
              }}
            >
              <Text style={{
                fontFamily, fontWeight: '700', fontSize: 11,
                color: activeTab === 'HOCA' ? '#04100D' : '#FFFFFF'
              }}>Hoca</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (!isPlusOrAbove()) {
                  Alert.alert(
                    "Takva Plus/Premium Gerekli",
                    "Hoca AI özelliğini kullanabilmek için Plus veya Premium abonesi olmanız gerekmektedir.",
                    [
                      { text: "Vazgeç", style: "cancel" },
                      { text: "Abone Ol", onPress: () => router.push('/premium') }
                    ]
                  );
                  return;
                }
                setActiveTab('HOCA_AI');
              }}
              style={{
                flex: 1, height: '100%', alignItems: 'center', justifyContent: 'center',
                borderRadius: 14, backgroundColor: activeTab === 'HOCA_AI' ? '#FFFFFF' : 'transparent'
              }}
            >
              <Text style={{
                fontFamily, fontWeight: '700', fontSize: 11,
                color: activeTab === 'HOCA_AI' ? '#04100D' : '#CF9B47'
              }}>Hoca AI</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Content */}
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
        >
          {activeTab === 'HOCA' ? (
            renderHocaTab()
          ) : (
            messages.length === 0 ? renderWelcomeScreen() : (
              <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <MessageItem item={item} />}
                contentContainerStyle={{ paddingHorizontal: horizontalPadding, paddingVertical: 16 }}
                showsVerticalScrollIndicator={false}
                onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
              />
            )
          )}

          {loading && messages.length > 0 && activeTab === 'HOCA_AI' && (
            <View style={{ padding: 10, alignItems: 'center' }}>
              <ActivityIndicator size="small" color="#FFFFFF" />
            </View>
          )}

          {/* Input Area (Only for AI tab) */}
          {activeTab === 'HOCA_AI' && (
            <View style={{ paddingBottom: 10, paddingTop: 10, paddingHorizontal: horizontalPadding }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <View style={{
                  flex: 1, flexDirection: 'row', alignItems: 'center',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  borderRadius: 25, borderWidth: 0.5, borderColor: 'rgba(255, 255, 255, 0.5)',
                  paddingHorizontal: 16, height: 44,
                }}>
                  <TextInput
                    style={{ flex: 1, fontFamily, fontSize: 14, color: '#FFFFFF' }}
                    placeholder="Hocaya sor..."
                    placeholderTextColor="rgba(255, 255, 255, 0.6)"
                    value={inputText}
                    onChangeText={setInputText}
                    onSubmitEditing={() => handleSend()}
                    returnKeyType="send"
                  />
                </View>

                <TouchableOpacity
                  onPress={() => handleSend()}
                  disabled={loading || !inputText.trim()}
                  style={{
                    width: 44, height: 44, borderRadius: 22,
                    backgroundColor: loading || !inputText.trim() ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.2)',
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
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScreenBackground>
  );
}
