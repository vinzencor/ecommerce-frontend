import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import shoppingbag from '@/assets/images/shoppingbag.png'

interface Category {
  id: string
  name: string
  imageUrl: string
}

interface CategorySectionProps {
  categories: Category[]
}

export function CategorySection({ categories: backendCategories }: CategorySectionProps) {
  const [activeId, setActiveId] = useState('all-deals')
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  // Map backend categories to frontend format and add "All Deals" at the start
  const displayCategories = [
    {
      id: 'all-deals',
      name: 'All Deals',
      imageUrl: shoppingbag,
    },
    ...backendCategories.map((c) => ({
      id: c.id,
      name: c.name,
      imageUrl: c.imageUrl,
    })),
  ]

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 1024

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 10)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScroll)
      // Initial check
      checkScroll()
    }
    return () => scrollContainer?.removeEventListener('scroll', checkScroll)
  }, [displayCategories.length])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div
      className="w-full border-b border-neutral-100 bg-white relative group"
      style={{ marginTop: '8px' }}
    >
      {/* Left Arrow Button */}
      {!isMobile && showLeftArrow && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 lg:left-8 top-[45%] -translate-y-1/2 z-10 p-2 text-neutral-400 hover:text-black transition-all cursor-pointer outline-none focus:outline-none"
          aria-label="Scroll left"
        >
          <ChevronLeft className="size-8" strokeWidth={1.5} />
        </button>
      )}

      {/* Right Arrow Button */}
      {!isMobile && showRightArrow && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 lg:right-8 top-[45%] -translate-y-1/2 z-10 p-2 text-neutral-400 hover:text-black transition-all cursor-pointer outline-none focus:outline-none"
          aria-label="Scroll right"
        >
          <ChevronRight className="size-8" strokeWidth={1.5} />
        </button>
      )}

      <div className="w-full max-w-360 mx-auto px-4 md:px-8 lg:px-16">
        <div
          ref={scrollContainerRef}
          className="flex items-center justify-start pt-2 pb-10 overflow-x-auto no-scrollbar gap-4 md:gap-10 lg:gap-14 xl:gap-16"
        >
          {displayCategories.map((category) => {
            const isActive = activeId === category.id

            return (
              <button
                key={category.id}
                onClick={() => setActiveId(category.id)}
                className="group/item flex flex-col items-center gap-4 transition-all relative pb-2 min-w-fit"
              >
                {/* Circle Image Container */}
                <div
                  className={cn(
                    'w-17.5 h-17.5 rounded-full flex items-center justify-center border transition-all duration-300',
                    isActive
                      ? 'bg-[#D4A373] border-[#D2D2D2]'
                      : 'bg-[#F0EFEF] border-[#D2D2D2] hover:bg-neutral-200 shadow-sm'
                  )}
                >
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-[50%] h-[50%] object-contain drop-shadow-md"
                  />
                </div>

                {/* Label */}
                <span
                  className={cn(
                    'text-[14px] font-medium text-[#282C3F] transition-colors whitespace-nowrap',
                    isActive && 'font-bold text-black'
                  )}
                >
                  {category.name}
                </span>

                {isActive && (
                  <div
                    className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 h-0.75 bg-[#D4A373] rounded-t-lg"
                    style={{ width: '60px' }}
                  />
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
