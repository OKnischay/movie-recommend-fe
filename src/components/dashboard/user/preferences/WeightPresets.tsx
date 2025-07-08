"use client"

import { Zap } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { WeightPreset } from "./types/preferences"
import { WEIGHT_PRESETS } from "./constants/weight-presets"

interface WeightPresetsProps {
  onApplyPreset: (preset: WeightPreset) => void
}

export function WeightPresets({ onApplyPreset }: WeightPresetsProps) {
  return (
    <Card className="border border-border/40 shadow-sm rounded-2xl">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <span className="p-2 rounded-xl bg-muted">
            <Zap className="w-4 h-4 text-primary" />
          </span>
          Quick Presets
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          Choose a preset or customize your own weights below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2">
          {WEIGHT_PRESETS.map((preset) => (
            <Button
              key={preset.name}
              variant="ghost"
              className="h-auto px-4 py-3 flex flex-col items-center gap-2 border hover:bg-muted transition-colors rounded-xl"
              onClick={() => onApplyPreset(preset)}
            >
              <div className="text-xl opacity-70">{preset.icon}</div>
              <div className="text-center space-y-0.5">
                <div className="text-sm font-medium">{preset.name}</div>
                <div className="text-xs text-muted-foreground">{preset.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
