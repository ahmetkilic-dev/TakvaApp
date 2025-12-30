import { View, Text, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const horizontalPadding = Math.max(20, SCREEN_WIDTH * 0.05);
const fontFamily = 'Plus Jakarta Sans';

export default function PageNavigation({ currentPage, totalPages, onPageChange, activeTab, onTabChange, showPageNumbers = true }) {
  // Sayfa numaraları - her zaman 5 ardışık sayfa göster (mevcut sayfa ortada)
  const getPageNumbers = () => {
    if (!showPageNumbers || !currentPage || !totalPages) {
      return [];
    }

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages = [];
    // Mevcut sayfanın 2 öncesi ve 2 sonrası (toplam 5 sayfa)
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, currentPage + 2);

    // Eğer başta isek, sağa kaydır
    if (start === 1) {
      end = Math.min(5, totalPages);
    }

    // Eğer sonda isek, sola kaydır
    if (end === totalPages) {
      start = Math.max(1, totalPages - 4);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <View style={{ paddingHorizontal: horizontalPadding, marginBottom: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 20, flexWrap: 'wrap' }}>
        {/* Page Numbers */}
        {showPageNumbers && pageNumbers.map((pageNum, index) => (
          <TouchableOpacity
            key={pageNum}
            onPress={() => onPageChange(pageNum)}
            style={{ alignItems: 'center' }}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.7}
          >
            <Text
              style={{
                fontFamily,
                fontSize: 15,
                fontWeight: currentPage === pageNum ? '700' : '300',
                color: currentPage === pageNum ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                letterSpacing: 2,
              }}
            >
              {pageNum}
            </Text>
            {currentPage === pageNum && (
              <View
                style={{
                  width: 40,
                  height: 1,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 10,
                  marginTop: 4,
                }}
              />
            )}
          </TouchableOpacity>
        ))}

        {/* Kur'an / Meal Tabs */}
        <TouchableOpacity onPress={() => onTabChange('Kur\'an')} style={{ alignItems: 'center', marginLeft: showPageNumbers ? 12 : 0 }}>
          <Text
            style={{
              fontFamily,
              fontSize: 15,
              fontWeight: activeTab === 'Kur\'an' ? '700' : '300',
              color: activeTab === 'Kur\'an' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
              letterSpacing: 2,
            }}
          >
            Kur'an
          </Text>
          {activeTab === 'Kur\'an' && (
            <View
              style={{
                width: 63,
                height: 1,
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                marginTop: 4,
              }}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTabChange('Meal')} style={{ alignItems: 'center' }}>
          <Text
            style={{
              fontFamily,
              fontSize: 15,
              fontWeight: activeTab === 'Meal' ? '700' : '300',
              color: activeTab === 'Meal' ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
              letterSpacing: 2,
            }}
          >
            Meal
          </Text>
          {activeTab === 'Meal' && (
            <View
              style={{
                width: 46,
                height: 1,
                backgroundColor: '#FFFFFF',
                borderRadius: 10,
                marginTop: 4,
              }}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

