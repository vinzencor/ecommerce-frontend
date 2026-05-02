import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import * as reviewApi from '../api/reviews'
import { toast } from 'sonner'

export const useProductReviews = (productId: string) => {
  return useQuery({
    queryKey: ['product-reviews', productId],
    queryFn: () => reviewApi.getProductReviews(productId),
    enabled: !!productId,
  })
}

export const useReviewEligibility = (productId: string, isLoggedIn: boolean) => {
  return useQuery({
    queryKey: ['review-eligibility', productId],
    queryFn: () => reviewApi.checkReviewEligibility(productId),
    enabled: !!productId && isLoggedIn,
  })
}

export const useCreateReview = (productId: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: { rating: number; comment: string }) => 
      reviewApi.createReview(productId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product-reviews', productId] })
      queryClient.invalidateQueries({ queryKey: ['review-eligibility', productId] })
      toast.success('Review submitted successfully! It will be visible after approval.')
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || 'Failed to submit review')
    }
  })
}
