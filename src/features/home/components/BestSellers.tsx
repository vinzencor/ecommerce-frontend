import SellerCard from '@/components/common/cards/SellerCard'
import { Button } from '@/components/ui/button'
import { type BackendProduct, mapProductToSellerCard } from '@/lib/mapping'

interface BestSellersProps {
  products: BackendProduct[]
}

export function BestSellers({ products }: BestSellersProps) {
  return (
    <div className="w-full max-w-360 mx-auto px-4 md:px-8 lg:px-16 relative mt-16 mb-20">
      <div className="mb-8">
        <h2 className="text-[24px] md:text-[28px] font-bold text-black uppercase">
          BEST SELLERS PRODUCTS
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 gap-y-10">
        {products.map((product) => (
          <SellerCard
            key={product.id}
            {...mapProductToSellerCard(product)}
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
