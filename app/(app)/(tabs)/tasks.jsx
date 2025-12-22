import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';
import Svg, { Circle } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

// Responsive calculations
const horizontalPadding = 20;
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);

// Progress Circle Component
const ProgressCircle = ({ percentage, size = 40 }) => {
  const radius = size / 2 - 4;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={8}
        />
        {/* Progress circle */}
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#8CD7C0"
          strokeWidth={8}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={{ position: 'absolute', width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
        <Text
          style={{
            fontFamily,
            fontSize: 10,
            fontWeight: '400',
            color: '#FFFFFF',
            textAlign: 'center',
          }}
        >
          %{percentage}
        </Text>
      </View>
    </View>
  );
};

// Today's tasks data
const todayTasks = [
  { id: 1, text: 'Günün ayetini oku.', progress: 0 },
  { id: 2, text: 'Bugün en az 20 ayet oku.', progress: 0 },
  { id: 3, text: 'Bugün 100 zikir yap.', progress: 0 },
  { id: 4, text: 'Bugün bir salavat getir.', progress: 0 },
  { id: 5, text: 'Bugün bir namaz vaktini işaretle.', progress: 0 },
  { id: 6, text: 'şuan bu Kelam\'dan bir içerik izle.', progress: 0 },
  { id: 7, text: 'Bugün HocaAl\'ye bir soru sor.', progress: 0 },
];

// Import badge icons
const badgeIcons = {
  kuran: {
    1: require('../../../assets/İstatistikler/kuran1.png'),
    2: require('../../../assets/İstatistikler/kuran2.png'),
    3: require('../../../assets/İstatistikler/kuran3.png'),
    4: require('../../../assets/İstatistikler/kuran4.png'),
    5: require('../../../assets/İstatistikler/kuran5.png'),
    6: require('../../../assets/İstatistikler/kuran6.png'),
    7: require('../../../assets/İstatistikler/kuran7.png'),
  },
  namaz: {
    1: require('../../../assets/İstatistikler/namaz1.png'),
    2: require('../../../assets/İstatistikler/namaz2.png'),
    3: require('../../../assets/İstatistikler/namaz3.png'),
    4: require('../../../assets/İstatistikler/namaz4.png'),
    5: require('../../../assets/İstatistikler/namaz5.png'),
    6: require('../../../assets/İstatistikler/namaz6.png'),
    7: require('../../../assets/İstatistikler/namaz7.png'),
  },
  zksl: {
    1: require('../../../assets/İstatistikler/zksl1.png'),
    2: require('../../../assets/İstatistikler/zksl2.png'),
    3: require('../../../assets/İstatistikler/zksl3.png'),
    4: require('../../../assets/İstatistikler/zksl4.png'),
    5: require('../../../assets/İstatistikler/zksl5.png'),
    6: require('../../../assets/İstatistikler/zksl6.png'),
    7: require('../../../assets/İstatistikler/zksl7.png'),
  },
  ilim: {
    1: require('../../../assets/İstatistikler/ilim1.png'),
    2: require('../../../assets/İstatistikler/ilim2.png'),
    3: require('../../../assets/İstatistikler/ilim3.png'),
    4: require('../../../assets/İstatistikler/ilim4.png'),
    5: require('../../../assets/İstatistikler/ilim5.png'),
    6: require('../../../assets/İstatistikler/ilim6.png'),
    7: require('../../../assets/İstatistikler/ilim7.png'),
  },
  uygulama: {
    1: require('../../../assets/İstatistikler/uygulama1.png'),
    2: require('../../../assets/İstatistikler/uygulama2.png'),
    3: require('../../../assets/İstatistikler/uygulama3.png'),
    4: require('../../../assets/İstatistikler/uygulama4.png'),
    5: require('../../../assets/İstatistikler/uygulama5.png'),
    6: require('../../../assets/İstatistikler/uygulama6.png'),
    7: require('../../../assets/İstatistikler/uygulama7.png'),
  },
};

// Badge tasks data
const badgeTasks = [
  {
    category: 'Kur\'an Görevleri',
    iconKey: 'kuran',
    tasks: [
      { id: 1, text: 'Toplam 50 ayet oku.', label: 'Adım', icon: 1, progress: 5 },
      { id: 2, text: 'Toplam 250 ayet oku.', label: 'Süreç', icon: 2, progress: 5 },
      { id: 3, text: 'Toplam 1.000 ayet oku.', label: 'İlerleme', icon: 3, progress: 5 },
      { id: 4, text: 'Toplam 15 cüz tamamla.', label: 'Cüz', icon: 4, progress: 5 },
      { id: 5, text: '80 farklı sureyi bitir.', label: 'Sure', icon: 5, progress: 5 },
      { id: 6, text: 'Toplam 5.000 ayet oku.', label: 'Nur', icon: 6, progress: 5 },
      { id: 7, text: 'Kur\'ân\'ı baştan sona hatim et.', label: 'Hikmet', icon: 7, progress: 5 },
    ],
  },
  {
    category: 'Namaz Görevleri',
    iconKey: 'namaz',
    tasks: [
      { id: 8, text: 'Bir gün boyunca tüm vakitleri kıl ve işaretle.', label: 'Vakit', icon: 1, progress: 5 },
      { id: 9, text: '7 gün boyunca hiçbir vakti boş bırakma.', label: 'Düzen', icon: 2, progress: 5 },
      { id: 10, text: '30 gün boyunca günlük namazlarını işaretle.', label: 'İstikrar', icon: 3, progress: 5 },
      { id: 11, text: 'Toplam 100 vakit namaz kıl ve işaretle.', label: 'Huzur', icon: 4, progress: 5 },
      { id: 12, text: 'Yıl içinde en az 200 vakit işaretle.', label: 'Sabır', icon: 5, progress: 5 },
      { id: 13, text: 'Toplam 1.000 namaz vakti işaretle.', label: 'Sükûnet', icon: 6, progress: 5 },
      { id: 14, text: 'Toplam 2.500 vakit namaz kıl ve işaretle.', label: 'İhsan', icon: 7, progress: 5 },
    ],
  },
  {
    category: 'Zikir & Salavat Görevleri',
    iconKey: 'zksl',
    tasks: [
      { id: 15, text: 'Toplam 100 zikir veya salavat yap.', label: 'Niyet', icon: 1, progress: 5 },
      { id: 16, text: 'Toplam 500 zikir veya salavat yap.', label: 'Adanış', icon: 2, progress: 5 },
      { id: 17, text: 'Toplam 1.000 zikir veya salavat yap.', label: 'Teskin', icon: 3, progress: 5 },
      { id: 18, text: 'Toplam 5.000 zikir veya salavat yap.', label: 'Sabr', icon: 4, progress: 5 },
      { id: 19, text: 'Toplam 10.000 zikir veya salavat yap.', label: 'Sevda', icon: 5, progress: 5 },
      { id: 20, text: 'Toplam 25.000 zikir veya salavat yap.', label: 'Rahmet', icon: 6, progress: 5 },
      { id: 21, text: 'Toplam 50.000 zikir veya salavat yap.', label: 'Feyz', icon: 7, progress: 5 },
    ],
  },
  {
    category: 'İlim Görevleri',
    iconKey: 'ilim',
    tasks: [
      { id: 22, text: '5 soruyu doğru cevapla.', label: 'Kıvılcım', icon: 1, progress: 5 },
      { id: 23, text: '15 soruyu doğru cevapla.', label: 'Araştırma', icon: 2, progress: 5 },
      { id: 24, text: '30 soruyu doğru cevapla.', label: 'Tahkik', icon: 3, progress: 5 },
      { id: 25, text: '50 soruyu doğru cevapla.', label: 'Marifet', icon: 4, progress: 5 },
      { id: 26, text: '100 soruyu doğru cevapla.', label: 'Hikmet', icon: 5, progress: 5 },
      { id: 27, text: '200 soruyu doğru cevapla.', label: 'İdrak', icon: 6, progress: 5 },
      { id: 28, text: '500 soruyu doğru cevapla.', label: 'İrfan', icon: 7, progress: 5 },
    ],
  },
  {
    category: 'Uygulama Görevleri',
    iconKey: 'uygulama',
    tasks: [
      { id: 29, text: 'Kelam\'daki bir içeriği ilk kez paylaş.', label: 'Davet', icon: 1, progress: 5 },
      { id: 30, text: 'Toplam 10 içerik paylaş.', label: 'Tebliğ', icon: 2, progress: 5 },
      { id: 31, text: 'Takva\'nın resmi sosyal medya hesaplarını takip et', label: 'Destek', icon: 3, progress: 5 },
      { id: 32, text: '10 içerik üreticisini takip et.', label: 'Cemiyet', icon: 4, progress: 5 },
      { id: 33, text: '3 gün üst üste uygulamaya giriş yap.', label: 'Süreklilik', icon: 5, progress: 5 },
      { id: 34, text: '30 gün boyunca düzenli giriş yap.', label: 'Sadakat', icon: 6, progress: 5 },
      { id: 35, text: 'Uygulamaya mağazada puan ver / yorum yap.', label: 'Minnet', icon: 7, progress: 5 },
    ],
  },
];

export default function TasksScreen() {
  const router = useRouter();

  return (
    <ScreenBackground>
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-2 pb-2">
          <View className="w-9" />
          <Text
            style={{
              fontFamily: 'Cinzel-Black',
              color: '#FFFFFF',
              fontSize: 24,
              textAlign: 'center',
              letterSpacing: -2,
            }}
          >
            GÖREVLER
          </Text>
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
          {/* Bugünün Görevleri Section */}
          <View style={{ marginBottom: 40 }}>
            <Text
              style={{
                fontFamily,
                fontSize: 20,
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: 8,
                textAlign: 'center',
              }}
            >
              Bugünün Görevleri
            </Text>
            <Text
              style={{
                fontFamily,
                fontSize: 10,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: 24,
                lineHeight: 14,
                textAlign: 'center',
              }}
            >
              Bugüne özel küçük görevleri tamamlayarak istikrarını artır.
            </Text>

            {/* Today's Tasks */}
            {todayTasks.map((task) => (
              <View
                key={task.id}
                style={{
                  width: contentWidth,
                  height: 62,
                  borderRadius: 20,
                  borderWidth: 0.5,
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                  marginBottom: 12,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                {/* Task Text */}
                <View style={{ flex: 1, marginRight: 12 }}>
                  <Text
                    style={{
                      fontFamily,
                      fontSize: 16,
                      fontWeight: '300',
                      color: '#FFFFFF',
                    }}
                    numberOfLines={2}
                  >
                    {task.text}
                  </Text>
                </View>

                {/* Progress Circle */}
                <ProgressCircle percentage={task.progress} size={40} />
              </View>
            ))}
          </View>

          {/* Rozet Görevleri Section */}
          <View style={{ marginBottom: 40 }}>
            <Text
              style={{
                fontFamily,
                fontSize: 20,
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: 8,
                textAlign: 'center',
              }}
            >
              Rozet Görevleri
            </Text>
            <Text
              style={{
                fontFamily,
                fontSize: 10,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: 24,
                lineHeight: 14,
                textAlign: 'center',
              }}
            >
              Uzun vadeli hedefleri tamamlayarak rozetler kazan.
            </Text>

            {/* Badge Task Categories */}
            {badgeTasks.map((category, categoryIndex) => (
              <View key={categoryIndex} style={{ marginBottom: 32 }}>
                {/* Category Title - Left Aligned */}
                <Text
                  style={{
                    fontFamily,
                    fontSize: 16,
                    fontWeight: '700',
                    color: '#FFFFFF',
                    marginBottom: 16,
                    textAlign: 'left',
                  }}
                >
                  {category.category}
                </Text>

                {/* Tasks in Category */}
                {category.tasks.map((task) => (
                  <View
                    key={task.id}
                    style={{
                      width: contentWidth,
                      height: 62,
                      borderRadius: 20,
                      borderWidth: 0.5,
                      borderColor: 'rgba(255, 255, 255, 0.5)',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      paddingHorizontal: 16,
                      paddingVertical: 12,
                      marginBottom: 12,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    {/* Left Side: Badge Icon and Task Text */}
                    <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginRight: 12 }}>
                      {/* Badge Icon - No container, just the icon */}
                      <Image
                        source={badgeIcons[category.iconKey][task.icon]}
                        style={{ width: 40, height: 40, marginRight: 12 }}
                        resizeMode="contain"
                      />

                      {/* Task Text and Label */}
                      <View style={{ flex: 1 }}>
                        <Text
                          style={{
                            fontFamily,
                            fontSize: 16,
                            fontWeight: '300',
                            color: '#FFFFFF',
                            marginBottom: 4,
                          }}
                          numberOfLines={2}
                        >
                          {task.text}
                        </Text>
                        <Text
                          style={{
                            fontFamily,
                            fontSize: 12,
                            fontWeight: '300',
                            color: 'rgba(255, 255, 255, 0.8)',
                          }}
                        >
                          {task.label}
                        </Text>
                      </View>
                    </View>

                    {/* Right Side: Progress Circle */}
                    <ProgressCircle percentage={task.progress} size={40} />
                  </View>
                ))}
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}
