// import type { MoviesResponse, WatchlistResponse, RatingResponse } from "@/types/movies"

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"

// export class ApiError extends Error {
//   constructor(
//     public status: number,
//     message: string,
//   ) {
//     super(message)
//     this.name = "ApiError"
//   }
// }

// async function fetchApi<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
//   const url = `${API_BASE_URL}${endpoint}`

//   const response = await fetch(url, {
//     headers: {
//       "Content-Type": "application/json",
//       ...options.headers,
//     },
//     ...options,
//   })

//   if (!response.ok) {
//     throw new ApiError(response.status, `API Error: ${response.statusText}`)
//   }

//   return response.json()
// }

// export const movieApi = {
//   // Get movies with pagination - default to smaller page size
//   getMovies: async (page = 1, pageSize = 12) => {
//     return fetchApi<MoviesResponse>(`/movies/movies/?page=${page}&page_size=${pageSize}`)
//   },

//   // Get trending movies with pagination
//   getTrendingMovies: async (page = 1, pageSize = 12) => {
//     return fetchApi<MoviesResponse>(`/movies/trending/?page=${page}&page_size=${pageSize}`)
//   },

//   // Get movie recommendations with pagination
//   getRecommendations: async (page = 1, pageSize = 8) => {
//     return fetchApi<MoviesResponse>(`/movies/recommendations/?page=${page}&page_size=${pageSize}`)
//   },

//   // Get user's watchlist with pagination
//   getWatchlist: async (page = 1, pageSize = 12) => {
//     return fetchApi<MoviesResponse>(`/movies/watchlist/?page=${page}&page_size=${pageSize}`)
//   },

//   // Add movie to watchlist
//   addToWatchlist: async (movieId: number) => {
//     return fetchApi<WatchlistResponse>(`/movies/watchlist/add/`, {
//       method: "POST",
//       body: JSON.stringify({ movie_id: movieId }),
//     })
//   },

//   // Remove movie from watchlist
//   removeFromWatchlist: async (movieId: number) => {
//     return fetchApi<WatchlistResponse>(`/movies/watchlist/remove/`, {
//       method: "POST",
//       body: JSON.stringify({ movie_id: movieId }),
//     })
//   },

//   // Rate a movie
//   rateMovie: async (movieId: number, rating: number) => {
//     return fetchApi<RatingResponse>(`/movies/rate/`, {
//       method: "POST",
//       body: JSON.stringify({ movie_id: movieId, rating }),
//     })
//   },

//   // Search movies with pagination
//   searchMovies: async (query: string, page = 1, pageSize = 12) => {
//     return fetchApi<MoviesResponse>(`/movies/search/?q=${encodeURIComponent(query)}&page=${page}&page_size=${pageSize}`)
//   },

//   // Get movies by genre with pagination
//   getMoviesByGenre: async (genreId: number, page = 1, pageSize = 12) => {
//     return fetchApi<MoviesResponse>(`/movies/genre/${genreId}/?page=${page}&page_size=${pageSize}`)
//   },

//   // Get movie details by ID
//   getMovieById: async (movieId: number) => {
//     return fetchApi(`/movies/movies/${movieId}/`)
//   },
// }

// // Legacy API exports for backward compatibility
// export const authAPI = {
//   login: async (email: string, password: string) => {
//     const response = await fetch(`${API_BASE_URL}/auth/login`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password }),
//     })
//     return response.json()
//   },

//   register: async (email: string, password: string, preferences: any) => {
//     const response = await fetch(`${API_BASE_URL}/auth/register`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, password, preferences }),
//     })
//     return response.json()
//   },

//   logout: async () => {
//     const response = await fetch(`${API_BASE_URL}/auth/logout`, {
//       method: "POST",
//     })
//     return response.json()
//   },
// }

// export const movieAPI = {
//   getRecommendations: async (userId: number, limit = 10) => {
//     const response = await fetch(`${API_BASE_URL}/recommendations/${userId}?limit=${limit}`)
//     return response.json()
//   },

//   rateMovie: async (userId: number, movieId: number, rating: number) => {
//     const response = await fetch(`${API_BASE_URL}/movies/${movieId}/rate`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ user_id: userId, rating }),
//     })
//     return response.json()
//   },

//   searchMovies: async (query: string) => {
//     const response = await fetch(`${API_BASE_URL}/movies/search?q=${encodeURIComponent(query)}`)
//     return response.json()
//   },

//   getMovieDetails: async (movieId: number) => {
//     const response = await fetch(`${API_BASE_URL}/movies/${movieId}`)
//     return response.json()
//   },
// }

// export const userAPI = {
//   updatePreferences: async (userId: number, preferences: any) => {
//     const response = await fetch(`${API_BASE_URL}/users/${userId}/preferences`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(preferences),
//     })
//     return response.json()
//   },

//   getUserProfile: async (userId: number) => {
//     const response = await fetch(`${API_BASE_URL}/users/${userId}`)
//     return response.json()
//   },
// }

// lib/api.ts
import { Movie, ApiResponse, UserRating, WatchlistItem, FavoriteItem } from '@/types/movies';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/movies';

// Base fetch function with error handling
const apiRequest = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Movie API calls
export const movieAPI = {
  // Get all movies
  getMovies: async (): Promise<Movie[]> => {
    const response = await apiRequest<ApiResponse>('/movies/');
    return response.results || response.data || [];
  },

  // Get movie by ID
  getMovieById: async (tmdbId: number): Promise<Movie> => {
    return await apiRequest<Movie>(`/movies/tmdb/${tmdbId}/`);
  },

  // Get trending movies
  // In your api.ts file
getTrendingMovies: async (): Promise<Movie[]> => {
  const response = await apiRequest<ApiResponse>('/trending/');
  let moviesData: Movie[] = [];
  
  if (Array.isArray(response)) {
    moviesData = response;
  } else if (response.results) {
    moviesData = response.results;
  } else if (response.data) {
    moviesData = response.data;
  }

  // Normalize genres format
  return moviesData.map((movie, index) => ({
    ...movie,
    // Ensure genres is always an array of {id, name} objects
    genres: movie.genres || (movie.genre 
      ? Array.isArray(movie.genre) 
        ? movie.genre.map(name => ({ id: 0, name }))
        : [{ id: 0, name: movie.genre }]
      : []),
    trendingRank: index + 1,
    viewsThisWeek: Math.floor(Math.random() * 50) + 10
  }));
},

  // Get popular movies from TMDB
  getPopularMovies: async (): Promise<Movie[]> => {
    const response = await apiRequest<ApiResponse>('/popular/tmdb/');
    return response.results || response.data || [];
  },

  // Get similar movies
  getSimilarMovies: async (id: number): Promise<Movie[]> => {
    const response = await apiRequest<ApiResponse>(`/similar/${id}/`);
    return response.results || response.data || [];
  },

  // Get recommendations
  getRecommendations: async (): Promise<Movie[]> => {
    const response = await apiRequest<ApiResponse>('/recommendations/');
    return response.results || response.data || [];
  },

  // Search movies
  searchMovies: async (query: string): Promise<Movie[]> => {
    const response = await apiRequest<ApiResponse>(`/search/tmdb/?query=${encodeURIComponent(query)}`);
    return response.results || response.data || [];
  },

  // Import movie from TMDB
  importMovie: async (tmdbId: number): Promise<Movie> => {
    return await apiRequest<Movie>('/import/tmdb/', {
      method: 'POST',
      body: JSON.stringify({ tmdb_id: tmdbId }),
    });
  },

  // Search and import movie
  searchAndImport: async (query: string): Promise<Movie[]> => {
    const response = await apiRequest<ApiResponse>('/search/import/', {
      method: 'POST',
      body: JSON.stringify({ query }),
    });
    return response.results || response.data || [];
  },
};

// User preferences API calls
export const userAPI = {
  // Get user ratings
  getUserRatings: async (): Promise<UserRating[]> => {
    return await apiRequest<UserRating[]>('/ratings/');
  },

  // Create or update user rating
  rateMovie: async (movieId: number, rating: number): Promise<UserRating> => {
    return await apiRequest<UserRating>('/ratings/', {
      method: 'POST',
      body: JSON.stringify({ movie: movieId, rating }),
    });
  },

  // Delete user rating
  deleteRating: async (ratingId: number): Promise<void> => {
    await apiRequest<void>(`/ratings/${ratingId}/`, {
      method: 'DELETE',
    });
  },

  // Get user preferences
  getUserPreferences: async (): Promise<any> => {
    return await apiRequest<any>('/preferences/');
  },

  // Update user preferences
  updateUserPreferences: async (preferences: any): Promise<any> => {
    return await apiRequest<any>('/preferences/', {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  },
};

// Watchlist API calls
export const watchlistAPI = {
  // Get user watchlist
  getWatchlist: async (): Promise<WatchlistItem[]> => {
    return await apiRequest<WatchlistItem[]>('/watchlist/');
  },

  // Add to watchlist
  addToWatchlist: async (movieId: number): Promise<WatchlistItem> => {
    return await apiRequest<WatchlistItem>(`/watchlist/${movieId}/`, {
      method: 'POST',
    });
  },

  // Remove from watchlist
  removeFromWatchlist: async (movieId: number): Promise<void> => {
    await apiRequest<void>(`/watchlist/${movieId}/`, {
      method: 'DELETE',
    });
  },

  // Get watchlist status for multiple movies
  getWatchlistStatus: async (movieIds: number[]): Promise<Record<number, boolean>> => {
    const response = await apiRequest<Record<number, boolean>>('/watchlist/status/', {
      method: 'POST',
      body: JSON.stringify({ movie_ids: movieIds }),
    });
    return response;
  },
};

// Favorites API calls
export const favoritesAPI = {
  // Get user favorites
  getFavorites: async (): Promise<FavoriteItem[]> => {
    return await apiRequest<FavoriteItem[]>('/favorites/');
  },

  // Add to favorites
  addToFavorites: async (movieId: number): Promise<FavoriteItem> => {
    return await apiRequest<FavoriteItem>(`/favorites/${movieId}/`, {
      method: 'POST',
    });
  },

  // Remove from favorites
  removeFromFavorites: async (movieId: number): Promise<void> => {
    await apiRequest<void>(`/favorites/${movieId}/`, {
      method: 'DELETE',
    });
  },

  // Get favorite status for multiple movies
  getFavoriteStatus: async (movieIds: number[]): Promise<Record<number, boolean>> => {
    const response = await apiRequest<Record<number, boolean>>('/favorites/status/', {
      method: 'POST',
      body: JSON.stringify({ movie_ids: movieIds }),
    });
    return response;
  },
};

// Statistics API calls
export const statsAPI = {
  // Get movie statistics
  getMovieStats: async (): Promise<any> => {
    return await apiRequest<any>('/stats/');
  },
};

// Legacy API functions for backward compatibility
export const addToWatchlist = watchlistAPI.addToWatchlist;
export const removeFromWatchlist = watchlistAPI.removeFromWatchlist;