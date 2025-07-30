'use client'
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { TMDBMovieSearch } from './TMDBMovieSearch';
import { QuickImport } from './QuickImport';
import { PopularMoviesImport } from './PopularMoviesImport';

interface MovieImportDialogProps {
  trigger?: React.ReactNode;
}

export const MovieImportDialog: React.FC<MovieImportDialogProps> = ({ trigger }) => {
  const [activeTab, setActiveTab] = useState<'search' | 'quick' | 'popular'>('search');

  const tabs = [
    { id: 'search', label: 'Search TMDB', component: TMDBMovieSearch },
    { id: 'quick', label: 'Quick Import', component: QuickImport },
    { id: 'popular', label: 'Popular Movies', component: PopularMoviesImport },
  ];

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || (
          <Button className="bg-blue-500 hover:bg-blue-600">
            Import Movies
          </Button>
        )}
      </DialogTrigger>
      {/* <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden"> */}
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">

        <DialogHeader>
          <DialogTitle>Import Movies from TMDB</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col h-full">
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-4">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {tabs.map((tab) => (
              <div key={tab.id} className={activeTab === tab.id ? 'block' : 'hidden'}>
                <tab.component />
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};