import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { useLocation } from '../../contexts/LocationContext';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';

export default function LocationPermissionGuard({ children, compact = false }) {
    const { permissionStatus, requestLocationPermission, retryPermission, isLoading } = useLocation();

    // Loading or Granted -> Show content
    if (isLoading || permissionStatus === 'granted') {
        return children;
    }

    const handlePress = () => {
        if (permissionStatus === 'denied') {
            retryPermission();
        } else {
            requestLocationPermission();
        }
    };

    // Compact mode for smaller areas (like Home Header Prayer Times)
    if (compact) {
        return (
            <View style={styles.compactContainer}>
                <View style={styles.compactBlurContainer}>
                    <BlurView intensity={20} tint="dark" style={StyleSheet.absoluteFill} />
                    <View style={styles.content}>
                        <Ionicons name="location" size={24} color="#FFBA4A" />
                        <Text style={styles.compactText}>
                            Ezan vakitlerini görebilmek için konum izni gereklidir.
                        </Text>
                        <TouchableOpacity
                            onPress={handlePress}
                            activeOpacity={0.8}
                            style={styles.compactButton}
                        >
                            <Text style={styles.compactButtonText}>İzin Ver</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    // Full mode for entire screens (like Imsakiye)
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.iconContainer}>
                    <Ionicons name="location" size={48} color="#FFBA4A" />
                </View>
                <Text style={styles.title}>Konum Erişimi Gerekli</Text>
                <Text style={styles.description}>
                    Namaz vakitlerini doğru hesaplayabilmemiz için konumunuza ihtiyacımız var.
                </Text>

                <TouchableOpacity
                    onPress={handlePress}
                    activeOpacity={0.8}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Konum İzni Ver</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    card: {
        width: width * 0.85,
        backgroundColor: 'rgba(30, 30, 30, 0.6)',
        borderRadius: 24,
        padding: 32,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    iconContainer: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 186, 74, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    title: {
        fontFamily,
        fontSize: 20,
        fontWeight: '700',
        color: 'white',
        textAlign: 'center',
        marginBottom: 12,
    },
    description: {
        fontFamily,
        fontSize: 15,
        fontWeight: '400',
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 32,
    },
    button: {
        backgroundColor: '#FFBA4A',
        paddingHorizontal: 32,
        paddingVertical: 16,
        borderRadius: 16,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        fontFamily,
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
    },

    // Compact Styles
    compactContainer: {
        width: '100%',
        height: 140, // Height to cover prayer times area
        borderRadius: 20,
        overflow: 'hidden',
        marginTop: 10,
        marginBottom: 10,
    },
    compactBlurContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    content: {
        alignItems: 'center',
        gap: 8,
    },
    compactText: {
        fontFamily,
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    compactButton: {
        backgroundColor: '#FFBA4A',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 12,
        marginTop: 4,
    },
    compactButtonText: {
        fontFamily,
        color: '#000',
        fontSize: 13,
        fontWeight: '600',
    }
});
