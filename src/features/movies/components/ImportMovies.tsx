import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSpinner,
  faFileUpload,
  faFileImport,
} from '@fortawesome/free-solid-svg-icons';

import { importMovies } from '../moviesApi';
import '../../../styles/import.css';

interface Props {
  onSuccess: () => void;
}

export default function ImportMovies({ onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];

    if (!file.name.endsWith('.txt')) {
      setError('Only .txt files are allowed');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await importMovies(file);
      setSuccess(`Successfully imported ${file.name}`);
      onSuccess();
      e.target.value = '';
    } catch (err: any) {
      setError(err.response?.data?.message || 'Import failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="import-movies">
      <div className="import-info">
        <div>
          <FontAwesomeIcon icon={faFileImport} />
          <p>Upload a .txt file with movies (one per line)</p>
        </div>
        <small>Format: Title | Release Year | Format | Stars</small>
      </div>

      {error && <div className="import-error">{error}</div>}
      {success && <div className="import-success">{success}</div>}

      <label className="import-label">
        <input
          type="file"
          accept=".txt"
          onChange={handleFile}
          disabled={loading}
          className="import-input"
        />
        <span className="import-button flex items-center gap-2">
          {loading ? (
            <>
              <FontAwesomeIcon icon={faSpinner} spin />
              Importing...
            </>
          ) : (
            <>
              <FontAwesomeIcon icon={faFileUpload} />
              Choose .txt file
            </>
          )}
        </span>
      </label>
    </div>
  );
}
