import { View, Text, ScrollView, Dimensions, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebaseConfig';

// Common Components
import ScreenBackground from '../../../components/common/ScreenBackground';

// Profile Components
import { useProfile } from '../../../components/profile/hooks/useProfile';
import ProfileHeader from '../../../components/profile/ProfileHeader';
import QuickStatsRow from '../../../components/profile/QuickStatsRow';
import BadgeProgressSection from '../../../components/profile/BadgeProgressSection';
import PersonalStatsGrid from '../../../components/profile/PersonalStatsGrid';
import PremiumBanner from '../../../components/profile/PremiumBanner';
import AccountSettings from '../../../components/profile/AccountSettings';
import LogoutButton from '../../../components/profile/LogoutButton';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const horizontalPadding = 20;

export default function ProfilScreen() {
  const router = useRouter();
  const { user, loading, profileData } = useProfile();

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

  const onNavigate = (route) => {
    if (route) router.push(route);
  };

  if (loading) {
    return (
      <ScreenBackground>
        <SafeAreaView className="flex-1 justify-center items-center">
          <ActivityIndicator color="white" size="large" />
        </SafeAreaView>
      </ScreenBackground>
    );
  }

  return (
    <ScreenBackground>
      <SafeAreaView edges={['top']} className="flex-1">
        {/* Header - Styled to match original Tasks UI / Profil UI Header Title */}
        <View className="flex-row items-center justify-between px-4 pt-2 pb-2">
          <View className="w-9" />
          <Text style={{ fontFamily: 'Cinzel-Black', color: '#FFFFFF', fontSize: 24, textAlign: 'center', letterSpacing: -2 }}>
            PROFİL
          </Text>
          <View className="w-9" />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: horizontalPadding, paddingTop: 24, paddingBottom: 0 }}
        >
          <ProfileHeader
            name={profileData.name || user?.displayName || "Misafir Kullanıcı"}
            email={user?.email || "Giriş yapılmadı"}
            photoURL={user?.photoURL}
            onEditPress={() => { }}
          />

          <QuickStatsRow
            followingCount={profileData.followingCount}
            badgeCount={profileData.badgeCount}
            isPremium={profileData.isPremium}
            following={profileData.following}
          />

          <BadgeProgressSection
            badgeCount={profileData.badgeCount}
            categoryLevels={profileData.categoryLevels}
          />

          <PersonalStatsGrid
            stats={profileData.stats}
          />

          <PremiumBanner
            isPremium={profileData.isPremium}
            onPress={() => onNavigate('/(app)/(services)/premium')}
          />

          <AccountSettings
            onNavigate={onNavigate}
          />

          <LogoutButton
            onLogout={handleLogout}
          />
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}