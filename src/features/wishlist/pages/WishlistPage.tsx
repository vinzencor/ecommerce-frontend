import WishlistHeader from '../components/WishlistHeader'
import WishlistCard from '@/components/common/cards/WishlistCard'
import { useWishlist } from '../hooks/useWishlist'
import { Loader2 } from 'lucide-react'

export default function WishlistPage() {
  const { wishlist, count, isLoading, toggleWishlist } = useWishlist()

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <Loader2 className="size-10 animate-spin text-neutral-300" />
        <p className="text-neutral-500 font-medium">Loading your wishlist...</p>
      </div>
    )
  }

  return (
    <div className="max-w-360 mx-auto px-4 md:px-8 lg:px-16 py-12 md:py-16 min-h-screen">
      <WishlistHeader count={count} />

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <p className="text-neutral-500 text-lg mb-4">Your wishlist is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {wishlist.map((item) => (
            <WishlistCard
              key={item.wishlistId}
              id={item.productId}
              image={item.image}
              name={item.productName}
              brand={item.brand || ''}
              price={item.discountedPrice}
              originalPrice={item.originalPrice}
              discount={item.offerPercentage || item.variantDiscountPercentage}
              stockStatus={
                item.stock > 0 ? (item.stock < 10 ? 'Only Few Left' : '') : 'Out of Stock'
              }
              onMoveToCart={() => console.log('Moving to cart:', item.productName)}
              onRemove={() => toggleWishlist(item.productId)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
