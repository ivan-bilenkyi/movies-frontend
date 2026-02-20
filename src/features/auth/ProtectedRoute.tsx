import React, { useEffect, useState, type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setCredentials } from './authSlice';
import Loader from '../../shared/components/Loader';
import api from '../../api/axios';

interface Props {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((s) => s.auth.isAuthenticated);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const tryRefresh = async () => {
          try {
            await api.get<{ accessToken: string }>('/auth/refresh');
            dispatch(setCredentials());
          } catch (err) {
            const message =
              err instanceof Error
                ? err.message
                : typeof err === 'string'
                  ? err
                  : 'Unknown error';
            console.error(`Failed to refresh auth token: ${message}`);
          }
        };
        tryRefresh();
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : typeof err === 'string'
              ? err
              : 'Unknown error';
        console.error(`Failed to refresh auth token: ${message}`);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, [dispatch]);

  if (loading) return <Loader />;

  return isAuth ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
