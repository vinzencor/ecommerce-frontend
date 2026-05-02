import { useState, useEffect } from 'react'
import { Truck, RotateCcw, Headphones, CreditCard } from 'lucide-react'

import { cn } from '@/lib/utils'

const features = [
  {
    icon: Truck,
    title: 'Free shipping',
    subtitle: 'On orders over ₹50',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    subtitle: 'Free within 7 days',
  },
  {
    icon: Headphones,
    title: 'Support 24/7',
    subtitle: 'Help when you need it',
  },
  {
    icon: CreditCard,
    title: 'Secured Payment',
    subtitle: '100% safe',
  },
]

export function FeaturesBanner() {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 relative mt-10 mb-16 overflow-hidden">
      {/* Desktop Version (Static Row) - Visible only on LG and up */}
      <div className="hidden lg:flex bg-[#F5F5F5] border border-[#EDEDFD] rounded-[22px] py-10 px-12 justify-between items-center gap-8 shadow-sm">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <div key={feature.title} className="flex items-center gap-5 w-max group">
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white border border-[#EDEDFD] shrink-0 shadow-sm transition-transform group-hover:scale-110 group-hover:border-[#505081]">
                <Icon
                  strokeWidth={1.5}
                  className="size-6 text-[#291F1F] group-hover:text-[#505081] transition-colors"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[#291F1F] font-bold text-[16px] leading-tight">
                  {feature.title}
                </h3>
                <p className="text-[#666] text-[13px] font-medium mt-1">{feature.subtitle}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Mobile/Tablet Version (Carousel) - Visible only below LG */}
      <div className="lg:hidden block">
        <div className="bg-[#F5F5F5] border border-[#EDEDFD] rounded-[22px] py-10 px-6 shadow-sm overflow-hidden min-h-[160px] relative">
          <div
            className="flex transition-transform duration-700 ease-in-out"
            style={{ 
              transform: `translateX(-${activeIndex * 100}%)`,
              width: `${features.length * 100}%` 
            }}
          >
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <div 
                  key={feature.title} 
                  style={{ width: `${100 / features.length}%` }}
                  className="shrink-0 flex items-center justify-center px-4"
                >
                  <div className="flex flex-col items-center text-center gap-5">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white border border-[#EDEDFD] shrink-0 shadow-md">
                      <Icon strokeWidth={1.5} className="size-8 text-[#505081]" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-[#291F1F] font-black text-[22px] leading-tight">
                        {feature.title}
                      </h3>
                      <p className="text-[#666] text-[15px] font-medium mt-1.5">
                        {feature.subtitle}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Progress Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {features.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300',
                  activeIndex === i ? 'w-8 bg-[#505081]' : 'w-2 bg-[#EDEDFD]'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}



