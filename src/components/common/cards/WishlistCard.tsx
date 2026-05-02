import React from 'react'
import { Heart, Trash2, ShoppingCart } from 'lucide-react'
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
        'group relative flex flex-col w-full overflow-hidden bg-[#F5F5F5] border border-[#EDEDFD] rounded-[22px] transition-all duration-300 hover:shadow-md h-full',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F5F5]">
        {/* Trending Badge */}
        {isTrending && (
          <div className="absolute top-3 left-3 z-10 bg-[#505081] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Trending
          </div>
        )}

        {/* Heart Icon Button */}
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove?.()
          }}
          className="absolute top-3 right-3 z-10 size-9 rounded-full bg-white flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
          aria-label="Remove from Wishlist"
        >
          <Heart size={18} className="fill-[#505081] text-[#505081]" />
        </button>

        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-1 p-5 pt-2">
        <h3 className="text-[16px] font-bold text-[#291F1F] truncate mb-1">
          {name}
        </h3>

        <div className="flex items-center gap-2 mb-4 flex-wrap">
          <span className="font-bold text-[18px] text-black">
            {currency}
            {price.toLocaleString('en-IN')}
          </span>
          <span className="text-[14px] text-[#666] line-through font-medium">
            {currency}
            {originalPrice.toLocaleString('en-IN')}
          </span>
          <span className="text-[14px] font-bold text-[#2B9950]">
            ({discount}% OFF)
          </span>
        </div>

        {stockStatus && (
          <p className="text-[11px] font-bold text-[#505081] uppercase tracking-wide mb-4">
            {stockStatus}
          </p>
        )}

        {/* Action Row - Fixed to bottom */}
        <div className="flex items-center gap-2 mt-auto">
          <Button
            onClick={(e) => {
              e.stopPropagation()
              onMoveToCart?.()
            }}
            className="flex-1 h-11 bg-black hover:bg-neutral-800 text-white rounded-full text-[13px] font-bold uppercase tracking-wider transition-all"
          >
            <ShoppingCart size={16} className="mr-2" />
            Add to Cart
          </Button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onRemove?.()
            }}
            className="size-11 shrink-0 border border-[#EDEDFD] bg-white rounded-full flex items-center justify-center text-neutral-400 hover:text-[#505081] hover:border-[#505081] transition-all shadow-sm"
            aria-label="Delete from Wishlist"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default React.memo(WishlistCard)

