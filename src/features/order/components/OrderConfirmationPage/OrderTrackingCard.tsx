import { Download, Package, Truck, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Order } from '../../api/orders'
import { generateInvoicePDF } from '@/lib/invoice'


interface OrderTrackingCardProps {
  order: Order
}

export default function OrderTrackingCard({ order }: OrderTrackingCardProps) {
  const status = order.status

  const steps = [
    { label: 'Order Placed', icon: Check, completed: true, active: status === 'PENDING' },
    {
      label: 'Confirmed',
      icon: Package,
      completed: ['CONFIRMED', 'PROCESSING', 'SHIPPED', 'DELIVERED'].includes(status),
      active: status === 'CONFIRMED' || status === 'PROCESSING',
    },
    {
      label: 'Shipped',
      icon: Truck,
      completed: ['SHIPPED', 'DELIVERED'].includes(status),
      active: status === 'SHIPPED',
    },
    {
      label: 'Delivered',
      icon: Check,
      completed: status === 'DELIVERED',
      active: status === 'DELIVERED',
    },
  ]

  return (
    <div className="bg-white border border-neutral-200 rounded-md p-6 md:p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div className="flex flex-col gap-1">
          <h3 className="text-[14px] font-bold text-neutral-500 uppercase tracking-widest">
            Order Number
          </h3>
          <span className="text-[17px] font-black text-black">#{order.orderNumber}</span>
        </div>
        <Button
          variant="black"
          className="h-10 px-6 rounded-sm text-[13px] font-bold tracking-tight"
          onClick={() => generateInvoicePDF(order)}
        >
          <Download size={16} className="mr-2" />
          Download Invoice
        </Button>

      </div>

      <div className="relative pt-6 pb-4">
        {/* Progress Line */}
        <div className="absolute top-[42px] left-[12.5%] right-[12.5%] h-0.5 bg-neutral-100" />

        <div
          className="absolute top-[42px] left-[12.5%] h-0.5 bg-green-500 transition-all duration-1000"
          style={{
            width:
              status === 'PENDING'
                ? '0%'
                : status === 'CONFIRMED' || status === 'PROCESSING'
                  ? '33%'
                  : status === 'SHIPPED'
                    ? '66%'
                    : status === 'DELIVERED'
                      ? '75%'
                      : '0%',
          }}
        />

        <div className="grid grid-cols-4 gap-0 relative z-10">
          {steps.map((step) => (
            <div key={step.label} className="flex flex-col items-center gap-4 group">
              <div
                className={cn(
                  'size-10 rounded-full flex items-center justify-center transition-all duration-300',
                  step.completed
                    ? 'bg-green-500 text-white'
                    : step.active
                      ? 'bg-black text-white'
                      : 'bg-neutral-100 text-neutral-400 border-2 border-white'
                )}
              >
                <step.icon size={18} strokeWidth={step.completed ? 3 : 2} />
              </div>
              <span
                className={cn(
                  'text-[10px] md:text-[12px] font-black text-center uppercase tracking-tight max-w-[80px]',
                  step.active || step.completed ? 'text-black' : 'text-neutral-400'
                )}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4">
        <div className="flex flex-col gap-0.5">
          <span className="text-[12px] font-bold text-neutral-400 uppercase tracking-widest">
            Current Status
          </span>
          <span className="text-[16px] font-black text-black">{status.replace('_', ' ')}</span>
        </div>
        <div className="flex flex-col md:items-end gap-0.5 text-right w-full md:w-auto">
          <span className="text-[12px] font-bold text-neutral-400 uppercase tracking-widest">
            Order Date
          </span>
          <span className="text-[16px] font-black text-black">
            {new Date(order.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>

    </div>
  )
}
