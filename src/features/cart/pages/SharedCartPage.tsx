import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { getSharedCart } from '../api/cart'
import { useCart } from '../hooks/useCart'
import { Button } from '@/components/ui/button'
import { Loader2, ShoppingBag, ArrowLeft, Plus } from 'lucide-react'
import { toast } from 'sonner'
import { isAxiosError } from 'axios'
import type { SharedCartData, SharedCartItem } from '../api/cart'

export default function SharedCartPage() {
  const { shareId } = useParams<{ shareId: string }>()
  const [sharedData, setSharedData] = useState<SharedCartData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { addToCart } = useCart()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchShared = async () => {
      try {
        if (!shareId) return
        const data = await getSharedCart(shareId)
        setSharedData(data)
      } catch (error: unknown) {
        if (isAxiosError<{ message?: string }>(error)) {
          toast.error(error.response?.data?.message || 'Failed to load shared bag.')
        } else {
          toast.error('Failed to load shared bag.')
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchShared()
  }, [shareId])

  const handleAddAll = async () => {
    try {
      const items = sharedData!.items || []
      for (const item of items) {
        await addToCart({ variantId: item.variantId, quantity: item.quantity })
      }
      toast.success('All items added to your bag!')
      navigate('/cart')
    } catch {
      toast.error('Failed to add some items to your bag.')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <Loader2 className="size-12 animate-spin text-neutral-200" />
        <p className="text-neutral-500 font-medium italic">Loading shared bag contents...</p>
      </div>
    )
  }

  if (!sharedData) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <div className="size-20 bg-neutral-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={32} className="text-neutral-300" />
        </div>
        <h1 className="text-[24px] font-bold text-black mb-2">Link Invalid or Expired</h1>
        <p className="text-neutral-500 max-w-xs mb-8">
          This shared shopping bag link is no longer available.
        </p>
        <Button
          onClick={() => navigate('/products')}
          variant="black"
          className="rounded-sm px-10 h-12 uppercase tracking-widest text-[12px] font-black"
        >
          Browse Products
        </Button>
      </div>
    )
  }

  const items = sharedData.items || []

  return (
    <div className="max-w-360 mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-20 min-h-screen">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[13px] font-bold text-neutral-400 hover:text-black transition-colors mb-10 group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back
      </button>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 pb-6 border-b border-neutral-100">
        <div className="space-y-2">
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-neutral-400 bg-neutral-50 px-3 py-1 rounded-full">
            Shared Selection
          </span>
          <h1 className="text-[32px] md:text-[40px] font-black text-black tracking-tighter">
            Someone shared a bag with you
          </h1>
        </div>

        <Button
          onClick={handleAddAll}
          className="bg-black hover:bg-neutral-800 text-white rounded-sm h-14 px-10 font-black uppercase tracking-widest shadow-xl flex items-center gap-2 group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
          Add All to My Bag
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item: SharedCartItem) => (
          <Link
            to={`/product/${item.productId}`}
            key={item.variantId}
            className="group bg-white border border-neutral-100 rounded-sm p-6 flex items-start gap-4 hover:border-neutral-300 hover:shadow-lg transition-all duration-300"
          >
            <div className="size-24 bg-neutral-50 rounded-sm overflow-hidden flex-shrink-0 flex items-center justify-center p-2">
              <img
                src={item.image}
                alt={item.productName}
                className="h-full w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="flex-1 min-w-0 pt-1">
              <h3 className="font-bold text-black text-[15px] leading-snug mb-1 truncate group-hover:text-neutral-600 transition-colors">
                {item.productName}
              </h3>
              <p className="text-[13px] text-neutral-400 font-medium mb-3">
                Quantity: <span className="text-black font-bold">{item.quantity}</span>
              </p>
              <p className="text-[16px] font-black text-black">₹{item.price.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
