import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

interface Props {
  children: React.JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const isAuth = useAppSelector((s) => s.auth.isAuthenticated);

  return isAuth ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
