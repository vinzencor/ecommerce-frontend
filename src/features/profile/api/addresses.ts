import api from '@/lib/axios'

export interface Address {
  id: string
  fullName: string
  phone: string
  street: string
  city: string
  state: string
  pincode: string
  country: string
  addressType: 'HOME' | 'WORK' | 'OTHERS'
  isDefault: boolean
}

export const getAddresses = async (): Promise<Address[]> => {
  const response = await api.get('/auth/address')
  return response.data.data
}

export const addAddress = async (data: Omit<Address, 'id' | 'isDefault'>): Promise<Address> => {
  const response = await api.post('/auth/address', data)
  return response.data.data
}

export const updateAddress = async (id: string, data: Partial<Address>): Promise<Address> => {
  const response = await api.patch(`/auth/address/${id}`, data)
  return response.data.data
}

export const deleteAddress = async (id: string): Promise<void> => {
  await api.delete(`/auth/address/${id}`)
}

export const makeDefaultAddress = async (id: string): Promise<void> => {
  await api.patch(`/auth/address/default/${id}`, { isDefault: true })
}
