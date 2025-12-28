import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Switch } from 'react-native';

const fontFamily = 'Plus Jakarta Sans';

export default function CustomReminderCard({ reminder, onToggle, onUpdate, onDelete, contentWidth }) {
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
      {/* Top Section: Name and Toggle Switch */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
        <Text
          style={{
            fontFamily,
            fontSize: 18,
            fontWeight: '600',
            color: '#FFFFFF',
            flex: 1,
          }}
        >
          {reminder.name}
        </Text>

        {/* Toggle Switch */}
        <Switch
          value={reminder.enabled || false}
          onValueChange={onToggle}
          trackColor={{ false: '#7C8381', true: '#15614D' }}
          thumbColor="#FFFFFF"
          ios_backgroundColor="#7C8381"
        />
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

      {/* Bottom Section: Time/Days and Buttons */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' }}>
        {/* Left Side: Time and Days */}
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily,
              fontSize: 14 * 1.1,
              fontWeight: '400',
              color: reminder.time ? 'rgba(255, 255, 255, 0.6)' : 'rgba(255, 255, 255, 0.5)',
              marginBottom: 4,
            }}
          >
            {reminder.time || 'Vakit seçili değil'}
          </Text>
          <Text
            style={{
              fontFamily,
              fontSize: 12,
              fontWeight: '400',
              color: reminder.days ? '#FFFFFF' : 'rgba(255, 255, 255, 0.5)',
            }}
          >
            {reminder.days || 'Gün seçili değil'}
          </Text>
        </View>

        {/* Right Side: Update and Delete Buttons */}
        <View style={{ flexDirection: 'row', gap: 8 }}>
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
          <TouchableOpacity
            onPress={onDelete}
            style={{
              width: 60,
              height: 25,
              borderRadius: 5,
              borderWidth: 0.5,
              borderColor: 'rgba(255, 0, 0, 0.75)',
              backgroundColor: 'rgba(24, 39, 35, 0.5)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="trash-outline" size={16} color="#FF4444" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

