import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import BackgroundSVG from '../../images/bg-mountains.svg';
import ForestRenderer from '../sketches/ForestRenderer';

const Forest = () => {
  const { walletId }: { walletId: string } = useParams();
  return (
    <StyledWrapper>
      <img src={BackgroundSVG} className="bg" />

      <Typography>{`Wallet id: ${walletId}`}</Typography>

      <div className="forest-wrapper">
        <ForestRenderer />
      </div>

    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: #819BD9;
  display: flex;

  .forest-wrapper {
    z-index: 2;
    width: 100%;
    position: absolute;
    bottom: 20px;;
  }


  .bg {
    width: 100%;
    position: absolute;
    z-index: 1;
    bottom: 0;
  }


  .rings-container, .forest-container {
    width: 800px;
    height: 800px;
    position: relative;
    float: left;
    margin-right: 10px;
  }
`;

export default Forest;
