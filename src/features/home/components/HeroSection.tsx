import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface Banner {
  id: string
  imageUrl: string
  title?: string
  description?: string
  link?: string
}

interface HeroSectionProps {
  banners: Banner[]
}

export default function HeroSection({ banners }: HeroSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const displayBanners = banners.length > 0 ? banners : [
    {
      id: 'default-1',
      imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'EXCLUSIVE OFFER IS LIVE NOW',
      description: 'Premium Collection 2026',
    },
    {
      id: 'default-2',
      imageUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'SUMMER VIBES',
      description: 'Discover the New Arrival',
    },
    {
      id: 'default-3',
      imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80',
      title: 'LUXURY DEFINED',
      description: 'The Ultimate Fashion Statement',
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % displayBanners.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [displayBanners.length])


  return (
    <div className="w-full relative overflow-hidden py-4 lg:py-8">
      {/* Dynamic CSS Variables for accurate translation */}
      <style>{`
        :root {
          --hero-gap: 12px;
          --hero-width: 100%;
        }
        @media (min-width: 1024px) {
          :root {
            --hero-gap: 24px;
            --hero-width: 80%;
          }
        }
      `}</style>

      <div className="w-full mx-auto px-4 lg:px-0">
        <div 
          className="flex transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
          style={{ 
            transform: `translateX(calc(-${currentIndex} * (var(--hero-width) + var(--hero-gap))))`,
            paddingLeft: 'max(1rem, calc((100% - var(--hero-width)) / 2))'
          }}
        >
          {displayBanners.map((banner, index) => (
            <div 
              key={banner.id}
              className={cn(
                "relative shrink-0 transition-all duration-1000 overflow-hidden rounded-[22px] md:rounded-[32px] shadow-xl",
                "w-[var(--hero-width)] h-[300px] md:h-[400px] lg:h-[450px]",
                currentIndex === index ? "opacity-100 scale-100" : "opacity-30 scale-[0.95]"
              )}
              style={{ marginRight: 'var(--hero-gap)' }}
            >
              <section
                className="relative h-full flex items-center bg-cover bg-center bg-no-repeat group/banner"
                style={{
                  backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%), url("${banner.imageUrl}")`,
                }}
              >
                <div className="px-8 md:px-16 w-full relative z-10 space-y-4 md:space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
                    <div className="size-2 bg-[#505081] rounded-full" />
                    <span className="text-white text-[10px] md:text-[11px] font-black tracking-[0.3em] uppercase">
                      {banner.title || 'Limited Edition'}
                    </span>
                  </div>
                  
                  <h1 className="text-[28px] md:text-[48px] lg:text-[56px] font-black text-white leading-[1.1] max-w-2xl tracking-tighter drop-shadow-xl">
                    {banner.description || 'Modern Style Refined'}
                  </h1>

                  <div className="pt-4">
                    <Button
                      variant="white"
                      size="lg"
                      className="h-12 px-8 rounded-full font-black text-[13px] shadow-xl hover:bg-[#505081] hover:text-white transition-all transform hover:scale-105 active:scale-95 uppercase tracking-widest border-none"
                      onClick={() => banner.link && (window.location.href = banner.link)}
                    >
                      EXPLORE NOW
                    </Button>
                  </div>
                </div>
              </section>
            </div>
          ))}
        </div>

        {/* Floating Controls */}
        <div className="absolute bottom-6 right-8 lg:right-16 z-40 flex items-center gap-4">
          <div className="flex gap-2">
            {displayBanners.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  currentIndex === i ? "w-10 bg-[#505081]" : "w-3 bg-white/30 hover:bg-white/50"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}





