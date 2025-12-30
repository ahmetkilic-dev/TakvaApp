import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useReligiousDays } from '../dinigunler';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ReligiousDayCard() {
  const router = useRouter();
  const fontStyle = { fontFamily: 'Plus Jakarta Sans' };
  const { religiousDays, loading, error } = useReligiousDays();

  const nearestDay = religiousDays?.[0] ?? null;

  const iconName = (nearestDay?.icon || 'moon');
  const dayTitle =
    nearestDay?.name ||
    (loading ? 'Yükleniyor...' : (error ? 'Dini günler yüklenemedi' : 'Yaklaşan dini gün yok'));
  const description =
    nearestDay?.description ||
    (loading ? 'Dini günler hesaplanıyor...' : (error ? 'Lütfen daha sonra tekrar deneyin.' : ''));
  const hijriDate = nearestDay?.hijriDate || '-';
  const gregorianDate = nearestDay?.gregorianDate || '-';
  const remainingText = nearestDay
    ? (nearestDay.remainingDays === 0 ? 'Bugün' : `${nearestDay.remainingDays} Gün`)
    : (loading ? '...' : '--');

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
            <Ionicons name={iconName} size={20} color="#FFFFFF" />
            <Text style={[fontStyle, styles.dayTitle]} numberOfLines={2} adjustsFontSizeToFit>{dayTitle}</Text>
          </View>

          {/* Açıklama */}
          {!!description && (
            <Text style={[fontStyle, styles.description]}>
              {description}
            </Text>
          )}

          {/* Takvim Bilgileri */}
          <View style={styles.dateContainer}>
            <Text style={[fontStyle, styles.dateLabel]} numberOfLines={1}>
              <Text style={styles.dateUnderline}>Hicrî Takvim</Text> : <Text style={styles.dateValue}>{hijriDate}</Text>
            </Text>
            <View style={styles.dateDivider} />
            <Text style={[fontStyle, styles.dateLabel]} numberOfLines={1}>
              <Text style={styles.dateUnderline}>Miladî Takvim</Text> : <Text style={styles.dateValue}>{gregorianDate}</Text>
            </Text>
          </View>
        </View>

        {/* Sağ Taraf */}
        <View style={styles.rightContent}>
          <Text style={[fontStyle, styles.remainingLabel]}>Kalan Süre</Text>
          <Text style={[fontStyle, styles.remainingDays]}>{remainingText}</Text>

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
