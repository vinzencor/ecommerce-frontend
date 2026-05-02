import { User, ShoppingBag, Heart, MapPin, CreditCard, Bell, Shield, LogOut, HelpCircle, Gift, UserPlus } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { icon: User, label: 'Profile Settings', href: '/profile' },
  { icon: ShoppingBag, label: 'Orders', href: '/profile/orders' },
  { icon: Heart, label: 'Wishlist', href: '/wishlist' },
  { icon: MapPin, label: 'Addresses', href: '/profile/addresses' },
  { icon: CreditCard, label: 'Payment Methods', href: '/profile/payments' },
  { icon: Bell, label: 'Notifications', href: '/profile/notifications' },
  { icon: Gift, label: 'Rewards', href: '/profile/rewards' },
  { icon: UserPlus, label: 'Refer & Earn', href: '/profile/referrals' },
  { icon: HelpCircle, label: 'Support', href: '/profile/support' },
  { icon: Shield, label: 'Security', href: '/profile/security' },
]

export default function ProfileSidebar() {
  const location = useLocation()

  return (
    <div className="w-full lg:h-full">
      {/* Mobile Navigation - Horizontal Scroll */}
      <div className="lg:hidden w-full overflow-x-auto no-scrollbar pb-2">
        <nav className="flex items-center gap-2 min-w-max px-2">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  'flex items-center gap-2.5 px-6 py-3 transition-all text-[14px] rounded-full whitespace-nowrap border',
                  isActive
                    ? 'bg-[#505081] text-white border-[#505081] font-bold shadow-md'
                    : 'bg-[#F5F5F5] text-[#666] border-[#EDEDFD] font-medium'
                )}
              >
                <item.icon
                  size={16}
                  className={cn(
                    'transition-colors',
                    isActive ? 'text-white' : 'text-[#999]'
                  )}
                />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col h-full bg-[#F5F5F5] border border-[#EDEDFD] rounded-[22px] overflow-hidden shadow-sm">
        <div className="p-8 space-y-6">
          <h2 className="text-[12px] font-black tracking-[0.2em] text-[#999] uppercase px-4">
            Account
          </h2>
          <nav className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.href
              return (
                <Link
                  key={item.label}
                  to={item.href}
                  className={cn(
                    'flex items-center gap-4 px-5 py-4 transition-all text-[15px] group rounded-[14px]',
                    isActive
                      ? 'bg-white text-[#291F1F] font-bold shadow-sm'
                      : 'text-[#666] hover:bg-white/50 hover:text-[#291F1F] font-medium'
                  )}
                >
                  <item.icon
                    size={18}
                    className={cn(
                      'transition-colors',
                      isActive ? 'text-[#505081]' : 'text-[#999] group-hover:text-[#505081]'
                    )}
                  />
                  {item.label}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="mt-auto p-8 border-t border-[#EDEDFD]">
          <button className="flex items-center gap-4 px-5 py-4 w-full text-left text-[15px] font-bold text-[#505081] hover:bg-white/50 rounded-[14px] transition-all group">
            <LogOut size={18} />
            Sign Out
          </button>
        </div>
      </div>
    </div>
  )
}

