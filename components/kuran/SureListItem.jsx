import { memo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

const fontFamily = 'Plus Jakarta Sans';

const SureListItem = memo(({ surah, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        width: '100%',
        height: 62,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        marginBottom: 12,
      }}
    >
      {/* Kuran Icon with Number */}
      <View style={{ marginRight: 12, width: 40, height: 40, position: 'relative' }}>
        <Image
          source={require('../../assets/images/kuranicc.png')}
          style={{ width: 40, height: 40 }}
          resizeMode="contain"
        />
        <View
          style={{
            position: 'absolute',
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontFamily, fontSize: 16, fontWeight: '700', color: '#FFFFFF' }}>
            {surah.number}
          </Text>
        </View>
      </View>

      {/* Text Content */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily, fontSize: 20, fontWeight: '400', color: '#FFFFFF', marginBottom: 4 }}>
          {surah.name} Suresi
        </Text>
        <Text style={{ fontFamily, fontSize: 10, fontWeight: '400', color: 'rgba(255, 255, 255, 0.7)' }}>
          {surah.ayahCount} Ayet
        </Text>
      </View>
    </TouchableOpacity>
  );
});

SureListItem.displayName = 'SureListItem';

export default SureListItem;
