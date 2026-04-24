import { useMemo, useState } from 'react'
import CartItem from '../components/CartItem'
import OrderSummary from '../components/OrderSummary'
import EmptyCart from '../components/EmptyCart'
import { YouMayAlsoLike } from '../components/YouMayAlsoLike'
import { useCart } from '../hooks/useCart'
import { Loader2, Share2, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import type { CartListItem } from '../api/cart'

export default function CartPage() {
  const { items, summary, isLoading, removeFromCart, addToCart, shareCart, isSharing } = useCart()
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    try {
      const result = await shareCart()
      await navigator.clipboard.writeText(result.url)
      setCopied(true)
      toast.success('Cart link copied to clipboard!')
      setTimeout(() => setCopied(false), 3000)
    } catch {
      toast.error('Failed to generate sharing link.')
    }
  }

  const cartItemsData = useMemo(() => {
    return (items || []).map((item: CartListItem) => ({
      id: item.variantId,
      name: item.productName,
      variant: item.attributes ?? '',
      price: item.pricingPerUnit.originalPrice,
      quantity: item.quantity,
      image: item.image,
    }))
  }, [items])

  const subtotal = summary?.totalOriginalPrice || 0
  const total = summary?.totalPayable || 0
  const promotions = summary?.totalDiscount || 0

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="size-10 animate-spin text-neutral-300" />
        <p className="text-neutral-500 font-medium italic">Fetching your bag...</p>
      </div>
    )
  }

  if (cartItemsData.length === 0) {
    return <EmptyCart />
  }

  return (
    <div className="container mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16 max-w-360">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 md:mb-14">
        <h1 className="text-[26px] md:text-[30px] font-black text-black uppercase tracking-tight">
          My Shopping Bag
        </h1>

        <Button
          variant="outline"
          onClick={handleShare}
          disabled={isSharing}
          className="h-11 px-6 rounded-sm border-neutral-200 text-[12px] font-black uppercase tracking-widest gap-2 hover:bg-black hover:text-white transition-all shadow-sm"
        >
          {isSharing ? (
            <Loader2 className="animate-spin size-4" />
          ) : copied ? (
            <Check size={14} className="text-green-500" />
          ) : (
            <Share2 size={14} />
          )}
          {copied ? 'Link Copied' : 'Share Bag'}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14">
        {/* Cart Items List - Outlined Table Container */}
        <div className="lg:col-span-8 flex flex-col h-fit border border-neutral-200 rounded-md overflow-hidden bg-white shadow-sm">
          <div className="hidden md:grid grid-cols-[2fr_1fr_1.5fr_1fr_0.5fr] items-center gap-0 px-2 py-4 border-b border-neutral-100 text-[11px] font-black tracking-widest text-neutral-400 uppercase">
            <span className="text-center">Product</span>
            <span className="text-center pr-3">Price</span>
            <span className="text-center pr-2">Quantity</span>
            <span className="text-center">Subtotal</span>
            <span className="w-16"></span>
          </div>

          <div className="flex flex-col">
            {cartItemsData.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={(id, delta) => {
                  if (delta > 0) addToCart({ variantId: id, quantity: 1 })
                  else {
                    // Decrement logic here
                  }
                }}
                onRemove={(id) => removeFromCart(id)}
              />
            ))}
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <OrderSummary subtotal={subtotal} promotions={promotions} total={total} />
      </div>

      {/* Recommendations */}
      <div className="mt-20 border-t border-neutral-100 pt-20">
        <YouMayAlsoLike />
      </div>
    </div>
  )
}
