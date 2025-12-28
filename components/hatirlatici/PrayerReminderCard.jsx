import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Switch } from 'react-native';

const fontFamily = 'Plus Jakarta Sans';

// Vakit ikonları
const prayerIcons = {
  1: 'moon-outline',    // İmsak
  2: 'sunny-outline',   // Güneş
  3: 'sunny',           // Öğle
  4: 'partly-sunny-outline', // İkindi
  5: 'moon',            // Akşam
  6: 'moon-outline',    // Yatsı
};

export default function PrayerReminderCard({ prayer, reminder, onToggle, onUpdate, contentWidth }) {
  return (
    <View
      style={{
        width: contentWidth,
        minHeight: 105,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        backgroundColor: 'rgba(24, 39, 35, 0.5)',
        padding: 12,
      }}
    >
      {/* Top Section: Icon + Name and Toggle Switch */}
      <View style={{ marginBottom: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
            {/* Icon */}
            <View style={{ marginRight: 12 }}>
              <Ionicons name={prayerIcons[prayer.id] || 'time-outline'} size={24} color="#FFFFFF" />
            </View>
            {/* Vakit Name */}
            <Text
              style={{
                fontFamily,
                fontSize: 18,
                fontWeight: '600',
                color: '#FFFFFF',
                flexShrink: 1,
              }}
            >
              {prayer.label}
            </Text>
          </View>

          {/* Toggle Switch */}
          <Switch
            value={reminder?.enabled || false}
            onValueChange={onToggle}
            trackColor={{ false: '#7C8381', true: '#15614D' }}
            thumbColor="#FFFFFF"
            ios_backgroundColor="#7C8381"
          />
        </View>
        {/* Time - iconun tam altında */}
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: 52, alignItems: 'flex-start' }}>
            <Text
              numberOfLines={1}
              style={{
                fontFamily,
                fontSize: 14 * 1.1,
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              {prayer.time.split(' ')[0]}
            </Text>
          </View>
        </View>
      </View>

      {/* Separator Line */}
      <View
        style={{
          width: '100%',
          height: 0.5,
          backgroundColor: 'rgba(217, 217, 217, 0.5)',
          marginBottom: 8,
        }}
      />

      {/* Bottom Section: Days/Offset and Update Button */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        {/* Left Side: Days, Offset */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily,
              fontSize: 14,
              fontWeight: '400',
              color: reminder?.days ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
              marginBottom: 4,
            }}
          >
            {reminder?.days || 'Gün seçili değil'}
          </Text>
          <Text
            style={{
              fontFamily,
              fontSize: 12,
              fontWeight: '400',
              color: reminder?.offset ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
            }}
          >
            {reminder?.offset || 'Vakit seçili değil'}
          </Text>
        </View>

        {/* Right Side: Update Button */}
        <TouchableOpacity
          onPress={onUpdate}
          style={{
            width: 87,
            height: 25,
            borderRadius: 5,
            borderWidth: 0.5,
            borderColor: 'rgba(255, 255, 255, 0.5)',
            backgroundColor: 'rgba(24, 39, 35, 0.5)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              fontFamily,
              fontSize: 12,
              fontWeight: '400',
              color: '#FFFFFF',
            }}
          >
            Güncelle
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

