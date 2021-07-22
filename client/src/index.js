import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/global.css';
import {Provider} from './context';

ReactDOM.render(
  <React.StrictMode>
    <Provider>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

