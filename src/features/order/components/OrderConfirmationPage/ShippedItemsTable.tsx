import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { RefreshCcw } from 'lucide-react'
import { useCart } from '@/features/cart/hooks/useCart'
import { toast } from 'sonner'
import type { OrderItem } from '../../api/orders'

interface ShippedItemsTableProps {
  items: OrderItem[]
}

export default function ShippedItemsTable({ items }: ShippedItemsTableProps) {
  const navigate = useNavigate()
  const { addToCart } = useCart()

  const handleBuyAgain = async (e: React.MouseEvent, item: OrderItem) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      await addToCart({ variantId: item.variantId, quantity: 1 })
      toast.success('Added to cart')
      navigate('/checkout')
    } catch (error) {
      toast.error('Failed to add to cart')
    }
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-md overflow-hidden shadow-sm">
      <div className="hidden md:grid grid-cols-[2.5fr_1fr_1fr_1.5fr] items-center gap-0 px-8 py-4 border-b border-neutral-100 text-[13px] font-black tracking-widest text-neutral-400 uppercase">
        <span>Product</span>
        <span className="text-center">Price</span>
        <span className="text-center">Quantity</span>
        <span className="text-right pr-6">Actions</span>
      </div>

      <div className="flex flex-col">
        {items.map((item) => (
          <div
            key={item.id}
            className="group relative border-b border-neutral-100 last:border-0 hover:bg-neutral-50/50 transition-colors"
          >
            <Link 
              to={`/product/${item.productId}`}
              className="grid grid-cols-1 md:grid-cols-[2.5fr_1fr_1fr_1.5fr] items-center gap-4 md:gap-0 p-6 md:px-8 md:py-6"
            >
              {/* Product Detail */}
              <div className="flex items-center gap-6">
                <div className="size-20 bg-white border border-neutral-100 rounded-md overflow-hidden flex items-center justify-center p-2 shrink-0">
                  <img
                    src={item.image || ''}
                    alt={item.productName}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex flex-col gap-0.5">
                  <h3 className="text-[15px] font-black text-black leading-tight group-hover:text-neutral-600 transition-colors">
                    {item.productName}
                  </h3>
                  <p className="text-[13px] text-neutral-400 font-bold uppercase tracking-tight">
                    Regular Variant
                  </p>
                  <span className="text-[12px] text-neutral-300 font-bold">
                    {item.id.split('-')[0].toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Price (Mobile Label) */}
              <div className="flex md:block justify-between items-center px-2">
                <span className="md:hidden text-[12px] font-black text-neutral-400 uppercase tracking-widest">
                  Price
                </span>
                <span className="text-[15px] font-black text-black md:text-center block">
                  ₹{item.price.toLocaleString()}
                </span>
              </div>

              {/* Quantity (Mobile Label) */}
              <div className="flex md:block justify-between items-center px-2">
                <span className="md:hidden text-[12px] font-black text-neutral-400 uppercase tracking-widest">
                  Quantity
                </span>
                <span className="text-[15px] font-bold text-black md:text-center block">
                  {item.quantity}
                </span>
              </div>

              {/* Actions / Buy Again */}
              <div className="flex md:block justify-between items-center px-2 md:text-right md:pr-6">
                <span className="md:hidden text-[12px] font-black text-neutral-400 uppercase tracking-widest">
                  Actions
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={(e) => handleBuyAgain(e, item)}
                  className="rounded-full font-black text-[11px] uppercase tracking-widest h-9 px-5 border-neutral-200 hover:bg-black hover:text-white transition-all"
                >
                  <RefreshCcw size={14} className="mr-2" />
                  Buy Again
                </Button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
