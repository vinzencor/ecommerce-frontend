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
        'group flex flex-col gap-2.5 cursor-pointer h-full hover:bg-neutral-50/50 p-1 rounded-md transition-colors',
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-[#f5f5f5] rounded-md">
        {badge && (
          <div className="absolute top-0 left-0 z-10 bg-red-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-br-md uppercase tracking-wider">
            {badge}
          </div>
        )}
        <img
          src={image}
          alt={name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      <div className="flex flex-col gap-1 px-0.5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[14px] text-[#282C3F] truncate">{brand}</h3>
          {rating !== undefined && (
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-[#F5A623] text-[#F5A623]" />
              <span className="text-[12px] font-bold text-[#7E818C]">{rating}</span>
            </div>
          )}
        </div>

        <p className="text-[13px] text-[#535665] truncate leading-tight">{name}</p>

        <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
          <span className="font-bold text-[14px] text-[#282C3F]">
            {currency}
            {price.toLocaleString()}
          </span>
          <span className="text-[12px] text-[#7E818C] line-through decoration-[#7E818C]/60 ml-0.5">
            {currency}
            {originalPrice.toLocaleString()}
          </span>
          <span className="text-[12px] font-bold text-[#10B981]">({discount}% OFF)</span>
        </div>
      </div>
    </Link>
  )
}

export default React.memo(SellerCard)
