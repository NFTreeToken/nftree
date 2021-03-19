import { drizzleReactHooks } from '@drizzle/react-plugin';

const {
  // useDrizzle,
  useDrizzleState,
} = drizzleReactHooks;

// const useUseCacheCall = () => {
//   const { useCacheCall } = useDrizzle();
//   return useCacheCall;
// };

// const useUseCacheSend = () => {
//   const { useCacheSend } = useDrizzle();
//   return useCacheSend;
// };

// const useUseCacheEvents = () => {
//   const { useCacheEvents } = useDrizzle();
//   return useCacheEvents;
// };

export const useDrizzleInitialized = () => useDrizzleState(
  (
    { drizzleStatus: { initialized } }:
    { drizzleStatus: { initialized: boolean } },
  ) => initialized,
);
