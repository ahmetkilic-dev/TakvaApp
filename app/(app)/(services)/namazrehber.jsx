import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import ScreenBackground from '../../../components/common/ScreenBackground';
import { auth } from "../../../firebaseConfig";

// Assets - WebP imports
import CelseImage from '../../../assets/namazrehber/celse.webp';
import KavmeImage from '../../../assets/namazrehber/kavme.webp';
import KiyamImage from '../../../assets/namazrehber/kiyam.webp';
import NiyetImage from '../../../assets/namazrehber/niyet.webp';
import RukuImage from '../../../assets/namazrehber/ruku.webp';
import SecdeImage from '../../../assets/namazrehber/secde.webp';
import SelamImage from '../../../assets/namazrehber/selam.webp';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Local Responsive Helpers
const fontSize = (size) => size;
const spacing = (size) => size;
const borderRadius = (size) => size;
const wp = (percentage) => (SCREEN_WIDTH * percentage) / 100;
const hp = (percentage) => (SCREEN_HEIGHT * percentage) / 100;

const prayers = [
  {
    id: 1,
    name: "Sabah namazı",
    rekats: 4,
    structure: [
      { type: "Sünnet", rekats: 2 },
      { type: "Farz", rekats: 2 }
    ]
  },
  {
    id: 2,
    name: "Öğle namazı",
    rekats: 10,
    structure: [
      { type: "Sünnet", rekats: 4 },
      { type: "Farz", rekats: 4 },
      { type: "Son Sünnet", rekats: 2 }
    ]
  },
  {
    id: 3,
    name: "İkindi namazı",
    rekats: 8,
    structure: [
      { type: "Sünnet", rekats: 4 },
      { type: "Farz", rekats: 4 }
    ]
  },
  {
    id: 4,
    name: "Akşam namazı",
    rekats: 5,
    structure: [
      { type: "Farz", rekats: 3 },
      { type: "Sünnet", rekats: 2 }
    ]
  },
  {
    id: 5,
    name: "Yatsı namazı",
    rekats: 13,
    structure: [
      { type: "Sünnet", rekats: 4 },
      { type: "Farz", rekats: 4 },
      { type: "Son Sünnet", rekats: 2 },
      { type: "Vitir", rekats: 3 }
    ]
  },
];

const prayerSteps = [
  {
    id: "takbir",
    title: "İftitah Tekbiri",
    subtitle: null,
    image: NiyetImage, // Takbir görseli olarak niyet görselini geçici olarak kullanabiliriz veya özel görsel varsa o
    description: null,
    showImageOnly: true
  },
  {
    id: "niyet",
    title: "Niyet",
    subtitle: null,
    image: null,
    description: "Niyet ettim Allah rızası için sabah namazının sünnetini kılmaya.",
    showImageOnly: false
  },
  {
    id: "iftitah",
    title: "İftitah Tekbiri",
    subtitle: null,
    image: null,
    description: "\"Allahu Ekber\"",
    showImageOnly: false
  },
  {
    id: "kiyam",
    title: "Kıyam (Ayakta Durma)",
    subtitle: null,
    image: KiyamImage,
    description: "Eller bağlanır.\nSübhaneke okunur.\nFâtiha Sûresi okunur.\nArdından zamm-ı sûre okunur.\n(Zamm-ı sûre: Kuran'dan en az üç ayet veya bir kısa sure okumaktır.)",
    showImageOnly: false
  },
  {
    id: "ruku",
    title: "Rükû",
    subtitle: "Rükûya eğilirken:",
    image: RukuImage,
    description: "\"Allahu Ekber\"\n\"Sübhâne rabbiyel azîm\" (en az 3 defa)",
    showImageOnly: false
  },
  {
    id: "kavme",
    title: "Kavme (Rükûdan doğrulma)",
    subtitle: "Doğrulurken:",
    image: KavmeImage,
    description: "\"Semiallahu limen hamideh\"\n\nTam dik ayakta:\n\"Rabbenâ lekel hamd\"",
    showImageOnly: false
  },
  {
    id: "secde1",
    title: "1. Secde",
    subtitle: "Secdeye giderken:",
    image: SecdeImage,
    description: "\"Allahu Ekber\"\n\"Sübhâne rabbiyel a'lâ\" (en az 3 defa)",
    showImageOnly: false
  },
  {
    id: "celse",
    title: "Celse (İki Secde Arası) – Tekbir",
    subtitle: "Otururken:",
    image: CelseImage,
    description: "\"Allahu Ekber\"",
    showImageOnly: false
  },
  {
    id: "secde2",
    title: "2. Secde",
    subtitle: "İkinci secdeye inerken:",
    image: SecdeImage,
    description: "\"Allahu Ekber\"\n\"Sübhâne rabbiyel a'lâ\" (en az 3 defa)",
    showImageOnly: false
  },
  {
    id: "sonOturus",
    title: "Son Oturuş (Kâde-i Âhire)",
    subtitle: null,
    image: CelseImage,
    description: "• Ettehiyyatü\n• Salli\n• Barik\n• Rabbena",
    showImageOnly: false
  },
  {
    id: "sonOturusSelam",
    title: "Son Oturuş (Kâde-i Âhire)",
    subtitle: null,
    image: SelamImage,
    description: "Sağa:\n\"Esselâmü aleyküm ve rahmetullah\"\nSola:\n\"Esselâmü aleyküm ve rahmetullah\"",
    showImageOnly: false
  },
  {
    id: "selam",
    title: "Selam",
    subtitle: null,
    image: SelamImage,
    description: "Namaz bitişinde:\n\"Esselamü aleyküm ve rahmetullah\" (sağa)\n\"Esselamü aleyküm ve rahmetullah\" (sola)",
    showImageOnly: false
  }
];

// Niyet metnini oluştur
const getNiyetDescription = (prayerName, prayerType) => {
  const prayerNameMap = {
    "Sabah namazı": "sabah namazının",
    "Öğle namazı": "öğle namazının",
    "İkindi namazı": "ikindi namazının",
    "Akşam namazı": "akşam namazının",
    "Yatsı namazı": "yatsı namazının"
  };

  const prayerTypeMap = {
    "Sünnet": "sünnetini",
    "Farz": "farzını",
    "Son Sünnet": "son sünnetini",
    "Vitir": "vitir namazını"
  };

  const name = prayerNameMap[prayerName] || "namazın";
  const type = prayerTypeMap[prayerType] || "sünnetini";

  return `Niyet ettim Allah rızası için ${name} ${type} kılmaya.`;
};

// Rekât adımlarını oluştur
const getRekatSteps = (rekatNumber, totalSectionRekats, prayerType, prayerName) => {
  const steps = [];
  const isFirstRekat = rekatNumber === 1;
  const isLastRekat = rekatNumber === totalSectionRekats;
  const isSecondRekatOfLongPrayer = rekatNumber === 2 && totalSectionRekats > 2;

  // Gayri Müekked Sünnet Kontrolü (İkindi Sünneti ve Yatsı İlk Sünneti)
  const isGayriMuekked = (prayerName === "İkindi namazı" && prayerType === "Sünnet") ||
    (prayerName === "Yatsı namazı" && prayerType === "Sünnet");

  // 1. BAŞLANGIÇ (Sadece ilk rekatta)
  if (isFirstRekat) {
    steps.push(prayerSteps.find(s => s.id === "takbir"));
    // Niyet
    const niyetStep = prayerSteps.find(s => s.id === "niyet");
    if (niyetStep) {
      const niyetDescription = getNiyetDescription(prayerName, prayerType);
      steps.push({ ...niyetStep, description: niyetDescription });
    }
    steps.push(prayerSteps.find(s => s.id === "iftitah"));
  }

  // 2. KIYAM
  const kiyamStep = prayerSteps.find(s => s.id === "kiyam");
  if (kiyamStep) {
    let readings = "Eller bağlanır.\n";

    // Sübhaneke: 1. rekatta okunur. Ayrıca Gayri Müekked sünnetlerin 3. rekatında da okunur.
    const shouldReadSubhaneke = isFirstRekat || (rekatNumber === 3 && isGayriMuekked);

    // Fatiha: Her rekatta okunur.

    // Zamm-ı Sûre: 
    // - Sünnet/Vitir: Her rekatta okunur.
    // - Farz: Sadece ilk 2 rekatta okunur.
    const shouldReadZammiSure = (prayerType !== "Farz") || (rekatNumber <= 2);

    if (shouldReadSubhaneke) readings += "Sübhaneke okunur.\n";
    readings += "Fâtiha Sûresi okunur.\n";
    if (shouldReadZammiSure) {
      readings += "Ardından zamm-ı sûre okunur.\n(Zamm-ı sûre: Kuran'dan en az üç ayet veya bir kısa sure okumaktır.)";
    } else {
      readings += "(Farz namazların 3. ve 4. rekatında zamm-ı sûre okunmaz, sadece Fatiha okunur.)";
    }

    steps.push({ ...kiyamStep, description: readings });
  }

  // 3. RÜKÛ
  steps.push(prayerSteps.find(s => s.id === "ruku"));

  // 4. KAVME
  steps.push(prayerSteps.find(s => s.id === "kavme"));

  // 5. SECDE 1 - CELSE - SECDE 2 (Standart Sıralama)
  const secde1Step = prayerSteps.find(s => s.id === "secde1");
  if (secde1Step) steps.push({ ...secde1Step, subtitle: "Secdeye giderken:" });

  steps.push(prayerSteps.find(s => s.id === "celse"));

  const secde2Step = prayerSteps.find(s => s.id === "secde2");
  if (secde2Step) steps.push({ ...secde2Step, subtitle: "İkinci secdeye inerken:" });

  // 6. OTURUŞLAR

  // İlk Oturuş (Kade-i Ula) - 3 veya 4 rekatlı namazların 2. rekatında
  if (isSecondRekatOfLongPrayer) {
    const oturusuStep = prayerSteps.find(s => s.id === "sonOturus"); // Görsel aynı
    // Gayri müekkedlerde Salli/Barik de okunur, diğerlerinde sadece Ettehiyyatü
    const description = isGayriMuekked
      ? "İlk Oturuş:\n• Ettehiyyatü\n• Salli\n• Barik\nOkunur ve 3. rekata kalkılır."
      : "İlk Oturuş:\n• Sadece Ettehiyyatü okunur ve 3. rekata kalkılır.";

    steps.push({
      ...oturusuStep,
      title: "İlk Oturuş (Kâde-i Ûlâ)",
      description
    });
  }

  // Son Oturuş (Kade-i Ahire) - Son rekatta
  if (isLastRekat) {
    steps.push(prayerSteps.find(s => s.id === "sonOturus"));
    steps.push(prayerSteps.find(s => s.id === "sonOturusSelam"));
  }

  return steps.filter(Boolean);
};

export default function NamazOgren() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedPrayer, setSelectedPrayer] = useState(null);
  const [currentRekatIndex, setCurrentRekatIndex] = useState(0);
  const horizontalScrollRef = useRef(null);
  const verticalScrollRefs = useRef({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const getRekats = useCallback(() => {
    if (!selectedPrayer) return [];

    const rekats = [];
    let globalRekatNumber = 1;

    selectedPrayer.structure.forEach((section) => {
      for (let i = 0; i < section.rekats; i++) {
        const sectionRekatNumber = i + 1;

        rekats.push({
          number: sectionRekatNumber,
          globalNumber: globalRekatNumber,
          type: section.type,
          isLast: globalRekatNumber === selectedPrayer.rekats,
          isLastOfSection: i === section.rekats - 1,
          steps: getRekatSteps(sectionRekatNumber, section.rekats, section.type, selectedPrayer.name)
        });
        globalRekatNumber++;
      }
    });
    return rekats;
  }, [selectedPrayer]);

  const rekats = getRekats();

  // Scroll senkronizasyonu için useEffect'ler kaldırıldı:
  // Artık sadece kullanıcı manuel kaydırdığında veya butonlara bastığında işlem yapılıyor.


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Yükleniyor...</Text>
      </View>
    );
  }

  if (!user) {
    router.replace('/(auth)/login');
    return null;
  }

  return (
    <ScreenBackground>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
            activeOpacity={0.7}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>NAMAZ</Text>
          <View style={styles.headerSpacer} />
        </View>

        {/* Content */}
        <View style={styles.contentContainer}>
          {/* Intro & Selection (When no prayer selected) */}
          {!selectedPrayer && (
            <ScrollView style={styles.introScroll} contentContainerStyle={styles.introContent}>
              {/* Title */}
              <Text style={styles.mainTitle}>Namaz Kılma Rehberi</Text>

              {/* Subtitle */}
              <Text style={styles.subtitle}>Seçtiğiniz namazın kılınışını adım adım öğrenin.</Text>

              {/* Dropdown */}
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setDropdownOpen(!dropdownOpen)}
                activeOpacity={0.8}
              >
                <Text style={styles.dropdownText}>
                  {selectedPrayer ? `${selectedPrayer.name} (${selectedPrayer.rekats} rekât)` : "Namaz seçiniz"}
                </Text>
                <Ionicons
                  name={dropdownOpen ? "chevron-up" : "chevron-down"}
                  size={20}
                  color="#fff"
                />
              </TouchableOpacity>

              {/* Prayer List */}
              {dropdownOpen && (
                <View style={styles.prayerList}>
                  {prayers.map((prayer, index) => (
                    <View key={prayer.id}>
                      <TouchableOpacity
                        style={styles.prayerItem}
                        onPress={() => {
                          setSelectedPrayer(prayer);
                          setDropdownOpen(false);
                          setCurrentRekatIndex(0);
                        }}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.prayerItemText}>
                          {prayer.name} ({prayer.rekats} rekât)
                        </Text>
                      </TouchableOpacity>
                      {index < prayers.length - 1 && <View style={styles.prayerDivider} />}
                    </View>
                  ))}
                </View>
              )}
            </ScrollView>
          )}

          {/* Horizontal Scroll - Rekâtlar */}
          {selectedPrayer && rekats.length > 0 && (
            <ScrollView
              ref={horizontalScrollRef}
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={(event) => {
                const offsetX = event.nativeEvent.contentOffset.x;
                const index = Math.round(offsetX / SCREEN_WIDTH);
                // Anlık olarak UI güncelle, kaydırır kaydırmaz değişsin
                if (index !== currentRekatIndex && index >= 0 && index < rekats.length) {
                  setCurrentRekatIndex(index);
                  if (dropdownOpen) setDropdownOpen(false); // Close dropdown on swipe
                }
              }}
              onMomentumScrollEnd={(event) => {
                const offsetX = event.nativeEvent.contentOffset.x;
                const index = Math.round(offsetX / SCREEN_WIDTH);
                if (index >= 0 && index < rekats.length) {
                  setCurrentRekatIndex(index);
                  if (dropdownOpen) setDropdownOpen(false);
                }
              }}
              scrollEventThrottle={16}
              style={styles.horizontalScroll}
              decelerationRate="fast"
              snapToInterval={SCREEN_WIDTH}
              snapToAlignment="start"
            >
              {rekats.map((rekat, rekatIndex) => (
                <View key={rekatIndex} style={styles.rekatContainer}>
                  <ScrollView
                    ref={(ref) => {
                      if (ref) verticalScrollRefs.current[rekatIndex] = ref;
                    }}
                    style={styles.verticalScroll}
                    contentContainerStyle={styles.verticalScrollContent}
                    showsVerticalScrollIndicator={false}
                  >
                    {/* Header Elements Inside ScrollView */}
                    <View style={{ paddingBottom: spacing(10) }}>
                      <Text style={styles.mainTitle}>Namaz Kılma Rehberi</Text>
                      <Text style={styles.subtitle}>Seçtiğiniz namazın kılınışını adım adım öğrenin.</Text>

                      <TouchableOpacity
                        style={styles.dropdown}
                        onPress={() => setDropdownOpen(!dropdownOpen)}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.dropdownText}>
                          {selectedPrayer ? `${selectedPrayer.name} (${selectedPrayer.rekats} rekât)` : "Namaz seçiniz"}
                        </Text>
                        <Ionicons
                          name={dropdownOpen ? "chevron-up" : "chevron-down"}
                          size={20}
                          color="#fff"
                        />
                      </TouchableOpacity>

                      {dropdownOpen && (
                        <View style={styles.prayerList}>
                          {prayers.map((prayer, index) => (
                            <View key={prayer.id}>
                              <TouchableOpacity
                                style={styles.prayerItem}
                                onPress={() => {
                                  setSelectedPrayer(prayer);
                                  setDropdownOpen(false);
                                  setCurrentRekatIndex(0);
                                }}
                                activeOpacity={0.8}
                              >
                                <Text style={styles.prayerItemText}>
                                  {prayer.name} ({prayer.rekats} rekât)
                                </Text>
                              </TouchableOpacity>
                              {index < prayers.length - 1 && <View style={styles.prayerDivider} />}
                            </View>
                          ))}
                        </View>
                      )}

                      <View style={styles.rekatNav}>
                        <TouchableOpacity
                          style={styles.rekatNavButton}
                          onPress={() => {
                            if (currentRekatIndex > 0) {
                              const newIndex = currentRekatIndex - 1;
                              horizontalScrollRef.current?.scrollTo({
                                x: newIndex * SCREEN_WIDTH,
                                animated: true
                              });
                              setCurrentRekatIndex(newIndex);
                            }
                          }}
                          disabled={currentRekatIndex === 0}
                        >
                          <Ionicons name="chevron-back" size={20} color={currentRekatIndex === 0 ? "rgba(255,255,255,0.3)" : "#fff"} />
                        </TouchableOpacity>
                        <View style={{ flexDirection: "column", alignItems: "center" }}>
                          <Text style={styles.rekatNavText}>
                            {rekats[currentRekatIndex]?.number || currentRekatIndex + 1}. Rekât
                          </Text>
                          <Text style={styles.rekatTypeText}>
                            {rekats[currentRekatIndex]?.type}
                          </Text>
                        </View>
                        <TouchableOpacity
                          style={styles.rekatNavButton}
                          onPress={() => {
                            if (currentRekatIndex < rekats.length - 1) {
                              const newIndex = currentRekatIndex + 1;
                              horizontalScrollRef.current?.scrollTo({
                                x: newIndex * SCREEN_WIDTH,
                                animated: true
                              });
                              setCurrentRekatIndex(newIndex);
                            }
                          }}
                          disabled={currentRekatIndex === rekats.length - 1}
                        >
                          <Ionicons name="chevron-forward" size={20} color={currentRekatIndex === rekats.length - 1 ? "rgba(255,255,255,0.3)" : "#fff"} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {rekat.steps.map((step, stepIndex) => {
                      if (step && step.showImageOnly && step.image) {
                        return (
                          <View key={stepIndex} style={styles.stepScreen}>
                            <View style={styles.imageCard}>
                              <Image source={step.image} style={styles.stepImage} resizeMode="contain" />
                            </View>
                          </View>
                        );
                      }
                      return (
                        <View key={stepIndex}>
                          <View style={styles.stepScreen}>
                            {step.image && (
                              <View style={styles.imageCard}>
                                <Image source={step.image} style={styles.stepImage} resizeMode="contain" />
                              </View>
                            )}
                            {step.description && (
                              <View style={styles.stepCard}>
                                <Text style={styles.stepTitle}>{step.title}</Text>
                                {step.subtitle && <Text style={styles.stepSubtitle}>{step.subtitle}</Text>}
                                <Text style={styles.stepDescription}>
                                  {step.description}
                                </Text>
                              </View>
                            )}
                          </View>
                          {stepIndex < rekat.steps.length - 1 && step.id !== 'niyet' && <View style={styles.stepDivider} />}
                        </View>
                      );
                    })}
                  </ScrollView>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      </View>
    </ScreenBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: "#182723",
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#F8D58A",
    fontSize: fontSize(16),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: Platform.OS === "ios" ? spacing(50) : (StatusBar.currentHeight || 0) + spacing(10),
    paddingHorizontal: spacing(20),
    paddingBottom: spacing(20),
    zIndex: 10,
  },
  backButton: {
    width: spacing(40),
    height: spacing(40),
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: fontSize(24),
    fontFamily: "Cinzel-Black",
    color: "#fff",
    textAlign: "center",
  },
  headerSpacer: {
    width: spacing(40),
  },
  contentContainer: {
    flex: 1,
    zIndex: 2,
    // paddingHorizontal: spacing(20), // Removed global padding to allow full width scroll
  },
  mainTitle: {
    fontSize: fontSize(20),
    fontFamily: "PlusJakartaSans-Bold", // Was PlusJakarta-Medium (fallback to Bold or Regular?) Medium not loaded.
    color: "#FFFFFF",
    textAlign: "left",
    marginTop: spacing(20),
    marginBottom: spacing(8),
    paddingHorizontal: spacing(20),
  },
  subtitle: {
    fontSize: fontSize(14),
    fontFamily: "PlusJakartaSans-Regular", // Was PlusJakarta-Medium
    color: "rgba(255, 255, 255, 0.6)",
    textAlign: "left",
    marginBottom: spacing(24),
    lineHeight: fontSize(20),
    paddingHorizontal: spacing(20),
  },
  dropdown: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#172521",
    borderRadius: borderRadius(12),
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    width: wp(77.3),
    height: spacing(40),
    paddingHorizontal: spacing(16),
    marginBottom: spacing(12),
    alignSelf: "center",
  },
  dropdownText: {
    fontSize: fontSize(16),
    fontFamily: "PlusJakartaSans-Regular",
    color: "#FFFFFF",
    flex: 1,
  },
  prayerList: {
    marginTop: 0,
    width: wp(77.3),
    height: spacing(200),
    alignSelf: "center",
    backgroundColor: "#172521",
    borderRadius: borderRadius(12),
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    paddingVertical: spacing(8),
    paddingHorizontal: 0,
    justifyContent: "center",
    zIndex: 20, // ensure its above other content if absolute
  },
  prayerItem: {
    backgroundColor: "transparent",
    height: spacing(36),
    paddingHorizontal: spacing(16),
    alignItems: "center",
    justifyContent: "center",
  },
  prayerDivider: {
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    marginHorizontal: spacing(16),
  },
  prayerItemText: {
    fontSize: fontSize(14),
    fontFamily: "PlusJakartaSans-Light",
    color: "#FFFFFF",
    textAlign: "center",
  },
  rekatNav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing(20),
    marginBottom: spacing(16),
    marginTop: spacing(12),
    width: "100%",
    alignSelf: "center",
  },
  rekatNavButton: {
    width: spacing(40),
    height: spacing(40),
    justifyContent: "center",
    alignItems: "center",
  },
  rekatNavText: {
    fontSize: fontSize(16),
    fontFamily: "PlusJakartaSans-Bold", // Was SemiBold, using Bold as substitute
    color: "#FFFFFF",
    textAlign: "center",
  },
  rekatTypeText: {
    fontSize: fontSize(12),
    fontFamily: "PlusJakartaSans-Regular",
    color: "rgba(255, 255, 255, 0.7)",
    textAlign: "center",
    marginTop: spacing(4),
  },
  horizontalScroll: {
    flex: 1,
    width: SCREEN_WIDTH,
  },
  rekatContainer: {
    width: SCREEN_WIDTH,
    height: '100%',
  },
  verticalScroll: {
    width: SCREEN_WIDTH,
    height: '100%',
  },
  verticalScrollContent: {
    paddingBottom: spacing(40),
  },
  stepScreen: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 0, // Reduced to 0 to move image up closer to divider
    paddingBottom: spacing(20), // Restored to 20 to keep rectangle spacing consistent
    paddingHorizontal: spacing(20),
  },
  imageCard: {
    width: wp(77.3),
    height: spacing(400),
    backgroundColor: "transparent",
    marginBottom: spacing(10), // Reduced to 10px as requested
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  stepImage: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
  stepCard: {
    backgroundColor: "#172521",
    borderRadius: borderRadius(12),
    padding: spacing(20),
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
    width: wp(77.3),
    minHeight: spacing(120),
    alignSelf: "center",
  },
  stepTitle: {
    fontSize: fontSize(18),
    fontFamily: "PlusJakartaSans-Bold",
    color: "#FFFFFF",
    marginBottom: spacing(8),
    textAlign: "center",
  },
  stepSubtitle: {
    fontSize: fontSize(14),
    fontFamily: "PlusJakartaSans-Bold",
    color: "#FFFFFF",
    marginBottom: spacing(12),
    textAlign: "center",
  },
  stepDescription: {
    fontSize: fontSize(14),
    fontFamily: "PlusJakartaSans-Regular",
    color: "#FFFFFF",
    lineHeight: fontSize(22),
    textAlign: "center",
  },
  introScroll: {
    flex: 1,
    width: "100%",
  },
  introContent: {
    paddingBottom: spacing(40),
    alignItems: "center", // Align items to center
  },
  stepDivider: {
    width: wp(80),
    height: 1,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignSelf: "center",
    marginVertical: spacing(10), // Restored to 10px
  },
});
