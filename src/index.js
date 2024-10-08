import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

// Render the App component wrapped in BrowserRouter at the root of the application
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
