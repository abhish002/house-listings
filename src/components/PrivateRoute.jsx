import React from 'react';

import { Navigate, Outlet } from 'react-router-dom';

import Spinner from './Spinner';

import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = () => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <Spinner />;
  }

  return currentUser ? <Outlet /> : <Navigate to="/signin" />
}

export default PrivateRoute;
