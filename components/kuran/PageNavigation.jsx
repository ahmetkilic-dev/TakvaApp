import { View, Text, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const horizontalPadding = Math.max(20, SCREEN_WIDTH * 0.05);
const fontFamily = 'Plus Jakarta Sans';

export default function PageNavigation(props) {
  const { surahName = '', currentPage, totalPages, onPageChange, activeTab, onTabChange, showPageNumbers = true } = props;
  // Sayfa numaraları - her zaman 5 ardışık sayfa göster (mevcut sayfa ortada)


  return (
    <View style={{ paddingHorizontal: horizontalPadding, marginBottom: 16 }}>
      {/* Surah Name - Top Center */}
      <View style={{ alignItems: 'center', marginBottom: 20, marginTop: 10 }}>
        <Text style={{
          color: 'white',
          fontSize: 22,
          fontFamily: fontFamily,
          fontWeight: '600',
          textAlign: 'center'
        }}>
          {surahName} suresi
        </Text>
      </View>

      {/* Navigation Row */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20 }}>

        {/* Left: Kur'an Tab */}
        <View style={{ width: 70, alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => onTabChange('Kur\'an')}
            style={{ alignItems: 'center', width: '100%' }}
          >
            <Text style={{
              color: activeTab === 'Kur\'an' ? 'white' : 'rgba(255,255,255,0.5)',
              fontSize: 16,
              fontFamily: fontFamily,
              fontWeight: activeTab === 'Kur\'an' ? '600' : '400',
            }}>
              Kur'an
            </Text>
            {activeTab === 'Kur\'an' && (
              <View style={{
                height: 2,
                backgroundColor: 'white',
                width: '100%',
                marginTop: 4
              }} />
            )}
          </TouchableOpacity>
        </View>

        {/* Center: Pagination Arrows & Number */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 15, minWidth: 100 }}>
          <TouchableOpacity
            onPress={() => onPageChange(Math.max(1, currentPage - 1))}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={{ color: 'white', fontSize: 24, fontFamily: fontFamily }}>
              {'<'}
            </Text>
          </TouchableOpacity>

          <Text style={{
            color: 'white',
            fontSize: 20,
            fontFamily: fontFamily,
            fontWeight: '600',
            minWidth: 35,
            textAlign: 'center'
          }}>
            {currentPage}
          </Text>

          <TouchableOpacity
            onPress={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Text style={{ color: 'white', fontSize: 24, fontFamily: fontFamily }}>
              {'>'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Right: Meal Tab */}
        <View style={{ width: 70, alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => onTabChange('Meal')}
            style={{ alignItems: 'center', width: '100%' }}
          >
            <Text style={{
              color: activeTab === 'Meal' ? 'white' : 'rgba(255,255,255,0.5)',
              fontSize: 16,
              fontFamily: fontFamily,
              fontWeight: activeTab === 'Meal' ? '600' : '400',
            }}>
              Meal
            </Text>
            {activeTab === 'Meal' && (
              <View style={{
                height: 2,
                backgroundColor: 'white',
                width: '100%',
                marginTop: 4
              }} />
            )}
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

