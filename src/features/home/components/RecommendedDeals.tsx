import { DealCard } from '@/components/common/cards/DealCard'
import { PromoCard } from './PromoCard'
import { type BackendProduct, mapProductToDealCard } from '@/lib/mapping'


interface RecommendedDealsProps {
  products: BackendProduct[]
}

export function RecommendedDeals({ products }: RecommendedDealsProps) {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 relative mt-16 mb-16">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-1">
          <h2 className="text-[24px] md:text-[32px] font-black text-[#291F1F] tracking-tight uppercase">
            Recommended Deals
          </h2>
          <div className="h-1 w-20 bg-[#505081] rounded-full" />
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-[#F5F5F5] border border-[#EDEDFD] rounded-[22px] p-3 md:p-10 relative shadow-sm overflow-hidden">
        {/* Responsive Layout: Scroll on mobile, Grid on desktop */}
        <div className="flex lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 overflow-x-auto no-scrollbar pb-2 lg:pb-0">
          {/* Static Promo Card */}
          <div className="min-w-[280px] w-[280px] lg:w-full h-auto min-h-[320px] shrink-0">
            <PromoCard />
          </div>

          {/* Render real data from backend mapped to DealCard props */}
          {products.slice(0, 6).map((product) => (
            <div key={product.id} className="min-w-[260px] w-[260px] lg:w-full shrink-0">
              <DealCard {...mapProductToDealCard(product)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
