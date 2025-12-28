import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useKazaCounters } from './hooks/useKazaCounters';

// İkonlar
import SabahIcon from '../../assets/kazanamaz/sabah.png';
import OgleIcon from '../../assets/kazanamaz/ogle.png';
import IkindiIcon from '../../assets/kazanamaz/ikindi.png';
import AksamIcon from '../../assets/kazanamaz/aksam.png';
import YatsiIcon from '../../assets/kazanamaz/yatsi.png';
import VitirIcon from '../../assets/kazanamaz/vitir.png';
import OrucIcon from '../../assets/kazanamaz/oruc.png';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// İkon mapping
const PRAYER_ICONS = {
  sabah: SabahIcon,
  ogle: OgleIcon,
  ikindi: IkindiIcon,
  aksam: AksamIcon,
  yatsi: YatsiIcon,
  vitir: VitirIcon,
  oruc: OrucIcon,
};

// Namaz isimleri
const PRAYER_NAMES = {
  sabah: 'Sabah',
  ogle: 'Öğle',
  ikindi: 'İkindi',
  aksam: 'Akşam',
  yatsi: 'Yatsı',
  vitir: 'Vitir',
  oruc: 'Oruç',
};

export default function KazaCounter() {
  const fontStyle = { fontFamily: 'Plus Jakarta Sans' };

  const { canEdit, kazaNamazlari, kazaOruclari, updateNamaz, updateOruc } = useKazaCounters();

  // Sayaç satırı componenti
  const CounterRow = ({ type, value, onDecrease, onIncrease }) => (
    <View style={styles.counterRow}>
      <View style={styles.counterLeft}>
        <Image source={PRAYER_ICONS[type]} style={styles.counterIcon} resizeMode="contain" />
        <Text style={[fontStyle, styles.counterLabel]}>{PRAYER_NAMES[type]}</Text>
      </View>
      <View style={styles.counterRight}>
        <Text style={[fontStyle, styles.counterValue]}>{value}</Text>
        <View style={styles.counterButtons}>
          <TouchableOpacity style={styles.counterBtn} onPress={onDecrease} disabled={!canEdit || value <= 0} activeOpacity={0.7}>
            <Ionicons name="remove" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.buttonDivider} />
          <TouchableOpacity style={styles.counterBtn} onPress={onIncrease} disabled={!canEdit} activeOpacity={0.7}>
            <Ionicons name="add" size={22} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Kaza Namazlarım */}
      <View style={styles.section}>
        <Text style={[fontStyle, styles.sectionTitle]}>Kaza Namazlarım</Text>
        
        <CounterRow 
          type="sabah"
          value={kazaNamazlari.sabah}
          onDecrease={() => updateNamaz('sabah', -1)}
          onIncrease={() => updateNamaz('sabah', 1)}
        />
        <CounterRow 
          type="ogle"
          value={kazaNamazlari.ogle}
          onDecrease={() => updateNamaz('ogle', -1)}
          onIncrease={() => updateNamaz('ogle', 1)}
        />
        <CounterRow 
          type="ikindi"
          value={kazaNamazlari.ikindi}
          onDecrease={() => updateNamaz('ikindi', -1)}
          onIncrease={() => updateNamaz('ikindi', 1)}
        />
        <CounterRow 
          type="aksam"
          value={kazaNamazlari.aksam}
          onDecrease={() => updateNamaz('aksam', -1)}
          onIncrease={() => updateNamaz('aksam', 1)}
        />
        <CounterRow 
          type="yatsi"
          value={kazaNamazlari.yatsi}
          onDecrease={() => updateNamaz('yatsi', -1)}
          onIncrease={() => updateNamaz('yatsi', 1)}
        />
        <CounterRow 
          type="vitir"
          value={kazaNamazlari.vitir}
          onDecrease={() => updateNamaz('vitir', -1)}
          onIncrease={() => updateNamaz('vitir', 1)}
        />
      </View>

      {/* Kaza Oruçlarım */}
      <View style={styles.section}>
        <Text style={[fontStyle, styles.sectionTitle]}>Kaza Oruçlarım</Text>
        
        <CounterRow 
          type="oruc"
          value={kazaOruclari.oruc}
          onDecrease={() => updateOruc('oruc', -1)}
          onIncrease={() => updateOruc('oruc', 1)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  counterRow: {
    width: SCREEN_WIDTH * 0.9,
    height: 50,
    alignSelf: 'center',
    backgroundColor: 'rgba(24, 39, 35, 0.75)',
    borderRadius: 16,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.75)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 6,
    marginBottom: 10,
  },
  counterLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  counterIcon: {
    width: 24,
    height: 24,
  },
  counterLabel: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  counterRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  counterValue: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
    minWidth: 30,
    textAlign: 'center',
  },
  counterButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a2723',
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.75)',
  },
  counterBtn: {
    width: 40,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDivider: {
    width: 0.5,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
});

