import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faPlus,
  faFileImport,
} from '@fortawesome/free-solid-svg-icons';

import { deleteMovie, fetchMovies } from '../moviesApi';
import MovieList from '../components/MovieList';
import MovieForm from '../components/MovieForm';
import MovieSearch from '../components/MovieSearch';
import ImportMovies from '../components/ImportMovies';
import type { Movie } from '../../../shared/types/movie.types';
import '../../../styles/movies.css';
import { useSearchParams } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const [titleQuery, setTitleQuery] = useState(searchParams.get('title') || '');
  const [actorQuery, setActorQuery] = useState(searchParams.get('actor') || '');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [activeTab, setActiveTab] = useState<'browse' | 'add' | 'import'>(
    'browse',
  );

  useEffect(() => {}, []);

  const updateURLParams = () => {
    const params: Record<string, string> = {};
    if (titleQuery.trim()) params.title = titleQuery;
    if (actorQuery.trim()) params.actor = actorQuery;
    if (sortOrder) params.sort = sortOrder;
    setSearchParams(params);
  };

  const loadMovies = async () => {
    try {
      setLoading(true);
      const res = await fetchMovies(
        titleQuery || actorQuery || sortOrder
          ? { title: titleQuery, actor: actorQuery, sort: sortOrder }
          : undefined,
      );

      setMovies(res);
    } catch (error) {
      console.error('Failed to load movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      const success = await deleteMovie(id);
      if (success) {
        toast.success(
          `Movie "${movies.find((m) => m.id === id)?.title}" deleted successfully`,
        );
        setMovies((prev) => prev.filter((movie) => movie.id !== id));
      } else {
        toast.error('Failed to delete movie');
      }
    } catch (err) {
      toast.error('Failed to delete movie');
      console.error(err);
    }
  };

  return (
    <div className="movies-page">
      <div className="movies-top-section">
        <h1>🎥 My Movies</h1>
      </div>

      {/* Tabs */}
      <div className="movies-tabs">
        <button
          className={`movies-tab ${activeTab === 'browse' ? 'active' : ''}`}
          onClick={() => setActiveTab('browse')}
        >
          <FontAwesomeIcon icon={faBook} className="mr-2" />
          Browse
        </button>

        <button
          className={`movies-tab ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          <FontAwesomeIcon icon={faPlus} className="mr-2" />
          Add Movie
        </button>

        <button
          className={`movies-tab ${activeTab === 'import' ? 'active' : ''}`}
          onClick={() => setActiveTab('import')}
        >
          <FontAwesomeIcon icon={faFileImport} className="mr-2" />
          Import CSV
        </button>
      </div>

      <div className="movies-content">
        {activeTab === 'browse' && (
          <div className="tab-content">
            {loading ? (
              <div className="movies-loading">
                <div className="spinner"></div>
                <p>Loading movies...</p>
              </div>
            ) : movies?.length === 0 ? (
              <div className="movies-empty">
                <p>📭 No movies found</p>
                <small>Start by adding or importing movies</small>
              </div>
            ) : (
              <>
                <div className="movies-panel">
                  Found {movies?.length} movie{movies?.length !== 1 ? 's' : ''}
                  <MovieSearch
                    onResults={setMovies}
                    updateURLParams={updateURLParams}
                    titleQuery={titleQuery}
                    setTitleQuery={setTitleQuery}
                    actorQuery={actorQuery}
                    setActorQuery={setActorQuery}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                  />
                </div>
                <MovieList movies={movies} handleDelete={handleDelete} />
              </>
            )}
          </div>
        )}

        {activeTab === 'add' && (
          <div className="tab-content">
            <MovieForm onSuccess={loadMovies} />
          </div>
        )}

        {activeTab === 'import' && (
          <div className="tab-content">
            <ImportMovies onSuccess={loadMovies} />
          </div>
        )}
      </div>
    </div>
  );
}
