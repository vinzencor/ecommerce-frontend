import ProfileSidebar from '../components/ProfileSidebar'

import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import { Loader2, Gift, History, TrendingUp, Wallet, Plus } from 'lucide-react'


export default function RewardsPage() {
  const { data: response, isLoading } = useQuery({
    queryKey: ['my-rewards'],
    queryFn: async () => {
      const res = await api.get('/rewards/my-rewards')
      return res.data
    }
  })

  const rewards = response?.data || []
  const totalCoins = rewards.reduce((acc: number, curr: any) => acc + (curr.type === 'COIN' ? curr.amount : 0), 0)

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 lg:px-20 py-8 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-16">
          <div className="space-y-2 md:space-y-3">
            <h1 className="text-[32px] md:text-[48px] font-black text-[#291F1F] tracking-tight leading-none">
              Rewards
            </h1>
            <p className="text-[14px] md:text-[18px] text-[#666] font-medium max-w-[500px]">
              Check your earned rewards, coins, and benefits here.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-20 items-start">
          <aside className="w-full lg:col-span-3 sticky top-8">
            <ProfileSidebar />
          </aside>

          <main className="w-full lg:col-span-9 space-y-12">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-[#F5F5F5] p-8 rounded-[32px] border border-[#EDEDFD] relative overflow-hidden group">
                <div className="bg-white/50 size-12 rounded-2xl flex items-center justify-center mb-4">
                  <TrendingUp className="size-6 text-[#505081]" />
                </div>
                <p className="text-[12px] font-black text-[#999] uppercase tracking-widest mb-1">Total Earned</p>
                <h3 className="text-3xl font-black text-[#291F1F]">{totalCoins} <span className="text-[16px] text-[#666]">Coins</span></h3>
              </div>
              <div className="bg-[#505081] p-8 rounded-[32px] relative overflow-hidden group">
                <div className="bg-white/10 size-12 rounded-2xl flex items-center justify-center mb-4">
                  <Wallet className="size-6 text-white" />
                </div>
                <p className="text-[12px] font-black text-white/60 uppercase tracking-widest mb-1">Balance</p>
                <h3 className="text-3xl font-black text-white">{totalCoins} <span className="text-[16px] text-white/70">Coins</span></h3>
              </div>
              <div className="bg-[#F5F5F5] p-8 rounded-[32px] border border-[#EDEDFD] relative overflow-hidden group">
                <div className="bg-white/50 size-12 rounded-2xl flex items-center justify-center mb-4">
                  <Gift className="size-6 text-[#505081]" />
                </div>
                <p className="text-[12px] font-black text-[#999] uppercase tracking-widest mb-1">Vouchers</p>
                <h3 className="text-3xl font-black text-[#291F1F]">0</h3>
              </div>
            </div>

            {/* History */}
            <div className="bg-white rounded-[40px] border border-[#EDEDFD] p-8 md:p-12 shadow-sm">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-[#F5F5F5] rounded-2xl">
                  <History className="size-6 text-[#505081]" />
                </div>
                <h2 className="text-2xl font-black text-[#291F1F]">Reward History</h2>
              </div>

              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <Loader2 className="size-10 animate-spin text-[#505081]" />
                </div>
              ) : rewards.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-[#999] font-medium">No rewards earned yet.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {rewards.map((reward: any) => (
                    <div key={reward.id} className="flex items-center justify-between py-4 border-b border-[#F5F5F5] last:border-0">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center">
                          <Plus size={20} />
                        </div>
                        <div>
                          <h4 className="font-bold text-[#291F1F]">{reward.description || 'Reward Earned'}</h4>
                          <p className="text-xs text-[#999] font-medium">{new Date(reward.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>
                      <div className="text-lg font-black text-green-600">
                        +{reward.amount} {reward.type}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
