"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

const journeySteps = [
  {
    step: "01",
    title: "Discover Your Needs",
    description:
      "Begin by understanding your unique wellness goals and how different botanicals can support your journey to better health.",
    action: "Take Our Quiz",
  },
  {
    step: "02",
    title: "Explore Our Collection",
    description:
      "Browse our carefully curated selection of premium teas and herbs, each chosen for their therapeutic properties and exceptional quality.",
    action: "View Products",
  },
  {
    step: "03",
    title: "Create Your Ritual",
    description:
      "Develop a personalized tea practice that fits seamlessly into your daily routine, bringing moments of peace and mindfulness.",
    action: "Learn Techniques",
  },
  {
    step: "04",
    title: "Experience Transformation",
    description:
      "Feel the gentle, cumulative benefits as natural botanicals support your body's innate wisdom and healing capacity.",
    action: "Join Community",
  },
]

export function WellnessJourney() {
  const [activeStep, setActiveStep] = useState(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % journeySteps.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [mounted])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-secondary/5 via-background to-primary/5">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-light text-foreground mb-6 text-balance">
            Your Wellness
            <span className="block text-primary font-normal">Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed text-pretty">
            Every path to wellness is unique. Let us guide you through a transformative experience that honors your
            individual needs and aspirations.
          </p>
        </div>

        <div className="relative">
          {/* Progress line */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border transform -translate-y-1/2">
            <div
              className="h-full bg-primary transition-all duration-1000 ease-out"
              style={{ width: `${((activeStep + 1) / journeySteps.length) * 100}%` }}
            />
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {journeySteps.map((step, index) => (
              <div
                key={index}
                className={`relative text-center transition-all duration-500 ${
                  index <= activeStep ? "opacity-100 scale-100" : "opacity-60 scale-95"
                }`}
                onMouseEnter={() => setActiveStep(index)}
              >
                {/* Step number */}
                <div
                  className={`relative z-10 w-16 h-16 mx-auto mb-6 rounded-full border-2 flex items-center justify-center font-serif font-light text-lg transition-all duration-300 ${
                    index <= activeStep
                      ? "bg-primary border-primary text-primary-foreground shadow-lg"
                      : "bg-background border-border text-muted-foreground"
                  }`}
                >
                  {step.step}

                  {/* Pulse animation for active step */}
                  {index === activeStep && (
                    <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
                  )}
                </div>

                <div
                  className={`p-6 bg-card/30 backdrop-blur-sm rounded-xl border transition-all duration-300 hover:shadow-md hover:-translate-y-1 ${
                    index <= activeStep ? "border-primary/30" : "border-border"
                  }`}
                >
                  <h3 className="text-xl font-serif font-light text-foreground mb-3 text-balance">{step.title}</h3>

                  <p className="text-muted-foreground mb-4 text-sm leading-relaxed text-pretty">{step.description}</p>

                  <Button
                    variant={index <= activeStep ? "default" : "outline"}
                    size="sm"
                    className="transition-all duration-300 hover:scale-105"
                  >
                    {step.action}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
