// import React from 'react';
// import { TMDBMovie } from '@/types/movies';
// import { getImageUrl } from '@/lib/imageUtils';
// import { useImportTMDBMovie } from '@/hooks/useMovieImport';

// interface TMDBMovieCardProps {
//   movie: TMDBMovie;
//   showImportButton?: boolean;
// }

// export const TMDBMovieCard: React.FC<TMDBMovieCardProps> = ({ 
//   movie, 
//   showImportButton = true 
// }) => {
//   const importMutation = useImportTMDBMovie();

//   const handleImport = () => {
//     importMutation.mutate(movie.id);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//       <div className="relative">
//         <img
//           src={getImageUrl(movie.poster_path)}
//           alt={movie.title}
//           className="w-full h-64 object-cover"
//           onError={(e) => {
//             e.currentTarget.src = '/placeholder-movie.jpg';
//           }}
//         />
//         {movie.locally_available && (
//           <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs">
//             Available
//           </div>
//         )}
//       </div>
      
//       <div className="p-4">
//         <h3 className="font-semibold text-lg mb-2 line-clamp-2">{movie.title}</h3>
//         <p className="text-gray-600 text-sm mb-2">
//           {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
//         </p>
//         <p className="text-gray-700 text-sm mb-3 line-clamp-3">{movie.overview}</p>
        
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <span className="text-yellow-500">⭐</span>
//             <span className="text-sm">{movie.vote_average.toFixed(1)}</span>
//           </div>
          
//           {showImportButton && !movie.locally_available && (
//             <button
//               onClick={handleImport}
//               disabled={importMutation.isPending}
//               className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 text-white px-3 py-1 rounded text-sm transition-colors"
//             >
//               {importMutation.isPending ? 'Importing...' : 'Import'}
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

import React from 'react';
import { TMDBMovie } from '@/types/movies';
import { getImageUrl } from '@/lib/imageUtils';
import { useImportTMDBMovie } from '@/hooks/useMovieImport';

interface TMDBMovieCardProps {
  movie: TMDBMovie;
  showImportButton?: boolean;
}

export const TMDBMovieCard: React.FC<TMDBMovieCardProps> = ({ 
  movie, 
  showImportButton = true 
}) => {
  const importMutation = useImportTMDBMovie();

  const handleImport = () => {
    importMutation.mutate(movie.id);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-64 object-cover"
          onError={(e) => {
            e.currentTarget.src = '/placeholder.svg';
          }}
        />
        {movie.locally_available && (
          <div className="absolute top-2 right-2 bg-green-500 dark:bg-green-600 text-white px-2 py-1 rounded text-xs">
            Available
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-gray-900 dark:text-white">
          {movie.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
          {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
        </p>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3 line-clamp-3">
          {movie.overview}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-yellow-500">⭐</span>
            <span className="text-sm dark:text-gray-200">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
          
          {showImportButton && !movie.locally_available && (
            <button
              onClick={handleImport}
              disabled={importMutation.isPending}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-400 dark:disabled:bg-gray-600 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              {importMutation.isPending ? 'Importing...' : 'Import'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};