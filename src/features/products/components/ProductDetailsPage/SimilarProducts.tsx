import ProductCard from '@/components/common/cards/ProductCard'
import { useProducts } from '../../hooks/useProducts'
import { mapProductToCardProps } from '@/lib/mapping'

interface SimilarProductsProps {
  categoryId?: string
}

export function SimilarProducts({ categoryId }: SimilarProductsProps) {
  const { data, isLoading } = useProducts({
    categoryId,
    limit: 5,
  })

  if (isLoading) {
    return (
      <div className="w-full mt-16 pt-8 pb-12">
        <div className="h-8 w-64 bg-neutral-100 animate-pulse rounded mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="aspect-[3/4] bg-neutral-100 animate-pulse rounded" />
          ))}
        </div>
      </div>
    )
  }

  const products = data?.products || []

  if (products.length === 0) return null

  return (
    <div className="w-full mt-16 pt-8 pb-12">
      <h2 className="text-[22px] md:text-[26px] font-bold text-neutral-800 mb-8 uppercase">
        View Similar Products
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            {...mapProductToCardProps(product)}
            className="w-full h-auto"
          />
        ))}
      </div>
    </div>
  )
}
