import { Button } from '@/components/ui/button'
import image1 from '../../../assets/images/featured1.jpg'
import image2 from '../../../assets/images/featured2.jpg'
import image3 from '../../../assets/images/featured3.jpg'

export function FeaturedPromo() {
  return (
    <div className="w-full max-w-360 mx-auto px-4 md:px-8 lg:px-16 relative mt-10 mb-10">
      <div className="bg-[#F8F8F8] flex flex-col lg:flex-row w-full gap-8 lg:gap-0">
        {/* Left Side: Images Grid */}
        <div className="w-full lg:w-[55%] p-4 sm:p-6 pr-4 lg:pr-0">
          <div className="grid grid-cols-2 gap-3 sm:gap-4 h-full">
            {/* Main Portrait Image */}
            <div className="w-full h-full min-h-75">
              <img src={image1} alt="Jewellery Model" className="w-full h-full object-cover" />
            </div>
            {/* Stacked Images */}
            <div className="flex flex-col gap-3 sm:gap-4 h-full">
              <div className="h-1/2 w-full">
                <img src={image2} alt="Necklace Close up" className="w-full h-70 object-cover" />
              </div>
              <div className="h-1/2 w-full">
                <img src={image3} alt="Earrings Close up" className="w-full h-70 object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Text Content */}
        <div className="w-full lg:w-[45%] flex flex-col justify-center items-start p-6 sm:p-10 lg:p-16 xl:p-24">
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-black tracking-tight text-black leading-tight mb-6">
            50% OFF on Jewellery
          </h2>

          <p className="text-[#535665] text-sm sm:text-base leading-relaxed mb-10">
            We partner with high quality jewellers who only recycled gold, AAA-gemstones, and
            ethically sourced diamonds. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            eiusmod tempor incididunt ut labore et dolore magna.
          </p>

          <Button
            variant="outline-black"
            className="px-8 py-5 text-[13px] font-bold tracking-wider uppercase border-neutral-300 hover:border-black rounded-sm"
          >
            View Collections
          </Button>
        </div>
      </div>
    </div>
  )
}
