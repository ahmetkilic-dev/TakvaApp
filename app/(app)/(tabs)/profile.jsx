import { View, Text, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity, Alert, RefreshControl } from 'react-native';
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
import ManeviGelisimCard from '../../../components/profile/ManeviGelisimCard';
import PremiumBanner from '../../../components/profile/PremiumBanner';
import CreatorPostsSection from '../../../components/profile/CreatorPostsSection';
import { KelamService } from '../../../services/KelamService';
import { R2UploadService } from '../../../services/R2UploadService';
import { supabase } from '../../../lib/supabase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect, useCallback } from 'react';
import { useScrollJumpFix } from '../../../utils/scrollOptimization';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const horizontalPadding = 20;

export default function ProfilScreen() {
  const router = useRouter();
  const { user, loading, profileData, refreshProfile } = useProfile();
  const [creatorVideos, setCreatorVideos] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const scrollViewRef = useScrollJumpFix();

  // ---------------- GESTURE LOGIC REMOVED ----------------

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

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Hem profil verilerini (rozetler, takipçi vs.) hem de videoları yenile
      await Promise.all([
        refreshProfile(true), // Silent refresh (No full screen loader)
        loadCreatorVideos()
      ]);
    } catch (error) {
      console.error('Profile refresh error:', error);
    } finally {
      setRefreshing(false);
    }
  }, [refreshProfile, loadCreatorVideos]);

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

      // Clear cache to ensure fresh fetch
      await AsyncStorage.removeItem('@user_stats_cache');

      // Update Context (Wait for it)
      await refreshProfile();

      Alert.alert('Başarılı', 'Profil fotoğrafınız güncellendi!');

    } catch (error) {
      console.error('Profile picture upload error:', error);
      Alert.alert('Hata', 'Profil fotoğrafı yüklenirken bir sorun oluştu.');
    }
  };



  const handleScrollEndDrag = (e) => {
    const offsetY = e.nativeEvent.contentOffset.y;
    // Trigger refresh if pulled down significantly
    if (offsetY < -80 && !refreshing) {
      onRefresh();
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
        {/* Header */}
        <View className="flex-row items-center justify-between px-4 pt-2 pb-2" style={{ zIndex: 20 }}>
          <View className="w-9" />
          <Text style={{ fontFamily: 'Cinzel-Black', color: '#FFFFFF', fontSize: 24, textAlign: 'center', letterSpacing: -2 }}>
            PROFİL
          </Text>
          <TouchableOpacity
            onPress={() => router.push('/(app)/(services)/ayarlar')}
            className="w-9 h-9 items-center justify-center"
          >
            <Ionicons name="menu" size={28} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Custom Overlay Spinner - Bounce Refresh */}
        {refreshing && (
          <View style={{ position: 'absolute', top: 100, left: 0, right: 0, zIndex: 10, alignItems: 'center' }}>
            <ActivityIndicator size="small" color="#D4AF37" />
          </View>
        )}

        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          removeClippedSubviews={true}
          maxToRenderPerBatch={2}
          windowSize={5}
          scrollEventThrottle={16}
          onScrollEndDrag={handleScrollEndDrag}
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 20 }}
        >

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
            isPlus={profileData.isPlus}
            following={profileData.following}
          />

          {(profileData.role === 'creator' || profileData.applicationStatus === 'approved') && (
            <>
              <CreatorPostsSection
                posts={creatorVideos}
                isOwner={true}
                onRefresh={loadCreatorVideos}
                onPostPress={(video, index) => {
                  const targetId = profileData?.id || user?.uid;
                  console.log('[Profile] Navigating to feed. ID:', targetId, 'Video:', video.id);
                  if (!targetId) {
                    Alert.alert('Hata', 'Kullanıcı kimliği bulunamadı.');
                    return;
                  }
                  router.push({
                    pathname: '/(app)/(services)/creator-feed',
                    params: { id: targetId, initialVideoId: video.id }
                  });
                }}
              />
              <View style={{ height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: 24 }} />
            </>
          )}

          <BadgeProgressSection
            badgeCount={profileData.badgeCount}
            categoryLevels={profileData.categoryLevels}
            userTier={profileData.premiumState}
          />

          <ManeviGelisimCard />

          <PremiumBanner
            isPremium={profileData.isPremium}
            isPlus={profileData.isPlus}
            onPress={() => router.push('/(app)/(services)/premium')}
          />
        </ScrollView>
      </SafeAreaView>
    </ScreenBackground>
  );
}