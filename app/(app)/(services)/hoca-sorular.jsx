import { View, Text, ScrollView, TouchableOpacity, FlatList, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import ScreenBackground from '../../../components/common/ScreenBackground';
import { useState, useMemo } from 'react';
import hocaData from '../../../constants/hocaData';
import React from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const fontFamily = 'Plus Jakarta Sans';
const hocaImage = require('../../../assets/images/Hoca.png');

const QuestionItem = ({ item }) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <View style={{
            marginBottom: 8,
            borderRadius: 20,
            backgroundColor: 'rgba(31, 46, 42, 0.6)',
            borderWidth: 0.5,
            borderColor: 'rgba(255, 255, 255, 0.2)',
            overflow: 'hidden'
        }}>
            <TouchableOpacity
                onPress={() => setExpanded(!expanded)}
                activeOpacity={0.7}
                style={{
                    paddingHorizontal: 20,
                    paddingVertical: 18,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}
            >
                <Text style={{
                    flex: 1,
                    fontFamily,
                    fontSize: 15,
                    fontWeight: '600',
                    color: '#FFFFFF',
                    marginRight: 12
                }}>
                    {item.question}
                </Text>
                <Ionicons
                    name={expanded ? "chevron-up" : "chevron-down"}
                    size={24}
                    color="#FFFFFF"
                />
            </TouchableOpacity>

            {expanded && (
                <View style={{
                    paddingHorizontal: 20,
                    paddingBottom: 20,
                    paddingTop: 0
                }}>
                    <View style={{ height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)', marginBottom: 15, marginTop: -5 }} />
                    <Text style={{
                        fontFamily,
                        fontSize: 14,
                        fontWeight: '300',
                        color: 'rgba(255, 255, 255, 0.9)',
                        lineHeight: 22
                    }}>
                        {item.answer}
                    </Text>
                </View>
            )}
        </View>
    );
};

export default function HocaSorularScreen() {
    const router = useRouter();
    const { category } = useLocalSearchParams();

    const filteredQuestions = useMemo(() => {
        if (!category) return hocaData;
        return hocaData.filter(q => q.category.toLowerCase() === category.toLowerCase());
    }, [category]);

    return (
        <ScreenBackground>
            <SafeAreaView edges={['top']} className="flex-1">
                {/* Header */}
                <View className="flex-row items-center justify-between px-4 pt-2 pb-0">
                    <TouchableOpacity onPress={() => router.back()} className="w-9 h-9 items-center justify-center">
                        <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
                    </TouchableOpacity>
                    <Text style={{
                        fontFamily: 'Cinzel-Black',
                        color: '#FFFFFF',
                        fontSize: 24,
                        textAlign: 'center',
                        letterSpacing: -2,
                        textTransform: 'uppercase'
                    }}>
                        HOCA
                    </Text>
                    <View className="w-9" />
                </View>

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
                    {/* Hoca Info Section (Like Hoca Tab) */}
                    <View style={{ width: '100%', height: 220, alignItems: 'center', justifyContent: 'center', marginBottom: -40 }}>
                        {/* Mandala Pattern Overlay */}
                        <View style={{ position: 'absolute', opacity: 0.15 }}>
                            <Ionicons name="sunny-outline" size={260} color="#CF9B47" />
                        </View>
                        <View style={{
                            width: 70, height: 70, borderRadius: 35, borderWidth: 1.5,
                            borderColor: 'rgba(255, 255, 255, 0.5)', overflow: 'hidden',
                            backgroundColor: '#24322E', marginTop: 0,
                        }}>
                            <Image source={hocaImage} style={{ width: '100%', height: '100%' }} resizeMode="cover" />
                        </View>
                    </View>

                    <Text style={{
                        fontFamily,
                        fontSize: 24,
                        fontWeight: '700',
                        color: '#FFFFFF',
                        textAlign: 'center',
                        marginBottom: 20
                    }}>
                        {category}
                    </Text>

                    {/* Questions List */}
                    <View style={{ paddingHorizontal: 20 }}>
                        {filteredQuestions.map((item) => (
                            <QuestionItem key={item.id} item={item} />
                        ))}

                        {filteredQuestions.length === 0 && (
                            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 50 }}>
                                <Text style={{ fontFamily, color: 'rgba(255, 255, 255, 0.5)' }}>
                                    Bu kategoride soru bulunamadı.
                                </Text>
                            </View>
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
        </ScreenBackground>
    );
}
