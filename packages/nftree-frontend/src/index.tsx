import { drizzleReactHooks } from '@drizzle/react-plugin';
import CssBaseline from '@material-ui/core/CssBaseline';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import drizzle from './drizzle';

const { DrizzleProvider } = drizzleReactHooks;

ReactDOM.render(
  <StrictMode>
    <DrizzleProvider drizzle={drizzle}>
      <CssBaseline />
      <App />
    </DrizzleProvider>
  </StrictMode>,
  document.getElementById('root'),
);
