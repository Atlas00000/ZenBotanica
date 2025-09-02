"use client"

import { useState, useEffect } from "react"
import { Leaf, Sparkles, Heart } from "lucide-react"

interface LoadingScreenProps {
  isLoading: boolean
  onLoadingComplete: () => void
}

export function LoadingScreen({ isLoading, onLoadingComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [showContent, setShowContent] = useState(false)
  const [fadeOut, setFadeOut] = useState(false)

  useEffect(() => {
    if (isLoading) {
      setShowContent(true)
      setFadeOut(false)
      setProgress(0)
      
      // Simulate loading progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + Math.random() * 15 + 5
        })
      }, 200)

      return () => clearInterval(interval)
    }
  }, [isLoading])

  useEffect(() => {
    if (progress >= 100) {
      // Show completion state briefly
      setTimeout(() => {
        setFadeOut(true)
        setTimeout(() => {
          setShowContent(false)
          onLoadingComplete()
        }, 500)
      }, 800)
    }
  }, [progress, onLoadingComplete])

  if (!showContent) return null

  return (
    <div className={`fixed inset-0 z-[9999] bg-gradient-to-br from-background via-muted/20 to-secondary/10 backdrop-blur-sm transition-opacity duration-500 ${
      fadeOut ? "opacity-0" : "opacity-100"
    }`}>
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Tea leaves floating */}
        <div className="absolute top-20 left-10 w-3 h-3 bg-primary/30 rounded-full animate-float-slow" style={{ animationDelay: "0s" }} />
        <div className="absolute top-40 right-20 w-2 h-2 bg-secondary/40 rounded-full animate-float-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-32 left-1/4 w-4 h-4 bg-primary/20 rounded-full animate-float-slow" style={{ animationDelay: "4s" }} />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-secondary/30 rounded-full animate-float-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 right-10 w-3 h-3 bg-primary/25 rounded-full animate-float-slow" style={{ animationDelay: "3s" }} />
      </div>

      {/* Main content */}
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        {/* Logo and Brand */}
        <div className="text-center mb-12">
          <div className="relative mb-6">
            {/* Animated logo container */}
            <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-primary/30 animate-pulse">
              <Leaf className="w-12 h-12 text-primary animate-bounce" />
            </div>
            
            {/* Orbiting sparkles */}
            <div className="absolute inset-0 animate-spin">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
              </div>
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" style={{ animationDelay: "0.5s" }} />
              </div>
              <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2">
                <Sparkles className="w-4 h-4 text-secondary animate-pulse" style={{ animationDelay: "1s" }} />
              </div>
              <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1/2">
                <Sparkles className="w-4 h-4 text-primary animate-pulse" style={{ animationDelay: "1.5s" }} />
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-serif font-light text-foreground mb-4 text-balance">
            Zen Botanica
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto leading-relaxed">
            Cultivating wellness through mindful tea rituals
          </p>
        </div>

        {/* Loading Animation */}
        <div className="w-full max-w-md mb-8">
          {/* Progress Bar */}
          <div className="relative mb-4">
            <div className="w-full h-2 bg-muted/50 rounded-full overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-primary via-secondary to-primary rounded-full transition-all duration-300 ease-out relative overflow-hidden"
                style={{ width: `${progress}%` }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>
            
            {/* Progress percentage */}
            <div className="absolute -top-8 right-0 text-sm font-medium text-primary">
              {Math.round(progress)}%
            </div>
          </div>

          {/* Loading text */}
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              {progress < 30 && "Preparing your wellness journey..."}
              {progress >= 30 && progress < 60 && "Brewing tranquility..."}
              {progress >= 60 && progress < 90 && "Infusing mindfulness..."}
              {progress >= 90 && "Almost ready..."}
            </p>
          </div>
        </div>

        {/* Tea Cup Animation */}
        <div className="relative mb-8">
          {/* Tea cup */}
          <div className="w-16 h-20 bg-gradient-to-b from-muted/80 to-card/60 rounded-b-full border border-border/50 relative overflow-hidden">
            {/* Cup rim */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-6 bg-gradient-to-b from-muted/60 to-muted/40 rounded-full" />
            
            {/* Tea liquid */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-b from-primary/40 to-primary/20 rounded-full" />
            
            {/* Steam trails */}
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
              <div className="w-1 h-4 bg-primary/30 rounded-full animate-steam-trail-1" />
              <div className="w-1 h-4 bg-primary/20 rounded-full animate-steam-trail-2 absolute -left-1" />
              <div className="w-1 h-4 bg-primary/25 rounded-full animate-steam-trail-3 absolute -right-1" />
            </div>
          </div>
          
          {/* Floating tea leaves */}
          <div className="absolute -top-4 -left-2 w-2 h-2 bg-primary/40 rounded-full animate-float-slow" />
          <div className="absolute -top-6 -right-1 w-3 h-3 bg-secondary/30 rounded-full animate-float-slow" style={{ animationDelay: "1s" }} />
        </div>

        {/* Completion message */}
        {progress >= 100 && (
          <div className="text-center animate-fade-in-up">
            <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-primary fill-primary animate-pulse" />
            </div>
            <p className="text-lg font-serif font-medium text-primary">
              Welcome to your wellness journey
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
