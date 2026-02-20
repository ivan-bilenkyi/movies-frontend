import api from '../../api/axios';
import type { Movie } from '../../shared/types/movie.types';

interface MovieQuery {
  title?: string;
  actor?: string;
  sort?: 'asc' | 'desc';
}

export const fetchMovieById = (id: number) => api.get<Movie>(`/movies/${id}`);
export const createMovie = (data: Partial<Movie>) =>
  api.post<Movie>('/movies', data);
export const deleteMovie = (id: number): Promise<boolean> =>
  api.delete(`/movies/${id}`);
export const fetchMovies = async (query: MovieQuery = {}): Promise<Movie[]> => {
  const params = new URLSearchParams();
  if (query.title) params.append('title', query.title);
  if (query.actor) params.append('actor', query.actor);
  if (query.sort) params.append('sort', query.sort);

  const res = await api.get<Movie[]>(`/movies?${params.toString()}`);
  return res;
};
export const importMovies = (file: File) => {
  if (!file.name.endsWith('.txt')) {
    throw new Error('Only .txt files are allowed');
  }
  const formData = new FormData();
  formData.append('file', file);
  return api.post('/movies/import', formData);
};
