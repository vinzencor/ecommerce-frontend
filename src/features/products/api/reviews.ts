import api from '@/lib/axios'

export interface Review {
  id: string
  rating: number
  comment: string
  createdAt: string
  user: {
    name: string
  }
}

export const getProductReviews = async (productId: string) => {
  const response = await api.get(`/reviews/product/${productId}`)
  return response.data
}

export const checkReviewEligibility = async (productId: string) => {
  const response = await api.get(`/reviews/check-purchase/${productId}`)
  return response.data
}

export const createReview = async (productId: string, data: { rating: number; comment: string }) => {
  const response = await api.post(`/reviews/${productId}`, data)
  return response.data
}
