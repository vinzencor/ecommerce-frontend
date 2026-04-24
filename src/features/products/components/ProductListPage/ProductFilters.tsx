import { Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useSearchParams } from 'react-router-dom'
import { useCategories, useFilterOptions } from '../../hooks/useFilterOptions'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import type { FilterOptionsResponse } from '../../api/products'

export function ProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: categories, isLoading: isCatsLoading } = useCategories()

  const currentCategoryId = searchParams.get('category') || undefined
  const { data: options, isLoading: isOptionsLoading } = useFilterOptions(currentCategoryId)

  const [localSearch, setLocalSearch] = useState(searchParams.get('q') || '')

  const updateParam = (key: string, value: string | undefined) => {
    const newParams = new URLSearchParams(searchParams)
    if (value) {
      newParams.set(key, value)
    } else {
      newParams.delete(key)
    }
    setSearchParams(newParams)
  }

  const toggleBrand = (brandId: string) => {
    const currentBrands = searchParams.get('brands')?.split(',') || []
    const newBrands = currentBrands.includes(brandId)
      ? currentBrands.filter((id) => id !== brandId)
      : [...currentBrands, brandId]

    updateParam('brands', newBrands.length > 0 ? newBrands.join(',') : undefined)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateParam('q', localSearch || undefined)
  }

  const clearAll = () => {
    setSearchParams(new URLSearchParams())
  }

  const hasFilters = Array.from(searchParams.keys()).length > 0

  return (
    <div className="w-full lg:w-70 shrink-0 border border-neutral-200 rounded-sm bg-white pb-6 pt-4">
      {/* Header with Clear All */}
      <div className="px-4 pb-4 border-b border-neutral-100 flex items-center justify-between">
        <h3 className="font-bold text-[14px] text-black uppercase tracking-tight">Filters</h3>
        {hasFilters && (
          <button
            onClick={clearAll}
            className="text-[11px] font-bold text-[#D4A373] hover:text-black transition-colors uppercase flex items-center gap-1"
          >
            Clear All
            <X className="size-3" />
          </button>
        )}
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="px-4 py-5 border-b border-neutral-100">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 size-4 group-focus-within:text-black transition-colors" />
          <Input
            placeholder="Search within..."
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            className="pl-9 bg-neutral-50/50 border-neutral-200 rounded-sm h-10 w-full focus-visible:ring-1 focus-visible:ring-black"
          />
        </div>
      </form>

      {/* Categories */}
      <div className="px-4 py-5 border-b border-neutral-100">
        <h3 className="font-bold text-[14px] text-black mb-4 uppercase">Categories</h3>
        <div className="flex flex-col gap-3">
          {isCatsLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-4 w-full bg-neutral-100 animate-pulse rounded" />
              ))
            : categories?.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-2.5">
                  <input
                    type="radio"
                    name="category"
                    id={`cat-${cat.id}`}
                    checked={currentCategoryId === cat.id}
                    onChange={() => updateParam('category', cat.id)}
                    className="size-4 rounded-full border-neutral-300 text-black focus:ring-black accent-black cursor-pointer"
                  />
                  <label
                    htmlFor={`cat-${cat.id}`}
                    className={cn(
                      'text-[14px] leading-none cursor-pointer hover:text-black transition-colors pt-0.5',
                      currentCategoryId === cat.id ? 'text-black font-bold' : 'text-neutral-600'
                    )}
                  >
                    {cat.name}
                  </label>
                </div>
              ))}
        </div>
      </div>

      {/* Brand */}
      <div className="px-4 py-5 border-b border-neutral-100">
        <h3 className="font-bold text-[14px] text-black mb-4 uppercase">Brand</h3>
        <div className="flex flex-col gap-3">
          {isOptionsLoading ? (
            <p className="text-[12px] text-neutral-400 italic">
              Select a category to see brands...
            </p>
          ) : !options?.brands?.length ? (
            <p className="text-[12px] text-neutral-400 italic">No brands available</p>
          ) : (
            options.brands.map((brand: FilterOptionsResponse['brands'][number]) => {
              const isActive = (searchParams.get('brands')?.split(',') || []).includes(brand.id)
              return (
                <div key={brand.id} className="flex items-center space-x-2.5">
                  <input
                    type="checkbox"
                    id={`brand-${brand.id}`}
                    checked={isActive}
                    onChange={() => toggleBrand(brand.id)}
                    className="size-4 rounded-sm border-neutral-300 text-black focus:ring-black accent-black cursor-pointer"
                  />
                  <label
                    htmlFor={`brand-${brand.id}`}
                    className={cn(
                      'text-[14px] leading-none cursor-pointer hover:text-black transition-colors pt-0.5',
                      isActive ? 'text-black font-bold' : 'text-neutral-600'
                    )}
                  >
                    {brand.name}
                  </label>
                </div>
              )
            })
          )}
        </div>
      </div>

      {/* Price Range */}
      <div className="px-4 py-5 border-b border-neutral-100">
        <h3 className="font-bold text-[14px] text-black mb-6 uppercase">Price Range</h3>
        <div className="px-2">
          {isOptionsLoading ? (
            <div className="h-4 w-full bg-neutral-100 animate-pulse rounded" />
          ) : (
            <>
              <div className="h-1 w-full bg-neutral-200 relative rounded-full">
                <div className="absolute top-0 left-0 right-[40%] h-full bg-[#D4A373] rounded-full"></div>
                <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#D4A373] shadow-sm"></div>
                <div className="absolute top-1/2 right-[40%] -translate-y-1/2 translate-x-1/2 w-4 h-4 rounded-full bg-[#D4A373] shadow-sm"></div>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="text-[13px] font-medium text-black">
                  ₹{options?.priceRange?.min || 0}
                </span>
                <span className="text-[13px] font-medium text-black">
                  ₹{options?.priceRange?.max || '15000+'}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Discount */}
      <div className="px-4 py-5">
        <h3 className="font-bold text-[14px] text-black mb-4 uppercase">Discount</h3>
        <div className="flex flex-col gap-3">
          {[50, 40, 30, 20, 10].map((val) => {
            const isActive = searchParams.get('minDiscount') === val.toString()
            return (
              <div key={val} className="flex items-center space-x-2.5">
                <input
                  type="radio"
                  name="discount"
                  id={`disc-${val}`}
                  checked={isActive}
                  onChange={() => updateParam('minDiscount', val.toString())}
                  className="size-4 rounded-sm border-neutral-300 text-black focus:ring-black accent-black cursor-pointer"
                />
                <label
                  htmlFor={`disc-${val}`}
                  className={cn(
                    'text-[14px] leading-none cursor-pointer hover:text-black transition-colors pt-0.5',
                    isActive ? 'text-black font-bold' : 'text-neutral-600'
                  )}
                >
                  {val}% or more
                </label>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
