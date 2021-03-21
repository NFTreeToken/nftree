import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './pages/Dashboard';
import Forest from './pages/Forest';
import NFTree from './pages/NFTree';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/forest/:walletId">
        <Forest />
      </Route>
      <Route path="/nftree/:tokenId">
        <NFTree />
      </Route>
      <Route path="/">
        <Dashboard />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
