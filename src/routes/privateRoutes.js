import React from 'react';
import { Navigate } from 'react-router-dom';
import { fetch } from '../services/local-storage';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const isAuthenticated = fetch('authToken'); // Replace with your actual authentication logic

  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
