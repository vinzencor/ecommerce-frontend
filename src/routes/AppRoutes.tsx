import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

const MainLayout = lazy(() => import('@/components/layout/MainLayout'))
import HomePage from '@/features/home/pages/HomePage'
const ProductListPage = lazy(() => import('@/features/products/pages/ProductListPage'))
const ProductDetailsPage = lazy(() => import('@/features/products/pages/ProductDetailsPage'))
const CartPage = lazy(() => import('@/features/cart/pages/CartPage'))
const SharedCartPage = lazy(() => import('@/features/cart/pages/SharedCartPage'))
const CheckoutPage = lazy(() => import('@/features/checkout/pages/CheckoutPage'))
const OrderConfirmationPage = lazy(() => import('@/features/order/pages/OrderConfirmationPage'))
const WishlistPage = lazy(() => import('@/features/wishlist/pages/WishlistPage'))
const ProfilePage = lazy(() => import('@/features/profile/pages/ProfilePage'))
const OrdersPage = lazy(() => import('@/features/profile/pages/OrdersPage'))
const AddressesPage = lazy(() => import('@/features/profile/pages/AddressesPage'))
const SupportPage = lazy(() => import('@/features/profile/pages/SupportPage'))
const RewardsPage = lazy(() => import('@/features/profile/pages/RewardsPage'))
const ReferralsPage = lazy(() => import('@/features/profile/pages/ReferralsPage'))
const VendorRegistrationPage = lazy(() => import('@/features/vendors/pages/VendorRegistrationPage'))
const LoginPage = lazy(() => import('@/features/auth/pages/LoginPage'))
const SignupPage = lazy(() => import('@/features/auth/pages/SignupPage'))
const NotFoundPage = lazy(() => import('@/components/common/NotFoundPage'))
const CMSPage = lazy(() => import('@/features/cms/pages/CMSPage'))
const DealsPage = lazy(() => import('@/features/deals/pages/DealsPage'))


function AppRoutes() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-sm text-neutral-500">
          Loading...
        </div>
      }
    >
      <Routes>
        {/* Auth Routes - No Header/Footer */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route element={<MainLayout />}>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/product/:id" element={<ProductDetailsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/cart/shared/:shareId" element={<SharedCartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/orders" element={<OrdersPage />} />
          <Route path="/profile/orders/:orderId" element={<OrderConfirmationPage />} />
          <Route path="/profile/addresses" element={<AddressesPage />} />
          <Route path="/profile/support" element={<SupportPage />} />
          <Route path="/profile/rewards" element={<RewardsPage />} />
          <Route path="/profile/referrals" element={<ReferralsPage />} />
          <Route path="/vendors/register" element={<VendorRegistrationPage />} />
          <Route path="/pages/:slug" element={<CMSPage />} />
          <Route path="/:slug" element={<CMSPage />} />


          {/* 404 Catch-All */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
