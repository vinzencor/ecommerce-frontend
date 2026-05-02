import { ChevronRight } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import { ProductListHero } from '../components/ProductListPage/ProductListHero'
import { ProductFilters } from '../components/ProductListPage/ProductFilters'
import { ProductGrid } from '../components/ProductListPage/ProductGrid'
import { useProducts } from '../hooks/useProducts'
import { useCategories } from '../hooks/useFilterOptions'

export default function ProductListPage() {
  const [searchParams] = useSearchParams()
  const search = searchParams.get('q') || ''
  const categoryId = searchParams.get('category') || undefined
  const brandIds = searchParams.get('brands') || undefined
  const minDiscount = searchParams.get('minDiscount')
    ? Number(searchParams.get('minDiscount'))
    : undefined
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined

  const { data: categories } = useCategories()
  const currentCategory = categories?.find((c) => c.id === categoryId)

  const { data, isLoading } = useProducts({
    search,
    categoryId,
    brandIds,
    minDiscount,
    minPrice,
    maxPrice,
    limit: 12,
  })

  const heroTitle = search
    ? `Results for "${search}"`
    : currentCategory
      ? currentCategory.name
      : 'All Products'

  return (
    <div className="bg-white min-h-screen pb-20">
      <ProductListHero title={heroTitle} />

      <div className="w-full max-w-360 mx-auto px-4 md:px-8 lg:px-16 mt-6">
        {/* Breadcrumb */}
        <div className="flex items-center text-[13px] text-neutral-500 mb-8 font-medium">
          <div className="flex items-center hover:text-black cursor-pointer transition-colors">
            Home
          </div>
          <ChevronRight className="size-3.5 mx-2 opacity-50" />
          <div className="flex items-center hover:text-black cursor-pointer transition-colors">
            Products
          </div>
          {currentCategory && (
            <>
              <ChevronRight className="size-3.5 mx-2 opacity-50" />
              <div className="text-black font-semibold uppercase tracking-tight">
                {currentCategory.name}
              </div>
            </>
          )}
        </div>

        {/* Desktop: Two Columns | Mobile: Single Column Stack */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-stretch lg:items-start w-full">
          {/* Filters (Horizontal Bar on Mobile | Sidebar on Desktop) */}
          <div className="w-full lg:w-72 shrink-0">
            <ProductFilters />
          </div>

          {/* Product Grid and Meta */}
          <main className="flex-1 w-full min-w-0">
            <ProductGrid
              products={data?.products || []}
              total={data?.pagination.total || 0}
              isLoading={isLoading}
            />
          </main>
        </div>
      </div>
    </div>
  )
}
