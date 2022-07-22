import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GlobalState from "./Context/";
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
    <HashRouter>
      <GlobalState>
        <App />
      </GlobalState>
    </HashRouter>,

  document.getElementById('root')
);
