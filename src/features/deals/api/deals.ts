import api from '@/lib/axios'
import type { DealOfTheDay } from '../../home/api/home'

export const getDeals = async (): Promise<DealOfTheDay[]> => {
  const response = await api.get('/deals/today')
  return response.data.data
}
