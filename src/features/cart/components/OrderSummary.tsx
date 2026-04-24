import { Button } from '@/components/ui/button'

import { Link } from 'react-router-dom'

interface OrderSummaryProps {
  subtotal: number
  promotions: number
  total: number
}

export default function OrderSummary({ subtotal, promotions, total }: OrderSummaryProps) {
  return (
    <div className="lg:col-span-4 h-fit sticky top-28 flex flex-col gap-6">
      <div className="bg-white border border-neutral-200 rounded-md p-6 md:p-8 shadow-sm transition-all duration-300">
        <h2 className="text-[18px] font-bold text-black mb-6">Order Total</h2>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-[14px]">
            <span className="text-neutral-500 font-medium">Subtotal:</span>
            <span className="text-black font-bold">₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-[14px]">
            <span className="text-neutral-500 font-medium">Shipping:</span>
            <span className="text-black font-normal">Free</span>
          </div>
          <div className="flex justify-between items-center text-[14px] pb-4 border-b border-neutral-100">
            <span className="text-neutral-500 font-medium">Promotions Applied:</span>
            <span className="text-black font-bold">₹{promotions.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-[14px] font-medium text-black">Total:</span>
            <span className="text-[15px] font-bold text-black">₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Link to="/checkout" className="w-full">
        <Button
          variant="black"
          className="w-full h-12 rounded-sm text-[13px] tracking-wide shadow-md uppercase font-black"
        >
          Check Out
        </Button>
      </Link>

      <p className="text-center text-[11px] text-neutral-400 font-normal">
        Taxes and shipping calculated at checkout.
      </p>
    </div>
  )
}
