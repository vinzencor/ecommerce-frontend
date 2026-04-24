import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getWishlist, toggleWishlist, removeFromWishlist } from '../api/wishlist'
import { useAuth } from '@/features/auth/hooks/useAuth'

export const useWishlist = () => {
  const queryClient = useQueryClient()
  const { isAuthenticated } = useAuth()

  const wishlistQuery = useQuery({
    queryKey: ['wishlist'],
    queryFn: getWishlist,
    enabled: isAuthenticated,
  })

  const toggleMutation = useMutation({
    mutationFn: (productId: string) => toggleWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
    },
  })

  const removeMutation = useMutation({
    mutationFn: (productId: string) => removeFromWishlist(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
    },
  })

  // Return a set of IDs for O(1) lookup in product lists
  const wishlistIds = new Set((wishlistQuery.data?.items || []).map((item) => item.productId))

  return {
    wishlist: wishlistQuery.data?.items || [],
    count: wishlistQuery.data?.count || 0,
    isLoading: wishlistQuery.isLoading,
    wishlistIds,
    toggleWishlist: toggleMutation.mutateAsync,
    removeFromWishlist: removeMutation.mutateAsync,
  }
}
