import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import styled from 'styled-components';

import { useDrizzleInitialized } from '../hooks';
import RingsRenderer from './sketches/RingsRenderer';

const App = () => {
  const initialized = useDrizzleInitialized();
  return (
    <StyledWrapper>
      {!initialized && <LinearProgress />}
      <Container>
        <Grid container>
          <Grid item xs={12}>
            {initialized && <Typography>Ready</Typography>}
            <div className="ringsContainer">
              <RingsRenderer />
            </div>

          </Grid>
        </Grid>
      </Container>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .ringsContainer {
    width: 500px;
    height: 500px;
    position: relative;
  }
`;

export default App;
