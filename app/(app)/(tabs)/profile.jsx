import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    StyleSheet, 
    ScrollView, 
    TouchableOpacity, 
    Alert,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Firebase
import { auth, db } from '../../../firebaseConfig';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

// Components
import ScreenBackground from '../../../components/common/ScreenBackground';
import ProfileHeader from '../../../components/profile/ProfileHeader';
import ProfileStatsRow from '../../../components/profile/ProfileStatsRow';
import BadgeContainer from '../../../components/profile/BadgeContainer';
import ProfileProgressBar from '../../../components/profile/ProfileProgressBar';
import PersonalStats from '../../../components/profile/PersonalStats';
import PremiumBanner from '../../../components/profile/PremiumBanner';
import SettingsSection from '../../../components/profile/SettingsSection';
import LogoutButton from '../../../components/profile/LogoutButton';

export default function ProfileScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);

    // Kullanıcı verilerini çek
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        setUserData(userDoc.data());
                    }
                }
            } catch (error) {
                console.error("Kullanıcı verileri alınamadı:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleLogout = () => {
        Alert.alert(
            "Çıkış Yap",
            "Hesabınızdan çıkış yapmak istediğinizden emin misiniz?",
            [
                { text: "İptal", style: "cancel" },
                { 
                    text: "Çıkış Yap", 
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await signOut(auth);
                            router.replace('/(auth)/login');
                        } catch (error) {
                            Alert.alert("Hata", "Çıkış yapılırken bir hata oluştu.");
                        }
                    }
                }
            ]
        );
    };

    // İstatistik verileri (örnek veriler - gerçek verilerle değiştirilebilir)
    const stats = {
        totalAyet: "12.380",
        totalSalavat: "1.250",
        totalZikir: "4.820",
        totalNamaz: "620",
        ilimCevap: "84",
        tamamlananGorev: "17"
    };

    if (loading) {
        return (
            <ScreenBackground>
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#D4AF37" />
                </View>
            </ScreenBackground>
        );
    }

    const userName = userData?.name && userData?.surname 
        ? `${userData.name} ${userData.surname}` 
        : userData?.username || 'Kullanıcı';
    const userEmail = userData?.email || auth.currentUser?.email || '';

    return (
        <ScreenBackground>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <ScrollView 
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity 
                            onPress={() => router.back()} 
                            style={styles.backButton}
                        >
                            <Ionicons name="chevron-back" size={28} color="#fff" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>PROFİL</Text>
                        <View style={styles.headerRight} />
                    </View>

                    {/* Profil Bilgileri */}
                    <ProfileHeader userName={userName} userEmail={userEmail} />

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Takip - Rozet - Premium */}
                    <ProfileStatsRow />

                    {/* Divider */}
                    <View style={styles.divider} />

                    {/* Rozet İkonları */}
                    <BadgeContainer />

                    {/* İlerleme Çubuğu */}
                    <ProfileProgressBar progress={62} />

                    {/* Kişisel İstatistikler */}
                    <PersonalStats stats={stats} />

                    {/* Premium Banner */}
                    <PremiumBanner onPress={() => {}} />

                    {/* Hesap Ayarları */}
                    <SettingsSection 
                        onAccountPress={() => {}}
                        onNotificationsPress={() => {}}
                        onAboutPress={() => {}}
                    />

                    {/* Çıkış Yap Butonu */}
                    <LogoutButton onPress={handleLogout} />

                    <View style={styles.bottomSpacer} />
                </ScrollView>
            </SafeAreaView>
        </ScreenBackground>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: 20,
        paddingBottom: 120,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Header
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        marginBottom: 10,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#fff',
        letterSpacing: 2,
        fontFamily: 'Cinzel-Black',
    },
    headerRight: {
        width: 40,
    },
    // Divider
    divider: {
        width: '90%',
        height: 0.5,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        alignSelf: 'center',
        marginVertical: 15,
    },
    bottomSpacer: {
        height: 20,
    },
});
