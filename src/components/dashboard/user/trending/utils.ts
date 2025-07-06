import { Movie, TrendingStats } from "./types"
export const getPosterUrl = (movie: Movie): string => {
  if (movie.poster_url) return movie.poster_url
  if (movie.poster) return movie.poster
  if (movie.poster_path) {
    return movie.poster_path.startsWith('http') 
      ? movie.poster_path 
      : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
  }
  return ''
}

export const getMovieRating = (movie: Movie): string => {
  const rating = movie.rating || movie.vote_average || 0
  return rating.toFixed(1)
}

export const getMovieYear = (movie: Movie): string => {
  if (movie.year) return movie.year.toString()
  if (movie.release_date) return new Date(movie.release_date).getFullYear().toString()
  return 'N/A'
}

export const getMovieGenres = (movie: Movie): string[] => {
  if (movie.genres) {
    return movie.genres.map(g => g.name);
  }
  if (movie.genre) {
    return Array.isArray(movie.genre) ? movie.genre : [movie.genre];
  }
  return [];
};

export const getAllGenres = (movies: Movie[]): string[] => {
  const genreSet = new Set<string>();
  movies.forEach(movie => {
    const genres = getMovieGenres(movie);
    genres.forEach(genre => {
      if (genre) genreSet.add(genre);
    });
  });
  return Array.from(genreSet).sort();
};

export const getAllUniqueGenres = (movies: Movie[]): string[] => {
  const genreSet = new Set<string>();
  movies.forEach(movie => {
    const genres = getMovieGenres(movie);
    genres.forEach(genre => {
      if (genre) genreSet.add(genre);
    });
  });
  return Array.from(genreSet).sort();
};

export const getFilteredMovies = (movies: Movie[], genreFilter: string): Movie[] => {
  let filtered = [...movies]

  if (genreFilter !== "all") {
    filtered = filtered.filter((movie) => 
      getMovieGenres(movie).some((g) => g.toLowerCase().includes(genreFilter.toLowerCase()))
    )
  }

  filtered.sort((a, b) => (a.trendingRank || 0) - (b.trendingRank || 0))
  return filtered
}

export const getTrendingStats = (movies: Movie[]): TrendingStats => {
  const totalViews = movies.reduce((sum, movie) => sum + (movie.viewsThisWeek || 0), 0)
  const avgRating = movies.length > 0 
    ? movies.reduce((sum, movie) => sum + parseFloat(getMovieRating(movie)), 0) / movies.length
    : 0

  const genreCount: Record<string, number> = {}
  movies.forEach((movie) => {
    getMovieGenres(movie).forEach((g) => {
      genreCount[g] = (genreCount[g] || 0) + 1
    })
  })
  const topGenre = Object.entries(genreCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"

  return {
    totalViews: totalViews.toLocaleString(),
    avgRating: avgRating.toFixed(1),
    topGenre,
    moviesCount: movies.length,
  }
}