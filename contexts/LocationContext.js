// contexts/LocationContext.js
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import * as Location from 'expo-location';
import { Alert, Linking, Platform, AppState } from 'react-native';

const LocationContext = createContext(null);

export function LocationProvider({ children }) {
    const [location, setLocation] = useState(null);
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [permissionStatus, setPermissionStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [permissionChecked, setPermissionChecked] = useState(false);
    
    const appState = useRef(AppState.currentState);

    // Konum bilgisini al
    const fetchLocation = async () => {
        try {
            console.log('📍 Konum alınıyor...');
            const position = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced
            });
            
            const { latitude, longitude } = position.coords;
            console.log('📍 Konum alındı:', latitude, longitude);
            setLocation({ latitude, longitude });
            
            // Şehir bilgisini al
            try {
                const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
                if (geocode.length > 0) {
                    const cityName = geocode[0].city || geocode[0].region || 'Bilinmiyor';
                    const districtName = geocode[0].district || geocode[0].subregion || '';
                    console.log('📍 Şehir:', cityName, 'İlçe:', districtName);
                    setCity(cityName);
                    setDistrict(districtName);
                }
            } catch (e) {
                console.log('Geocode hatası:', e);
            }
            
            return { latitude, longitude };
        } catch (error) {
            console.log('Konum alma hatası:', error);
            return null;
        }
    };

    // Konum izni kontrol et ve gerekirse al
    const checkAndRequestPermission = async () => {
        console.log('🔍 Konum izni kontrol ediliyor...');
        setIsLoading(true);
        
        try {
            // Mevcut izin durumunu kontrol et
            const { status: existingStatus } = await Location.getForegroundPermissionsAsync();
            console.log('📋 Mevcut izin durumu:', existingStatus);
            
            if (existingStatus === 'granted') {
                console.log('✅ Konum izni verildi');
                setPermissionStatus('granted');
                setPermissionChecked(true);
                await fetchLocation();
            } else if (existingStatus === 'undetermined') {
                // Henüz sorulmamış - izin iste
                console.log('❓ İzin henüz sorulmamış, isteniyor...');
                const { status } = await Location.requestForegroundPermissionsAsync();
                console.log('🔔 İzin durumu:', status);
                setPermissionStatus(status);
                setPermissionChecked(true);
                
                if (status === 'granted') {
                    await fetchLocation();
                }
            } else {
                // Denied
                console.log('❌ Konum izni reddedilmiş');
                setPermissionStatus('denied');
                setPermissionChecked(true);
            }
        } catch (error) {
            console.log('Konum izni hatası:', error);
            setPermissionStatus('denied');
            setPermissionChecked(true);
        } finally {
            setIsLoading(false);
        }
    };

    // İlk açılışta konum izni kontrolü
    useEffect(() => {
        console.log('🚀 LocationContext başlatılıyor...');
        checkAndRequestPermission();
    }, []);

    // Uygulama arka plandan döndüğünde izni tekrar kontrol et
    useEffect(() => {
        const subscription = AppState.addEventListener('change', async (nextAppState) => {
            // Uygulama arka plandan ön plana geldiğinde
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                console.log('📱 Uygulama aktif oldu, izin kontrol ediliyor...');
                
                // Sadece izin denied ise tekrar kontrol et
                if (permissionStatus === 'denied') {
                    const { status } = await Location.getForegroundPermissionsAsync();
                    console.log('📋 Güncel izin durumu:', status);
                    
                    if (status === 'granted') {
                        console.log('✅ İzin ayarlardan verildi!');
                        setPermissionStatus('granted');
                        await fetchLocation();
                    }
                }
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription.remove();
        };
    }, [permissionStatus]);

    // Konum iznini tekrar iste / Ayarlara yönlendir
    const retryPermission = async () => {
        console.log('🔄 Konum izni tekrar isteniyor...');
        
        const { status } = await Location.getForegroundPermissionsAsync();
        
        if (status === 'denied') {
            // iOS'ta bir kez denied olduktan sonra tekrar popup çıkmaz
            // Ayarlara yönlendir
            Alert.alert(
                'Konum İzni Gerekli',
                'Kıble yönünü bulmak ve namaz vakitlerini göstermek için konum izni gereklidir.\n\nLütfen ayarlardan konum iznini etkinleştirin.',
                [
                    { text: 'İptal', style: 'cancel' },
                    { 
                        text: 'Ayarlara Git', 
                        onPress: () => {
                            if (Platform.OS === 'ios') {
                                Linking.openURL('app-settings:');
                            } else {
                                Linking.openSettings();
                            }
                        }
                    }
                ]
            );
        } else if (status === 'undetermined') {
            // Henüz sorulmamış - tekrar iste
            await checkAndRequestPermission();
        } else if (status === 'granted') {
            // Zaten verilmiş
            setPermissionStatus('granted');
            await fetchLocation();
        }
    };

    const value = {
        location,
        city,
        district,
        permissionStatus,
        isLoading,
        permissionChecked,
        requestLocationPermission: checkAndRequestPermission,
        retryPermission,
        fetchLocation,
        hasPermission: permissionStatus === 'granted',
    };

    return (
        <LocationContext.Provider value={value}>
            {children}
        </LocationContext.Provider>
    );
}

export function useLocation() {
    const context = useContext(LocationContext);
    if (!context) {
        throw new Error('useLocation must be used within a LocationProvider');
    }
    return context;
}
