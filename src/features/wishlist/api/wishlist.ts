import api from '@/lib/axios'

export interface WishlistItem {
  wishlistId: string
  productId: string
  productName: string
  category?: string
  brand?: string
  image: string
  originalPrice: number
  discountedPrice: number
  variantDiscountPercentage: number
  offerPercentage: number
  stock: number
  addedAt: string
}

export interface WishlistResponse {
  items: WishlistItem[]
  count: number
}

export interface WishlistToggleResponse {
  isFavourite: boolean
  message: string
}

export interface ApiMessageResponse {
  message: string
}

export const getWishlist = async (): Promise<WishlistResponse> => {
  const response = await api.get('/wishlist')
  return response.data.data
}

export const toggleWishlist = async (productId: string): Promise<WishlistToggleResponse> => {
  const response = await api.post('/wishlist/toggle', { productId })
  return response.data.data
}

export const removeFromWishlist = async (productId: string): Promise<ApiMessageResponse> => {
  const response = await api.delete(`/wishlist/${productId}`)
  return response.data
}
