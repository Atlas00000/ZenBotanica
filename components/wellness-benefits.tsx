"use client"

import { Card, CardContent } from "@/components/ui/card"
import { useState } from "react"

const benefits = [
  {
    icon: "🧘",
    title: "Stress Relief",
    description: "Natural adaptogens help your body manage stress and promote inner calm",
    details:
      "Our stress-relief blends contain ashwagandha, holy basil, and chamomile - powerful adaptogens that help regulate cortisol levels and promote a sense of tranquility.",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: "💤",
    title: "Better Sleep",
    description: "Gentle herbs like chamomile and lavender support restful, rejuvenating sleep",
    details:
      "Evening blends with valerian root, passionflower, and lemon balm work synergistically to calm the nervous system and prepare your body for deep, restorative sleep.",
    color: "from-secondary/20 to-secondary/5",
  },
  {
    icon: "🌿",
    title: "Digestive Health",
    description: "Soothing botanicals aid digestion and promote gut wellness naturally",
    details:
      "Digestive teas featuring ginger, fennel, and peppermint help reduce bloating, ease discomfort, and support healthy gut function after meals.",
    color: "from-primary/15 to-muted/10",
  },
  {
    icon: "✨",
    title: "Mental Clarity",
    description: "Cognitive-supporting herbs enhance focus and mental sharpness",
    details:
      "Clarity blends with ginkgo biloba, green tea, and rosemary support cognitive function, improve concentration, and enhance mental alertness naturally.",
    color: "from-secondary/15 to-primary/10",
  },
  {
    icon: "💚",
    title: "Immune Support",
    description: "Antioxidant-rich teas strengthen your body's natural defenses",
    details:
      "Immune-boosting teas with elderberry, echinacea, and vitamin C-rich herbs help fortify your body's natural defense systems year-round.",
    color: "from-primary/20 to-secondary/10",
  },
  {
    icon: "🌸",
    title: "Emotional Balance",
    description: "Mood-supporting botanicals help maintain emotional equilibrium",
    details:
      "Mood-balancing blends with rose petals, lavender, and lemon verbena help stabilize emotions and promote a positive, centered mindset.",
    color: "from-secondary/20 to-primary/5",
  },
]

export function WellnessBenefits() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  return (
    <section id="wellness" className="py-20 bg-muted/30 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6 text-balance">
            Wellness Through Nature
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            Each blend is thoughtfully crafted to support your journey toward holistic wellness, combining ancient
            wisdom with modern understanding of botanical benefits
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="bg-card/80 backdrop-blur-sm border-border hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden relative"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${benefit.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />

              <CardContent className="p-8 text-center relative z-10">
                <div className="text-4xl mb-4 transform group-hover:scale-110 transition-transform duration-300 group-hover:animate-bounce">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-serif font-medium text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4 transition-all duration-300">
                  {benefit.description}
                </p>

                <div
                  className={`overflow-hidden transition-all duration-500 ${
                    hoveredCard === index ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="pt-4 border-t border-border/50">
                    <p className="text-sm text-muted-foreground leading-relaxed">{benefit.details}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
