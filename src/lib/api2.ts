// lib/api2.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Cookie helper functions
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

const setCookie = (name: string, value: string, days = 7): void => {
  if (typeof document === "undefined") return;

  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
};

const deleteCookie = (name: string): void => {
  if (typeof document === "undefined") return;

  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
};

const request = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = getCookie("access_token");

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);

    if (response.status === 401) {
      const refreshed = await refreshToken();
      if (refreshed) {
        const newToken = getCookie("access_token");
        if (newToken) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${newToken}`,
          };
          return fetch(url, config); // re-fetch after token refresh
        }
      } else if (typeof window !== "undefined") {
        window.location.href = "/login";
        return;
      }
    }

    const contentType = response.headers.get("Content-Type");

    if (contentType?.includes("application/json")) {
      const data = await response.json();

      if (!response.ok) {
        const message = (data && (data.message || data.detail || data.error)) || "Something went wrong";
        throw new Error(message);
      }

      return data;
    } else {
      const text = await response.text(); // 👈 capture raw non-JSON response
      console.error("Unexpected non-JSON response:", text); // 🔥 LOG THIS
      throw new Error("Unexpected response format");
    }
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// const request = async (endpoint: string, options: RequestInit = {}) => {
//   const url = `${API_BASE_URL}${endpoint}`;
//   const token = getCookie("access_token");

//   const config: RequestInit = {
//     headers: {
//       "Content-Type": "application/json",
//       ...(token && { Authorization: `Bearer ${token}` }),
//     },
//     ...options,
//   };

//   try {
//     let response = await fetch(url, config);

//     // Handle token expiration (401)
//     if (response.status === 401) {
//       const refreshed = await refreshToken();
//       if (refreshed) {
//         const newToken = getCookie("access_token");
//         if (newToken) {
//           config.headers = {
//             ...config.headers,
//             Authorization: `Bearer ${newToken}`,
//           };
//           response = await fetch(url, config); // Retry with new token
//         }
//       } else {
//         if (typeof window !== "undefined") {
//           window.location.href = "/login";
//         }
//         return;
//       }
//     }

//     // Safely parse response
//     const contentType = response.headers.get("Content-Type");
//     let data: any = null;

//     if (contentType && contentType.includes("application/json")) {
//       data = await response.json();
//     } else {
//       const text = await response.text();
//       console.warn("Non-JSON response:", text); // 👈 Add this
//       throw new Error("Unexpected response format");
//     }

//     if (!response.ok) {
//       throw new Error(data?.message || "Something went wrong");
//     }

//     return data;
//   } catch (error: any) {
//     console.error("API Error:", error);
//     throw error;
//   }
// };

const refreshToken = async (): Promise<boolean> => {
  const refresh = getCookie("refresh_token");
  if (!refresh) return false;

  try {
    const response = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (response.ok) {
      const data = await response.json();
      setCookie("access_token", data.access);
      return true;
    }
    return false;
  } catch {
    return false;
  }
};

// Movie endpoints
export const getMovies = async (params: Record<string, any> = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`/movies/?${query}`);
};

export const getUsers = async (params: Record<string, any> = {}) => {
  const query = new URLSearchParams(params).toString();
  return request(`/users/?${query}`);
}; 

export const getMovie = async (id: number) => {
  return request(`/movies/${id}/`);
};

export const getSimilarMovies = async (id: number) => {
  return request(`/movies/${id}/similar/`);
};

// Recommendation endpoints
export const getRecommendations = async () => {
  return request("/movies/recommendations/");
};

export const getTrendingMovies = async () => {
  return request("/movies/trending/");
};

// Genre endpoints
export const getGenres = async () => {
  return request("/movies/genres/");
};

// Rating endpoints
export const getUserRatings = async () => {
  return request("/movies/ratings/");
};

export const rateMovie = async (movieId: number, rating: number, review = "") => {
  return request("/movies/ratings/", {
    method: "POST",
    body: JSON.stringify({
      tmdb_id: movieId,
      rating,
      review,
    }),
  });
};

export const updateRating = async (ratingId: number, rating: number, review = "") => {
  return request(`/movies/ratings/${ratingId}/`, {
    method: "PUT",
    body: JSON.stringify({
      rating,
      review,
    }),
  });
};

export const deleteRating = async (ratingId: number) => {
  return request(`/movies/ratings/${ratingId}/`, {
    method: "DELETE",
  });
};

// User preferences
export const getUserPreferences = async () => {
  return request("/movies/preferences/");
};

export const updateUserPreferences = async (preferences: Record<string, any>) => {
  return request("/movies/preferences/", {
    method: "PUT",
    body: JSON.stringify(preferences),
  });
};

// Watchlist endpoints
export const getWatchlist = async () => {
  return request("/movies/watchlist/");
};

export const getUserWatchlist = async (userId: number) => {
  return request(`/movies/watchlist/user/${userId}`);
};
export const addToWatchlist = async (movieId: number) => {
  return request(`/movies/watchlist/${movieId}/`, {
    method: "POST",
  });
};


export const removeFromWatchlist = async (movieId: number) => {
  return request(`/movies/watchlist/${movieId}/`, {
    method: "DELETE",
  });
};

// Watch history
export const markAsWatched = async (movieId: number, completionPercentage = 100) => {
  return request(`/movies/watched/${movieId}/`, {
    method: "POST",
    body: JSON.stringify({
      completion_percentage: completionPercentage,
    }),
  });
};
export const getFavorites = async () => {
  return request("/movies/favorites/");
};

export const addToFavorites = async (movieId: number) => {
  return request(`/movies/favorites/${movieId}/`, {
    method: "POST",
  });
};

export const removeFromFavorites = async (movieId: number) => {
  return request(`/movies/favorites/${movieId}/`, {
    method: "DELETE",
  });
};

// Watch history - unwatch functionality
export const markAsUnwatched = async (movieId: number) => {
  return request(`/movies/watched/${movieId}/`, {
    method: "DELETE",
  });
};

export const getWatchHistory = async () => {
  return request("/movies/watched/");
};

// Auth functions (optional - if you need them)
export const setAuthTokens = (access: string, refresh: string) => {
  setCookie("access_token", access);
  setCookie("refresh_token", refresh);
};

export const clearAuthTokens = () => {
  deleteCookie("access_token");
  deleteCookie("refresh_token");
};

export const getUserFavoriteMovies = async (userId: string) => {
  return request(`/movies/favorites/movies/${userId}/`);
};