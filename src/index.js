import * as React from 'react';
import * as ReactDOM from 'react-dom';
import GlobalState from "./Context/";
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.render(
    <BrowserRouter>
      <GlobalState>
        <App />
      </GlobalState>
    </BrowserRouter>,

  document.getElementById('root')
);
