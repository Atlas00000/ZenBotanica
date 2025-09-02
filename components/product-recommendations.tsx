"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Heart, ShoppingCart, ArrowRight, Leaf, Sparkles } from "lucide-react"

interface Product {
  id: number
  name: string
  description: string
  price: string
  image: string
  rating: number
  reviews: number
  tags: string[]
  inStock: boolean
}

interface ProductRecommendationsProps {
  currentProductId?: number
  userPreferences?: string[]
}

const allProducts: Product[] = [
  {
    id: 1,
    name: "Tranquil Evening Blend",
    description: "Chamomile, lavender, and lemon balm for peaceful nights",
    price: "$24.99",
    image: "/elegant-tea-package-with-chamomile-flowers.png",
    rating: 4.8,
    reviews: 127,
    tags: ["Sleep", "Relaxation", "Evening", "Organic"],
    inStock: true,
  },
  {
    id: 2,
    name: "Morning Clarity Tea",
    description: "Ginkgo, green tea, and mint for mental focus",
    price: "$28.99",
    image: "/premium-green-tea-package-with-mint-leaves.png",
    rating: 4.9,
    reviews: 203,
    tags: ["Focus", "Energy", "Morning", "Premium"],
    inStock: true,
  },
  {
    id: 3,
    name: "Stress Relief Blend",
    description: "Ashwagandha, holy basil, and rose petals for calm",
    price: "$32.99",
    image: "/herbal-tea-package-with-rose-petals-and-herbs.png",
    rating: 4.7,
    reviews: 89,
    tags: ["Stress Relief", "Calm", "Ayurvedic", "Traditional"],
    inStock: false,
  },
  {
    id: 4,
    name: "Digestive Harmony",
    description: "Ginger, fennel, and peppermint for gut wellness",
    price: "$26.99",
    image: "/digestive-tea-package-with-ginger-and-mint.png",
    rating: 4.6,
    reviews: 156,
    tags: ["Digestion", "Wellness", "Herbal", "Natural"],
    inStock: true,
  },
  {
    id: 5,
    name: "Immune Boost Tea",
    description: "Elderberry, echinacea, and ginger for natural defense",
    price: "$29.99",
    image: "/immune-boost-tea-package-with-elderberry.png",
    rating: 4.8,
    reviews: 134,
    tags: ["Immunity", "Wellness", "Organic", "Wildcrafted"],
    inStock: true,
  },
  {
    id: 6,
    name: "Deep Sleep Blend",
    description: "Valerian root, passionflower, and chamomile for restful nights",
    price: "$27.99",
    image: "/sleep-tea-package-with-valerian-and-passionflower.png",
    rating: 4.9,
    reviews: 98,
    tags: ["Sleep", "Relaxation", "Traditional", "Herbal"],
    inStock: true,
  },
]

export function ProductRecommendations({ currentProductId, userPreferences = [] }: ProductRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([])
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [visibleProducts, setVisibleProducts] = useState<number[]>([])

  useEffect(() => {
    // Generate personalized recommendations
    const filteredProducts = allProducts.filter(product => product.id !== currentProductId)
    
    // Sort by relevance (rating, reviews, and tag matching)
    const scoredProducts = filteredProducts.map(product => {
      let score = product.rating * 10 + Math.min(product.reviews / 10, 10)
      
      // Bonus for matching user preferences
      if (userPreferences.length > 0) {
        const matchingTags = product.tags.filter(tag => 
          userPreferences.some(pref => 
            tag.toLowerCase().includes(pref.toLowerCase()) || 
            pref.toLowerCase().includes(tag.toLowerCase())
          )
        )
        score += matchingTags.length * 5
      }
      
      return { ...product, score }
    })
    
    // Sort by score and take top 4
    const sortedProducts = scoredProducts
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
    
    setRecommendations(sortedProducts)
  }, [currentProductId, userPreferences])

  useEffect(() => {
    // Animate products in sequence
    const timer = setTimeout(() => {
      recommendations.forEach((_, index) => {
        setTimeout(() => {
          setVisibleProducts(prev => [...prev, index])
        }, index * 200)
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [recommendations])

  const toggleFavorite = (productId: number) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId)
    } else {
      newFavorites.add(productId)
    }
    setFavorites(newFavorites)
  }

  if (recommendations.length === 0) return null

  return (
    <section className="py-16 bg-gradient-to-b from-muted/20 to-background relative z-10">
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-2 h-2 bg-primary/20 rounded-full animate-float-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-secondary/20 rounded-full animate-float-slow" style={{ animationDelay: "3s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              Personalized for You
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-serif font-light text-foreground mb-4 text-balance">
            You Might Also Love
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover more teas that complement your wellness journey
          </p>
        </div>

        {/* Recommendations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((product, index) => (
            <Card
              key={product.id}
              className={`bg-card/80 backdrop-blur-sm border-border hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 group overflow-hidden ${
                visibleProducts.includes(index) 
                  ? "opacity-100 translate-y-0" 
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0 relative">
                {/* Product Image */}
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/95 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                    <div className="text-center text-primary-foreground">
                      <h4 className="font-serif text-lg mb-3">Perfect for:</h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {product.tags.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="text-sm bg-white/20 px-2 py-1 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(product.id)
                    }}
                    className="absolute top-3 right-3 p-2 bg-background/90 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.has(product.id) ? "text-red-500 fill-red-500" : "text-muted-foreground"
                      }`}
                    />
                  </button>

                  {/* Stock Status */}
                  {!product.inStock && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-red-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-serif font-medium text-foreground text-balance">{product.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-medium text-foreground">{product.rating}</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{product.description}</p>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-serif font-medium text-primary">{product.price}</span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="p-2 h-8 w-8"
                        aria-label={`View details for ${product.name}`}
                        title={`View details for ${product.name}`}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        disabled={!product.inStock}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground transform hover:scale-105 transition-transform duration-200"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        {product.inStock ? "Add" : "Out"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button
            variant="outline"
            size="lg"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg bg-transparent transition-all duration-300 hover:scale-105"
          >
            <Leaf className="w-5 h-5 mr-2" />
            Explore All Collections
          </Button>
        </div>
      </div>
    </section>
  )
}
