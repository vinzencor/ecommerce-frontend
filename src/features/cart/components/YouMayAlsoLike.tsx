import SellerCard from '@/components/common/cards/SellerCard'
import { useProducts } from '@/features/products/hooks/useProducts'
import { mapProductToSellerCard } from '@/lib/mapping'

export function YouMayAlsoLike() {
  const { data, isLoading } = useProducts({ limit: 5 })

  const recommendations = data?.products || []

  if (isLoading) {
    return (
      <div className="mt-20 md:mt-24">
        <div className="h-8 w-64 bg-neutral-100 animate-pulse rounded mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="aspect-square bg-neutral-100 animate-pulse rounded" />
          ))}
        </div>
      </div>
    )
  }

  if (recommendations.length === 0) return null

  return (
    <div className="mt-20 md:mt-24">
      <h2 className="text-[22px] md:text-[26px] font-bold text-black mb-8 uppercase tracking-tight">
        You May Also Like
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {recommendations.map((product) => (
          <SellerCard key={product.id} {...mapProductToSellerCard(product)} />
        ))}
      </div>
    </div>
  )
}
