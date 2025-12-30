// firebaseConfig.js
import { initializeApp, getApps, getApp } from "firebase/app";
// Kalıcı oturum için initializeAuth ve AsyncStorage kullanıyoruz
import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

// --- FIREBASE BİLGİLERİN (AYNI KALIYOR) ---
const firebaseConfig = {
  apiKey: "AIzaSyC1UOujeYizjpsEfCTKl7tqTKyyzbJKoj8",
  authDomain: "wezy-takva.firebaseapp.com",
  projectId: "wezy-takva",
  storageBucket: "wezy-takva.firebasestorage.app",
  messagingSenderId: "1063960456618",
  appId: "1:1063960456618:web:54b21dfbe5b478569e0fd3",
  measurementId: "G-49JZBRG633"
};

// Firebase'i başlat (Hot reload için kontrol)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Auth sistemini başlat (AsyncStorage ile kalıcı oturum)
// Hot reload sırasında tekrar başlatmayı önle
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
  });
} catch (error) {
  // Zaten başlatılmışsa mevcut instance'ı al
  auth = getAuth(app);
}

export { auth };