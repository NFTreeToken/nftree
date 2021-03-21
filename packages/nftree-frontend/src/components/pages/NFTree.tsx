import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useIsChopped, useChopTree } from '../../hooks';
import Spinner from '../lib/Spinner';
import ForestRenderer from '../sketches/ForestRenderer';
import RingsRenderer from '../sketches/RingsRenderer';

const NFTree = () => {
  const { tokenId: tokenIdString }: { tokenId: string } = useParams();
  const tokenId = Number(tokenIdString);
  const isChopped = useIsChopped(tokenId);
  const [chopTree, pending] = useChopTree(tokenId);

  const isMine = true;

  return (
    <StyledWrapper>
      <Typography>{`NFTree id: ${tokenId}`}</Typography>

      <div className="render-wrapper">
        {isChopped ? <RingsRenderer /> : <ForestRenderer />}
      </div>
      <div>
        Current Owner: 0xabc
        <a href="/forest/0xabc">see their forest</a>
      </div>
      <div>Planted on: Block #987</div>
      <div>Asset: WBTC</div>
      <div>Initial Deposit: 1.23 ($432.23 US)</div>
      <div>Watered Count: 3 times</div>
      <div>Watered Amount: .5 ($132.23 US)</div>
      <div>Asset price when planted: $567.23 US</div>

      {isChopped && (
        <>
          <div>Chopped on: Block #222</div>
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
