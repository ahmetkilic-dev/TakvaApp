import { View, Text, ScrollView, TouchableOpacity, Dimensions, Platform, Image, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';
import { LinearGradient } from 'expo-linear-gradient';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

// Responsive calculations
const horizontalPadding = 20;
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);

// Badge icons
const badgeIcons = [
  require('../../../assets/İstatistikler/kuran1.png'),
  require('../../../assets/İstatistikler/namaz1.png'),
  require('../../../assets/İstatistikler/zksl1.png'),
  require('../../../assets/İstatistikler/ilim1.png'),
  require('../../../assets/İstatistikler/uygulama1.png'),
];

// Statistics data
const statistics = [
  { id: 1, title: 'Toplam okunan ayet', value: '12.380', icon: 'book' },
  { id: 2, title: 'Toplam salavat', value: '1.250', icon: 'beads' },
  { id: 3, title: 'Toplam zikir sayısı', value: '4.820', icon: 'dhikr' },
  { id: 4, title: 'Toplam kılınan namaz', value: '620', icon: 'prayer' },
  { id: 5, title: 'İlim doğru cevap', value: '84', icon: 'knowledge' },
  { id: 6, title: 'Tamamlanan görevler', value: '17', icon: 'tasks' },
];

export default function ProfilScreen() {
  const router = useRouter();

  const handleLogout = () => {
    Alert.alert(
      "Çıkış Yap",
      "Hesabınızdan çıkış yapmak istediğinizden emin misiniz?",
      [
        { text: "İptal", style: "cancel" },
        { 
          text: "Çıkış Yap", 
          style: "destructive",
          onPress: async () => {
            try {
              await signOut(auth);
              router.replace('/(auth)/login');
            } catch (error) {
              Alert.alert("Hata", "Çıkış yapılırken bir hata oluştu.");
            }
          }
        }
      ]
    );
  };

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
            PROFİL
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
          {/* Profile Section */}
          <View style={{ flexDirection: 'row', marginBottom: 24 }}>
            {/* Avatar */}
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 40,
                borderWidth: 1,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: '#14201D',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 12,
              }}
            >
              <Ionicons name="person" size={40} color="#FFFFFF" />
            </View>

            {/* User Info */}
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily,
                  fontSize: 20,
                  fontWeight: '700',
                  color: '#FFFFFF',
                  marginBottom: 4,
                }}
              >
                Ahmet Kılıç
              </Text>
              <Text
                style={{
                  fontFamily,
                  fontSize: 12,
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.8)',
                  marginBottom: 8,
                }}
              >
                info@wezyapps.com
              </Text>
              <TouchableOpacity
                style={{
                  width: 73,
                  height: 20,
                  borderRadius: 27,
                  borderWidth: 0.5,
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  backgroundColor: 'rgba(24, 39, 35, 0.8)',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily,
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#FFFFFF',
                  }}
                >
                  Düzenle
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Stats Row */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom: 16,
              paddingVertical: 16,
              borderTopWidth: 0.5,
              borderBottomWidth: 0.5,
              borderColor: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontFamily,
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#FFFFFF',
                  marginBottom: 4,
                }}
              >
                12
              </Text>
              <Text
                style={{
                  fontFamily,
                  fontSize: 13,
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textAlign: 'center',
                }}
              >
                Takip ettiklerim
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontFamily,
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#FFFFFF',
                  marginBottom: 4,
                }}
              >
                12
              </Text>
              <Text
                style={{
                  fontFamily,
                  fontSize: 13,
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textAlign: 'center',
                }}
              >
                Rozetlerim
              </Text>
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text
                style={{
                  fontFamily,
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#FFFFFF',
                  marginBottom: 4,
                }}
              >
                Aktif değil
              </Text>
              <Text
                style={{
                  fontFamily,
                  fontSize: 13,
                  fontWeight: '400',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textAlign: 'center',
                }}
              >
                Premium
              </Text>
            </View>
          </View>

          {/* Badge Icons Row - Inside Box */}
          <View style={{ width: '100%', alignItems: 'center', marginBottom: 12 }}>
            <View
              style={{
                width: Math.min(contentWidth, 350),
                height: 50,
                borderRadius: 10,
                backgroundColor: 'rgba(24, 39, 35, 0.8)',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 5,
              }}
            >
            {badgeIcons.map((icon, index) => (
              <Image
                key={index}
                source={icon}
                style={{ width: 32, height: 32 }}
                resizeMode="contain"
              />
            ))}
            </View>
          </View>

          {/* Progress Bar */}
          <View
            style={{
              width: Math.min(contentWidth, 346),
              height: 17,
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: 'rgba(255, 255, 255, 0.5)',
              backgroundColor: '#E2E2E2',
              overflow: 'hidden',
              marginBottom: 32,
            }}
          >
            <LinearGradient
              colors={['#2B3C37', '#172521']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                width: '62%',
                height: '100%',
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily,
                  fontSize: 10,
                  fontWeight: '600',
                  color: '#FFFFFF',
                }}
              >
                %62
              </Text>
            </LinearGradient>
          </View>

          {/* Personal Statistics Section */}
          <View style={{ marginBottom: 32 }}>
            <Text
              style={{
                fontFamily,
                fontSize: 20,
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: 8,
              }}
            >
              Kişisel İstatistiklerin
            </Text>
            <Text
              style={{
                fontFamily,
                fontSize: 10,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.6)',
                marginBottom: 24,
                lineHeight: 13,
              }}
            >
              Bugüne kadar uygulamada yaptığın tüm ilerlemelerin.
            </Text>

            {/* Statistics Grid */}
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                gap: 12,
              }}
            >
              {statistics.map((stat) => (
                <LinearGradient
                  key={stat.id}
                  colors={['#182723', '#0A3727']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={{
                    width: (contentWidth - 12) / 2,
                    height: 50,
                    borderRadius: 10,
                    borderWidth: 0.5,
                    borderColor: 'rgba(216, 196, 158, 0.5)',
                    padding: 16,
                    position: 'relative',
                    overflow: 'hidden',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      fontFamily,
                      fontSize: 12,
                      fontWeight: '400',
                      color: '#D8C49E',
                      marginBottom: 4,
                      letterSpacing: 0.24,
                      textAlign: 'center',
                    }}
                  >
                    {stat.title}
                  </Text>
                  <Text
                    style={{
                      fontFamily,
                      fontSize: 14,
                      fontWeight: '700',
                      color: '#D8C49E',
                      letterSpacing: 0.28,
                      textAlign: 'center',
                    }}
                  >
                    {stat.value}
                  </Text>
                </LinearGradient>
              ))}
            </View>
          </View>

          {/* Premium Banner */}
          <TouchableOpacity
            onPress={() => router.push('/(app)/(services)/premium')}
            style={{
              width: '100%',
              height: 55,
              borderRadius: 10,
              borderWidth: 0.5,
              borderColor: 'rgba(207, 155, 71, 0.5)',
              overflow: 'hidden',
              marginBottom: 32,
            }}
          >
            <LinearGradient
              colors={['#0A2345', '#0C2F3B', '#0E3537', '#0F3B32']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{
                flex: 1,
                padding: 16,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Ionicons name="star" size={24} color="#CF9B47" style={{ marginRight: 12 }} />
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontFamily: 'Cinzel',
                    fontSize: 20,
                    fontWeight: '700',
                    color: '#CF9B47',
                    marginBottom: 4,
                  }}
                >
                  TAKVA PREMİUM
                </Text>
                <Text
                  style={{
                    fontFamily,
                    fontSize: 10,
                    fontWeight: '500',
                    color: 'rgba(255, 255, 255, 0.8)',
                    letterSpacing: -0.2,
                  }}
                >
                  Daha fazla özellik ve reklamsız deneyim için Premium'u keşfet.
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#CF9B47" />
            </LinearGradient>
          </TouchableOpacity>

          {/* Account Settings */}
          <View style={{ marginBottom: 32 }}>
            <Text
              style={{
                fontFamily,
                fontSize: 20,
                fontWeight: '700',
                color: '#FFFFFF',
                marginBottom: 16,
              }}
            >
              Hesap Ayarları
            </Text>
            <View
              style={{
                width: '100%',
                borderRadius: 15,
                borderWidth: 0.5,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                backgroundColor: 'rgba(24, 39, 35, 0.5)',
                overflow: 'hidden',
              }}
            >
              <TouchableOpacity
                onPress={() => router.push('/(app)/(services)/hesap')}
                style={{
                  width: '100%',
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    fontFamily,
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#FFFFFF',
                    letterSpacing: 0.32,
                  }}
                >
                  Hesap
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <View
                style={{
                  width: '100%',
                  height: 0.5,
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  marginLeft: 16,
                }}
              />
              <TouchableOpacity
                onPress={() => router.push('/(app)/(services)/bildirimler')}
                style={{
                  width: '100%',
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    fontFamily,
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#FFFFFF',
                    letterSpacing: 0.32,
                  }}
                >
                  Bildirimler
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
              </TouchableOpacity>
              <View
                style={{
                  width: '100%',
                  height: 0.5,
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  marginLeft: 16,
                }}
              />
              <TouchableOpacity
                onPress={() => router.push('/(app)/(services)/hakkinda')}
                style={{
                  width: '100%',
                  paddingVertical: 16,
                  paddingHorizontal: 16,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <Text
                  style={{
                    fontFamily,
                    fontSize: 16,
                    fontWeight: '500',
                    color: '#FFFFFF',
                    letterSpacing: 0.32,
                  }}
                >
                  Hakkında
                </Text>
                <Ionicons name="chevron-forward" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Logout Button */}
          <View style={{ width: '100%', alignItems: 'center', marginBottom: 32 }}>
            <TouchableOpacity
              onPress={handleLogout}
              style={{
                width: 119,
                height: 30,
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#FFFFFF',
                backgroundColor: '#FFFFFF',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                style={{
                  fontFamily,
                  fontSize: 14,
                  fontWeight: '500',
                  color: '#E74C3C',
                  letterSpacing: 0.28,
                }}
              >
                Çıkış yap
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}
