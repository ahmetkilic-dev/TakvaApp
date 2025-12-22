import { View, Text, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'expo-router';

// Görseller
import gununAyetiBg from '../../assets/images/gunun-ayeti.png';
import zikirDuaBg from '../../assets/images/zikir-dua.png';
import namazDurumuBg from '../../assets/images/namaz-durumu.png';

const { width } = Dimensions.get('window');

// Responsive boyutlar - yüzdelik sistem
const ASPECT_RATIO = 335 / 182; // Orijinal görsel oranı

// Ekran dağılımı: %8 sol + %1 boşluk + %82 merkez + %1 boşluk + %8 sağ = %100
const CENTER_PERCENT = 0.82; // Merkez görsel %82
const SIDE_PEEK_PERCENT = 0.08; // Yan görsellerin görünen kısmı %8
const GAP_PERCENT = 0.01; // Boşluklar %1

// Hesaplamalar
const CENTER_IMAGE_WIDTH = width * CENTER_PERCENT;
const CENTER_IMAGE_HEIGHT = CENTER_IMAGE_WIDTH / ASPECT_RATIO;
const GAP = width * GAP_PERCENT;
const SIDE_PEEK = width * SIDE_PEEK_PERCENT;

// Yan görseller - merkez görselin %90'ı boyutunda (yükseklik için)
const SIDE_SCALE = 0.90;
const SIDE_IMAGE_WIDTH = CENTER_IMAGE_WIDTH * SIDE_SCALE;
const SIDE_IMAGE_HEIGHT = CENTER_IMAGE_HEIGHT * SIDE_SCALE;

// Snap interval
const SNAP_INTERVAL = CENTER_IMAGE_WIDTH + GAP;

const ORIGINAL_DATA = [
  {
    id: 1,
    title: 'Zikir ve Dua',
    subtitle: 'Ruhun gıdası, kalbin huzuru.',
    image: zikirDuaBg,
    buttonText: 'Zikir çek',
  },
  {
    id: 2,
    title: 'Günün Ayeti',
    subtitle: "Takva'daki herkesle birlikte salavat getir.",
    image: gununAyetiBg,
    buttonText: 'Günün ayeti',
  },
  {
    id: 3,
    title: 'Günün Hadisi',
    subtitle: 'Peygamberimizden öğütler.',
    image: namazDurumuBg,
    buttonText: 'Oku',
  },
];

// Infinite loop için data'yı 3 kez tekrarla
const DATA = [...ORIGINAL_DATA, ...ORIGINAL_DATA, ...ORIGINAL_DATA];
const CLONE_COUNT = ORIGINAL_DATA.length;

export default function DailyCarousel() {
  const router = useRouter();
  // Ortadan başla (ikinci set)
  const [activeIndex, setActiveIndex] = useState(CLONE_COUNT + 1);
  const flatListRef = useRef(null);
  const isScrolling = useRef(false);

  // Gerçek data index'ini hesapla
  const getRealIndex = (index) => index % ORIGINAL_DATA.length;
  const currentItem = ORIGINAL_DATA[getRealIndex(activeIndex)];

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0 && !isScrolling.current) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  // Scroll bittiğinde loop için pozisyonu resetle
  const onMomentumScrollEnd = useCallback((event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / SNAP_INTERVAL);

    // Eğer ilk veya son sete geldiysek, ortadaki sete atla
    if (index < CLONE_COUNT) {
      // İlk setteyiz, ortadaki sete atla
      isScrolling.current = true;
      const newIndex = index + CLONE_COUNT;
      flatListRef.current?.scrollToOffset({
        offset: newIndex * SNAP_INTERVAL,
        animated: false,
      });
      setActiveIndex(newIndex);
      setTimeout(() => { isScrolling.current = false; }, 50);
    } else if (index >= CLONE_COUNT * 2) {
      // Son setteyiz, ortadaki sete atla
      isScrolling.current = true;
      const newIndex = index - CLONE_COUNT;
      flatListRef.current?.scrollToOffset({
        offset: newIndex * SNAP_INTERVAL,
        animated: false,
      });
      setActiveIndex(newIndex);
      setTimeout(() => { isScrolling.current = false; }, 50);
    } else {
      setActiveIndex(index);
    }
  }, []);

  const renderItem = ({ item, index }) => {
    const realActiveIndex = getRealIndex(activeIndex);
    const realItemIndex = getRealIndex(index);
    const isActive = realItemIndex === realActiveIndex;

    const imageHeight = isActive ? CENTER_IMAGE_HEIGHT : SIDE_IMAGE_HEIGHT;
    const imageWidth = isActive ? CENTER_IMAGE_WIDTH : SIDE_IMAGE_WIDTH;

    return (
      <View
        style={{
          width: SNAP_INTERVAL,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* Görsel Kartı */}
        <View
          style={{
            height: imageHeight,
            width: imageWidth,
            borderRadius: 25,
            overflow: 'hidden',
            backgroundColor: '#1a1a1a',
          }}
        >
          <Image
            source={item.image}
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode="cover"
          />
        </View>
      </View>
    );
  };

  return (
    <View style={{ marginTop: 48, marginBottom: 24 }}>
      {/* Sabit Header - Carousel dışında */}
      <View style={{ alignItems: 'center', marginBottom: 16, paddingHorizontal: 24 }}>
        <Text
          style={{
            fontFamily: 'PlusJakartaSans-SemiBold',
            fontSize: 22,
            fontWeight: '600',
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
          }}
        >
          {currentItem.title}
        </Text>
        <Text
          style={{
            fontFamily: 'PlusJakartaSans-Regular',
            fontSize: 14,
            fontWeight: '400',
            color: '#AEB7B2',
            textAlign: 'center',
            marginTop: 4,
          }}
        >
          {currentItem.subtitle}
        </Text>
      </View>

      {/* Carousel */}
      <FlatList
        ref={flatListRef}
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP_INTERVAL}
        decelerationRate="fast"
        contentContainerStyle={{
          // Sol: %8 peek + %1 gap = %9 padding
          paddingHorizontal: SIDE_PEEK + GAP,
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        onMomentumScrollEnd={onMomentumScrollEnd}
        initialScrollIndex={CLONE_COUNT + 1}
        getItemLayout={(data, index) => ({
          length: SNAP_INTERVAL,
          offset: SNAP_INTERVAL * index,
          index,
        })}
      />

      {/* Alt Buton - 150x30, radius 10, bg #182723, stroke %50 1px */}
      <View style={{ alignItems: 'center', marginTop: 12 }}>
        <TouchableOpacity 
          activeOpacity={0.8}
          onPress={() => {
            // Günün Ayeti butonuna basınca quran ekranına git
            if (currentItem.title === 'Günün Ayeti') {
              router.push('/(app)/(services)/quran');
            }
          }}
        >
          <View
            style={{
              width: 150,
              height: 30,
              borderRadius: 10,
              backgroundColor: '#182723',
              borderWidth: 1,
              borderColor: 'rgba(255, 255, 255, 0.5)',
              flexDirection: 'row',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            {/* Text ortalı */}
            <Text
              style={{
                flex: 1,
                fontFamily: 'PlusJakartaSans-SemiBold',
                fontSize: 15,
                fontWeight: '600',
                color: '#FFFFFF',
                textAlign: 'center',
              }}
            >
              {currentItem.buttonText}
            </Text>
            {/* Arrow sağa yaslı */}
            <MaterialIcons
              name="chevron-right"
              size={18}
              color="#FFFFFF"
              style={{ position: 'absolute', right: 8 }}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}