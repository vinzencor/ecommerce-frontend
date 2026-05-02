import React from 'react'
import { cn } from '@/lib/utils'

interface SimilarProductCardProps {
  image: string
  name: string
  price: number
  originalPrice: number
  discount: number
  isTrending?: boolean
  currency?: string
  className?: string
}

const SimilarProductCard: React.FC<SimilarProductCardProps> = ({
  image,
  name,
  price,
  originalPrice,
  discount,
  isTrending = false,
  currency = '₹',
  className,
}) => {
  return (
    <div
      className={cn(
        'group relative flex flex-col w-[286px] overflow-hidden bg-[#F5F5F5] border border-[#EDEDFD] rounded-[22px] transition-shadow duration-300 hover:shadow-md p-3',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#F5F5F5] rounded-[18px]">
        {/* Trending Badge */}
        {isTrending && (
          <div className="absolute top-3 left-3 z-10 bg-[#505081] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Trending
          </div>
        )}

        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-200/50 text-[#666] font-medium text-xs">
            No Image
          </div>
        )}
      </div>

      {/* Content Container */}
      <div className="flex flex-col gap-1 px-2 pb-2 pt-4">
        <h3 className="text-[16px] font-bold text-[#291F1F] truncate">{name}</h3>

        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="font-bold text-[16px] text-black">
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
      </div>
    </div>
  )
}

export default SimilarProductCard
