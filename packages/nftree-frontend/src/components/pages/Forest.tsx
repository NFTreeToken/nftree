import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import * as _ from 'lodash';
import range from 'lodash/range';
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { useTreeCount } from '../../hooks';
import BackgroundSVG from '../../images/bg-mountains.svg';
import SuperrareLogo from '../../images/superrare.png';
import { useAddressNFTs } from '../../utils/covalent';
import { useSuperrareProfile } from '../../utils/superrare';
import TokenLink from '../lib/TokenLink';
import ForestRenderer from '../sketches/ForestRenderer';

const Forest = () => {
  const { walletId }: { walletId: string } = useParams();
  const treeCount = useTreeCount(walletId);
  console.log(treeCount);

  const [nfts, nftsIsLoading] = useAddressNFTs(walletId);
  const [srProfile, srProfileLoading] = useSuperrareProfile(walletId);

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
            <TableCell>{`NFTrees owned (${treeCount})`}</TableCell>
            <TableCell>
              {range(treeCount).map((n) => (
                <TokenLink ownerAddress={walletId} index={n} />
              ))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div className="forest-wrapper">
        {srProfile && (
          <a className="sr-profile" href={srProfile.superRareUrl}>
            <div className="sr-avatar-wrap"><img src={srProfile.avatar} /></div>
            <div>
              <span className="sr-username">{`@${srProfile.username}`}</span>
              <br />
              <img className="sr-logo" src={SuperrareLogo} />
            </div>
          </a>
        )}
        <div className="nfts-wrapper">
          {nfts.map((nft) => (
            <a className="nft" href={nft.link} target="_blank" rel="noreferrer">
              <img src={nft.image} />
            </a>
          ))}
        </div>
        <ForestRenderer forestMode treeIds={_.times(treeCount)} />
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
    bottom: 20px;
  }


  .bg {
    width: 100%;
    position: absolute;
    z-index: 1;
    bottom: 0;
  }

  .nfts-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    height: 60px;
    overflow: hidden;
    bottom: 20px;
    position: absolute;

    .nft {
      height: 100%;
      position: relative;
      margin: 0 15px;
      transition: .5s all;
      transform: scale(.8);
      &:hover {
        transform: scale(1);
      }
    }
    img {
      display: block;
      height: 100%;
    }
  }
  .sr-profile {
    position: absolute;
    padding: 10px;
    left: 10px;
    top: -100px;
    width: 300px;
    height: 100px;
    background: rgba(0,0,0,.1);
    display: flex;
    border-radius: 10px;
    text-decoration: none;
    color: #000;
    &:hover {
      background: rgba(0,0,0,.2);
    }
    .sr-username {
      font-size: 20px;
      line-height: 30px;
      font-weight: bold;
    }
    .sr-logo {
      height: 14px;
      opacity: .7;
      margin-top: 5px;
    }
    .sr-avatar-wrap {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 10px;
      img {
        max-height: 100%;
      }
    }

  }

`;

export default Forest;
