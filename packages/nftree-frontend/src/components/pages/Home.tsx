import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import Page from '../lib/Page';

const Home = () => (
  <Page>
    <Grid item xs={12}>
      <Typography paragraph>Welcome to NFTree</Typography>
      <Button color="primary" variant="contained">Plant an NFTree</Button>
    </Grid>
  </Page>
);

export default Home;
