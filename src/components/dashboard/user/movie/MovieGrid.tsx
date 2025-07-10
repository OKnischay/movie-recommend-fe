// import { Card } from "@/components/ui/card";
import { DashboardMovie } from "@/types/movies";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

interface Props {
  movies: DashboardMovie[];
  showMatchScore?: boolean;
  isLoading?: boolean;
  onWatchlistToggle?: (movieId: number, isInWatchlist: boolean) => Promise<void> | void
  onFavoriteToggle?: (movieId: number, isFavorite: boolean) => Promise<void> | void
  onRating?: (movieId: number, rating: number) => Promise<void> | void
}

export default function MovieGrid({ movies, showMatchScore = false, isLoading = false,onWatchlistToggle,
  onFavoriteToggle,
  onRating, }: Props) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {Array.from({ length: 12 }).map((_, i) => (
          <MovieCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (movies.length === 0) {
    return <div className="text-center py-12 text-muted-foreground">No movies found</div>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
      {movies.map((movie) => (
        // <MovieCard key={movie.id} movie={movie} showMatchScore={showMatchScore} />
        <MovieCard
          key={movie.id}
          movie={movie}
          showMatchScore={showMatchScore}
          onWatchlistToggle={onWatchlistToggle}
          onFavoriteToggle={onFavoriteToggle}
          onRating={onRating}
        />
      ))}
    </div>
  );
}
// import MovieCard from "./MovieCard";
// import MovieCardSkeleton from "./MovieCardSkeleton";
// import type { DashboardMovie } from "@/types/movies";

// interface Props {
//   movies: DashboardMovie[];
//   showMatchScore?: boolean;
//   isLoading?: boolean;
//   onWatchlistToggle?: (movieId: number, isInWatchlist: boolean) => void;
//   onFavoriteToggle?: (movieId: number, isFavorite: boolean) => void;
//   onRating?: (movieId: number, rating: number) => void;
// }

// export default function MovieGrid({
//   movies,
//   showMatchScore = false,
//   isLoading = false,
//   onWatchlistToggle,
//   onFavoriteToggle,
//   onRating,
// }: Props) {
//   if (isLoading) {
//     return (
//       <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//         {Array.from({ length: 12 }).map((_, i) => (
//           <MovieCardSkeleton key={i} />
//         ))}
//       </div>
//     );
//   }

//   if (movies.length === 0) {
//     return <div className="text-center py-12 text-muted-foreground">No movies found</div>;
//   }

//   return (
//     <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//       {movies.map((movie) => (
//         <MovieCard
//           key={movie.id}
//           movie={movie}
//           showMatchScore={showMatchScore}
//           onWatchlistToggle={onWatchlistToggle}
//           onFavoriteToggle={onFavoriteToggle}
//           onRating={onRating}
//         />
//       ))}
//     </div>
//   );
// }
