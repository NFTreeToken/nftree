import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Forest from './pages/Forest';
import Home from './pages/Home';
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
        <Home />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Router;
