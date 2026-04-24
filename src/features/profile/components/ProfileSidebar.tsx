import { User, ShoppingBag, Heart, MapPin, CreditCard, Bell, Shield } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { icon: User, label: 'Profile Settings', href: '/profile' },
  { icon: ShoppingBag, label: 'Orders', href: '/profile/orders' },
  { icon: Heart, label: 'Wishlist', href: '/wishlist' },
  { icon: MapPin, label: 'Addresses', href: '/profile/addresses' },
  { icon: CreditCard, label: 'Payment Methods', href: '/profile/payments' },
  { icon: Bell, label: 'Notifications', href: '/profile/notifications' },
  { icon: Shield, label: 'Security', href: '/profile/security' },
]

export default function ProfileSidebar() {
  const location = useLocation()

  return (
    <div className="flex flex-col h-full min-h-[500px] border-r border-neutral-100">
      <div className="space-y-4">
        <h2 className="text-[10px] font-black tracking-[0.2em] text-black uppercase px-6">
          Account
        </h2>
        <nav className="flex flex-col">
          {NAV_ITEMS.map((item) => {
            const isActive = location.pathname === item.href
            return (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 px-6 py-3 transition-all text-[13px] group border-l-2',
                  isActive
                    ? 'bg-neutral-100/80 text-black font-bold border-l-black'
                    : 'text-neutral-500 hover:bg-neutral-50 hover:text-black font-medium border-l-transparent'
                )}
              >
                <item.icon
                  size={14}
                  className={cn(
                    'transition-colors',
                    isActive ? 'text-black' : 'text-neutral-400 group-hover:text-black'
                  )}
                />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto px-6 pb-10">
        <button className="flex items-center gap-3 py-3 w-full text-left text-[13px] font-bold text-red-500 hover:text-red-700 transition-colors group">
          Sign Out
        </button>
      </div>
    </div>
  )
}
