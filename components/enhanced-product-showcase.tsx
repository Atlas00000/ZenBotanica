"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Heart, ShoppingCart, Eye, Leaf, Clock, Thermometer } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Tranquil Evening Blend",
    description: "Chamomile, lavender, and lemon balm for peaceful nights",
    price: "$24.99",
    originalPrice: "$29.99",
    image: "/elegant-tea-package-with-chamomile-flowers.png",
    benefits: ["Promotes relaxation", "Improves sleep quality", "Reduces anxiety"],
    rating: 4.8,
    reviews: 127,
    brewingTime: "5-7 min",
    temperature: "85°C",
    ingredients: ["Chamomile", "Lavender", "Lemon Balm", "Passionflower"],
    origin: "Organic, Fair Trade",
    inStock: true,
    tags: ["Sleep", "Relaxation", "Evening", "Organic"],
  },
  {
    id: 2,
    name: "Morning Clarity Tea",
    description: "Ginkgo, green tea, and mint for mental focus",
    price: "$28.99",
    originalPrice: "$34.99",
    image: "/premium-green-tea-package-with-mint-leaves.png",
    benefits: ["Enhances focus", "Boosts energy", "Supports memory"],
    rating: 4.9,
    reviews: 203,
    brewingTime: "3-5 min",
    temperature: "80°C",
    ingredients: ["Green Tea", "Ginkgo Biloba", "Peppermint", "Ginseng"],
    origin: "Premium, Single Origin",
    inStock: true,
    tags: ["Focus", "Energy", "Morning", "Premium"],
  },
  {
    id: 3,
    name: "Stress Relief Blend",
    description: "Ashwagandha, holy basil, and rose petals for calm",
    price: "$32.99",
    originalPrice: "$39.99",
    image: "/herbal-tea-package-with-rose-petals-and-herbs.png",
    benefits: ["Reduces stress", "Balances mood", "Promotes calm"],
    rating: 4.7,
    reviews: 89,
    brewingTime: "6-8 min",
    temperature: "90°C",
    ingredients: ["Ashwagandha", "Holy Basil", "Rose Petals", "Chamomile"],
    origin: "Ayurvedic, Traditional",
    inStock: false,
    tags: ["Stress Relief", "Calm", "Ayurvedic", "Traditional"],
  },
  {
    id: 4,
    name: "Digestive Harmony",
    description: "Ginger, fennel, and peppermint for gut wellness",
    price: "$26.99",
    originalPrice: "$31.99",
    image: "/digestive-tea-package-with-ginger-and-mint.png",
    benefits: ["Aids digestion", "Soothes stomach", "Reduces bloating"],
    rating: 4.6,
    reviews: 156,
    brewingTime: "4-6 min",
    temperature: "85°C",
    ingredients: ["Ginger", "Fennel", "Peppermint", "Lemon"],
    origin: "Natural, Herbal",
    inStock: true,
    tags: ["Digestion", "Wellness", "Herbal", "Natural"],
  },
  {
    id: 5,
    name: "Immune Boost Tea",
    description: "Elderberry, echinacea, and ginger for natural defense",
    price: "$29.99",
    originalPrice: "$35.99",
    image: "/immune-boost-tea-package-with-elderberry.png",
    benefits: ["Boosts immunity", "Antioxidant rich", "Natural defense"],
    rating: 4.8,
    reviews: 134,
    brewingTime: "5-7 min",
    temperature: "90°C",
    ingredients: ["Elderberry", "Echinacea", "Ginger", "Honey"],
    origin: "Wildcrafted, Organic",
    inStock: true,
    tags: ["Immunity", "Wellness", "Organic", "Wildcrafted"],
  },
  {
    id: 6,
    name: "Deep Sleep Blend",
    description: "Valerian root, passionflower, and chamomile for restful nights",
    price: "$27.99",
    originalPrice: "$32.99",
    image: "/sleep-tea-package-with-valerian-and-passionflower.png",
    benefits: ["Deep sleep", "Relaxation", "Natural sedative"],
    rating: 4.9,
    reviews: 98,
    brewingTime: "7-10 min",
    temperature: "85°C",
    ingredients: ["Valerian Root", "Passionflower", "Chamomile", "Lavender"],
    origin: "Traditional, Herbal",
    inStock: true,
    tags: ["Sleep", "Relaxation", "Traditional", "Herbal"],
  },
]

export function EnhancedProductShowcase() {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const toggleFavorite = (productId: number) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId)
    } else {
      newFavorites.add(productId)
    }
    setFavorites(newFavorites)
  }

  const formatPrice = (price: string) => {
    return price.replace("$", "")
  }

  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/20 to-background relative z-10">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-primary/20 rounded-full animate-float-slow" style={{ animationDelay: "0s" }} />
        <div className="absolute top-40 right-20 w-3 h-3 bg-secondary/20 rounded-full animate-float-slow" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-primary/15 rounded-full animate-float-slow" style={{ animationDelay: "4s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Leaf className="w-6 h-6 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
              Premium Collection
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6 text-balance">
            Discover Your Perfect
            <span className="block text-primary font-normal">Tea Experience</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty mb-8">
            Each blend is thoughtfully crafted with premium ingredients, traditional wisdom, and modern wellness science
          </p>
          
          {/* View Mode Toggle */}
          <div className="flex justify-center items-center gap-4">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("grid")}
              className="transition-all duration-300"
            >
              Grid View
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              size="sm"
              onClick={() => setViewMode("list")}
              className="transition-all duration-300"
            >
              List View
            </Button>
          </div>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-8 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
            : "grid-cols-1"
        }`}>
          {products.map((product, index) => (
            <Card
              key={product.id}
              className={`bg-card/80 backdrop-blur-sm border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group overflow-hidden ${
                viewMode === "list" ? "flex-row" : ""
              }`}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className={`p-0 relative ${viewMode === "list" ? "flex w-full" : ""}`}>
                {/* Product Image */}
                <div className={`overflow-hidden relative ${
                  viewMode === "list" ? "w-48 h-48" : "aspect-square"
                }`}>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/95 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center p-4">
                    <div className="text-center text-primary-foreground">
                      <h4 className="font-serif text-lg mb-3">Benefits:</h4>
                      <ul className="space-y-1 text-sm">
                        {product.benefits.map((benefit, idx) => (
                          <li key={idx} className="flex items-center justify-center">
                            <span className="w-1 h-1 bg-primary-foreground rounded-full mr-2"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Product Tags */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {product.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-background/90 text-xs font-medium text-foreground rounded-full backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
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
                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-red-500/90 text-white text-xs font-medium rounded-full backdrop-blur-sm">
                      Out of Stock
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                  {/* Product Header */}
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-serif font-medium text-foreground text-balance">{product.name}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm font-medium text-foreground">{product.rating}</span>
                      <span className="text-xs text-muted-foreground">({product.reviews})</span>
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">{product.description}</p>

                  {/* Brewing Info */}
                  <div className="flex items-center gap-4 mb-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {product.brewingTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Thermometer className="w-3 h-3" />
                      {product.temperature}
                    </div>
                  </div>

                  {/* Ingredients */}
                  <div className="mb-4">
                    <p className="text-xs text-muted-foreground mb-2">Key Ingredients:</p>
                    <div className="flex flex-wrap gap-1">
                      {product.ingredients.slice(0, 3).map((ingredient, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-secondary/20 text-xs text-secondary-foreground rounded-full"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-serif font-medium text-primary">{product.price}</span>
                      {product.originalPrice !== product.price && (
                        <span className="text-sm text-muted-foreground line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="p-2 h-8 w-8"
                        onClick={() => setSelectedProduct(product.id)}
                        aria-label={`View details for ${product.name}`}
                        title={`View details for ${product.name}`}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        disabled={!product.inStock}
                        className="bg-primary hover:bg-primary/90 text-primary-foreground transform hover:scale-105 transition-transform duration-200"
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </div>
                  </div>

                  {/* Origin Info */}
                  <div className="mt-4 pt-4 border-t border-border/50">
                    <p className="text-xs text-muted-foreground text-center">{product.origin}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Enhanced CTA Section */}
        <div className="text-center mt-16">
          <div className="p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border max-w-2xl mx-auto">
            <h3 className="text-2xl font-serif font-light text-foreground mb-4">
              Ready to Begin Your Wellness Journey?
            </h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of tea enthusiasts who have discovered the transformative power of mindful tea rituals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
              >
                Explore All Products
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-3 text-lg bg-transparent transition-all duration-300 hover:scale-105"
              >
                Get Brewing Guide
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
