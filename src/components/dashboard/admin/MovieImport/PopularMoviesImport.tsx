'use client'
import React, { useState } from 'react';
import { usePopularMovies } from '@/hooks/useMovieImport';
import { TMDBMovieCard } from './TMDBMovieCard';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';

export const PopularMoviesImport: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, refetch } = usePopularMovies(currentPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // const handleRefresh = () => {
  //   refetch();
  // };
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
          <h3 className="font-semibold text-gray-900">Popular Movies</h3>
          <p className="text-sm text-gray-600">
            Current popular movies from TMDB
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

          {/* Pagination */}
          {data.total_pages > 1 && (
            <div className="flex justify-center space-x-2 mt-6">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              <span className="flex items-center px-4 py-2 text-sm text-gray-600">
                Page {data.page} of {data.total_pages}
              </span>
              
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === data.total_pages}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};