export interface Movie {
  id: number
  title: string
  genre?: string[]
  genres?: Array<{id: number, name: string}>
  rating?: number
  vote_average?: number
  year?: number
  release_date?: string
  poster?: string
  poster_path?: string
  poster_url?: string
  trendingRank?: number
  viewsThisWeek?: number
  isInWatchlist?: boolean
  isFavorite?: boolean
  isWatched?: boolean
  locally_available?: boolean
  overview?: string
  description?: string
}

export interface ApiResponse {
  results?: Movie[]
  data?: Movie[]
  length?: number
}

export interface TrendingStats {
  totalViews: string
  avgRating: string
  topGenre: string
  moviesCount: number
}