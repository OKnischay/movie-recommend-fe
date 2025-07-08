export interface WeightConfig {
  genre_weight: number
  rating_weight: number
  popularity_weight: number
  recency_weight: number
}

export interface PreferencesFormData extends WeightConfig {
  favorite_genre_ids: number[]
  disliked_genre_ids: number[]
}

export interface Genre {
  id: number
  name: string
}

export interface WeightPreset {
  name: string
  description: string
  icon: string
  weights: WeightConfig
}

export interface WeightLabel {
  key: keyof WeightConfig
  label: string
  icon: any
  description: string
}
