import React from 'react'
import { Star } from 'lucide-react'
import { Link } from 'react-router-dom'

export interface DealCardProps {
  id: string
  image: string
  brand: string
  title: string
  rating: number
  price: number
  originalPrice: number
  discount: number
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
}: DealCardProps) {
  return (
    <Link
      to={`/product/${id}`}
      className="bg-white p-2.5 sm:p-3 md:p-4 rounded-sm flex flex-col gap-2 md:gap-3 w-full h-full isolate shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Product Image */}
      <div className="w-full aspect-square bg-neutral-100 rounded-sm overflow-hidden isolate relative">
        <img
          src={image || undefined}
          alt={brand}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-center mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-1 md:space-y-1.5">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-[#282C3F] text-[13px] md:text-[15px] truncate max-w-[75%]">
            {brand}
          </h3>
          <div className="flex items-center gap-0.5 md:gap-1 text-[#FFC107]">
            <Star className="fill-current size-3 md:size-3.5" />
            <span className="text-[11px] md:text-[13px] font-medium text-neutral-600">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>

        <p className="text-[#535766] text-[12px] md:text-[13px] truncate">{title}</p>
      </div>

      {/* Pricing */}
      <div className="flex flex-wrap items-center gap-1.5 md:gap-2 mt-auto pt-1">
        <span className="font-bold text-[#282C3F] text-[13px] md:text-[15px]">
          ₹{price.toLocaleString()}
        </span>
        <span className="text-neutral-400 text-[11px] md:text-[13px] line-through">
          ₹{originalPrice.toLocaleString()}
        </span>
        <span className="text-[#03A685] text-[11px] md:text-[13px] font-bold">
          ({discount}% OFF)
        </span>
      </div>
    </Link>
  )
}

export default React.memo(DealCard)
