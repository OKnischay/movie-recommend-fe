"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Trash2 } from "lucide-react"
import { DashboardHeader } from "./Header"
import MovieGrid from "./movie/MovieGrid"
import { NavigationTabs } from "./NavigationTabs"
import { toast } from "sonner"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getUserFavoriteMovies, removeFromFavorites, rateMovie } from "@/lib/api2"
import { getUser } from "@/lib/getUser"
import type { DashboardMovie } from "@/types/movies"

export default function FavoritePage() {
  const [sortBy, setSortBy] = useState("added")
  const [filterGenre, setFilterGenre] = useState("all")
  const [selectedMovies, setSelectedMovies] = useState<number[]>([])

  const queryClient = useQueryClient()

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  })

  const {
    data: favoriteMovies = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["favorites", user?.id],
    queryFn: () => (user ? getUserFavoriteMovies(user.id) : []),
    enabled: !!user,
    select: (data) =>
      data.map((item: any) => {
        const movie = item.movie
        console.log("Favorite movie item:", item)
        console.log("Mapped movie:", movie)
        return {
          id: movie.tmdb_id || movie.id,
          tmdb_id: movie.tmdb_id,
          title: movie.title,
          poster: movie.poster_url || movie.poster || "",
          genre: (movie.genres || []).map((g: any) => g.name),
          rating: Number.parseFloat(movie.vote_average || movie.average_rating || 0),
          year: movie.release_date ? Number.parseInt(movie.release_date.slice(0, 4)) : null,
          overview: movie.overview,
          description: movie.description || movie.overview,
          userRating: movie.user_rating ?? 0,
          isInWatchlist: movie.is_in_watchlist ?? false,
          isFavorite: true,
          locally_available: movie.locally_available ?? false,
          addedDate: new Date(item.addedDate || item.added_date || Date.now()),
          matchScore: undefined,
        } as DashboardMovie
      }),
  })

  const handleFavoriteToggle = async (movieId: number) => {
    if (!user) return

    try {
      await removeFromFavorites(movieId)
      toast.success("Removed from favorites")
      queryClient.invalidateQueries({ queryKey: ["favorites", user.id] })
    } catch {
      toast.error("Failed to remove from favorites")
    }
  }

  const handleRating = async (movieId: number, rating: number) => {
    if (!user) return

    try {
      await rateMovie(movieId, rating)
      toast.success(`Rated movie ${rating}/10`)
      queryClient.invalidateQueries({ queryKey: ["favorites", user.id] })
    } catch {
      toast.error("Failed to rate movie")
    }
  }

  const getFilteredAndSortedMovies = () => {
    let filtered = [...favoriteMovies]

    if (filterGenre !== "all") {
      filtered = filtered.filter((movie) =>
        movie.genre.some((g: string) => g.toLowerCase().includes(filterGenre.toLowerCase())),
      )
    }

    switch (sortBy) {
      case "added":
        filtered.sort((a, b) => b.addedDate.getTime() - a.addedDate.getTime())
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "year":
        filtered.sort((a, b) => (b.year || 0) - (a.year || 0))
        break
      case "title":
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    return filtered
  }

  const handleBulkRemove = async () => {
    if (!user) return

    try {
      await Promise.all(selectedMovies.map((id) => removeFromFavorites(id)))
      queryClient.invalidateQueries({ queryKey: ["favorites", user.id] })
      setSelectedMovies([])
      toast.success(`${selectedMovies.length} movie(s) removed`)
    } catch {
      toast.error("Bulk remove failed")
    }
  }

  const handleSelectAll = () => {
    const filteredMovies = getFilteredAndSortedMovies()
    if (selectedMovies.length === filteredMovies.length) {
      setSelectedMovies([])
    } else {
      setSelectedMovies(filteredMovies.map((m) => m.id))
    }
  }

  const allGenres = Array.from(new Set(favoriteMovies.flatMap((movie: DashboardMovie) => movie.genre))).sort()

  const filteredMovies = getFilteredAndSortedMovies()

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader />
        <main className="container px-4 py-8 max-w-7xl mx-auto">
          <div className="text-center py-12 text-red-500">Failed to load favorites.</div>
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

          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="added">Recently Added</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                  <SelectItem value="title">Title</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterGenre} onValueChange={setFilterGenre}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Genres</SelectItem>
                  {allGenres.map((genre) => (
                    <SelectItem key={genre as string} value={(genre as string).toLowerCase()}>
                      {genre as string}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedMovies.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">{selectedMovies.length} selected</span>
                <Button variant="outline" size="sm" onClick={handleBulkRemove}>
                  <Trash2 className="w-4 h-4 mr-2" />
                  Remove Selected
                </Button>
              </div>
            )}
          </div>

          {filteredMovies.length > 0 && (
            <div className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedMovies.length === filteredMovies.length}
                  onChange={handleSelectAll}
                  className="rounded"
                />
                <span className="text-sm">Select all ({filteredMovies.length})</span>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <MovieGrid
              movies={filteredMovies}
              showMatchScore={false}
              isLoading={isLoading}
              onFavoriteToggle={handleFavoriteToggle}
              onRating={handleRating}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
