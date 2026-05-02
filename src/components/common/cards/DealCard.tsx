import React from 'react'
import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

export interface DealCardProps {
  id: string
  image: string
  brand: string
  title: string
  rating: number
  price: number
  originalPrice: number
  discount: number
  className?: string
}

export function DealCard({
  id,
  image,
  brand,
  title,
  rating,
  price,
  originalPrice,
  discount,
  className,
}: DealCardProps) {
  return (
    <Link
      to={`/product/${id}`}
      className={cn(
        'relative bg-[#F5F5F5] rounded-[22px] border border-[#EDEDFD] overflow-hidden flex flex-col w-full transition-shadow duration-200 hover:shadow-md group p-3',
        className
      )}
    >
      {/* Product Image */}
      <div className="w-full aspect-square bg-[#F5F5F5] rounded-[18px] overflow-hidden relative">
        <img
          src={image || undefined}
          alt={brand}
          loading="lazy"
          className="w-full h-full object-contain p-2 transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Product Info */}
      <div className="px-3 pb-3 pt-4 flex flex-col gap-1.5 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-bold text-[#291F1F] text-[16px] truncate">
            {brand}
          </h3>
          <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/50 backdrop-blur-sm border border-[#EDEDFD]">
            <Star className="fill-orange-400 text-orange-400 size-3" />
            <span className="text-[12px] font-bold text-[#291F1F]">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>

        <p className="text-[#666] text-[13px] truncate">{title}</p>

        {/* Pricing */}
        <div className="flex flex-wrap items-center gap-1.5 mt-auto pt-2">
          <span className="font-bold text-black text-[16px]">
            ₹{price.toLocaleString('en-IN')}
          </span>
          <span className="text-[#666] text-[14px] line-through font-medium">
            ₹{originalPrice.toLocaleString('en-IN')}
          </span>
          <span className="text-[#2B9950] text-[14px] font-bold">
            ({discount}% OFF)
          </span>
        </div>
      </div>
    </Link>
  )
}

export default React.memo(DealCard)

