import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useTreeCount } from '../../hooks';
import BackgroundSVG from '../../images/bg-mountains.svg';
import ForestRenderer from '../sketches/ForestRenderer';

const Forest = () => {
  const { walletId }: { walletId: string } = useParams();
  const treeCount = useTreeCount(walletId);
  console.log(treeCount);

  return (
    <StyledWrapper>
      <img src={BackgroundSVG} className="bg" />

      <Table>
        <TableBody>
          <TableRow>
            <TableCell>Wallet address</TableCell>
            <TableCell>{walletId}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>NFTrees owned</TableCell>
            <TableCell>{treeCount}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="forest-wrapper">
        <ForestRenderer forestMode />
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
`;

export default Forest;
