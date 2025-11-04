"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const sectionsRef = useRef<HTMLDivElement>(null)
  const totalSections = 3 // Updated for Paritosh's content
  const touchStartY = useRef<number | null>(null)

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault()
      if (isTransitioning) return

      if (e.deltaY > 0 && currentSection < totalSections - 1) {
        navigateToSection(currentSection + 1)
      } else if (e.deltaY < 0 && currentSection > 0) {
        navigateToSection(currentSection - 1)
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return

      if (e.key === "ArrowDown" && currentSection < totalSections - 1) {
        e.preventDefault()
        navigateToSection(currentSection + 1)
      } else if (e.key === "ArrowUp" && currentSection > 0) {
        e.preventDefault()
        navigateToSection(currentSection - 1)
      }
    }

    window.addEventListener("wheel", handleScroll, { passive: false })
    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("wheel", handleScroll)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [currentSection, isTransitioning])

  useEffect(() => {
    // Fix for mobile scrolling when at the bottom
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY.current) return

      const touchY = e.touches[0].clientY
      const diff = touchStartY.current - touchY

      // If at the last section and trying to scroll down, allow normal browser scrolling
      if (currentSection === totalSections - 1 && diff > 0) {
        return
      }

      // If at the first section and trying to scroll up, allow normal browser scrolling
      if (currentSection === 0 && diff < 0) {
        return
      }

      // Otherwise prevent default to use our custom scrolling
      e.preventDefault()

      if (isTransitioning) return

      if (diff > 5 && currentSection < totalSections - 1) {
        navigateToSection(currentSection + 1)
      } else if (diff < -5 && currentSection > 0) {
        navigateToSection(currentSection - 1)
      }

      touchStartY.current = null
    }

    window.addEventListener("touchstart", handleTouchStart)
    window.addEventListener("touchmove", handleTouchMove, { passive: false })

    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [currentSection, isTransitioning, totalSections])

  const navigateToSection = (index: number) => {
    setIsTransitioning(true)
    setCurrentSection(index)

    setTimeout(() => {
      setIsTransitioning(false)
    }, 1000) // Match this with the CSS transition duration
  }

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center bg-white">
        <div className="w-6 h-6 rounded-full border-2 border-gray-300 border-t-gray-600 animate-spin"></div>
      </div>
    )
  }

  return (
    <main className="h-screen w-screen overflow-hidden bg-white text-gray-800">
      <div
        ref={sectionsRef}
        className="h-full transition-transform duration-1000 ease-in-out"
        style={{ transform: `translateY(-${currentSection * 100}vh)` }}
      >
        {/* Section 1: Intro - Updated with image and left-aligned text */}
        <section className="h-screen w-screen flex items-center justify-center p-4">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
            <div className="md:w-1/2 flex flex-col items-start">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light mb-4 text-left">Paritosh Goel</h1>
              <h3>Urbanist, Strategist, Artist & Entrepreneur</h3>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[30rem] lg:h-[30rem] overflow-hidden rounded-lg shadow-lg">
                <Image
                  src="/images/design-mode/paritosh.webp"
                  alt="Paritosh Goel"
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                  className="grayscale hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Short Biography */}
        <section className="h-screen w-screen flex flex-col items-center justify-center p-8">
          <div className="max-w-[105%] md:max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-light mb-6">Short Biography</h2>
            <div className="text-base md:text-lg font-light space-y-4">
              <p>
                Paritosh Goel is an urbanist, strategist, architect, and entrepreneur based in India. He currently serves as a Strategy Consultant at NITI Aayog, the apex public policy think tank of the Government of India. Alongside his policy work, Paritosh manages three in-house ventures and has previously led multiple strategic projects, including two government-backed incubator and accelerator programs.
                Driven by a deep passion for urban planning, sustainable development, and innovation, Paritosh has cultivated a diverse global perspective. His experience spans organizing cognitive and experiential map-making workshops in Kyoto, Taiwan, Cairo, and New York, observing the urban transformation for the Paris 2024 Olympics, and participating in the URIT 2024 Conference in Copenhagen.
              </p>
              <p>
                Recently, Paritosh completed an * in-Residence program in Kyoto, supported by the City Government of Kyoto — an experience that further enriched his cross-cultural and interdisciplinary understanding of cities.
              </p>
              <p>
                An avid traveler, Paritosh has explored over 35 countries, continuously drawing inspiration from diverse urban landscapes and communities around the world. His work reflects a commitment to shaping inclusive, resilient, and future-ready cities, while his entrepreneurial pursuits highlight his dedication to empowering emerging innovators and changemakers.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Contact */}
        <section className="h-screen w-screen flex flex-col items-center justify-center p-8">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-light mb-6">Website Under Development</h2>
          </div>
        </section>
      </div>

      {/* Navigation instructions */}
      <div
        className={cn(
          "fixed bottom-10 left-0 right-0 text-center text-sm text-gray-500 transition-opacity duration-500 md:bg-transparent bg-white/70 backdrop-blur-sm py-2",
          currentSection === totalSections - 1 ? "opacity-0" : "opacity-100",
          // Hide on very small screens when in middle sections
          currentSection > 0 && currentSection < totalSections - 1 ? "sm:opacity-100 opacity-0" : "",
        )}
      >
        <p>Scroll, click, or use the arrow keys to navigate.</p>
        <button
          onClick={() => currentSection < totalSections - 1 && navigateToSection(currentSection + 1)}
          className="mt-2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors"
          aria-label="Scroll down"
        >
          <ChevronDown className="h-5 w-5 text-gray-600" />
        </button>
      </div>
    </main>
  )
}
