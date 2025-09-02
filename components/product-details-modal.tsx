"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, Star, Heart, ShoppingCart, Clock, Thermometer, Leaf, Award, Globe, Users } from "lucide-react"

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

interface ProductDetailsModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
  onAddToCart: (productId: number) => void
  onToggleFavorite: (productId: number) => void
  isFavorite: boolean
}

export function ProductDetailsModal({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onToggleFavorite,
  isFavorite,
}: ProductDetailsModalProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true)
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!product || !isOpen) return null

  const handleClose = () => {
    setIsAnimating(false)
    setTimeout(() => {
      onClose()
    }, 200)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          isAnimating ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      {/* Modal */}
      <div
        className={`relative bg-card border border-border rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transition-all duration-300 ${
          isAnimating ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 bg-background/80 rounded-full backdrop-blur-sm hover:bg-background transition-colors duration-200"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid lg:grid-cols-2 gap-0">
          {/* Left Side - Image */}
          <div className="relative lg:rounded-l-2xl overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover aspect-square lg:aspect-auto lg:min-h-[500px]"
            />
            
            {/* Image Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
            
            {/* Product Tags */}
            <div className="absolute top-4 left-4 flex flex-wrap gap-2">
              {product.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-background/90 text-xs font-medium text-foreground rounded-full backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Favorite Button */}
            <button
              onClick={() => onToggleFavorite(product.id)}
              className="absolute top-4 right-4 p-3 bg-background/90 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? "text-red-500 fill-red-500" : "text-muted-foreground"
                }`}
              />
            </button>

            {/* Stock Status */}
            {!product.inStock && (
              <div className="absolute top-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-red-500/90 text-white text-sm font-medium rounded-full backdrop-blur-sm">
                Out of Stock
              </div>
            )}
          </div>

          {/* Right Side - Content */}
          <div className="p-8 lg:p-10">
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Leaf className="w-5 h-5 text-primary" />
                <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                  Premium Blend
                </span>
              </div>
              
              <h2 className="text-3xl font-serif font-light text-foreground mb-3 text-balance">
                {product.name}
              </h2>
              
              <p className="text-muted-foreground leading-relaxed text-lg mb-4">
                {product.description}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium text-foreground">{product.rating}</span>
                <span className="text-sm text-muted-foreground">({product.reviews} reviews)</span>
              </div>
            </div>

            {/* Brewing Information */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <Clock className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Brewing Time</p>
                  <p className="font-medium text-foreground">{product.brewingTime}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                <Thermometer className="w-5 h-5 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Temperature</p>
                  <p className="font-medium text-foreground">{product.temperature}</p>
                </div>
              </div>
            </div>

            {/* Benefits */}
            <div className="mb-6">
              <h3 className="text-lg font-serif font-medium text-foreground mb-3">Key Benefits</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {product.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Ingredients */}
            <div className="mb-6">
              <h3 className="text-lg font-serif font-medium text-foreground mb-3">Ingredients</h3>
              <div className="flex flex-wrap gap-2">
                {product.ingredients.map((ingredient, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-secondary/20 text-sm text-secondary-foreground rounded-full"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Origin & Quality */}
            <div className="mb-6">
              <h3 className="text-lg font-serif font-medium text-foreground mb-3">Origin & Quality</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{product.origin}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Premium Quality Assured</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Loved by {product.reviews}+ customers</span>
                </div>
              </div>
            </div>

            {/* Price & Actions */}
            <div className="border-t border-border pt-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-serif font-medium text-primary">{product.price}</span>
                  {product.originalPrice !== product.price && (
                    <span className="text-lg text-muted-foreground line-through">{product.originalPrice}</span>
                  )}
                </div>
                
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Free shipping on orders over $50</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  size="lg"
                  disabled={!product.inStock}
                  onClick={() => onAddToCart(product.id)}
                  className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-lg transition-all duration-300 hover:scale-105"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.inStock ? "Add to Cart" : "Out of Stock"}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="px-8 py-3 text-lg border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-105"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
