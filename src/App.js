import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signin from './Signin';
import Home from './Home';
import PublicRoute from './routes/publicRoutes';
import PrivateRoute from './routes/privateRoutes';
import Users from './Users';
import Profile from './Profile';
function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute restricted={false} element={Signin} />} />
      <Route path="/dashboard" element={<PrivateRoute element={Home} />} />
      <Route path="/home" element={<Home />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
      {/* Add more routes as needed */}
    </Routes>
  );
}

export default App;
