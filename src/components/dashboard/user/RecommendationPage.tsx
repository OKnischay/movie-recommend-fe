"use client"

import { useEffect, useState, useCallback } from "react"
import { Loader2, AlertCircle, RefreshCw } from "lucide-react"
import {
  getRecommendations,
  addToWatchlist,
  removeFromWatchlist,
  addToFavorites,
  removeFromFavorites,
  rateMovie,
} from "@/lib/api2"
import { getUser } from "@/lib/getUser"
import type { DashboardMovie } from "@/types/movies"
import MovieGrid from "@/components/dashboard/user/movie/MovieGrid"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { transformMovie } from "@/lib/transform"

interface RecommendationsState {
  movies: DashboardMovie[]
  loading: boolean
  error: string | null
  user: any
}

export default function RecommendationsPage() {
  const [state, setState] = useState<RecommendationsState>({
    movies: [],
    loading: true,
    error: null,
    user: null,
  })

  const fetchRecommendations = useCallback(async () => {
    setState((prev) => ({ ...prev, loading: true, error: null }))
    try {
      const [userData, recommendationsData] = await Promise.all([
        getUser(),
        getRecommendations(),
      ])

      const movies = recommendationsData?.results || recommendationsData || []
      const transformedMovies = movies.map(transformMovie)

      setState({
        movies: transformedMovies,
        loading: false,
        error: null,
        user: userData,
      })
    } catch (err: any) {
      console.error('Fetch recommendations error:', err)
      setState((prev) => ({
        ...prev,
        loading: false,
        error: err?.message || "Failed to load recommendations",
        movies: [],
      }))
    }
  }, [])

  useEffect(() => {
    fetchRecommendations()
  }, [fetchRecommendations])

  // const handleWatchlistToggle = useCallback(async (tmdb_id: number, isInWatchlist: boolean) => {
  //   try {
  //     setState((prev) => ({
  //       ...prev,
  //       movies: prev.movies.map((movie) =>
  //         movie.tmdb_id === tmdb_id ? { ...movie, isInWatchlist: !isInWatchlist } : movie
  //       ),
  //     }))

  //     if (isInWatchlist) {
  //       await removeFromWatchlist(tmdb_id)
  //       toast.success("Removed from watchlist")
  //     } else {
  //       await addToWatchlist(tmdb_id)
  //       toast.success("Added to watchlist")
  //     }
  //   } catch (error: any) {
  //     console.error('Watchlist toggle error:', error)
  //     toast.error(error?.message || "Failed to update watchlist")
  //   }
  // }, [])

  // const handleFavoriteToggle = useCallback(async (tmdb_id: number, isFavorite: boolean) => {
  //   try {
  //     setState((prev) => ({
  //       ...prev,
  //       movies: prev.movies.map((movie) =>
  //         movie.tmdb_id === tmdb_id ? { ...movie, isFavorite: !isFavorite } : movie
  //       ),
  //     }))

  //     if (isFavorite) {
  //       await removeFromFavorites(tmdb_id)
  //       toast.success("Removed from favorites")
  //     } else {
  //       await addToFavorites(tmdb_id)
  //       toast.success("Added to favorites")
  //     }
  //   } catch (error: any) {
  //     console.error('Favorite toggle error:', error)
  //     toast.error(error?.message || "Failed to update favorites")
  //   }
  // }, [])

  const handleWatchlistToggle = useCallback(async (tmdb_id: number, willBeInWatchlist: boolean) => {
  try {
    setState((prev) => ({
      ...prev,
      movies: prev.movies.map((movie) =>
        movie.tmdb_id === tmdb_id ? { ...movie, isInWatchlist: willBeInWatchlist } : movie
      ),
    }))

    if (willBeInWatchlist) {
      await addToWatchlist(tmdb_id)
      toast.success("Added to watchlist")
    } else {
      await removeFromWatchlist(tmdb_id)
      toast.success("Removed from watchlist")
    }
  } catch (error: any) {
    console.error('Watchlist toggle error:', error)
    toast.error(error?.message || "Failed to update watchlist")
  }
}, [])

const handleFavoriteToggle = useCallback(async (tmdb_id: number, willBeFavorite: boolean) => {
  try {
    setState((prev) => ({
      ...prev,
      movies: prev.movies.map((movie) =>
        movie.tmdb_id === tmdb_id ? { ...movie, isFavorite: willBeFavorite } : movie
      ),
    }))

    if (willBeFavorite) {
      await addToFavorites(tmdb_id)
      toast.success("Added to favorites")
    } else {
      await removeFromFavorites(tmdb_id)
      toast.success("Removed from favorites")
    }
  } catch (error: any) {
    console.error('Favorite toggle error:', error)
    toast.error(error?.message || "Failed to update favorites")
  }
}, [])

  const handleRating = useCallback(async (tmdb_id: number, rating: number) => {
    try {
      await rateMovie(tmdb_id, rating)
      toast.success("Rating submitted")

      setState((prev) => ({
        ...prev,
        movies: prev.movies.map((movie) =>
          movie.tmdb_id === tmdb_id ? { ...movie, userRating: rating } : movie
        ),
      }))
    } catch (error: any) {
      console.error('Rating error:', error)
      toast.error(error?.message || "Failed to submit rating")
    }
  }, [])

  const { movies, loading, error, user } = state

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin w-8 h-8 mb-4 text-primary" />
        <p className="text-sm text-muted-foreground">Loading your recommendations...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4 py-6 md:px-8">
        <Alert variant="destructive" className="mt-6">
          <AlertCircle className="h-5 w-5" />
          <AlertDescription className="flex items-center justify-between">
            <span>{error}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchRecommendations}
              className="ml-4 bg-transparent"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retry
            </Button>
          </AlertDescription>
        </Alert>
      </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className="px-4 py-6 md:px-8">
        <div className="text-center mt-20">
          <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-12 h-12 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">No Recommendations Yet</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Try rating or adding more movies to your favorites to get personalized recommendations!
          </p>
          <Button onClick={fetchRecommendations} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Recommendations
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 md:px-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            {user?.full_name ? `Recommended For ${user.full_name}` : "Recommended For You"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {movies.length} movie{movies.length !== 1 ? "s" : ""} curated just for you
          </p>
        </div>
        <Button onClick={fetchRecommendations} variant="outline" size="sm" disabled={loading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <MovieGrid
        movies={movies}
        showMatchScore={true}
        isLoading={loading}
        onWatchlistToggle={handleWatchlistToggle}
        onFavoriteToggle={handleFavoriteToggle}
        onRating={handleRating}
      />
    </div>
  )
}
