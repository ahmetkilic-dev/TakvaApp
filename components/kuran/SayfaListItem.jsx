import { memo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';

import { useQuranProgress } from './hooks/useQuranProgress';
import ProgressCircle from '../rozetgorev/ProgressCircle';

const fontFamily = 'Plus Jakarta Sans';

const SayfaListItem = memo(({ page, onPress, showStats = false }) => {
  const { isPageRead } = useQuranProgress();
  // Only consider it "visually read" if it's read AND stats are enabled (Premium)
  const isRead = showStats && isPageRead(page.number);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        width: '100%',
        height: 62,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: isRead ? '#8CD7C0' : 'rgba(255, 255, 255, 0.5)',
        backgroundColor: isRead ? 'rgba(140, 215, 192, 0.1)' : 'rgba(255, 255, 255, 0.05)',
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
          contentFit="contain"
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
            {page.number}
          </Text>
        </View>
      </View>

      {/* Text Content */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily, fontSize: 20, fontWeight: '400', color: '#FFFFFF', marginBottom: 4 }}>
          Sayfa {page.number}
        </Text>
        <Text style={{ fontFamily, fontSize: 10, fontWeight: '400', color: 'rgba(255, 255, 255, 0.7)' }}>
          Kuran-ı Kerim {isRead && '• Okundu'}
        </Text>
      </View>

      {/* Progress Section */}
      <View style={{ marginLeft: 8 }}>
        {showStats ? (
          <ProgressCircle percentage={isRead ? 100 : 0} size={44} />
        ) : (
          <View>
            <Image
              source={require('../../assets/statistics/kilitic.png')}
              style={{ width: 44, height: 44, opacity: 0.8 }}
              contentFit="contain"
            />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
});

SayfaListItem.displayName = 'SayfaListItem';

export default SayfaListItem;
