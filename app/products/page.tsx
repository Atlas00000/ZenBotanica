"use client"

import { useState, useEffect } from "react"
import { EnhancedProductShowcase } from "@/components/enhanced-product-showcase"
import { ProductFilters } from "@/components/product-filters"
import { ProductRecommendations } from "@/components/product-recommendations"
import { ProductDetailsModal } from "@/components/product-details-modal"
import { Navigation } from "@/components/navigation"
import { AnimatedBackground } from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { Leaf, Sparkles, Star, TrendingUp } from "lucide-react"

interface Product {
  id: number
  name: string
  description: string
  price: string
  originalPrice: string
  image: string
  benefits: string[]
  rating: number
  reviews: number
  brewingTime: string
  temperature: string
  ingredients: string[]
  origin: string
  inStock: boolean
  tags: string[]
}

const allProducts: Product[] = [
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

export default function ProductsPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(allProducts)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [availabilityFilter, setAvailabilityFilter] = useState<boolean | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [favorites, setFavorites] = useState<Set<number>>(new Set())
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Filter products based on current filters
  useEffect(() => {
    let filtered = allProducts

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    }

    // Category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter(product =>
        product.tags.some(tag => {
          const tagLower = tag.toLowerCase()
          const categoryLower = activeCategory.toLowerCase()
          return tagLower.includes(categoryLower) || categoryLower.includes(tagLower)
        })
      )
    }

    // Price filter
    filtered = filtered.filter(product => {
      const price = parseFloat(product.price.replace("$", ""))
      return price >= priceRange[0] && price <= priceRange[1]
    })

    // Availability filter
    if (availabilityFilter !== null) {
      filtered = filtered.filter(product => product.inStock === availabilityFilter)
    }

    setFilteredProducts(filtered)
  }, [searchQuery, activeCategory, priceRange, availabilityFilter])

  const handleAddToCart = (productId: number) => {
    // Add to cart logic here
    console.log(`Added product ${productId} to cart`)
  }

  const handleToggleFavorite = (productId: number) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId)
    } else {
      newFavorites.add(productId)
    }
    setFavorites(newFavorites)
  }

  const handleProductView = (product: Product) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <main className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-background via-muted/30 to-secondary/20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 mb-6">
            <Leaf className="w-8 h-8 text-primary animate-pulse" />
            <span className="text-lg font-medium text-primary bg-primary/10 px-4 py-2 rounded-full">
              Premium Collection
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-serif font-light text-foreground mb-6 text-balance">
            Discover Your Perfect
            <span className="block text-primary font-normal">Tea Experience</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty mb-8">
            Explore our carefully curated collection of premium teas, each crafted with intention and designed to support your unique wellness journey
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-serif font-medium text-foreground">4.8</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-8 h-8 text-secondary" />
              </div>
              <div className="text-2xl font-serif font-medium text-foreground">6</div>
              <div className="text-sm text-muted-foreground">Premium Blends</div>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <div className="text-2xl font-serif font-medium text-foreground">100%</div>
              <div className="text-sm text-muted-foreground">Natural Ingredients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <ProductFilters
            onSearchChange={setSearchQuery}
            onCategoryChange={setActiveCategory}
            onPriceRangeChange={setPriceRange}
            onAvailabilityChange={setAvailabilityFilter}
            activeCategory={activeCategory}
            searchQuery={searchQuery}
          />

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-serif font-light text-foreground">
                {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''} Found
              </h2>
              {(searchQuery || activeCategory !== "all" || priceRange[0] !== 0 || priceRange[1] !== 1000 || availabilityFilter !== null) && (
                <span className="text-sm text-muted-foreground bg-muted/50 px-3 py-1 rounded-full">
                  Filtered Results
                </span>
              )}
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
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
          {filteredProducts.length > 0 ? (
            <div className={`grid gap-8 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className={`bg-card/80 backdrop-blur-sm border border-border rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group overflow-hidden ${
                    viewMode === "list" ? "flex-row" : ""
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`${viewMode === "list" ? "flex w-full" : ""}`}>
                    {/* Product Image */}
                    <div className={`overflow-hidden relative ${
                      viewMode === "list" ? "w-48 h-48" : "aspect-square"
                    }`}>
                      <img
                        src={product.image}
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
                          handleToggleFavorite(product.id)
                        }}
                        className="absolute top-3 right-3 p-2 bg-background/90 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            favorites.has(product.id) ? "text-yellow-500 fill-yellow-500" : "text-muted-foreground"
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
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-serif font-medium text-foreground text-balance">{product.name}</h3>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium text-foreground">{product.rating}</span>
                          <span className="text-xs text-muted-foreground">({product.reviews})</span>
                        </div>
                      </div>

                      <p className="text-muted-foreground mb-4 leading-relaxed text-sm">{product.description}</p>

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
                            className="px-3 py-2"
                            onClick={() => handleProductView(product)}
                          >
                            View Details
                          </Button>
                          <Button
                            size="sm"
                            disabled={!product.inStock}
                            onClick={() => handleAddToCart(product.id)}
                            className="bg-primary hover:bg-primary/90 text-primary-foreground transform hover:scale-105 transition-transform duration-200"
                          >
                            {product.inStock ? "Add to Cart" : "Out of Stock"}
                          </Button>
                        </div>
                      </div>

                      {/* Origin Info */}
                      <div className="mt-4 pt-4 border-t border-border/50">
                        <p className="text-xs text-muted-foreground text-center">{product.origin}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-muted/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-serif font-light text-foreground mb-4">No Products Found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Try adjusting your search terms or filters to find what you're looking for
              </p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("all")
                  setPriceRange([0, 1000])
                  setAvailabilityFilter(null)
                }}
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Product Recommendations */}
      <ProductRecommendations userPreferences={["wellness", "organic"]} />

      {/* Product Details Modal */}
      {selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={closeModal}
          onAddToCart={handleAddToCart}
          onToggleFavorite={handleToggleFavorite}
          isFavorite={favorites.has(selectedProduct.id)}
        />
      )}
    </main>
  )
}
