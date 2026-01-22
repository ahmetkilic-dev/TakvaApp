import { View, Dimensions } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Responsive calculations
const horizontalPadding = Math.max(20, SCREEN_WIDTH * 0.05);
const contentWidth = SCREEN_WIDTH - (horizontalPadding * 2);

const videoSource = require('../../assets/images/ayetvideo.mp4');

export default function GununAyetiVideo({ onVideoEnd }) {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = false;
    player.play();
  });

  useEffect(() => {
    const subscription = player.addListener('playToEnd', () => {
      if (onVideoEnd) {
        onVideoEnd();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [player, onVideoEnd]);

  return (
    <View style={{ marginBottom: 16, alignItems: 'center' }}>
      <VideoView
        player={player}
        style={{
          width: Math.min(300, contentWidth),
          height: Math.min(300 * (163 / 300), Math.min(300, contentWidth) * (163 / 300)),
          borderRadius: 25,
          borderWidth: 0.5,
          borderColor: 'rgba(255, 255, 255, 0.5)',
        }}
        contentFit="cover"
        allowsFullscreen={false}
        allowsPictureInPicture={false}
      />
    </View>
  );
}

