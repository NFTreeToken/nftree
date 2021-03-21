import {
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, MenuItem, Select, TextField,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import PropTypes, { InferProps } from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';

import { AAVE_TOKEN_ADDRESSES } from '../../data/constants';
import { useCurrentAddress, usePlantSeed } from '../../hooks';
import Page from '../lib/Page';
import Spinner from '../lib/Spinner';

const PlantButton = styled(Button)`
  margin: 10px 0;
`;

const Section = styled.div`
  margin-bottom: 50px;
`;

const plantDialogPropTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  tryPlant: PropTypes.func.isRequired,
};

const PlantDialog = ({ isOpen, close, tryPlant }: InferProps<typeof plantDialogPropTypes>) => {
  const [newTreeAssetType, setNewTreeAssetType] = useState('WETH');
  const [newTreeAssetAmount, setNewTreeAssetAmount] = useState(1);
  const [newTreeName, setNewTreeName] = useState('');

  return (
    <Dialog open={isOpen} onClose={close} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Plant an NFTree</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <b>You are about to plant a new NFTree.</b>
          <br />
          <p>
            Select the type of asset and amount that you would like to save. These funds will be  deposited into interest bearing aave tokens so they grow along with your tree.
          </p>
          <p>
            When you are ready, you can chop down your tree to retreive your funds along with an NFT showing the history of it's growth.
          </p>
        </DialogContentText>

        <TextField
          autoFocus
          id="name"
          label="Name your tree"
          value={newTreeName}
          onChange={(e) => setNewTreeName(e.target.value)}
          fullWidth
        />

        <Select
          fullWidth
          value={newTreeAssetType}
          onChange={(e) => setNewTreeAssetType(e.target.value as string)}
        >
          {AAVE_TOKEN_ADDRESSES.map((token) => (
            <MenuItem value={token.symbol}>{token.symbol}</MenuItem>
          ))}
        </Select>
        <TextField
          label="Initial Deposit Amount"
          type="number"
          value={newTreeAssetAmount}
          onChange={(e) => setNewTreeAssetAmount(parseFloat(e.target.value))}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          Cancel
        </Button>
        <Button onClick={() => tryPlant()} color="primary">
          Plant Your NFTree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

PlantDialog.propTypes = plantDialogPropTypes;

const Home = () => {
  const currentAddress = useCurrentAddress();
  const [plantSeed, pending] = usePlantSeed();
  const [plantPopupIsOpen, setPlantPopupIsOpen] = useState(false);

  function tryPlant() {
    plantSeed();
    setPlantPopupIsOpen(false);
  }

  return (
    <Page>
      <Grid item xs={12}>
        <Section>
          <Typography variant="h4" paragraph component="h2">Welcome to NFTree</Typography>
          <PlantButton
            color="primary"
            variant="contained"
            onClick={() => setPlantPopupIsOpen(true)}
          >
            Plant an NFTree
          </PlantButton>

          <PlantDialog
            isOpen={plantPopupIsOpen}
            close={() => setPlantPopupIsOpen(false)}
            tryPlant={tryPlant}
          />
          {pending && <Spinner />}

          <Typography variant="body2" paragraph>
            Already own NFTrees?&nbsp;
            <Link href={`/forest/${currentAddress}`} color="secondary">View your forest</Link>
          </Typography>
        </Section>
        <Section>
          <Typography variant="h4" paragraph component="h2">What is this?</Typography>
          <Typography>
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

          </Typography>
        </Section>
      </Grid>
    </Page>
  );
};

export default Home;
