import { Button } from '@/components/ui/button'

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

function HeroSection({ banners }: HeroSectionProps) {
  const activeBanner = banners.length > 0 ? banners[0] : null

  return (
    <div className="w-full max-w-360 mx-auto px-4 md:px-8 lg:px-16 relative mt-6 mb-12">
      <section
        className="relative overflow-hidden flex items-center bg-cover bg-center bg-no-repeat min-h-87.5 lg:min-h-112.5"
        style={{
          backgroundImage: activeBanner
            ? `linear-gradient(to right, rgba(20, 20, 20, 0.8) 10%, rgba(20, 20, 20, 0.1)), url("${activeBanner.imageUrl}")`
            : 'linear-gradient(to right, rgba(20, 20, 20, 0.9) 10%, rgba(20, 20, 20, 0.2)), url("https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80")',
        }}
      >
        <div className="mx-auto px-8 sm:px-12 w-full relative z-10 flex flex-col justify-center h-full">
          {/* Text Content */}
          <div className="space-y-4 max-w-xl text-left">
            <p className="text-neutral-300 font-medium tracking-wide uppercase text-xs sm:text-sm">
              {activeBanner?.title || 'EXCLUSIVE OFFER IS LIVE NOW'}
            </p>

            <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-black text-white tracking-tight leading-tight">
              {activeBanner?.description || 'Premium Collection 2026'}
            </h1>

            <p className="text-neutral-300 text-sm sm:text-base lg:text-lg max-w-md leading-relaxed pb-2">
              Explore our latest arrivals with extraordinary deals and rewards.
            </p>

            <div className="pt-2 gap-4">
              <Button
                variant="white"
                size="lg"
                className="px-8 h-12 text-sm"
                onClick={() => activeBanner?.link && (window.location.href = activeBanner.link)}
              >
                SHOP NOW
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HeroSection
