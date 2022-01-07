import React from 'react';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { Navigate, Outlet } from 'react-router-dom';
import Spinner from './Spinner';

const PrivateRoute = () => {
  const { isLoggedIn, isLoading } = useAuthStatus();

    if (isLoading) {
      return <Spinner />;
    }

    return isLoggedIn ? <Outlet /> : <Navigate to="/signin" />
}

export default PrivateRoute
