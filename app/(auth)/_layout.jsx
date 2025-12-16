// app/(auth)/_layout.jsx
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="login" 
        options={{ 
          headerShown: false,
          gestureEnabled: true, // Swipe hareketi aktif
        }} 
      />
      
      <Stack.Screen 
        name="create-account" 
        options={{ 
          headerShown: false,
          gestureEnabled: true, // Swipe hareketi aktif
        }} 
      />
    </Stack>
  );
}