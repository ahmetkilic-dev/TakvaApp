import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const StatCard = ({ label, value }) => {
    return (
        <View style={styles.statCardWrapper}>
            <LinearGradient
                colors={['#182723', '#0A3727']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={styles.statCard}
            >
                <Text style={styles.statCardLabel}>{label}</Text>
                <Text style={styles.statCardValue}>{value}</Text>
            </LinearGradient>
        </View>
    );
};

const PersonalStats = ({ stats }) => {
    const defaultStats = {
        totalAyet: "12.380",
        totalSalavat: "1.250",
        totalZikir: "4.820",
        totalNamaz: "620",
        ilimCevap: "84",
        tamamlananGorev: "17"
    };

    const data = stats || defaultStats;

    return (
        <View>
            {/* Başlık */}
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Kişisel İstatistiklerin</Text>
                <Text style={styles.sectionSubtitle}>
                    Bugüne kadar uygulamada yaptığın tüm ilerlemelerin.
                </Text>
            </View>

            {/* Kartlar */}
            <View style={styles.statsGrid}>
                <View style={styles.statsGridRow}>
                    <StatCard label="Toplam okunan ayet" value={data.totalAyet} />
                    <StatCard label="Toplam salavat" value={data.totalSalavat} />
                </View>
                <View style={styles.statsGridRow}>
                    <StatCard label="Toplam zikir sayısı" value={data.totalZikir} />
                    <StatCard label="Toplam kılınan namaz" value={data.totalNamaz} />
                </View>
                <View style={styles.statsGridRow}>
                    <StatCard label="İlim doğru cevap" value={data.ilimCevap} />
                    <StatCard label="Tamamlanan görevler" value={data.tamamlananGorev} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    sectionHeader: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 6,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#9CA3AF',
        lineHeight: 20,
    },
    statsGrid: {
        marginBottom: 25,
    },
    statsGridRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    statCardWrapper: {
        width: (SCREEN_WIDTH - 52) / 2,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'rgba(216, 196, 158, 0.5)',
        overflow: 'hidden',
    },
    statCard: {
        width: '100%',
        height: 70,
        borderRadius: 10,
        paddingVertical: 8,
        paddingHorizontal: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    statCardLabel: {
        fontSize: 11,
        color: '#D8C49E',
        marginBottom: 2,
        textAlign: 'center',
    },
    statCardValue: {
        fontSize: 16,
        fontWeight: '700',
        color: '#D8C49E',
    },
});



export default PersonalStats;

