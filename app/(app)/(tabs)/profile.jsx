import { View, Text, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

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
import { R2UploadService } from '../../../services/R2UploadService';
import { supabase } from '../../../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback } from 'react';
import { useScrollJumpFix, optimizedScrollProps } from '../../../utils/scrollOptimization';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const horizontalPadding = 20;

export default function ProfilScreen() {
  const router = useRouter();
  const { user, loading, profileData } = useProfile();
  const [creatorVideos, setCreatorVideos] = useState([]);
  const scrollViewRef = useScrollJumpFix();

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

  const handleProfilePictureUpload = async () => {
    try {
      // Request permission
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('İzin Gerekli', 'Fotoğraf seçmek için galeri izni gerekiyor.');
        return;
      }

      // Pick image
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (result.canceled) return;

      const imageUri = result.assets[0].uri;

      // Upload to R2
      const fileName = `profile_${user?.uid || profileData?.id}_${Date.now()}.jpg`;
      const imageUrl = await R2UploadService.uploadFile(imageUri, fileName, 'image/jpeg');

      // Update Supabase
      const userId = profileData?.id || user?.uid;
      console.log('[ProfileUpload] Updating Supabase for user:', userId);
      console.log('[ProfileUpload] Image URL:', imageUrl);

      const { data, error } = await supabase
        .from('profiles')
        .update({ profile_picture: imageUrl })
        .eq('id', userId)
        .select();

      console.log('[ProfileUpload] Supabase response:', { data, error });

      if (error) throw error;

      Alert.alert('Başarılı', 'Profil fotoğrafınız güncellendi!');

      // Clear cache and force reload
      await AsyncStorage.removeItem('@user_stats_cache');
      router.replace('/(app)/(tabs)/profile');
    } catch (error) {
      console.error('Profile picture upload error:', error);
      Alert.alert('Hata', 'Profil fotoğrafı yüklenirken bir sorun oluştu.');
    }
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
          <TouchableOpacity
            onPress={() => router.push('/(app)/(services)/ayarlar')}
            className="w-9 h-9 items-center justify-center"
          >
            <Ionicons name="ellipsis-horizontal" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={2}
          windowSize={5}
          scrollEventThrottle={16}
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 20 }}
        >
          {console.log('[Profile] ===== DEBUG START =====')}
          {console.log('[Profile] user?.uid:', user?.uid)}
          {console.log('[Profile] profileData:', JSON.stringify(profileData, null, 2))}
          {console.log('[Profile] profile_picture:', profileData.profile_picture)}
          {console.log('[Profile] ===== DEBUG END =====')}
          <ProfileHeader
            name={profileData.name || user?.displayName || "Misafir Kullanıcı"}
            email={user?.email || "Giriş yapılmadı"}
            photoURL={profileData.profile_picture || user?.photoURL}
            onEditPress={handleProfilePictureUpload}
            role={profileData.role}
            followerCount={profileData.followerCount}
            postCount={profileData.postCount}
            applicationStatus={profileData.applicationStatus}
            bio={profileData.bio}
            socialLinks={profileData.social_links}
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
                onPostPress={(video, index) => {
                  router.push({
                    pathname: '/(app)/(services)/creator-feed',
                    params: { id: profileData.id, initialVideoId: video.id }
                  });
                }}
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