import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {store} from "./store/index";
import {BrowserRouter as Router} from "react-router-dom";
import './plugins/axios';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<Router><Provider store={store}><App /></Provider></Router>
);