import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

export default function PaymentMethods() {
  const [method, setMethod] = useState('card')

  return (
    <div className="bg-white border border-neutral-200 rounded-md p-6 md:p-8 space-y-6">
      <h2 className="text-[18px] font-bold text-black">Payment Method</h2>

      <div className="space-y-4">
        {/* Credit/Debit Card */}
        <div
          className={cn(
            'border rounded-md transition-all',
            method === 'card' ? 'border-black shadow-sm' : 'border-neutral-200'
          )}
        >
          <div
            onClick={() => setMethod('card')}
            className="flex items-center gap-3 p-4 cursor-pointer"
          >
            <div
              className={cn(
                'size-4 rounded-full border flex items-center justify-center',
                method === 'card' ? 'border-black bg-black' : 'border-neutral-300'
              )}
            >
              {method === 'card' && <div className="size-1.5 rounded-full bg-white shadow-sm" />}
            </div>
            <span className="text-[14px] font-bold text-black">Credit or Debit card</span>
          </div>

          {method === 'card' && (
            <div className="p-4 pt-0 border-t border-neutral-100 space-y-4 bg-neutral-50/30">
              <div className="space-y-2 relative pt-4">
                <label className="text-[12px] font-bold text-neutral-500 uppercase tracking-tight">
                  Card Number
                </label>
                <div className="relative group">
                  <Input placeholder="1234 1234 1234 1234" className="pr-14" />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-10 bg-white border border-neutral-200 rounded-sm flex items-center justify-center overflow-hidden">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png"
                      alt="Visa"
                      className="h-2.5 opacity-80"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-neutral-500 uppercase">
                    Expiry Date
                  </label>
                  <Input placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <label className="text-[12px] font-bold text-neutral-500 uppercase">CCV</label>
                  <Input placeholder="123" />
                </div>
              </div>

              <div className="space-y-2 pb-2">
                <label className="text-[12px] font-bold text-neutral-500 uppercase">
                  Name on card
                </label>
                <Input placeholder="Adam" />
              </div>
            </div>
          )}
        </div>

        {/* Scan & Pay with UPI */}
        <div
          onClick={() => setMethod('upi')}
          className={cn(
            'flex items-center gap-3 p-4 border rounded-md cursor-pointer transition-all',
            method === 'upi'
              ? 'border-black bg-neutral-50 shadow-sm'
              : 'border-neutral-200 hover:border-neutral-300'
          )}
        >
          <div
            className={cn(
              'size-4 rounded-full border flex items-center justify-center',
              method === 'upi' ? 'border-black bg-black' : 'border-neutral-300'
            )}
          >
            {method === 'upi' && <div className="size-1.5 rounded-full bg-white" />}
          </div>
          <span className="text-[14px] font-bold text-black">Scan & Pay with UPI</span>
        </div>

        {/* COD */}
        <div
          onClick={() => setMethod('cod')}
          className={cn(
            'flex items-center gap-3 p-4 border rounded-md cursor-pointer transition-all',
            method === 'cod'
              ? 'border-black bg-neutral-50 shadow-sm'
              : 'border-neutral-200 hover:border-neutral-300'
          )}
        >
          <div
            className={cn(
              'size-4 rounded-full border flex items-center justify-center',
              method === 'cod' ? 'border-black bg-black' : 'border-neutral-300'
            )}
          >
            {method === 'cod' && <div className="size-1.5 rounded-full bg-white" />}
          </div>
          <span className="text-[14px] font-bold text-black">Cash on Delivery/Pay on Delivery</span>
        </div>
      </div>
    </div>
  )
}
