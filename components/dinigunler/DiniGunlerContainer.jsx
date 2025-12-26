import { memo, useState, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenBackground from '../common/ScreenBackground';
import DiniGunlerHeader from './DiniGunlerHeader';
import DiniGunlerList from './DiniGunlerList';
import DiniGunlerLoading from './DiniGunlerLoading';
import DiniGunlerError from './DiniGunlerError';
import DiniGunlerEmpty from './DiniGunlerEmpty';
import { useReligiousDays } from './hooks/useReligiousDays';

const DiniGunlerContainer = memo(() => {
  const { religiousDays, loading, error, refresh } = useReligiousDays();
  const [refreshing, setRefreshing] = useState(false);

  // Handle pull-to-refresh
  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await refresh();
    setRefreshing(false);
  }, [refresh]);

  // Handle retry on error
  const handleRetry = useCallback(() => {
    refresh();
  }, [refresh]);

  // Loading state
  if (loading && !refreshing) {
    return <DiniGunlerLoading />;
  }

  // Error state
  if (error && !refreshing) {
    return <DiniGunlerError error={error} onRetry={handleRetry} />;
  }

  return (
    <ScreenBackground>
      <SafeAreaView edges={['top']} style={styles.container}>
        <DiniGunlerHeader />
        
        {religiousDays.length === 0 ? (
          <DiniGunlerEmpty />
        ) : (
          <DiniGunlerList
            religiousDays={religiousDays}
            onRefresh={handleRefresh}
            refreshing={refreshing}
          />
        )}
      </SafeAreaView>
    </ScreenBackground>
  );
});

DiniGunlerContainer.displayName = 'DiniGunlerContainer';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DiniGunlerContainer;

