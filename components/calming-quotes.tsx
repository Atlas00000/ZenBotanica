"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const quotes = [
  {
    text: "In the silence between sips, we find our truest selves.",
    author: "Ancient Tea Wisdom",
    theme: "mindfulness",
  },
  {
    text: "Every cup of tea represents an imaginary voyage.",
    author: "Catherine Douzel",
    theme: "journey",
  },
  {
    text: "Tea is the elixir of life, bringing peace to the restless soul.",
    author: "Zen Botanica",
    theme: "peace",
  },
  {
    text: "Where there is tea, there is hope.",
    author: "Arthur Wing Pinero",
    theme: "hope",
  },
  {
    text: "Tea is a cup of life, steeped in moments of tranquility.",
    author: "Zen Philosophy",
    theme: "tranquility",
  },
  {
    text: "In every leaf lies the wisdom of the earth.",
    author: "Botanical Wisdom",
    theme: "nature",
  },
]

export function CalmingQuotes() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length)
        setIsAnimating(false)
      }, 300)
    }, 6000)

    return () => clearInterval(interval)
  }, [isPaused])

  const handleQuoteChange = (index: number) => {
    if (index === currentQuote) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentQuote(index)
      setIsAnimating(false)
    }, 300)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-muted/20 via-secondary/10 to-primary/5 relative z-10">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-2 h-2 bg-primary/20 rounded-full animate-float-slow"
          style={{ animationDelay: "0s" }}
        />
        <div
          className="absolute top-40 right-20 w-3 h-3 bg-secondary/20 rounded-full animate-float-slow"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-32 left-1/4 w-2 h-2 bg-primary/15 rounded-full animate-float-slow"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-12 text-balance">
          Moments of Mindfulness
        </h2>

        <div className="relative min-h-[250px] flex items-center justify-center">
          <div
            className={`transition-all duration-500 ease-in-out ${
              isAnimating ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
            }`}
          >
            <blockquote className="text-2xl md:text-3xl font-serif font-light text-foreground italic mb-6 text-balance leading-relaxed">
              "{quotes[currentQuote].text}"
            </blockquote>
            <cite className="text-lg text-muted-foreground font-sans">— {quotes[currentQuote].author}</cite>

            <div className="mt-4">
              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full border border-primary/20">
                {quotes[currentQuote].theme}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center space-x-4 mt-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsPaused(!isPaused)}
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            {isPaused ? "▶️" : "⏸️"}
          </Button>

          <div className="flex space-x-2">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => handleQuoteChange(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 ${
                  index === currentQuote ? "bg-primary scale-125 shadow-lg" : "bg-border hover:bg-primary/50"
                }`}
                aria-label={`Quote ${index + 1}`}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleQuoteChange((currentQuote + 1) % quotes.length)}
            className="text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            ⏭️
          </Button>
        </div>

        <div className="mt-12 p-6 bg-card/50 backdrop-blur-sm rounded-lg border border-border max-w-2xl mx-auto">
          <p className="text-muted-foreground mb-4">Let these moments of wisdom guide your tea journey</p>
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105 bg-transparent"
          >
            Explore Our Collection
          </Button>
        </div>
      </div>
    </section>
  )
}
