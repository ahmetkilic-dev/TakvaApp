import { memo } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';

import { useQuranProgress } from './hooks/useQuranProgress';
import ProgressCircle from '../rozetgorev/ProgressCircle';

const fontFamily = 'Plus Jakarta Sans';

const CuzListItem = memo(({ juz, onPress }) => {
  const { getJuzProgress } = useQuranProgress();
  const progress = getJuzProgress(juz.number);
  const isCompleted = progress >= 100;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        width: '100%',
        height: 62,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: isCompleted ? '#8CD7C0' : 'rgba(255, 255, 255, 0.5)',
        backgroundColor: isCompleted ? 'rgba(140, 215, 192, 0.1)' : 'rgba(255, 255, 255, 0.05)',
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
            {juz.number}
          </Text>
        </View>
      </View>

      {/* Text Content */}
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily, fontSize: 20, fontWeight: '400', color: '#FFFFFF', marginBottom: 4 }}>
          {juz.name}
        </Text>
        <Text style={{ fontFamily, fontSize: 10, fontWeight: '400', color: 'rgba(255, 255, 255, 0.7)' }}>
          Kuran-ı Kerim
        </Text>
      </View>

      {/* Progress Section */}
      <View style={{ marginLeft: 8 }}>
        <ProgressCircle percentage={progress} size={44} />
      </View>
    </TouchableOpacity>
  );
});

CuzListItem.displayName = 'CuzListItem';

export default CuzListItem;
