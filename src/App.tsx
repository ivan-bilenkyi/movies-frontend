import { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setCredentials } from './features/auth/authSlice';
import Layout from './layout/Layout';
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import MoviesPage from './features/movies/pages/MoviesPage';
import MovieDetailsPage from './features/movies/pages/MovieDetailsPage';
import ProtectedRoute from './features/auth/ProtectedRoute';
import api from './api/axios';
import toast from 'react-hot-toast';
import RestrictedRoute from './features/auth/RestrictedRoute';

export default function App() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((s) => s.auth.isAuthenticated);

  useEffect(() => {
    if (!isAuth) {
      return;
    }

    const tryRefresh = async () => {
      try {
        await api.get('/auth/refresh');
        dispatch(setCredentials());
      } catch (err: unknown) {
        const message =
          err instanceof Error
            ? err.message
            : typeof err === 'string'
              ? err
              : 'Unknown error';
        toast(`Failed to refresh auth token: ${message}`);
      }
    };

    tryRefresh();
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/movies" replace />} />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/movies">
                <LoginPage />
              </RestrictedRoute>
            }
          />

          <Route
            path="/register"
            element={
              <RestrictedRoute redirectTo="/movies">
                <RegisterPage />
              </RestrictedRoute>
            }
          />

          <Route
            path="/movies"
            element={
              <ProtectedRoute>
                <MoviesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/movies/:id"
            element={
              <ProtectedRoute>
                <MovieDetailsPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}
