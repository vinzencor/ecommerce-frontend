import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ShippingOption {
  id: string
  name: string
  time: string
  price: number
}

const SHIPPING_OPTIONS: ShippingOption[] = [
  { id: 'free', name: 'Free Shipping', time: '7-10 Days', price: 0 },
  { id: 'express', name: 'Express Shipping', time: '1-3 Days', price: 50 },
]

export default function ShippingMethods() {
  const [selected, setSelected] = useState('free')

  return (
    <div className="bg-white border border-neutral-200 rounded-md p-6 md:p-8 space-y-6">
      <h2 className="text-[18px] font-bold text-black">Shipping Method</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SHIPPING_OPTIONS.map((option) => (
          <div
            key={option.id}
            onClick={() => setSelected(option.id)}
            className={cn(
              'relative flex items-center justify-between p-4 border rounded-md cursor-pointer transition-all duration-300',
              selected === option.id
                ? 'border-black bg-neutral-50 shadow-sm'
                : 'border-neutral-200 hover:border-neutral-300'
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  'size-4 rounded-full border flex items-center justify-center transition-all',
                  selected === option.id ? 'border-black bg-black' : 'border-neutral-300'
                )}
              >
                {selected === option.id && <div className="size-1.5 rounded-full bg-white" />}
              </div>
              <div className="flex flex-col">
                <span className="text-[14px] font-bold text-black">{option.name}</span>
                <span className="text-[12px] text-neutral-500 font-medium">{option.time}</span>
              </div>
            </div>
            <span className="text-[14px] font-bold text-black">₹{option.price}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
