"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Star, Heart, Plus, MoreHorizontal, Play, Eye } from "lucide-react"

interface Movie {
  id: number
  title: string
  genre: string[]
  rating: number
  year: number
  poster: string
  matchScore?: number
  reason?: string
}

interface MovieCarouselProps {
  movies: Movie[]
  showMatchScore?: boolean
}

export function MovieCarousel({ movies, showMatchScore = false }: MovieCarouselProps) {
  const [hoveredMovie, setHoveredMovie] = useState<number | null>(null)

  return (
    <div className="flex space-x-5 overflow-x-auto pb-4 scrollbar-hide">
      {movies.map((movie) => (
        <Card
          key={movie.id}
          className="flex-shrink-0 w-60 group cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0"
          onMouseEnter={() => setHoveredMovie(movie.id)}
          onMouseLeave={() => setHoveredMovie(null)}
        >
          <CardContent className="p-0">
            <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
              <Image
                src={movie.poster || "/placeholder.svg"}
                alt={movie.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Match Score Badge */}
              {showMatchScore && movie.matchScore && (
                <Badge className="absolute top-2 left-2 bg-primary text-primary-foreground">
                  {movie.matchScore}% Match
                </Badge>
              )}

              {/* Hover Actions */}
              {hoveredMovie === movie.id && (
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center space-x-2 transition-opacity duration-300">
                  <Button size="sm" className="rounded-full w-10 h-10 p-0">
                    <Play className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="rounded-full w-10 h-10 p-0">
                    <Plus className="w-4 h-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="rounded-full w-10 h-10 p-0">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
              )}

              {/* More Options */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 w-8 h-8 p-0 bg-black/50 hover:bg-black/70 text-white"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Plus className="mr-2 h-4 w-4" />
                    Add to Watchlist
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Heart className="mr-2 h-4 w-4" />
                    Add to Favorites
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="p-4 space-y-2">
              <h4 className="font-semibold text-sm line-clamp-1 group-hover:text-primary transition-colors">
                {movie.title}
              </h4>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{movie.year}</span>
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span>{movie.rating}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1">
                {movie.genre.slice(0, 2).map((g) => (
                  <Badge key={g} variant="secondary" className="text-xs px-2 py-0">
                    {g}
                  </Badge>
                ))}
              </div>

              {showMatchScore && movie.reason && (
                <p className="text-xs text-muted-foreground line-clamp-2 mt-2">{movie.reason}</p>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
