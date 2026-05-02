import React from 'react'
import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

interface SellerCardProps {
  id: string
  image: string
  brand: string
  name: string
  rating?: number
  price: number
  originalPrice: number
  discount: number
  currency?: string
  badge?: string
  className?: string
}

const SellerCard: React.FC<SellerCardProps> = ({
  id,
  image,
  brand,
  name,
  rating,
  price,
  originalPrice,
  discount,
  currency = '₹',
  badge,
  className,
}) => {
  return (
    <Link
      to={`/product/${id}`}
      className={cn(
        'group relative bg-[#F5F5F5] rounded-[22px] border border-[#EDEDFD] overflow-hidden flex flex-col w-full transition-shadow duration-200 hover:shadow-md p-3 h-full',
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-[#F5F5F5] rounded-[18px]">
        {badge && (
          <div className="absolute top-3 left-3 z-10 bg-[#505081] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {badge}
          </div>
        )}
        {image ? (
          <img
            src={image}
            alt={name}
            loading="lazy"
            className="h-full w-full object-contain p-4 transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-neutral-200/50 text-[#666] font-medium text-xs">
            No Image
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1.5 px-2 pb-2 pt-4 flex-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-bold text-[16px] text-[#291F1F] truncate">{brand}</h3>
          {rating !== undefined && (
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-white/50 backdrop-blur-sm border border-[#EDEDFD]">
              <Star size={12} className="fill-orange-400 text-orange-400" />
              <span className="text-[12px] font-bold text-[#291F1F]">{rating}</span>
            </div>
          )}
        </div>

        <p className="text-[14px] text-[#666] truncate leading-tight">{name}</p>

        <div className="flex items-center gap-1.5 mt-auto pt-2 flex-wrap">
          <span className="font-bold text-[16px] text-black">
            {currency}
            {price.toLocaleString('en-IN')}
          </span>
          <span className="text-[14px] text-[#666] line-through font-medium">
            {currency}
            {originalPrice.toLocaleString('en-IN')}
          </span>
          <span className="text-[14px] font-bold text-[#2B9950]">({discount}% OFF)</span>
        </div>
      </div>
    </Link>
  )
}

export default SellerCard
