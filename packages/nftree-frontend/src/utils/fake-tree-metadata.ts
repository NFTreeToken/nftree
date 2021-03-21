import * as _ from 'lodash';
import rand from 'random-seed';

import { AAVE_TOKEN_ADDRESSES } from '../data/constants';

const TOKEN_TYPES = _.map(AAVE_TOKEN_ADDRESSES, 'symbol');
const MIN_BLOCK = 11200000;
const MAX_BLOCK = 12081400;

export function getTreeMetadata(treeId) {
  const random = rand.create(treeId + 10); // use PRNG so we get consistent data for a tree number
  const depositBlock = MIN_BLOCK + random.range(MAX_BLOCK - MIN_BLOCK);
  return {
    symbol: TOKEN_TYPES[random.range(TOKEN_TYPES.length)],
    depositBlock,
    chopBlock: depositBlock + random.range(MAX_BLOCK - depositBlock),
    depositAmount: random.floatBetween(1, 5),
    numWaterings: random.range(5),
    size: random.intBetween(20, 850),
    xPosition: random.intBetween(100, 2900),
  };
}
