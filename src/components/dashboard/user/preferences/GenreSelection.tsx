"use client"

import type { UseFormReturn } from "react-hook-form"
import { Heart, X, Target } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import type { Genre, PreferencesFormData } from "./types/preferences"

interface GenreSelectionProps {
  form: UseFormReturn<PreferencesFormData>
  genres: Genre[]
}

export function GenreSelection({ form, genres }: GenreSelectionProps) {
  const selectedFavorites = form.watch("favorite_genre_ids") || []
  const selectedDislikes = form.watch("disliked_genre_ids") || []

  const toggleGenre = (id: number, field: "favorite_genre_ids" | "disliked_genre_ids") => {
    const current = form.getValues(field) || []
    const otherField = field === "favorite_genre_ids" ? "disliked_genre_ids" : "favorite_genre_ids"
    const otherCurrent = form.getValues(otherField) || []

    if (current.includes(id)) {
      form.setValue(
        field,
        current.filter((g) => g !== id),
      )
    } else {
      form.setValue(field, [...current, id])
      if (otherCurrent.includes(id)) {
        form.setValue(
          otherField,
          otherCurrent.filter((g) => g !== id),
        )
      }
    }
  }

  const getGenreName = (id: number) => {
    const genre = genres.find((g) => g.id === id)
    return genre?.name || ""
  }

  return (
    <div className="space-y-6 animate-in slide-in-from-right-5 duration-300">
      {/* Favorite Genres */}
      <Card className="border border-border/50 shadow-sm">
        <CardHeader className="pb-6">
          <div className="space-y-2">
            <CardTitle className="flex items-center gap-3 text-lg font-semibold">
              <div className="p-2 bg-muted rounded-lg">
                <Heart className="w-4 h-4 text-foreground" />
              </div>
              Favorite Genres
              {selectedFavorites.length > 0 && (
                <Badge variant="secondary" className="bg-muted text-muted-foreground">
                  {selectedFavorites.length} selected
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Choose genres you love. We'll prioritize movies from these categories in your recommendations.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {genres.map((genre) => {
              const isSelected = selectedFavorites.includes(genre.id)
              const isDisliked = selectedDislikes.includes(genre.id)

              return (
                <div
                  key={genre.id}
                  className={`group relative flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:bg-muted/50 ${
                    isSelected
                      ? "bg-muted border-foreground/20"
                      : isDisliked
                        ? "bg-muted/30 border-muted opacity-50"
                        : "bg-background border-border hover:border-foreground/20"
                  }`}
                  onClick={() => !isDisliked && toggleGenre(genre.id, "favorite_genre_ids")}
                >
                  <Checkbox
                    checked={isSelected}
                    disabled={isDisliked}
                    className="data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
                  />
                  <Label className="cursor-pointer font-medium flex-1 select-none text-sm">{genre.name}</Label>
                  {isSelected && <div className="absolute -top-1 -right-1 w-2 h-2 bg-foreground rounded-full" />}
                </div>
              )
            })}
          </div>

          {selectedFavorites.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <Heart className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="font-medium">No favorite genres selected</p>
              <p className="text-sm">Choose some genres you love to get better recommendations</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Disliked Genres */}
      <Card className="border border-border/50 shadow-sm">
        <CardHeader className="pb-6">
          <div className="space-y-2">
            <CardTitle className="flex items-center gap-3 text-lg font-semibold">
              <div className="p-2 bg-muted rounded-lg">
                <X className="w-4 h-4 text-foreground" />
              </div>
              Genres to Avoid
              {selectedDislikes.length > 0 && (
                <Badge variant="secondary" className="bg-muted text-muted-foreground">
                  {selectedDislikes.length} selected
                </Badge>
              )}
            </CardTitle>
            <CardDescription>
              Select genres you prefer to avoid. We'll minimize recommendations from these categories.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {genres.map((genre) => {
              const isSelected = selectedDislikes.includes(genre.id)
              const isFavorite = selectedFavorites.includes(genre.id)

              return (
                <div
                  key={genre.id}
                  className={`group relative flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer hover:bg-muted/50 ${
                    isSelected
                      ? "bg-muted border-foreground/20"
                      : isFavorite
                        ? "bg-muted/30 border-muted opacity-50"
                        : "bg-background border-border hover:border-foreground/20"
                  }`}
                  onClick={() => !isFavorite && toggleGenre(genre.id, "disliked_genre_ids")}
                >
                  <Checkbox
                    checked={isSelected}
                    disabled={isFavorite}
                    className="data-[state=checked]:bg-foreground data-[state=checked]:border-foreground"
                  />
                  <Label className="cursor-pointer font-medium flex-1 select-none text-sm">{genre.name}</Label>
                  {isSelected && <div className="absolute -top-1 -right-1 w-2 h-2 bg-foreground rounded-full" />}
                </div>
              )
            })}
          </div>

          {selectedDislikes.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              <X className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="font-medium">No genres to avoid selected</p>
              <p className="text-sm">Optionally select genres you'd prefer not to see</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selection Summary */}
      {(selectedFavorites.length > 0 || selectedDislikes.length > 0) && (
        <Card className="border border-border/50 shadow-sm bg-muted/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg font-semibold">
              <Target className="w-4 h-4 text-foreground" />
              Your Preference Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {selectedFavorites.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-foreground" />
                  <p className="font-medium text-sm">Favorite Genres ({selectedFavorites.length})</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedFavorites.map((id: number) => (
                    <Badge key={id} variant="secondary" className="bg-muted text-foreground text-xs">
                      {getGenreName(id)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {selectedDislikes.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <X className="w-4 h-4 text-foreground" />
                  <p className="font-medium text-sm">Genres to Avoid ({selectedDislikes.length})</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedDislikes.map((id: number) => (
                    <Badge key={id} variant="outline" className="text-xs">
                      {getGenreName(id)}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
