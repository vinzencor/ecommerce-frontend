import api from '@/lib/axios'

export interface UserProfile {
  id: string
  name: string
  email: string
  phone?: string
  gender?: string
  image?: string
  role: string
  isActive: boolean
  isVerified: boolean
  createdAt: string
}

export const getProfile = async (): Promise<UserProfile> => {
  const response = await api.get('/auth/profile')
  return response.data.data
}

export const updateProfile = async (data: Partial<UserProfile>): Promise<UserProfile> => {
  const formData = new FormData()

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === 'image' && (value as unknown) instanceof File) {
        formData.append('image', value as unknown as File)
      } else {
        formData.append(key, String(value))
      }
    }
  })

  const response = await api.patch('/auth/profile', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return response.data.data
}
