import realme from '../../../assets/images/realme.png'
import xiaomi from '../../../assets/images/xiaomi.png'
import realmeLogo from '../../../assets/images/realme_logo.png'
import xiaomiLogo from '../../../assets/images/xiaomi_logo.png'

export function BrandOffers() {
  return (
    <div className="w-full max-w-360 mx-auto px-4 md:px-8 lg:px-16 relative mt-12 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Realme Banner */}
        <div className="relative bg-[#FFF4C7] rounded-xl overflow-hidden flex items-center justify-between p-8 sm:p-10 min-h-55 md:min-h-65 group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
          {/* Background Decorative Circles */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-[#F2DC7C]/40 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute right-0 bottom-0 w-48 h-48 border border-[#F2DC7C] rounded-full translate-x-1/4 translate-y-1/4 pointer-events-none" />

          {/* Left Content */}
          <div className="relative z-10 flex flex-col items-start gap-4 h-full pt-4">
            <span className="text-[10px] font-bold tracking-wider text-[#A2812A] bg-[#F2DF99] px-3 py-1 rounded-sm uppercase">
              Realme
            </span>

            {/* Realme Logo Space */}
            <div className="mt-2 mb-2  px-4 py-2 inline-flex">
              <img
                src={realmeLogo}
                alt="Realme logo"
                className="h-6 w-auto object-contain mix-blend-multiply"
              />
            </div>

            <p className="font-semibold text-[#1F1F1F] text-sm sm:text-base tracking-wide mt-auto">
              UP to 80% OFF
            </p>
          </div>

          {/* Right Image Placeholder */}
          <div className="relative z-10 h-full flex items-center justify-center translate-x-4 sm:translate-x-0 w-1/2">
            <img
              src={realme}
              alt="Realme Phones"
              className="object-contain h-45 md:h-55 drop-shadow-xl transform group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
            />
          </div>
        </div>

        {/* Xiaomi Banner */}
        <div className="relative bg-[#FFEBE0] rounded-xl overflow-hidden flex items-center justify-between p-8 sm:p-10 min-h-55 md:min-h-65 group cursor-pointer shadow-sm hover:shadow-md transition-shadow">
          {/* Background Decorative Circles */}
          <div className="absolute right-0 top-1/2 w-72 h-72 border border-[#F2C0A2] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute right-0 top-1/2 w-56 h-56 border border-[#F2C0A2]/50 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          {/* Left Content */}
          <div className="relative z-10 flex flex-col items-start gap-4 h-full pt-4">
            <span className="text-[10px] font-bold tracking-wider text-[#A6613B] bg-[#F2C8B1] px-3 py-1 rounded-sm uppercase">
              Xiaomi
            </span>

            {/* Xiaomi Logo Space */}
            <div className="mt-2 mb-2">
              <img
                src={xiaomiLogo}
                alt="Xiaomi logo"
                className="h-14 w-auto object-contain drop-shadow-[0_2px_4px_rgba(255,105,0,0.4)]"
              />
            </div>

            <p className="font-semibold text-[#1F1F1F] text-sm sm:text-base tracking-wide mt-auto">
              UP to 80% OFF
            </p>
          </div>

          {/* Right Image Placeholder */}
          <div className="relative z-10 h-full flex items-center justify-center translate-x-4 sm:translate-x-0 w-1/2">
            <img
              src={xiaomi}
              alt="Xiaomi Phones"
              className="object-contain h-45 md:h-55 drop-shadow-xl transform group-hover:scale-105 transition-transform duration-500 mix-blend-multiply"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
