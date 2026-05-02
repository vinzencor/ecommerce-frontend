import realme from '../../../assets/images/realme.png'
import xiaomi from '../../../assets/images/xiaomi.png'
import realmeLogo from '../../../assets/images/realme_logo.png'
import xiaomiLogo from '../../../assets/images/xiaomi_logo.png'

export function BrandOffers() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 relative mt-16 mb-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Realme Banner */}
        <div className="relative bg-[#FFF4C7] rounded-[22px] border border-[#F2DC7C]/30 overflow-hidden flex items-center justify-between p-8 sm:p-12 min-h-[280px] md:min-h-[320px] group cursor-pointer shadow-sm hover:shadow-md transition-all">
          {/* Background Decorative Circles */}
          <div className="absolute right-0 top-0 w-64 h-64 bg-[#F2DC7C]/40 rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
          <div className="absolute right-0 bottom-0 w-48 h-48 border border-[#F2DC7C] rounded-full translate-x-1/4 translate-y-1/4 pointer-events-none" />

          {/* Left Content */}
          <div className="relative z-10 flex flex-col items-start gap-4 h-full">
            <span className="text-[11px] font-black tracking-[0.2em] text-[#A2812A] bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full uppercase border border-[#A2812A]/10">
              Realme
            </span>

            <div className="mt-4 mb-4">
              <img
                src={realmeLogo}
                alt="Realme logo"
                className="h-8 w-auto object-contain"
              />
            </div>

            <p className="font-black text-[#1F1F1F] text-[20px] md:text-[24px] tracking-tight mt-auto">
              UP TO <span className="text-[#A2812A]">80% OFF</span>
            </p>
          </div>

          {/* Right Image */}
          <div className="relative z-10 h-full flex items-center justify-center w-1/2">
            <img
              src={realme}
              alt="Realme Phones"
              className="object-contain h-[180px] md:h-[220px] drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>

        {/* Xiaomi Banner */}
        <div className="relative bg-[#FFEBE0] rounded-[22px] border border-[#F2C0A2]/30 overflow-hidden flex items-center justify-between p-8 sm:p-12 min-h-[280px] md:min-h-[320px] group cursor-pointer shadow-sm hover:shadow-md transition-all">
          {/* Background Decorative Circles */}
          <div className="absolute right-0 top-1/2 w-72 h-72 border border-[#F2C0A2] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute right-0 top-1/2 w-56 h-56 border border-[#F2C0A2]/50 rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

          {/* Left Content */}
          <div className="relative z-10 flex flex-col items-start gap-4 h-full">
            <span className="text-[11px] font-black tracking-[0.2em] text-[#A6613B] bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-full uppercase border border-[#A6613B]/10">
              Xiaomi
            </span>

            <div className="mt-4 mb-4">
              <img
                src={xiaomiLogo}
                alt="Xiaomi logo"
                className="h-16 w-auto object-contain"
              />
            </div>

            <p className="font-black text-[#1F1F1F] text-[20px] md:text-[24px] tracking-tight mt-auto">
              UP TO <span className="text-[#A6613B]">80% OFF</span>
            </p>
          </div>

          {/* Right Image */}
          <div className="relative z-10 h-full flex items-center justify-center w-1/2">
            <img
              src={xiaomi}
              alt="Xiaomi Phones"
              className="object-contain h-[180px] md:h-[220px] drop-shadow-2xl transform group-hover:scale-110 transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

