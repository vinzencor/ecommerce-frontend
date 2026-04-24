import SellerCard from '@/components/common/cards/SellerCard'
import { Button } from '@/components/ui/button'
import { mapDealToSellerCard } from '@/lib/mapping'
import type { DealOfTheDay } from '../api/home'

interface DealsOfTheDayProps {
  products: DealOfTheDay[]
}

export function DealsOfTheDay({ products }: DealsOfTheDayProps) {
  return (
    <div className="w-full max-w-360 mx-auto px-4 md:px-8 lg:px-16 relative mt-10 mb-10">
      <div className="mb-8">
        <h2 className="text-[24px] md:text-[28px] font-bold text-black uppercase">
          DEALS OF THE DAY
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {products.map((deal) => (
          <SellerCard
            key={deal.id}
            {...mapDealToSellerCard(deal)}
            className="w-full max-w-none h-auto"
          />
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Button
          variant="outline-black"
          className="px-10 py-6 font-bold tracking-wider text-[13px] border-neutral-300 hover:border-black rounded-sm"
        >
          VIEW ALL
        </Button>
      </div>
    </div>
  )
}
