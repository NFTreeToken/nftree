import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Dashboard from './Dashboard';
import NFTree from './NFTree';

const Router = () => (
  <BrowserRouter>
    <Switch>
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
