import React from 'react'
import { Plus, Minus, Share2 } from 'lucide-react'
import type { CartItem as CartItemType } from '../types/cart.types'
import { toast } from 'sonner'

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (id: string, delta: number) => void
  onRemove: (id: string) => void
}

function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  const handleShareProduct = () => {
    const productLink = `${window.location.origin}/product/${item.id}`
    navigator.clipboard.writeText(productLink)
    toast.success('Product link copied!')
  }

  return (
    <div className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1.5fr_1fr_0.5fr] md:items-center gap-4 md:gap-0 p-4 md:py-6 border-b border-neutral-100 last:border-0 group transition-all duration-300">
      {/* Mobile Top Row: Product Detail */}
      <div className="flex items-start md:items-center gap-4 md:gap-6">
        <div className="w-20 h-20 md:w-25 md:h-25 bg-white border border-neutral-100 rounded-md overflow-hidden shrink-0 flex items-center justify-center p-1.5 md:p-2">
          <img
            src={item.image}
            alt={item.name}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>
        <div className="flex flex-col gap-0.5 flex-1 min-w-0">
          <h3 className="text-[14px] md:text-[15px] font-bold md:font-semibold text-black tracking-tight truncate">
            {item.name}
          </h3>
          <p className="text-[12px] md:text-[13px] text-neutral-400 font-normal truncate">
            {item.variant}
          </p>
          <div className="flex items-center gap-4 mt-2 md:hidden">
            <button
              onClick={() => onRemove(item.id)}
              className="text-[12px] font-bold text-[#FF6B6B] hover:text-red-700 transition-colors uppercase tracking-widest"
            >
              Remove
            </button>
            <button
              onClick={handleShareProduct}
              className="text-[12px] font-bold text-neutral-400 hover:text-black transition-colors flex items-center gap-1 uppercase tracking-widest"
            >
              <Share2 size={12} />
              Share
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Row: Price & Quantity */}
      <div className="flex items-center justify-between md:block px-0 md:px-2 mt-2 md:mt-0">
        {/* Price */}
        <div className="flex flex-col md:text-left">
          <span className="md:hidden text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-0.5">
            Price
          </span>
          <span className="text-[16px] md:text-[15px] font-black md:font-bold text-black">
            ₹{item.price.toLocaleString()}
          </span>
        </div>

        {/* Quantity (Mobile only) */}
        <div className="md:hidden flex flex-col items-end">
          <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-black mb-1">
            Quantity
          </span>
          <div className="flex items-center justify-between border border-neutral-200 rounded-md h-8.5 w-24 bg-white px-2">
            <button
              onClick={() => onUpdateQuantity(item.id, -1)}
              className="text-neutral-400 hover:text-black p-1"
            >
              <Minus size={10} strokeWidth={4} />
            </button>
            <span className="text-[13px] font-bold text-black">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, 1)}
              className="text-neutral-400 hover:text-black p-1"
            >
              <Plus size={10} strokeWidth={4} />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Specific Grid Slots (Hidden on Mobile) */}
      <div className="hidden md:flex items-center justify-center">
        <div className="flex items-center justify-between border border-neutral-200 rounded-md h-9.5 w-25 bg-white px-2">
          <button
            onClick={() => onUpdateQuantity(item.id, -1)}
            className="text-neutral-400 hover:text-black transition-colors"
          >
            <Minus size={12} strokeWidth={3} />
          </button>
          <span className="text-[14px] font-semibold text-black">{item.quantity}</span>
          <button
            onClick={() => onUpdateQuantity(item.id, 1)}
            className="text-neutral-400 hover:text-black transition-colors"
          >
            <Plus size={12} strokeWidth={3} />
          </button>
        </div>
      </div>

      <div className="hidden md:block text-center">
        <span className="text-[15px] font-bold text-black">
          ₹{(item.price * item.quantity).toLocaleString()}
        </span>
      </div>

      <div className="hidden md:flex flex-col items-end gap-1.5 pr-4 group/action">
        <button
          onClick={() => onRemove(item.id)}
          className="text-[#FF6B6B] hover:text-red-700 transition-colors text-[11px] font-black uppercase tracking-widest opacity-0 group-hover/action:opacity-100"
        >
          Remove
        </button>
        <button
          onClick={handleShareProduct}
          className="text-neutral-400 hover:text-black transition-colors text-[11px] font-black uppercase tracking-widest flex items-center gap-1.5 group-hover/action:translate-y-0 translate-y-1 opacity-0 group-hover/action:opacity-100 transition-all duration-300"
        >
          <Share2 size={12} />
          Share
        </button>
      </div>
    </div>
  )
}

export default React.memo(CartItem)
