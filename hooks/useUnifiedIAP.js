import { Platform } from 'react-native';
import { useIAP } from '../contexts/IAPContext';
import { useAndroidIAP } from '../contexts/AndroidIAPContext';

export const useUnifiedIAP = () => {
    if (Platform.OS === 'android') {
        return useAndroidIAP();
    } else {
        return useIAP();
    }
};
