import { drizzleReactHooks } from '@drizzle/react-plugin';
import every from 'lodash/every';

const {
  useDrizzle,
  useDrizzleState,
} = drizzleReactHooks;

// const useUseCacheCall = () => {
//   const { useCacheCall } = useDrizzle();
//   return useCacheCall;
// };

const useUseCacheSend = () => {
  const { useCacheSend } = useDrizzle();
  return useCacheSend;
};

// const useUseCacheEvents = () => {
//   const { useCacheEvents } = useDrizzle();
//   return useCacheEvents;
// };

export const usePlantSeed = () => {
  const useCacheSend = useUseCacheSend();
  const { send: plantSeed, TXObjects } = useCacheSend('NFTreeDemo', 'plantSeed');
  const pending = !every(TXObjects, { status: 'success' });
  return [plantSeed, pending];
};

export const useDrizzleInitialized = () => useDrizzleState(
  (
    { drizzleStatus: { initialized } }:
    { drizzleStatus: { initialized: boolean } },
  ) => initialized,
);
