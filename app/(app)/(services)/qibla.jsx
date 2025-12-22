import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Vibration, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import Svg, { Path, Circle, Text as SvgText, Line } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';
import QiblaBgSvg from '../../../assets/images/qıbla-bg.svg';
import KabeSvg from '../../../assets/images/kabe.svg';
import { useLocation } from '../../../contexts/LocationContext';

const { width, height } = Dimensions.get('window');
const COMPASS_SIZE = width * 0.75;

// Kabe koordinatları
const KAABA_LAT = 21.4225;
const KAABA_LNG = 39.8262;

// Kıble toleransı (derece)
const QIBLA_TOLERANCE = 5;

// Arka plan deseni
const BackgroundPattern = () => (
    <View style={styles.patternContainer}>
        <QiblaBgSvg width={width} height={height} preserveAspectRatio="xMidYMid slice" />
    </View>
);

// Pusula Yüzü
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
            <Circle
                cx={center}
                cy={center}
                r={outerR}
                fill="#F0F7FE"
                fillOpacity={0.95}
                stroke="#96D0D0"
                strokeWidth={8}
            />
            
            <Circle
                cx={center - 5}
                cy={center - 5}
                r={outerR - 20}
                fill="white"
                fillOpacity={0.5}
            />

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
            <Path d="M50 15 L58 48 L50 44 L42 48 Z" fill="#E74C3C" />
            <Path d="M50 85 L58 52 L50 56 L42 52 Z" fill="#CCCCCC" />
            <Circle cx="50" cy="50" r="6" fill="#444" />
            <Circle cx="50" cy="50" r="3" fill="#888" />
        </Svg>
    );
};

// Konum İzni Gerekli Ekranı
const LocationPermissionRequired = ({ onRetry, router }) => (
    <View style={styles.container}>
        <BackgroundPattern />
        <SafeAreaView edges={['top']} style={styles.safeArea}>
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

            <View style={styles.permissionContainer}>
                <View style={styles.permissionIconContainer}>
                    <Ionicons name="location-outline" size={80} color="#FF6B6B" />
                </View>
                
                <Text style={styles.permissionTitle}>Konum İzni Gerekli</Text>
                
                <Text style={styles.permissionDescription}>
                    Kıble yönünü doğru hesaplayabilmemiz için konum bilginize ihtiyacımız var.
                </Text>
                
                <Text style={styles.permissionSubtext}>
                    Konum bilginiz sadece Kıble açısını ve Kâbe'ye olan mesafenizi hesaplamak için kullanılır.
                </Text>

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
    
    const { 
        location: userLocation, 
        city: userCity, 
        district: userDistrict,
        hasPermission, 
        isLoading: locationLoading,
        retryPermission 
    } = useLocation();

    // HAM DEĞERLER - HİÇBİR FİLTRE YOK
    const [heading, setHeading] = useState(0);
    const [qiblaAngle, setQiblaAngle] = useState(null);
    const [distance, setDistance] = useState(null);
    const [isQiblaDirection, setIsQiblaDirection] = useState(false);
    const [currentTime, setCurrentTime] = useState('');
    const [needsCalibration, setNeedsCalibration] = useState(false);
    const [compassStarted, setCompassStarted] = useState(false);
    
    const subscriptionRef = useRef(null);
    const lastVibration = useRef(0);

    // Saat güncelleme
    useEffect(() => {
        updateTime();
        const timeInterval = setInterval(updateTime, 1000);
        return () => {
            stopCompass();
            clearInterval(timeInterval);
        };
    }, []);

    // Konum değiştiğinde Kıble hesapla ve pusulayı başlat
    useEffect(() => {
        if (hasPermission && userLocation && !compassStarted) {
            initializeQibla();
        }
    }, [hasPermission, userLocation, compassStarted]);

    const updateTime = () => {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        setCurrentTime(`${hours}:${minutes}`);
    };

    // Kıble yönü kontrolü - GÖRÜNEN DEĞERLERLE KARŞILAŞTIR
    useEffect(() => {
        if (qiblaAngle !== null) {
            // Kullanıcının gördüğü değerlerle karşılaştır (ikisi de ekranda görünüyor)
            // Heading: Manyetik pusula değeri
            // Kıble Açısı: API'den gelen değer
            // İkisi eşit olduğunda "Kıble Yönündesiniz" göster
            const displayedQibla = Math.round(qiblaAngle); // Ekranda gösterilen Kıble açısı
            
            let diff = Math.abs(heading - displayedQibla);
            if (diff > 180) diff = 360 - diff;
            
            // Debug log
            console.log(`🧭 Heading: ${heading}° | Kıble: ${displayedQibla}° | Fark: ${diff}°`);
            
            // Tolerans: ±2 derece (151, 152, 153 için 152 merkez)
            const isOnQibla = diff <= 2;
            setIsQiblaDirection(isOnQibla);
            
            if (isOnQibla && Date.now() - lastVibration.current > 1000) {
                Vibration.vibrate(100);
                lastVibration.current = Date.now();
            }
        }
    }, [heading, qiblaAngle]);

    const initializeQibla = async () => {
        if (!userLocation) return;
        
        const { latitude, longitude } = userLocation;
        await fetchQiblaDirection(latitude, longitude);
        startCompass();
        setCompassStarted(true);
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
                console.log('🕋 Kıble açısı:', data.data.direction);
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

    // PUSULA - SIFIR GECİKME, HAM VERİ
    const startCompass = async () => {
        try {
            console.log('🧭 Pusula başlatılıyor...');
            
            subscriptionRef.current = await Location.watchHeadingAsync((headingData) => {
                // magHeading: Manyetik kuzey - telefon pusulası ile aynı değer
                const rawHeading = headingData.magHeading;
                
                // Kalibrasyon kontrolü (accuracy: 1=düşük, 2=orta, 3=yüksek)
                setNeedsCalibration(headingData.accuracy < 2);
                
                // DOĞRUDAN STATE'E YAZ - HİÇBİR İŞLEM YOK
                setHeading(Math.round(rawHeading));
            });
            
            console.log('🧭 Pusula başlatıldı');
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

    // Kıble işareti rotasyonu - Görünen değerlerle eşleşsin
    // Heading 152° iken Kabe ikonu tam üstte olmalı (Kıble açısı 152° ise)
    const qiblaIndicatorRotation = qiblaAngle !== null ? qiblaAngle - heading : 0;

    // Konum yükleniyorsa bekle
    if (locationLoading) {
        return (
            <View style={styles.container}>
                <BackgroundPattern />
                <SafeAreaView edges={['top']} style={[styles.safeArea, styles.loadingContainer]}>
                    <Text style={styles.loadingText}>Konum alınıyor...</Text>
                </SafeAreaView>
            </View>
        );
    }

    // Konum izni yoksa uyarı göster
    if (!hasPermission) {
        return <LocationPermissionRequired onRetry={retryPermission} router={router} />;
    }

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
                    <Text style={styles.cityName}>{userCity || 'Konum alınıyor...'}</Text>
                    <View style={styles.locationRow}>
                        {userDistrict ? (
                            <View style={styles.infoRow}>
                                <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
                                    <Path
                                        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"
                                        fill="#8BA89E"
                                    />
                                </Svg>
                                <Text style={styles.infoRowText}>{userDistrict}</Text>
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
                                    <KabeSvg width={38} height={38} />
                                </View>
                            </View>
                        )}
                        
                        {/* Dönen pusula yüzü - HAM HEADING DEĞERİ */}
                        <View style={[
                            styles.compassInner,
                            { transform: [{ rotate: `${-heading}deg` }] }
                        ]}>
                            <CompassFace size={COMPASS_SIZE} />
                        </View>
                        
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

                {/* Kalibrasyon uyarısı */}
                {needsCalibration && (
                    <View style={styles.calibrationBanner}>
                        <Text style={styles.calibrationText}>
                            ⚠️ Pusula kalibrasyona ihtiyaç duyuyor
                        </Text>
                        <Text style={styles.calibrationHint}>
                            Telefonunuzu 8 şeklinde hareket ettirin
                        </Text>
                    </View>
                )}

                {/* Kıble bulundu */}
                {isQiblaDirection && !needsCalibration && (
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
        bottom: 0,
    },
    safeArea: {
        flex: 1,
    },
    loadingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        color: '#8BA89E',
        fontSize: 18,
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
        alignItems: 'center',
        justifyContent: 'center',
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
    calibrationBanner: {
        backgroundColor: 'rgba(255, 152, 0, 0.15)',
        paddingVertical: 12,
        marginHorizontal: 40,
        borderRadius: 14,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 152, 0, 0.3)',
    },
    calibrationText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#FF9800',
    },
    calibrationHint: {
        fontSize: 12,
        color: '#FFB74D',
        marginTop: 4,
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
    permissionContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40,
    },
    permissionIconContainer: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: 'rgba(255, 107, 107, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30,
        borderWidth: 2,
        borderColor: 'rgba(255, 107, 107, 0.3)',
    },
    permissionTitle: {
        fontSize: 26,
        fontWeight: '700',
        color: '#fff',
        marginBottom: 16,
        textAlign: 'center',
    },
    permissionDescription: {
        fontSize: 16,
        color: '#B8C9C0',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 12,
    },
    permissionSubtext: {
        fontSize: 13,
        color: '#7A8A82',
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 40,
    },
    retryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#4ECDC4',
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 30,
        gap: 10,
        marginBottom: 16,
    },
    retryButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    backHomeButton: {
        paddingVertical: 12,
        paddingHorizontal: 24,
    },
    backHomeButtonText: {
        fontSize: 14,
        color: '#8BA89E',
    },
});
