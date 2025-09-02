"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, X, Leaf, Moon, Sun, Heart, Brain, Shield, Coffee } from "lucide-react"

interface ProductFiltersProps {
  onSearchChange: (search: string) => void
  onCategoryChange: (category: string) => void
  onPriceRangeChange: (range: [number, number]) => void
  onAvailabilityChange: (available: boolean | null) => void
  activeCategory: string
  searchQuery: string
}

const categories = [
  { id: "all", label: "All Products", icon: Leaf, color: "text-primary" },
  { id: "sleep", label: "Sleep & Relaxation", icon: Moon, color: "text-blue-500" },
  { id: "energy", label: "Energy & Focus", icon: Sun, color: "text-yellow-500" },
  { id: "wellness", label: "Wellness & Balance", icon: Heart, color: "text-pink-500" },
  { id: "clarity", label: "Mental Clarity", icon: Brain, color: "text-purple-500" },
  { id: "immunity", label: "Immune Support", icon: Shield, color: "text-green-500" },
  { id: "digestive", label: "Digestive Health", icon: Coffee, color: "text-orange-500" },
]

const priceRanges = [
  { label: "Under $25", range: [0, 25] },
  { label: "$25 - $35", range: [25, 35] },
  { label: "$35 - $50", range: [35, 50] },
  { label: "Over $50", range: [50, 1000] },
]

export function ProductFilters({
  onSearchChange,
  onCategoryChange,
  onPriceRangeChange,
  onAvailabilityChange,
  activeCategory,
  searchQuery,
}: ProductFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [selectedPriceRange, setSelectedPriceRange] = useState<[number, number] | null>(null)
  const [availabilityFilter, setAvailabilityFilter] = useState<boolean | null>(null)

  const handleCategoryClick = (categoryId: string) => {
    onCategoryChange(categoryId)
  }

  const handlePriceRangeClick = (range: [number, number]) => {
    if (selectedPriceRange && selectedPriceRange[0] === range[0] && selectedPriceRange[1] === range[1]) {
      setSelectedPriceRange(null)
      onPriceRangeChange([0, 1000])
    } else {
      setSelectedPriceRange(range)
      onPriceRangeChange(range)
    }
  }

  const handleAvailabilityClick = (available: boolean | null) => {
    if (availabilityFilter === available) {
      setAvailabilityFilter(null)
      onAvailabilityChange(null)
    } else {
      setAvailabilityFilter(available)
      onAvailabilityChange(available)
    }
  }

  const clearAllFilters = () => {
    setSelectedPriceRange(null)
    setAvailabilityFilter(null)
    onPriceRangeChange([0, 1000])
    onAvailabilityChange(null)
    onCategoryChange("all")
    onSearchChange("")
  }

  return (
    <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-6 mb-8">
      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          placeholder="Search for teas, benefits, or ingredients..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 pr-4 py-3 text-lg border-border bg-background/80 focus:bg-background transition-all duration-300"
        />
        {searchQuery && (
          <button
            onClick={() => onSearchChange("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors duration-200"
            aria-label="Clear search"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Category Pills */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-muted-foreground mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const Icon = category.icon
            const isActive = activeCategory === category.id
            return (
              <Button
                key={category.id}
                variant={isActive ? "default" : "outline"}
                size="sm"
                onClick={() => handleCategoryClick(category.id)}
                className={`transition-all duration-300 hover:scale-105 ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card hover:bg-primary/10 border-primary/20"
                }`}
              >
                <Icon className={`w-4 h-4 mr-2 ${category.color}`} />
                {category.label}
              </Button>
            )
          })}
        </div>
      </div>

      {/* Advanced Filters Toggle */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">Advanced Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <Filter className="w-4 h-4" />
          {isFiltersOpen ? "Hide" : "Show"} Filters
        </Button>
      </div>

      {/* Advanced Filters */}
      {isFiltersOpen && (
        <div className="space-y-6 pt-4 border-t border-border/50">
          {/* Price Range */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Price Range</h4>
            <div className="grid grid-cols-2 gap-2">
              {priceRanges.map((range, idx) => (
                <Button
                  key={idx}
                  variant={selectedPriceRange && selectedPriceRange[0] === range.range[0] && selectedPriceRange[1] === range.range[1] ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePriceRangeClick(range.range)}
                  className="transition-all duration-300 hover:scale-105"
                >
                  {range.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Availability */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Availability</h4>
            <div className="flex gap-2">
              <Button
                variant={availabilityFilter === true ? "default" : "outline"}
                size="sm"
                onClick={() => handleAvailabilityClick(true)}
                className="transition-all duration-300 hover:scale-105"
              >
                In Stock
              </Button>
              <Button
                variant={availabilityFilter === false ? "default" : "outline"}
                size="sm"
                onClick={() => handleAvailabilityClick(false)}
                className="transition-all duration-300 hover:scale-105"
              >
                Out of Stock
              </Button>
            </div>
          </div>

          {/* Clear Filters */}
          {(selectedPriceRange || availabilityFilter !== null || activeCategory !== "all" || searchQuery) && (
            <div className="pt-4 border-t border-border/50">
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="w-full border-dashed border-border hover:border-primary transition-colors duration-300"
              >
                <X className="w-4 h-4 mr-2" />
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
