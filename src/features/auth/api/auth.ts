import api from '@/lib/axios'

export interface AuthResponse {
  message: string
  data: {
    user: {
      id: string
      fullName: string
      email: string
      mobileNumber?: string
      image?: string
    }
    accessToken: string
    refreshToken: string
  }
}

export interface RegisterPayload {
  name: string
  email?: string
  phone?: string
  referralCode?: string
}

export interface VerifyOtpPayload {
  email?: string
  phone?: string
  otp: string
}

export interface ApiMessageResponse {
  message: string
}

export const login = async (payload: { emailOrPhone: string }): Promise<ApiMessageResponse> => {
  const isEmail = payload.emailOrPhone.includes('@')
  const body = isEmail ? { email: payload.emailOrPhone } : { phone: payload.emailOrPhone }
  const response = await api.post('/auth/login', body)
  return response.data
}

export const register = async (payload: RegisterPayload): Promise<ApiMessageResponse> => {
  const response = await api.post('/auth/register', payload)
  return response.data
}

export const verifyOtp = async (payload: VerifyOtpPayload): Promise<AuthResponse> => {
  const response = await api.post('/auth/verify-email', payload)
  return response.data
}

export const resendOtp = async (payload: {
  email?: string
  phone?: string
}): Promise<ApiMessageResponse> => {
  const response = await api.post('/auth/resend-otp', payload)
  return response.data
}

export const logout = async () => {
  await api.post('/auth/logout')
}
