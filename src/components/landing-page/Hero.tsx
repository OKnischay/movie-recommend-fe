"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Star, TrendingUp, Sparkles, ArrowRight, Users, Heart, ThumbsUp } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const moviePosters = [
  { title: "Neon Dreams", genre: "Cyberpunk", rating: 8.9, color: "from-teal-500 to-blue-500", year: 2024 },
  { title: "Cosmic Odyssey", genre: "Sci-Fi", rating: 9.2, color: "from-violet-600 to-purple-500", year: 2023 },
  { title: "Midnight Rhapsody", genre: "Noir", rating: 8.7, color: "from-gray-800 to-indigo-900", year: 2024 },
  { title: "Solar Flare", genre: "Action", rating: 8.5, color: "from-orange-500 to-pink-600", year: 2023 },
  { title: "Pixel Hearts", genre: "Romance", rating: 7.8, color: "from-rose-500 to-fuchsia-600", year: 2024 },
  { title: "Laugh Riot", genre: "Comedy", rating: 8.9, color: "from-yellow-400 to-amber-500", year: 2023 },
]

export function Hero() {
  const [currentPoster, setCurrentPoster] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPoster((prev) => (prev + 1) % moviePosters.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-background via-background to-muted/10">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/3 to-purple-500/3 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative px-4 py-16 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col space-y-8 z-10">
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Badge
                  variant="secondary"
                  className="w-fit bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors group"
                >
                  <Sparkles className="w-3 h-3 mr-1 group-hover:rotate-180 transition-transform duration-500" />
                  <span>AI-Powered Recommendations • 97% Match Accuracy</span>
                </Badge>
              </motion.div>

              <div className="space-y-6">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl"
                >
                  <span className="bg-gradient-to-r from-foreground via-foreground to-muted-foreground bg-clip-text text-transparent">
                    Discover Films That
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-primary via-purple-600 to-primary bg-clip-text text-transparent animate-pulse">
                    Feel Made For You
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-lg sm:text-xl text-muted-foreground max-w-[600px] leading-relaxed"
                >
                  Our neural network analyzes your viewing habits, ratings, and even your mood to deliver hyper-personalized recommendations. 
                  <span className="text-foreground font-medium"> No more endless scrolling</span> - just perfect matches.
                </motion.p>
              </div>
            </div>

            {/* CTA Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Start Your Journey
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 border-2 hover:bg-muted/50 transition-all duration-300 group"
              >
                <Heart className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform text-pink-500 fill-pink-500/20" />
                Save Preferences
              </Button>
            </motion.div>

            {/* Social Proof */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4"
            >
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-purple-600/20 border-2 border-background flex items-center justify-center"
                    >
                      <Users className="w-4 h-4 text-primary" />
                    </motion.div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-foreground">1M+</span>
                  <span className="text-muted-foreground ml-1">cinephiles connected</span>
                </div>
              </div>

              <div className="flex items-center space-x-1">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground ml-2">4.9/5</span>
                <span className="text-sm text-muted-foreground">(24,847 reviews)</span>
              </div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>No algorithms</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                <span>Human-curated</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-700"></div>
                <span>Privacy-first</span>
              </div>
            </motion.div>
          </div>

          {/* Right Visual */}
          <div className="relative lg:pl-8">
            <div className="relative max-w-lg mx-auto">
              {/* Main container with glow effect */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-purple-600/20 to-primary/20 rounded-3xl blur-2xl scale-105 animate-pulse"></div>

                {/* Movie discovery interface mockup */}
                <div className="relative bg-gradient-to-br from-card via-card to-muted/50 rounded-3xl p-6 border border-border/50 shadow-2xl backdrop-blur-sm overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">Your Daily Picks</h3>
                      <p className="text-sm text-muted-foreground">Curated just for you</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/20">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      New
                    </Badge>
                  </div>

                  {/* Movie grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {moviePosters.slice(0, 4).map((movie, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className={`relative aspect-[3/4] rounded-xl overflow-hidden group cursor-pointer transition-all duration-500 ${
                          index === currentPoster % 4 ? "ring-2 ring-primary scale-105 shadow-lg" : "hover:scale-105"
                        }`}
                      >
                        <div className={`absolute inset-0 bg-gradient-to-br ${movie.color} opacity-80`}></div>
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
                        <div className="absolute bottom-2 left-2 right-2">
                          <div className="text-white text-sm font-medium truncate">{movie.title}</div>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-white/80 text-xs">{movie.genre} • {movie.year}</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-white text-xs">{movie.rating}</span>
                            </div>
                          </div>
                        </div>
                        {index === currentPoster % 4 && (
                          <div className="absolute inset-0 bg-primary/20 animate-pulse"></div>
                        )}
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <ThumbsUp className="w-4 h-4 text-white fill-white/20" />
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Personalization preview */}
                  <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-xl p-4 border border-primary/20 relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-16 h-16 bg-primary/5 rounded-full blur-xl"></div>
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">Your Taste Profile</span>
                        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                          87% Complete
                        </span>
                      </div>
                      <div className="w-full bg-muted/50 rounded-full h-2 mb-2">
                        <div 
                          className="bg-gradient-to-r from-primary/50 to-purple-600/50 h-2 rounded-full animate-progress"
                          style={{ width: '87%' }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        🎯 Based on 42 ratings • 🤖 5,280 data points • ⚡ Refreshes daily
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div 
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/20"
              >
                <Sparkles className="w-6 h-6 text-primary" />
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -15, 0],
                  x: [0, 5, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-purple-600/20 to-primary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-purple-600/20"
              >
                <Star className="w-5 h-5 text-purple-600 fill-purple-600/20" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 87%; }
        }
        .animate-progress {
          animation: progress 1.5s ease-out forwards;
        }
      `}</style>
    </section>
  )
}