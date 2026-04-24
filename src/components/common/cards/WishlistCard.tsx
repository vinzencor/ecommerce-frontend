import React from 'react'
import { Heart, Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

interface WishlistCardProps {
  id?: string
  image: string
  name: string
  brand?: string
  price: number
  originalPrice: number
  discount: number
  isTrending?: boolean
  stockStatus?: string
  currency?: string
  onMoveToCart?: () => void
  onRemove?: () => void
  className?: string
}

const WishlistCard: React.FC<WishlistCardProps> = ({
  image,
  name,
  price,
  originalPrice,
  discount,
  isTrending = false,
  stockStatus,
  currency = '₹',
  onMoveToCart,
  onRemove,
  className,
}) => {
  return (
    <div
      className={cn(
        'group relative flex flex-col w-full overflow-hidden bg-white border border-neutral-200 rounded-sm transition-all duration-300 hover:shadow-md h-full',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f5f5f5]">
        {/* Trending Badge */}
        {isTrending && (
          <div className="absolute top-0 left-0 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-br-sm uppercase tracking-wider">
            Trending
          </div>
        )}

        {/* Heart Icon Button */}
        <button
          className="absolute top-3 right-3 z-10 size-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
          aria-label="Remove from Wishlist"
        >
          <Heart size={16} className="fill-red-500 text-red-500" />
        </button>

        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-3 md:p-4 bg-white border-t border-neutral-100">
        <h3 className="text-[13px] md:text-[15px] font-medium text-neutral-800 truncate mb-1">
          {name}
        </h3>

        <div className="flex items-center gap-1.5 md:gap-2 mb-1 md:mb-1.5 flex-wrap">
          <span className="font-bold md:font-black text-[14px] md:text-[16px] text-black tracking-tight">
            {currency}
            {price.toLocaleString()}
          </span>
          <span className="text-[10px] md:text-[12px] text-neutral-400 line-through font-medium">
            {currency}
            {originalPrice.toLocaleString()}
          </span>
          <span className="text-[10px] md:text-[12px] font-bold text-green-600 uppercase tracking-tight">
            ({discount}% OFF)
          </span>
        </div>

        {stockStatus && (
          <p className="text-[10px] md:text-[11px] font-bold text-red-600 mb-3 md:mb-4">
            {stockStatus}
          </p>
        )}

        {/* Action Row - Fixed to bottom */}
        <div className="flex items-center gap-1.5 md:gap-2 mt-auto">
          <Button
            variant="black"
            onClick={(e) => {
              e.stopPropagation()
              onMoveToCart?.()
            }}
            className="flex-1 h-9 md:h-10 rounded-sm text-[10px] md:text-[12px] font-black uppercase tracking-wider md:tracking-widest shadow-sm"
          >
            Move to Cart
          </Button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onRemove?.()
            }}
            className="size-9 md:size-10 shrink-0 border border-neutral-300 rounded-sm flex items-center justify-center text-neutral-500 hover:border-red-500 hover:text-red-500 hover:bg-red-50 transition-all font-bold"
            aria-label="Delete from Wishlist"
          >
            <Trash2 size={16} className="md:size-[18px]" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(WishlistCard)
