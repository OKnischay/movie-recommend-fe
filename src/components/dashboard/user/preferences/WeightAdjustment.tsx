"use client"

import type { UseFormReturn } from "react-hook-form"
import { Settings, RotateCcw, Lock, Unlock, BarChart3, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import type { PreferencesFormData } from "./types/preferences"
import { WEIGHT_LABELS } from "./constants/weight-labels"

interface WeightAdjustmentProps {
  form: UseFormReturn<PreferencesFormData>
  lockedWeights: Set<string>
  onUpdateWeight: (field: string, value: number) => void
  onToggleWeightLock: (field: string) => void
  onResetWeights: () => void
}

export function WeightAdjustment({
  form,
  lockedWeights,
  onUpdateWeight,
  onToggleWeightLock,
  onResetWeights,
}: WeightAdjustmentProps) {
  const weights = form.watch(["genre_weight", "rating_weight", "popularity_weight", "recency_weight"])
  const totalWeight = weights.reduce((sum, weight) => sum + (weight || 0), 0)
  const isWeightValid = Math.abs(totalWeight - 1.0) < 0.01

  return (
    <div className="space-y-6">
      {/* Weight Adjustment */}
      <Card className="border border-border/50 shadow-sm">
        <CardHeader className="pb-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <CardTitle className="flex items-center gap-3 text-lg font-semibold">
                <div className="p-2 bg-muted rounded-lg">
                  <Settings className="w-4 h-4 text-foreground" />
                </div>
                Custom Weight Distribution
              </CardTitle>
              <CardDescription>
                Adjust individual weights. Changes automatically rebalance other unlocked weights.
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={onResetWeights} className="gap-2 bg-background">
              <RotateCcw className="w-4 h-4" />
              Reset
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {WEIGHT_LABELS.map(({ key, label, icon: Icon, description }) => {
            const value = form.watch(key) || 0
            const isLocked = lockedWeights.has(key)
            const percentage = Math.round(value * 100)

            return (
              <div
                key={key}
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  isLocked
                    ? "border-foreground/30 bg-muted/30"
                    : "border-border bg-background hover:border-foreground/20"
                }`}
              >
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-muted">
                        <Icon className="w-4 h-4 text-foreground" />
                      </div>
                      <div className="flex-1">
                        <Label className="text-sm font-medium">{label}</Label>
                        <p className="text-xs text-muted-foreground">{description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onToggleWeightLock(key)}
                        className={`p-2 ${isLocked ? "text-foreground" : "text-muted-foreground"}`}
                      >
                        {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                      </Button>
                      <div className="text-right min-w-[60px]">
                        <div className="text-lg font-bold font-mono">{percentage}%</div>
                      </div>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="space-y-3">
                    {/* Slider */}
                    <div className="space-y-2">
                      <Slider
                        value={[value]}
                        onValueChange={(newValue) => !isLocked && onUpdateWeight(key, newValue[0])}
                        max={1}
                        min={0}
                        step={0.05}
                        className={`w-full ${isLocked ? "opacity-50" : ""}`}
                        disabled={isLocked}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>0%</span>
                        <span>25%</span>
                        <span>50%</span>
                        <span>75%</span>
                        <span>100%</span>
                      </div>
                    </div>

                    {/* Direct Input */}
                    <div className="flex items-center gap-2">
                      <Label className="text-xs font-medium min-w-[40px]">Exact:</Label>
                      <div className="relative flex-1 max-w-[100px]">
                        <Input
                          type="number"
                          min="0"
                          max="100"
                          value={percentage}
                          onChange={(e) => {
                            const newPercentage = Math.max(0, Math.min(100, Number.parseInt(e.target.value) || 0))
                            if (!isLocked) {
                              onUpdateWeight(key, newPercentage / 100)
                            }
                          }}
                          className="text-center pr-6 text-xs h-8"
                          disabled={isLocked}
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
                          %
                        </span>
                      </div>
                      {isLocked && (
                        <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                          Locked
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Visual Distribution */}
      <Card className="border border-border/50 shadow-sm bg-muted/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-lg font-semibold">
            <div className="p-2 bg-muted rounded-lg">
              <BarChart3 className="w-4 h-4 text-foreground" />
            </div>
            Weight Distribution
          </CardTitle>
          <CardDescription>Visual representation of your preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Progress bars for each weight */}
          <div className="space-y-3">
            {WEIGHT_LABELS.map(({ key, label }) => {
              const value = form.watch(key) || 0
              const percentage = Math.round(value * 100)
              return (
                <div key={key} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{label}</span>
                    <span className="font-mono text-muted-foreground">{percentage}%</span>
                  </div>
                  <Progress value={percentage} className="h-2 bg-muted" />
                </div>
              )
            })}
          </div>

          {/* Total validation */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <Label className="font-medium text-sm">Total Distribution</Label>
              <span
                className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                  isWeightValid ? "bg-muted text-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {Math.round(totalWeight * 100)}%
              </span>
            </div>

            {isWeightValid ? (
              <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-lg">
                <Check className="w-4 h-4 text-foreground flex-shrink-0" />
                <p className="text-sm text-foreground">Perfect! Your weights are optimally balanced.</p>
              </div>
            ) : (
              <div className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                <Settings className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <p className="text-sm text-muted-foreground">
                  Weights are automatically rebalancing. Total will equal 100% when you finish adjusting.
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
