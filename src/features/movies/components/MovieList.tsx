import React from 'react';
import type { Movie } from '../../../shared/types/movie.types';
import MovieCard from './MovieCard';

interface Props {
  movies: Movie[];
  handleDelete: (id: number) => void;
}

const MovieList: React.FC<Props> = ({ movies, handleDelete }) => {
  return (
    <div>
      {movies?.map((movie) => (
        <MovieCard key={movie.id} movie={movie} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default MovieList;
