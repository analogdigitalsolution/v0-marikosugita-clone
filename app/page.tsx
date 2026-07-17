"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

const canScrollWithin = (target: EventTarget | null, deltaY: number) => {
  let element = target as HTMLElement | null

  while (element && element !== document.body) {
    const style = window.getComputedStyle(element)
    const scrollableY = /(auto|scroll)/.test(style.overflowY) && element.scrollHeight > element.clientHeight

    if (scrollableY) {
      const canScrollDown = deltaY > 0 && element.scrollTop + element.clientHeight < element.scrollHeight - 1
      const canScrollUp = deltaY < 0 && element.scrollTop > 1

      if (canScrollDown || canScrollUp) return true
    }

    element = element.parentElement
  }

  return false
}

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const sectionsRef = useRef<HTMLDivElement>(null)
  const totalSections = 3
  const touchStartY = useRef<number | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      if (canScrollWithin(e.target, e.deltaY)) return

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
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY.current) return

      const touchY = e.touches[0].clientY
      const diff = touchStartY.current - touchY

      if (canScrollWithin(e.target, diff)) return

      if (currentSection === totalSections - 1 && diff > 0) {
        return
      }

      if (currentSection === 0 && diff < 0) {
        return
      }

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
    }, 1000)
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
        {/* Section 1: Intro */}
        <section className="hero-section h-screen w-screen flex items-center justify-center p-4">
          <div className="hero-container container mx-auto flex flex-col md:flex-row items-center justify-center gap-6 md:gap-0">
            <div className="hero-copy md:w-1/2 flex flex-col items-start">
              <h1 className="hero-title text-5xl md:text-6xl lg:text-7xl font-light mb-4 text-left">Paritosh Goel</h1>
              <h3 className="hero-subtitle text-lg md:text-xl font-light text-gray-600">
                Urbanist, Public Policy Professional, Architect & Entrepreneur
              </h3>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="hero-portrait relative w-80 h-80 md:w-96 md:h-96 lg:w-[30rem] lg:h-[30rem] overflow-hidden rounded-lg shadow-lg">
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

        {/* Section 2: Biography */}
        <section className="biography-section h-screen w-screen flex flex-col items-center justify-center overflow-y-auto py-5">
          <div className="biography-content max-w-4xl mx-auto">
            <h2 className="biography-heading text-2xl md:text-3xl font-light">Biography</h2>
            <div className="biography-copy text-[15px] sm:text-[15.5px] md:text-base font-light text-gray-700">
              <p>
                Paritosh Goel is an architect, urban planner, entrepreneur, and public policy professional working at
                the intersection of cities, governance, innovation, and sustainable development. He founded Urbandose
                to empower emerging ideas, initiatives, and communities through ecosystem building, entrepreneurship,
                technology, innovation, venture capital, and urban transformation.
              </p>
              <p>
                Alongside Urbandose, Paritosh works with NITI Aayog, the apex public policy think tank of the
                Government of India, where he contributes strategy, technical, and research inputs to national and
                state long-term visioning and multi-sectoral development roadmaps for Viksit Bharat 2047. His work
                focuses on strategic planning, urban transformation, state visioning, institutional capacity building,
                and governance reforms.
              </p>
              <p>
                Over the years, he has worked across urban development, smart cities, and innovation ecosystems. He has
                led government-supported incubation centres, mentored startups and social enterprises, and supported
                public institutions on projects spanning urban planning, infrastructure, heritage, solid waste
                management, entrepreneurship, and local governance.
              </p>
              <p>
                Paritosh's work brings together evidence, innovation, collaboration, and empathy to help build stronger
                institutions and cities that are inclusive, sustainable, and ready for the future.
              </p>
              <p>
                His research and creative practice explore the relationship between urbanism, culture, and society,
                including international workshops and residencies such as Urban Ephemera, Taipei Ephemera, and
                Asterisk in Residence Kyoto.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Website Under Development */}
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
