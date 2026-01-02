import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const PermissionHelper = {
    /**
     * Bildirim izni iste
     * @returns {Promise<boolean>} granted
     */
    async requestNotificationPermission() {
        try {
            if (Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                });
            }

            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;

            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            return finalStatus === 'granted';
        } catch (error) {
            return false;
        }
    },

    /**
     * Bildirim izni durumunu kontrol et
     */
    async checkNotificationPermission() {
        try {
            const settings = await Notifications.getPermissionsAsync();
            return settings.status === 'granted';
        } catch (e) {
            return false;
        }
    }
};
