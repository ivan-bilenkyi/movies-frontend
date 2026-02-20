import React, { useState } from 'react';
import Input from '../../../shared/components/Input';
import Button from '../../../shared/components/Button';
import { createMovie } from '../moviesApi';
import './MovieForm.css';

export default function MovieForm({ onSuccess }: { onSuccess?: () => void }) {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [format, setFormat] = useState('');
  const [actors, setActors] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const reset = () => {
    setTitle('');
    setYear('');
    setFormat('');
    setActors('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!title.trim() || !year || !format.trim()) {
      setError('Please fill Title, Year and Format');
      return;
    }

    const starNames = actors
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    setLoading(true);
    try {
      await createMovie({
        title: title.trim(),
        releaseYear: Number(year),
        format: format.trim(),
        actors: starNames,
      });
      setSuccess('Movie added');
      reset();
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err.message || 'Failed to add movie',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="movie-form" onSubmit={handleSubmit}>
      <div className="field">
        <label>Title</label>
        <Input
          placeholder="Movie title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Release Year</label>
        <Input
          placeholder="e.g. 1999"
          type="number"
          value={year as any}
          onChange={(e) =>
            setYear(e.target.value === '' ? '' : Number(e.target.value))
          }
        />
      </div>

      <div className="field">
        <label>Format</label>
        <Input
          placeholder="Format (e.g. DVD, Blu-Ray)"
          value={format}
          onChange={(e) => setFormat(e.target.value)}
        />
      </div>

      <div className="field">
        <label>Actors</label>
        <Input
          placeholder="Comma separated names"
          value={actors}
          onChange={(e) => setActors(e.target.value)}
        />
      </div>

      <div className="actions">
        <Button type="submit" disabled={loading}>
          {loading ? 'Adding...' : 'Add Movie'}
        </Button>
      </div>

      {error && <div className="error">{error}</div>}
      {success && <div className="success">{success}</div>}
    </form>
  );
}
