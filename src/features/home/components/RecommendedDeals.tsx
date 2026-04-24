import { ArrowRight } from 'lucide-react'
import { DealCard } from '@/components/common/cards/DealCard'
import { PromoCard } from './PromoCard'
import { Button } from '@/components/ui/button'
import { type BackendProduct, mapProductToDealCard } from '@/lib/mapping'

interface RecommendedDealsProps {
  products: BackendProduct[]
}

export function RecommendedDeals({ products }: RecommendedDealsProps) {
  return (
    <div className="w-full max-w-360 mx-auto px-4 md:px-8 lg:px-16 relative mt-10 mb-10">
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className="text-[18px] md:text-[22px] tracking-tight font-black uppercase text-black">
          Recommended Deals For You
        </h2>
      </div>

      {/* Main Container */}
      <div className="bg-[#F8F8F8] rounded-xl sm:rounded-2xl p-3 sm:p-6 md:p-8 relative group">
        {/* Navigation Arrow */}
        <div className="absolute top-4 right-4 z-10 hidden sm:block">
          <Button
            variant="white"
            size="icon"
            className="rounded-full shadow-sm hover:shadow-md h-10 w-10 bg-white"
          >
            <ArrowRight strokeWidth={2} className="size-5" />
          </Button>
        </div>

        {/* Grid Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 pb-1 sm:pb-2 pt-2 sm:pt-6">
          {/* Static Promo Card */}
          <div className="w-full h-full">
            <PromoCard />
          </div>

          {/* Render real data from backend mapped to DealCard props */}
          {products.map((product) => (
            <DealCard key={product.id} {...mapProductToDealCard(product)} />
          ))}
        </div>
      </div>
    </div>
  )
}
