import { useEffect } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';
import ScreenBackground from '../../../components/common/ScreenBackground';
import KuranContainer from '../../../components/kuran/KuranContainer';


export default function QuranScreen() {
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
      <KuranContainer />
    </ScreenBackground>
  );
}
