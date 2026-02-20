import { useState } from 'react';
import toast from 'react-hot-toast';
import { fetchMovies } from '../moviesApi';
import type { Movie } from '../../../shared/types/movie.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import '../../../styles/search.css';

interface Props {
  onResults: (movies: Movie[]) => void;
  updateURLParams: () => void;
  titleQuery: string;
  setTitleQuery: React.Dispatch<React.SetStateAction<string>>;
  actorQuery: string;
  setActorQuery: React.Dispatch<React.SetStateAction<string>>;
  sortOrder: 'asc' | 'desc';
  setSortOrder: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>;
}

export default function MovieSearch({
  onResults,
  updateURLParams,
  titleQuery,
  setTitleQuery,
  actorQuery,
  setActorQuery,
  sortOrder,
  setSortOrder,
}: Props) {
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    updateURLParams();

    try {
      const movies = await fetchMovies({
        title: titleQuery || undefined,
        actor: actorQuery || undefined,
        sort: sortOrder,
      });
      onResults(movies);
    } catch (error) {
      toast('Failed to search movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSearch();
  };

  const toggleSort = () => {
    const newSort = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSort);
    handleSearch();
  };

  return (
    <div className="search-group">
      <div className="sort-button" onClick={toggleSort}>
        <FontAwesomeIcon
          icon={faArrowRightArrowLeft}
          className={`sort-icon ${sortOrder}`}
        />
        <span>{sortOrder === 'asc' ? 'Sort A-Z' : 'Sort Z-A'}</span>
      </div>
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search by movie title..."
          value={titleQuery}
          onChange={(e) => setTitleQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          className="search-input"
        />
      </div>

      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search by actor name..."
          value={actorQuery}
          onChange={(e) => setActorQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
          className="search-input"
        />
      </div>

      <button
        onClick={handleSearch}
        disabled={loading}
        className="search-button"
      >
        {loading ? 'Searching...' : 'Search'}
      </button>
    </div>
  );
}
