import ProfileSidebar from '../components/ProfileSidebar'
import { useQuery } from '@tanstack/react-query'
import api from '@/lib/axios'
import { Loader2, UserPlus, Copy, Share2, Users, TrendingUp } from 'lucide-react'
import { toast } from 'sonner'
import { useAuth } from '@/features/auth/hooks/useAuth'

export default function ReferralsPage() {
  const { user } = useAuth()
  const { data: response, isLoading } = useQuery({
    queryKey: ['my-referrals'],
    queryFn: async () => {
      const res = await api.get('/referrals/my-referrals')
      return res.data
    }
  })

  const referrals = response?.data || []
  // @ts-ignore
  const referralCode = user?.referralCode || 'REF' + (user?.id?.substring(0, 6).toUpperCase() || '')


  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralCode)
    toast.success('Referral code copied!')
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 lg:px-20 py-8 md:py-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-16">
          <div className="space-y-2 md:space-y-3">
            <h1 className="text-[32px] md:text-[48px] font-black text-[#291F1F] tracking-tight leading-none">
              Refer & Earn
            </h1>
            <p className="text-[14px] md:text-[18px] text-[#666] font-medium max-w-[500px]">
              Invite your friends to shop and earn rewards for every successful referral.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-20 items-start">
          <aside className="w-full lg:col-span-3 sticky top-8">
            <ProfileSidebar />
          </aside>

          <main className="w-full lg:col-span-9 space-y-12">
            {/* Referral Card */}
            <div className="bg-[#505081] rounded-[40px] p-8 md:p-16 text-white relative overflow-hidden">
               <div className="relative z-10">
                  <div className="bg-white/10 size-16 rounded-[24px] flex items-center justify-center mb-8">
                    <UserPlus className="size-8 text-white" />
                  </div>
                  <h2 className="text-[32px] md:text-[40px] font-black leading-tight mb-4">
                    Earn 100 Coins for <br/> every friend you invite
                  </h2>
                  <p className="text-white/70 text-lg mb-10 max-w-md">
                    Your friend gets a 10% discount on their first order, and you get coins once they complete their purchase.
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch gap-4 max-w-md">
                    <div className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 flex items-center justify-between h-14">
                      <span className="font-black tracking-widest text-lg uppercase">{referralCode}</span>
                      <button onClick={copyToClipboard} className="text-white/60 hover:text-white transition-colors">
                        <Copy size={20} />
                      </button>
                    </div>
                    <button className="bg-white text-[#505081] px-10 h-14 rounded-2xl font-black text-sm uppercase tracking-widest hover:opacity-90 transition-all flex items-center justify-center gap-2">
                      <Share2 size={18} />
                      Share
                    </button>
                  </div>
               </div>
               
               {/* Decorative Circles */}
               <div className="absolute -top-24 -right-24 size-96 bg-white/5 rounded-full blur-3xl" />
               <div className="absolute -bottom-24 -left-24 size-96 bg-[#291F1F]/20 rounded-full blur-3xl" />
            </div>

            {/* Referral Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-[32px] border border-[#EDEDFD] p-10 flex items-center gap-8">
                <div className="bg-[#F5F5F5] size-16 rounded-[24px] flex items-center justify-center shrink-0">
                  <Users className="size-8 text-[#505081]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#999] uppercase tracking-widest mb-1">Total Referrals</p>
                  <h3 className="text-3xl font-black text-[#291F1F]">{referrals.length}</h3>
                </div>
              </div>
              <div className="bg-white rounded-[32px] border border-[#EDEDFD] p-10 flex items-center gap-8">
                <div className="bg-[#F5F5F5] size-16 rounded-[24px] flex items-center justify-center shrink-0">
                  <TrendingUp className="size-8 text-[#505081]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-[#999] uppercase tracking-widest mb-1">Total Earned</p>
                  <h3 className="text-3xl font-black text-[#291F1F]">0 <span className="text-sm text-[#666]">Coins</span></h3>
                </div>
              </div>
            </div>

            {/* History Table */}
            <div className="bg-white rounded-[40px] border border-[#EDEDFD] p-8 md:p-12 shadow-sm">
              <h3 className="text-2xl font-black text-[#291F1F] mb-10">Your Referrals</h3>
              
              {isLoading ? (
                <div className="h-64 flex items-center justify-center">
                  <Loader2 className="size-10 animate-spin text-[#505081]" />
                </div>
              ) : referrals.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-[#999] font-medium">You haven't referred anyone yet.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                   <table className="w-full">
                      <thead className="text-left border-b border-[#F5F5F5]">
                         <tr className="text-xs font-black text-[#999] uppercase tracking-widest">
                            <th className="pb-6 px-4">User</th>
                            <th className="pb-6 px-4">Date</th>
                            <th className="pb-6 px-4">Status</th>
                            <th className="pb-6 px-4 text-right">Reward</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-[#F5F5F5]">
                         {referrals.map((ref: any) => (
                            <tr key={ref.id} className="text-[#291F1F] font-medium group">
                               <td className="py-6 px-4 font-bold">{ref.referred?.name || 'User'}</td>
                               <td className="py-6 px-4 text-[#999]">{new Date(ref.createdAt).toLocaleDateString()}</td>
                               <td className="py-6 px-4">
                                  <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                    ref.status === 'SUCCESSFUL' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                                  }`}>
                                    {ref.status}
                                  </span>
                               </td>
                               <td className="py-6 px-4 text-right font-black text-lg">
                                  {ref.rewardAmount ? `+${ref.rewardAmount}` : '-'}
                               </td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
