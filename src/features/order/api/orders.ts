import api from '@/lib/axios'

export interface OrderItem {
  id: string
  productName: string
  quantity: number
  price: number
  image: string | null
}

export interface Order {
  id: string
  orderNumber: string
  totalAmount: number
  status: 'PENDING' | 'CONFIRMED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
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
