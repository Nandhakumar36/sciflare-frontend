import React from 'react';
import { Navigate } from 'react-router-dom';
import { fetch } from '../services/local-storage';

const PublicRoute = ({ element: Element, restricted, ...rest }) => {
  const isAuthenticated = fetch('authToken'); // Replace with your actual authentication logic

  return isAuthenticated && restricted ? <Navigate to="/dashboard" /> : <Element {...rest} />;
};

export default PublicRoute;
