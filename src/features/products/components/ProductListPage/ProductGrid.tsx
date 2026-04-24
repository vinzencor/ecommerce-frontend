import ProductCard from '@/components/common/cards/ProductCard'
import { mapProductToCardProps, type BackendProduct } from '@/lib/mapping'
import { PackageX } from 'lucide-react'

interface ProductGridProps {
  products: BackendProduct[]
  total: number
  isLoading?: boolean
}

export function ProductGrid({ products, total, isLoading }: ProductGridProps) {
  if (isLoading) {
    return (
      <div className="flex-1 w-full">
        <div className="mb-6 h-5 w-40 bg-neutral-100 animate-pulse rounded" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
          {Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-3">
              <div className="aspect-[3/4] w-full bg-neutral-100 animate-pulse rounded-md" />
              <div className="h-4 w-2/3 bg-neutral-100 animate-pulse rounded" />
              <div className="h-4 w-1/3 bg-neutral-100 animate-pulse rounded" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-20 bg-neutral-50/50 rounded-lg border border-dashed border-neutral-200">
        <PackageX className="size-16 text-neutral-300 mb-4 stroke-[1px]" />
        <h3 className="text-[18px] font-bold text-black mb-1">No products found</h3>
        <p className="text-[14px] text-neutral-500 max-w-xs text-center">
          We couldn't find any products matching your current filters. Try adjusting your selection
          or search.
        </p>
      </div>
    )
  }

  return (
    <div className="flex-1 w-full">
      {/* Meta Header */}
      <div className="mb-8 flex items-center justify-between">
        <span className="text-[14px] text-neutral-500">
          Showing <span className="text-black font-bold">{products.length}</span> of{' '}
          <span className="text-black font-bold">{total}</span> item(s)
        </span>
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-neutral-500">Sort:</span>
          <select className="text-[13px] font-bold bg-transparent outline-none cursor-pointer hover:text-[#D4A373] transition-colors">
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-12">
        {products.map((product) => (
          <ProductCard key={product.id} {...mapProductToCardProps(product)} />
        ))}
      </div>

      {/* Load More Placeholder */}
      <div className="mt-20 flex justify-center">
        {total > products.length && (
          <button className="px-10 py-3.5 border border-black text-[13px] font-bold hover:bg-black hover:text-white transition-all uppercase tracking-[0.2em]">
            Load More
          </button>
        )}
      </div>
    </div>
  )
}
