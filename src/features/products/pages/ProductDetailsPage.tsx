import { ChevronRight } from 'lucide-react'
import { useParams as useRouteParams } from 'react-router-dom'
import { ProductGallery } from '../components/ProductDetailsPage/ProductGallery'
import { ProductInfo } from '../components/ProductDetailsPage/ProductInfo'
import { ProductTabs } from '../components/ProductDetailsPage/ProductTabs'
import { SimilarProducts } from '../components/ProductDetailsPage/SimilarProducts'
import { useProductDetails } from '../hooks/useProductDetails'

export default function ProductDetailsPage() {
  const { id } = useRouteParams<{ id: string }>()
  const { data: product, isLoading, error } = useProductDetails(id || '')

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen pb-20 pt-6">
        <div className="w-full max-w-360 mx-auto px-4 md:px-8 lg:px-16 animate-pulse">
          <div className="h-6 w-64 bg-neutral-100 mb-8 rounded" />
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            <div className="flex-1 aspect-square bg-neutral-100 rounded-lg" />
            <div className="flex-1 space-y-4">
              <div className="h-8 w-3/4 bg-neutral-100 rounded" />
              <div className="h-6 w-1/4 bg-neutral-100 rounded" />
              <div className="h-20 w-full bg-neutral-100 rounded" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="bg-white min-h-screen py-20 text-center">
        <h2 className="text-xl font-bold text-red-500">Error loading product</h2>
        <p className="text-neutral-500">
          The product you are looking for does not exist or could not be loaded.
        </p>
      </div>
    )
  }

  const breadcrumbs = [
    'Home',
    'Products',
    product.category?.name || 'Category',
    product.productName,
  ]

  return (
    <div className="bg-white min-h-screen pb-20 pt-6">
      <div className="w-full max-w-360 mx-auto px-4 md:px-8 lg:px-16">
        {/* Breadcrumb */}
        <div className="flex items-center text-[13px] text-neutral-500 mb-8 overflow-x-auto whitespace-nowrap pb-1 scrollbar-none">
          {breadcrumbs.map((crumb, index) => (
            <div key={`${crumb}-${index}`} className="flex items-center">
              <span
                className={
                  index === breadcrumbs.length - 1
                    ? 'text-black font-medium'
                    : 'hover:text-black cursor-pointer transition-colors'
                }
              >
                {crumb}
              </span>
              {index < breadcrumbs.length - 1 && (
                <div className="flex items-center">
                  <ChevronRight className="size-3 mx-1 opacity-50" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main Product Area */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
          <div className="flex-1 lg:w-1/2">
            <ProductGallery product={product} />
          </div>
          <div className="flex-1 lg:w-1/2">
            <ProductInfo product={product} />
          </div>
        </div>

        {/* Tabs Area */}
        <ProductTabs product={product} />

        {/* Similar Products - Could fetch based on category label */}
        <SimilarProducts categoryId={product.category?.id} />
      </div>
    </div>
  )
}
