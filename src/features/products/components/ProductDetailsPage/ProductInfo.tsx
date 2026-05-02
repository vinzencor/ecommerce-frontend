import { useState } from 'react'
import { Star, Truck, RotateCcw, Minus, Plus, Loader2, Check } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { type BackendProduct } from '@/lib/mapping'
import { useCart } from '@/features/cart/hooks/useCart'
import { useAuth } from '@/features/auth/hooks/useAuth'

interface ProductInfoProps {
  product: BackendProduct
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [quantity, setQuantity] = useState(1)
  const [isSuccess, setIsSuccess] = useState(false)

  const navigate = useNavigate()
  const { addToCart, isAdding } = useCart()
  const { isAuthenticated } = useAuth()

  const primaryVariant = product.variants.find((v) => v.isPrimary) || product.variants[0]

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    try {
      await addToCart({ variantId: primaryVariant.id, quantity })
      setIsSuccess(true)
      setTimeout(() => setIsSuccess(false), 3000)
    } catch (err) {
      console.error('Failed to add to cart', err)
    }
  }

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    try {
      await addToCart({ variantId: primaryVariant.id, quantity })
      navigate('/checkout')
    } catch (err) {
      console.error('Failed to buy now', err)
    }
  }


  return (
    <div className="flex flex-col w-full">
      {/* Brand & Title */}
      <p className="text-[14px] font-bold text-[#D4A373] uppercase tracking-wider mb-2">
        {product.brand?.brandName || 'Generic'}
      </p>
      <h1 className="text-[28px] md:text-[34px] font-bold text-black mb-2 leading-tight">
        {product.productName}
      </h1>
      <p className="text-[13px] text-neutral-500 mb-3 max-w-xl">
        {product.description || 'No description available for this product.'}
      </p>

      {/* Ratings - Mocked for now */}
      <div className="flex items-center gap-2 mb-6">
        <div className="flex items-center text-[#FFC107]">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="size-4 fill-current" />
          ))}
        </div>
        <span className="text-[12px] text-neutral-500">( 4.5 / 5.0 Rating )</span>
      </div>

      <hr className="border-neutral-200 mb-6" />

      {/* Price */}
      <div className="mb-4">
        <div className="flex items-baseline gap-3">
          <span className="text-[32px] font-bold text-black">
            ₹{primaryVariant?.price.toLocaleString()}
          </span>
          {primaryVariant?.costPrice && primaryVariant.costPrice > primaryVariant.price && (
            <span className="text-[20px] text-neutral-400 line-through">
              ₹{primaryVariant.costPrice.toLocaleString()}
            </span>
          )}
          {primaryVariant?.discount && (
            <span className="text-[16px] font-bold text-green-600">
              {primaryVariant.discount}% OFF
            </span>
          )}
        </div>
        <p className="text-[14px] text-neutral-500 mt-1">Inclusive of all taxes</p>
      </div>

      <hr className="border-neutral-200 mb-6" />

      {/* Variant Selection Placeholder */}
      <div className="mb-8">
        <h3 className="text-[16px] font-bold text-black mb-4 uppercase tracking-wide">
          Available Options
        </h3>
        <div className="flex flex-wrap gap-3">
          {product.variants.map((v) => (
            <button
              key={v.id}
              className={cn(
                'px-4 py-2 border rounded-sm text-[13px] font-medium transition-all',
                v.id === primaryVariant.id
                  ? 'border-black bg-black text-white'
                  : 'border-neutral-200 hover:border-black'
              )}
            >
              {v.sku}
            </button>
          ))}
        </div>
      </div>

      {/* Add To Cart Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        {/* Quantity */}
        <div className="flex items-center bg-[#F5F5F5] border border-[#EDEDFD] rounded-[14px] h-14 w-full sm:w-36 shrink-0 shadow-sm">
          <button
            className="flex-1 flex justify-center items-center h-full text-[#666] hover:text-[#291F1F] transition-colors"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="size-4" />
          </button>
          <span className="flex-1 text-center text-[16px] font-black text-[#291F1F]">
            {quantity}
          </span>
          <button
            className="flex-1 flex justify-center items-center h-full text-[#666] hover:text-[#291F1F] transition-colors"
            onClick={() => setQuantity(Math.min(primaryVariant.stock, quantity + 1))}
          >
            <Plus className="size-4" />
          </button>
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          className={cn(
            'flex-1 h-16 text-[14px] font-black rounded-[14px] transition-all uppercase tracking-widest disabled:opacity-50 shadow-lg active:scale-[0.98]',
            isSuccess 
              ? 'bg-[#2B9950] text-white shadow-[#2B9950]/20' 
              : 'bg-[#505081] text-white hover:bg-[#3D3D66] shadow-[#505081]/20'
          )}
          disabled={primaryVariant.stock === 0 || isAdding}
        >
          {isAdding ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="size-5 animate-spin" />
              Adding...
            </div>
          ) : isSuccess ? (
            <div className="flex items-center justify-center gap-2">
              <Check className="size-5" />
              Added to Cart!
            </div>
          ) : primaryVariant.stock === 0 ? (
            'Out of Stock'
          ) : (
            'Add to Cart'
          )}
        </button>
      </div>

      {/* Buy Now */}
      <button
        onClick={handleBuyNow}
        className="w-full h-16 bg-white border-2 border-[#291F1F] text-[#291F1F] text-[14px] font-black rounded-[14px] hover:bg-[#291F1F] hover:text-white transition-all mb-8 uppercase tracking-widest active:scale-[0.98]"
        disabled={primaryVariant.stock === 0 || isAdding}
      >
        Buy Now
      </button>


      {/* Shipping details */}
      <div className="flex flex-col gap-5 p-6 bg-neutral-50 rounded-lg border border-neutral-100">
        <div className="flex items-start gap-4">
          <Truck className="size-5 text-black shrink-0 mt-0.5" />
          <div>
            <p className="text-[14px] font-bold text-black mb-0.5">Fast Delivery</p>
            <p className="text-[12px] text-neutral-500">
              Free worldwide shipping on all orders over ₹1000
            </p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <RotateCcw className="size-5 text-black shrink-0 mt-0.5" />
          <div>
            <p className="text-[14px] font-bold text-black mb-0.5">Easy Returns</p>
            <p className="text-[12px] text-neutral-500">7 Days replacement and return policy</p>
          </div>
        </div>
      </div>
    </div>
  )
}
