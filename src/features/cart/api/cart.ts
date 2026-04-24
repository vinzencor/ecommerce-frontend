import api from '@/lib/axios'

export interface CartItem {
  id: string
  userId: string
  variantId: string
  quantity: number
  variant: {
    id: string
    price: number
    costPrice?: number
    discount?: number
    sku: string
    stock: number
    product: {
      id: string
      productName: string
    }
    images: Array<{
      imageUrl: string
      isPrimary: boolean
    }>
  }
}

export interface CartResponse {
  message: string
  data: {
    items: CartListItem[]
    summary: CartSummary
  }
}

export interface CartListItem {
  variantId: string
  productName: string
  attributes?: string
  category?: string
  quantity: number
  image: string
  pricingPerUnit: {
    originalPrice: number
    finalPrice: number
  }
}

export interface CartSummary {
  totalOriginalPrice: number
  totalDiscount: number
  totalTax: number
  totalPayable: number
}

export interface ApiMessageResponse {
  message: string
}

export interface SharedCartItem {
  variantId: string
  productId: string
  productName: string
  quantity: number
  image: string
  price: number
}

export interface SharedCartData {
  items: SharedCartItem[]
}

export const getCart = async (): Promise<CartResponse> => {
  const response = await api.get('/cart')
  return response.data
}

export const addToCart = async (
  variantId: string,
  quantity: number = 1
): Promise<ApiMessageResponse> => {
  const response = await api.post('/cart', { productVariantId: variantId, quantity })
  return response.data
}

export const removeFromCart = async (variantId: string): Promise<ApiMessageResponse> => {
  const response = await api.delete(`/cart/${variantId}`)
  return response.data
}

export const clearCart = async (): Promise<ApiMessageResponse> => {
  const response = await api.delete('/cart/clear')
  return response.data
}

export const shareCart = async (): Promise<{ shareId: string; url: string }> => {
  const response = await api.post('/cart/share')
  return response.data.data
}

export const getSharedCart = async (shareId: string): Promise<SharedCartData> => {
  const response = await api.get(`/cart/shared/${shareId}`)
  return response.data.data
}
