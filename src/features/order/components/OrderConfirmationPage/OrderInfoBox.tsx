import type { Order } from '../../api/orders'
import { CreditCard, Wallet } from 'lucide-react'

interface OrderInfoBoxProps {
  order: Order
}

export default function OrderInfoBox({ order }: OrderInfoBoxProps) {
  const { address } = order

  return (
    <div className="bg-white border border-neutral-200 rounded-md p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 shadow-sm">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[13px] font-bold text-neutral-500 uppercase tracking-widest">
            Contact Details
          </h3>
          <span className="text-[15px] font-bold text-black tracking-tight">
            {address.fullName}
          </span>
          <span className="text-[13px] text-neutral-400 font-medium">{address.phone}</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <h3 className="text-[13px] font-bold text-neutral-500 uppercase tracking-widest">
            Shipping Address
          </h3>
          <div className="flex flex-col gap-0.5">
            <span className="text-[15px] font-bold text-black tracking-tight">
              {address.street}
            </span>
            <span className="text-[15px] font-bold text-black tracking-tight">
              {address.city}, {address.state} {address.pincode}
            </span>
            <span className="text-[15px] font-bold text-black tracking-tight">India</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[13px] font-bold text-neutral-500 uppercase tracking-widest">
            Shipping Method
          </h3>
          <span className="text-[15px] font-bold text-black tracking-tight">Standard Delivery</span>
          <span className="text-[13px] text-neutral-400 font-medium">Est. 3-5 Business Days</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <h3 className="text-[13px] font-bold text-neutral-500 uppercase tracking-widest">
            Payment Method
          </h3>
          <div className="flex items-center gap-3 mt-1 px-3 py-2 border border-neutral-100 rounded-sm bg-neutral-50 w-fit">
            {order.paymentMethod === 'COD' ? (
              <>
                <Wallet size={16} className="text-neutral-400" />
                <span className="text-[14px] font-bold text-black tracking-tight">
                  Cash on Delivery
                </span>
              </>
            ) : (
              <>
                <CreditCard size={16} className="text-neutral-400" />
                <span className="text-[14px] font-bold text-black tracking-tight">
                  Online Payment
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
