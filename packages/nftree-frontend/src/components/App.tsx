import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import styled from 'styled-components';

import { useDrizzleInitialized } from '../hooks';
import logo from '../images/logo.png';
import Router from './Router';

const App = () => {
  const initialized = useDrizzleInitialized();
  return (
    <StyledWrapper>
      {!initialized && <LinearProgress />}

      <div className="header-bar">

        {/* <a href="/" className="logo">
          <img src={logo} />
          NFTree
        </a> */}

        <a href="/">home</a>
        <a href="/nftree/123">Tree 123</a>
        <a href="/forest/123">Wallet 123</a>
      </div>

      {initialized && <Router />}
      {/* <Container>
        <Grid container>
          <Grid item xs={12}>

          </Grid>
        </Grid>
      </Container> */}

    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .logo {
    display: block;
    height: 100%;
    img {
      display: block;
      max-height: 100%;
    }
  }
  .header-bar {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100px;
    background: red;
    z-index: 100;
  }
`;

export default App;
