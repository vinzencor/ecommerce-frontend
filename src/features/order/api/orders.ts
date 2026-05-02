import api from '@/lib/axios'

export interface OrderItem {
  id: string
  productId: string
  variantId: string
  productName: string
  quantity: number
  price: number
  image: string | null
}

export interface Order {
  id: string
  orderNumber: string
  totalAmount: number
  status: 'PENDING' | 'CONFIRMED' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'RETURN_REQUESTED' | 'RETURN_APPROVED' | 'RETURN_REJECTED' | 'RETURNED'
  paymentStatus: string
  paymentMethod: string
  createdAt: string
  items: OrderItem[]
  address: {
    fullName: string
    phone: string
    street: string
    city: string
    state: string
    pincode: string
  }
}

export const getMyOrders = async (): Promise<Order[]> => {
  const response = await api.get('/orders')
  return response.data.data
}

export const getOrderById = async (id: string): Promise<Order> => {
  const response = await api.get(`/orders/${id}`)
  return response.data.data
}

export const placeOrder = async (data: {
  addressId: string
  paymentMethod: string
}): Promise<Order> => {
  const response = await api.post('/orders', data)
  return response.data.data
}

export const cancelOrder = async (id: string, reason: string): Promise<any> => {
  const response = await api.post(`/orders/${id}/cancel`, { reason })
  return response.data
}

export const requestReturn = async (id: string, data: { reason: string, images?: string[] }): Promise<any> => {
  const response = await api.post(`/orders/${id}/return`, data)
  return response.data
}
