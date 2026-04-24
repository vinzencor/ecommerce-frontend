import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { CheckCircle2, Clock, XCircle, ArrowRight, Loader2 } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useOrders } from '@/features/order/hooks/useOrders'

const StatusBadge = ({ status }: { status: string }) => {
  switch (status) {
    case 'PENDING':
    case 'CONFIRMED':
      return (
        <Badge className="bg-[#FFF4E5] text-[#B76E00] border-[#FFF4E5] font-bold text-[10px] gap-1.5 px-3 py-1.5 rounded-sm uppercase tracking-wider">
          <Clock size={12} strokeWidth={3} />
          {status}
        </Badge>
      )
    case 'SHIPPED':
    case 'DELIVERED':
      return (
        <Badge className="bg-[#B9F5D8] text-[#006D3E] border-[#B9F5D8] font-bold text-[10px] gap-1.5 px-3 py-1.5 rounded-sm uppercase tracking-wider">
          <CheckCircle2 size={12} strokeWidth={3} />
          {status}
        </Badge>
      )
    case 'CANCELLED':
      return (
        <Badge className="bg-[#FFD9D9] text-[#900B0B] border-[#FFD9D9] font-bold text-[10px] gap-1.5 px-3 py-1.5 rounded-sm uppercase tracking-wider">
          <XCircle size={12} strokeWidth={3} />
          {status}
        </Badge>
      )
    default:
      return null
  }
}

export default function OrderHistoryTable() {
  const { orders, isLoading } = useOrders()

  if (isLoading) {
    return (
      <div className="py-20 flex flex-col items-center justify-center gap-4">
        <Loader2 className="animate-spin text-neutral-300 size-10" />
        <p className="text-neutral-500 font-medium italic">Fetching your order history...</p>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="py-24 flex flex-col items-center justify-center text-center bg-neutral-50/50 rounded-lg border-2 border-dashed border-neutral-100">
        <p className="text-neutral-500 font-medium">No orders found.</p>
      </div>
    )
  }

  return (
    <div className="bg-white border border-neutral-200 shadow-sm overflow-x-auto">
      <Table className="min-w-[800px] border-collapse">
        <TableHeader className="bg-neutral-50/50">
          <TableRow className="hover:bg-transparent border-neutral-200">
            <TableHead className="text-[11px] font-black text-black uppercase tracking-widest pl-6">
              Order no
            </TableHead>
            <TableHead className="text-[11px] font-black text-black uppercase tracking-widest">
              Items
            </TableHead>
            <TableHead className="text-[11px] font-black text-black uppercase tracking-widest text-center">
              Status
            </TableHead>
            <TableHead className="text-[11px] font-black text-black uppercase tracking-widest">
              Date
            </TableHead>
            <TableHead className="text-[11px] font-black text-black uppercase tracking-widest">
              Price
            </TableHead>
            <TableHead className="text-[11px] font-black text-black uppercase tracking-widest text-right pr-6">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => {
            const firstItem = order.items[0]
            return (
              <TableRow
                key={order.id}
                className="border-neutral-200 hover:bg-neutral-50/30 transition-colors h-24"
              >
                <TableCell className="font-bold text-[14px] text-black pl-6">
                  #{order.orderNumber}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-8 bg-neutral-100 rounded-sm overflow-hidden flex-shrink-0">
                      {firstItem?.image && (
                        <img
                          src={firstItem.image}
                          alt={firstItem.productName}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[14px] font-black text-black truncate max-w-[150px]">
                        {firstItem?.productName || 'Multiple Items'}
                      </span>
                      {order.items.length > 1 && (
                        <span className="text-[10px] text-neutral-400 font-bold uppercase">
                          + {order.items.length - 1} more items
                        </span>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex justify-center">
                    <StatusBadge status={order.status} />
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-[13px] font-bold text-black">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>
                </TableCell>
                <TableCell className="text-[14px] font-bold text-black">
                  ₹{order.totalAmount.toLocaleString()}
                </TableCell>
                <TableCell className="text-right pr-6">
                  <Link
                    to={`/profile/orders/${order.id}`}
                    className="inline-flex items-center gap-1 text-[13px] font-black text-black hover:gap-2 transition-all group"
                  >
                    View Details
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform"
                    />
                  </Link>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
