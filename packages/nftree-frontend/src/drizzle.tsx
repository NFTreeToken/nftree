import { Drizzle, generateStore } from '@drizzle/store';
import { NFTreeDemo } from '@nftree/contracts';

const options = {
  contracts: [
    NFTreeDemo,
  ],
  web3: {
    fallback: {
      type: 'ws',
      url: 'ws://127.0.0.1:7545',
    },
  },
};
const store = generateStore({
  drizzleOptions: options,
  disableReduxDevTools: false,
});
const drizzle = new Drizzle(options, store);

export default drizzle;
