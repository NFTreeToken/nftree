import Typography from '@material-ui/core/Typography';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import BackgroundSVG from '../../images/bg-mountains.svg';
import RingsRenderer from '../sketches/RingsRenderer';

const NFTree = () => {
  const { tokenId }: { tokenId: string } = useParams();
  return (
    <StyledWrapper>
      <Typography>{`NFTree id: ${tokenId}`}</Typography>

      <div className="rings-wrapper">
        <RingsRenderer />
      </div>

    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  background: #819BD9;
  display: flex;

  .rings-wrapper {
    width: 1000px;
    height: 1000px;
    position: relative;
  }

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

export default NFTree;
