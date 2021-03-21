import * as _ from 'lodash';

import { UNISWAP_TOKEN_IDS } from '../data/constants';

async function graphQuery(subgraph, query) {
  const result = await fetch(`https://api.thegraph.com/subgraphs/name/${subgraph}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  const data = await result.json();
  return data;
}

function convertDateToSeconds(date) {
  return Math.floor(new Date(date).getTime() / 1000);
}

export async function getPricingData(symbol, dateStartISO, dateEndISO) {
  const tokenId = UNISWAP_TOKEN_IDS[symbol];
  if (!tokenId) throw new Error('token not found');

  const dateStart = new Date(dateStartISO);
  const dateEnd = new Date(dateEndISO);
  const numDays = (dateEnd.getTime() - dateStart.getTime()) / (1000 * 60 * 60 * 24);
  console.log(numDays);

  const result = await graphQuery('uniswap/uniswap-v2', `{
    tokenDayDatas(
      first: ${numDays}
      where: {
        token: "${tokenId}"
        date_gt: ${Math.floor(dateStart.getTime() / 1000)}
        date_lt: ${Math.floor(dateEnd.getTime() / 1000)}
      }
      orderBy: date
      orderDirection: asc
    ) {
      priceUSD
      date
    }
  }`);
  return _.map(result.data.tokenDayDatas, ({ date, priceUSD }) => ({
    date: new Date(date * 1000).toISOString().substr(0, 10),
    price: parseFloat(parseFloat(priceUSD).toPrecision(2)),
  }));
}
