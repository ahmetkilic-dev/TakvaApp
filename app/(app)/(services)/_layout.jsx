// app/(app)/(services)/_layout.jsx
import { Stack } from 'expo-router';
import { View } from 'react-native';
import BottomNavBar from '../../../components/common/BottomNavBar';
import { useSegments } from 'expo-router';

export default function ServicesLayout() {
    const segments = useSegments();
    const isHocaAiScreen = segments?.[2] === 'hoca-ai';

    return (
        <View style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="abdest" />
                    <Stack.Screen name="bildirimler" />
                    <Stack.Screen name="dhikr" />
                    <Stack.Screen name="guide-detail" />
                    <Stack.Screen name="hadith" />
                    <Stack.Screen name="hakkinda" />
                    <Stack.Screen name="hatirlatici" />
                    <Stack.Screen name="hesap" />
                    <Stack.Screen name="hoca-ai" />
                    <Stack.Screen name="hutbe" />
                    <Stack.Screen name="ilim" />
                    <Stack.Screen name="imsakiye" />
                    <Stack.Screen name="premium" />
                    <Stack.Screen name="qibla" />
                    <Stack.Screen name="quran" />
                    <Stack.Screen name="quran-page" />
                    <Stack.Screen name="settings" />
                    <Stack.Screen name="diniGunler" />
                    <Stack.Screen name="rozetgorev" />
                    <Stack.Screen name="namazrehber" />
                    <Stack.Screen name="profil" />
                </Stack>
            </View>
            {!isHocaAiScreen && <BottomNavBar />}
        </View>
    );
}
