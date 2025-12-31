import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const fontFamily = 'Plus Jakarta Sans';

export const QuickStatsRow = ({ followingCount, badgeCount, isPremium, following = [] }) => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <View style={{ marginBottom: 16 }}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingVertical: 16,
                borderTopWidth: 0.5,
                borderBottomWidth: 0.5,
                borderColor: 'rgba(255, 255, 255, 0.5)'
            }}>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={{ alignItems: 'center' }}>
                    <Text style={{ fontFamily, fontSize: 14, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 }}>
                        {followingCount}
                    </Text>
                    <Text style={{ fontFamily, fontSize: 13, fontWeight: '400', color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center' }}>
                        Takip ettiklerim
                    </Text>
                </TouchableOpacity>

                <View style={{ alignItems: 'center' }}>
                    <Text style={{ fontFamily, fontSize: 14, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 }}>
                        {badgeCount}
                    </Text>
                    <Text style={{ fontFamily, fontSize: 13, fontWeight: '400', color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center' }}>
                        Rozetlerim
                    </Text>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <Text style={{
                        fontFamily,
                        fontSize: 14,
                        fontWeight: '700',
                        color: isPremium ? '#CF9B47' : '#FFFFFF',
                        marginBottom: 4
                    }}>
                        {isPremium ? 'Aktif' : 'Aktif değil'}
                    </Text>
                    <Text style={{ fontFamily, fontSize: 13, fontWeight: '400', color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center' }}>
                        Premium
                    </Text>
                </View>
            </View>

            {/* Following Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.8)', justifyContent: 'flex-end' }}>
                    <View style={{
                        backgroundColor: '#182723',
                        height: '60%',
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        padding: 20,
                        borderWidth: 1,
                        borderColor: 'rgba(255,255,255,0.2)'
                    }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                            <Text style={{ fontFamily, fontSize: 18, fontWeight: '700', color: '#FFFFFF' }}>Takip Ettiklerim</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close" size={24} color="#FFFFFF" />
                            </TouchableOpacity>
                        </View>

                        {following.length === 0 ? (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily, color: 'rgba(255,255,255,0.6)' }}>Henüz kimseyi takip etmiyorsun.</Text>
                            </View>
                        ) : (
                            <FlatList
                                data={following}
                                keyExtractor={(item) => item.id}
                                renderItem={({ item }) => (
                                    <View style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        paddingVertical: 12,
                                        borderBottomWidth: 0.5,
                                        borderColor: 'rgba(255,255,255,0.1)'
                                    }}>
                                        <View style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#24322E', marginRight: 12, overflow: 'hidden' }}>
                                            {item.image ? <Image source={{ uri: item.image }} style={{ width: 40, height: 40 }} /> : <Ionicons name="person" size={24} color="white" style={{ alignSelf: 'center', marginTop: 8 }} />}
                                        </View>
                                        <Text style={{ fontFamily, fontSize: 16, color: '#FFFFFF' }}>{item.name}</Text>
                                    </View>
                                )}
                            />
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
};

export default QuickStatsRow;
