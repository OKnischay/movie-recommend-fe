"use client"

import { useState, useEffect, useMemo } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Loader2 } from "lucide-react"
import { toast } from "sonner"
import { DashboardHeader } from "../Header"
import { NavigationTabs } from "../NavigationTabs"
import MovieGrid from "../movie/MovieGrid"
import { TrendingHeader } from  "./TrendingHeader"
import { TrendingStatistics } from "./TrendingStats"
import { TrendingEmptyState } from "./TrendingEmptyState"
import { Movie, DashboardMovie, TrendingStats as TrendingStatsType } from "@/types/movies"
import { movieAPI } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"
import { getMovieGenres, getAllUniqueGenres } from "./utils"

export default function TrendingPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [genreFilter, setGenreFilter] = useState("all")
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date())

  const allGenres = useMemo(() => {
    return getAllUniqueGenres(movies);
  }, [movies]);

  const fetchTrendingMovies = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await movieAPI.getTrendingMovies()
      setMovies(data)
      setLastUpdated(new Date())
      // toast.success("Trending movies updated successfully!")
    } catch (err) {
      console.error("Error fetching trending movies:", err)
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch trending movies"
      setError(errorMessage)
      // toast.error(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrendingMovies()
  }, [])

    const getFilteredMovies = (): DashboardMovie[] => {
    let filtered = [...movies];

    if (genreFilter !== "all") {
      filtered = filtered.filter((movie) => {
        const genres = getMovieGenres(movie);
        return genres.some(g => 
          g && g.toLowerCase().includes(genreFilter.toLowerCase())
        );
      });
    }

    filtered.sort((a, b) => (a.trendingRank || 0) - (b.trendingRank || 0));

    return filtered.map((movie) => ({
      id: movie.id,
      title: movie.title,
      genre: getMovieGenres(movie),
      rating: movie.rating || movie.vote_average || 0,
      year: movie.year || (movie.release_date ? new Date(movie.release_date).getFullYear() : 0),
      poster: movie.poster_url || movie.poster || 
             (movie.poster_path ? 
               (movie.poster_path.startsWith("http") ? 
                 movie.poster_path : 
                 `https://image.tmdb.org/t/p/w500${movie.poster_path}`) 
               : ""),
      overview: movie.overview,
      description: movie.description,
      isInWatchlist: movie.isInWatchlist || false,
      isFavorite: movie.isFavorite || false,
      isWatched: movie.isWatched || false,
      locally_available: movie.locally_available || false,
      trendingRank: movie.trendingRank,
      viewsThisWeek: movie.viewsThisWeek,
      userRating: movie.userRating ?? 0
    }));
  };
  const getTrendingStats = (): TrendingStatsType => {
    const filteredMovies = getFilteredMovies()
    const totalViews = filteredMovies.reduce((sum, movie) => sum + (movie.viewsThisWeek || 0), 0)
    const avgRating = filteredMovies.length > 0
      ? filteredMovies.reduce((sum, movie) => sum + movie.rating, 0) / filteredMovies.length
      : 0

    const genreCount: Record<string, number> = {}
    filteredMovies.forEach((movie) => {
      movie.genre.forEach((g) => {
        genreCount[g] = (genreCount[g] || 0) + 1
      })
    })
    const topGenre = Object.entries(genreCount).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"

    return {
      totalViews: totalViews.toLocaleString(),
      avgRating: avgRating.toFixed(1),
      topGenre,
      moviesCount: filteredMovies.length,
    }
  }

  const stats = getTrendingStats()
  const filteredMovies = getFilteredMovies()

  const handleRefresh = () => fetchTrendingMovies()
  const handleResetFilters = () => {
    setGenreFilter("all")
    toast.info("Filters reset to default")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container px-4 py-8 max-w-7xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
              <p className="text-muted-foreground">Loading trending movies...</p>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container px-4 py-8 max-w-7xl mx-auto">
        <div className="space-y-8">
          <NavigationTabs />

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {error}
                <Button variant="outline" size="sm" className="ml-4" onClick={handleRefresh}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retry
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <TrendingHeader
            lastUpdated={lastUpdated}
            loading={loading}
            genreFilter={genreFilter}
            allGenres={allGenres}
            onGenreFilterChange={setGenreFilter}
            onRefresh={handleRefresh}
          />

          <TrendingStatistics stats={stats} />

          <div className="space-y-6">
            {filteredMovies.length > 0 ? (
              <MovieGrid movies={filteredMovies} showMatchScore={false} isLoading={loading} />
            ) : (
              <TrendingEmptyState
                hasMovies={movies.length > 0}
                onResetFilters={handleResetFilters}
                onRefresh={handleRefresh}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}