import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { useCurrentAddress, usePlantSeed } from '../../hooks';
import Page from '../lib/Page';
import Spinner from '../lib/Spinner';

const Home = () => {
  const currentAddress = useCurrentAddress();
  const [plantSeed, pending] = usePlantSeed();

  return (
    <Page>
      <Grid item xs={12}>
        <Typography paragraph>Welcome to NFTree</Typography>
        <Button
          color="primary"
          variant="contained"
          onClick={() => plantSeed()}
        >
          Plant an NFTree
        </Button>
        {pending && <Spinner />}

        <Link href={`/forest/${currentAddress}`}>See my forest</Link>

        <h2>What is this?</h2>
        <p>
          This project allows users to save and invest crypto in a fun new way and create NFT art at the same time.
          <ul>
            <li>
              <b>Plant an NFTree</b>
              - mint a new NFT that holds your funds and invests them in DeFI assets
            </li>
            <li>
              <b>Water your NFTrees</b>
              - deposit more funds into an NFTree to save and earn even more interest

            </li>
            <li>
              <b>View your NFTree forest</b>
              - view all of your active investments as a beautiful forest of growing trees

            </li>
            <li>
              <b>Chop down an NFTree</b>
              - chop down the tree to retrieve your funds and reveal the final form of the NFT
            </li>
          </ul>

          While your trees are growing, they can be viewed in our wallet renderer which shows all of your NFTrees, however you cannot view a single tree's NFT art as it still growing. Once you cut down an NFTree, the actual NFT art is created. Both a static rendering of the tree's rings that are tied to the growth of your investment, as well as an animation showing the growth progression over time.

          Users can of course buy/sell/trade their NFTrees before or after they have been cut down, for the actual value of invested as well as the speculative value of the unique art it will (or already did) turn into.

        </p>
      </Grid>
    </Page>
  );
};

export default Home;
