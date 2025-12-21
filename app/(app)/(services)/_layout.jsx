// app/(app)/(services)/_layout.jsx
import { Stack } from 'expo-router';

export default function ServicesLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="abdest" />
            <Stack.Screen name="dhikr" />
            <Stack.Screen name="guide-detail" />
            <Stack.Screen name="hadith" />
            <Stack.Screen name="hoca-ai" />
            <Stack.Screen name="hutbe" />
            <Stack.Screen name="premium" />
            <Stack.Screen name="qibla" />
            <Stack.Screen name="quran" />
            <Stack.Screen name="quran-page" />
            <Stack.Screen name="settings" />
        </Stack>
    );
}
