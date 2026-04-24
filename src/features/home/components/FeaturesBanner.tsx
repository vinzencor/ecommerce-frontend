import { Truck, RotateCcw, Headphones, CreditCard } from 'lucide-react'

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
  return (
    <div className="w-full max-w-360 mx-auto px-4 md:px-8 lg:px-16 relative mt-6 mb-12">
      <div className="bg-[#EAEAEA] rounded-md py-6 px-4 sm:px-10 flex flex-row overflow-x-auto no-scrollbar justify-start md:justify-between items-center gap-12 md:gap-4">
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <div key={feature.title} className="flex items-center gap-4 w-max shrink-0">
              {/* Circular Icon Wrapper */}
              <div className="flex items-center justify-center w-13 h-13 rounded-full border border-black shrink-0">
                <Icon strokeWidth={1.5} className="size-6 text-black" />
              </div>

              {/* Text Stacking */}
              <div className="flex flex-col">
                <h3 className="text-black font-semibold text-[15px] leading-tight">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 text-[12px] mt-0.5">{feature.subtitle}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
