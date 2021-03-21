import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';

import { useDrizzleInitialized } from '../hooks';
import Router from './Router';

const App = () => {
  const initialized = useDrizzleInitialized();
  return (
    <>
      {!initialized && <LinearProgress />}
      <Container>
        <Grid container>
          <Grid item xs={12}>
            {initialized && <Router />}
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default App;
