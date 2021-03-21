import Axios from 'axios';
import { useEffect, useState } from 'react';

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
  const [prices, setPrices] = useState(false);

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
