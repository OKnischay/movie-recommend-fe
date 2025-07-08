import { WeightPreset } from "../types/preferences"

export const WEIGHT_PRESETS: WeightPreset[] = [
  {
    name: "Balanced",
    description: "Even distribution",
    icon: "⚖️",
    weights: {
      genre_weight: 0.25,
      rating_weight: 0.25,
      popularity_weight: 0.25,
      recency_weight: 0.25,
    },
  },
  {
    name: "Genre",
    description: "Genre-focused",
    icon: "🎭",
    weights: {
      genre_weight: 0.5,
      rating_weight: 0.2,
      popularity_weight: 0.15,
      recency_weight: 0.15,
    },
  },
  {
    name: "Quality",
    description: "High ratings",
    icon: "⭐",
    weights: {
      genre_weight: 0.2,
      rating_weight: 0.5,
      popularity_weight: 0.15,
      recency_weight: 0.15,
    },
  },
  {
    name: "Trending",
    description: "Popular & recent",
    icon: "🔥",
    weights: {
      genre_weight: 0.15,
      rating_weight: 0.15,
      popularity_weight: 0.4,
      recency_weight: 0.3,
    },
  },
  {
    name: "Newest",
    description: "Latest releases",
    icon: "🆕",
    weights: {
      genre_weight: 0.2,
      rating_weight: 0.2,
      popularity_weight: 0.1,
      recency_weight: 0.5,
    },
  },
]
