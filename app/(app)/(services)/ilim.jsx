import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import ScreenBackground from '../../../components/common/ScreenBackground';

// Import icons from assets/İlim
const günlükPuanIcon = require('../../../assets/İlim/günlükpuan.png');
const toplamPuanIcon = require('../../../assets/İlim/toplampuan.png');
const fikihIcon = require('../../../assets/İlim/fikih.png');
const istatistikIcon = require('../../../assets/İlim/istatistik.png');
const ahlakadapIcon = require('../../../assets/İlim/ahlakadap.png');
const dinigünIcon = require('../../../assets/İlim/dinigün.png');
const dinikavramlarIcon = require('../../../assets/İlim/dinikavramlar.png');
const esmaülIcon = require('../../../assets/İlim/esmaül.png');
const hadisIcon = require('../../../assets/İlim/hadis.png');
const kuranIcon = require('../../../assets/İlim/kuran.png');
const siyerIcon = require('../../../assets/İlim/siyer.png');

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

// Responsive calculations
const horizontalPadding = 20;
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);

export default function IlimScreen() {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentPoints] = useState(2100);
  const [totalPoints] = useState(2100);
  const [progress] = useState(65); // Progress percentage
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isStatisticsModalVisible, setIsStatisticsModalVisible] = useState(false);

  // Sample question data - replace with real data
  const questionData = {
    category: 'Fıkıh Bilgisi',
    question: "Peygamber Efendimiz'in (s.a.v.) Miraç yolculuğu sırasında ümmeti için aldığı en önemli emir hangisidir ve bu emir hangi semada verilmiştir?",
    answers: [
      { id: 'A', text: 'Oruç ibadetinin farz kılınması' },
      { id: 'B', text: 'Namazın günde elli vakit olarak farz kılınması' },
      { id: 'C', text: 'Namazın beş vakte indirilişi' },
      { id: 'D', text: 'Zekâtın farz oluşu' },
    ],
  };

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
    // Handle answer selection logic here
  };

  return (
    <ScreenBackground>
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-2 pb-4">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="w-9 h-9 items-center justify-center"
          >
            <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
          </TouchableOpacity>
          <View className="flex-1 items-center">
            <Text
              style={{
                fontFamily: 'Cinzel-Black',
                color: '#FFFFFF',
                fontSize: 24,
                letterSpacing: -2,
              }}
            >
              İLİM
            </Text>
          </View>
          <View className="w-9" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: horizontalPadding,
            paddingTop: 24,
            paddingBottom: Platform.OS === 'ios' ? 120 : 100,
          }}
        >
          {/* Title Section */}
          <View className="items-center mb-6">
            <Text
              style={{
                fontFamily,
                fontSize: 16,
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: 4,
              }}
            >
              İlim Yolculuğu
            </Text>
            <Text
              style={{
                fontFamily,
                fontSize: 10,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              Bilgini ölç, ilmini artır.
            </Text>
          </View>

          {/* White Box Container - Everything below title */}
          <View
            style={{
              width: '100%',
              maxWidth: Math.min(SCREEN_WIDTH - horizontalPadding * 2, 380),
              alignSelf: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 20,
              padding: 24,
              marginBottom: 20,
            }}
          >
            {/* Points Card */}
            <View className="mb-4">
              <LinearGradient
                colors={['#182724', '#28312F']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 20,
                  padding: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  shadowColor: '#FFFFFF',
                  shadowOffset: { width: 0, height: 18 },
                  shadowOpacity: 0.05,
                  shadowRadius: 36,
                  elevation: 5,
                  position: 'relative',
                }}
              >
                {/* Left: Daily Points Icon + Points */}
                <View className="flex-row items-center">
                  <Image 
                    source={günlükPuanIcon} 
                    style={{ width: 48, height: 48, marginRight: 12 }} 
                    resizeMode="contain"
                  />
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Rubik',
                        fontSize: 16,
                        fontWeight: '500',
                        color: '#FFFFFF',
                      }}
                    >
                      {currentPoints}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Rubik',
                        fontSize: 12,
                        fontWeight: '400',
                        color: '#FFFFFF',
                        letterSpacing: 0.24,
                      }}
                    >
                      Puan
                    </Text>
                  </View>
                </View>

                {/* Vertical Divider - Centered between left points and right icon */}
                <View
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: 20,
                    width: 0.5,
                    height: 48,
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    marginLeft: -0.25,
                  }}
                />

                {/* Right: Total Points Icon + Points */}
                <View className="flex-row items-center">
                  <Image 
                    source={toplamPuanIcon} 
                    style={{ width: 48, height: 48, marginRight: 12 }} 
                    resizeMode="contain"
                  />
                  <View>
                    <Text
                      style={{
                        fontFamily: 'Rubik',
                        fontSize: 16,
                        fontWeight: '500',
                        color: '#FFFFFF',
                      }}
                    >
                      {totalPoints}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Rubik',
                        fontSize: 12,
                        fontWeight: '400',
                        color: '#FFFFFF',
                        letterSpacing: 0.24,
                      }}
                    >
                      Puan
                    </Text>
                  </View>
                </View>
              </LinearGradient>
            </View>

            {/* Progress Bar Section */}
            <View
              className="mb-3"
              style={{
                width: '100%',
                alignItems: 'center',
              }}
            >
              {/* Progress Bar */}
              <View
                style={{
                  width: '100%',
                  height: 16,
                  borderRadius: 10,
                  backgroundColor: '#D1D1D1',
                  overflow: 'hidden',
                }}
              >
                <LinearGradient
                  colors={['#518375', '#094736']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    width: `${progress}%`,
                    height: '100%',
                    borderRadius: 10,
                  }}
                />
              </View>
            </View>

            {/* Pause Button - Below progress bar, right aligned */}
            <View
              className="mb-6"
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            >
              <TouchableOpacity
                onPress={() => setIsModalVisible(true)}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderWidth: 1,
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                }}
              >
                <Ionicons name="pause" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Category Section */}
            <View className="items-center mb-6">
              {/* Fikih Icon */}
              <Image 
                source={fikihIcon} 
                style={{ width: 44, height: 44, marginBottom: 8 }} 
                resizeMode="contain"
              />
              <Text
                style={{
                  fontFamily,
                  fontSize: 14,
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.6)',
                }}
              >
                {questionData.category}
              </Text>
            </View>

            {/* Question Section */}
            <View className="mb-6">
              <Text
                style={{
                  fontFamily,
                  fontSize: 18,
                  fontWeight: '700',
                  color: '#FFFFFF',
                  lineHeight: 24,
                  textAlign: 'center',
                }}
              >
                {questionData.question}
              </Text>
            </View>

            {/* Answer Options */}
            <View>
              {questionData.answers.map((answer, index) => {
                const isSelected = selectedAnswer === answer.id;
                return (
                  <TouchableOpacity
                    key={answer.id}
                    onPress={() => handleAnswerSelect(answer.id)}
                    activeOpacity={0.7}
                    style={{
                      width: '100%',
                      minHeight: 45,
                      borderRadius: 15,
                      borderWidth: 0.5,
                      borderColor: isSelected 
                        ? 'rgba(255, 255, 255, 0.75)' 
                        : 'rgba(255, 255, 255, 0.5)',
                      backgroundColor: '#182723',
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: index < questionData.answers.length - 1 ? 12 : 0,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily,
                        fontSize: 14,
                        fontWeight: '700',
                        color: '#FFFFFF',
                        textAlign: 'center',
                        lineHeight: 20,
                      }}
                    >
                      {answer.id}) {answer.text}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>

      {/* Pause Modal */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <BlurView
          intensity={50}
          tint="dark"
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: horizontalPadding,
          }}
        >
          {/* Modal Content */}
          <View
            style={{
              width: '100%',
              maxWidth: 390,
              backgroundColor: '#182723',
              borderRadius: 20,
              borderWidth: 0.5,
              borderColor: 'rgba(255, 255, 255, 0.75)',
              padding: 24,
            }}
          >
            {/* Close Button */}
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                width: 32,
                height: 32,
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
              }}
            >
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>

            {/* Title */}
            <Text
              style={{
                fontFamily,
                fontSize: 18,
                fontWeight: '700',
                color: '#FFFFFF',
                textAlign: 'center',
                marginBottom: 12,
                marginTop: 8,
              }}
            >
              İlim Yolculuğu
            </Text>

            {/* Description */}
            <Text
              style={{
                fontFamily,
                fontSize: 14,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.6)',
                textAlign: 'center',
                marginBottom: 24,
                lineHeight: 20,
              }}
            >
              İstersen devam edebilir, çıkabilir veya ilerlemene göz atabilirsin.
            </Text>

            {/* Action Buttons Row */}
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 12,
              }}
            >
              {/* Save and Exit Button */}
              <TouchableOpacity
                onPress={() => {
                  setIsModalVisible(false);
                  router.back();
                }}
                style={{
                  flex: 1,
                  height: 40,
                  borderRadius: 10,
                  borderWidth: 0.5,
                  borderColor: 'rgba(255, 255, 255, 0.75)',
                  backgroundColor: '#182723',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: 6,
                }}
              >
                <Text
                  style={{
                    fontFamily,
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#FFFFFF',
                  }}
                >
                  Kaydet ve çık
                </Text>
              </TouchableOpacity>

              {/* Continue Button */}
              <TouchableOpacity
                onPress={() => setIsModalVisible(false)}
                style={{
                  flex: 1,
                  height: 40,
                  borderRadius: 10,
                  borderWidth: 0.5,
                  borderColor: 'rgba(255, 255, 255, 0.75)',
                  backgroundColor: '#182723',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginLeft: 6,
                }}
              >
                <Text
                  style={{
                    fontFamily,
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#FFFFFF',
                  }}
                >
                  Devam et
                </Text>
              </TouchableOpacity>
            </View>

            {/* Statistics Button */}
            <TouchableOpacity
              onPress={() => {
                setIsModalVisible(false);
                setIsStatisticsModalVisible(true);
              }}
              style={{
                width: '100%',
                height: 40,
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: 'rgba(255, 255, 255, 0.75)',
                backgroundColor: '#182723',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 16,
              }}
            >
              <Image
                source={istatistikIcon}
                style={{ width: 24, height: 24, marginRight: 8 }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontFamily,
                  fontSize: 16,
                  fontWeight: '700',
                  color: '#FFFFFF',
                }}
              >
                İstatistikler
              </Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </Modal>

      {/* Statistics Modal */}
      <Modal
        visible={isStatisticsModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsStatisticsModalVisible(false)}
      >
        <BlurView
          intensity={50}
          tint="dark"
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: horizontalPadding,
          }}
        >
          {/* Modal Content */}
          <View
            style={{
              width: '100%',
              maxWidth: Math.min(SCREEN_WIDTH - horizontalPadding * 2, 390),
              backgroundColor: '#172521',
              borderRadius: 20,
              borderWidth: 0.5,
              borderColor: 'rgba(255, 255, 255, 0.75)',
              padding: 24,
            }}
          >
            {/* Header */}
            <View className="flex-row items-center justify-between mb-4">
              <TouchableOpacity
                onPress={() => setIsStatisticsModalVisible(false)}
                style={{
                  width: 32,
                  height: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
              </TouchableOpacity>
              <Text
                style={{
                  fontFamily,
                  fontSize: 18,
                  fontWeight: '700',
                  color: '#FFFFFF',
                }}
              >
                İlim Yolculuğu
              </Text>
              <TouchableOpacity
                onPress={() => setIsStatisticsModalVisible(false)}
                style={{
                  width: 32,
                  height: 32,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="close" size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Description */}
            <Text
              style={{
                fontFamily,
                fontSize: 14,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.6)',
                textAlign: 'center',
                marginBottom: 24,
                lineHeight: 20,
              }}
            >
              İstersen devam edebilir, çıkabilir veya ilerlemene göz atabilirsin.
            </Text>

            {/* Statistics Title */}
            <Text
              style={{
                fontFamily,
                fontSize: 16,
                fontWeight: '700',
                color: '#FFFFFF',
                textAlign: 'center',
                marginBottom: 20,
                textDecorationLine: 'underline',
              }}
            >
              İstatistikler
            </Text>

            {/* Statistics List */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: SCREEN_WIDTH * 0.8 }}
            >
              {[
                { icon: fikihIcon, name: 'Fıkıh', score: 7, total: 10 },
                { icon: kuranIcon, name: 'Kuran', score: 7, total: 10 },
                { icon: hadisIcon, name: 'Hadis', score: 7, total: 10 },
                { icon: ahlakadapIcon, name: 'Ahlak & Adap', score: 7, total: 10 },
                { icon: siyerIcon, name: 'Siyer', score: 7, total: 10 },
                { icon: dinigünIcon, name: 'Dini Günler', score: 7, total: 10 },
                { icon: dinikavramlarIcon, name: 'Dini Kavramlar', score: 7, total: 10 },
                { icon: esmaülIcon, name: 'Esmaü\'l-Hüsna', score: 7, total: 10 },
              ].map((stat, index) => {
                const progressPercentage = (stat.score / stat.total) * 100;
                const progressBarWidth = Math.min(207, SCREEN_WIDTH - horizontalPadding * 2 - 80);
                
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      marginBottom: 16,
                    }}
                  >
                    {/* Icon */}
                    <Image
                      source={stat.icon}
                      style={{ width: 24, height: 24, marginRight: 12 }}
                      resizeMode="contain"
                    />

                    {/* Progress Bar */}
                    <View
                      style={{
                        flex: 1,
                        height: 16.25,
                        borderRadius: 10,
                        backgroundColor: '#D1D1D1',
                        overflow: 'hidden',
                        marginRight: 12,
                      }}
                    >
                      <LinearGradient
                        colors={['#F5C96E', '#714D00']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={{
                          width: `${progressPercentage}%`,
                          height: '100%',
                          borderRadius: 10,
                        }}
                      />
                    </View>

                    {/* Score */}
                    <Text
                      style={{
                        fontFamily,
                        fontSize: 14,
                        fontWeight: '400',
                        color: '#FFFFFF',
                        minWidth: 50,
                        textAlign: 'right',
                      }}
                    >
                      {stat.score}/{stat.total}
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </BlurView>
      </Modal>
    </ScreenBackground>
  );
}

