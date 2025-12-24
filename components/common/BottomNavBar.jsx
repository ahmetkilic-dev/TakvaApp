import React from 'react';
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useRouter, useSegments } from 'expo-router';

import IcHome from '../../assets/images/ic-home.svg';
import IcNamaz from '../../assets/images/ic-namaz.svg';
import IcKelam from '../../assets/images/ic-kelam.svg';
import IcTasks from '../../assets/images/ic-tasks.svg';
import IcProfile from '../../assets/images/ic-profile.svg';

const TAB_BAR_HEIGHT = 50 + (Platform.OS === 'ios' ? 30 : 0);
const ICON_SIZE = 36;

function getActiveTabFromSegments(segments) {
  // segments örn:
  // - ['(app)','(tabs)','home']
  // - ['(app)','(services)','hadith']
  if (segments?.[1] === '(tabs)') return segments?.[2];
  return 'home'; // services ekranlarında default: home
}

export default function BottomNavBar({ activeTab }) {
  const router = useRouter();
  const segments = useSegments();

  const resolvedActive = activeTab || getActiveTabFromSegments(segments);

  const items = [
    { key: 'kelam', Icon: IcKelam, to: '/(app)/(tabs)/kelam' },
    { key: 'namaz', Icon: IcNamaz, to: '/(app)/(tabs)/namaz' },
    { key: 'home', Icon: IcHome, to: '/(app)/(tabs)/home' },
    { key: 'tasks', Icon: IcTasks, to: '/(app)/(tabs)/tasks' },
    { key: 'profile', Icon: IcProfile, to: '/(app)/(tabs)/profile' },
  ];

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <View style={styles.container} pointerEvents="auto">
        {items.map(({ key, Icon, to }) => {
          const focused = resolvedActive === key;
          return (
            <TouchableOpacity
              key={key}
              activeOpacity={0.8}
              onPress={() => router.replace(to)}
              style={styles.item}
            >
              <View style={[styles.iconWrap, { opacity: focused ? 1 : 0.5 }]}>
                <Icon width={ICON_SIZE} height={ICON_SIZE} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: TAB_BAR_HEIGHT,
    paddingBottom: Platform.OS === 'ios' ? 30 : 0,
    paddingTop: 15,
    backgroundColor: '#182723',
    borderTopWidth: 0.5,
    borderTopColor: 'rgba(217, 217, 217, 0.5)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    marginHorizontal: 25,
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


