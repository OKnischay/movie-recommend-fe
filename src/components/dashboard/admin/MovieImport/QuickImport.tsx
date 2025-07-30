'use client'
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearchAndImportMovie } from '@/hooks/useMovieImport';
import { Loader2, Plus } from 'lucide-react';

export const QuickImport: React.FC = () => {
  const [query, setQuery] = useState('');
  const searchAndImportMutation = useSearchAndImportMovie();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      searchAndImportMutation.mutate(query.trim());
      setQuery('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <h3 className="font-semibold text-blue-900 mb-2">Quick Import</h3>
        <p className="text-blue-700 text-sm">
          Enter a movie title to automatically find and import the best match from TMDB.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="movie-title" className="block text-sm font-medium text-gray-700 mb-2">
            Movie Title
          </label>
          <Input
            id="movie-title"
            type="text"
            placeholder="e.g., The Dark Knight, Inception, Pulp Fiction"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
          />
        </div>

        <Button
          type="submit"
          disabled={!query.trim() || searchAndImportMutation.isPending}
          className="w-full"
        >
          {searchAndImportMutation.isPending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Importing...
            </>
          ) : (
            <>
              <Plus className="h-4 w-4 mr-2" />
              Import Movie
            </>
          )}
        </Button>
      </form>

      {searchAndImportMutation.error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-700">
            Error: {searchAndImportMutation.error.response?.data?.error || 'Failed to import movie'}
          </p>
        </div>
      )}
    </div>
  );
};
