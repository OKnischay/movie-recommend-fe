"use client"

import { Heart, Settings, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PreferencesTabsProps {
  activeTab: "genres" | "weights"
  onTabChange: (tab: "genres" | "weights") => void
  hasGenreSelections: boolean
  isWeightValid: boolean
}

export function PreferencesTabs({
  activeTab,
  onTabChange,
  hasGenreSelections,
  isWeightValid
}: PreferencesTabsProps) {
  return (
    <div className="flex justify-center">
      <div className="bg-muted p-1 rounded-lg border border-border/50 dark:border-border/70 dark:bg-muted">
        <Button
          variant={activeTab === "genres" ? "default" : "ghost"}
          onClick={() => onTabChange("genres")}
          className={`rounded-md px-4 py-2 transition-all duration-200 ${
            activeTab === "genres"
              ? "bg-primary text-primary-foreground"
              : "bg-transparent hover:bg-accent hover:text-accent-foreground"
          }`}
          size="sm"
        >
          <Heart className="w-4 h-4 mr-2" />
          Genre Preferences
          {hasGenreSelections && (
            <Badge
              variant="secondary"
              className="ml-2 h-4 w-4 p-0 flex items-center justify-center dark:bg-muted"
            >
              <Check className="w-3 h-3" />
            </Badge>
          )}
        </Button>
        <Button
          variant={activeTab === "weights" ? "default" : "ghost"}
          onClick={() => onTabChange("weights")}
          className={`rounded-md px-4 py-2 transition-all duration-200 ${
            activeTab === "weights"
              ? "bg-primary text-primary-foreground"
              : "bg-transparent hover:bg-accent hover:text-accent-foreground"
          }`}
          size="sm"
        >
          <Settings className="w-4 h-4 mr-2" />
          Recommendation Weights
          {isWeightValid && (
            <Badge
              variant="secondary"
              className="ml-2 h-4 w-4 p-0 flex items-center justify-center dark:bg-muted"
            >
              <Check className="w-3 h-3" />
            </Badge>
          )}
        </Button>
      </div>
    </div>
  )
}
