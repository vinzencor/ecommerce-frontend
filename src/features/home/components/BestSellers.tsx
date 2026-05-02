import SellerCard from '@/components/common/cards/SellerCard'
import { Button } from '@/components/ui/button'
import { type BackendProduct, mapProductToSellerCard } from '@/lib/mapping'

interface BestSellersProps {
  products: BackendProduct[]
}

import { Link } from 'react-router-dom'

export function BestSellers({ products }: BestSellersProps) {
  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 relative mt-20 mb-20">
      <div className="mb-10">
        <h2 className="text-[24px] md:text-[32px] font-black text-[#291F1F] uppercase tracking-tight">
          BEST SELLERS
        </h2>
        <div className="h-1.5 w-24 bg-[#505081] rounded-full mt-2" />
      </div>

      <div className="flex lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-x-auto no-scrollbar pb-4 lg:pb-0">
        {products.map((product) => (
          <div key={product.id} className="min-w-[260px] w-[260px] lg:w-full shrink-0">
            <SellerCard
              {...mapProductToSellerCard(product)}
              className="w-full"
            />
          </div>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <Button
          asChild
          variant="outline"
          className="px-12 h-14 font-bold tracking-[0.1em] text-[14px] border-[#EDEDFD] hover:border-[#505081] hover:text-[#505081] rounded-full bg-white shadow-md transition-all hover:scale-105"
        >
          <Link to="/products">VIEW ALL PRODUCTS</Link>
        </Button>
      </div>
    </div>
  )
}
