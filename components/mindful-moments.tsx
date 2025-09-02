"use client"

import { useEffect, useState } from "react"
import { Leaf, Heart, Brain, Sparkles } from "lucide-react"

const mindfulMoments = [
  {
    icon: Leaf,
    title: "Morning Ritual",
    description:
      "Begin each day with intention. Let the warmth of your tea cup ground you in the present moment, setting a peaceful tone for the hours ahead.",
    tip: "Take three deep breaths before your first sip",
  },
  {
    icon: Heart,
    title: "Afternoon Pause",
    description:
      "When the day feels overwhelming, create a sacred pause. Allow the gentle steam to carry away your worries as you reconnect with your inner calm.",
    tip: "Close your eyes and focus on the tea's aroma",
  },
  {
    icon: Brain,
    title: "Evening Reflection",
    description:
      "As twilight approaches, use your tea time for gentle reflection. Honor the day's experiences and prepare your mind for restorative rest.",
    tip: "Journal three things you're grateful for",
  },
  {
    icon: Sparkles,
    title: "Weekend Ceremony",
    description:
      "Transform your weekend tea into a mindful ceremony. Create space for deeper connection with yourself and the healing power of nature's botanicals.",
    tip: "Prepare your tea with full attention and presence",
  },
]

export function MindfulMoments() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.getAttribute("data-index") || "0")
            setVisibleCards((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.2 },
    )

    const cards = document.querySelectorAll("[data-index]")
    cards.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6 text-balance">
            Cultivate Mindful
            <span className="block text-primary font-normal">Moments</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            Discover how to weave moments of tranquility throughout your day with intentional tea rituals that nourish
            both body and soul
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {mindfulMoments.map((moment, index) => {
            const Icon = moment.icon
            const isVisible = visibleCards.includes(index)

            return (
              <div
                key={index}
                data-index={index}
                className={`group p-8 bg-card/50 backdrop-blur-sm rounded-2xl border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>

                  <div className="flex-1">
                    <h3 className="text-xl font-serif font-light text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                      {moment.title}
                    </h3>

                    <p className="text-muted-foreground mb-4 leading-relaxed text-pretty">{moment.description}</p>

                    <div className="p-3 bg-secondary/10 rounded-lg border-l-4 border-secondary">
                      <p className="text-sm text-secondary-foreground font-medium">💡 {moment.tip}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
