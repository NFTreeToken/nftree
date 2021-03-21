import Axios from 'axios';
import * as _ from 'lodash';
import { useEffect, useState } from 'react';
import { tokenToString } from 'typescript';

const API_KEY = 'ckey_aa9570ccd4e04f91b8928065f92';

const covalentApi = Axios.create({
  baseURL: 'https://api.covalenthq.com/v1/',
  // auth: {
  //   username: API_KEY,
  //   password: '',
  // }
});

covalentApi.interceptors.request.use((config) => {
  config.params = config.params || {};
  config.params.key = API_KEY;
  return config;
});

export async function getTokenPriceData(
  tokenSymbol: string,
  startDateISO: string,
  endDateISO:string,
) {
  // TODO allow fetching in different currency?
  const result = await covalentApi({
    method: 'get',
    url: `pricing/historical/USD/${tokenSymbol}/`,
    params: { from: startDateISO, to: endDateISO },
  });
  return result.data.prices;
}

export function usePriceData(tokenSymbol, startDateISO, endDateISO) {
  const [isLoading, setIsLoading] = useState(true);
  const [prices, setPrices] = useState<any>([]);

  useEffect(() => {
    if (!startDateISO || !endDateISO) return;
    (async () => {
      const pricesResult = await getTokenPriceData(tokenSymbol, startDateISO, endDateISO);
      setPrices(pricesResult);
      setIsLoading(false);
    })();
  }, [tokenSymbol, startDateISO, endDateISO]);

  return [prices, isLoading];
}

export async function getBlockDate(
  blockNumber: string,
) {
  const result = await covalentApi({
    method: 'get',
    url: `1/block_v2/${blockNumber}/`,
  });
  return result.data.data.items[0].signed_at.substr(0, 10);
}
export function useBlockDate(blockNumber) {
  const [isLoading, setIsLoading] = useState(true);
  const [blockDate, setBlockDate] = useState();

  useEffect(() => {
    (async () => {
      const blockDateResult = await getBlockDate(blockNumber);
      setBlockDate(blockDateResult);
      setIsLoading(false);
    })();
  }, [blockNumber]);

  return [blockDate, isLoading];
}

export async function getAddressNFTs(
  address: string,
) {
  const result = await covalentApi({
    method: 'get',
    url: `1/address/${address}/balances_v2/`,
    params: {
      nft: true,
    },
  });
  const balances = result.data.data.items;
  const nftContracts = _.filter(balances, { type: 'nft' });
  const nftImages: any = [];
  _.each(nftContracts, (nftContract) => {
    _.each(nftContract.nft_data, (nft) => {
      // for now just show POAP tokens
      if (nft.external_data.image && nft.token_url.includes('poap')) {
        nftImages.push({
          platform: 'poap',
          link: nft.external_data.external_url,
          image: nft.external_data.image,
        });
      }
    });
  });

  // artificially add superrare
  if (address === '0x95AD18082718659a207fA82146feD9217ae71588') {
    nftImages.push({
      platform: 'superrare',
      link: 'https://superrare.co/artwork-v2/in-another-dream-21771',
      image: 'https://ipfs.pixura.io/ipfs/QmWAmUB4jaw4Qq8yqm8E7pmbLFRd9VagfiCxCcbGEiAiER/in-another-dream.jpg',
    });
  }
  console.log('NFTS FOUND: ', nftImages);
  return nftImages;
}
export function useAddressNFTs(address) {
  const [isLoading, setIsLoading] = useState(true);
  const [addressNFTs, setAddressNFTs] = useState<any>([]);

  useEffect(() => {
    (async () => {
      const result = await getAddressNFTs(address);
      setAddressNFTs(result);
      setIsLoading(false);
    })();
  }, [address]);

  return [addressNFTs, isLoading];
}
