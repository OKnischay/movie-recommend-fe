"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Star, Sparkles, ArrowRight, Users, Heart, Zap, Target } from "lucide-react"

const moviePosters = [
  { title: "Cosmic Odyssey", genre: "Sci-Fi", rating: 9.2, year: "2024" },
  { title: "Midnight Heist", genre: "Action", rating: 8.7, year: "2024" },
  { title: "Love Actually", genre: "Romance", rating: 8.3, year: "2024" },
  { title: "Laugh Out Loud", genre: "Comedy", rating: 8.9, year: "2024" },
  { title: "Dark Shadows", genre: "Horror", rating: 8.1, year: "2024" },
  { title: "Wild Adventure", genre: "Adventure", rating: 8.8, year: "2024" },
]

const features = [
  { icon: Target, text: "AI learns your taste", color: "text-blue-500" },
  { icon: Zap, text: "Instant recommendations", color: "text-purple-500" },
  { icon: Heart, text: "95% match accuracy", color: "text-red-500" },
]

export default function Hero() {
  const [currentPoster, setCurrentPoster] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isHovered) {
        setCurrentPoster((prev) => (prev + 1) % moviePosters.length)
      }
    }, 2500)
    return () => clearInterval(interval)
  }, [isHovered])

  const currentMovie = moviePosters[currentPoster]

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950">
      {/* Background floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-pink-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-gradient-to-br from-indigo-400/5 to-blue-600/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      <div className="container relative px-4 py-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16 items-center min-h-[80vh]">
          {/* Left Content */}
          <div className="flex flex-col space-y-8 z-10 order-2 lg:order-1">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-3">
                <Badge variant="secondary" className="bg-gradient-to-r from-blue-500/10 to-purple-600/10 text-blue-600 dark:text-blue-400 border-blue-500/20 animate-pulse">
                  <Sparkles className="w-3 h-3 mr-1 animate-spin" />
                  AI-Powered Discovery
                </Badge>
                <Badge variant="secondary" className="bg-gradient-to-r from-green-500/10 to-emerald-600/10 text-green-600 dark:text-green-400 border-green-500/20">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  95% Accuracy
                </Badge>
              </div>

              <div className="space-y-6">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl leading-tight">
                  <span className="block bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 dark:from-white dark:via-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                    Find Movies You'll
                  </span>
                  <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
                    Actually Love
                  </span>
                </h1>

                <p className="text-xl text-slate-600 dark:text-slate-300 max-w-[600px] leading-relaxed">
                  Skip the endless scrolling. Our AI learns your unique taste and recommends movies perfectly matched to your preferences.
                  <br />
                  <span className="text-slate-900 dark:text-white font-semibold mt-2 block">
                    🎬 Discover • 🤖 Learn • ⚡ Enjoy
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl group transform hover:scale-105">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Start Your Journey
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" size="lg" className="text-lg px-8 py-6 border-2 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300 group">
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Watch How It Works
              </Button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300">
                  <feature.icon className={`w-5 h-5 ${feature.color}`} />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{feature.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-4">
              <div className="flex items-center space-x-3">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-600 border-2 border-white dark:border-slate-800 flex items-center justify-center shadow-lg">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold text-slate-900 dark:text-white text-lg">50,000+</span>
                  <span className="text-slate-600 dark:text-slate-400 ml-1 block">happy movie lovers</span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400 animate-pulse" style={{ animationDelay: `${i * 100}ms` }} />
                  ))}
                </div>
                <span className="text-lg font-bold text-slate-900 dark:text-white ml-2">4.9</span>
                <span className="text-sm text-slate-600 dark:text-slate-400">(2,847 reviews)</span>
              </div>
            </div>
          </div>

          {/* Right Visual - Background Movie Poster */}
          <div className="relative lg:pl-8 order-1 lg:order-2">
            <div
              className="relative max-w-lg mx-auto h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              style={{
                backgroundImage: `url('/images/${currentMovie.title.replace(/\s+/g, "-").toLowerCase()}.jpg')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
              <div className="absolute bottom-4 left-4 z-20 text-white">
                <h3 className="text-2xl font-bold">{currentMovie.title}</h3>
                <p className="text-sm opacity-80">{currentMovie.genre} • {currentMovie.year}</p>
                <div className="flex items-center mt-1 space-x-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-white font-medium">{currentMovie.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
