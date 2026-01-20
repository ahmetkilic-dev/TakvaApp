import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, Image, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../../lib/supabase';

const fontFamily = 'Plus Jakarta Sans';

const GradientText = ({ colors, style, children }) => {
    return (
        <MaskedView
            maskElement={
                <Text style={[style, { backgroundColor: 'transparent' }]}>
                    {children}
                </Text>
            }
        >
            <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={style}
            >
                <Text style={[style, { opacity: 0 }]}>{children}</Text>
            </LinearGradient>
        </MaskedView>
    );
};

export const QuickStatsRow = ({ followingCount, badgeCount, isPremium, isPlus, following = [] }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [followedUsers, setFollowedUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch details when modal opens
    React.useEffect(() => {
        if (modalVisible && following.length > 0) {
            const fetchUsers = async () => {
                setLoading(true);
                try {
                    const { data, error } = await supabase
                        .from('profiles')
                        .select('id, name, profile_picture')
                        .in('id', following);

                    if (data) {
                        setFollowedUsers(data);
                    }
                } catch (err) {
                    console.error('Error fetching followed users:', err);
                } finally {
                    setLoading(false);
                }
            };
            fetchUsers();
        } else {
            setFollowedUsers([]);
        }
    }, [modalVisible, following]);

    // Determine colors and label
    let statusLabel = 'Aktif değil';
    let statusColors = ['#FFFFFF', '#FFFFFF']; // Default white

    if (isPremium) {
        statusLabel = 'Premium';
        statusColors = ['#E9CC88', '#CF9B47']; // Gold Gradient
    } else if (isPlus) {
        statusLabel = 'Plus';
        statusColors = ['#FFFFFF', '#D6DCE5']; // White/Silver Gradient
    }

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
                    {/* Gradient Text Implementation */}
                    {statusLabel === 'Aktif değil' ? (
                        <Text style={{ fontFamily, fontSize: 14, fontWeight: '700', color: '#FFFFFF', marginBottom: 4 }}>
                            {statusLabel}
                        </Text>
                    ) : (
                        <GradientText
                            colors={statusColors}
                            style={{ fontFamily, fontSize: 14, fontWeight: '700', marginBottom: 4 }}
                        >
                            {statusLabel}
                        </GradientText>
                    )}

                    <Text style={{ fontFamily, fontSize: 13, fontWeight: '400', color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center' }}>
                        Üyelik Durumu
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

                        {loading ? (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <ActivityIndicator size="large" color="#FFFFFF" />
                            </View>
                        ) : followedUsers.length === 0 ? (
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily, color: 'rgba(255,255,255,0.6)' }}>Henüz kimseyi takip etmiyorsun.</Text>
                            </View>
                        ) : (
                            <FlatList
                                data={followedUsers}
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
                                            {item.profile_picture ?
                                                <Image source={{ uri: item.profile_picture }} style={{ width: 40, height: 40 }} /> :
                                                <Ionicons name="person" size={24} color="white" style={{ alignSelf: 'center', marginTop: 8 }} />
                                            }
                                        </View>
                                        <Text style={{ fontFamily, fontSize: 16, color: '#FFFFFF' }}>{item.name || "İsimsiz Kullanıcı"}</Text>
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
