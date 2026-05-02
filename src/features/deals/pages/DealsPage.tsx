import { useDeals } from '../hooks/useDeals'
import SellerCard from '@/components/common/cards/SellerCard'
import { mapDealToSellerCard } from '@/lib/mapping'
import { Timer, Zap, Percent, ShoppingBag } from 'lucide-react'

export default function DealsPage() {
  const { data: deals, isLoading } = useDeals()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="size-12 border-4 border-[#EDEDFD] rounded-full" />
            <div className="size-12 border-4 border-t-[#505081] border-transparent rounded-full animate-spin absolute inset-0" />
          </div>
          <span className="text-[15px] text-[#666] font-bold animate-pulse">
            Fetching exclusive deals...
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Premium Deals Header */}
      <div className="bg-black text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-[-10%] left-[-5%] size-[400px] bg-white rounded-full blur-[100px]" />
          <div className="absolute bottom-[-10%] right-[-5%] size-[300px] bg-white rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-[1400px] mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6 border border-white/20 backdrop-blur-sm">
            <Timer size={16} className="text-white" />
            <span className="text-[12px] font-black tracking-widest uppercase">Limited Time Offers</span>
          </div>
          <h1 className="text-[40px] md:text-[64px] font-black mb-6 leading-tight tracking-tighter">
            DEALS OF THE DAY
          </h1>
          <p className="text-neutral-400 text-[16px] md:text-[18px] max-w-2xl mx-auto font-medium leading-relaxed">
            Grab the best offers of the day before they're gone! Premium products at prices you'll love.
          </p>
        </div>
      </div>

      {/* Deals Features */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-neutral-100 flex items-center gap-5">
            <div className="size-14 bg-red-50 text-red-500 rounded-full flex items-center justify-center shrink-0">
              <Percent size={24} />
            </div>
            <div>
              <h3 className="font-black text-[16px]">Huge Discounts</h3>
              <p className="text-neutral-400 text-[13px] font-bold">Up to 70% off today</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-neutral-100 flex items-center gap-5">
            <div className="size-14 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center shrink-0">
              <Zap size={24} />
            </div>
            <div>
              <h3 className="font-black text-[16px]">Flash Sales</h3>
              <p className="text-neutral-400 text-[13px] font-bold">New deals every 24h</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-neutral-100 flex items-center gap-5">
            <div className="size-14 bg-green-50 text-green-600 rounded-full flex items-center justify-center shrink-0">
              <ShoppingBag size={24} />
            </div>
            <div>
              <h3 className="font-black text-[16px]">Quality Guaranteed</h3>
              <p className="text-neutral-400 text-[13px] font-bold">100% genuine products</p>
            </div>
          </div>
        </div>
      </div>

      {/* Deals Grid */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16 mt-20">
        {deals && deals.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {deals.map((deal) => (
              <SellerCard
                key={deal.id}
                {...mapDealToSellerCard(deal)}
                className="w-full hover:-translate-y-2 transition-all duration-300"
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-neutral-50 rounded-[40px] border border-neutral-100">
            <div className="size-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-neutral-100">
              <ShoppingBag size={32} className="text-neutral-300" />
            </div>
            <h2 className="text-2xl font-black text-black mb-2 uppercase">No active deals</h2>
            <p className="text-neutral-400 font-bold tracking-tight">Check back tomorrow for exciting new offers!</p>
          </div>
        )}
      </div>
    </div>
  )
}
