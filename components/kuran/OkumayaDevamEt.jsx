import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Dimensions } from 'react-native';
import { useUserStats } from '../../contexts/UserStatsContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const horizontalPadding = Math.max(20, SCREEN_WIDTH * 0.05);
const fontFamily = 'Plus Jakarta Sans';

export default function OkumayaDevamEt() {
  const router = useRouter();
  const { stats, loading, isPlusOrAbove, isPremium } = useUserStats();

  const getDisplayInfo = () => {
    if (loading) {
      return { number: 1, name: '1. Sayfa', progress: 0 };
    }

    const lastPage = stats.last_read_page || 1;
    const totalRead = stats.total_pages_read || 0;
    const progressPercent = (totalRead / 604) * 100;

    return {
      number: lastPage,
      name: `${lastPage}. Sayfa`,
      progress: progressPercent,
    };
  };

  const displayInfo = getDisplayInfo();

  const handleContinue = () => {
    // Her zaman page olarak yönlendir
    router.push({
      pathname: '/(app)/(services)/quran-page',
      params: {
        type: 'page',
        number: displayInfo.number.toString(),
      },
    });
  };

  return (
    <View style={{ paddingHorizontal: horizontalPadding, marginBottom: 24 }}>
      <Text
        style={{
          fontFamily,
          fontSize: 15,
          fontWeight: '700',
          color: '#FFFFFF',
          marginBottom: 12,
        }}
      >
        Okumaya Devam Et
      </Text>

      {/* Continue Card */}
      <View
        style={{
          width: '100%',
          height: 136,
          borderRadius: 20,
          borderWidth: 0.5,
          borderColor: 'rgba(255, 255, 255, 0.5)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          flexDirection: 'row',
          overflow: 'hidden',
        }}
      >
        {/* Left Side - Text Content */}
        <View style={{ flex: 1, padding: 16, justifyContent: 'space-between' }}>
          <View>
            <Text
              style={{
                fontFamily,
                fontSize: 20,
                fontWeight: '400',
                color: '#FFFFFF',
                marginBottom: 4,
              }}
            >
              {isPlusOrAbove() ? displayInfo.name : 'Kuran-ı Kerim'}
            </Text>
          </View>

          <TouchableOpacity
            onPress={handleContinue}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 8 }}
          >
            <Text
              style={{
                fontFamily,
                fontSize: 14,
                fontWeight: '400',
                color: '#FFFFFF',
              }}
            >
              {isPlusOrAbove() ? 'Devam et' : 'Kuran Oku'}
            </Text>
            <Image
              source={require('../../assets/images/arrow.png')}
              style={{ width: 14, height: 14, tintColor: '#FFFFFF' }}
              contentFit="contain"
            />
          </TouchableOpacity>

          {/* Progress Bar - Only for Premium */}
          {isPremium() && (
            <View
              style={{
                width: '100%',
                height: 16,
                borderRadius: 10,
                backgroundColor: '#7C8381',
                borderWidth: 0.5,
                borderColor: 'rgba(255, 255, 255, 0.5)',
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  width: `${Math.min(100, Math.max(0, displayInfo.progress))}%`,
                  height: '100%',
                  backgroundColor: '#8CD7C0',
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
                  %{Math.round(displayInfo.progress)}
                </Text>
              </View>
            </View>
          )}
        </View>

        {/* Right Side - Image */}
        <View style={{ width: 162, height: 108, marginRight: 16, marginTop: 14, marginBottom: 14 }}>
          <Image
            source={require('../../assets/images/quran-cta.png')}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 8,
              borderWidth: 0.5,
              borderColor: 'rgba(255, 255, 255, 0.5)',
            }}
            contentFit="cover"
            transition={300}
          />
        </View>
      </View>
    </View>
  );
}
