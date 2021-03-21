import AppBar from '@material-ui/core/AppBar';
import LinearProgress from '@material-ui/core/LinearProgress';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import styled from 'styled-components';

import { useDrizzleInitialized } from '../hooks';
import logo from '../images/logo.png';
import Router from './Router';

const Logo = styled.img`
  margin: 10px 10px 10px 0;
  height: 100px;
`;

const App = () => {
  const initialized = useDrizzleInitialized();
  return (
    <>
      <AppBar position="static">
        <ToolBar>
          <Logo src={logo} />
          <Typography variant="h3" component="h1">NFTree</Typography>
        </ToolBar>
      </AppBar>
      {initialized ? <Router /> : <LinearProgress />}
    </>
  );
};

export default App;
