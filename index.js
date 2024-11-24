import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import './src/index.scss';
import App from './src/App';
import "macro-css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <Router>
        <App />
    </Router>
  // </React.StrictMode>
);

