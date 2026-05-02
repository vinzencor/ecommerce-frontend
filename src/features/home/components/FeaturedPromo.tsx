import { Button } from '@/components/ui/button'
import image1 from '../../../assets/images/featured1.jpg'
import image2 from '../../../assets/images/featured2.jpg'
import image3 from '../../../assets/images/featured3.jpg'

export function FeaturedPromo() {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 relative mt-16 mb-16">
      <div className="bg-[#F5F5F5] border border-[#EDEDFD] rounded-[22px] flex flex-col lg:flex-row w-full gap-8 lg:gap-0 overflow-hidden shadow-sm">
        {/* Left Side: Images Grid */}
        <div className="w-full lg:w-[55%] p-4 md:p-8">
          <div className="grid grid-cols-2 gap-4 h-full">
            {/* Main Portrait Image */}
            <div className="w-full h-full min-h-[300px] rounded-[18px] overflow-hidden">
              <img src={image1} alt="Jewellery Model" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
            </div>
            {/* Stacked Images */}
            <div className="flex flex-col gap-4 h-full">
              <div className="h-1/2 w-full rounded-[18px] overflow-hidden">
                <img src={image2} alt="Necklace Close up" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
              </div>
              <div className="h-1/2 w-full rounded-[18px] overflow-hidden">
                <img src={image3} alt="Earrings Close up" className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center items-start p-8 md:p-12 lg:p-16">
          <div className="inline-block px-4 py-1.5 bg-[#505081]/10 text-[#505081] rounded-full text-[12px] font-black tracking-widest uppercase mb-6">
            Seasonal Offer
          </div>
          <h2 className="text-[32px] md:text-[42px] lg:text-[48px] font-black tracking-tight text-[#291F1F] leading-none mb-6">
            50% OFF on Jewellery
          </h2>

          <p className="text-[#666] text-[16px] leading-relaxed mb-10 font-medium">
            We partner with high-quality jewellers who only use recycled gold, AAA-gemstones, and
            ethically sourced diamonds. Elevate your elegance with our curated collection.
          </p>

          <Button
            variant="outline"
            className="px-10 h-14 text-[14px] font-bold tracking-widest uppercase border-[#EDEDFD] hover:border-[#505081] hover:text-[#505081] rounded-full transition-all hover:scale-105 shadow-sm bg-white"
          >
            EXPLORE COLLECTIONS
          </Button>
        </div>
      </div>
    </div>
  )
}

