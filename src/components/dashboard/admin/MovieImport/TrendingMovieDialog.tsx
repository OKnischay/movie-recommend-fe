'use client';

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TrendingMoviesImport } from './TrendingMoviesImport';

interface TrendingMoviesDialogProps {
  trigger?: React.ReactNode;
}

export const TrendingMoviesDialog: React.FC<TrendingMoviesDialogProps> = ({ trigger }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-blue-500 hover:bg-blue-600">
            Import Trending Movies
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Import Trending Movies from TMDB</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          <TrendingMoviesImport />
        </div>
      </DialogContent>
    </Dialog>
  );
};
