
'use client'
import React, { useState } from 'react';
import { useTrendingMovies } from '@/hooks/useMovieImport';
import { TMDBMovieCard } from './TMDBMovieCard';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';

export const TrendingMoviesImport: React.FC = () => {
  const { data, isLoading, error, refetch } = useTrendingMovies(); 

  const handleRefresh = async () => {
    const { data, error, status } = await refetch();
    if (status === 'success') {
      console.log('Refetched data:', data);
    } else {
      console.error('Refetch error:', error);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-gray-900">Trending Movies</h3>
          <p className="text-sm text-gray-600">
            Current trending movies from TMDB
          </p>
        </div>
        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={isLoading}
          className="flex items-center space-x-2"
        >
          <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </Button>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-700">Error: {error.message}</p>
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      )}

      {data && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.results.map((movie:any) => (
              <TMDBMovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};