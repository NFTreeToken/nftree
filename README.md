# NFTree

## Frontend Features

- TypeScript
- Material-UI

## Requirements

- Latest Node
- Yarn
- Ganache: https://www.trufflesuite.com/ganache

## Commands

```
yarn contracts:migrate
yarn contracts:migrate:kovan

yarn frontend:start
yarn frontend:typecheck
```

## Documentation

### Developing on local Ganache network

1. Install Ganache
2. Install MetaMask, create a wallet, note the mnemonic phrase
3. Switch network to Custom RPC, create a network called Ganache with RPC URL `HTTP://127.0.0.1:7545` and network id `1337`
4. In Ganache settings -> Accounts & Keys enter your mnemonic, restart the network. You should now see the accounts from your wallet in Ganache with 100 Eth each
5. Run `yarn contracts:migrate`

### Developing on Kovan test network

1. Obtain the shared Kovan `.env` file
2. Install MetaMask, create a wallet, switch to the Kovan test network
3. In MetaMask, go to Account Details -> Export Private Key. Set the exported key as the value of `WALLET_PRIVATE_KEY` in the `.env` file
4. Go to https://gitter.im/kovan-testnet/faucet in the browser, paste the first account address from your MetaMask wallet into chat. In a few minutes 6 ETH will be sent to that address and you should see it reflected in MetaMask
5. Go to https://testnet.aave.com/faucet , connect to MetaMask, and request DAI. 10,000 DAI will be transfered to your wallet. To see it reflected in MetaMask, click Add Token and enter the Kovan DAI contract address: `0xff795577d9ac8bd7d90ee22b6c1703490b6512fd`

### Truffle

https://www.trufflesuite.com/docs/truffle/overview

### Drizzle

https://www.trufflesuite.com/docs/drizzle/overview
https://github.com/trufflesuite/drizzle/tree/develop/packages/react-plugin

### Material UI

https://material-ui.com/
