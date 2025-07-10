// "use client"
// import type React from "react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Star, Heart, Plus, MoreHorizontal, Check, Minus } from "lucide-react"
// // import { toast } from "sonner"
// import { MoviePoster } from "./MoviePoster"
// import MovieRatingDialog from "./MovieDialogRating"
// import { useMovieActions } from "@/hooks/useMovieActions"
// import type { DashboardMovie } from "@/types/movies"

// interface Props {
//   movie: DashboardMovie
//   showMatchScore?: boolean
//   onWatchlistToggle?: (movieId: number, isInWatchlist: boolean) => void
//   onFavoriteToggle?: (movieId: number, isFavorite: boolean) => void
//   onRating?: (movieId: number, rating: number) => void
// }

// export default function MovieCard({ movie, showMatchScore, onWatchlistToggle, onFavoriteToggle, onRating }: Props) {
//   const router = useRouter()
//   const [hovered, setHovered] = useState(false)
//   const [ratingDialogOpen, setRatingDialogOpen] = useState(false)


//   const { watchlistMutation, watchedMutation, ratingMutation, favoriteMutation } = useMovieActions(movie.id)


//   const [state, setState] = useState({
//     isInWatchlist: movie.isInWatchlist || false,
//     isFavorite: movie.isFavorite || false,
//     isWatched: movie.isWatched || false,
//     userRating: movie.userRating || 0,
//   })

//   const toggleWatchlist = async (e: React.MouseEvent) => {
//     e.stopPropagation()
//     const newState = !state.isInWatchlist
//     setState((prev) => ({ ...prev, isInWatchlist: newState }))

//     try {
//       if (onWatchlistToggle) {
//         await onWatchlistToggle(movie.id, newState)
//       } else {
//         await watchlistMutation.mutateAsync(newState)
//       }
//     } catch {
//       setState((prev) => ({ ...prev, isInWatchlist: !newState }))
//     }
//   }

//   const toggleFavorite = async (e: React.MouseEvent) => {
//     e.stopPropagation()
//     const newState = !state.isFavorite
//     setState((prev) => ({ ...prev, isFavorite: newState }))

//     try {
//       if (onFavoriteToggle) {
//         await onFavoriteToggle(movie.id, newState)
//       } else {
//         await favoriteMutation.mutateAsync(newState)
//       }
//     } catch {
//       setState((prev) => ({ ...prev, isFavorite: !newState }))
//     }
//   }

//   const handleRatingSubmit = async (rating: number) => {
//     setState((prev) => ({ ...prev, userRating: rating }))

//     try {
//       if (onRating) {
//         await onRating(movie.id, rating)
//       } else {
//         await ratingMutation.mutateAsync(rating)
//       }
//       setRatingDialogOpen(false)
//     } catch {
//       setState((prev) => ({ ...prev, userRating: movie.userRating || 0 })) // Revert if fail
//     }
//   }

//   const openRatingDialog = (e: React.MouseEvent) => {
//     e.stopPropagation()
//     setRatingDialogOpen(true)
//   }

//   return (
//     <Card
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//       onClick={() => router.push(`/user/movie/${movie.id}`)}
//       className="group hover:shadow-lg transition-all border-0 relative cursor-pointer"
//     >
//       <CardContent className="p-0">
//         <div className="relative aspect-[2/3] bg-gray-100 overflow-hidden rounded-lg">
//           <MoviePoster movie={movie} />

//           <div className="absolute top-2 left-2 flex flex-col gap-1">
//             {showMatchScore && movie.matchScore && (
//               <Badge className="bg-primary text-xs">{movie.matchScore}% Match</Badge>
//             )}
//             {state.isWatched && (
//               <Badge className="bg-green-500 text-xs">
//                 <Check className="w-3 h-3 mr-1" /> Watched
//               </Badge>
//             )}
//             {state.userRating > 0 && (
//               <Badge className="bg-yellow-500 text-xs">
//                 <Star className="w-3 h-3 mr-1 fill-white" /> {state.userRating}
//               </Badge>
//             )}
//           </div>

//           <div className="absolute top-2 right-2 flex flex-col gap-1">
//             {state.isFavorite && (
//               <div className="bg-red-500 w-6 h-6 rounded-full flex items-center justify-center">
//                 <Heart className="w-3 h-3 text-white fill-white" />
//               </div>
//             )}
//             {state.isInWatchlist && (
//               <div className="bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center">
//                 <Check className="w-3 h-3 text-white" />
//               </div>
//             )}
//           </div>

//           {hovered && (
//             <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2">
//               {/* Watchlist Button - Changes based on state */}
//               <Button
//                 size="sm"
//                 variant={state.isInWatchlist ? "default" : "secondary"}
//                 className={`w-10 h-10 p-0 rounded-full transition-all ${
//                   state.isInWatchlist
//                     ? "bg-blue-500 hover:bg-blue-600 text-white"
//                     : "bg-white/90 hover:bg-white text-black"
//                 }`}
//                 onClick={toggleWatchlist}
//                 disabled={watchlistMutation.isPending}
//               >
//                 {state.isInWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
//                 {/* {state.isInWatchlist ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />} */}

//               </Button>

//               {/* Favorite Button - Changes based on state */}
//               <Button
//                 size="sm"
//                 variant={state.isFavorite ? "default" : "secondary"}
//                 className={`w-10 h-10 p-0 rounded-full transition-all ${
//                   state.isFavorite ? "bg-red-500 hover:bg-red-600 text-white" : "bg-white/90 hover:bg-white text-black"
//                 }`}
//                 onClick={toggleFavorite}
//                 disabled={favoriteMutation.isPending}
//               >
//                 <Heart className={`w-4 h-4 ${state.isFavorite ? "fill-current" : ""}`} />
//               </Button>

//               {/* Rating Button - Changes based on whether user has rated */}
//               <Button
//                 size="sm"
//                 variant={state.userRating > 0 ? "default" : "secondary"}
//                 className={`w-10 h-10 p-0 rounded-full transition-all ${
//                   state.userRating > 0
//                     ? "bg-yellow-500 hover:bg-yellow-600 text-white"
//                     : "bg-white/90 hover:bg-white text-black"
//                 }`}
//                 onClick={openRatingDialog}
//               >
//                 <Star className={`w-4 h-4 ${state.userRating > 0 ? "fill-current" : ""}`} />
//               </Button>
//             </div>
//           )}
//         </div>

//         <div className="p-4 space-y-2">
//           <h4 className="font-semibold text-sm line-clamp-1 group-hover:text-primary">{movie.title}</h4>
//           <div className="flex justify-between text-xs text-muted-foreground">
//             <span>{movie.year}</span>
//             <div className="flex items-center space-x-1">
//               <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//               <span>{movie.rating > 0 ? movie.rating.toFixed(1) : "N/A"}</span>
//             </div>
//           </div>
//           <div className="flex flex-wrap gap-1">
//             {Array.isArray(movie.genre) &&
//               movie.genre.slice(0, 2).map((g) => <Badge key={`${movie.id}-${g}`}>{g}</Badge>)}
//           </div>
//         </div>

//         <MovieRatingDialog
//           open={ratingDialogOpen}
//           onClose={() => setRatingDialogOpen(false)}
//           onSubmit={handleRatingSubmit}
//           movie={movie}
//           userRating={state.userRating}
//         />
//       </CardContent>
//     </Card>
//   )
// }

"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Star, Heart, Plus, Check } from "lucide-react"
import { MoviePoster } from "./MoviePoster"
import MovieRatingDialog from "./MovieDialogRating"
import { useMovieActions } from "@/hooks/useMovieActions"
import type { DashboardMovie } from "@/types/movies"

interface Props {
  movie: DashboardMovie
  showMatchScore?: boolean
  onWatchlistToggle?: (movieId: number, isInWatchlist: boolean) => void
  onFavoriteToggle?: (movieId: number, isFavorite: boolean) => void
  onRating?: (movieId: number, rating: number) => void
}

// Enhanced Genre Display Component with Hover
function GenreDisplay({ genres, movieId }: { genres: string[]; movieId: number }) {
  if (!Array.isArray(genres) || genres.length === 0) {
    return (
      <Badge variant="outline" className="text-xs opacity-60">
        No genres
      </Badge>
    )
  }

  const visibleGenres = genres.slice(0, 2)
  const hiddenGenres = genres.slice(2)
  const hasMoreGenres = hiddenGenres.length > 0

  return (
    <div className="flex flex-wrap gap-1 items-center">
      {/* Always show first 2 genres */}
      {visibleGenres.map((genre) => (
        <Badge
          key={`${movieId}-${genre}`}
          variant="secondary"
          className="text-xs px-2 py-0.5 bg-gray-100 hover:bg-gray-200 dark:bg-black transition-colors"
        >
          {genre}
        </Badge>
      ))}

      {/* Show +X more badge with hover tooltip for all genres */}
      {hasMoreGenres && (
        <TooltipProvider>
          <Tooltip delayDuration={200}>
            <TooltipTrigger asChild>
              <Badge
                variant="outline"
                className="text-xs px-2 py-0.5 cursor-help hover:bg-primary hover:text-primary-foreground transition-colors border-dashed"
              >
                +{hiddenGenres.length} more
              </Badge>
            </TooltipTrigger>
            <TooltipContent side="top" align="start" className="max-w-xs p-3">
              <div className="space-y-2">
                <p className="text-sm font-medium">All Genres</p>
                <div className="flex flex-wrap gap-1">
                  {genres.map((genre) => (
                    <Badge
                      key={`${movieId}-tooltip-${genre}`}
                      variant="secondary"
                      className="text-xs bg-gray-100 text-gray-800"
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}

export default function MovieCard({ movie, showMatchScore, onWatchlistToggle, onFavoriteToggle, onRating }: Props) {
  const router = useRouter()
  const [hovered, setHovered] = useState(false)
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false)
  const { watchlistMutation, watchedMutation, ratingMutation, favoriteMutation } = useMovieActions(movie.id)

  const [state, setState] = useState({
    isInWatchlist: movie.isInWatchlist || false,
    isFavorite: movie.isFavorite || false,
    isWatched: movie.isWatched || false,
    userRating: movie.userRating || 0,
  })

  const toggleWatchlist = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const newState = !state.isInWatchlist
    setState((prev) => ({ ...prev, isInWatchlist: newState }))
    try {
      if (onWatchlistToggle) {
        await onWatchlistToggle(movie.id, newState)
      } else {
        await watchlistMutation.mutateAsync(newState)
      }
    } catch {
      setState((prev) => ({ ...prev, isInWatchlist: !newState }))
    }
  }

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const newState = !state.isFavorite
    setState((prev) => ({ ...prev, isFavorite: newState }))
    try {
      if (onFavoriteToggle) {
        await onFavoriteToggle(movie.id, newState)
      } else {
        await favoriteMutation.mutateAsync(newState)
      }
    } catch {
      setState((prev) => ({ ...prev, isFavorite: !newState }))
    }
  }

  const handleRatingSubmit = async (rating: number) => {
    setState((prev) => ({ ...prev, userRating: rating }))
    try {
      if (onRating) {
        await onRating(movie.id, rating)
      } else {
        await ratingMutation.mutateAsync(rating)
      }
      setRatingDialogOpen(false)
    } catch {
      setState((prev) => ({ ...prev, userRating: movie.userRating || 0 }))
    }
  }

  const openRatingDialog = (e: React.MouseEvent) => {
    e.stopPropagation()
    setRatingDialogOpen(true)
  }

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => router.push(`/user/movie/${movie.id}`)}
      className="group hover:shadow-xl hover:shadow-black/10 transition-all duration-300 border-0 relative cursor-pointer hover:scale-[1.02]"
    >
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] bg-gray-100 overflow-hidden rounded-lg">
          <MoviePoster movie={movie} />

          {/* Top Left Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {showMatchScore && movie.matchScore && (
              <Badge className="bg-primary text-xs shadow-sm">{movie.matchScore}% Match</Badge>
            )}
            {state.isWatched && (
              <Badge className="bg-green-500 text-xs shadow-sm">
                <Check className="w-3 h-3 mr-1" /> Watched
              </Badge>
            )}
            {state.userRating > 0 && (
              <Badge className="bg-yellow-500 text-xs shadow-sm">
                <Star className="w-3 h-3 mr-1 fill-white" /> {state.userRating}
              </Badge>
            )}
          </div>

          {/* Top Right Status Icons */}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {state.isFavorite && (
              <div className="bg-red-500 w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
                <Heart className="w-3 h-3 text-white fill-white" />
              </div>
            )}
            {state.isInWatchlist && (
              <div className="bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center shadow-sm">
                <Check className="w-3 h-3 text-white" />
              </div>
            )}
          </div>

          {/* Hover Overlay with Action Buttons */}
          {hovered && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center gap-2 backdrop-blur-[1px]">
              {/* Watchlist Button */}
              <Button
                size="sm"
                variant={state.isInWatchlist ? "default" : "secondary"}
                className={`w-10 h-10 p-0 rounded-full transition-all shadow-lg ${
                  state.isInWatchlist
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-white/90 hover:bg-white text-black"
                }`}
                onClick={toggleWatchlist}
                disabled={watchlistMutation.isPending}
              >
                {state.isInWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </Button>

              {/* Favorite Button */}
              <Button
                size="sm"
                variant={state.isFavorite ? "default" : "secondary"}
                className={`w-10 h-10 p-0 rounded-full transition-all shadow-lg ${
                  state.isFavorite ? "bg-red-500 hover:bg-red-600 text-white" : "bg-white/90 hover:bg-white text-black"
                }`}
                onClick={toggleFavorite}
                disabled={favoriteMutation.isPending}
              >
                <Heart className={`w-4 h-4 ${state.isFavorite ? "fill-current" : ""}`} />
              </Button>

              {/* Rating Button */}
              <Button
                size="sm"
                variant={state.userRating > 0 ? "default" : "secondary"}
                className={`w-10 h-10 p-0 rounded-full transition-all shadow-lg ${
                  state.userRating > 0
                    ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                    : "bg-white/90 hover:bg-white text-black"
                }`}
                onClick={openRatingDialog}
              >
                <Star className={`w-4 h-4 ${state.userRating > 0 ? "fill-current" : ""}`} />
              </Button>
            </div>
          )}
        </div>

        {/* Movie Info Section */}
        <div className="p-4 space-y-3">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
              {movie.title}
            </h4>

            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span className="font-medium">{movie.year}</span>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{movie.rating > 0 ? movie.rating.toFixed(1) : "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Enhanced Genre Display */}
          <GenreDisplay genres={movie.genre || []} movieId={movie.id} />
        </div>

        <MovieRatingDialog
          open={ratingDialogOpen}
          onClose={() => setRatingDialogOpen(false)}
          onSubmit={handleRatingSubmit}
          movie={movie}
          userRating={state.userRating}
        />
      </CardContent>
    </Card>
  )
}
