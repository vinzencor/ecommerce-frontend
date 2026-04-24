import React from 'react'
import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useWishlist } from '@/features/wishlist/hooks/useWishlist'
import { useAuth } from '@/features/auth/hooks/useAuth'

interface ProductCardProps {
  id: string
  image: string
  name: string
  price: number
  originalPrice: number
  discount: number
  isTrending?: boolean
  stockStatus?: string
  currency?: string
  onWishlistClick?: () => void
  className?: string
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  image,
  name,
  price,
  originalPrice,
  discount,
  isTrending = false,
  stockStatus,
  currency = '₹',
  onWishlistClick,
  className,
}) => {
  const { wishlistIds, toggleWishlist } = useWishlist()
  const { isAuthenticated } = useAuth()
  const isFav = wishlistIds.has(id)

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      // Potentially redirect to login or show toast
      return
    }

    try {
      await toggleWishlist(id)
      onWishlistClick?.()
    } catch (error) {
      console.error('Failed to toggle wishlist:', error)
    }
  }

  return (
    <Link
      to={`/product/${id}`}
      className={cn(
        'group relative flex flex-col w-full h-full overflow-hidden bg-white border border-neutral-200 rounded-tl-[5px] rounded-tr-[5px] hover:shadow-md transition-shadow',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-[#f5f5f5]">
        {/* Trending Badge */}
        {isTrending && (
          <div className="absolute top-0 left-0 z-10 bg-[#F23535] text-white text-[14px] font-medium w-18.25 h-6.25 flex items-center justify-center rounded-[1px] pointer-events-none">
            Trending
          </div>
        )}

        {/* Wishlist Icon */}
        <button
          onClick={handleWishlistClick}
          className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/90 hover:bg-white shadow-sm transition-colors group/heart"
        >
          <Heart
            size={16}
            className={cn(
              'transition-colors',
              isFav
                ? 'text-[#FF3F6C] fill-[#FF3F6C]'
                : 'text-neutral-600 group-hover/heart:text-[#FF3F6C]'
            )}
          />
        </button>

        <img
          src={image || undefined}
          alt={name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col gap-1.5 p-3.5 pt-4">
        <h3 className="text-sm font-bold text-[#282C3F] truncate">{name}</h3>

        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
          <span className="font-bold text-sm text-[#282C3F]">
            {currency}
            {price.toLocaleString()}
          </span>
          <span className="text-[12px] text-[#7E818C] line-through decoration-[#7E818C]/60 ml-0.5">
            {currency}
            {originalPrice.toLocaleString()}
          </span>
          <span className="text-[12px] font-bold text-[#03a685]">({discount}% OFF)</span>
        </div>

        {stockStatus && (
          <p className="text-[10px] font-bold text-[#F44504] mt-1 uppercase">{stockStatus}</p>
        )}
      </div>
    </Link>
  )
}

export default React.memo(ProductCard)
