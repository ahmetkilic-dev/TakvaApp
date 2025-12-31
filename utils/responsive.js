import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// iPhone 11 as baseline
const BASE_WIDTH = 414;
const BASE_HEIGHT = 896;

const scale = SCREEN_WIDTH / BASE_WIDTH;

/**
 * Responsive Width
 */
export const rsW = (size) => {
    return PixelRatio.roundToNearestPixel(size * scale);
};

/**
 * Responsive Height
 */
export const rsH = (size) => {
    const heightScale = SCREEN_HEIGHT / BASE_HEIGHT;
    return PixelRatio.roundToNearestPixel(size * heightScale);
};

/**
 * Responsive Font
 */
export const rsF = (size) => {
    const newSize = size * scale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    }
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
};

/**
 * Responsive Spacing (Vertical)
 */
export const rsS = (size) => rsH(size);
