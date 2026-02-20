import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFilm,
  faArrowUpFromBracket,
} from '@fortawesome/free-solid-svg-icons';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logout } from '../features/auth/authSlice';
import '../styles/header.css';
import { logoutApi } from '../features/auth/authApi';

export default function Header() {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = async () => {
    await logoutApi();
    dispatch(logout());
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/movies" className="navbar-logo ">
            <FontAwesomeIcon icon={faFilm} color="#ff3300" />
            Movies
          </Link>

          <div className="navbar-menu">
            <Link to="/movies" className="navbar-link">
              Movies
            </Link>

            {isAuthenticated ? (
              <div className="navbar-user">
                <button className="navbar-link" onClick={handleLogout}>
                  <FontAwesomeIcon
                    icon={faArrowUpFromBracket}
                    className="logout-icon"
                  />
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="navbar-link navbar-link-primary"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
