import { View, Text, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Common Components
import ScreenBackground from '../../../components/common/ScreenBackground';

// Profile Components
import { useProfile } from '../../../components/profile/hooks/useProfile';
import ProfileHeader from '../../../components/profile/ProfileHeader';
import QuickStatsRow from '../../../components/profile/QuickStatsRow';
import BadgeProgressSection from '../../../components/profile/BadgeProgressSection';
import PersonalStatsGrid from '../../../components/profile/PersonalStatsGrid';
import PremiumBanner from '../../../components/profile/PremiumBanner';
import CreatorPostsSection from '../../../components/profile/CreatorPostsSection';
import { KelamService } from '../../../services/KelamService';
import React, { useState, useEffect, useCallback } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const horizontalPadding = 20;

export default function ProfilScreen() {
  const router = useRouter();
  const { user, loading, profileData } = useProfile();
  const [creatorVideos, setCreatorVideos] = useState([]);

  const loadCreatorVideos = useCallback(async () => {
    const creatorId = profileData?.id || user?.uid;
    const isCreator = profileData && (profileData.role === 'creator' || profileData.applicationStatus === 'approved');

    if (creatorId && isCreator) {
      try {
        const data = await KelamService.fetchCreatorVideos(creatorId);
        setCreatorVideos(data);
      } catch (error) {
        console.error('Profile: loadCreatorVideos error', error);
      }
    }
  }, [profileData?.id, profileData?.role, profileData?.applicationStatus, user?.uid]);

  useEffect(() => {
    loadCreatorVideos();
  }, [loadCreatorVideos]);

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
          <TouchableOpacity
            onPress={() => router.push('/(app)/(services)/ayarlar')}
            className="w-9 h-9 items-center justify-center"
          >
            <Ionicons name="ellipsis-horizontal" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          bounces={false}
          overScrollMode="never"
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 40 }}
        >
          <ProfileHeader
            name={profileData.name || user?.displayName || "Misafir Kullanıcı"}
            email={user?.email || "Giriş yapılmadı"}
            photoURL={user?.photoURL}
            onEditPress={() => { }}
            role={profileData.role}
            followerCount={profileData.followerCount}
            postCount={profileData.postCount}
            applicationStatus={profileData.applicationStatus}
          />

          <QuickStatsRow
            followingCount={profileData.followingCount}
            badgeCount={profileData.badgeCount}
            isPremium={profileData.isPremium}
            following={profileData.following}
          />

          {(profileData.role === 'creator' || profileData.applicationStatus === 'approved') && (
            <>
              <CreatorPostsSection
                posts={creatorVideos}
                isOwner={true}
                onRefresh={loadCreatorVideos}
              />
              <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: 24 }} />
            </>
          )}

          <BadgeProgressSection
            badgeCount={profileData.badgeCount}
            categoryLevels={profileData.categoryLevels}
          />

          <PersonalStatsGrid
            stats={profileData.stats}
          />

          <PremiumBanner
            isPremium={profileData.isPremium}
            onPress={() => router.push('/(app)/(services)/premium')}
          />
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}