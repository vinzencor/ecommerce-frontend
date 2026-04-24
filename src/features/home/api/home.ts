import api from '@/lib/axios'
import type { BackendProduct } from '@/lib/mapping'

export interface DealOfTheDay {
  id: string
  discountValue?: number
  product: BackendProduct
}

export interface HomeData {
  Banner: Array<{
    id: string
    imageUrl: string
    title?: string
    description?: string
    link?: string
  }>
  categories: Array<{
    id: string
    name: string
    imageUrl: string
    active: boolean
  }>
  offers: unknown[]
  dealsOfTheDay: DealOfTheDay[]
  featuredProducts: BackendProduct[]
}

export const getHomeData = async (): Promise<HomeData> => {
  const response = await api.get('/home/h')
  return response.data.data
}
