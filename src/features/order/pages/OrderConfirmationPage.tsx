import OrderConfirmationHeader from '../components/OrderConfirmationPage/OrderConfirmationHeader'
import OrderTrackingCard from '../components/OrderConfirmationPage/OrderTrackingCard'
import OrderInfoBox from '../components/OrderConfirmationPage/OrderInfoBox'
import ShippedItemsTable from '../components/OrderConfirmationPage/ShippedItemsTable'
import { Button } from '@/components/ui/button'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useOrder } from '../hooks/useOrders'
import { Loader2, AlertCircle } from 'lucide-react'

export default function OrderConfirmationPage() {
  const location = useLocation()
  const params = useParams()
  const orderId = location.state?.orderId || params.orderId
  const { data: order, isLoading, isError } = useOrder(orderId)

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-neutral-300" size={48} />
        <p className="text-neutral-500 font-medium animate-pulse">Fetching your order details...</p>
      </div>
    )
  }

  if (isError || !order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="size-20 rounded-full bg-red-50 flex items-center justify-center text-red-500">
          <AlertCircle size={40} />
        </div>
        <div className="space-y-2">
          <h2 className="text-[24px] font-bold text-black">Order Not Found</h2>
          <p className="text-neutral-500 max-w-md">
            We couldn't find the details for this order. It might still be processing or the link is
            invalid.
          </p>
        </div>
        <Link to="/profile/orders">
          <Button
            variant="black"
            className="h-12 px-8 rounded-sm text-[13px] font-black uppercase tracking-widest"
          >
            View My Orders
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-360 mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16 min-h-screen">
      <OrderConfirmationHeader />

      <div className="max-w-4xl mx-auto space-y-12 md:space-y-16">
        {/* Order Tracking Section */}
        <section className="space-y-6">
          <h2 className="text-[20px] md:text-[24px] font-black text-black">Order Tracking</h2>
          <OrderTrackingCard order={order} />
        </section>

        {/* Order Details Section */}
        <section className="space-y-6">
          <h2 className="text-[20px] md:text-[24px] font-black text-black">Order Details</h2>
          <OrderInfoBox order={order} />
        </section>

        {/* Items Shipped Section */}
        <section className="space-y-6">
          <h2 className="text-[20px] md:text-[24px] font-black text-black">Items Shipped</h2>
          <ShippedItemsTable items={order.items} />
        </section>

        {/* Footer Actions */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 md:pt-14">
          <p className="text-[14px] md:text-[16px] text-black font-bold">
            Need Help ?{' '}
            <Link
              to="/contact"
              className="underline underline-offset-4 hover:text-neutral-600 transition-colors"
            >
              Contact Us
            </Link>
          </p>
          <Link to="/products">
            <Button
              variant="black"
              className="h-12 px-10 rounded-sm text-[13px] font-black tracking-widest uppercase shadow-lg"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
