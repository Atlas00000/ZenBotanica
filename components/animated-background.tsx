"use client"

import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating leaves */}
      <div className="absolute top-20 left-10 w-4 h-4 opacity-20">
        <div className="w-full h-full bg-primary rounded-full animate-float-slow" style={{ animationDelay: "0s" }} />
      </div>
      <div className="absolute top-40 right-20 w-3 h-3 opacity-15">
        <div className="w-full h-full bg-secondary rounded-full animate-float-slow" style={{ animationDelay: "2s" }} />
      </div>
      <div className="absolute top-60 left-1/4 w-5 h-5 opacity-10">
        <div className="w-full h-full bg-primary rounded-full animate-float-slow" style={{ animationDelay: "4s" }} />
      </div>
      <div className="absolute bottom-40 right-1/3 w-4 h-4 opacity-20">
        <div className="w-full h-full bg-secondary rounded-full animate-float-slow" style={{ animationDelay: "1s" }} />
      </div>
      <div className="absolute bottom-60 left-1/2 w-3 h-3 opacity-15">
        <div className="w-full h-full bg-primary rounded-full animate-float-slow" style={{ animationDelay: "3s" }} />
      </div>

      {/* Gentle flowing lines */}
      <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent animate-flow" />
      <div
        className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-secondary/10 to-transparent animate-flow"
        style={{ animationDelay: "2s" }}
      />
    </div>
  )
}
