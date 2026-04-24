import { Link, useLocation } from 'react-router-dom'
import { Home, LayoutGrid, Heart, ShoppingBag, User } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function BottomNav() {
  const location = useLocation()

  const navItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Categories', path: '/products', icon: LayoutGrid },
    { name: 'Bag', path: '/cart', icon: ShoppingBag },
    { name: 'Wishlist', path: '/wishlist', icon: Heart },
    { name: 'Profile', path: '/profile', icon: User },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-neutral-200 pb-safe">
      <div className="flex items-center justify-around h-[64px] px-2 shadow-[0_-4px_20px_-10px_rgba(0,0,0,0.1)]">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== '/' && location.pathname.startsWith(item.path))
          const Icon = item.icon

          return (
            <Link
              key={item.name}
              to={item.path}
              className="flex flex-col items-center justify-center w-full h-full gap-1 pt-1"
            >
              <div
                className={cn(
                  'p-1 rounded-full transition-colors',
                  isActive ? 'text-black' : 'text-neutral-400 group-hover:text-neutral-600'
                )}
              >
                <Icon
                  className={cn('size-[22px]', isActive && 'fill-black/10')}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </div>
              <span
                className={cn(
                  'text-[10px] font-medium tracking-wide',
                  isActive ? 'text-black font-bold' : 'text-neutral-500'
                )}
              >
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
