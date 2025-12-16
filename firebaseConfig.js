// firebaseConfig.js
import { initializeApp } from "firebase/app";
// initializeAuth yerine standart getAuth kullanıyoruz (Takılmayı önler)
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

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

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Auth sistemini başlat (Sadeleştirilmiş versiyon)
const auth = getAuth(app);

// Veritabanını başlat
const db = getFirestore(app);

export { auth, db };