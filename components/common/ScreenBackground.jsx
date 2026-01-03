import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import HomeBg from '../../assets/images/home-bg.svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

function ScreenBackground({ children }) {
  return (
    <View style={styles.container}>
      {/* SVG Background */}
      <View style={styles.backgroundContainer}>
        <HomeBg
          width={SCREEN_WIDTH}
          height={SCREEN_HEIGHT}
          preserveAspectRatio="xMidYMid slice"
        />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#04100D',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
  },
});

// Memoize to prevent SVG re-render on every screen change
export default React.memo(ScreenBackground);
