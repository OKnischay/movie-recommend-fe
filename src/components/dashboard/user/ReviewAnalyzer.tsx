"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MessageSquare, Brain, Sparkles } from "lucide-react"

export function ReviewAnalyzer() {
  const [review, setReview] = useState("")
  const [analysis, setAnalysis] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const analyzeReview = async () => {
    if (!review.trim()) return

    setIsAnalyzing(true)

    // Simulate API call - replace with actual NLP analysis
    setTimeout(() => {
      setAnalysis({
        sentiment: {
          score: 0.85,
          label: "Very Positive",
          confidence: 0.92,
        },
        emotions: [
          { emotion: "excitement", score: 0.78 },
          { emotion: "satisfaction", score: 0.71 },
          { emotion: "anticipation", score: 0.65 },
        ],
        keywords: ["amazing", "cinematography", "plot", "characters", "recommend"],
        themes: ["Visual Effects", "Storytelling", "Character Development"],
        recommendations: [
          { title: "Similar movies you might enjoy", count: 8 },
          { title: "Based on your sentiment", count: 12 },
        ],
      })
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="w-5 h-5 mr-2" />
          Review Analyzer
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Textarea
            placeholder="Write a movie review to see our NLP analysis in action..."
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="min-h-[100px]"
          />
          <Button onClick={analyzeReview} disabled={!review.trim() || isAnalyzing} className="mt-2 w-full">
            {isAnalyzing ? (
              <>
                <Brain className="w-4 h-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Analyze Review
              </>
            )}
          </Button>
        </div>

        {analysis && (
          <div className="space-y-4 pt-4 border-t">
            {/* Sentiment Analysis */}
            <div>
              <h4 className="font-medium text-sm mb-2">Sentiment Analysis</h4>
              <div className="flex items-center justify-between mb-2">
                <Badge variant={analysis.sentiment.score > 0.6 ? "default" : "secondary"} className="text-xs">
                  {analysis.sentiment.label}
                </Badge>
                <span className="text-sm font-medium">{Math.round(analysis.sentiment.score * 100)}%</span>
              </div>
              <Progress value={analysis.sentiment.score * 100} className="h-2" />
            </div>

            {/* Emotions */}
            <div>
              <h4 className="font-medium text-sm mb-2">Detected Emotions</h4>
              <div className="space-y-2">
                {analysis.emotions.map((emotion: any, index: number) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm capitalize">{emotion.emotion}</span>
                    <div className="flex items-center space-x-2">
                      <Progress value={emotion.score * 100} className="h-1 w-16" />
                      <span className="text-xs text-muted-foreground">{Math.round(emotion.score * 100)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Keywords & Themes */}
            <div>
              <h4 className="font-medium text-sm mb-2">Key Themes</h4>
              <div className="flex flex-wrap gap-1">
                {analysis.themes.map((theme: string, index: number) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {theme}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Recommendations Impact */}
            <div>
              <h4 className="font-medium text-sm mb-2">Recommendation Impact</h4>
              <div className="space-y-1">
                {analysis.recommendations.map((rec: any, index: number) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{rec.title}</span>
                    <Badge variant="secondary" className="text-xs">
                      +{rec.count} movies
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
