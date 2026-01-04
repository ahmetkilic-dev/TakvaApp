import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Vibration, Platform, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import Svg, { Path, Circle, Text as SvgText, Line } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import QiblaBgSvg from '../../../assets/images/home-bg.svg';
import KaabaSvg from '../../../assets/images/kaaba.svg';
import { useLocation } from '../../../contexts/LocationContext';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    useAnimatedReaction,
    runOnJS,
    Easing
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');
const COMPASS_SIZE = width * 0.75;

// Kabe koordinatları
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

// Arka Plan Deseni - Memoized
const BackgroundPattern = React.memo(() => (
    <View style={styles.patternContainer}>
        <QiblaBgSvg width={width} height={height} preserveAspectRatio="xMidYMid slice" />
    </View>
));

// Pusula Yüzü Çizimi - Memoized
// Pusula Yüzü Çizimi - Single Path Optimization
const CompassFace = React.memo(({ size }) => {
    const center = size / 2;
    const outerR = size / 2 - 10;
    const innerR = outerR - 30;
    const directions = [{ label: 'K', angle: 0 }, { label: 'D', angle: 90 }, { label: 'G', angle: 180 }, { label: 'B', angle: 270 }];

    // 72 çizgiyi tek bir Path string'i olarak hesapla (Performans için kritik)
    const ticksPath = React.useMemo(() => {
        let d = '';
        for (let i = 0; i < 72; i++) {
            const degree = i * 5;
            const angle = (degree * Math.PI) / 180;
            const isMajor = degree % 90 === 0;
            const isMedium = degree % 30 === 0;

            let startR = innerR + 5;
            let endR = innerR + 12;

            if (isMajor) {
                startR = innerR - 5;
                endR = innerR + 18;
            } else if (isMedium) {
                endR = innerR + 15;
            }

            const x1 = center + startR * Math.sin(angle);
            const y1 = center - startR * Math.cos(angle);
            const x2 = center + endR * Math.sin(angle);
            const y2 = center - endR * Math.cos(angle);

            d += `M${x1.toFixed(1)},${y1.toFixed(1)} L${x2.toFixed(1)},${y2.toFixed(1)} `;
        }
        return d;
    }, [center, innerR]);

    return (
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Dış Çemberler */}
            <Circle cx={center} cy={center} r={outerR} fill="#F0F7FE" fillOpacity={0.95} stroke="#96D0D0" strokeWidth={8} />
            <Circle cx={center - 5} cy={center - 5} r={outerR - 20} fill="white" fillOpacity={0.5} />

            {/* Tek Path ile 72 Çizgi */}
            <Path d={ticksPath} stroke="rgba(0,0,0,0.3)" strokeWidth={1.5} strokeLinecap="round" />

            {/* Yön Harfleri */}
            {directions.map((dir, i) => {
                const angle = (dir.angle * Math.PI) / 180;
                const textR = innerR - 25;
                const x = center + textR * Math.sin(angle);
                const y = center - textR * Math.cos(angle);
                return <SvgText key={i} x={x} y={y + 8} fill={dir.label === 'K' ? '#E74C3C' : '#4A90A4'} fontSize={24} fontWeight="bold" textAnchor="middle">{dir.label}</SvgText>;
            })}

            {/* İç Çember */}
            <Circle cx={center} cy={center} r={innerR - 45} fill="#E8F4F8" stroke="#B8D8D8" strokeWidth={2} />
        </Svg>
    );
});

// İğne Çizimi - Memoized
const CompassNeedle = React.memo(({ size }) => (
    <Svg width={size * 0.35} height={size * 0.35} viewBox="0 0 100 100">
        <Path d="M50 15 L58 48 L50 44 L42 48 Z" fill="#E74C3C" />
        <Path d="M50 85 L58 52 L50 56 L42 52 Z" fill="#CCCCCC" />
        <Circle cx="50" cy="50" r="6" fill="#444" />
        <Circle cx="50" cy="50" r="3" fill="#888" />
    </Svg>
));

// İzin Ekranı
const LocationPermissionRequired = ({ onRetry, router }) => (
    <View style={styles.container}>
        <BackgroundPattern />
        <SafeAreaView edges={['top']} style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="chevron-back" size={28} color="white" />
                </TouchableOpacity>
                <Text style={styles.title}>KIBLE</Text>
                <View style={styles.placeholder} />
            </View>
            <View style={styles.permissionContainer}>
                <View style={styles.permissionIconContainer}>
                    <Ionicons name="location-outline" size={80} color="#FF6B6B" />
                </View>
                <Text style={styles.permissionTitle}>Konum İzni Gerekli</Text>
                <Text style={styles.permissionDescription}>Kıble yönünü doğru hesaplayabilmemiz için konum bilginize ihtiyacımız var.</Text>
                <TouchableOpacity style={styles.retryButton} onPress={onRetry}>
                    <Ionicons name="location" size={20} color="#fff" />
                    <Text style={styles.retryButtonText}>Konum İzni Ver</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.backHomeButton} onPress={() => router.back()}>
                    <Text style={styles.backHomeButtonText}>Geri Dön</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    </View>
);

export default function QiblaScreen() {
    const router = useRouter();
    const { location: userLocation, city: userCity, district: userDistrict, hasPermission, isLoading: locationLoading, retryPermission } = useLocation();

    // Reanimated Shared Values
    const headingSv = useSharedValue(0);
    const smoothedHeading = useSharedValue(0);

    // JS State 
    const [displayHeading, setDisplayHeading] = useState(0);
    const [qiblaAngle, setQiblaAngle] = useState(null);
    const [distance, setDistance] = useState(null);
    const [isQiblaDirection, setIsQiblaDirection] = useState(false);
    const [currentTime, setCurrentTime] = useState('');
    const [compassStarted, setCompassStarted] = useState(false);
    const [mounted, setMounted] = useState(false);

    const subscriptionRef = useRef(null);
    const lastVibration = useRef(0);
    const qiblaAngleRef = useRef(null);

    // Keep ref in sync with state
    useEffect(() => {
        qiblaAngleRef.current = qiblaAngle;
    }, [qiblaAngle]);

    // --- HELPER FUNCTIONS (Defined before effects) ---

    const calculateDistance = (lat1, lng1, lat2, lng2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLng = (lng2 - lng1) * (Math.PI / 180);
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

    const calculateQiblaAngle = (lat, lng) => {
        const latRad = lat * (Math.PI / 180);
        const kaabaLatRad = KAABA_LAT * (Math.PI / 180);
        const kaabaLngRad = KAABA_LNG * (Math.PI / 180);
        const lngRad = lng * (Math.PI / 180);
        const y = Math.sin(kaabaLngRad - lngRad);
        const x = Math.cos(latRad) * Math.tan(kaabaLatRad) - Math.sin(latRad) * Math.cos(kaabaLngRad - lngRad);
        let qibla = Math.atan2(y, x) * (180 / Math.PI);
        return (qibla + 360) % 360;
    };

    // Lemaire Filter (Low Pass Filter) için değişkenler
    const PREV_HEADING = useRef(0);
    const ALPHA = 0.15;

    const getShortestDiff = (a, b) => {
        let diff = (b - a + 180) % 360 - 180;
        return diff < -180 ? diff + 360 : diff;
    };

    const startCompass = async () => {
        try {
            // Önceki abonelik varsa temizle
            if (subscriptionRef.current) {
                subscriptionRef.current.remove();
            }

            subscriptionRef.current = await Location.watchHeadingAsync((headingData) => {
                // IMPORTANT: Use True Heading if available (accurate for Qibla), otherwise Magnetic
                // Qibla API returns direction relative to True North.
                let heading = headingData.trueHeading >= 0 ? headingData.trueHeading : headingData.magHeading;

                // Fallback for safety
                if (heading === undefined || heading === null) heading = headingData.magHeading;

                let diff = getShortestDiff(PREV_HEADING.current, heading);
                if (Math.abs(diff) < 0.5) return;

                const newHeading = PREV_HEADING.current + (diff * ALPHA);
                const normalizedHeading = (newHeading + 360) % 360;

                PREV_HEADING.current = normalizedHeading;

                headingSv.value = normalizedHeading;
                smoothedHeading.value = withTiming(normalizedHeading, { duration: 150, easing: Easing.linear });

                // REF kullanarak en güncel açıyı al (Closure sorununu çözer)
                const targetAngle = qiblaAngleRef.current;

                if (targetAngle !== null) {
                    let angleDiff = Math.abs(normalizedHeading - targetAngle);
                    if (angleDiff > 180) angleDiff = 360 - angleDiff;

                    setDisplayHeading(Math.round(normalizedHeading));

                    setIsQiblaDirection(prevIsOn => {
                        const threshold = prevIsOn ? 4.5 : 2.5;
                        const newIsOn = angleDiff <= threshold;

                        if (newIsOn && !prevIsOn && Date.now() - lastVibration.current > 2000) {
                            Vibration.vibrate([0, 50, 50, 50]);
                            lastVibration.current = Date.now();
                        }

                        return newIsOn;
                    });
                } else {
                    setDisplayHeading(Math.round(normalizedHeading));
                }
            });
        } catch (error) {
            console.log('Pusula başlatma hatası:', error);
        }
    };

    const stopCompass = () => {
        if (subscriptionRef.current) {
            subscriptionRef.current.remove();
            subscriptionRef.current = null;
        }
    };

    const fetchQiblaDirection = async (latitude, longitude) => {
        try {
            const response = await fetch(`https://api.aladhan.com/v1/qibla/${latitude}/${longitude}`);
            const data = await response.json();
            if (data.code === 200 && data.data) {
                setQiblaAngle(data.data.direction);
                const dist = calculateDistance(latitude, longitude, KAABA_LAT, KAABA_LNG);
                setDistance(Math.round(dist));
            }
        } catch (error) {
            const manualQibla = calculateQiblaAngle(latitude, longitude);
            setQiblaAngle(manualQibla);
        }
    };

    const initializeQibla = async () => {
        if (!userLocation) return;
        const { latitude, longitude } = userLocation;
        await fetchQiblaDirection(latitude, longitude);
        startCompass();
        setCompassStarted(true);
    };

    // --- ANIMATIONS ---

    const compassStyle = useAnimatedStyle(() => {
        return {
            transform: [{ rotate: `-${smoothedHeading.value}deg` }]
        };
    });

    const kabeStyle = useAnimatedStyle(() => {
        if (qiblaAngle === null) return { opacity: 0 };
        const rotation = qiblaAngle - smoothedHeading.value;
        return {
            transform: [{ rotate: `${rotation}deg` }],
            opacity: 1
        };
    });

    // --- EFFECTS ---

    // Mount delay
    useEffect(() => {
        const timer = setTimeout(() => {
            setMounted(true);
        }, 300);
        return () => clearTimeout(timer);
    }, []);

    // Time update & Cleanup
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const h = now.getHours().toString().padStart(2, '0');
            const m = now.getMinutes().toString().padStart(2, '0');
            setCurrentTime(`${h}:${m}`);
        };
        updateTime();
        const timer = setInterval(updateTime, 10000);
        return () => {
            stopCompass();
            clearInterval(timer);
        };
    }, []);

    // Initialize when ready
    useEffect(() => {
        if (mounted && hasPermission && userLocation && !compassStarted) {
            initializeQibla();
        }
    }, [mounted, hasPermission, userLocation, compassStarted]);


    if (locationLoading || !mounted) {
        return (
            <View style={styles.container}>
                <BackgroundPattern />
                <SafeAreaView edges={['top']} style={[styles.safeArea, styles.loadingContainer]}>
                    <ActivityIndicator size="large" color="#4ECDC4" />
                    <Text style={[styles.loadingText, { marginTop: 10 }]}>
                        {locationLoading ? 'Konum alınıyor...' : 'Pusula hazırlanıyor...'}
                    </Text>
                </SafeAreaView>
            </View>
        );
    }

    if (!hasPermission) {
        return <LocationPermissionRequired onRetry={retryPermission} router={router} />;
    }

    return (
        <View style={[styles.container, isQiblaDirection && styles.containerQibla]}>
            <BackgroundPattern />

            {/* KATMAN 1: PUSULA (TAM EKRAN ORTASI - Absolute Center) */}
            <View style={styles.absoluteCenterLayer}>
                <View style={styles.outerRing}>
                    {/* Kabe İkonu - Halkanın Dışında - Reanimated */}
                    {qiblaAngle !== null && (
                        <Animated.View style={[styles.qiblaIndicator, kabeStyle]}>
                            <View style={styles.qiblaIconOuter}>
                                <KaabaSvg width={40} height={40} />
                            </View>
                        </Animated.View>
                    )}

                    {/* Pusula İçi - Reanimated */}
                    <Animated.View style={[styles.compassInner, compassStyle]}>
                        <CompassFace size={COMPASS_SIZE} />
                    </Animated.View>

                    <View style={styles.needleContainer}>
                        <CompassNeedle size={COMPASS_SIZE} />
                    </View>
                </View>
            </View>

            {/* KATMAN 2: ARAYÜZ (HEADER VE BOTTOM FOOTER) */}
            <SafeAreaView edges={['top', 'bottom']} style={styles.safeArea} pointerEvents="box-none">

                {/* Header */}
                <View pointerEvents="auto">
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                            <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                                <Path d="M15 18L9 12L15 6" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </Svg>
                        </TouchableOpacity>
                        <Text style={styles.title}>KIBLE</Text>
                        <View style={styles.placeholder} />
                    </View>

                    <View style={styles.cityContainer}>
                        <Text style={styles.cityName}>{userCity || 'Konum...'}</Text>
                        <View style={styles.locationRow}>
                            {userDistrict && (
                                <View style={styles.infoRow}>
                                    <Ionicons name="location-sharp" size={14} color="#8BA89E" />
                                    <Text style={styles.infoRowText}>{userDistrict}</Text>
                                </View>
                            )}
                            <View style={styles.infoRow}>
                                <Ionicons name="time-outline" size={14} color="#8BA89E" />
                                <Text style={styles.infoRowText}>{currentTime}</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Boşluk Bırakıcı (Orta alan pusulaya aittir) */}
                <View style={{ flex: 1 }} pointerEvents="none" />

                {/* ALT KISIM (BİLGİLER + FOOTER) - En Alta Yaslandı */}
                <View style={styles.bottomSection} pointerEvents="auto">

                    {/* Bilgi Kutusu */}
                    <View style={styles.infoContent}>
                        {isQiblaDirection ? (
                            <View style={styles.qiblaFoundBanner}>
                                <Text style={styles.qiblaFoundText}>🕋 Kıble Yönündesiniz</Text>
                            </View>
                        ) : (
                            <Text style={styles.degree}>{displayHeading}°</Text>
                        )}

                        {/* Mesafe ve Açı Bilgisi */}
                        {distance && (
                            <View style={{ alignItems: 'center' }}>
                                <Text style={[styles.subInfo, { color: '#FFFFFF' }]}>
                                    Kâbe'ye uzaklık: {distance.toLocaleString('tr-TR')} km
                                </Text>
                                {qiblaAngle !== null && (
                                    <Text style={styles.subInfo}>
                                        Kıble Açısı: {Math.round(qiblaAngle)}°
                                    </Text>
                                )}
                            </View>
                        )}
                    </View>

                    {/* Footer Metni */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            Kıble, Müslümanların namazda yöneldiği{'\n'}Kâbe istikametidir.
                        </Text>
                    </View>
                </View>

            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#0F1E1E' },
    containerQibla: { backgroundColor: '#0F251F' },
    patternContainer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 },
    safeArea: { flex: 1 },

    absoluteCenterLayer: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 0,
    },

    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingTop: 8, paddingBottom: 8 },
    backButton: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
    title: { fontFamily: 'Cinzel-Black', color: '#FFFFFF', fontSize: 24, textAlign: 'center', letterSpacing: -2 },
    placeholder: { width: 36 },
    cityContainer: { alignItems: 'center', paddingVertical: 10 },
    cityName: { fontSize: 34, fontWeight: '300', color: 'white' },
    locationRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8, gap: 20 },
    infoRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
    infoRowText: { fontSize: 13, color: '#8BA89E' },

    outerRing: {
        width: COMPASS_SIZE + 50,
        height: COMPASS_SIZE + 50,
        borderRadius: (COMPASS_SIZE + 50) / 2,
        backgroundColor: '#2A4A4A',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4,
        borderColor: '#3D6B6B',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 15 },
        shadowOpacity: 0.4,
        shadowRadius: 25,
        elevation: 20,
    },
    qiblaIndicator: { position: 'absolute', width: COMPASS_SIZE + 50, height: COMPASS_SIZE + 50, alignItems: 'center', zIndex: 10 },
    qiblaIconOuter: {
        position: 'absolute',
        top: -15,
        alignItems: 'center',
        justifyContent: 'center'
    },
    compassInner: { width: COMPASS_SIZE, height: COMPASS_SIZE },
    needleContainer: { position: 'absolute', alignItems: 'center', justifyContent: 'center' },

    bottomSection: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 5,
    },
    infoContent: {
        alignItems: 'center',
        marginBottom: 8,
        minHeight: 80,
        justifyContent: 'flex-end',
    },
    degree: {
        fontSize: 52,
        fontWeight: '200',
        color: 'white',
        fontVariant: ['tabular-nums'],
    },
    qiblaFoundBanner: {
        backgroundColor: 'rgba(76, 175, 80, 0.15)',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 14,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(76, 175, 80, 0.3)',
        minHeight: 50,
        justifyContent: 'center',
    },
    qiblaFoundText: { fontSize: 14, fontWeight: '600', color: '#4CAF50' },
    subInfo: { fontSize: 13, color: '#8BA89E', marginTop: 4 },

    footer: { paddingHorizontal: 40, alignItems: 'center' },
    footerText: { fontSize: 14, color: '#5A7A70', textAlign: 'center', lineHeight: 20 },

    loadingContainer: { justifyContent: 'center', alignItems: 'center' },
    loadingText: { color: '#8BA89E', fontSize: 18 },
    permissionContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 40 },
    permissionIconContainer: { width: 140, height: 140, borderRadius: 70, backgroundColor: 'rgba(255, 107, 107, 0.15)', justifyContent: 'center', alignItems: 'center', marginBottom: 30, borderWidth: 2, borderColor: 'rgba(255, 107, 107, 0.3)' },
    permissionTitle: { fontSize: 26, fontWeight: '700', color: '#fff', marginBottom: 16, textAlign: 'center' },
    permissionDescription: { fontSize: 16, color: '#B8C9C0', textAlign: 'center', lineHeight: 24, marginBottom: 12 },
    retryButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#4ECDC4', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 30, gap: 10, marginBottom: 16 },
    retryButtonText: { fontSize: 16, fontWeight: '600', color: '#fff' },
    backHomeButton: { paddingVertical: 12, paddingHorizontal: 24 },
});