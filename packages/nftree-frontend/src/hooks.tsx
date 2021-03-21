import { drizzleReactHooks } from '@drizzle/react-plugin';
import every from 'lodash/every';

const NFTREE = 'NFTreeDemo';

const {
  useDrizzle,
  useDrizzleState,
} = drizzleReactHooks;

const useUseCacheCall = () => {
  const { useCacheCall } = useDrizzle();
  return useCacheCall;
};

const useUseCacheSend = () => {
  const { useCacheSend } = useDrizzle();
  return useCacheSend;
};

// const useUseCacheEvents = () => {
//   const { useCacheEvents } = useDrizzle();
//   return useCacheEvents;
// };

export const useCurrentAddress = () => useDrizzleState(
  ({ accounts }: { accounts: string[] }) => accounts[0],
);

export const useTreeCount = (walletAddress: string) => {
  const useCacheCall = useUseCacheCall();
  return useCacheCall(NFTREE, 'balanceOf', walletAddress);
};

export const usePlantSeed = () => {
  const useCacheSend = useUseCacheSend();
  const { send: plantSeed, TXObjects } = useCacheSend(NFTREE, 'plantSeed');
  const pending = !every(TXObjects, { status: 'success' });
  return [plantSeed, pending];
};

export const useDrizzleInitialized = () => useDrizzleState(
  (
    { drizzleStatus: { initialized } }:
    { drizzleStatus: { initialized: boolean } },
  ) => initialized,
);
