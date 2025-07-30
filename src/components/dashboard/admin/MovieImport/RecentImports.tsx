
'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { movieApi } from '@/lib/movieApi';
import { getImageUrl } from '@/lib/imageUtils';
import { Calendar, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MovieDetailsDialog } from '../MovieDetailsDialog'; 

export const RecentImports: React.FC = () => {
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data: recentMovies, isLoading } = useQuery({
    queryKey: ['recentMovies'],
    queryFn: () => movieApi.getMovies({ sort: 'newest', page_size: 10 }),
    staleTime: 2 * 60 * 1000,
  });

  const handleOpenDialog = (movieId: number) => {
    setSelectedMovieId(movieId);
    setDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-4 p-4 border rounded-lg animate-pulse dark:border-gray-700">
            <div className="w-16 h-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!recentMovies?.results?.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No movies imported yet.</p>
        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
          Start by importing some movies from TMDB!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {recentMovies.results.slice(0, 10).map((movie: any) => (
        <div
          key={movie.id}
          className="flex items-center space-x-4 p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors dark:border-gray-700"
        >
          <img
            src={getImageUrl(movie.poster_path, 'w200')}
            alt={movie.title}
            className="w-16 h-24 object-cover rounded cursor-pointer"
            onClick={() => handleOpenDialog(movie.id)}
            onError={(e) => {
              e.currentTarget.src = '/placeholder-movie.jpg';
            }}
          />

          <div className="flex-1 min-w-0 cursor-pointer" onClick={() => handleOpenDialog(movie.id)}>
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">{movie.title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">{movie.description}</p>
            <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{movie.duration || 0} min</span>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleOpenDialog(movie.id)}>
              <ExternalLink className="h-4 w-4 mr-1" />
              View
            </Button>
          </div>
        </div>
      ))}

      {recentMovies.results.length > 10 && (
        <div className="text-center pt-4">
          <Link href="/movies">
            <Button variant="outline">View All Movies</Button>
          </Link>
        </div>
      )}

      {selectedMovieId !== null && (
        <MovieDetailsDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          movieId={selectedMovieId}
        />
      )}
    </div>
  );
};
