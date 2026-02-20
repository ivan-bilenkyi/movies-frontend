import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import type { Movie } from '../../../shared/types/movie.types';
import movieImg from '../../../assets/movie.png';
import './MovieCard.css';

interface Props {
  movie: Movie;
  onDelete: (id: number) => void;
}

const MovieCard: React.FC<Props> = ({ movie, onDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movies/${movie.id}`);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    e.stopPropagation();
    onDelete(id);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <img src={movieImg} alt={movie.title} className="movie-image" />
      <div className="movie-description">
        <h3>{movie.title}</h3>
        <p>
          <b>Release Year: </b>
          {movie.releaseYear}
        </p>
        <p>
          <b>Format: </b>
          {movie.format}
        </p>
        <p className="movie-actors">
          <b>Actors: </b>
          {movie.actors && movie.actors.length > 0
            ? movie.actors.join(', ')
            : 'No actors listed'}
        </p>
      </div>
      <button
        className="movie-trash-button"
        onClick={(e) => handleDelete(e, movie.id)}
        aria-label={`Delete ${movie.title}`}
      >
        <FontAwesomeIcon icon={faTrashCan} className="movie-trash-icon" />
      </button>
    </div>
  );
};

export default MovieCard;
