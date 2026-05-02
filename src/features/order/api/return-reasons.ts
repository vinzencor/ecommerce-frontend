import api from '@/lib/axios'

export interface ReturnReason {
  id: string
  reason: string
  type: 'CANCEL' | 'RETURN'
}

export const getReturnReasons = async (type?: 'CANCEL' | 'RETURN'): Promise<ReturnReason[]> => {
  const params = new URLSearchParams()
  if (type) params.append('type', type)
  params.append('isActive', 'true')
  
  const response = await api.get(`/return-reasons?${params.toString()}`)
  return response.data.data
}
