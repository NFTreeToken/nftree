import Typography from '@material-ui/core/Typography';
import * as _ from 'lodash';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useOwnerOf, useIsChopped, useChopTree } from '../../hooks';
import { useBlockDate, usePriceData } from '../../utils/covalent';
import { getTreeMetadata } from '../../utils/fake-tree-metadata';
import Spinner from '../lib/Spinner';
import ForestRenderer from '../sketches/ForestRenderer';
import RingsRenderer from '../sketches/RingsRenderer';

const TODAY_ISO = new Date().toISOString().substr(0, 10);

const NFTree = () => {
  const { tokenId: tokenIdString }: { tokenId: string } = useParams();
  const tokenId = Number(tokenIdString);
  const ownerOf = useOwnerOf(tokenId);
  const isChopped = useIsChopped(tokenId) || window?.location?.search === '?chop';
  const [chopTree, pending] = useChopTree(tokenId);

  const isMine = true;

  const treeMetadata = getTreeMetadata(tokenId);

  const [depositBlockDate, depositBlockDateIsLoading] = useBlockDate(treeMetadata.depositBlock);
  const [priceData, priceDataIsLoading] = usePriceData(treeMetadata.symbol, depositBlockDate, TODAY_ISO);

  let depositDatePriceUSD;
  let depositAmountUSD;
  let chopDatePriceUSD;
  let chopAmountUSD;
  if (priceData?.length) {
    console.log('PRICES', priceData);
    depositDatePriceUSD = _.find(priceData as any, { date: depositBlockDate }).price;
    depositAmountUSD = depositDatePriceUSD * treeMetadata.depositAmount;
  }

  return (
    <StyledWrapper>
      <Typography>{`NFTree id: ${tokenId}`}</Typography>

      <div className="render-wrapper">
        {isChopped ? <RingsRenderer /> : <ForestRenderer treeIds={[tokenId]} />}
      </div>
      <div>
        {`Current Owner: ${ownerOf}`}
        <a href={`/forest/${ownerOf}`}>see their forest</a>
      </div>
      <div>
        Planted on: Block #
        {treeMetadata.depositBlock}
        (
        {depositBlockDateIsLoading ? '-' : depositBlockDate}
        )
      </div>
      <div>
        Asset:
        {treeMetadata.symbol}
      </div>
      <div>
        Initial Deposit:
        {treeMetadata.depositAmount.toFixed(5)}
        ($
        {depositAmountUSD ? depositAmountUSD.toFixed(2) : '-'}
        {' '}
        USD)
      </div>
      <div>
        Watered Count:
        {treeMetadata.numWaterings}
        times
      </div>
      <div>
        Asset price when planted: $
        {depositDatePriceUSD || '-'}
        {' '}
        USD
      </div>

      {isChopped && (
        <>
          <div>
            Chopped on: Block #
            {treeMetadata.chopBlock}
          </div>
          <div>Asset price when chopped: $1567.23 US</div>
          <div>Final value: 2.1 ($1532.23 US)</div>
        </>
      )}

      {/* actions */}
      <div style={{ border: '1px solid black' }}>
        {!isChopped && <button>Water this tree</button>}

        {isMine && (
          <>
            {!isChopped && <button onClick={() => chopTree()}>Chop down this tree</button>}
            <button>Gift to someone else</button>
            <button>Sell on Rarible</button>
            {pending && <Spinner />}
          </>
        )}
      </div>

    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .render-wrapper {
    width: 500px;
    height: 500px;
    position: relative;
    background: #819BD9;
  }
`;

export default NFTree;
