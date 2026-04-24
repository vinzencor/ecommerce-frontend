import {
  LayoutDashboard,
  ShoppingBag,
  Store,
  Wallet,
  Settings,
  Star,
  MessageSquare,
  Package,
  ShieldAlert,
  Layers,
  Tag,
  LayoutGrid,
} from 'lucide-react'

export const vendorMenuItems = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/vendor',
  },
  {
    name: 'Products',
    icon: Store,
    children: [
      {
        name: 'Product List',
        icon: Package,
        path: '/vendor/products',
      },
      {
        name: 'Expiry',
        icon: ShieldAlert,
        path: '/vendor/expiry',
      },
      {
        name: 'Variants',
        icon: Layers,
        path: '/vendor/variants',
      },
    ],
  },
  {
    name: 'Brands',
    icon: Tag,
    path: '/vendor/brands',
  },
  {
    name: 'Categories',
    icon: LayoutGrid,
    children: [
      {
        name: 'Title Category',
        icon: LayoutGrid,
        path: '/vendor/categories/title',
      },
      {
        name: 'Main Category',
        icon: LayoutGrid,
        path: '/vendor/categories/main',
      },
      {
        name: 'Sub Category',
        icon: LayoutGrid,
        path: '/vendor/categories/sub',
      },
    ],
  },
  {
    name: 'Orders',
    icon: ShoppingBag,
    path: '/vendor/orders',
  },
  {
    name: 'Financial',
    icon: Wallet,
    path: '/vendor/financial',
  },
  {
    name: 'Reviews',
    icon: Star,
    path: '/vendor/reviews',
  },
  {
    name: 'Support',
    icon: MessageSquare,
    path: '/vendor/support',
  },
  {
    name: 'Settings',
    icon: Settings,
    path: '/vendor/settings',
  },
]
