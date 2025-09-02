"use client"

import type React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense, useState, useEffect } from "react"
import { LoadingProvider } from "@/contexts/loading-context"
import { LoadingScreen } from "@/components/loading-screen"

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
})

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  useEffect(() => {
    // Simulate initial app loading
    const timer = setTimeout(() => {
      setIsInitialLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <LoadingProvider>
      <LoadingScreen 
        isLoading={isInitialLoading} 
        onLoadingComplete={() => setIsInitialLoading(false)} 
      />
      <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      <Analytics />
    </LoadingProvider>
  )
}
