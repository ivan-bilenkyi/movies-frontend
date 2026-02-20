import { Routes, Route } from 'react-router-dom';
import MoviesPage from '../features/movies/pages/MoviesPage';
import MovieDetailsPage from '../features/movies/pages/MovieDetailsPage';
import LoginPage from '../features/auth/LoginPage';
import RegisterPage from '../features/auth/RegisterPage';
import ProtectedRoute from '../features/auth/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

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
  );
}
