import React, { useEffect, useRef } from 'react';
import { Tabs } from 'expo-router';
import { View, Platform, Animated } from 'react-native';
import * as Haptics from 'expo-haptics';

// SVG İkonları import ediyoruz (Component olarak)
import IcHome from '../../../assets/images/ic-home.svg';
import IcNamaz from '../../../assets/images/ic-namaz.svg';
import IcKelam from '../../../assets/images/ic-kelam.svg';
import IcTasks from '../../../assets/images/ic-tasks.svg';
import IcProfile from '../../../assets/images/ic-profile.svg';

// Tab İkon Bileşeni - SVG Component kullanıyor
const TabIcon = ({ SvgIcon, focused, size = 36 }) => {
  const opacityAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: focused ? 1 : 0.5,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  return (
    <View
      style={{
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        // Drop shadow: x0 y2 blur10 spread0 #ffffff 25%
        shadowColor: '#FFFFFF',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
      }}
    >
      <Animated.View
        style={{
          opacity: opacityAnim,
        }}
      >
        <SvgIcon width={size} height={size} />
      </Animated.View>
    </View>
  );
};

export default function TabsLayout() {
  return (
    <Tabs
      initialRouteName="home"
      screenListeners={{
        tabPress: () => {
          // Tab'a tıklandığında hafif titreşim
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        },
      }}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#182723',
          borderTopColor: 'rgba(217, 217, 217, 0.5)',
          borderTopWidth: 0.5,
          height: 50 + (Platform.OS === 'ios' ? 30 : 0),
          paddingBottom: Platform.OS === 'ios' ? 30 : 0,
          paddingTop: 15,
          alignItems: 'center',
          justifyContent: 'center',
        },
        tabBarItemStyle: {
          marginHorizontal: 25,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        },
        tabBarActiveTintColor: '#D4AF37',
        tabBarInactiveTintColor: '#6B7280',
      }}
    >
      {/* 1. KELAM (Hilal) */}
      <Tabs.Screen
        name="kelam"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon SvgIcon={IcKelam} focused={focused} size={36} />
          ),
        }}
      />

      {/* 2. NAMAZ (Mihrab) */}
      <Tabs.Screen
        name="namaz"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon SvgIcon={IcNamaz} focused={focused} />
          ),
        }}
      />

      {/* 3. ANASAYFA (Rosette - Home) */}
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon SvgIcon={IcHome} focused={focused} />
          ),
        }}
      />

      {/* 4. TAKVİM/GÖREVLER (Liste) */}
      <Tabs.Screen
        name="tasks"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon SvgIcon={IcTasks} focused={focused} />
          ),
        }}
      />

      {/* 5. PROFİL (Kişi) */}
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabIcon SvgIcon={IcProfile} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}