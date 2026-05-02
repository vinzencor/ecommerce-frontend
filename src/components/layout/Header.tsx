import { useState, useEffect, useRef } from 'react'
import { Search, MapPin, User, Heart, ShoppingCart, Loader2, X, Flame } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '@/features/cart/hooks/useCart'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useWishlist } from '@/features/wishlist/hooks/useWishlist'
import { getProducts } from '@/features/products/api/products'
import { type BackendProduct } from '@/lib/mapping'
import { cn } from '@/lib/utils'

interface SearchBarProps {
  isMobile?: boolean
  searchQuery: string
  setSearchQuery: (val: string) => void
  results: BackendProduct[]
  setResults: (res: BackendProduct[]) => void
  isSearching: boolean
  showResults: boolean
  setShowResults: (show: boolean) => void
  handleSearch: (e: React.KeyboardEvent<HTMLInputElement>) => void
  handleResultClick: (id: string) => void
}

const SearchBar = ({ 
  isMobile = false, 
  searchQuery, 
  setSearchQuery, 
  results, 
  setResults,
  isSearching, 
  showResults, 
  setShowResults,
  handleSearch,
  handleResultClick
}: SearchBarProps) => (
  <div className={cn("relative w-full", isMobile ? "mt-2" : "")}>
    <div className={cn(
      "relative w-full flex items-center transition-all duration-300 rounded-[14px] border-2 bg-[#F5F5F5]",
      showResults && searchQuery.length >= 2 ? "border-[#505081] bg-white shadow-lg ring-4 ring-[#505081]/5" : "border-transparent hover:border-[#EDEDFD]"
    )}>
      <Search className={cn(
        "absolute left-4 size-4 transition-colors",
        showResults && searchQuery.length >= 2 ? "text-[#505081]" : "text-neutral-400"
      )} />
      <Input
        type="text"
        placeholder={isMobile ? "Search..." : "Search premium products..."}
        className="pl-11 pr-10 border-none bg-transparent focus-visible:ring-0 h-11 md:h-12 text-[14px] md:text-[15px] font-medium"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => searchQuery.length >= 2 && setShowResults(true)}
        onKeyDown={handleSearch}
      />
      {searchQuery && (
        <button 
          onClick={() => {
            setSearchQuery('')
            setResults([])
            setShowResults(false)
          }}
          className="absolute right-4 text-neutral-400 hover:text-[#505081] transition-colors"
        >
          {isSearching ? <Loader2 className="size-4 animate-spin" /> : <X className="size-4" />}
        </button>
      )}
    </div>

    {/* Dropdown Results */}
    {showResults && searchQuery.length >= 2 && (
      <div className={cn(
        "absolute left-0 right-0 bg-white border border-[#EDEDFD] rounded-[18px] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 z-[110]",
        isMobile ? "top-[calc(100%+8px)] fixed left-4 right-4 md:absolute md:left-0 md:right-0" : "top-[calc(100%+8px)]"
      )}>
        <div className="max-h-[420px] overflow-y-auto no-scrollbar py-2">
          {results.length > 0 ? (
            <>
              <div className="px-5 py-2">
                <p className="text-[11px] font-black text-[#505081] tracking-[0.1em] uppercase">Search Results</p>
              </div>
              {results.map((product) => {
                const primaryVariant = product.variants?.find((v) => v.isPrimary) || product.variants?.[0]
                const price = primaryVariant?.price || 0
                const originalPrice = primaryVariant?.costPrice || (price ? Math.round(price * 1.5) : 0)
                const discount = primaryVariant?.discount || 0
                const image = primaryVariant?.images?.find((img) => img.isPrimary)?.imageUrl || primaryVariant?.images?.[0]?.imageUrl || ''

                return (
                  <div
                    key={product.id}
                    onClick={() => handleResultClick(product.id)}
                    className="flex items-center gap-4 px-5 py-3 hover:bg-[#F5F5F5] cursor-pointer transition-colors group"
                  >
                    <div className="size-14 rounded-[10px] bg-[#F5F5F5] border border-[#EDEDFD] p-2 flex items-center justify-center shrink-0">
                      {image ? (
                        <img 
                          src={image} 
                          alt={product.productName} 
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform"
                        />
                      ) : (
                        <div className="text-[9px] text-neutral-400 font-bold">No Image</div>
                      )}
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <h4 className="text-[14px] font-bold text-[#291F1F] truncate group-hover:text-[#505081] transition-colors">
                        {product.productName}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-bold text-[#291F1F]">₹{price.toLocaleString('en-IN')}</span>
                        <span className="text-[11px] text-[#666] line-through">₹{originalPrice.toLocaleString('en-IN')}</span>
                        <span className="text-[11px] font-bold text-[#2B9950]">{discount}% OFF</span>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div 
                onClick={() => {
                  window.location.href = `/products?q=${encodeURIComponent(searchQuery)}`
                  setShowResults(false)
                }}
                className="px-5 py-4 border-t border-[#EDEDFD] text-center text-[13px] font-bold text-[#505081] hover:bg-[#F5F5F5] transition-colors cursor-pointer"
              >
                View all results for "{searchQuery}"
              </div>
            </>
          ) : !isSearching ? (
            <div className="px-5 py-10 text-center">
              <p className="text-[14px] text-neutral-400 font-medium">No products found for "{searchQuery}"</p>
            </div>
          ) : (
            <div className="px-5 py-10 flex flex-col items-center gap-3">
              <Loader2 className="size-6 text-[#505081] animate-spin" />
              <p className="text-[13px] text-neutral-500 font-medium tracking-wide">Searching for magic...</p>
            </div>
          )}
        </div>
      </div>
    )}
  </div>
)

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [results, setResults] = useState<BackendProduct[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const navigate = useNavigate()
  const { cartCount } = useCart()
  const { count: wishlistCount } = useWishlist()
  const { isAuthenticated } = useAuth()
  
  const desktopSearchRef = useRef<HTMLDivElement>(null)
  const mobileSearchRef = useRef<HTMLDivElement>(null)

  // Handle click outside search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isDesktopClick = desktopSearchRef.current?.contains(event.target as Node)
      const isMobileClick = mobileSearchRef.current?.contains(event.target as Node)
      if (!isDesktopClick && !isMobileClick) {
        setShowResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Live search logic with debounce
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchQuery.trim().length >= 2) {
        setIsSearching(true)
        setShowResults(true)
        try {
          const response = await getProducts({ search: searchQuery.trim(), limit: 6 })
          setResults(response.products)
        } catch (error) {
          console.error('Search error:', error)
        } finally {
          setIsSearching(false)
        }
      } else {
        setResults([])
        setShowResults(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowResults(false)
    }
  }

  const handleResultClick = (productId: string) => {
    navigate(`/product/${productId}`)
    setShowResults(false)
    setSearchQuery('')
  }

  const commonSearchProps = {
    searchQuery,
    setSearchQuery,
    results,
    setResults,
    isSearching,
    showResults,
    setShowResults,
    handleSearch,
    handleResultClick
  }

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-[#EDEDFD] bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex h-16 md:h-22 items-center justify-between gap-6 md:gap-10">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="text-[24px] md:text-[28px] font-black tracking-tighter text-[#291F1F] hover:text-[#505081] transition-colors">
              WEBSITE
            </Link>
            <nav className="hidden lg:flex items-center gap-6 ml-6">
              <Link to="/products" className="text-[13px] font-black uppercase tracking-widest text-neutral-500 hover:text-black transition-colors">Shop</Link>
              <Link to="/deals" className="text-[13px] font-black uppercase tracking-widest text-[#505081] hover:text-black transition-colors flex items-center gap-1.5">
                <Flame size={14} />
                Deals
              </Link>
            </nav>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl relative" ref={desktopSearchRef}>
            <SearchBar {...commonSearchProps} />
          </div>

          {/* Action Icons - Hidden on Mobile */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            <Button variant="ghost" size="icon" className="text-neutral-600 hover:text-[#505081] transition-colors">
              <MapPin className="size-5" />
            </Button>

            {/* Profile */}
            {isAuthenticated ? (
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="text-neutral-600 hover:text-[#505081] transition-colors">
                  <User className="size-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="h-10 px-5 text-[12px] font-black uppercase tracking-widest text-neutral-600 hover:text-white hover:bg-[#505081] rounded-full transition-all"
                >
                  Sign In
                </Button>
              </Link>
            )}

            {/* Wishlist */}
            <Link to={isAuthenticated ? "/wishlist" : "/login"}>
              <Button
                variant="ghost"
                size="icon"
                className="relative text-neutral-600 hover:text-[#505081] transition-colors"
              >
                <Heart className="size-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#505081] text-[10px] font-black text-white shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </Button>
            </Link>

            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-neutral-600 hover:text-[#505081] transition-colors"
              >
                <ShoppingCart className="size-5" />
                {isAuthenticated && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#291F1F] text-[10px] font-black text-white shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Search - Visible only on small screens below header main row */}
        <div className="md:hidden pb-4" ref={mobileSearchRef}>
          <SearchBar {...commonSearchProps} isMobile />
        </div>
      </div>
    </header>
  )
}

export default Header

