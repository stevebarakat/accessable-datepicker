import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import axe from 'react-axe';

if (process.env.NODE_ENV !== 'production') {
  axe(React, ReactDOM, 1000);
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
