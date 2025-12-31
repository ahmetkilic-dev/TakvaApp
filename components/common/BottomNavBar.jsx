import React, { useMemo, useCallback } from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions } from 'react-native';
import { useRouter, useSegments } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

import IcHome from '../../assets/images/ic-home.svg';
import IcNamaz from '../../assets/images/ic-namaz.svg';
import IcKelam from '../../assets/images/ic-kelam.svg';
import IcTasks from '../../assets/images/ic-tasks.svg';
import IcProfile from '../../assets/images/ic-profile.svg';

const ICON_SIZE = 36;
const { width: SCREEN_WIDTH } = Dimensions.get('window');
// iPhone 11 ekran genişliği: 414px
// Orta seviye aralık için hesaplama
const ITEM_MARGIN = Math.max(14, Math.min(20, (SCREEN_WIDTH - 190) / 9));

function getActiveTabFromSegments(segments) {
  // segments örn:
  // - ['(app)','(tabs)','home']
  // - ['(app)','(services)','hadith']
  if (segments?.[1] === '(tabs)') return segments?.[2];
  return 'home'; // services ekranlarında default: home
}

const BottomNavBar = React.memo(({ activeTab }) => {
  const router = useRouter();
  const segments = useSegments();
  const insets = useSafeAreaInsets();

  const resolvedActive = activeTab || getActiveTabFromSegments(segments);

  const items = useMemo(() => [
    { key: 'kelam', Icon: IcKelam, to: '/(app)/(tabs)/kelam' },
    { key: 'namaz', Icon: IcNamaz, to: '/(app)/(tabs)/namaz' },
    { key: 'home', Icon: IcHome, to: '/(app)/(tabs)/home' },
    { key: 'tasks', Icon: IcTasks, to: '/(app)/(tabs)/tasks' },
    { key: 'profile', Icon: IcProfile, to: '/(app)/(tabs)/profile' },
  ], []);

  const handlePress = useCallback((to) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.replace(to);
  }, [router]);

  const isKelam = resolvedActive === 'kelam';
  const navBackgroundColor = isKelam ? '#101E1A' : '#182723';

  return (
    <View style={[styles.container, { height: 50 + insets.bottom, paddingBottom: insets.bottom, backgroundColor: navBackgroundColor }]} pointerEvents="auto">
      {items.map(({ key, Icon, to }) => {
        const focused = resolvedActive === key;
        return (
          <TouchableOpacity
            key={key}
            activeOpacity={0.8}
            onPress={() => handlePress(to)}
            style={styles.item}
          >
            <View style={[styles.iconWrap, { opacity: focused ? 1 : 0.5 }]}>
              <Icon width={ICON_SIZE} height={ICON_SIZE} />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
});

export default BottomNavBar;

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
    backgroundColor: '#182723',
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(217, 217, 217, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    marginHorizontal: ITEM_MARGIN,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrap: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
});


