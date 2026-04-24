import { useState } from 'react'
import { Search, MapPin, User, Heart, ShoppingCart } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '@/features/cart/hooks/useCart'
import { useAuth } from '@/features/auth/hooks/useAuth'
import { useWishlist } from '@/features/wishlist/hooks/useWishlist'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const { cartCount } = useCart()
  const { count: wishlistCount } = useWishlist()
  const { isAuthenticated } = useAuth()

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/products?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-neutral-100 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="max-w-360 mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Link to="/" className="text-2xl font-black tracking-tighter text-black">
              WEBSITE
            </Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-400 group-focus-within:text-black transition-colors" />
            <Input
              type="text"
              placeholder="Search for brands and more"
              className="pl-11 bg-neutral-50 border-neutral-200 focus-visible:bg-white transition-all h-11"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>

          {/* Action Icons - Hidden on Mobile */}
          <div className="hidden md:flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-neutral-600 hover:text-black">
              <MapPin className="size-5" />
            </Button>

            {/* Profile */}
            {isAuthenticated ? (
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="text-neutral-600 hover:text-black">
                  <User className="size-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="h-9 px-4 text-[12px] font-black uppercase tracking-widest text-neutral-600 hover:text-black"
                >
                  Sign In
                </Button>
              </Link>
            )}

            {/* Wishlist */}
            {isAuthenticated ? (
              <Link to="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-neutral-600 hover:text-black"
                >
                  <Heart className="size-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#FF3F6C] text-[10px] font-bold text-white">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button variant="ghost" size="icon" className="text-neutral-600 hover:text-black">
                  <Heart className="size-5" />
                </Button>
              </Link>
            )}

            <Link to="/cart">
              <Button
                variant="ghost"
                size="icon"
                className="relative text-neutral-600 hover:text-black"
              >
                <ShoppingCart className="size-5" />
                {isAuthenticated && cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black text-[10px] font-bold text-white">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Search - Visible only on small screens below header main row */}
        <div className="md:hidden pb-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-neutral-400" />
            <Input
              type="text"
              placeholder="Search..."
              className="pl-11 bg-neutral-50 border-neutral-200 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearch}
            />
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
