"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const featuredProducts = [
  {
    id: 1,
    name: "Tranquil Evening Blend",
    description: "A soothing chamomile and lavender blend perfect for unwinding after a long day",
    image: "/elegant-tea-package-with-chamomile-flowers.png",
    benefits: ["Promotes relaxation", "Improves sleep quality", "Reduces stress"],
  },
  {
    id: 2,
    name: "Morning Clarity Tea",
    description: "Energizing green tea with ginseng and mint to start your day mindfully",
    image: "/premium-green-tea-package-with-mint-leaves.png",
    benefits: ["Boosts energy", "Enhances focus", "Rich in antioxidants"],
  },
  {
    id: 3,
    name: "Digestive Harmony",
    description: "Gentle herbal blend with ginger and fennel to support digestive wellness",
    image: "/herbal-tea-package-with-ginger-and-fennel.png",
    benefits: ["Aids digestion", "Soothes stomach", "Natural ingredients"],
  },
]

export function Hero() {
  const [mounted, setMounted] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProducts.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [mounted])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProducts.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-muted/30 to-secondary/20">
      {/* Water ripple effects */}
      <div className="absolute inset-0 pointer-events-none">
        {mounted && (
          <>
            <div
              className="absolute top-1/4 left-1/4 w-32 h-32 border border-primary/20 rounded-full animate-ripple"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="absolute top-1/3 right-1/3 w-24 h-24 border border-secondary/20 rounded-full animate-ripple"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute bottom-1/3 left-1/2 w-40 h-40 border border-primary/10 rounded-full animate-ripple"
              style={{ animationDelay: "2s" }}
            />
          </>
        )}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="text-center lg:text-left">
            <h1 className="text-5xl md:text-7xl font-serif font-light text-foreground mb-6 text-balance">
              Find Your Inner
              <span className="block text-primary font-normal">Tranquility</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed text-pretty">
              Discover the ancient art of wellness through our carefully curated collection of premium herbal teas and
              botanicals
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
              >
                Explore Collection
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground px-8 py-3 text-lg bg-transparent transition-all duration-300 hover:scale-105"
              >
                Learn About Wellness
              </Button>
            </div>

            <div className="flex justify-center lg:justify-start">
              <div className="relative inline-block animate-float">
                <div className="w-24 h-24 relative">
                  {/* Tea cup */}
                  <div className="w-20 h-20 bg-gradient-to-b from-card to-muted border-2 border-border rounded-b-full mx-auto relative">
                    <div className="absolute top-2 left-2 right-2 h-12 bg-gradient-to-b from-primary/30 to-primary/50 rounded-b-full" />
                    {/* Handle */}
                    <div className="absolute right-0 top-3 w-5 h-6 border-2 border-border rounded-r-full bg-transparent" />
                  </div>
                  {/* Saucer */}
                  <div className="w-24 h-3 bg-gradient-to-b from-card to-muted border border-border rounded-full mx-auto -mt-1" />

                  {/* Animated steam */}
                  {mounted && (
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                      <div
                        className="w-1.5 h-6 bg-gradient-to-t from-primary/40 to-transparent rounded-full animate-steam"
                        style={{ animationDelay: "0s" }}
                      />
                      <div
                        className="absolute -left-1.5 w-1.5 h-5 bg-gradient-to-t from-primary/30 to-transparent rounded-full animate-steam"
                        style={{ animationDelay: "0.5s" }}
                      />
                      <div
                        className="absolute -right-1.5 w-1.5 h-5 bg-gradient-to-t from-primary/35 to-transparent rounded-full animate-steam"
                        style={{ animationDelay: "1s" }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-8 shadow-lg">
              <div className="relative overflow-hidden rounded-xl">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {featuredProducts.map((product, index) => (
                    <div key={product.id} className="w-full flex-shrink-0">
                      <div className="text-center">
                        <div className="relative mb-6 group">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-64 h-64 mx-auto object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <h3 className="text-2xl font-serif font-light text-foreground mb-3">{product.name}</h3>

                        <p className="text-muted-foreground mb-4 text-pretty">{product.description}</p>

                        <div className="flex flex-wrap gap-2 justify-center">
                          {product.benefits.map((benefit, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-secondary/20 text-secondary-foreground rounded-full text-sm border border-secondary/30"
                            >
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation controls */}
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={prevSlide}
                  className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-200"
                  aria-label="Previous product"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <div className="flex gap-2">
                  {featuredProducts.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === currentSlide ? "bg-primary" : "bg-primary/30"
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={nextSlide}
                  className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors duration-200"
                  aria-label="Next product"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="p-6 bg-card/30 backdrop-blur-sm rounded-lg border border-border max-w-2xl mx-auto transform hover:scale-105 transition-transform duration-300">
            <blockquote className="text-lg font-serif font-light text-foreground italic text-balance">
              "Tea is not just a beverage, it's a moment of mindfulness in a chaotic world."
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  )
}
