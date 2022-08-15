import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { DataProvider } from './context';


ReactDOM.render(

  <BrowserRouter>
    <DataProvider>
      <App />
    </DataProvider>
  </BrowserRouter>
  ,
  document.getElementById('root')
);


