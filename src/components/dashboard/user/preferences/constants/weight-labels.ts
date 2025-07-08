import { Heart, Star, TrendingUp, Clock } from "lucide-react"
import type { WeightLabel } from "../types/preferences"

export const WEIGHT_LABELS: WeightLabel[] = [
  {
    key: "genre_weight",
    label: "Genre Match",
    icon: Heart,
    description: "How much your genre preferences matter",
  },
  {
    key: "rating_weight",
    label: "Movie Quality",
    icon: Star,
    description: "Prioritize highly-rated movies",
  },
  {
    key: "popularity_weight",
    label: "Trending",
    icon: TrendingUp,
    description: "Include popular and trending movies",
  },
  {
    key: "recency_weight",
    label: "Release Date",
    icon: Clock,
    description: "Favor newer releases",
  },
]
