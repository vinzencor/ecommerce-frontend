import { Search, X, ChevronDown } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useSearchParams } from 'react-router-dom'
import { useCategories, useFilterOptions } from '../../hooks/useFilterOptions'
import { cn } from '@/lib/utils'
import { useState, useRef, useEffect } from 'react'

export function ProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { data: categories, isLoading: isCatsLoading } = useCategories()
  const currentCategoryId = searchParams.get('category') || undefined
  const { data: options, isLoading: isOptionsLoading } = useFilterOptions(currentCategoryId)
  const [localSearch, setLocalSearch] = useState(searchParams.get('q') || '')
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  
  // Price state for local editing before applying
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Sync local price state when URL changes
  useEffect(() => {
    setMinPrice(searchParams.get('minPrice') || '')
    setMaxPrice(searchParams.get('maxPrice') || '')
  }, [searchParams])

  const updateParam = (key: string, value: string | undefined) => {
    const newParams = new URLSearchParams(searchParams)
    if (value) {
      newParams.set(key, value)
    } else {
      newParams.delete(key)
    }
    setSearchParams(newParams)
    setActiveDropdown(null)
  }

  const applyPriceRange = () => {
    const newParams = new URLSearchParams(searchParams)
    if (minPrice) newParams.set('minPrice', minPrice)
    else newParams.delete('minPrice')
    if (maxPrice) newParams.set('maxPrice', maxPrice)
    else newParams.delete('maxPrice')
    setSearchParams(newParams)
    setActiveDropdown(null)
  }

  const toggleBrand = (brandId: string) => {
    const currentBrands = searchParams.get('brands')?.split(',') || []
    const newBrands = currentBrands.includes(brandId)
      ? currentBrands.filter((id) => id !== brandId)
      : [...currentBrands, brandId]

    const val = newBrands.length > 0 ? newBrands.join(',') : undefined
    const newParams = new URLSearchParams(searchParams)
    if (val) newParams.set('brands', val)
    else newParams.delete('brands')
    setSearchParams(newParams)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    updateParam('q', localSearch || undefined)
  }

  const clearAll = () => {
    setSearchParams(new URLSearchParams())
    setActiveDropdown(null)
    setMinPrice('')
    setMaxPrice('')
  }

  const hasFilters = Array.from(searchParams.keys()).length > 0
  const selectedCategory = categories?.find(c => c.id === currentCategoryId)?.name
  const selectedBrandsCount = searchParams.get('brands')?.split(',').filter(Boolean).length

  return (
    <div ref={containerRef} className="w-full">
      {/* Mobile View */}
      <div className="lg:hidden w-full mb-8 space-y-4">
        {/* Search */}
        <form onSubmit={handleSearch} className="w-full">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 size-4" />
            <Input
              placeholder="Search items..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-11 bg-[#F5F5F5] border-transparent rounded-[14px] h-12 w-full text-[14px] font-medium"
            />
          </div>
        </form>

        {/* Horizontal Scroll Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setActiveDropdown(activeDropdown === 'cat' ? null : 'cat')}
            className={cn(
              "px-5 py-2.5 rounded-full border text-[13px] font-bold whitespace-nowrap transition-all flex items-center gap-2",
              activeDropdown === 'cat' || selectedCategory ? "bg-[#505081] text-white border-[#505081] shadow-md" : "bg-white text-[#666] border-[#EDEDFD]"
            )}
          >
            {selectedCategory || 'Category'}
            <ChevronDown className={cn("size-3.5 transition-transform", activeDropdown === 'cat' ? "rotate-180" : "")} />
          </button>

          <button
            onClick={() => setActiveDropdown(activeDropdown === 'brand' ? null : 'brand')}
            className={cn(
              "px-5 py-2.5 rounded-full border text-[13px] font-bold whitespace-nowrap transition-all flex items-center gap-2",
              activeDropdown === 'brand' || selectedBrandsCount ? "bg-[#505081] text-white border-[#505081] shadow-md" : "bg-white text-[#666] border-[#EDEDFD]"
            )}
          >
            {selectedBrandsCount ? `${selectedBrandsCount} Brands` : 'Brand'}
            <ChevronDown className={cn("size-3.5 transition-transform", activeDropdown === 'brand' ? "rotate-180" : "")} />
          </button>

          <button
            onClick={() => setActiveDropdown(activeDropdown === 'price' ? null : 'price')}
            className={cn(
              "px-5 py-2.5 rounded-full border text-[13px] font-bold whitespace-nowrap transition-all flex items-center gap-2",
              activeDropdown === 'price' || minPrice || maxPrice ? "bg-[#505081] text-white border-[#505081] shadow-md" : "bg-white text-[#666] border-[#EDEDFD]"
            )}
          >
            Price
            <ChevronDown className={cn("size-3.5 transition-transform", activeDropdown === 'price' ? "rotate-180" : "")} />
          </button>

          {hasFilters && (
            <button onClick={clearAll} className="px-4 py-2 text-[12px] font-bold text-red-500 uppercase whitespace-nowrap">Clear</button>
          )}
        </div>

        {/* Dropdown Content Area */}
        {activeDropdown && (
          <div className="bg-white border border-[#EDEDFD] rounded-[22px] shadow-xl p-4 animate-in slide-in-from-top-2 duration-200">
            {activeDropdown === 'cat' && (
              <div className="flex flex-col gap-1">
                {isCatsLoading ? <p className="p-4 text-center text-neutral-400">Loading...</p> : 
                  categories?.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => updateParam('category', cat.id)}
                      className={cn("w-full text-left px-4 py-3 rounded-[12px] text-[14px]", currentCategoryId === cat.id ? "bg-[#EDEDFD] text-[#505081] font-bold" : "hover:bg-[#F5F5F5] text-[#666]")}
                    >
                      {cat.name}
                    </button>
                  ))
                }
              </div>
            )}
            {activeDropdown === 'brand' && (
              <div className="flex flex-col gap-1 max-h-60 overflow-y-auto no-scrollbar">
                {isOptionsLoading ? <p className="p-4 text-center text-neutral-400 italic">Select category first</p> : 
                  options?.brands?.map((brand: any) => (
                    <button
                      key={brand.id}
                      onClick={() => toggleBrand(brand.id)}
                      className={cn("w-full text-left px-4 py-3 rounded-[12px] text-[14px] flex items-center justify-between", (searchParams.get('brands')?.split(',') || []).includes(brand.id) ? "bg-[#EDEDFD] text-[#505081] font-bold" : "hover:bg-[#F5F5F5] text-[#666]")}
                    >
                      {brand.name}
                    </button>
                  ))
                }
              </div>
            )}
            {activeDropdown === 'price' && (
              <div className="p-2 space-y-6">
                <h3 className="font-bold text-[13px] text-[#291F1F] uppercase tracking-wide">Set Price Range</h3>
                <div className="flex items-center gap-3">
                  <div className="flex-1 space-y-1.5">
                    <span className="text-[11px] font-black text-[#999] uppercase tracking-widest ml-1">Min Price</span>
                    <Input 
                      type="number" 
                      placeholder="Min" 
                      value={minPrice} 
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="bg-[#F5F5F5] border-transparent rounded-[12px] h-12 text-[14px] font-bold"
                    />
                  </div>
                  <div className="flex-1 space-y-1.5">
                    <span className="text-[11px] font-black text-[#999] uppercase tracking-widest ml-1">Max Price</span>
                    <Input 
                      type="number" 
                      placeholder="Max" 
                      value={maxPrice} 
                      onChange={(e) => setMaxPrice(e.target.value)}
                      className="bg-[#F5F5F5] border-transparent rounded-[12px] h-12 text-[14px] font-bold"
                    />
                  </div>
                </div>
                <button 
                  onClick={applyPriceRange} 
                  className="w-full py-3.5 bg-[#505081] text-white font-black rounded-full uppercase text-[12px] shadow-lg shadow-[#505081]/20 active:scale-95 transition-all"
                >
                  Apply Price Range
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Desktop View (Sidebar) */}
      <div className="hidden lg:flex flex-col w-72 shrink-0 border border-[#EDEDFD] rounded-[22px] bg-white overflow-hidden shadow-sm">
        <div className="px-6 py-5 border-b border-[#EDEDFD] bg-[#F5F5F5]/50 flex items-center justify-between">
          <h3 className="font-black text-[12px] text-[#291F1F] uppercase tracking-[0.1em]">Filter Products</h3>
          {hasFilters && (
            <button onClick={clearAll} className="text-[11px] font-bold text-[#505081] uppercase flex items-center gap-1.5 hover:text-black transition-colors">
              Clear All <X className="size-3" />
            </button>
          )}
        </div>

        <form onSubmit={handleSearch} className="px-6 py-6 border-b border-[#EDEDFD]">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 size-4 group-focus-within:text-[#505081]" />
            <Input
              placeholder="Search items..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="pl-11 bg-[#F5F5F5] border-transparent focus:border-[#EDEDFD] focus:ring-0 rounded-[12px] h-12 w-full text-[14px] font-medium"
            />
          </div>
        </form>

        <div className="px-6 py-6 border-b border-[#EDEDFD]">
          <h3 className="font-bold text-[13px] text-[#291F1F] mb-5 uppercase tracking-wide">Categories</h3>
          <div className="flex flex-col gap-3.5">
            {categories?.map((cat) => (
              <div key={cat.id} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="cat_d"
                  id={`cat-d-${cat.id}`}
                  checked={currentCategoryId === cat.id}
                  onChange={() => updateParam('category', cat.id)}
                  className="size-4.5 text-[#505081] focus:ring-[#505081] accent-[#505081] cursor-pointer"
                />
                <label htmlFor={`cat-d-${cat.id}`} className={cn("text-[14px] cursor-pointer pt-0.5", currentCategoryId === cat.id ? "font-bold text-[#291F1F]" : "text-[#666] font-medium")}>
                  {cat.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-6 border-b border-[#EDEDFD]">
          <h3 className="font-bold text-[13px] text-[#291F1F] mb-5 uppercase tracking-wide">Brand</h3>
          <div className="flex flex-col gap-3.5 max-h-60 overflow-y-auto no-scrollbar">
            {options?.brands?.map((brand: any) => (
              <div key={brand.id} className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id={`brand-d-${brand.id}`}
                  checked={(searchParams.get('brands')?.split(',') || []).includes(brand.id)}
                  onChange={() => toggleBrand(brand.id)}
                  className="size-4.5 rounded border-[#EDEDFD] text-[#505081] accent-[#505081] cursor-pointer"
                />
                <label htmlFor={`brand-d-${brand.id}`} className="text-[14px] text-[#666] font-medium cursor-pointer pt-0.5">{brand.name}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Price Range Desktop */}
        <div className="px-6 py-6 border-b border-[#EDEDFD]">
          <h3 className="font-bold text-[13px] text-[#291F1F] mb-5 uppercase tracking-wide">Price Range</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Input 
                type="number" 
                placeholder="Min" 
                value={minPrice} 
                onChange={(e) => setMinPrice(e.target.value)}
                className="bg-[#F5F5F5] border-transparent rounded-[10px] h-10 text-[13px]"
              />
              <span className="text-neutral-400">-</span>
              <Input 
                type="number" 
                placeholder="Max" 
                value={maxPrice} 
                onChange={(e) => setMaxPrice(e.target.value)}
                className="bg-[#F5F5F5] border-transparent rounded-[10px] h-10 text-[13px]"
              />
            </div>
            <button 
              onClick={applyPriceRange}
              className="w-full py-2 bg-[#291F1F] text-white text-[11px] font-black rounded-full uppercase tracking-widest hover:bg-[#505081] transition-colors"
            >
              Apply Price
            </button>
          </div>
        </div>

        <div className="px-6 py-6">
          <h3 className="font-bold text-[13px] text-[#291F1F] mb-5 uppercase tracking-wide">Discount</h3>
          <div className="flex flex-col gap-3.5">
            {[50, 40, 30, 20, 10].map((val) => (
              <div key={val} className="flex items-center space-x-3">
                <input
                  type="radio"
                  name="disc_d"
                  id={`disc-d-${val}`}
                  checked={searchParams.get('minDiscount') === val.toString()}
                  onChange={() => updateParam('minDiscount', val.toString())}
                  className="size-4.5 text-[#505081] focus:ring-[#505081] accent-[#505081] cursor-pointer"
                />
                <label htmlFor={`disc-d-${val}`} className="text-[14px] text-[#666] font-medium cursor-pointer pt-0.5">{val}% or more</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
