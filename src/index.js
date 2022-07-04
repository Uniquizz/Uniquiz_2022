import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GlobalState from "./Context/";
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalState>
        <App />
      </GlobalState>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById('root')
);
