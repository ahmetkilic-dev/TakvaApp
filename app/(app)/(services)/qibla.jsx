import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Animated, Easing, Vibration, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import Svg, { Path, Defs, LinearGradient, Stop, Circle, G, Text as SvgText, Line, Rect } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const COMPASS_SIZE = width * 0.75;

// Kabe koordinatları
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

// Kıble toleransı (derece) - Kullanıcı bu açı aralığında Kıble yönünde sayılır
const QIBLA_TOLERANCE = 5;

// Kabe İkonu Bileşeni
const KaabaIcon = ({ size = 20 }) => (
    <Svg width={size} height={size} viewBox="0 0 24 24">
        {/* Kabe binası */}
        <Rect x="4" y="6" width="16" height="14" fill="white" rx="1" />
        {/* Kapı */}
        <Rect x="9" y="12" width="6" height="8" fill="#2A2A2A" rx="0.5" />
        {/* Hacer-ül Esved köşesi */}
        <Circle cx="4" cy="14" r="2" fill="#FFD700" />
        {/* Üst örtü çizgisi */}
        <Path d="M4 8 L20 8" stroke="#FFD700" strokeWidth="1.5" />
        {/* Kabe yazısı süsü */}
        <Path d="M6 10 L18 10" stroke="rgba(0,0,0,0.3)" strokeWidth="0.5" />
    </Svg>
);

// Dekoratif arka plan deseni (qıbla-bg.svg benzeri)
const BackgroundPattern = () => (
    <View style={styles.patternContainer}>
        <Svg width={width} height={height * 0.5} viewBox="0 0 400 400">
            <Defs>
                <LinearGradient id="bgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <Stop offset="0%" stopColor="#1a3a3a" stopOpacity="0.9" />
                    <Stop offset="100%" stopColor="#0d1f1f" stopOpacity="0" />
                </LinearGradient>
            </Defs>
            
            {/* Ana mandala deseni */}
            {[...Array(24)].map((_, i) => {
                const angle = (i * 15 * Math.PI) / 180;
                const x1 = 200 + 40 * Math.cos(angle);
                const y1 = 180 + 40 * Math.sin(angle);
                const x2 = 200 + 160 * Math.cos(angle);
                const y2 = 180 + 160 * Math.sin(angle);
                return (
                    <G key={i}>
                        {/* Ana ışın çizgileri */}
                        <Line
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="rgba(139, 168, 158, 0.15)"
                            strokeWidth={1}
                        />
                        {/* Yaprak şekilleri */}
                        {i % 2 === 0 && (
                            <Path
                                d={`M ${200 + 70 * Math.cos(angle)} ${180 + 70 * Math.sin(angle)} 
                                   Q ${200 + 100 * Math.cos(angle + 0.15)} ${180 + 100 * Math.sin(angle + 0.15)} 
                                     ${200 + 130 * Math.cos(angle)} ${180 + 130 * Math.sin(angle)}
                                   Q ${200 + 100 * Math.cos(angle - 0.15)} ${180 + 100 * Math.sin(angle - 0.15)}
                                     ${200 + 70 * Math.cos(angle)} ${180 + 70 * Math.sin(angle)}`}
                                fill="rgba(139, 168, 158, 0.08)"
                                stroke="rgba(139, 168, 158, 0.12)"
                                strokeWidth={0.5}
                            />
                        )}
                    </G>
                );
            })}
            
            {/* İç daireler */}
            <Circle cx="200" cy="180" r="35" stroke="rgba(139, 168, 158, 0.1)" strokeWidth={1} fill="none" />
            <Circle cx="200" cy="180" r="70" stroke="rgba(139, 168, 158, 0.08)" strokeWidth={1} fill="none" />
            <Circle cx="200" cy="180" r="105" stroke="rgba(139, 168, 158, 0.06)" strokeWidth={1} fill="none" />
            <Circle cx="200" cy="180" r="140" stroke="rgba(139, 168, 158, 0.04)" strokeWidth={1} fill="none" />
            
            {/* Köşe süsleri */}
            {[0, 90, 180, 270].map((deg, i) => {
                const angle = (deg * Math.PI) / 180;
                return (
                    <G key={`corner${i}`}>
                        <Circle
                            cx={200 + 50 * Math.cos(angle)}
                            cy={180 + 50 * Math.sin(angle)}
                            r={4}
                            fill="rgba(139, 168, 158, 0.15)"
                        />
                        <Circle
                            cx={200 + 90 * Math.cos(angle)}
                            cy={180 + 90 * Math.sin(angle)}
                            r={3}
                            fill="rgba(139, 168, 158, 0.12)"
                        />
                        <Circle
                            cx={200 + 125 * Math.cos(angle)}
                            cy={180 + 125 * Math.sin(angle)}
                            r={2}
                            fill="rgba(139, 168, 158, 0.1)"
                        />
                    </G>
                );
            })}
        </Svg>
    </View>
);

// Pusula Yüzü (qibla.svg tasarımına benzer)
const CompassFace = ({ size }) => {
    const center = size / 2;
    const outerR = size / 2 - 10;
    const innerR = outerR - 30;
    
    const directions = [
        { label: 'K', angle: 0 },
        { label: 'D', angle: 90 },
        { label: 'G', angle: 180 },
        { label: 'B', angle: 270 },
    ];

    return (
        <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Dış çerçeve */}
            <Circle
                cx={center}
                cy={center}
                r={outerR}
                fill="#F0F7FE"
                fillOpacity={0.95}
                stroke="#96D0D0"
                strokeWidth={8}
            />
            
            {/* İç gölge efekti */}
            <Circle
                cx={center - 5}
                cy={center - 5}
                r={outerR - 20}
                fill="white"
                fillOpacity={0.5}
            />

            {/* Derece çizgileri */}
            {[...Array(72)].map((_, i) => {
                const degree = i * 5;
                const angle = (degree * Math.PI) / 180;
                const isMajor = degree % 90 === 0;
                const isMedium = degree % 30 === 0;
                
                let startR = innerR + 5;
                let endR = innerR + 12;
                let strokeW = 1;
                let color = 'rgba(0,0,0,0.2)';
                
                if (isMajor) {
                    startR = innerR - 5;
                    endR = innerR + 18;
                    strokeW = 2;
                    color = 'rgba(0,0,0,0.5)';
                } else if (isMedium) {
                    endR = innerR + 15;
                    color = 'rgba(0,0,0,0.3)';
                }

                return (
                    <Line
                        key={i}
                        x1={center + startR * Math.sin(angle)}
                        y1={center - startR * Math.cos(angle)}
                        x2={center + endR * Math.sin(angle)}
                        y2={center - endR * Math.cos(angle)}
                        stroke={color}
                        strokeWidth={strokeW}
                    />
                );
            })}

            {/* Yön harfleri */}
            {directions.map((dir, i) => {
                const angle = (dir.angle * Math.PI) / 180;
                const textR = innerR - 25;
                const x = center + textR * Math.sin(angle);
                const y = center - textR * Math.cos(angle);

                return (
                    <SvgText
                        key={i}
                        x={x}
                        y={y + 8}
                        fill={dir.label === 'K' ? '#E74C3C' : '#4A90A4'}
                        fontSize={24}
                        fontWeight="bold"
                        textAnchor="middle"
                    >
                        {dir.label}
                    </SvgText>
                );
            })}

            {/* İç daire */}
            <Circle
                cx={center}
                cy={center}
                r={innerR - 45}
                fill="#E8F4F8"
                stroke="#B8D8D8"
                strokeWidth={2}
            />
        </Svg>
    );
};

// Pusula İğnesi
const CompassNeedle = ({ size }) => {
    const needleSize = size * 0.35;
    return (
        <Svg width={needleSize} height={needleSize} viewBox="0 0 100 100">
            {/* Kuzey (Kırmızı/Turuncu) */}
            <Path
                d="M50 15 L58 48 L50 44 L42 48 Z"
                fill="#E74C3C"
            />
            {/* Güney (Beyaz) */}
            <Path
                d="M50 85 L58 52 L50 56 L42 52 Z"
                fill="#CCCCCC"
            />
            {/* Merkez */}
            <Circle cx="50" cy="50" r="6" fill="#444" />
            <Circle cx="50" cy="50" r="3" fill="#888" />
        </Svg>
    );
};

export default function QiblaScreen() {
    const router = useRouter();
    const [heading, setHeading] = useState(0);
    const [qiblaAngle, setQiblaAngle] = useState(null);
    const [accuracy, setAccuracy] = useState(0);
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [distance, setDistance] = useState(null);
    const [isQiblaDirection, setIsQiblaDirection] = useState(false);
    const [currentTime, setCurrentTime] = useState('');
    
    const rotationAnim = useRef(new Animated.Value(0)).current;
    const currentRotation = useRef(0);
    const subscriptionRef = useRef(null);
    const lastVibration = useRef(0);

    useEffect(() => {
        initializeQibla();
        updateTime();
        const timeInterval = setInterval(updateTime, 1000);
        return () => {
            stopCompass();
            clearInterval(timeInterval);
        };
    }, []);

    const updateTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        setCurrentTime(`${hours}:${minutes}`);
    };

    useEffect(() => {
        if (qiblaAngle !== null) {
            let diff = Math.abs(heading - qiblaAngle);
            if (diff > 180) diff = 360 - diff;
            
            // QIBLA_TOLERANCE derece tolerans ile Kıble yönünde sayılır
            const isOnQibla = diff < QIBLA_TOLERANCE;
            setIsQiblaDirection(isOnQibla);
            
            if (isOnQibla && Date.now() - lastVibration.current > 1000) {
                Vibration.vibrate(100);
                lastVibration.current = Date.now();
            }
        }
    }, [heading, qiblaAngle]);

    const initializeQibla = async () => {
        try {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') return;

            const position = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High
            });
            
            const { latitude, longitude } = position.coords;
            await fetchQiblaDirection(latitude, longitude);
            
            try {
                const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
                if (geocode.length > 0) {
                    setCity(geocode[0].city || geocode[0].region || 'Bilinmiyor');
                    setDistrict(geocode[0].district || geocode[0].subregion || '');
                }
            } catch (e) {}

            startCompass();
        } catch (error) {
            console.log('Başlatma hatası:', error);
        }
    };

    const fetchQiblaDirection = async (latitude, longitude) => {
        try {
            const response = await fetch(
                `https://api.aladhan.com/v1/qibla/${latitude}/${longitude}`
            );
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

    const calculateQiblaAngle = (lat, lng) => {
        const latRad = lat * (Math.PI / 180);
        const kaabaLatRad = KAABA_LAT * (Math.PI / 180);
        const kaabaLngRad = KAABA_LNG * (Math.PI / 180);
        const lngRad = lng * (Math.PI / 180);
        
        const y = Math.sin(kaabaLngRad - lngRad);
        const x = Math.cos(latRad) * Math.tan(kaabaLatRad) - 
                  Math.sin(latRad) * Math.cos(kaabaLngRad - lngRad);
        
        let qibla = Math.atan2(y, x) * (180 / Math.PI);
        return (qibla + 360) % 360;
    };

    const calculateDistance = (lat1, lng1, lat2, lng2) => {
        const R = 6371;
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLng = (lng2 - lng1) * (Math.PI / 180);
        
        const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                  Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                  Math.sin(dLng / 2) * Math.sin(dLng / 2);
        
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    };

    const getShortestRotation = (from, to) => {
        let diff = to - from;
        while (diff > 180) diff -= 360;
        while (diff < -180) diff += 360;
        return from + diff;
    };

    const startCompass = async () => {
        try {
            subscriptionRef.current = await Location.watchHeadingAsync((headingData) => {
                const newHeading = headingData.trueHeading >= 0 
                    ? headingData.trueHeading 
                    : headingData.magHeading;
                
                setAccuracy(headingData.accuracy);
                setHeading(Math.round(newHeading));
                
                const targetRotation = getShortestRotation(currentRotation.current, -newHeading);
                currentRotation.current = targetRotation;
                
                Animated.timing(rotationAnim, {
                    toValue: targetRotation,
                    duration: 150,
                    easing: Easing.out(Easing.quad),
                    useNativeDriver: true,
                }).start();
            });
        } catch (error) {}
    };

    const stopCompass = () => {
        if (subscriptionRef.current) {
            subscriptionRef.current.remove();
            subscriptionRef.current = null;
        }
    };

    const rotateStyle = {
        transform: [{
            rotate: rotationAnim.interpolate({
                inputRange: [-360, 360],
                outputRange: ['-360deg', '360deg'],
            })
        }]
    };

    const qiblaIndicatorRotation = qiblaAngle !== null ? qiblaAngle - heading : 0;

    return (
        <View style={[styles.container, isQiblaDirection && styles.containerQibla]}>
            <BackgroundPattern />
            
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                            <Path
                                d="M15 18L9 12L15 6"
                                stroke="white"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </Svg>
                    </TouchableOpacity>
                    <Text style={styles.title}>KIBLE</Text>
                    <View style={{ width: 40 }} />
                </View>

                {/* Şehir bilgisi */}
                <View style={styles.cityContainer}>
                    <Text style={styles.cityName}>{city || 'Konum alınıyor...'}</Text>
                    <View style={styles.locationRow}>
                        {district ? (
                            <View style={styles.infoRow}>
                                <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                                    <Path
                                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                                        fill="#8BA89E"
                                    />
                                </Svg>
                                <Text style={styles.infoRowText}>{district}</Text>
                            </View>
                        ) : null}
                        <View style={styles.infoRow}>
                            <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                                <Circle cx="12" cy="12" r="9" stroke="#8BA89E" strokeWidth="2" fill="none" />
                                <Path d="M12 7v5l3 3" stroke="#8BA89E" strokeWidth="2" strokeLinecap="round" />
                            </Svg>
                            <Text style={styles.infoRowText}>{currentTime}</Text>
                        </View>
                    </View>
                </View>

                {/* Pusula */}
                <View style={styles.compassWrapper}>
                    {/* Dış halka */}
                    <View style={styles.outerRing}>
                        {/* Kıble işareti (Kabe ikonu) */}
                        {qiblaAngle !== null && (
                            <View 
                                style={[
                                    styles.qiblaIndicator,
                                    { transform: [{ rotate: `${qiblaIndicatorRotation}deg` }] }
                                ]}
                            >
                                <View style={styles.qiblaIconOuter}>
                                    <KaabaIcon size={22} />
                                </View>
                            </View>
                        )}
                        
                        {/* Dönen pusula yüzü */}
                        <Animated.View style={[styles.compassInner, rotateStyle]}>
                            <CompassFace size={COMPASS_SIZE} />
                        </Animated.View>
                        
                        {/* Sabit iğne */}
                        <View style={styles.needleContainer}>
                            <CompassNeedle size={COMPASS_SIZE} />
                        </View>
                    </View>
                </View>

                {/* Bilgiler */}
                <View style={styles.infoContainer}>
                    <Text style={styles.degree}>{heading}°</Text>
                    {distance && (
                        <Text style={styles.subInfo}>
                            Kâbe'ye uzaklık: {distance.toLocaleString('tr-TR')} km
                        </Text>
                    )}
                    {qiblaAngle !== null && (
                        <Text style={styles.subInfo}>
                            Kıble Açısı: {Math.round(qiblaAngle)}°
                        </Text>
                    )}
                </View>

                {/* Kıble bulundu */}
                {isQiblaDirection && (
                    <View style={styles.qiblaFoundBanner}>
                        <Text style={styles.qiblaFoundText}>🕋 Kıble Yönündesiniz</Text>
                    </View>
                )}

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        Kıble, Müslümanların namazda yöneldiği Kâbe istikametidir.
                    </Text>
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F1E1E',
    },
    containerQibla: {
        backgroundColor: '#0F251F',
    },
    patternContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    backButton: {
        padding: 8,
    },
    title: {
    fontFamily: 'Cinzel-Black',
    color: '#FFFFFF',
    fontSize: 24,
    textAlign: 'center',
    letterSpacing: -1,
    textShadowColor: 'rgba(255, 255, 255, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
    },
    cityContainer: {
        alignItems: 'center',
        paddingVertical: 16,
    },
    cityName: {
        fontSize: 34,
        fontWeight: '300',
        color: 'white',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        gap: 20,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    infoRowText: {
        fontSize: 13,
        color: '#8BA89E',
    },
    compassWrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
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
    qiblaIndicator: {
        position: 'absolute',
        width: COMPASS_SIZE + 50,
        height: COMPASS_SIZE + 50,
        alignItems: 'center',
        zIndex: 10,
    },
    qiblaIconOuter: {
        position: 'absolute',
        top: -2,
        width: 38,
        height: 38,
        borderRadius: 19,
        backgroundColor: '#2A2A2A',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    compassInner: {
        width: COMPASS_SIZE,
        height: COMPASS_SIZE,
    },
    needleContainer: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoContainer: {
        alignItems: 'center',
        paddingVertical: 16,
    },
    degree: {
        fontSize: 52,
        fontWeight: '200',
        color: 'white',
        fontVariant: ['tabular-nums'],
    },
    subInfo: {
        fontSize: 14,
        color: '#8BA89E',
        marginTop: 2,
    },
    qiblaFoundBanner: {
        backgroundColor: 'rgba(76, 175, 80, 0.15)',
        paddingVertical: 14,
        marginHorizontal: 40,
        borderRadius: 14,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(76, 175, 80, 0.3)',
    },
    qiblaFoundText: {
        fontSize: 18,
        fontWeight: '600',
        color: '#4CAF50',
    },
    footer: {
        paddingVertical: 16,
        paddingHorizontal: 40,
        alignItems: 'center',
    },
    footerText: {
        fontSize: 13,
        color: '#5A7A70',
        textAlign: 'center',
        lineHeight: 20,
    },
});
