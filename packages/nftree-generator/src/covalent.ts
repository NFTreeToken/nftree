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
  config.params.key = API_KEY
  return config;
});

export async function getTokenPriceData(
  tokenSymbol: string,
  startDateISO: string,
  endDateISO:string
) {

  // TODO allow fetching in different currency?
  const result = await covalentApi({
    method: 'get',
    url: `pricing/historical/USD/${tokenSymbol}/`,
    params: { from: startDateISO, to: endDateISO }
  });
  return result.data.prices;
}


// https://api.covalenthq.com/v1/USD/WBTC?from=2020-01-01&to=2020-02-15&key=ckey_aa9570ccd4e04f91b8928065f92
// https://api.covalenthq.com/v1/pricing/historical/USD/WBTC/?from=2020-01-01&to=2020-05-01&key=ckey_aa9570ccd4e04f91b8928065f92
// https://api.covalenthq.com/v1/pricing/historical/USD/WBTC/?from=2020-01-01&to=2020-02-15&key=ckey_aa9570ccd4e04f91b8928065f92