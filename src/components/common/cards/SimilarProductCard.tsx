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
        'group relative flex flex-col w-[286px] h-[428px] overflow-hidden bg-white rounded-[5px]',
        className
      )}
    >
      {/* Image Container */}
      <div className="relative flex-1 overflow-hidden bg-[#f5f5f5] rounded-[5px]">
        {/* Trending Badge */}
        {isTrending && (
          <div className="absolute top-0 left-0 z-10 bg-[#F23535] text-white text-[14px] font-medium tracking-tight w-[73px] h-[25px] flex items-center justify-center rounded-[1px] pointer-events-none">
            Trending
          </div>
        )}

        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Content Container */}
      <div className="flex flex-col gap-1.5 pt-4">
        <h3 className="text-sm font-medium text-[#282C3F] truncate">{name}</h3>

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
      </div>
    </div>
  )
}

export default SimilarProductCard
