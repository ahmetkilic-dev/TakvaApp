import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ReligiousDayCard() {
  const router = useRouter();
  const fontStyle = { fontFamily: 'Plus Jakarta Sans' };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={() => router.push('/(app)/(services)/diniGunler')}
      activeOpacity={0.9}
    >
      {/* Başlık Alanı */}
      <Text style={[fontStyle, styles.mainTitle]}>Dini Günler</Text>
      <Text style={[fontStyle, styles.subTitle]}>
        Yaklaşan mübarek gün ve gecelere kalan süre.
      </Text>

      {/* Dini Gün Kartı */}
      <View style={styles.card}>
        {/* Sol Taraf */}
        <View style={styles.leftContent}>
          {/* Başlık satırı */}
          <View style={styles.titleRow}>
            <Ionicons name="moon" size={20} color="#FFFFFF" />
            <Text style={[fontStyle, styles.dayTitle]}>Berat Kandili</Text>
          </View>

          {/* Açıklama */}
          <Text style={[fontStyle, styles.description]}>
            Günahların affı ve kaderin yazıldığı{'\n'}mübarek gece.
          </Text>

          {/* Takvim Bilgileri */}
          <View style={styles.dateContainer}>
            <Text style={[fontStyle, styles.dateLabel]} numberOfLines={1}>
              <Text style={styles.dateUnderline}>Hicrî Takvim</Text> : <Text style={styles.dateValue}>15 Şaban 1446</Text>
            </Text>
            <View style={styles.dateDivider} />
            <Text style={[fontStyle, styles.dateLabel]} numberOfLines={1}>
              <Text style={styles.dateUnderline}>Miladî Takvim</Text> : <Text style={styles.dateValue}>25 Şubat 2025</Text>
            </Text>
          </View>
        </View>

        {/* Sağ Taraf */}
        <View style={styles.rightContent}>
          <Text style={[fontStyle, styles.remainingLabel]}>Kalan Süre</Text>
          <Text style={[fontStyle, styles.remainingDays]}>12 Gün</Text>
          
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push('/(app)/(services)/diniGunler')}
            activeOpacity={0.8}
          >
            <Text style={[fontStyle, styles.buttonText]}>İslamî takvime git</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 48,
    width: '100%',
    alignItems: 'center',
  },
  mainTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subTitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    width: SCREEN_WIDTH * 0.9,
    backgroundColor: '#24322E',
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  leftContent: {
    flex: 1,
    paddingRight: 12,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  dayTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 16,
  },
  dateContainer: {
    gap: 6,
  },
  dateDivider: {
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dateLabel: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 13,
  },
  dateUnderline: {
    textDecorationLine: 'underline',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  dateValue: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  rightContent: {
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 110,
  },
  remainingLabel: {
    color: '#FFBA4A',
    fontSize: 13,
    textDecorationLine: 'underline',
    marginBottom: 4,
  },
  remainingDays: {
    color: '#FFBA4A',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#182723',
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
});
