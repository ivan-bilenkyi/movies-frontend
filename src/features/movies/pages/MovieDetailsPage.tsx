import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faFileVideo } from '@fortawesome/free-solid-svg-icons';

import { fetchMovieById } from '../moviesApi';
import type { Movie } from '../../../shared/types/movie.types';
import '../../../styles/movies.css';

export default function MovieDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const res = await fetchMovieById(Number(id));
        setMovie(res);
      } catch (error) {
        console.error('Failed to load movie:', error);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [id]);

  if (loading) {
    return (
      <div className="movie-details-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading movie details...</p>
        </div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-details-page">
        <button className="back-button" onClick={() => navigate('/movies')}>
          ← Back
        </button>
        <div className="empty-state">
          <p>Movie not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="movie-details-page">
      <button className="back-button" onClick={() => navigate('/movies')}>
        ← Back to movies
      </button>

      <div className="movie-details-container">
        <div className="movie-details-content">
          <div className="movie-details-header">
            <h1>{movie.title}</h1>
            <div className="movie-meta">
              <span className="meta-item">
                <FontAwesomeIcon icon={faCalendar} /> {movie.releaseYear}
              </span>
              <span className="meta-item">
                <FontAwesomeIcon icon={faFileVideo} /> {movie.format}
              </span>
            </div>
          </div>

          <div className="movie-details-info">
            <div className="info-section">
              <h3>Actors</h3>
              <div className="actors-list">
                {movie.actors && movie.actors.length > 0 ? (
                  <div className="actors">
                    {movie.actors.map((actor) => (
                      <span key={actor} className="actor-badge">
                        {actor}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="no-data">No cast information available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
