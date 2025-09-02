"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const benefits = [
  { id: "relaxation", label: "Relaxation", icon: "🧘" },
  { id: "energy", label: "Energy", icon: "⚡" },
  { id: "focus", label: "Focus", icon: "🎯" },
  { id: "digestion", label: "Digestion", icon: "🌿" },
  { id: "immunity", label: "Immunity", icon: "🛡️" },
  { id: "sleep", label: "Sleep", icon: "🌙" },
]

const teas = [
  {
    name: "Tranquil Evening Blend",
    benefits: ["relaxation", "sleep"],
    description: "Chamomile, lavender, and lemon balm for peaceful nights",
    price: "$24.99",
    image: "/elegant-tea-package-with-chamomile-flowers.png",
  },
  {
    name: "Morning Clarity Tea",
    benefits: ["energy", "focus"],
    description: "Ginkgo, green tea, and mint for mental focus",
    price: "$28.99",
    image: "/premium-green-tea-package-with-mint-leaves.png",
  },
  {
    name: "Stress Relief Blend",
    benefits: ["relaxation", "focus"],
    description: "Ashwagandha, holy basil, and rose petals for calm",
    price: "$32.99",
    image: "/herbal-tea-package-with-rose-petals-and-herbs.png",
  },
  {
    name: "Digestive Harmony",
    benefits: ["digestion"],
    description: "Ginger, fennel, and peppermint for gut wellness",
    price: "$26.99",
    image: "/digestive-tea-package-with-ginger-and-mint.png",
  },
  {
    name: "Immune Boost Tea",
    benefits: ["immunity", "energy"],
    description: "Elderberry, echinacea, and ginger for natural defense",
    price: "$29.99",
    image: "/immune-boost-tea-package-with-elderberry.png",
  },
  {
    name: "Deep Sleep Blend",
    benefits: ["sleep", "relaxation"],
    description: "Valerian root, passionflower, and chamomile for restful nights",
    price: "$27.99",
    image: "/sleep-tea-package-with-valerian-and-passionflower.png",
  },
]

export function TeaSelectionGuide() {
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([])

  const toggleBenefit = (benefitId: string) => {
    setSelectedBenefits((prev) =>
      prev.includes(benefitId) ? prev.filter((id) => id !== benefitId) : [...prev, benefitId],
    )
  }

  const filteredTeas =
    selectedBenefits.length === 0
      ? teas
      : teas.filter((tea) => selectedBenefits.some((benefit) => tea.benefits.includes(benefit)))

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6 text-balance">
            Find Your Perfect Tea
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            Discover teas tailored to your wellness goals. Select the benefits you're seeking and we'll guide you to
            your ideal blend.
          </p>
        </div>

        {/* Benefit filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {benefits.map((benefit) => (
            <Button
              key={benefit.id}
              variant={selectedBenefits.includes(benefit.id) ? "default" : "outline"}
              onClick={() => toggleBenefit(benefit.id)}
              className={`
                transition-all duration-300 hover:scale-105 hover:shadow-lg
                ${
                  selectedBenefits.includes(benefit.id)
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-card hover:bg-primary/10 border-primary/20"
                }
              `}
            >
              <span className="mr-2">{benefit.icon}</span>
              {benefit.label}
            </Button>
          ))}
        </div>

        {/* Tea results */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTeas.map((tea, index) => (
            <Card
              key={tea.name}
              className="bg-card/80 backdrop-blur-sm border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 group overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-0 relative">
                <div className="aspect-square overflow-hidden relative">
                  <img
                    src={tea.image || "/placeholder.svg"}
                    alt={tea.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Hover overlay with benefits */}
                  <div className="absolute inset-0 bg-primary/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="text-center text-primary-foreground p-4">
                      <h4 className="font-serif text-lg mb-2">Perfect for:</h4>
                      <div className="flex flex-wrap justify-center gap-2">
                        {tea.benefits.map((benefitId) => {
                          const benefit = benefits.find((b) => b.id === benefitId)
                          return (
                            <span key={benefitId} className="text-sm bg-white/20 px-2 py-1 rounded-full">
                              {benefit?.icon} {benefit?.label}
                            </span>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif font-medium text-foreground mb-3 text-balance">{tea.name}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed text-sm">{tea.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-serif font-medium text-primary">{tea.price}</span>
                    <Button
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground transform hover:scale-105 transition-transform duration-200"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredTeas.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">
              No teas match your selected benefits. Try different combinations!
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
