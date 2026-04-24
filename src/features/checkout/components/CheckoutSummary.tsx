import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/features/cart/hooks/useCart'
import { useOrders } from '@/features/order/hooks/useOrders'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

interface CheckoutSummaryProps {
  selectedAddressId: string | null
}

export default function CheckoutSummary({ selectedAddressId }: CheckoutSummaryProps) {
  const { cart, isLoading: isCartLoading, removeFromCart } = useCart()
  const { placeOrder, isPlacing } = useOrders()
  const navigate = useNavigate()

  const handlePlaceOrder = async () => {
    if (!selectedAddressId) {
      toast.error('Please select a shipping address first.')
      return
    }

    try {
      const order = await placeOrder({
        addressId: selectedAddressId,
        paymentMethod: 'COD',
      })
      toast.success('Order placed successfully!')
      navigate('/order-confirmation', { state: { orderId: order.id } })
    } catch {
      toast.error('Failed to place order.')
    }
  }

  if (isCartLoading) {
    return (
      <div className="lg:col-span-4 h-fit bg-white border border-neutral-200 rounded-md p-10 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-neutral-300" size={32} />
        <p className="text-neutral-500 font-medium italic">Summarizing order...</p>
      </div>
    )
  }

  const items = cart?.items || []
  const summary = cart?.summary || {
    totalOriginalPrice: 0,
    totalDiscount: 0,
    totalTax: 0,
    totalPayable: 0,
  }

  return (
    <div className="lg:col-span-4 h-fit sticky top-28 space-y-6">
      {/* Order Summary Items */}
      <div className="bg-white border border-neutral-200 rounded-md p-6 space-y-6 shadow-sm">
        <h2 className="text-[18px] font-bold text-black border-b border-neutral-50 pb-4">
          Order Summary
        </h2>

        <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {items.map((item) => (
            <div
              key={item.variantId}
              className="flex gap-4 pb-6 border-b border-neutral-100 last:border-0 last:pb-0"
            >
              <div className="size-20 bg-white border border-neutral-100 rounded-md overflow-hidden flex items-center justify-center p-1.5 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-[13px] font-bold text-black leading-tight">
                    {item.productName}
                  </h3>
                  <span className="text-[14px] font-bold text-black whitespace-nowrap">
                    ₹{item.pricingPerUnit.finalPrice.toLocaleString()}
                  </span>
                </div>
                <p className="text-[12px] text-neutral-400 font-medium mt-1 truncate">
                  {item.attributes || item.category}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <span className="text-[12px] font-bold text-neutral-500">
                    Qty: {item.quantity}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.variantId)}
                    className="text-[11px] font-bold text-red-500 hover:text-red-700 transition-colors uppercase tracking-wider"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Totals & Coupon */}
      <div className="bg-white border border-neutral-200 rounded-md p-6 space-y-6 shadow-sm">
        <h2 className="text-[18px] font-bold text-black">Order Total</h2>

        <div className="space-y-4">
          <div className="flex justify-between text-[14px]">
            <span className="text-neutral-500 font-medium">Subtotal</span>
            <span className="text-black font-bold">
              ₹{summary.totalOriginalPrice.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-[14px]">
            <span className="text-neutral-500 font-medium">Shipping</span>
            <span className="text-[#006D3E] font-black uppercase text-[12px]">Free</span>
          </div>
          {summary.totalDiscount > 0 && (
            <div className="flex justify-between text-[14px]">
              <span className="text-neutral-500 font-medium">Discounts</span>
              <span className="text-red-500 font-bold">
                -₹{summary.totalDiscount.toLocaleString()}
              </span>
            </div>
          )}
          <div className="flex justify-between text-[14px] pb-4 border-b border-neutral-100">
            <span className="text-neutral-500 font-medium">Tax</span>
            <span className="text-black font-bold">₹{summary.totalTax.toLocaleString()}</span>
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Coupon Code"
              className="h-10 text-[13px] rounded-sm bg-neutral-50"
            />
            <Button
              variant="black"
              className="h-10 px-6 rounded-sm text-[12px] font-black uppercase tracking-widest"
            >
              Apply
            </Button>
          </div>

          <div className="flex justify-between pt-2">
            <span className="text-[15px] font-bold text-black">Total Amount</span>
            <span className="text-[20px] font-black text-black">
              ₹{summary.totalPayable.toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3">
        <Button
          onClick={handlePlaceOrder}
          disabled={isPlacing || items.length === 0}
          variant="black"
          className="w-full h-14 rounded-sm text-[13px] font-black tracking-widest uppercase shadow-lg group relative overflow-hidden"
        >
          {isPlacing ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              Confirm Order (COD)
              <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
