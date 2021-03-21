import { drizzleReactHooks } from '@drizzle/react-plugin';
import every from 'lodash/every';

const NFTREE = 'NFTreeDemo';

const {
  useDrizzle,
  useDrizzleState,
} = drizzleReactHooks;

const getPending = (TXObjects: object[]) => !every(TXObjects, { status: 'success' });

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

export const useTreeIdAt = (ownerAddress: string, index: number) => {
  const useCacheCall = useUseCacheCall();
  return useCacheCall(NFTREE, 'tokenIdAt', ownerAddress, index);
};

export const useOwnerOf = (tokenId: number) => {
  const useCacheCall = useUseCacheCall();
  return useCacheCall(NFTREE, 'ownerOf', tokenId);
};

export const useIsChopped = (tokenId: number) => {
  const useCacheCall = useUseCacheCall();
  return useCacheCall(NFTREE, 'isChopped', tokenId);
};

export const useTreeCount = (walletAddress: string) => {
  const useCacheCall = useUseCacheCall();
  return useCacheCall(NFTREE, 'balanceOf', walletAddress);
};

export const usePlantSeed = () => {
  const useCacheSend = useUseCacheSend();
  const { send: plantSeed, TXObjects } = useCacheSend(NFTREE, 'plantSeed');
  const pending = getPending(TXObjects);
  return [plantSeed, pending];
};

export const useChopTree = (tokenId: number) => {
  const useCacheSend = useUseCacheSend();
  const { send: chopTree, TXObjects } = useCacheSend(NFTREE, 'chopTree', tokenId);
  const pending = getPending(TXObjects);
  return [chopTree, pending];
};

export const useDrizzleInitialized = () => useDrizzleState(
  (
    { drizzleStatus: { initialized } }:
    { drizzleStatus: { initialized: boolean } },
  ) => initialized,
);
