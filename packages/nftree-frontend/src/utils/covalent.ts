import Axios from 'axios';

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
