import { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import ScreenBackground from '../../../components/common/ScreenBackground';
import QuranPageContainer from '../../../components/kuran/QuranPageContainer.jsx';


export default function QuranPageScreen() {
  useEffect(() => {
    async function unlockOrientation() {
      await ScreenOrientation.unlockAsync();
    }
    unlockOrientation();
    return () => {
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  return (

    <ScreenBackground>
      <QuranPageContainer />
    </ScreenBackground>
  );
}
