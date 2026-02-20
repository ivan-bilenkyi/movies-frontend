import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

interface Props {
  children: React.ReactNode;
  redirectTo?: string;
}

const RestrictedRoute: React.FC<Props> = ({ children, redirectTo = '/' }) => {
  const isAuth = useAppSelector((s) => s.auth.isAuthenticated);
  const location = useLocation();

  const from = location.state?.from?.pathname || redirectTo;

  return isAuth ? <Navigate to={from} replace /> : <>{children}</>;
};

export default RestrictedRoute;
