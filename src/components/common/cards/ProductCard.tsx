import React from 'react'
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
  badgeType?: 'low-stock' | 'new' | 'hot'
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
  badgeType,
}) => {
  const { wishlistIds, toggleWishlist } = useWishlist()
  const { isAuthenticated } = useAuth()
  const isFav = wishlistIds.has(id)

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!isAuthenticated) {
      return
    }

    try {
      await toggleWishlist(id)
      onWishlistClick?.()
    } catch (error) {
      console.error('Failed to toggle wishlist:', error)
    }
  }

  const badgeColor =
    badgeType === 'new'
      ? 'text-blue-600'
      : badgeType === 'hot'
        ? 'text-orange-500'
        : 'text-[#505081]'

  return (
    <Link
      to={`/product/${id}`}
      className={cn(
        'relative bg-[#F5F5F5] rounded-[22px] border border-[#EDEDFD] overflow-hidden flex flex-col w-full transition-shadow duration-200 hover:shadow-md group',
        className
      )}
    >
      {/* Wishlist button */}
      <button
        onClick={handleWishlistClick}
        className="absolute top-3 right-3 z-10 w-[34px] h-[34px] rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        aria-label="Add to wishlist"
      >
        {isFav ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M7 12.19L2.11 7.23C1.51 6.64 1.18 5.83 1.18 5C1.18 3.27 2.59 1.87 4.32 1.87C5.19 1.87 6.02 2.22 6.62 2.83L7 3.19L7.38 2.83C7.98 2.22 8.81 1.87 9.68 1.87C11.41 1.87 12.82 3.27 12.82 5C12.82 5.83 12.49 6.64 11.89 7.23L7 12.19Z"
              fill="#505081"
            />
          </svg>
        ) : (
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.1954 3.11714C11.601 2.52424 10.796 2.19083 9.95649 2.18981C9.11696 2.18878 8.31118 2.52023 7.71536 3.11167L7.00005 3.77612L6.28419 3.10948C5.68851 2.51547 4.88125 2.18242 4.04001 2.1836C3.19877 2.18478 2.39246 2.52009 1.79844 3.11577C1.20443 3.71145 0.871382 4.5187 0.872562 5.35994C0.873741 6.20118 1.20905 7.0075 1.80473 7.60151L6.69106 12.5595C6.73177 12.6008 6.78029 12.6336 6.83381 12.6561C6.88733 12.6785 6.94476 12.69 7.00278 12.69C7.0608 12.69 7.11824 12.6785 7.17175 12.6561C7.22527 12.6336 7.27379 12.6008 7.3145 12.5595L12.1954 7.60151C12.7898 7.00672 13.1237 6.20023 13.1237 5.35932C13.1237 4.51842 12.7898 3.71192 12.1954 3.11714ZM11.5747 6.98682L7.00005 11.6265L2.4227 6.98245C1.99193 6.55168 1.74993 5.96743 1.74993 5.35823C1.74993 4.74903 1.99193 4.16478 2.4227 3.73401C2.85347 3.30324 3.43772 3.06124 4.04692 3.06124C4.65612 3.06124 5.24037 3.30324 5.67114 3.73401L5.68208 3.74495L6.702 4.69378C6.78296 4.76912 6.88945 4.811 7.00005 4.811C7.11064 4.811 7.21713 4.76912 7.29809 4.69378L8.31802 3.74495L8.32895 3.73401C8.76001 3.30353 9.34442 3.06192 9.95362 3.06233C10.5628 3.06274 11.1469 3.30514 11.5774 3.7362C12.0079 4.16726 12.2495 4.75167 12.2491 5.36087C12.2487 5.97007 12.0063 6.55416 11.5752 6.98464L11.5747 6.98682Z"
              fill="#343330"
            />
          </svg>
        )}
      </button>

      {/* Product image */}
      <div className="w-full aspect-[350/265] bg-[#F5F5F5] flex items-center justify-center overflow-hidden">
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-200/50 text-[#666] font-medium text-sm">
            No Image
          </div>
        )}
      </div>

      {/* Product info */}
      <div className="px-4 md:px-6 pb-[22px] pt-3 flex flex-col gap-1">
        {/* Name */}
        <p className="font-bold text-[18px] leading-snug text-[#291F1F] truncate">
          {name}
        </p>

        {/* Price row */}
        <div className="flex items-center gap-[6px] flex-wrap">
          <span className="font-bold text-[16px] leading-5 text-black">
            {currency}
            {price.toLocaleString('en-IN')}
          </span>
          <span className="font-medium text-[16px] leading-[18px] text-[#666] line-through">
            {currency}
            {originalPrice.toLocaleString('en-IN')}
          </span>
          <span className="font-medium text-[16px] leading-[18px] text-[#2B9950]">
            ({discount}% OFF)
          </span>
        </div>

        {/* Badge */}
        {(isTrending || stockStatus) && (
          <p className={`font-semibold text-[12px] leading-normal ${badgeColor}`}>
            {isTrending ? 'TRENDING' : stockStatus}
          </p>
        )}
      </div>
    </Link>
  )
}

export default React.memo(ProductCard)

