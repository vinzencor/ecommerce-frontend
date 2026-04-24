import image from '../../../../assets/images/product5.png'

interface ProductListHeroProps {
  title?: string
}

export function ProductListHero({ title }: ProductListHeroProps) {
  return (
    <div className="w-full max-w-360 mx-auto px-4 md:px-8 lg:px-16 mt-4 mb-4">
      {/* Banner Container */}
      <div className="w-full bg-[#242A41] rounded-lg relative overflow-hidden flex items-center min-h-40 md:min-h-55">
        {/* Background Decorative Graphic (Right Side) */}
        <div className="absolute right-0 top-0 h-full w-[50%] md:w-[40%] overflow-hidden pointer-events-none">
          <div className="absolute right-[-10%] top-[-20%] w-[120%] h-[140%] border-t border-l border-white/5 rounded-full" />
          <div className="absolute right-[-20%] top-[-10%] w-[120%] h-[120%] bg-white/2 rounded-full" />
        </div>

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-row items-center justify-between w-full h-full px-6 md:px-16 py-8">
          {/* Text Content (Left) */}
          <div className="flex flex-col text-white">
            <p className="text-[13px] md:text-[15px] font-medium tracking-wide mb-1 text-white/90">
              Discover our premium selection
            </p>
            <h2 className="text-2xl md:text-[42px] font-bold tracking-tight uppercase leading-none mb-2">
              {title || 'OUR COLLECTION'}
            </h2>
            <p className="text-[13px] md:text-[15px] font-medium tracking-wide">
              Quality products at best prices
            </p>
          </div>

          {/* Image Content (Right) */}
          <div className="relative z-20 h-full flex items-center justify-end pr-4 md:pr-10 w-1/3">
            <img
              src={image}
              alt="Products Deal"
              className="object-contain h-30 md:h-45 drop-shadow-2xl mix-blend-screen scale-110"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
