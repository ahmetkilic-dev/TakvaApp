import { useRef, useEffect } from 'react';

/**
 * Custom hook to prevent scroll jump on screen entry
 * Usage: const scrollViewRef = useScrollJumpFix();
 * Then add ref={scrollViewRef} to your ScrollView
 */
export const useScrollJumpFix = () => {
    const scrollViewRef = useRef(null);

    useEffect(() => {
        // Reset scroll position to top when component mounts
        if (scrollViewRef.current) {
            scrollViewRef.current.scrollTo({ y: 0, animated: false });
        }
    }, []);

    return scrollViewRef;
};

/**
 * Common ScrollView props for optimal performance
 * Spread these props on your ScrollView component
 */
export const optimizedScrollProps = {
    showsVerticalScrollIndicator: false,
    removeClippedSubviews: true,
    maxToRenderPerBatch: 2,
    windowSize: 5,
    scrollEventThrottle: 16,
};
